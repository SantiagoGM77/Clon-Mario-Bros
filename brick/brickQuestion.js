export class BrickQuestion {
  constructor(blocks){
    this.layers = {index:0,sx:[372,372,390,408,390]};
    this.sw = 16;
    this.sh = 16;
    this.sy = 160;
    this.sxOff = 373;
    this.syOff = 84;
    this.blocks = blocks;
    this.velocitySkip = 0;
    this.velocitySkipStart = -3;
    this.gravitySkip = 0.8;
    this.idTimeOutSkipBlock = 0;
    this.idIntervalRunLayers = 0;
  }
  
  runLayers () {
    this.idIntervalRunLayers = setInterval(()=>{
      let {index,sx} = this.layers;
      
      if (index + 1 === sx.length) this.layers.index = 0;
      else this.layers.index++;
    },160)
  }
  
  draw (scrollXCanvas,$SPRITES,ctx) {
    const {index,sx} = this.layers;
    
    let sX = sx[index];
    
    for (let {x,y,ySkip,on,hidden} of this.blocks) {
      if (hidden) continue;
      
      let sx = sX,
      sy = this.sy;
      
      let yPosition = ySkip ?? y;
      
      if (!on) {
        sx = this.sxOff;
        sy = this.syOff;
      }
      
      ctx.drawImage($SPRITES,sx,sy,this.sw,this.sh,x + scrollXCanvas,yPosition,this.sw,this.sh)
    }
  }
  
  effectSkip (index) {
    this.idTimeOutSkipBlock = setTimeout(()=>{
      this.effectSkip(index);
    },25)
    
    let block = this.blocks[index];
    
    block.ySkip += this.velocitySkip;
    
    if (block.ySkip > block.y) {
      delete block.ySkip;
      clearTimeout(this.idTimeOutSkipBlock);
    }
    else this.velocitySkip += this.gravitySkip;
  }
}