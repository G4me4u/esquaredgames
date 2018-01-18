
class LOTile extends ESTile {
	
	constructor(selected) {
		super();
		
		this.selected = selected;
	}

	toggle() {
		this.selected = !this.selected;
	}

	getColor() {
		return this.selected ? LO_SELECT_COLOR : null;
	}
}