var _ = require("./node_modules/underscore/underscore");

function second(a) {
	return nth(a, 1);
}

console.log(nth(['a', 'b', 'c'], 1));
console.log(nth(['a', 'b', 'c'], 1));

var a = ['a', 'b', 'c'];
console.log(nth(a, 1));
console.log(a === a);
console.log(nth(a, 1));
console.log(_.isEqual(a, ['a', 'b', 'c']));

console.log(nth([{a: 1}, {b: 2}], 0));
nth([function() { console.log('blah') }], 0);

// 인자를 변형시키지 않고 외부의 값에 의존하지 않는 순수한 함수를 정의
function second(a) {
	return a[1];
}

function second(a) {
	return _.first(_.rest(a));
}

function second() {
	return 'b';
}


/************************************************/
function nth(a, index) {
	if (!_.isNumber(index)) fail("Expected a number as the index");
	if (!isIndexed(a)) fail("Not supported on non-indexed type");
	if ((index < 0) || (index > a.length - 1))
		fail("Index value is out of bounds");
	return a[index];
}

function isIndexed(data) {
	return _.isArray(data) || _.isString(data);
}