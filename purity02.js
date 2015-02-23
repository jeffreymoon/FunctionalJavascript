// 순수한 부분과 비순수한 부분의 분리
var _ = require("underscore");
var rand = partial1(_.random, 1);

function generateRandomCharacter() {
	return rand(26).toString(36);
}

function generateString(charGen, len) {
	return repeatedly(len, charGen).join('');
}

console.log(generateString(generateRandomCharacter, 20));

var composedRandomString = partial1(generateString, generateRandomCharacter);

console.log(composedRandomString(10));

/************************************************/
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