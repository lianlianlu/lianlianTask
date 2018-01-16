let express = require('express');
const config = require('../../config')
const common = require('../../libs/common')
const fs = require('fs');

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
				req.admin_ID = '1';

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
					req.admin_ID = data[0].ID;
					res.redirect('/admin/');
				}else{
					common.showError(res,'用户名或者密码错误4');
				}
			}
		});
	}

});
//进入主界面---该猪界面以/admin/开始
router.get('/', (req, res)=>{
  res.redirect('/admin/house');
});

//get方法/house显示主页面
router.get('/house', (req, res)=>{
  req.db.query(`SELECT ID,title,ave_price,tel FROM house_table`, (err, data)=>{
    if(err){
      res.sendStatus(500);
    }else{
      res.render('index', {data});
    }
  });
});

//post方法 /house是提交表单数据
router.post('/house',(req,res) => {
	//console.log(req);
	//console.log(req.files);

	//日期时间处理成秒数再上传
	req.body['sale_time'] = Math.floor(new Date(req.body['sale_time']).getTime()/1000);
	req.body['submit_time'] = Math.floor(new Date(req.body['submit_time']).getTime()/1000);


	//文件上传
	let aImgPath = [];
	let aImgRealPath = [];

	for(let i = 0; i < req.files.length; i ++){
		switch(req.files[i].fieldname){
			case 'main_img':
				req.body['main_img_path'] = req.files[i].filename;
				req.body['main_img_real_path'] = req.files[i].path.replace(/\\/g,'\\\\');
				break;
			case 'img':
				aImgPath.push(req.files[i].filename);
				aImgRealPath.push(req.files[i].path.replace(/\\/g,'\\\\'));
				break;
			case 'property_img':
				req.body['property_img_paths'] = req.files[i].filename;
				req.body['property_img_real_paths'] = req.files[i].path.replace(/\\/g,'\\\\');
		}
	}

	// console.log(aImgPath.join(','));
	// console.log(aImgRealPath.join(','));
	req.body['ID'] = common.uuid();
	req.body['admin_ID'] = req.admin_ID;
	req.body['img_paths'] = aImgPath.join(',');
	req.body['img_real_paths'] = aImgRealPath.join(',');

	//表字段名和字段值
	let fieldNameArr = [];
	let fieldValueArr = [];
	for(let name in req.body){
		fieldNameArr.push(name);
		fieldValueArr.push(req.body[name])
	}
	let ql = `INSERT INTO house_table (${fieldNameArr.join(',')}) VALUES('${fieldValueArr.join("','")}')`;

	req.db.query(ql,(err,data)=>{
		if(err){
			console.log(err);
			res.sendStatus(500);
		}else{
			res.redirect('/admin/house');
		}
	});
});

//删除
router.get('/house/delete',(req,res)=>{
	//console.log(req.query['id']);
	let ID = req.query['id'];

	//删除数据，
	//1.首先删除与之相关的图片。因为图片资源也是在服务器的。
	req.db.query(`SELECT * FROM house_table WHERE ID='${ID}'`,(err,data)=>{
		if(err){
			console.log(err);
			res.sendStatus(500);
		}else if(data.length == 0){
			res.sendStatus(400,'no this data');
		}else{
			//把三种类型图片的真实路径都挑出来。
			let arr = [];
			if(data[0]['main_img_real_path']){
				arr.push(data[0]['main_img_real_path']);
			}
			if(data[0]['img_real_paths']){
				data[0]['img_real_paths'].split(',').forEach((item) => {
				  arr.push(item);
				})
			}
			if(data[0]['property_img_real_paths']){
				arr.push(data[0]['property_img_real_paths']);
			}

			let i = 0;
			next()
			function next(){
				fs.unlink(arr[i],err => {
					if(err){
						res.sendStatus(500);
					}else {	
						i++;

						if(i >= arr.length){
							////2.删除数据本身 图片删除完成，开始删除数据库的数据
							req.db.query(`DELETE FROM house_table WHERE ID='${ID}'`,(err1,data)=>{
								if(err){
									console.log(err)
									res.sendStatus(500);
								}else{	
									
									res.redirect('/admin/house');
								}
							});

						}else{
							next()
						}
					}
				});
			}

			




			//console.log(data[0]['img_paths']);
		}
	});
	



});





