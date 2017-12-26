let _imgs = null;

const _resources={
  fish1: 'img/fish1.png',
  fish2: 'img/fish2.png',
  fish3: 'img/fish3.png',
  fish4: 'img/fish4.png',
  fish5: 'img/fish5.png',
  coin1: 'img/coinAni1.png',
  cannon1: 'img/cannon1.png',
  cannon2: 'img/cannon2.png',
  cannon3: 'img/cannon3.png',
  cannon4: 'img/cannon4.png',
  cannon5: 'img/cannon5.png',
  cannon6: 'img/cannon6.png',
  cannon7: 'img/cannon7.png',
  bottom: 'img/bottom.png',
  bullet: 'img/bullet.png',
  coin1: 'img/coinAni1.png',
  coin2: 'img/coinAni2.png',
  number: 'img/number_black.png'
};

function loadImgs(json,fn){
	//gd.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	//gd.drawImage(图片,需要裁剪的图片位置及大小（sx,sy,swidth,sheight）,图片放在画布的位置和大小（x,y,width,height）);
		let res={};
  let complete=0;
  let total=0;
  for(let name in json){
    total++;
    let oImg=new Image();
    res[name]=oImg;
    oImg.onload=function (){
      complete++;
      if(complete==total){
        _imgs=res;
        fn();
      }
    };
    oImg.onerror=function (){
      alert('图片加载失败'+oImg.src);
    };
    oImg.src=json[name];
  }
}


function d2a(n){
  return n*Math.PI/180;
}
function a2d(n){
  return n*180/Math.PI;
}

function rnd(minN,maxN){
    return Math.floor(Math.random()*(maxN-minN)+minN)
}