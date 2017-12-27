
exports.parseInfo = function(str){
	let arr = str.split('; ');
	let json = {};
	let arr2 = [];

	arr.forEach(item => {
	  let item_i = item.split('\r\n');
	  arr2 = arr2.concat(item_i);
	})
	arr2.forEach((item) => {
	  let [key,value] = item.split('=');
	 // console.log(value)
	  if(!value){
	  	json[key] = value;
	  }else{
	  	json[key]=value.substring(1,value.length-1);
	  }
	})
	return json;
}