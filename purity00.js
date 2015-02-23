var _ = require("underscore");

var rand = partial1(_.random, 1);
console.log(rand(10));
console.log(repeatedly(10, partial1(rand, 10)));
console.log(_.take(repeatedly(100, partial1(rand, 10)), 5));
console.log(randString(0));
console.log(randString(1));
console.log(randString(10));

/****************************************************************/
function randString(len) {
	var ascii = repeatedly(len, partial1(rand, 26));
	return _.map(ascii, function(n) {
		return n.toString(36);
	}).join("");
}

function partial1(fun, arg1) {
	return function(/* args */) {
		var args = construct(arg1, arguments);
		return fun.apply(fun, args);
	};
}

function construct(head, tail) {
	return cat([head], _.toArray(tail));
}

function cat() {
	var head = _.first(arguments);
	if (existy(head))
		return head.concat.apply(head, _.rest(arguments));
	else
		return [];
}

function existy(x) {
	return x != null;
}

function repeatedly(times, fun) {
	return _.map(_.range(times), fun);
}