
class LOApp extends ESApp {
	
		constructor() {
			super();
	
			this.world = null;
		}
	
		init() {
			super.init();
	
			this.world = new LOWorld(this);
		
			return true;
		}
	
		update() {
			this.world.update();
		}
	
		render() {
			this.world.render();
		}
	}
	
	new LOApp().start();
	