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
	database:'20171113'
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

	let cur_username='';
	let cur_userID = 0;

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

	//登录
/*	sock.on('login',(user,pass) =>{
		//第一步，还是校验数据
		if(!regs.username.test(user)){
			sock.emit('login_ret',1,'用户名不符合规范');
		}else if(!regs.password.test(pass)){
			sock.emit('login_ret',1,'密码不符合规范');
		}else{
			//校验
			db.query(`select ID,password from user_table where username='${user}'`,(err,data) => {
				if(err){
					sock.emit('login_ret',1,'数据库错误');
				}else if(data.length == 0){
					sock.emit('login_ret',1,'该用户不存在');
				}else if(data[0].password!=pass){
					sock.emit('login_ret',1,'用户名或密码有误')
				}else{
					//改在线状态
					db.query(`update user_table set online=1 where ID=${data[0].ID}`,err =>{
						if(err){
							sock.emit('login_ret',1,'数据库有误');
						}else{
							sock.emit('login_ret',0,'登录成功');
							cur_username = user;
							cur_userID = data[0].ID;
						}
					});
					
				}
			});

		}
	});*/
	  sock.on('login', (user, pass)=>{
	    //1.校验数据
	    if(!regs.username.test(user)){
	      sock.emit('login_ret', 1, '用户名不符合规范');
	    }else if(!regs.password.test(user)){
	      sock.emit('login_ret', 1, '密码不符合规范');
	    }else{
	      //2.用户信息
	      db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`, (err, data)=>{
	        if(err){
	          sock.emit('login_ret', 1, '数据库有错');
	        }else if(data.length==0){
	          sock.emit('login_ret', 1, '此用户不存在');
	        }else if(data[0].password!=pass){
	          sock.emit('login_ret', 1, '用户名或密码有误');
	        }else{
	          //3.改在线状态
	          db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err=>{
	            if(err){
	              sock.emit('login_ret', 1, '数据库有错');
	            }else{
	              sock.emit('login_ret', 0, '登陆成功');
	              cur_username=user;
	              cur_userID=data[0].ID;
	            }
	          });
	        }
	      });
	    }
	  });


	//发言
	sock.on('msg',txt => {
		if(!txt){
			sock.emit('msg_ret',1,'消息不能为空');
		}else{
			aSock.forEach(item => {
				if(item == sock) return;//这是自己
				item.emit('msg',cur_username, txt);//这是别人
			});

			sock.emit('msg_ret',0,'消息发送成功');
		}
	});

	//离线
  sock.on('disconnect', function (){
    db.query(`UPDATE user_table SET online=0 WHERE ID=${cur_userID}`, err=>{
      if(err){
        console.log('数据库有错', err);
      }

      cur_username='';
      cur_userID=0;

      aSock=aSock.filter(item=>item!=sock);
    });
  });

});