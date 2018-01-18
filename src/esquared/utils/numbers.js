
Math.clamp = function(min, max, value) {
	return value < min ? min : (value > max ? max : value);
}