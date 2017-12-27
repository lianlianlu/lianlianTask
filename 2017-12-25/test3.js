//从浏览器中上传返回得到的字段
let str = "multipart/form-data; boundary=----WebKitFormBoundarycWYtzRXqfQ0WZSeF"
//data; 后面的'; '是http的作者规定的，必须这么写，没什么好说的。
let arr = str.split('; ');//用这个来切
let boundary = '--' + arr[1].split('=')[1];//添加两个横线，原因看笔记，有原来的短横线
console.log(boundary);



