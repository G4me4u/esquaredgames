
class ESTileWorld extends ESWorld {

	constructor(app) {
		super(app)
	}

	reset() {
		super.reset();
		
		this.initTiles();
	}

	initTiles() {
		this.tiles = [];
		
		const numTiles = WIDTH * HEIGHT;
		while (this.tiles.length < numTiles) 
			this.tiles.push(this.createTile());
	}

	createTile() {
		return new ESTile();
	}

	renderGame() {
		let i = 0;
		for (let yp = 0; yp < HEIGHT; yp++) 
			for (let xp = 0; xp < WIDTH; xp++) 
				this.tiles[i++].render(this.app, xp, yp);
	}
}