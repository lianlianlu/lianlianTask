const express = require('express');

let server = express();
server.listen(8080);

//next 参数的奇妙
server.get('/login',(req,res,next)=>{
	console.log('a');

	next();
});

server.get('/login',(req,res,next)=>{
	console.log('b');
	res.end();
});




