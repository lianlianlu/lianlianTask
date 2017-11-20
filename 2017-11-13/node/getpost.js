var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type':'text/plain; charset = utf-8'});
	//解析 url 参数
	var params = url.parse(req.url,true).query;
	res.write('name：' + params.name + '\n');
	res.write('age:' + params.age + '\n');
	res.write('user:' + params.user + '\n');
	//res.end(util.inspect(url.parse(req.url,true)));
	res.end();

}).listen(3000);