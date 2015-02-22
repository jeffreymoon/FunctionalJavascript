// 객체의 불변성
var _ = require("underscore");
var zero = validator("cannot be zero", function(n) { return 0 === n });
var number = validator("arg must be a number", _.isNumber);

function Point(x, y) {
	this._x = x;
	this._y = y;
}

Point.prototype = {
	withX: function(val) {
		return new Point(val, this._y);
	},
	withY: function(val) {
		return new Point(this._x, val);
	}
};

var p = new Point(0, 1);

console.log(p.withX(1000));
// p는 원해의 값을 유지한다
console.log(p);

console.log(new Point(0, 1).withX(100).withY(-100));

// 객체의 불변성 규칙
// - 불변성객체는 생성시 자신의 값을 채운 이후 절대 바뀌지 않는다
// - 불변성객체는 행하는 모든 동작의 결과로 새로운 객체가 반환된다

// 위의 두 규칙을 준수하더라도 겪는 문제
function Queue(elems) {
	this._q = elems;
}

Queue.prototype = {
	enqueue: function(thing) {
		return new Queue(cat(this._q, [thing]));
	}
};

var seed = [1, 2, 3];
var q = new Queue(seed);
console.log(q);

var q2 = q.enqueue(108);
console.log(q2);
console.log(q); // q는 변하지 않음

seed.push(10000);
console.log(q); // seed를 변경하면 q가 바뀜

// 새로운 객체를 이용하여 해결
var SaferQueue = function(elems) {
	this._q = _.clone(elems);
}

SaferQueue.prototype = {
	enqueue: function(thing) {
		return new SaferQueue(cat(this._q, [thing]));
	}
};

var seed1 = [1, 4, 9];
var qq = new SaferQueue(seed1);

var qq2 = qq.enqueue(36);
console.log(qq2);

seed1.push(1000);
console.log(qq); // qq는 불변

// 하지만 여전히 _q는 외부에 노출되어 있음
qq._q.push(-1111);
console.log(qq);

// method의 교체도 가능
SaferQueue.prototype.enqueue = sqr;
console.log(qq2.enqueue(42));

// 안전을 완벽하게 책임질 수는 없다 => 일정한 규칙을 만들고 지켜야 함.

/***********************************************/

function cat() {
	var head = _.first(arguments);
	if (existy(head))
		return head.concat.apply(head, _.rest(arguments));
	else
		return [];
}

function existy(x) { return x != null };

function validator(message, fun) {
	var f = function(/* args */) {
		return fun.apply(fun, arguments);
	};
	f['message'] = message;
	return f;
}

function sqr(n) {
	if (!number(n)) throw new Error(number.message);
	if (zero(n)) throw new Error(zero.message);
	return n * n;
}