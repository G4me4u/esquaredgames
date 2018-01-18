
class ESColor {
	
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

// Predefined colors
const COLOR_RED     = new ESColor(255,   0,   0);
const COLOR_GREEN   = new ESColor(  0, 255,   0);
const COLOR_BLUE    = new ESColor(  0,   0, 255);

const COLOR_YELLOW  = new ESColor(255, 255,   0);
const COLOR_CYAN    = new ESColor(  0, 255, 255);
const COLOR_MAGENTA = new ESColor(255,   0, 255);

const COLOR_BLACK   = new ESColor(  0,   0,   0);
const COLOR_WHITE   = new ESColor(255, 255, 255);
