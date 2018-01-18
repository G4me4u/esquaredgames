
class ESScreen {
	
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.width = width;
		this.height = height;

		this.pixels = Array.makeArray(width * height, COLOR_BLACK);
	}

	setPixel(px, py, color) {
		this.pixels[px + py * this.width] = color ? color : COLOR_BLACK;
	}

	getPixel(px, py) {
		return this.pixels[px + py * this.width];
	}

	drawToScreen() {
		const pw = Math.floor(this.canvas.width  / this.width );
		const ph = Math.floor(this.canvas.height / this.height);

		const r = Math.min(pw, ph) >> 1;
		const d = r << 1;

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let px = 0; px < this.width; px++) {
			for (let py = 0; py < this.height; py++) {
				let color = this.getPixel(px, py);
				
				const cx = px * d + r + PIXEL_MARGIN;
				const cy = py * d + r + PIXEL_MARGIN;

				this.ctx.beginPath();
				this.ctx.arc(cx, cy, r - PIXEL_MARGIN, 0, 2 * Math.PI, false);
				this.ctx.fillStyle = color.style;
				this.ctx.fill();
			}
		}
	}
}