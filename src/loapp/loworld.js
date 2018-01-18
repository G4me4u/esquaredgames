
class LOWorld extends ESTileWorld {

	constructor(app) {
		super(app);
	}

	reset() {
		super.reset();

		this.cursor = new ESCursor(this.app, LO_CURSOR_COLOR, LO_CURSOR_TOGGLE);

		this.gameOverAnim = TPS;
	}

	createTile() {
		return new LOTile(Math.random() > 0.5);
	}

	getTile(xt, yt) {
		if (xt < 0 || xt >= WIDTH)
			return null;
		if (yt < 0 || yt >= HEIGHT)
			return null;
		return this.tiles[xt + yt * WIDTH];
	}

	toggleTile(xt, yt) {
		const t = this.getTile(xt, yt);
		if (t != null)
			t.toggle();
	}

	checkWin() {
		for (let tile of this.tiles)
			if (tile.selected)
				return;
		
		this.setGameOver(true);
	}

	clickTile(xt, yt) {
		this.toggleTile(xt, yt);

		this.toggleTile(xt - 1, yt);
		this.toggleTile(xt + 1, yt);
		this.toggleTile(xt, yt - 1);
		this.toggleTile(xt, yt + 1);

		this.checkWin();
	}

	update() {
		super.update();

		if (!this.gameOver) {
			this.cursor.update();

			if (this.app.controller.getInput(KEY_MIDDLE).clicked())
				this.clickTile(this.cursor.x, this.cursor.y);
		}
	}

	renderGame() {
		super.renderGame();

		this.cursor.render();
	}
}
