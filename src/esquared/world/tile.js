
class ESTile {

	getColor() {
		return COLOR_BLACK;
	}

	render(app, xp, yp) {
		let col = this.getColor();
		if (col != null)
			app.setPixel(xp, yp, col);
	}
}