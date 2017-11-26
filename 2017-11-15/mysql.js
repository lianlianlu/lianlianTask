const mysql = require('mysql');

//1.链接，链接池
let db = mysql.createPool({
	host:"localhost",
	user:"root",
	password:'',
	database:"bluetest"

});

//2.查询
db.query('select * from user_table',(err,data) => {
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});

