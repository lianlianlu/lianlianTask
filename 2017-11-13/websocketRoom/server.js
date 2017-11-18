const http = require('http');
let server = http.createServer(function (req,res){
	console.log(req.url);
	if(req.url=='/client'){
    res.write('client');
  }else if(req.url=='/client/index.html'){
    res.write('index');
  }else{
    res.write('404');     //?
  }
	res.end();

});

server.listen(8090);
console.log('监听成功');




/*const express = require('express');
const app = express();
//websocket 是建立http协议之上，所以得引入http模块并引入其下的createServer方法
const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/test',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(3000);*/