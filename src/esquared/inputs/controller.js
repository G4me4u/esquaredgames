const KEY_MIDDLE = 0;
const KEY_UP     = 1;
const KEY_RIGHT  = 2;
const KEY_DOWN   = 3;
const KEY_LEFT   = 4;

class ESController {

	constructor() {
		this.codeToControl = {};
		this.controls = {};
		this.events = [];
		
		this.addControl("middle", KEY_MIDDLE, 32);
		this.addControl("up", KEY_UP, 38);
		this.addControl("right", KEY_RIGHT, 39);
		this.addControl("down", KEY_DOWN, 40);
		this.addControl("left", KEY_LEFT, 37);
	}

	addControl(name, control, keyCode) {
		this.controls[control] = new ESInput(name, control);
		this.codeToControl[keyCode] = control;
	}

	update() {
		for (let control in this.controls)
			this.controls[control].update();
	
		while (this.events.length > 0) {
			const event = this.events.shift();
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
