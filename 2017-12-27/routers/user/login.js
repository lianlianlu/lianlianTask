const router = require("../../libs/router");

let users = {};

router.on('/login',(req,res)=>{
	let {user,pass} = req.query;

	if(!users[user]){
		res.send({code:1,msg:'用户名不存在'});
		res.send();
	}else if(users[user] != pass){
		res.send({
			code:1,
			msg:'用户名或者密码不对'
		});
		res.end();
	}else {
		//密码和用户名对上了
		res.send({	
			code:0,
			msg:'登录成功'
		});
		res.end();
	}
});

router.on('reg',(req,res)=>{
	let {user,pass} = req.query;

	if(users[user]){
		res.send({code:1,msg:'用户名已存在'});
		res.send();
	}else {
		//把用户名放入数据库
		users[user] = pass;
		res.send({	
			code:0,
			msg:'注册成功'
		});
		res.end();
	}
});
