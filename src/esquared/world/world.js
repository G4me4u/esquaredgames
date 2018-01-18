
class ESWorld {

	constructor(app) {
		this.app = app;

		this.entities = null;

		this.gameOver = false;
		this.wonGame = false;

		this.time = 0;
		this.gameOverAnim = 4;

		this.reset();
	}

	reset() {
		this.entities = [];

		this.gameOver = false;
		this.wonGame = false;

		this.time = 0;
		this.gameOverAnim = 4;
	}

	setGameOver(win) {
		this.gameOver = true;
		this.wonGame = win;
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	removeEntity(entity) {
		const len = this.entities.length;
		for (let i = 0; i < len; i++)
			if (this.entities[i] == entity)
				this.entities.pop(i);
	}

	isColliding(entity, type=ENTITY_UNDEFINED) {
		const udef = type == ENTITY_UNDEFINED;
		for (let ent of this.entities)
			if ((udef || ent.type == type) && ent.collides(entity))
				return ent;
		return null;
	}

	renderEntity(entity) {
		this.app.setPixel(entity.pos.x, entity.pos.y, entity.color);
	}

	update() {
		this.time++;

		if (this.gameOver)
			return;

		let i = this.entities.length - 1;
		while (i >= 0) {
			const ent = this.entities[i];
			ent.update();
			if (ent.dead) {
				this.entities.pop(i);
			} else i--;
		}
	}

	renderGame() {
		for (let ent of this.entities)
			this.renderEntity(ent);
	}

	renderGameOver() {
		if ((this.time % this.gameOverAnim) >= (this.gameOverAnim >> 1))
			return;
		this.app.clear(this.wonGame ? COLOR_GREEN : COLOR_RED);
	}

	render() {
		if (this.gameOver) {
			this.renderGameOver();
		} else {
			this.renderGame();
		}
	}
}