let express = require('express');
let app = express();

//get接口
app.get('/express_index.html',function(req,res){
	res.sendFile(__dirname + "/" + "express_index.html");//必须要跳转该界面才能进行分析
});
app.get('/process_get',function(req,res){
	//JSON格式得到从前端得来的参数
	let response = {
		"username":req.query.username,
		"password":req.query.pwd
	}
	console.log(response);
	res.end(JSON.stringify(response));
});


app.listen(8081,function(){
	console.log('监听成功');
});