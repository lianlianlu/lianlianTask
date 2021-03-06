var http = require('http');
var util = require('util');

//post 请求来了
var querystring = require('querystring');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';


http.createServer(function(req,res){
	//定义了一个body 变量，用户暂存请求体信息
	let body = '';

	//通过req的data事件监听函数，每当接受请求体的数据时，就累加到body变量中
	req.on('data',function(chunk){
		body += chunk;
	});

	//在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回
	req.on('end',function(){
		 // 解析参数
	    body = querystring.parse(body);
	    // 设置响应头部信息及编码
	    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
	 
	    if(body.name && body.url) { // 输出提交的数据
	        res.write("网站名：" + body.name);
	        res.write("<br>");
	        res.write("网站 URL：" + body.url);
	    } else {  // 输出表单
	        res.write(postHTML);
	    }
	    res.end();
	});

}).listen(3000);