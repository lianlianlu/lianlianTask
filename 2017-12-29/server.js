const express = require('express');

let server = express();
server.listen(8080,function(){
	console.log('success');
});

server.get('/login',(req,res)=>{
	//res.send('我是登录接口，使用get登录');
	let query = req.query;
	res.send(query);
});




