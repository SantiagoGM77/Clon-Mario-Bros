export class Goombas {
  constructor (x,y,aboveOf,xPipeRight) {
    this.enemy = true;
    this.sy = 893;
    this.sx = 186;
    this.sh = 17;
    this.sw = 17;
    this.x = x;
    this.yForWalkInGround = 191;
    this.y = y;
    this.idTimeOutLayers = 0;
    this.animated = false;
    this.direction = "LEFT";
    this.aboveOf = aboveOf;
    this.falling = false;
    this.gravity = 0.3;
    this.fallSpeed = 0;
    this.fallingInDitch = false;
    this.idTimeOutGoombasFalling = 0;
    this.xPipeRight = xPipeRight;
    this.crushed = false;
    this.struck = false;
    this.velocityJumpAtStruck = -3.5;
    this.remove = false; 
    this.measuresCrushed = {
      sx:228,
      sy:900,
      sw:16,
      sh:10
    }
  }
  
  runLayers (index) {
    this.sx = index === 0 ? 186 : 207;
    
    this.idTimeOutLayers = setTimeout(()=>{
      this.runLayers(index + 1 > 1 ? 0 : 1);
    },130)
  }
  
  draw (scrollX,$SPRITES,ctx) {
    if (this.struck) {
      ctx.save()
      ctx.translate(scrollX + this.x,this.y + this.sh)
      ctx.scale(1,-1)
      ctx.drawImage($SPRITES,this.sx,this.sy,this.sw,this.sh,0,0,this.sw,this.sh)
      ctx.restore();
    } else ctx.drawImage($SPRITES,this.sx,this.sy,this.sw,this.sh,scrollX + this.x,this.y,this.sw,this.sh);
  }
  
  impactEffect (heightCanvas) {
    this.idTimeOutJumpAtStruck = setTimeout(()=>{
      this.impactEffect(heightCanvas);
    },25)
    
    this.y += this.velocityJumpAtStruck;
    this.x += 1;
    
    if (this.y >= heightCanvas) {
      clearTimeout(this.idTimeOutJumpAtStruck);
      this.remove = true;
    }
    
    this.velocityJumpAtStruck += this.gravity;
  }
  
  fallingEffect (QUESTIONBRICK,BRICK,MARIO) {
    this.idTimeOutFalling = setTimeout(()=>{
      this.fallingEffect(QUESTIONBRICK,BRICK,MARIO);
    },25)
    
    const {fallSpeed,yForWalkInGround,gravity} = this;
    
    this.y += fallSpeed;
    
    const {blocks,sw,sh} = QUESTIONBRICK,{bricks,sw:w,sh:h} = BRICK;
    
    let crashInYWithBrickCommon = MARIO.detectCrashWithBrickInY(bricks,this,w,h),
    crashInYWithBrickQuestion = MARIO.detectCrashWithBrickInY(blocks,this,sw,sh);
    
    let crashWithOneObstacleAbove = false;
    
    if (crashInYWithBrickCommon) {
      this.aboveOf = "BrickCommon";
      crashWithOneObstacleAbove = true;
    }
    else if (crashInYWithBrickQuestion) {
      this.aboveOf = "BrickQuestion"
      crashWithOneObstacleAbove = true;
    }
    
    if (crashWithOneObstacleAbove) {
      this.fallSpeed = 0;
      this.falling = false;
      clearTimeout(this.idTimeOutFalling);
    }
    else if (this.y > yForWalkInGround) {
      this.aboveOf = "floor";
      this.fallSpeed = 0;
      this.y = yForWalkInGround;
      this.falling = false;
      clearTimeout(this.idTimeOutFalling);
    }
    else this.fallSpeed += gravity;
  }
}