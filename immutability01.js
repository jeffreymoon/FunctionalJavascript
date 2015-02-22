//
var _ = require("./node_modules/underscore/underscore");

console.log(skipTake(2, [1, 2, 3, 4]));
console.log(skipTake(3, _.range(20)));


function skipTake(n, coll) {
	var ret = [];
	var sz = _.size(coll);

	for(var index = 0; index < sz; index += n) {
		ret.push(coll[index]);
	}

	return ret;
}
