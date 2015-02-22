// purity와 멱등의 관계
// 멱등: 어떤 동작을 여러 번 실행한 결과와 한 번 실행한 결과가 같은 경우
// ex]
// someFun(arg) == _.compose(someFun, someFun)(arg);

var _ = require("underscore");

// second함수는 멱등이 아니다
var a = [1, [10, 20, 30], 3];
var secondTwice = _.compose(second, second);
console.log(second(a) === secondTwice(a));

// _.identity는 멱등이다
var dissociativeIdentity = _.compose(_.identity, _.identity);
console.log(_.identity(42) === dissociativeIdentity(42));

// Math.abs도 멱등이다
console.log(Math.abs(Math.abs(-42)));


/************************************************/
function second(a) {
	return _.first(_.rest(a));
}

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