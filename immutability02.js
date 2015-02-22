//불변성과 재귀의 관계
var _ = require("underscore");

console.log(summ(_.range(1, 11)));
console.log(summRec([], 0));
console.log(summRec(_.range(1, 11), 0));

// 재귀를 이용한 summ
function summRec(array, seed) {
	if (_.isEmpty(array)) {
		return seed;
	} else {
		return summRec(_.rest(array), _.first(array) + seed);
	}
}

//전통적인 함수형 프로그래밍 언어에서는 다음과 같이 구현할 수 없다.
function summ(array) {
	var result = 0;
	var sz = array.length;

	for (var i = 0; i < sz; i++) {
		result += array[i];
	}

	return result;
}