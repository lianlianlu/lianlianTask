let str = 'Content-Disposition: form-data; name="user"; en=xx; aaa=12';

function parseInfo(str){
	let arr = str.split('; ');
	let json = {};

	//console.log(arr);
	arr.forEach(s => {
		console.log('aaa:',s.split('='));
	  let [key,val] = s.split('=');
	  //console.log(key,val);
	  json[key] = val;
	})
	return json;
}

let jsonStr = parseInfo(str);
//console.log('jsonStr:'+ JSON.stringify(jsonStr));


