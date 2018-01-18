
class ESTileWorld extends ESWorld {

	constructor(app) {
		super(app)
	}

	reset() {
		super.reset();

		this.tiles = [];

		const numTiles = WIDTH * HEIGHT;
		while (this.tiles.length < numTiles) 
			this.tiles.push(this.createTile());
	}

	createTile() {
		return new Tile();
	}

	renderGame() {
		let i = 0;

		for (let yp = 0; yp < HEIGHT; yp++) {
			for (let xp = 0; xp < WIDTH; xp++) {
				const tile = this.tiles[i++];
				if (tile.selected) {
					tile.render(this.app, xp, yp, LO_SELECT_COLOR);
				}
			}
		}
	}
}