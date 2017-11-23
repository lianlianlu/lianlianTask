let express = require('express');
let app = express();
let fs = require('fs');

//listUsers
app.get('/listUsers',(req,res)=>{
	fs.readFile(__dirname + "/" + "users.json",'utf8',(err,data)=>{
		if(err){
			console.log(err);
		}else{
			console.log(data);
			res.end(data);
		}
	});
});

//addUsers
var newUser = {
	"user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/addUser',(req,res)=>{
	fs.readFile(__dirname + "/" + "users.json", "utf8", (err,data)=>{
		//读取已经存在的数据
		data = JSON.parse(data);
		data["user4"] = newUser["user4"]
		res.end(JSON.stringify(data));
	});
});

//查询用户详情
app.get('/:id',(req,res)=>{
	//首先我们读取已经存在的用户
	fs.readFile(__dirname + "/" + "users.json", "utf8", (err,data) =>{
		data = JSON.parse(data);
		//console.log(data);
		let user = data['user' + req.params.id]
		res.end(JSON.stringify(user));
	});
});


//删除用户
/*var id = 2;
app.get('/deleteUser', (req,res) => {
	fs.readFile(__dirname + "/" + "users.json", "utf8", (err,data) => {
		data = JSON.parse(data);
		delete data['user' + 2];
		res.end(JSON.stringify(data));
	});
});*/
var id = 2;

app.get('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})






let server = app.listen(8080,()=>{
	console.log(server.address());//{ address: '::', family: 'IPv6', port: 8080 }
});