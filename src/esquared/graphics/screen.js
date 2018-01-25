
class ESScreen {
	
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.width = width;
		this.height = height;

		this.pixels = Array.makeArray(width * height, COLOR_BLACK);
	}

	setPixel(px, py, color) {
		if (px < 0 || px >= this.width )
			return;
		if (py < 0 || py >= this.height)
			return;
		this.pixels[px + py * this.width] = color ? color : COLOR_BLACK;
	}

	getPixel(px, py) {
		if (px < 0 || px >= this.width )
			return null;
		if (py < 0 || py >= this.height)
			return null;
		return this.pixels[px + py * this.width];
	}

	drawToScreen() {
		const pw = Math.floor(this.canvas.width  / this.width );
		const ph = Math.floor(this.canvas.height / this.height);

		const r = Math.min(pw, ph) >> 1;
		const d = r << 1;

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let i = 0;
		for (let py = 0; py < this.height; py++) {
			for (let px = 0; px < this.width; px++) {
				const color = this.pixels[i++];
				
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