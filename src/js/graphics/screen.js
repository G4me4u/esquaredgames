
class Screen {
	
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.width = width;
		this.height = height;

		this.pixels = makeArray(width * height);
	}

	setPixel(px, py, color) {
		this.pixels[px + py * this.width] = color;
	}

	getPixel(px, py) {
		return this.pixels[px + py * this.width];
	}

	drawToScreen() {
		const pw = Math.floor(this.canvas.width  / this.width );
		const ph = Math.floor(this.canvas.height / this.height);

		for (let px = 0; px < this.width; px++) {
			for (let py = 0; py < this.height; py++) {
				let color = this.getPixel(px, py);
				if (!color)
					color = BLACK;
				this.ctx.fillStyle = color.style;
				this.ctx.fillRect(px * pw, py * ph, pw, ph);
			}
		}
	}
}