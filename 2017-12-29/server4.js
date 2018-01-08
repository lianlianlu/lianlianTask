const express = require('express');
const mysql = require('mysql');
const uuidv4 = require('uuid/v4')
const crypto = require('crypto');

let server = express();
server.listen(8080);

let db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:'',
    database:"bluetest13"
});

/*
server.get('/reg',(req,res,next)=>{

});
*/

//1、验证接口数据对错
server.get('/reg',(req,res,next)=>{
	let {username, password} = req.query;
	if(!username){
		res.send({code:1,msg:'用户名不能为空'});
	}else if(!password){
		res.send({code:1,msg:'密码不能为空'});
	}else if(!/^\w{6,32}$/.test(username)){
		res.send({code:1,msg:'用户名规定数字字母下划线，6到32位'});
	}else if(!/^.{6,}$/.test(password)){
		res.send({code:1,msg:'密码不能低于6位数字'});
	}else{
		next();
	}

	
});

//2.判断数据库是否已经存在该用户
server.get('/reg',(req,res,next)=>{
	let {username, password} = req.query;

	db.query(`select * from user_table where username='${username}'`,(err,data)=>{
		if(err){
			res.send({code:1,msg:'数据库有问题'});
		}else if(data.length > 0){
			res.send({code:1,msg:'用户名已经存在'});
		}else{
			next()
		}
	});
});

//3.生成用户uuid，并判断uuid不存在
server.get('/reg',(req,res,next)=>{
	_next()
	function _next(){
		let uuid = uuidv4().replace(/\-/g,'');
		let q = `select * from user_table where id='${uuid}'`;
		db.query(q,(err,data)=>{
			if(err){
				res.send({code:1,msg:'数据库有问题'});
			}else if(data.length > 0){
				//已经存在uuid。重新生成一次
				_next()
			}else{
				req.id = uuid;
				next()
			}
		});
	}
});

//4.写入数据库
server.get('/reg',(req,res,next) => {
	let {username,age, password} = req.query;
	let id = req.id;
	let md5 = crypto.createHash('md5');
	md5.update(password);
	password = md5.digest('hex');

	let q = `insert into user_table (id,username,age,password) values('${id}','${username}','${age}','${password}')`;
	db.query(q,(err,data)=>{
		if(err){
			res.send({code:1,msg:'数据库有问题'});
		}else{
			res.send({code:0,msg:'注册成功'});
		}
	});
});

