
class MSTile extends ESTile {

	constructor() {
		super();

		this.visible = false;
		this.bomb = false;
		this.flag = false;
		this.surrounding = 0;
	}

	setBomb(flag) {
		this.bomb = flag;
	}

	toggleFlag() {
		this.flag = !this.flag;
	}

	setNumSurrounding(numSurrounding) {
		this.numSurrounding = numSurrounding;
	}

	setVisible() {
		this.visible = true;
	}

	getColor() {
		if (this.visible) {
			if (this.bomb) {
				return MS_BOMB_COLOR;
			} else if (this.numSurrounding > 0) {
				return MS_SURROUNDING_COLORS[this.numSurrounding - 1];
			}
		} else {
			return this.flag ? MS_FLAG_COLOR : MS_TILE_COLOR;
		}
		
		return null;
	}
}