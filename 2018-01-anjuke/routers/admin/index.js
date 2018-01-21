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
//进入主界面---该主界面以/admin/开始
router.get('/', (req, res)=>{
  res.redirect('/admin/house');
});

/*get方法/house显示主页面，此时相当于调用一次接口，获取一次数据
----动态调整接口数据，按道理说，这个可以另外建立一个接口文件
		但是，老师硬是给做成了没有必要
*/
router.get('/:table', (req, res)=>{
	let {table} = req.params;

	if(!config[`show_admin_colname_${table}`]){
		res.sendStatus(400,'no this data');
	}else{
		//来来来，我们先做一个分页
		const size = 10;
		let page = req.query.page;//从前台获取当前页，page
		if(!page || !/^[1-9]\d*$/.test(page)){
			page = 1;
		}
		let startpage = (page -1 )*size;

		//做一个模糊搜索
		let like_seg = "1=1";
		if(req.query.keyword){
			let keys = req.query.keyword.split(/\s+/g);//匹配所有的空白字符,从空格开始切
			like_seg = keys.map(item =>`title LIKE '%${item}%'`).join(' OR ');//两边都有空格，以防粘连
		}

		//开始切割表格字段
		let colNameArr = [];
		let fieldNameObj = {};
		let colname = config[`show_admin_colname_${table}`];
		let colArr = colname.split(',');
		colArr.forEach((item) => {
			colNameArr.push(item.split(':')[0]);
		  fieldNameObj[item.split(':')[0]] = item.split(':')[1];
		})
		let sql = `SELECT ${colNameArr.join(',')} FROM ${table}_table WHERE ${like_seg} LIMIT ${startpage},${size}`;
		let sql2 = `SELECT COUNT(*) AS c FROM ${table}_table WHERE ${like_seg}`;

	  req.db.query(sql, (err, house_data)=>{
	    if(err){
	      res.sendStatus(500);
	    }else{
	    	 req.db.query(sql2,(err,data)=>{
	    	 	if(err){
	    	 		res.sendStatus(500);
	    	 	}else if(data.length == 0){
	    	 		res.sendStatus(400,'no this data');
	    	 	}else{
	    	 		res.render('index', {
			      	data:house_data,
			      	show_page:10,//一页显示的页数，当不足时，不做处理。
			      	curr_page:parseInt(page),
			      	pageall:Math.ceil(data[0].c/size),
			      	fieldNameObj,
			      	table,
			      	keyword:req.query.keyword
			      });
	    	 	}
	    	});
	    }
	  });
	}
});

//post方法 /house是提交表单数据
router.post('/:table',(req,res) => {
	let {table} = req.params;
	/*
		console.log(req.body);
		{ 
		title: 'ffff',
	  sub_title: '',
	  position_main: '',
	  position_second: '',
	  ave_price: '',
	  area_min: '',
	  area_max: '',
	  tel: '',
	  sale_time: '',
	  submit_time: '',
	  building_type: '',
	  property_types: '' }
	*/

	//每个表的图片处理

	const file_infos={
      house: {
        'main_img': {
          path: 'main_img_path',
          real_path: 'main_img_real_path',
          type: 'single'
        },
        'img': {
          path: 'img_paths',
          real_path: 'img_real_paths',
          type: 'array'
        },
        'property_img': {
          path: 'property_img_paths',
          real_path: 'property_img_real_paths',
          type: 'array'
        },
      },
      'ad': {
        'img': {
          path: 'img_path',
          real_path: 'img_real_path',
          type: 'single'
        }
      },
    };

	let file_info = file_infos[table];
	let file_paths = {};//图片路径
	let file_real_paths = {};//图片真实路径（带'onload/'）
	if(req.files){
		for(let i = 0; i < req.files.length; i ++){
			let name = req.files[i].fieldname;
			/*
				//console.log(name);
				main_img
				img
				img
				property_img
			*/
			
			if(file_info[name]){
				if(!file_paths[name]){
					file_paths[name] = [];
					file_real_paths[name] = [];
				}

				file_paths[name].push(req.files[i].filename);
				file_real_paths[name].push(req.files[i].path.replace(/\\/g,'\\\\'));
			}
		}

		for(let i = 0; i < req.files.length; i ++){
		let name = req.files[i].fieldname;
		/*
			//console.log(name);
			main_img
			img
			img
			property_img
		*/
		
		if(file_info[name]){
			if(!file_paths[name]){
				file_paths[name] = [];
				file_real_paths[name] = [];
			}

			file_paths[name].push(req.files[i].filename);
			file_real_paths[name].push(req.files[i].path.replace(/\\/g,'\\\\'));
		}
	}

		/*
		console.log(file_paths);
		{ 
			main_img: [ 'fe61bce25f165b02741c84893a7c4fa9' ],
		  img:
		   [ 'faa00b5ecbf62d45911a64ccd16f1ebc',
		     '6177bfba4a2fd40ade85567b842fa673',
		     '81b1e7425ada69695433d3459504b360' ],
		  property_img: [ '6b5270c79c33640158c1be47627076c9' ] 
	  }

	  console.log(file_real_paths);
		{
			main_img: [ 'upload\\\\fe61bce25f165b02741c84893a7c4fa9' ],
		  img:
		   [ 'upload\\\\faa00b5ecbf62d45911a64ccd16f1ebc',
		     'upload\\\\6177bfba4a2fd40ade85567b842fa673',
		     'upload\\\\81b1e7425ada69695433d3459504b360' ],
		  property_img: [ 'upload\\\\6b5270c79c33640158c1be47627076c9' ] 
	  }

		*/
		
		for(let name in file_paths){
			//console.log(name);
			if(file_info[name].type == 'single'){
				req.body[file_info[name].path] = file_paths[name][0];
				req.body[file_info[name].real_path] = file_real_paths[name][0];
			}else{
				req.body[file_info[name].path] = file_paths[name].join(',');
				req.body[file_info[name].real_path] = file_real_paths[name].join(',');
			}
		}

	}
	
	
	//ID
	req.body['ID'] = common.uuid();
	req.body['admin_ID'] = common.uuid();
	//字段
	let fieldName = [];
	let fieldValue = [];

	if(config[`insert_fieldname_${table}`]){
		config[`insert_fieldname_${table}`].split(',').forEach( item => {
			fieldName.push(item);
			
			if(/^\s/g.test(item)){
				item = item.replace(/^\s/g,'');
				if(item == 'sale_time' || item == 'submit_time'){
					req.body[item] = Math.ceil(new Date(req.body[item]).getTime()/1000);
				}
			}
			fieldValue.push(req.body[item]);
			//console.log(`req.body[${item}]:${req.body[item]}`);
		});
	}

	let sql = `INSERT INTO ${table}_table (${fieldName.join(',')}) VALUES('${fieldValue.join("','")}')`;
	req.db.query(sql, (err,data)=>{
		if(err){
			res.sendStatus(500);
		}else if(data.length == 0){
			res.sendStatus(500);
		}else {
			res.redirect(`/admin/${table}`)
		}
	});
});

//删除
router.get('/:table/delete',(req,res)=>{
	let ID = req.query['id'];
	let {table} = req.params;
	console.log(table);
	
	let sql1 = `select * from ${table}_table where ID='${ID}'`;
	req.db.query(sql1,(err,data)=>{
		if(err){
			res.sendStatus(500);
		}else if(data.length == 0){
			res.sendStatus(500);
		}else{
			//1.删除关联的图片,找到图片存储的真实路径
			let arr = [];
			if(data[0]['main_img_real_path']){
				arr.push(data[0]['main_img_real_path']);
			}

			if(data[0]['img_real_paths']){
				data[0]['img_real_paths'].split(',').forEach(item => {
					arr.push(item);
				});
			}

			if(data[0]['property_img_real_paths']){
				data[0]['property_img_real_paths'].split(',').forEach(item => {
					arr.push(item);
				});
			}

			if(arr.length != 0){
				//有图片，就将图片删除之后再删数据
				let i = 0;
				next();
				function next(){
					fs.unlink(arr[i],err=>{
						if(err){
							res.sendStatus(500);
						}else{
							i++;

							if(i >= arr.length){
								//图片删除完了
								deleteForm()
							}else{
								next();
							}
						}
					});
				}
			}else{
				//没有图片，直接删除数据
				deleteForm()
			}

			function deleteForm(){
				let delsql = `delete from ${table}_table where ID='${ID}'`;
				req.db.query(delsql,err=>{
					if(err){
						res.sendStatus(500);
					}else{
						console.log('删除成功');
						res.redirect(`/admin/${table}`);
					}
				});
			}



		}
	});
	//2.删除相关数据
	//res.redirect('/admin/house');
});

//写一个供前台使用的接口
router.get('/:table/get_data',(req,res)=>{
	const { table } = req.params;
	const id = req.query.id;
	if(!id){
		common.showError(404);
	}else if(!/^[\da-f]{32}$/.test(id)){
		common.showError(400);
	}else{
		req.db.query(`SELECT * FROM ${table}_table WHERE ID='${id}'`,(err,data)=>{
			if(err){
				common.showError(500);
			}else if(data.length == 0){
				common.showError(500);
			}else{
				res.send(data[0]);
			}
		});
	}







});




