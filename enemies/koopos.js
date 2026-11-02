export class Koopos {
  constructor (aboveOf,x,y) {
    this.enemy = true; 
    this.idTimeOutLayers = 0;
    this.sx = 480;
    this.sy = 819;
    this.sw = 17;
    this.sh = 21;
    this.yForWalkInGround = 188;
    this.x = x;
    this.y = y ?? this.yForWalkInGround;
    this.direction = "L";
    this.animated = false;
    this.gravity = 0.3;
    this.fallSpeed = 0;
    this.fallingInDitch = false;
    this.falling = false;
    this.aboveOf = aboveOf;
    this.movingFastForDelete = false;
    this.crushed = false;
    this.showLegs = false;
    this.amountShowLegs = 0;
    this.velocityJumpAtStruck = -3.5;
    this.remove = false;
    this.struck = false;
    this.measuresCrushed = {
      sx:541,
      sy:825,
      sw:14,
      sh:12
    },
    this.measuresWakeUp = {
      sx:511,
      sy:824,
      sw:14,
      sh:15
    }
  }
  
  runLayers () {
    this.idTimeOutLayers = setTimeout(()=>{
      this.runLayers()
    },150)
    
    this.sx = this.sx === 480 ? 451 : 480
  }
  
  draw (scrollX,$SPRITES,ctx) {
    let measuresReference;
    
    if (this.showLegs) measuresReference = this.measuresWakeUp;
    else if (this.crushed) measuresReference = this.measuresCrushed;
    else measuresReference = this;
    
    const {sw,sh,sx,sy} = measuresReference;
    
    if (this.struck) {
      ctx.save();
      ctx.translate(this.x + scrollX,this.y + sh);
      ctx.scale(1,-1);
      ctx.drawImage($SPRITES,sx,sy,sw,sh,0,0,sw,sh);
      ctx.restore();
    }
    else ctx.drawImage($SPRITES,sx,sy,sw,sh,scrollX + this.x,this.y,sw,sh)
  }
  
  effectMoveFast (GAME,canvasWidth) {
    this.idTimeOutMoveFast = setTimeout(()=>{
      this.effectMoveFast(GAME,canvasWidth);
    },3)
    
    const {direction} = this;
    
    direction === "L" ? this.x-- : this.x++;
    
    GAME.detectObjectDropInDitch(this,{type:"enemy",name:"koopos"});
    
    if (this.fallingInDitch) {
      clearTimeout(this.idTimeOutMoveFast);
      return;
    }
    
    //ESTO EN CASO DE QUE SALGA DE LA PANTALLA EN UNA DE LAS DOS DIRECCIONES DISPONIBLES (L,R)
    if (GAME.detectEnemyOutScreen(this) || (this.x + GAME.scrollX) >= canvasWidth) {
      clearTimeout(this.idTimeOutMoveFast);
      
      let indexEnemyToDelete = GAME.koopos.indexOf(this);
      
      GAME.koopos.splice(indexEnemyToDelete,1);
      
      return;
    }
    
    //DETECTAR SI GOLPEAMOS A UN GOOMBAS 
    for (let goombas of GAME.goombas) {
      if (goombas.struck) continue;
      
      let inRangeX = this.x + this.sw > goombas.x && this.x < goombas.x + goombas.sw,
      inRangeY = this.y + this.sh > goombas.y && this.y < goombas.y + goombas.sh;
      
      if (inRangeX && inRangeY) {
        clearTimeout(goombas.idTimeOutLayers)
        
        goombas.animated = false;
        
        goombas.struck = true;
        
        let xCenterGoombas = goombas.x + (goombas.sw / 2);
      
        GAME.scoresGet.push({score:200,x:xCenterGoombas,y:goombas.y - 5,yReference:goombas.y})
        
        goombas.impactEffect();
      }
    }
  }
  
  effectWakeUp () {
    this.idTimeOutShowLegs =  setTimeout(()=>{
      this.effectWakeUp();
    },150);
    
    const {showLegs,amountShowLegs} = this;
    
    let show = showLegs ? false : true;
    
    if (amountShowLegs === 5 && show) {
      clearTimeout(this.idTimeOutShowLegs);
      
      this.crushed = false;
      
      this.amountShowLegs = 0;
      
      this.y -= 8;
      
      return;
    }
    
    this.showLegs = show;
    
    let amountShow = show ? amountShowLegs + 1 : amountShowLegs;
    
    this.amountShowLegs = amountShow;
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
}