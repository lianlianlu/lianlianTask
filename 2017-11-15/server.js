const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const io = require('socket.io');
const regs = require('./libs/regs')

//连接服务器
let db = mysql.createPool({
	host:"localhost",
	user:"root",
	password:'',
	database:'bluetest'
});

//测试是否连接上
/*db.query('select * from user_table',(err,data)=>{
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});*/

let httpServer = http.createServer((req,res)=>{
	fs.readFile(`login${req.url}`,(err,data) => {
		if(err){
			res.writeHeader(404);
      res.write('not found');
		}else{
			res.write(data);
		}
		res.end();
	});
});
httpServer.listen(8080);


//ws服务器
let aSock = [];
const wsServer = io.listen(httpServer);
wsServer.on('connection',(sock)=>{
	//console.log(sock);
	aSock.push(sock);

	let curr_name = '';
	let curr_password = '';

	//注册
	sock.on('reg',(user,pass) => {
		//第一步，校验数据
		if(!regs.username.test(user)){
			sock.emit('reg_ret',1,'用户名不符合规范');
		}else if(!regs.password.test(pass)){
			sock.emit('reg_ret',1,'密码不符合规范');
		}else{
			//第二步，判断该用户是否已经存在
			db.query(`select ID from user_table where username='${user}'`,(err,data) =>{
				if(err){
					sock.emit('reg_ret',1,'数据库错误');
				}else if(data.length > 0){
					sock.emit('reg_ret',1,'用户名已存在');
				}else{
					//插入数据
					db.query(`insert into user_table (username,password,online) values ('${user}', '${pass}',0)`,(err,data)=>{
						if(err){
							sock.emit('reg_ret',1,'后台错误导致添加失败，请联系管理员');
						}else{
							sock.emit('reg_ret',0,'恭喜你，注册成功');
						}
					});

				}
			});
		}
	});
	

});