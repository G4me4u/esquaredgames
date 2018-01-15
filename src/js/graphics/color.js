
class Color {
	
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		
		this.style = `rgb(${this.r},${this.g},${this.b})`;
	}

	getRed() {
		return this.r;
	}

	getGreen() {
		return this.g;
	}

	getBlue() {
		return this.b;
	}

	getRGB() {
		return (this.r << 16) |
		       (this.g <<  8) |
		       (this.b <<  0);
	}
}