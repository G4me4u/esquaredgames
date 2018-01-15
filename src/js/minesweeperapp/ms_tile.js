
class MSTile {

	constructor() {
		this.visible = false;
		this.bomb = false;
		this.surrounding = 0;
	}

	setBomb(flag) {
		this.bomb = flag;
	}

	setNumSurrounding(numSurrounding) {
		this.numSurrounding = numSurrounding;
	}

	setVisible() {
		this.visible = true;
	}
}