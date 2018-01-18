
class ESVec2 {

	constructor(x=0.0, y=0.0) {
		this.x = x;
		this.y = y;
	}

	add(vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
		return this;
	}

	sub(vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
		return this;
	}

	mul(vec2) {
		this.x *= vec2.x;
		this.y *= vec2.y;
		return this;
	}

	div(vec2) {
		this.x /= vec2.x;
		this.y /= vec2.y;
		return this;
	}
	
	addXY(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}

	subXY(x, y) {
		this.x -= x;
		this.y -= y;
		return this;
	}

	mulXY(x, y) {
		this.x *= x;
		this.y *= y;
		return this;
	}

	divXY(x, y) {
		this.x /= x;
		this.y /= y;
		return this;
	}

	addC(c) {
		this.x += c;
		this.y += c;
		return this;
	}

	subC(c) {
		this.x -= c;
		this.y -= c;
		return this;
	}

	mulK(c) {
		this.x *= c;
		this.y *= c;
		return this;
	}

	divC(c) {
		this.x /= c;
		this.y /= c;
		return this;
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}
	
	dot(vec2) {
		return this.x * vec2.x + 
		       this.y * vec2.y;
	}

	lengthSqr() {
		return this.dot(this);
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	set(vec2) {
		this.x = vec2.x;
		this.y = vec2.y;
		return this;
	}

	setXY(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	normalize() {
		const len = this.length();
		this.x /= len;
		this.y /= len;
		return this;
	}

	equals(other) {
		if (other instanceof ESVec2)
			return this.x == other.x && 
			       this.y == other.y;
		return false;
	}
	
	toString() {
		return this.x + ", " + this.y;
	}
}
