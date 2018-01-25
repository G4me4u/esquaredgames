
class ESWorldMenu extends ESMenu {

	constructor(app, world) {
		super(app);

		this.world = world;
	}

	update() {
		this.world.update();
	}

	render() {
		this.world.render();
	}
}