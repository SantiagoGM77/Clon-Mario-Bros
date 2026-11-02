export class Coin {
  constructor (x,y,yBlock) {
    this.sxLayers = [{sx:433,sw:2},{sx:441,sw:3},{sx:447,sw:9},{sx:460,sw:5}];
    this.y = y;
    this.x = x;
    this.sx = 433;
    this.sw = 2;
    this.sh = 16;
    this.sy = 144;
    this.velocity = -5;
    this.gravity = 0.3;
    this.yBlock = yBlock;
    this.idTimeOutLayers = 0;
    this.idTimeOutSkip = 0;
    this.hidden = false;
  }
  
  changeLayerCoin (index) {
    const {sx,sw} = this.sxLayers[index]
    
    this.sx = sx;
    this.sw = sw;
    
    this.idTimeOutLayers = setTimeout(()=>{
      this.changeLayerCoin(index + 1 === this.sxLayers.length ? 0 : index + 1)
    },80)
  }
  
  draw (scrollX,$SPRITES,ctx) {
    ctx.drawImage($SPRITES,this.sx,this.sy,this.sw,this.sh,this.x + scrollX,this.y,this.sw,this.sh);
  }
  
  effectSkip () {
    this.idTimeOutSkip = setTimeout(()=>{
      this.effectSkip()
    },20)
    
    this.y += this.velocity;
    
    if (this.y + this.sh > this.yBlock) {
      clearTimeout(this.idTimeOutSkip);
      clearTimeout(this.idTimeOutLayers)
      this.hidden = true;
    }
    
    this.velocity += this.gravity;
  }
}