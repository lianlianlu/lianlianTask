let express = require('express');
const config = require('../../config')
const common = require('../../libs/common')

let router = express.Router();
module.exports = router;
//所有的admin/相关的页面，都要校验一下身份，如果没有登录，都要自己转跳到
//admin/login这个界面.除了login界面
router.use((req,res,next)=>{
	//console.log(req.url);//'/login',对于router而言，不需要/admin这个目录
	if(!req.session['admin_ID'] && req.url!='/login'){
		res.redirect('/admin/login')
	}else{
		next()
	}
});

//开始 展示登录界面
router.get('/login',(req,res)=>{
	common.showError(res,'');
});

//登录接口
router.post('/login',(req,res) => {
	//console.log('post请求');
	let {username,password} = req.body;
	//判断两次，分别判断最高级管理员和普通管理员
	if(username == config.root_username){
		if(common.md5(password) == config.root_password){

				req.session['admin_ID'] = '1';
				res.redirect('/admin/');
		}else{
			common.showError(res,'用户名或者密码错误1');		
		}
	}else{
		let ql = `select * from admin_table where username='${username}'`;
		req.db.query(ql,(err,data)=>{
			if(err){
				common.showError(res,'用户名或者密码错误2');
			}else if(data.length == 0){
				common.showError(res,'用户名或者密码错误3');
			}else{
				if(data[0].password == common.md5(password)){
					req.session['admin_ID'] = data[0].ID;
					res.redirect('/admin/');
				}else{
					common.showError(res,'用户名或者密码错误4');
				}
			}
		});
	}

});
//进入主界面
router.get('/', (req, res)=>{
	// res.send('oK');
	// res.end();
  res.redirect('/admin/house');
});

router.get('/house', (req, res)=>{
  /*req.db.query(`SELECT ID,title,ave_price,tel FROM house_table`, (err, data)=>{
    if(err){
      res.sendStatus(500);
    }else{
      res.render('index', {data});
    }
  });*/
  

  res.render('index',{});
});





