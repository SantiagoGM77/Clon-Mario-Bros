export class CoinBig {
  constructor (x,y) {
    this.operation = "add";
    this.index = 0;
    this.sxLayers = [427,439,451];
    this.sy = 162;
    this.sw = 11;
    this.sh = 16;
    this.idTimeOutAnimate = 0;
    this.x = x;
    this.y = y;
  }
  
  animate (firstCall) {
    let miliseconds = (this.index === 1 && this.operation === "subtract") || firstCall ? 500 : 100;
   
    this.idTimeOutAnimate = setTimeout(()=>{
      this.animate()
    },miliseconds)
    
    const {sxLayers,index,operation} = this;
    
    this.operation === "add" ? this.index++ : this.index--;
    
    if (this.index === this.sxLayers.length - 1) this.operation = "subtract";
    else if (this.index === 0) this.operation = "add";
  }
}