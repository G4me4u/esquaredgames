
class MSWorld extends ESTileWorld {

	constructor(app) {
		super(app);
	}

	reset() {
		super.reset();

		this.flagTimer = 0;
		
		this.cursor = new ESCursor(this.app, MS_CURS_COLOR, MS_CURSOR_TOGGLE);
		this.cursor.setPos(WIDTH >> 1, HEIGHT >> 1);
	
		this.gameOverAnim = TPS;
		this.firstMove = true;
	}

	createTile() {
		return new MSTile();
	}

	generateBombs(xd, yd) {
		const clearOffset = (MS_MIN_START_SIZE >> 1) + 1;

		let bombCount = 0;
		while (bombCount < MS_NUM_BOMBS) {
			const x = Math.floor(Math.random() * WIDTH);
			const y = Math.floor(Math.random() * HEIGHT);
			
			if (x >= xd - clearOffset && x <= xd + clearOffset && 
				y >= yd - clearOffset && y <= yd + clearOffset) continue;

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
			this.generateBombs(this.cursor.x, this.cursor.y);
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
		if (!this.gameOver && !middleInput.pressed)
			this.cursor.update();

		if (this.flagTimer < MS_FLAG_DELAY && middleInput.released()) {
			if (!this.gameOver) {
				if (!this.getTile(this.cursor.x, this.cursor.y).flag) {	
					this.clickTile(this.cursor.x, this.cursor.y);
					this.checkWin();
				}
			} else {
				this.reset();
				return;
			}
		} else if (middleInput.pressed && !this.gameOver) {
			if (this.flagTimer == MS_FLAG_DELAY)
				this.getTile(this.cursor.x, this.cursor.y).toggleFlag();
			this.flagTimer++;
		} else this.flagTimer = 0;
	}

	renderGame() {
		super.renderGame();

		if (this.flagTimer == 0)
			this.cursor.render();
	}
}