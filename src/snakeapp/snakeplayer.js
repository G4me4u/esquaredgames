
class SnakePlayer extends ESEntity {

	constructor(world, x, y, controller) {
		super(world, x, y, SNAKE_PLAYER_COLOR, SNAKE_ENTITY_HEAD);

		this.dir = DIRECTION_UP;
		this.controller = controller;

		this.movements = { };
		this.movements[KEY_UP]    = DIRECTION_UP;
		this.movements[KEY_RIGHT] = DIRECTION_RIGHT;
		this.movements[KEY_DOWN]  = DIRECTION_DOWN;
		this.movements[KEY_LEFT]  = DIRECTION_LEFT;
	}

	update() {
		const input = this.controller.getLatestInput();
		if (input != null && input.control in this.movements && input.pressed) {
			const nextDir = this.movements[input.control];
			if (this.dir != nextDir && this.dir != nextDir.getOpposite())
				this.dir = nextDir;
		}

		switch (this.dir) {
		case DIRECTION_UP:
			this.pos.y -= 1
			break;
		case DIRECTION_RIGHT:
			this.pos.x += 1
			break;
		case DIRECTION_DOWN:
			this.pos.y += 1
			break;
		case DIRECTION_LEFT:
			this.pos.x -= 1
			break;
		}

		super.update();

		if (!this.dead) {
			if (this.world.isColliding(this, SNAKE_ENTITY_TAIL)) {
				this.setDead();
			} else if (this.world.isColliding(this, SNAKE_ENTITY_FOOD)) {
				this.world.summonTail();
				this.world.summonFood();
			}
		}
	}

	

}