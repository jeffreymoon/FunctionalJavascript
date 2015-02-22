// 문자열을 불변성을 지닌다.
var _ = require("./node_modules/underscore/underscore");

var s = "Lemongrab";

console.log(s.toUpperCase());
console.log(s);

var key = "lemongrab";
var obj = {lemongrab: "Earl"};

console.log(obj[key] === "Earl");

key = key.toUpperCase;
console.log(obj[key]);

console.log(obj["lemongrab"]);

(function(o) {
	_.extend(o, {lemongrab: "King"});
})(obj);

console.log(obj);