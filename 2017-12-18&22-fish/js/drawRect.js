class DrawRect{
	constructor(img,sx,sy,sw,sh){
	//	console.log(`img:${img}+sx:${sx}+sy:${sy}+sw:${sw}+sh:${sh}`)
		if(!img || !sw || !sh){
			throw new Error('sw,sh,img is must required');
		}
		this.img = img;
		this.sx = sx;
		this.sy = sy;
		this.sw = sw;
		this.sh = sh;
	}
}