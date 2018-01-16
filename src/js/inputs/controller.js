const KEY_MIDDLE = 0;
const KEY_UP     = 1;
const KEY_RIGHT  = 2;
const KEY_DOWN   = 3;
const KEY_LEFT   = 4;

class Controller {

	constructor() {
		this.codeToControl = {
			32: KEY_MIDDLE,
			38: KEY_UP,
			39: KEY_RIGHT,
			40: KEY_DOWN,
			37: KEY_LEFT
		};

		this.controls = {
			0: new Input("middle", KEY_MIDDLE),
			1: new Input("up", KEY_UP),
			2: new Input("right", KEY_RIGHT),
			3: new Input("down", KEY_DOWN),
			4: new Input("left", KEY_LEFT)
		};

		this.events = [];
	}

	update() {
		for (let control in this.controls)
			this.controls[control].update();
	
		while (this.events.length > 0) {
			const event = this.events.pop(0);
			const input = this.controls[event.control];
			input.setPressed(event.pressed, event.repeat, event.when);
		}
	}

	handleEvent(event, pressed) {
		if (!(event.keyCode in this.codeToControl))
			return;

		const control = this.codeToControl[event.keyCode];
		
		this.events.push({ 
			control: control, 
			pressed: pressed, 
			repeat: event.repeat, 
			when: Date.now() 
		});
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
