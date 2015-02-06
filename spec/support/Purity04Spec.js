var _ = require("../../node_modules/underscore/underscore");
var rand = partial1(_.random, 1);
var composedRandomString = partial1(generateString, generateRandomCharacter);

describe("generateRandomCharacter", function() {
	var result = repeatedly(10000, generateRandomCharacter());
	
	it("should return only strings of length 1", function() {
		expect(_.every(result, _.isString)).toBeTruthy();
		expect(_.every(result, function(s) { return s.length === 1 })).toBeTruthy();
	});
	
	it("should return a string of only lowercase ASCII letters or digits", function() {
		expect(_.every(result, function(s) {
			return /[a-z0-9]/.test(s) })).toBeTruthy();
		expect(_.any(result, function(s) { return /[A-Z]/.test(s) })).toBeFalsy();
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