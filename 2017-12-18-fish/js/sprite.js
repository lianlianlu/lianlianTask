class Sprite{
  //w,h,x,y,rotate
  //draw(),碰撞检测()
  constructor(img, width, height, x=0, y=0, rotation=0){
    this.img = img;
    this.width = width;
    this.height = height;
    this.sx = 0;
    this.sy = 0;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  draw(gd){
    gd.save()
    gd.translate(this.x,this.y);
    gd.rotate(d2a(this.rotation));
    gd.drawImage(
      this.img,
      this.sx,this.sy,this.width,this.height,
      -this.width/2,-this.height/2,this.width,this.height
    );
    gd.restore();
  }
}
