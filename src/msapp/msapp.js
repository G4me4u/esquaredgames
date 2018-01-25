
class MSApp extends ESApp {

	constructor() {
		super();
	}

	init() {
		super.init();

		this.setMenu(new ESWorldMenu(this, new MSWorld(this)));
	
		return true;
	}
}

new MSApp().start();
