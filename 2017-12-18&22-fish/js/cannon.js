class Cannon extends Sprite{
	//大炮-有一到七级 
	constructor(type,x = 0,y=0,rotation=0){
		if(type > 7 || type < 1){
			throw new Error('has no this type cannon');
		}

		const SIZE = [
			null,
			{w: 74, h: 74},
			{w: 74, h: 76},
			{w: 74, h: 76},
      {w: 74, h: 83},
      {w: 74, h: 85},
      {w: 74, h: 90},
      {w: 74, h: 94}
		]

		super(
			new DrawRect(_imgs[`cannon${type}`],0,0,SIZE[type].w,SIZE[type].h),
			x,y,rotation
		)

		this.SIZE = SIZE;

		this.setType(type);

		this.MAX_FRAME = 5;
	}

	setType(type){
		this.type = type;

		this.setDrawRect(
      new DrawRect(_imgs[`cannon${type}`],0,0, this.SIZE[type].w, this.SIZE[type].h)
    );
	}

}