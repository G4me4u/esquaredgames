
class App {

	constructor() {
		this.screen = null;
	
		this.running = false;
	}

	init() {
		const canvas = document.getElementById("screen");
		if (!canvas) {
			logger.fatal("Canvas not found! Make sure it has id: screen");
			return false;
		}

		this.screen = new Screen(canvas, 10, 10);

		return true;
	}

	start() {
		logger.info("Launching...");
		if (!this.init())
			throw "Unable to launch";

		logger.info("Launch successful!");

		this.running = true;
		this.loop();
	}

	loop() {
		if (!this.running)
			return;

		this.screen.setPixel(0, 0, BLUE);
		this.screen.setPixel(0, 1, RED);
		this.screen.setPixel(1, 1, MAGENTA);

		this.screen.drawToScreen();
	}
}

new App().start();