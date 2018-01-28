
class LOApp extends ESApp {

	constructor() {
		super();
	}

	init() {
		super.init();

		this.setMenu(new ESWorldMenu(this, new LOWorld(this)));
	
		return true;
	}
}

new LOApp().start();
