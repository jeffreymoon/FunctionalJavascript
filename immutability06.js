// 객체는 대체로 저수준의 동작을 한다
var _ = require("underscore");

var SaferQueue = function(elems) {
	this._q = _.clone(elems);
}

SaferQueue.prototype = {
	enqueue: function(thing) {
		return new SaferQueue(cat(this._q, [thing]));
	}
};

var q = SaferQueue([1, 2, 3]);
console.log(q);
console.log(q.enqueue(32)); // TypeError: Cannot call method 'enqueue' of undefined

// 생성자 함수를 선호
function queue() {
	return new SaferQueue(_.toArray(arguments));
}

var qq = queue(2, 4, 6);
console.log(qq.enqueue(64));

// invoker를 이용하여 enqueue로 위임할 수 도 있음
var enqueue = invoker('enqueue', SaferQueue.prototype.enqueue);
console.log(enqueue(qq, 42));
// method call이 아닌 함수를 이용할 때의 flexibility
// - 실제 type이 무엇인지 고려할 필요가 없다.
// - 상황에 따라 적절한 type으로 반환할 수 있다.
// - type이나 method가 바뀌면 함수만 변경하면 된다.
// - 필요하면 선,후 조건을 추가할 수 있다.
// - 여러개의 함수를 조합할 수 있다.

// OO와 FP는 상호 보완하는 관계이다.

/***********************************************************/

function cat() {
	var head = _.first(arguments);
	if (existy(head))
		return head.concat.apply(head, _.rest(arguments));
	else
		return [];
}

function existy(x) { return x != null };

function invoker (NAME, METHOD) {
	return function(target /* args ... */) {
		if (!existy(target)) fail("Must provide a target");
		var targetMethod = target[NAME];
		var args = _.rest(arguments);
		return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
			return targetMethod.apply(target, args);
		});
	};
};

function doWhen(cond, action) {
	if(truthy(cond))
		return action();
	else
		return undefined;
}

function truthy(x) { return (x !== false) && existy(x) };
