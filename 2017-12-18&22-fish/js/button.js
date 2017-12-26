class Button extends Sprite{
	constructor(drawRectNormal,drawRectActive,x=0,y=0,rotation=0){
		super(drawRectNormal,x,y,rotation);

		this.drawRectActive = drawRectActive;
		this.drawRectNormal = drawRectNormal;

		this.downAtme = false;//设置默认值
	}

	down(x,y){
   // console.log('down');
		if(this.inRect(x,y)){
			this.setDrawRect(this.drawRectActive);
			this.downAtme = true;
		}else{
			this.downAtme = false;
		}
	}

	up(x,y){
    //console.log('up');
		this.setDrawRect(this.drawRectNormal);

		if(this.inRect(x,y) && this.downAtme){
			//出发click
			this.onclick && this.onclick();
		}
	}


}