
class SnakeTail extends ESEntity {

	constructor(world, parent) {
		super(world, parent.pos.x, parent.pos.y, parent.color, SNAKE_ENTITY_TAIL);

		this.parent = parent;
	}

	update() {
		this.pos.set(this.parent.pos);
		
		super.update();
	}
}