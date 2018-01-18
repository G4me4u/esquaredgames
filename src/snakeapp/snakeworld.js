
class SnakeWorld extends ESWorld {

	constructor(app) {
		super(app);
	}

	reset() {
		super.reset();

		this.foodEntity = null;
		this.player = new SnakePlayer(this, WIDTH >> 1, HEIGHT >> 1, this.app.controller);

		this.nextTailParent = this.player;

		this.addEntity(this.player);
		this.summonFood();

		this.score = 0;

		this.app.setTps(SNAKE_START_TPS);
	}

	summonFood() {
		if (this.foodEntity != null) 
			this.removeEntity(this.foodEntity);

		this.foodEntity = new ESEntity(this, 0, 0, SNAKE_FOOD_COLOR, SNAKE_ENTITY_FOOD);

		let foundPos = false;
		while (!foundPos) {
			const x = Math.floor(Math.random() * WIDTH);
			const y = Math.floor(Math.random() * HEIGHT);
			
			this.foodEntity.pos.setXY(x, y);
			foundPos = !this.isColliding(this.foodEntity);
		}

		this.addEntity(this.foodEntity);
	}

	summonTail() {
		const tail = new SnakeTail(this, this.nextTailParent);
		this.nextTailParent = tail;
		this.addEntity(tail);
		
		this.score += 1;
		this.app.incrementTps(SNAKE_TPS_INCREMENTATION);
	}

	hasWon() {
		return this.score >= WIDTH * HEIGHT;
	}

	update() {
		if (!this.gameOver) {
			const won = this.hasWon();
			if (won || this.player.dead) {
				this.setGameOver(won);
				this.app.setTps(SNAKE_GAMEOVER_TPS);
			}
		} else if (this.app.controller.getInput(KEY_MIDDLE).clicked()){
			this.reset();
			return;
		}

		super.update();
	}
}