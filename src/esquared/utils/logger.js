const LEVEL_NONE = 0;
const LEVEL_FATAL = 1;
const LEVEL_ERROR = 2;
const LEVEL_WARN = 3;
const LEVEL_INFO = 4;

class ESLogger {
	
	constructor() {
		this.level = LEVEL_INFO;
	}
	
	setLevel(level) {
		this.level = level;
	}
	
	info(...msgs) {
		this.log(LEVEL_INFO, "INFO", ...msgs);
	}
	
	warn(...msgs) {
		this.log(LEVEL_WARN, "WARN", ...msgs);
	}
	
	error(...msgs) {
		this.log(LEVEL_ERROR, "ERROR", ...msgs);
	}
	
	fatal(...msgs) {
		this.log(LEVEL_FATAL, "FATAL", ...msgs);
	}
	
	log(level, levelName, ...msgs) {
		if (level > this.level)
			return;
		const msg = msgs.toString();
		console.log("[" + levelName + "]: " + msg);
	}
}

const logger = new ESLogger();
