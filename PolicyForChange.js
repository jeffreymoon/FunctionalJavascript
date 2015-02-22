// Policies for changes
var _ = require("underscore");
var zero = validator("cannot be zero", function(n) { return 0 === n });
var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });
var sqrPre = condition1(
	validator("arg must not be zero", complement(zero)),
	validator("arg must be a number", _.isNumber));
var checkedSqr = partial1(sqrPre, uncheckedSqr);
var sqrPost = condition1(
	validator("result should be a number", _.isNumber),
	validator("result should not be zero", complement(zero)),
	validator("result should be positive", greaterThan(0)));
var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

//var container = contain({name: "Lemonjon"});

// contatiner#set을 이용하는 방법
//container.set({name: "Lemongrab"});
// 함수 호출의 결과로 만드는 방법
// : 예측할 수 있는 함수에 의해 값이 변경된다
//container.update(merge, {name: "Lemongrab"});

// container를 사용하지 않은 경우
var being = {name: "Lemonjon"};
being.name = "Lemongrab";


// container type을 간단하게 구현한 예
function Container(init) {
	this._value = init;
}

// 다음과 같이 사용할 수 있다.
var aNumber = new Container(42);
console.log(aNumber);

Container.prototype = {
	update: function(fun /*, args */) {
		var args = _.rest(arguments);
		var oldValue = this._value;
		this._value = fun.apply(this, construct(oldValue, args));
		return this._value;
	}
};

var aNumber = new Container(42);
console.log(aNumber.update(function(n) { return n + 1 }));
console.log(aNumber);

// 여러 인자를 갖는 예제
console.log(aNumber.update(function(n, x, y, z) { return n / x / y / z }, 1, 2, 3));

// 정상적이지 않은 경우
console.log(aNumber.update(_.compose(megaCheckedSqr, always(0))));

/****************************************************************/
function cat() {
	var head = _.first(arguments);
	if (existy(head))
		return head.concat.apply(head, _.rest(arguments));
	else
		return [];
}

function existy(x) { return x != null };

function construct(head, tail) {
	return cat([head], _.toArray(tail));
}

function validator(message, fun) {
	var f = function(/* args */) {
		return fun.apply(fun, arguments);
	};
	f['message'] = message;
	return f;
}

function complement(PRED) {
	return function() {
		return !PRED.apply(null, _.toArray(arguments));
	};
}

function curry2(fun) {
	return function(secondArg) {
		return function(firstArg) {
			return fun(firstArg, secondArg);
		};
	};
}

function condition1(/* validators */) {
	var validators = _.toArray(arguments);
	return function(fun, arg) {
		var errors = mapcat(function(isValid) {
			return isValid(arg) ? [] : [isValid.message];
		}, validators);
		if (!_.isEmpty(errors))
			throw new Error(errors.join(", "));
		return fun(arg);
	};
}

function partial(fun /*, pargs */) {
	var pargs = _.rest(arguments);
	return function(/* arguments */) {
		var args = cat(pargs, _.toArray(arguments));
		return fun.apply(fun, args);
	};
}

function uncheckedSqr(n) { return n * n };

function partial1(fun, arg1) {
	return function(/* args */) {
		var args = construct(arg1, arguments);
		return fun.apply(fun, args);
	};
}

function always(VALUE) {
	return function() {
		return VALUE;
	};
};

function mapcat(fun, coll) {
	return cat.apply(null, _.map(coll, fun));
}

