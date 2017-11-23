let express = require('express');
let app = express();

app.get('/userPort',function(req,res){
	res.send('用户信息');
});

app.post('/fileReader',function(req,res){
	res.send('文件上传');
});

app.get('/list',function(req,res){
	res.send('商品列表');
});

let server = app.listen(8081,function(){
	let host = server.address().address;
	let port = server.address().port;
	 console.log("应用实例，访问地址为 http://%s:%s", host, port)
});