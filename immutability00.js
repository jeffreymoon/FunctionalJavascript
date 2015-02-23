// 문자열을 불변성을 지니지만 객체는 변할 수 있다.
var _ = require("./node_modules/underscore/underscore");

var s = "Lemongrab";

console.log(s.toUpperCase());
console.log(s);

var key = "lemongrab";
var obj = {lemongrab: "Earl"};

console.log(obj[key] === "Earl");

key = key.toUpperCase;
console.log(obj[key]); // undefined

console.log(obj["lemongrab"]);


var obj2 = {lemongrab: "Earl"};

(function(o) {
	_.extend(o, {lemongrab: "King"});
})(obj2);

console.log(obj2);