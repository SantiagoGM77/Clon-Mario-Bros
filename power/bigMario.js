export class BigMario {
  constructor (x,y) {
    this.power = true;
    this.direction = "RIGHT";
    this.outOfYourBox = false;
    this.falling = false;
    this.yForGround = 192;
    this.yOfBlockContainer = y;
    this.fallSpeed = 0;
    this.gravity = 0.3,
    this.aboveOf = "BrickQuestion";
    this.sx = 71;
    this.sy = 43;
    this.sw = 16;
    this.sh = 16;
    this.idTimeOutPowerUpMoving = 0;
    this.idTimeOutpowerUpFalling = 0;
    this.x = x;
    this.y = y;
  }
  
  draw (scrollX,$SPRITES,ctx) {
    const {x,y,sx,sy,sw,sh} = this;
    ctx.drawImage($SPRITES,sx,sy,sw,sh,x + scrollX,y,sw,sh);
  }
  
}