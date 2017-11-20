const fs = require('fs');

//阻塞代码执行
/*var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('程序执行结束');*/

//非阻塞代码执行
/*fs.readFile('input.txt',(err,data) => {
	if (err) return console.error(err);
	console.log(data.toString());
});*/

//准备打开文件
fs.open('input1.txt','r+',(err,fd)=>{
	if(err) console.error(err);
	console.log('打开文件成功');
	fs.read(fd,(err,bytes)=>{
		 if (err){
         console.log(err);
      }

      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }

		fs.close(fd,(err)=>{
		if(err) console.error(err);
		console.log('关闭文件成功');
	});
	});
	
});



console.log('程序执行结束');