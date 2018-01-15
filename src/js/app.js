
class App {

	constructor() {
		this.screen = null;
		this.timer = null;
	
		this.running = false;
	}

	init() {
		const canvas = document.getElementById("screen");
		if (!canvas) {
			logger.fatal("Canvas not found! Make sure it has id: screen");
			return false;
		}

		this.screen = new Screen(canvas, WIDTH, HEIGHT);
		this.timer = new Timer(TPS, DEBUG);

		return true;
	}

	start() {
		logger.info("Launching...");
		if (!this.init())
			throw "Unable to launch";

		logger.info("Launch successful!");

		this.running = true;

		this.timer.init();
		this.loop();
	}

	loop() {
		if (!this.running)
			return;

		this.timer.clock();

		while (this.timer.missingTicks > 0) {
			this.tick();
			this.timer.tickPassed();
		}

		this.draw();
		this.timer.framePassed();

		this.timer.timeout(() => this.loop(), FPS);
	}

	tick() {

	}

	draw() {


		this.screen.drawToScreen();
	}
}

new App().start();