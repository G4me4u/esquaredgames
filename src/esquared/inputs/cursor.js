
class ESCursor {

	constructor(app, color, cursorToggleTime) {
		this.app = app;
		this.color = color;
		this.cursorToggleTime = cursorToggleTime;
	
		this.controls = [ 
			KEY_UP, 
			KEY_RIGHT, 
			KEY_DOWN, 
			KEY_LEFT 
		];

		this.dirs = [ 
			new ESVec2( 0, -1),
			new ESVec2( 1,  0),
			new ESVec2( 0,  1),
			new ESVec2(-1,  0)
		];

		this.x = 0;
		this.y = 0;

		this.cursTimer = 0;
	}

	setPos(cx, cy) {
		this.x = Math.clamp(0, WIDTH  - 1, cx);
		this.y = Math.clamp(0, HEIGHT - 1, cy);
	}

	update() {
		for (let i = 0; i < this.controls.length; i++) {
			if (this.app.controller.getInput(this.controls[i]).clicked()) {
				const direction = this.dirs[i];
				
				this.x = Math.clamp(0, WIDTH  - 1, this.x + direction.x);
				this.y = Math.clamp(0, HEIGHT - 1, this.y + direction.y);

				this.cursTimer = 0;

				break;
			}
		}

		this.cursTimer++;
	}

	render() {
		if ((this.cursTimer % this.cursorToggleTime) < (this.cursorToggleTime >> 1))
			this.app.setPixel(this.x, this.y, this.color);
	}
}