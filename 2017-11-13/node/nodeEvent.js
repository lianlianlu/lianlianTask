//引入events模块
var events = require('events');
//创建 eventEmitter 对象
var evemitter = new events.EventEmitter();

var connectHandler = function connetced(){
	console.log('链接成功');

	evemitter.emit('data_received');//触发事件
}
evemitter.on('connection',connectHandler);//注册了事件connection 的一个监听器，然后通过emit,发送该方法

evemitter.on('data_received',function(){ //注册事件
	console.log('数据链接成功');
});

// 触发 connection 事件 
evemitter.emit('connection');

console.log('程序执行完毕');