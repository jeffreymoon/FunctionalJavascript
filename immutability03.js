// 방어적인 얼리기와 복제
var _ = require("underscore");
var a = [1, 2, 3];

a[1] = 42;

console.log(a);

Object.freeze(a);

a[1] = 108;

console.log(a);
console.log(Object.isFrozen(a));

//전체 코드를 완벽하게 제어하지 못하면 알아채기 힘든 에러가 발생할 수 있다.
//Object#freeze는 shallow 방식으로 동작하는 메서드이다.
var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
Object.freeze(x);
x[0] = "";
console.log(x);

x[1]['c']['d'] = 100000;
console.log(x);

var y = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
deepFreeze(y);
y[0] = null;
console.log(y);

y[1]['c']['d'] = 42;
console.log(y);

// 얕은 복사가 적절하다고 판단될때는 _.clone을 사용한다
// 구조체를 복사할 때는 deepClone을 사용한다
// 순수한 함수로만 구현한다

function deepFreeze(obj) {
	if (!Object.isFrozen(obj)) {
		Object.freeze(obj);
	}

	for (var key in obj) {
		if (!obj.hasOwnProperty(key) || !_.isObject(obj[key])) {
			continue;
		}

		deepFreeze(obj[key]);
	}
}