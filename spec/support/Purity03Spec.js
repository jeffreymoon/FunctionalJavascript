var _ = require("../../node_modules/underscore/underscore");
var rand = partial1(_.random, 1);
var composedRandomString = partial1(generateString, generateRandomCharacter);

describe("generateString", function() {
	var result = generateString(always("a"), 10);
	
	it("should return a string of a specific length", function() {
		expect(result.constructor).toBe(String);
		expect(result.length).toBe(10);
	});

	it("should return a string congruent with its char generator", function() {
		expect(result).toEqual("aaaaaaaaaa");
	});
});



function always(VALUE) {
	return function() {
		return VALUE;
	};
}

function generateRandomCharacter() {
	return rand(26).toString(36);
}

function generateString(charGen, len) {
	return repeatedly(len, charGen).join('');
}

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