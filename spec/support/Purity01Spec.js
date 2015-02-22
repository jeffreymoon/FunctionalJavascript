var _ = require("../../node_modules/underscore/underscore");

// describe("randString", function() {
// 	it("builds a string of lowercase ASCII letters/digits", function() {
// 		expect(randString()).to???(???);
// 	});
// });

describe("_.map", function() {
	it("should return an array made from ...", function() {
		expect(_.map([1, 2, 3], sqr)).toEqual([1, 4, 9]);
	});
});

PI = 3.14;
// PI = "Magnum";
function areaOfACircle(radius) {
	return PI * sqr(radius);
}


/****************************************************************/
function validator(message, fun) {
	var f = function(/* args */) {
		return fun.apply(fun, arguments);
	};

	f['message'] = message;
	return f;
}

var zero = validator("cannot be zero", function(n) { return 0 === n });
var number = validator("arg must be a number", _.isNumber);

function sqr(n) {
	if (!number(n)) throw new Error(number.message);
	if (zero(n)) throw new Error(zero.message);

	return n * n;
}

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
	}
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