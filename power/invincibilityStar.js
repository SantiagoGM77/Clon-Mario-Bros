export class InvincibilityStar {
  constructor (x,y) {
    this.power = true;
    this.layers = {index:0,sx:[52,72,90,110]}
    this.sy = 103;
    this.sw = 15;
    this.sh = 16;
    this.x = x;
    this.y = y;
    this.yOfBlockContainer = y;
    this.yForGround = 192;
    this.outOfYourBox = false;
    this.velocityJump = 0;
    this.impulseJump = -7;
    this.gravityJump = 0.6;
    this.direction = "right";
    this.idTimeOutPowerUpMoving = 0;
    this.idTimeOutpowerUpFalling = 0;
    this.idIntervalRunLayers = 0;
  }
  
  runLayers () {
    this.idIntervalRunLayers = setInterval(()=>{
      const {sx,index} = this.layers;
      
      let nextIndex = index + 1 === sx.length ? 0 : index + 1;
      
      this.layers.index = nextIndex;
    },30)
  }
  
  draw (scrollX,$SPRITES,ctx) {
    const {index,sx:positionsSx} = this.layers;
    let sx = positionsSx[index];
    ctx.drawImage($SPRITES,sx,this.sy,this.sw,this.sh,this.x + scrollX,this.y,this.sw,this.sh);
  }
}