
Array.makeArray = function(len, val=null) {
	const arr = [];
	for (let i = 0; i < len; i++) 
		arr.push(val);
	return arr;
}