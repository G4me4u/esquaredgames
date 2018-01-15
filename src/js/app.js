
class App {

	constructor() {
		this.timer = null;

		this.screen = null;
		this.controller = null;

		this.world = null;
	
		this.running = false;
	}

	init() {
		const canvas = document.getElementById("screen");
		if (!canvas) {
			logger.fatal("Canvas not found! Make sure it has id: screen");
			return false;
		}

		this.timer = new Timer(TPS, DEBUG);

		this.screen = new Screen(canvas, WIDTH, HEIGHT);
		this.controller = new Controller();

		this.world = new MSWorld(this);

		document.addEventListener("keydown", (event) => this.controller.handleEvent(event, true ));
		document.addEventListener("keyup",   (event) => this.controller.handleEvent(event, false));

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
			this.update();
			this.timer.tickPassed();
		}

		this.render();
		this.timer.framePassed();

		this.timer.timeout(() => this.loop(), FPS);
	}

	setPixel(px, py, color) {
		this.screen.setPixel(px, py, color);
	}

	clear(color=COLOR_BLACK) {
		for (let py = 0; py < HEIGHT; py++)
			for (let px = 0; px < WIDTH; px++)
				this.setPixel(px, py, color);
	}

	setTps(tps=DEFAULT_TPS) {
		this.timer.setTps(tps);
	}

	incrementTps(deltaTps) {
		this.timer.incrementTps(deltaTps);
	}

	update() {
		this.controller.update();
		this.world.update();
	}

	render() {
		this.clear();
		this.world.render();
		this.screen.drawToScreen();
	}
}

new App().start();