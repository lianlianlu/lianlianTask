let express = require('express');
let app = express();
let bodyParser = require('body-parser');

//post接口
//创建 application/x-www-form-urlencoded 编码解析
let urlencodedParaser = bodyParser.urlencoded({
	extended:false
});

//get获得页面
app.get('/express_index.html',function(req,res){
	res.sendFile(__dirname + '/' + "express_index.html");
});

//post接口获得数据

app.post('/process_post',urlencodedParaser,function(req,res){
	//取参数
	let params = {
		"username":req.body.username,
		"pwd":req.body.pwd
	}
	res.end(JSON.stringify(params));
});



app.listen(8081,function(){
	console.log('监听成功');
});