class Sprite{
  //w,h,x,y,rotate
  //draw(),碰撞检测()
  constructor(drawRect,x=0, y=0, rotation=0){
    if(!(drawRect instanceof DrawRect)){
      throw new Error('img must be a DrawRect');
    }
    this.setDrawRect(drawRect)
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.speed = 0;

    //动画 就是大炮打一下，往下缩一下
    this.MAX_FRAME = 0;
    this.curFrame = 0;

    this.frameRate = 1;
    this.frameRateNow = 0;
    //鱼的头朝向下，并且从右往左的鱼，影子是在上面的，很奇怪，要把他们都翻转过来
    this.scaleX = 1;
    this.scaley = 1;

    this.radius = 0;//碰撞检测
  }

  setDrawRect(drawRect){
    this.drawRect = drawRect;
    this.width = drawRect.sw;
    this.height = drawRect.sh;
  }

  nextFrame(){
    //console.log('aa');
    this.frameRateNow++;

    if(this.frameRateNow == this.frameRate){
      this.frameRateNow=0;

      this.curFrame++;

      if(this.curFrame >= this.MAX_FRAME){
        this.curFrame=0;
        return true;
      }
      return false;
    }
  }

  draw(gd){
    gd.save()//头

    gd.translate(this.x,this.y);
    gd.rotate(d2a(this.rotation));

    gd.scale(this.scaleX, this.scaleY);

    gd.drawImage(
      this.drawRect.img,
      this.drawRect.sx,this.drawRect.sy+this.height*this.curFrame,this.width,this.height,
      -this.width/2,-this.height/2,this.width,this.height
    );
    gd.restore();//尾
  }

  inRect(x,y){
    if(
        this.x - this.width/2 <= x && x<=this.x + this.width/2&&
        this.y - this.height/2 <= y && y <= this.y + this.height/2
      ){
      return true;
    }else {
      return false;
    }
  }

  outRect(x,y,w,h){
    if(this.x < x || this.y < y || this.x> x+w || this.y > y + h){
      return true;//在画布里面
    }else{
      return false;//在画布外面
    }
  }

  move(x,y){
    if(arguments.length == 0){
      //console.log('子弹运动');
      //除金币以外物体的运动
      let x_speed = this.speed * Math.sin(d2a(this.rotation));
      let y_speed = this.speed * Math.cos(d2a(this.rotation));

      this.x += x_speed;
      this.y -= y_speed;
    }else{
    //金币运动
      this.x += (x-this.x)/10;
      this.y += (y-this.y)/10;
    }
  }

  //碰撞测试
  /*
    鱼的圆心（x1,y1） 炮弹(x2,y2)
    碰撞的时候  (x1-x2)^2+(y1-y2)^2 开根号，算出两个圆心的距离
    如果这个小于r1+r2。那么相交。碰上
  */
  cullTest(other){
    //this.x 为鱼的，other.x 为炮弹的。炮弹作为参数传入，鱼作为主对象调用
    return Math.sqrt(Math.pow(this.x-other.x, 2)+Math.pow(this.y-other.y, 2))<this.radius+other.radius;
  }
  
 




}
