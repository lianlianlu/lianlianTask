class Bullet extends Sprite{
	constructor(type,x=0,y=0,rotation = 0){
		const SIZES = [
			null,
			new DrawRect(_imgs.bullet,87,0,24,27),
			new DrawRect(_imgs.bullet,62,0,25,29),
			new DrawRect(_imgs.bullet,32,36,28,30),
			new DrawRect(_imgs.bullet,30,80,28,35),
			new DrawRect(_imgs.bullet,0,82,30,34),
			new DrawRect(_imgs.bullet,30,0,32,38),
			new DrawRect(_imgs.bullet,0,43,32,38)
		]

		super(SIZES[type], x, y, rotation);

		this.type = type;
		this.speed = 10;

		this.radius = 14;//子弹的半径（粗略估计是以圆形为基础）

	}
}