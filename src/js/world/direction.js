
class Direction {

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

const DIR_UP    = new Direction("up",    0, 2, 1, 3);
const DIR_RIGHT = new Direction("right", 1, 3, 2, 0);
const DIR_DOWN  = new Direction("down",  2, 0, 3, 1);
const DIR_LEFT  = new Direction("left",  3, 1, 0, 2);

const directions = [ DIR_UP, DIR_RIGHT, DIR_DOWN, DIR_LEFT ];
