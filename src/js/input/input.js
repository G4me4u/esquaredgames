
class Input {
	
	constructor(name, control) {
		this.name = name;
		this.control = control;

		this.pressed = false;
		this.wasPressed = false;
		this.wasReleased = false;

		this.when = -1;
	}

	setPressed(state, when) {
		if (state) {
			this.when = when;
			this.pressed = true;
			this.wasReleased = false;
		} else {
			this.wasReleased = true;
		}
	}

	update() {
		this.wasPressed = this.pressed;
		if (this.wasReleased)
			this.pressed = false;
	}

	clicked() {
		return this.pressed && !this.wasPressed;
	}

	released() {
		return !this.pressed && this.wasPressed;
	}
}