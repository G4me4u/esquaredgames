
class Vec3 {
	constructor(x = 0.0, y = 0.0, z = 0.0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(vec3) {
		this.x += vec3.x;
		this.y += vec3.y;
		this.z += vec3.z;
		return this;
	}

	sub(vec3) {
		this.x -= vec3.x;
		this.y -= vec3.y;
		this.z -= vec3.z;
		return this;
	}

	mul(vec3) {
		this.x *= vec3.x;
		this.y *= vec3.y;
		this.z *= vec3.z;
		return this;
	}

	div(vec3) {
		this.x /= vec3.x;
		this.y /= vec3.y;
		this.z /= vec3.z;
		return this;
	}
	
	addXYZ(x, y, z) {
		this.x += x;
		this.y += y;
		this.z += z;
		return this;
	}

	subXYZ(x, y, z) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		return this;
	}

	mulXYZ(x, y, z) {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		return this;
	}

	divXYZ(x, y, z) {
		this.x /= x;
		this.y /= y;
		this.z /= z;
		return this;
	}

	addC(c) {
		this.x += c;
		this.y += c;
		this.z += c;
		return this;
	}

	subC(c) {
		this.x -= c;
		this.y -= c;
		this.z -= c;
		return this;
	}

	mulC(c) {
		this.x *= c;
		this.y *= c;
		this.z *= c;
		return this;
	}

	divC(c) {
		this.x /= c;
		this.y /= c;
		this.z /= c;
		return this;
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}
	
	dot(vec3) {
		return this.x * vec3.x + 
		       this.y * vec3.y + 
		       this.z * vec3.z;
	}

	lengthSqr() {
		return this.dot(this);
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	set(vec3) {
		this.x = vec3.x;
		this.y = vec3.y;
		this.z = vec3.z;
		return this;
	}

	setV2Z(vec2, z) {
		this.x = vec2.x;
		this.y = vec2.y;
		this.z = z;
		return this;
	}

	setXV2(x, vec2) {
		this.x = x;
		this.y = vec2.x;
		this.z = vec2.y;
		return this;
	}

	setXYZ(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	normalize() {
		const len = this.length();
		this.x /= len;
		this.y /= len;
		this.z /= len;
		return this;
	}
	
	equals(other) {
		if (other instanceof Vec3)
			return this.x == other.x && 
			       this.y == other.y &&
			       this.z == other.z;
		return false;
	}

	toString() {
		return this.x + ", " + this.y + ", " + this.z;
	}
}
