
class MSWorld extends ESWorld {

	constructor(app) {
		super(app);
		
		this.controls = [ 
			KEY_UP, 
			KEY_RIGHT, 
			KEY_DOWN, 
			KEY_LEFT 
		];

		this.dirs = [ 
			new ESVec2( 0, -1),
			new ESVec2( 1,  0),
			new ESVec2( 0,  1),
			new ESVec2(-1,  0)
		];
	}

	reset() {
		super.reset();

		this.curX = WIDTH >> 1;
		this.curY = HEIGHT >> 1;

		this.cursTimer = 0;
		this.flagTimer = 0;

		this.initTiles(this.curX, this.curY);
	
		this.gameOverAnim = 20;
	}

	initTiles(xd, yd) {
		this.tiles = [];

		const numTiles = WIDTH * HEIGHT;
		while (this.tiles.push(new MSTile()) < numTiles) { }

		let bombCount = 0;
		while (bombCount < MS_NUM_BOMBS) {
			const x = Math.floor(Math.random() * WIDTH);
			const y = Math.floor(Math.random() * HEIGHT);
			
			if (x != xd || y != yd) {
				const index = x + y * WIDTH;

				const tile = this.tiles[index];
				if (!tile.bomb) {
					tile.bomb = true;
					bombCount++;
				}
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

	getTile(xt, yt) {
		if (xt < 0 || xt >= WIDTH)
			return null;
		if (yt < 0 || yt >= HEIGHT)
			return null;
		return this.tiles[xt + yt * WIDTH];
	}

	isBomb(xt, yt) {
		let t;
		return (t = this.getTile(xt, yt)) && t.bomb;
	}

	getNumSurrounding(x, y) {
		let n = 0;

		if (this.isBomb(x - 1, y)) n++;
		if (this.isBomb(x + 1, y)) n++;
		if (this.isBomb(x, y - 1)) n++;
		if (this.isBomb(x, y + 1)) n++;

		if (this.isBomb(x - 1, y - 1)) n++;
		if (this.isBomb(x - 1, y + 1)) n++;
		if (this.isBomb(x + 1, y - 1)) n++;
		if (this.isBomb(x + 1, y + 1)) n++;

		return n;
	}

	clickTile(x, y) {
		if (this.firstMove) {
			if (this.isBomb(x, y))
				this.initTiles(x, y);
			this.firstMove = false;
		} else if (this.isBomb(x, y)) { 
			this.setGameOver(false);
			return;
		}

		this.revealSurroundingTiles(x, y);
	}

	revealSurroundingTiles(x, y) {
		let t = this.getTile(x, y);
		if (t == null || t.visible)
			return;
		t.setVisible();

		if (t.numSurrounding > 0)
			return;

		this.revealSurroundingTiles(x - 1, y);
		this.revealSurroundingTiles(x + 1, y);
		this.revealSurroundingTiles(x, y - 1);
		this.revealSurroundingTiles(x, y + 1);
		
		this.revealSurroundingTiles(x - 1, y - 1);
		this.revealSurroundingTiles(x - 1, y + 1);
		this.revealSurroundingTiles(x + 1, y - 1);
		this.revealSurroundingTiles(x + 1, y + 1);
	}

	checkWin() {
		for (let t of this.tiles)
			if (!t.visible && !t.bomb)
				return;

		this.setGameOver(true);
	}

	update() {
		super.update();

		const middleInput = this.app.controller.getInput(KEY_MIDDLE);
		
		if (!this.gameOver && !middleInput.pressed) {
			for (let i = 0; i < this.controls.length; i++) {
				if (this.app.controller.getInput(this.controls[i]).clicked()) {
					const direction = this.dirs[i];
					this.curX = Math.clamp(0, WIDTH  - 1, this.curX + direction.x);
					this.curY = Math.clamp(0, HEIGHT - 1, this.curY + direction.y);

					this.cursTimer = 0;

					break;
				}
			}
		}

		if (this.flagTimer < MS_FLAG_DELAY && middleInput.released()) {
			if (!this.gameOver) {
				if (!this.getTile(this.curX, this.curY).flag) {	
					this.clickTile(this.curX, this.curY);
					this.checkWin();
				}
			} else {
				this.reset();
				return;
			}
		} else if (middleInput.pressed && !this.gameOver) {
			if (this.flagTimer == MS_FLAG_DELAY)
				this.getTile(this.curX, this.curY).toggleFlag();
			this.flagTimer++;
		} else this.flagTimer = 0;

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
					color = tile.flag ? MS_FLAG_COLOR : MS_TILE_COLOR;
				}

				this.app.setPixel(x, y, color);
			}
		}

		if ((this.cursTimer % MS_CURSOR_TOGGLE) < (MS_CURSOR_TOGGLE >> 1))
			this.app.setPixel(this.curX, this.curY, MS_CURS_COLOR);
	}
}