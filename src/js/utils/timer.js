
class Timer {

	constructor(tps, debug=false) {
		this.tps = tps;
		this.debug = debug;
		
		this.last = 0;
		
		this.missingTicks = 0;
		
		this.dt = 0.0;
		this.ds = 0.0;
		
		this.ticks = 0;
		this.frames = 0;
	}

	init() {
		this.last = Date.now();
		
		this.missingTicks = 0;
		
		this.dt = 1.0;
		this.ds = 0.0;
		
		this.ticks = 0;
		this.frames = 0;
	}

	setTps(tps) {
		this.tps = tps;
	}

	incrementTps(deltaTps) {
		this.tps += deltaTps;
	}
	
	clock() {
		let now = Date.now();
		let deltaS = (now - this.last) / 1000.0;
		this.last = now;
		
		this.dt += deltaS * this.tps;
		let ticksToGo = Math.floor(this.dt);
		this.missingTicks += ticksToGo;
		this.dt -= ticksToGo;
		
		if (this.debug) {
			this.ds += deltaS;
			if (this.ds >= 1.0) {
				this.ds -= 1.0;
				if (this.ds >= 1.0)
					this.ds = 0.0;
				
				logger.info("Tps: " + this.ticks + " Fps: " + this.frames);
				
				this.ticks = 0;
				this.frames = 0;
			}
		}
	}

	tickPassed() {
		this.ticks++;
		this.missingTicks--;
	}
	
	framePassed() {
		this.frames++;
	}
	
	timeout(callback, minFps) {
		const msPassed = Date.now() - this.last;

		if (this.tps < minFps) {
			minFps -= (minFps % this.tps);
		} else minFps = this.tps;
		
		const msToSleep = Math.floor(1000 / (minFps + 1)) - msPassed;
		setTimeout(callback, msToSleep > 0 ? msToSleep : 0);
	}
}