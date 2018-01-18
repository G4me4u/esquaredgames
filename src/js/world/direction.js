
class ESDirection {

	constructor(name, id, opp, cw, ccw) {
		this.name = name;
		this.id = id;

		this.opp = opp;
		this.cw = cw;
		this.ccw = ccw;
	}

	getOpposite() {
		return directions[this.opp];
	}

	rotateCW() {
		return directions[this.cw];
	}

	rotateCCW() {
		return directions[this.ccw];
	}
}

const DIR_UP    = new ESDirection("up",    0, 2, 1, 3);
const DIR_RIGHT = new ESDirection("right", 1, 3, 2, 0);
const DIR_DOWN  = new ESDirection("down",  2, 0, 3, 1);
const DIR_LEFT  = new ESDirection("left",  3, 1, 0, 2);

const directions = [ DIR_UP, DIR_RIGHT, DIR_DOWN, DIR_LEFT ];
