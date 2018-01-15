
class MSWorld extends World {

	constructor(app) {
		super(app);
		
		this.controls = [ 
			KEY_UP, 
			KEY_RIGHT, 
			KEY_DOWN, 
			KEY_LEFT 
		];

		this.dirs = [ 
			new Vec2( 0, -1),
			new Vec2( 1,  0),
			new Vec2( 0,  1),
			new Vec2(-1,  0)
		];
	}

	reset() {
		super.reset();

		this.curX = WIDTH >> 1;
		this.curY = HEIGHT >> 1;

		this.cursTimer = 0;

		this.tiles = [];
		this.initTiles();
	
		this.gameOverAnim = 20;
	}

	initTiles() {
		const numTiles = WIDTH * HEIGHT;
		while (this.tiles.push(new MSTile()) < numTiles);

		let bombCount = 0;
		while (bombCount < MS_NUM_BOMBS) {
			const x = Math.floor(Math.random() * WIDTH);
			const y = Math.floor(Math.random() * HEIGHT);
			const index = x + y * WIDTH;

			const tile = this.tiles[index];
			if (!tile.bomb) {
				tile.bomb = true;
				bombCount++;
			}
		}

		let i = 0;
		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				const tile = this.tiles[i++];
				const numSurrounding = this.getNumSurrounding(x, y);
				if (numSurrounding > 0)
					tile.setNumSurrounding(numSurrounding);
			}
		}
	}

	getNumSurrounding(x, y) {
		let n = 0;

		const index = x + y * WIDTH;
		if (x > 0) {
			if (this.tiles[index - 1].bomb)
				n++;
			if (y > 0 && this.tiles[index - WIDTH - 1].bomb)
				n++;
			if (y + 1 < HEIGHT && this.tiles[index + WIDTH - 1].bomb)
				n++;
		}

		if (x + 1 < WIDTH) {
			if (this.tiles[index + 1].bomb)
				n++;
			if (y > 0 && this.tiles[index - WIDTH + 1].bomb)
				n++;
			if (y + 1 < HEIGHT && this.tiles[index + WIDTH + 1].bomb)
				n++;
		}

		if (y > 0 && this.tiles[index - WIDTH].bomb)
			n++;
		if (y + 1 < HEIGHT && this.tiles[index + WIDTH].bomb)
			n++;

		return n;
	}

	clickTile(x, y) {
		const tile = this.tiles[x + y * WIDTH];

		if (tile.bomb) {	
			this.setGameOver(false);
			return;
		}

		this.revealSurroundingTiles(x, y);
	}

	revealSurroundingTiles(x, y) {
		const index = x + y * WIDTH;

		let t = this.tiles[index];
		if (t.visible)
			return;
		t.setVisible();

		if (t.numSurrounding > 0)
			return;

		if (x > 0) {
			this.revealSurroundingTiles(x - 1, y);

			if (y > 0)
				this.revealSurroundingTiles(x - 1, y - 1);
			if (y + 1 < HEIGHT)
				this.revealSurroundingTiles(x - 1, y + 1);
		}

		if (x + 1 < WIDTH) {
			this.revealSurroundingTiles(x + 1, y);

			if (y > 0)
				this.revealSurroundingTiles(x + 1, y - 1);
			if (y + 1 < HEIGHT)
				this.revealSurroundingTiles(x + 1, y + 1);
		}

		if (y > 0)
			this.revealSurroundingTiles(x, y - 1);
		if (y + 1 < HEIGHT)
			this.revealSurroundingTiles(x, y + 1);
	}

	checkWin() {
		for (let t of this.tiles)
			if (!t.visible && !t.bomb)
				return;

		this.setGameOver(true);
	}

	update() {
		super.update();

		if (!this.gameOver) {
			for (let i = 0; i < this.controls.length; i++) {
				if (this.app.controller.getInput(this.controls[i]).clicked()) {
					const direction = this.dirs[i];
					this.curX += direction.x;
					this.curY += direction.y;
				
					if (this.curX < 0)
						this.curX = 0;
					else if (this.curX >= WIDTH)
						this.curX = WIDTH - 1;

					if (this.curY < 0)
						this.curY = 0;
					else if (this.curY >= HEIGHT)
						this.curY = HEIGHT - 1;

					this.cursTimer = 0;

					break;
				}
			}
		}

		if (this.app.controller.getInput(KEY_MIDDLE).clicked()) {
			if (!this.gameOver) {
				this.clickTile(this.curX, this.curY);
				this.checkWin();
			} else {
				this.reset();
			}
			return;
		}

		this.cursTimer++;
	}

	renderGame() {
		let i = 0;
		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				const tile = this.tiles[i++];
				
				let color = COLOR_BLACK;
				if (tile.visible) {
					if (tile.bomb) {
						color = MS_BOMB_COLOR;
					} else if (tile.numSurrounding > 0) {
						color = MS_SURROUNDING_COLORS[tile.numSurrounding - 1];
					}
				} else {
					color = MS_TILE_COLOR;
				}

				this.app.setPixel(x, y, color);
			}
		}

		if ((this.cursTimer % MS_CURSOR_TOGGLE) < (MS_CURSOR_TOGGLE >> 1))
			this.app.setPixel(this.curX, this.curY, MS_CURS_COLOR)
	}
}