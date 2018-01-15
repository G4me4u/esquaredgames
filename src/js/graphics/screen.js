
class Screen {
	
	constructor(canvas, tilesX, tilesY) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.tilesX = tilesX;
		this.tilesY = tilesY;

		this.tw = Math.floor(canvas.width  / tilesX);
		this.th = Math.floor(canvas.height / tilesY);
	
		this.pixels = makeArray(tilesX * tilesY);
	}

	setPixel(tx, ty, color) {
		this.pixels[tx + ty * this.tilesX] = color;
	}

	getPixel(tx, ty) {
		return this.pixels[tx + ty * this.tilesX];
	}

	drawToScreen() {
		for (let tx = 0; tx < this.tilesX; tx++) {
			for (let ty = 0; ty < this.tilesY; ty++) {
				let color = this.getPixel(tx, ty);
				if (!color)
					color = BLACK;
				this.ctx.fillStyle = color.style;
				this.ctx.fillRect(tx * this.tw, ty * this.th, this.tw, this.th);
			}
		}
	}
}