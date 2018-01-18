
class MSApp extends ESApp {

	constructor() {
		super();

		this.world = null;
	}

	init() {
		super.init();

		this.world = new MSWorld(this);
	
		return true;
	}

	update() {
		this.world.update();
	}

	render() {
		this.world.render();
	}
}

new MSApp().start();
