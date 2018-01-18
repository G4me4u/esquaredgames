
class SnakeApp extends ESApp {
	
		constructor() {
			super();
	
			this.world = null;
		}
	
		init() {
			super.init();
	
			this.world = new SnakeWorld(this);
		
			return true;
		}
	
		update() {
			this.world.update();
		}
	
		render() {
			this.world.render();
		}
	}
	
	new SnakeApp().start();
	