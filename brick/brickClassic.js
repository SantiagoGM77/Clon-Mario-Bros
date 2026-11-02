export class Brick {
  constructor (bricks) {
    this.sx = 372;
    this.sy = 47;
    this.sw = 17;
    this.sh = 16;
    this.bricks = bricks;
    this.velocitySkip = 0;
    this.velocitySkipStart = -3;
    this.gravitySkip = 0.8;
    this.idTimeOutSkipBlock = 0;
  }
  
  draw (scrollXCanvas,$SPRITES,ctx) {
    this.bricks.forEach(({x,y,ySkip,drawAsBrickQuestionOff})=>{
      let {sx,sy,sw,sh} = drawAsBrickQuestionOff ?? this;
      
      ctx.drawImage($SPRITES,sx,sy,sw,sh,x + scrollXCanvas,ySkip ?? y,sw,sh)
    })
  }
  
  effectSkip (index) {
    this.idTimeOutSkipBlock = setTimeout(()=>{
      this.effectSkip(index);
    },25)
    
    let block = this.bricks[index];
    
    block.ySkip += this.velocitySkip;
    
    if (block.ySkip > block.y) {
      delete block.ySkip;
      clearTimeout(this.idTimeOutSkipBlock);
    }
    else this.velocitySkip += this.gravitySkip;
  }
}