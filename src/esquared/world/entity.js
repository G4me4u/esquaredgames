const ENTITY_UNDEFINED = -1;

class ESEntity {

	constructor(world, x, y, color, type=ENTITY_UNDEFINED) {
		this.world = world;

		this.pos = new ESVec2(x, y);
		this.color = color;
		this.type = type;

		this.dead = false;
	}

	update() {
		if (this.pos.x < 0 || this.pos.x >= WIDTH)
			this.outOfBounds();
		if (this.pos.y < 0 || this.pos.y >= HEIGHT)
			this.outOfBounds();
	}

	outOfBounds() {
		this.setDead();
	}

	collides(entity) {
		return this.pos.equals(entity.pos);
	}

	setDead() {
		this.dead = true;
	}
}