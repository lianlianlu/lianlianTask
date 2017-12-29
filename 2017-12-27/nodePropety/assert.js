const assert = require('assert');
//只测试可枚举的自身属性，不测试对象的原型、连接符、或不可枚举的属性
//就是测试，测试这个东西必须，类似与判断吧。绝对的绝对


function div(a,b){
	assert(typeof a == 'number' && typeof b == 'number','除法里面的两个数字，分子和分母，都必须是数字');
	assert(b != 0, '分母不能为零');
	return a/b;
}

console.log(div(5,0));