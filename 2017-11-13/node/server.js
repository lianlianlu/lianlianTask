//1 引入http
const http = require('http');

//2 创建服务
const createServer = http.createServer((request,response)=>{
	//3 接收请求和相应请求
	//request  客户端请求我   response 我返回客户端
		// 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200,{'Content-Type':'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
});
//监听端口
createServer.listen(8888);