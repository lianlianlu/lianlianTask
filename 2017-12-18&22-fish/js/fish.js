class Fish extends Sprite{
	constructor(type,x=0,y=0,rotation=0){
		if(type > 5 || type < 1){
			throw new Error('extra the range of fishs');
		}
		const SIZE = [
			null,
			{w: 55, h: 37, r: 12},
      {w: 78, h: 64, r: 18},
      {w: 72, h: 56, r: 15},
      {w: 77, h: 59, r: 15},
      {w: 107, h: 122, r: 23}
		]

		//继承父类
		super(new DrawRect(_imgs[`fish${type}`],0,0,SIZE[type].w,SIZE[type].h),x,y,rotation);

		//子类
		this.type = type;

		this.curFrame = 0;
		this.speed = rnd(1,4);
		this.MAX_FRAME=4;
		this.frameRate = 5;
		this.MAX_FRAME = 4;

		this.radius = SIZE[type].r;//鱼的碰撞半径

		//是不是死了
		this.isDead = false;
	}

	draw(gd){
		if(this.rotation == -90){
			this.scaleY = -1;
		}

		this.rotation -= 90;

		super.draw(gd);

		this.rotation += 90;//画完了还得把角度给加回来，不然都不知道减到哪里去了

		if(this.rotation == -90){
			this.scaleY = 1;
		}
	}

}
