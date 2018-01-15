const MIDDLE = 0;
const UP     = 1;
const RIGHT  = 2;
const DOWN   = 3;
const LEFT   = 4;

class Controller {

	constructor() {
		this.codeToControl = {
			32: MIDDLE,
			38: UP,
			39: RIGHT,
			40: DOWN,
			37: LEFT
		};

		this.controls = {
			0: new Input("middle", MIDDLE),
			1: new Input("up", UP),
			2: new Input("right", RIGHT),
			3: new Input("down", DOWN),
			4: new Input("left", LEFT)
		};

		this.events = [];
	}

	update() {
		for (let control in this.controls)
			this.controls[control].update();
	
		while (this.events.length > 0) {
			const event = this.events.pop();
			const input = this.controls[event.control];
			input.setPressed(event.pressed, event.when);
		}
	}

	handleEvent(event, pressed) {
		if (!(event.keyCode in this.codeToControl))
			return;
		
		const control = this.codeToControl[event.keyCode];
		this.events.push({ control, pressed, when: Date.now() });
	}

	getInput(control) {
		return this.controls[control];
	}

	getLatestInput() {
		let latest = null;
		let latestTime = -1;
		for (let control in this.controls) {
			const input = this.controls[control];
			if (input.when > latestTime) {
				latest = input;
				latestTime = input.when;
			}
		}
		return latest;
	}
}
