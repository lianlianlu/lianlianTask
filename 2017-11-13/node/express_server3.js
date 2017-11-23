let express = require('express');
let app = express();
//文件上传
let fs = require('fs');

let bodyParser = require('body-parser');
let multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('images'));

app.get('/express_index.html',function(req,res){
	res.sendFile(__dirname + "/express_index.html");
});

app.post('/file_upload',function(req,res){
	console.log(req.files[0]);
	let des_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile(req.files[0].path,function(err,data){
		fs.writeFile(des_file,data,function(err){
			if(err){
				console.log(err);
			}else{
				response = {
					message:'file uploade successful',
					filename:req.files[0].originalname
				}
			}
			res.end(JSON.stringify(response));
		});
	});
});

app.listen(8081,function(){
	console.log('监听成功');
});