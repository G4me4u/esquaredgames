
class SnakeApp extends ESApp {

	constructor() {
		super();
	}

	init() {
		super.init();

		this.setMenu(new ESWorldMenu(this, new SnakeWorld(this)));
	
		return true;
	}
}

new SnakeApp().start();
