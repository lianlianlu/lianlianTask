const express = require('express');//express框架
const bodyParser = require('body-parser');//解析数据
const multer = require('multer');//二进制上传文件插件
const cookieParser = require('cookie-parser');//缓存
const cookieSession = require('cookie-session');//缓存，可以只有一个缓存方式
const consolidate = require('consolidate');//浏览器适配器
const mysql = require('mysql');//数据库

//配置文件
const config = require('./config')

//启动服务
const server = express();
server.listen(config.port);

//连接数据库
const db = mysql.createPool({
	host:config.mysql_host,
	port:config.mysql_port,
	user:config.mysql_user,
	password:config.mysql_password,
	database:config.mysql_dbname
});

server.use((req,res,next)=>{
	req.db = db;
	next();
});


//使用中间件
//普通的post数据
server.use(bodyParser.urlencoded({extended:false}));

//文件上传post
let multerObj = multer({dest:'./upload/'});
server.use(multerObj.any());

//cookie
server.use(cookieParser(require('./secret/cookie_key')));

//session
server.use(cookieSession({
	keys:require('./secret/session_key')
}))


//模板,使用ejs,渲染中间件用consolidate
server.set('html',consolidate.ejs);
server.set('view engine','ejs');//后缀拓展名为ejs
server.set('views','./template');//选择模板文件夹

//处理请求。使用router
server.use('/admin/',require('./routers/admin'));//所有处理admin的请求都放在这里

//空值时，直接引入到后台首页
server.use('/',require('./routers/www'));

//静态文件,
server.use(express.static('./www/'));

