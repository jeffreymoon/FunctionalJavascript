//함수 level에서 불변성
var _ = require("underscore");

var freq = curry2(_.countBy)(_.identity);

var rand = partial1(_.random, 1);
var a = repeatedly(1000, partial1(rand, 3));

var copy = _.clone(a);

console.log(freq(a));
console.log(_.isEqual(a, copy));

// 순수성을 준수한다면 두개 이상의 함수를 이용하여 
//새로운 동작을 구현해도 여전히 순수한 함수이다.
console.log(freq(skipTake(2, a)));
console.log(_.isEqual(a, copy));

// 순수성을 꼭 유지할 필요는 없으며 객체의 내용을 바꿔야 할 때도 있다.
var person = {fname: "Simon"};
console.log(_.extend(person, {lname: "Petrikov"}, {age: 28}, {age: 108}));
// _.extend는 인자의 첫 번째 객체를 변형시킨다
console.log(person);

// 객체를 extend라기 보다는 merge한다는 말이 더 적절하다
function merge(/* args */) {
	return _.extend.apply(null, construct({}, arguments));
}

var person1 = {fname: "Simon"};

console.log(merge(person1, {lname: "Petrikov"}, {age: 28}, {age: 108}));
console.log(person1);
// merge함수를 이용해 순수성을 달성하다

//*********************************************************************

function skipTake(n, coll) {
	var ret = [];
	var sz = _.size(coll);

	for(var index = 0; index < sz; index += n) {
		ret.push(coll[index]);
	}

	return ret;
}

function curry2(fun) {
	return function(secondArg) {
		return function(firstArg) {
			return fun(firstArg, secondArg);
		};
	};
}

function repeatedly(times, fun) {
	return _.map(_.range(times), fun);
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

function existy(x) { return x != null };

function partial1(fun, arg1) {
	return function(/* args */) {
		var args = construct(arg1, arguments);
		return fun.apply(fun, args);
	};
}