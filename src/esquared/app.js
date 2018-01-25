
class ESApp {

	constructor() {
		this.timer = null;

		this.screen = null;
		this.controller = null;
		this.menu = null;
	
		this.running = false;
	}

	init() {
		const canvas = document.getElementById("screen");
		if (!canvas) {
			logger.fatal("Canvas not found! Make sure it has id: screen");
			return false;
		}

		this.timer = new ESTimer(TPS, DEBUG);

		this.screen = new ESScreen(canvas, WIDTH, HEIGHT);
		this.controller = new ESController();

		this.menu = null;

		document.addEventListener("keydown", (event) => this.controller.handleEvent(event, true ));
		document.addEventListener("keyup",   (event) => this.controller.handleEvent(event, false));

		return true;
	}

	setMenu(menu) {
		if (this.menu != null) {
			tmpMenu = this.menu;
			this.menu = null;
			tmpMenu.exitMenu();
		}
		
		this.menu = menu;
		this.menu.enterMenu();
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
			this.preupdate();
			this.update();
			this.postupdate();
			this.timer.tickPassed();
		}

		this.prerender();
		this.render();
		this.postrender();
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

	preupdate() {
		this.controller.update();
		
		if (this.menu != null)
			this.menu.update();
	}

	update() {
		
	}

	postupdate() {
	}

	prerender() {
		this.clear();

		if (this.menu != null)
			this.menu.render();
	}

	render() {
	}

	postrender() {
		this.screen.drawToScreen();
	}
}
