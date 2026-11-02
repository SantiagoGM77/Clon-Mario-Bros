export class Flower {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.yBlock = y;
    this.animation = {index:0,layers:[
      {sx:52,sy:84,sw:16,sh:17},
      {sx:70,sy:84,sw:17,sh:17},
      {sx:90,sy:84,sw:16,sh:17},
      {sx:108,sy:84,sw:17,sh:17}]
    };
    this.idTimeOutRise = 0;
  }
  
  runAnimation () {
    this.idIntervalRunLayers = setInterval(()=>{
      const {index,layers} = this.animation;
    
      this.animation.index = index + 1 === layers.length ? 0 : index + 1;
    },50);
  }
  
  draw (scrollX,$SPRITES,ctx) {
    const {index,layers} = this.animation;
    
    let {sx,sy,sw,sh} = layers[index];
    
    ctx.drawImage($SPRITES,sx,sy,sw,sh,this.x + scrollX,this.y,sw,sh);
  }
  
  effectRise () {
    this.idTimeOutRise = setTimeout(()=>{
      this.effectRise();
    },100)
    
    this.y--;
    
    let diferenceInY = this.yBlock - this.y;
    
    //17 ES LA ALTURA DE LA FLOR
    if (diferenceInY >= 17) clearTimeout(this.idTimeOutRise);
  }
}

export class Fireball {
  constructor (x,y,directionX) {
    this.x = x;
    this.y = y;
    this.yForGround = 200;
    this.directionX = directionX;
    this.velocityY = 0;
    this.gravity = 0.4;
    this.velocityJump = -4;
    this.explode = false;
    this.eliminate = false;
    this.idTimeOutAnimationFire = 0;
    this.idTimeOutAnimationBurst = 0;
    this.animation = {index:0,layers:[
      {sx:313,sy:945,sw:8,sh:9},
      {sx:324,sy:945,sw:8,sh:9},
      {sx:337,sy:945,sw:8,sh:9},
      {sx:348,sy:945,sw:8,sh:9}]};
    this.animationBurst = {index:0,layers:[{sx:359,sy:945,sw:9,sh:9},{sx:372,sy:943,sw:12,sh:14},{sx:388,sy:942,sw:16,sh:16}]};
  }
  
  runAnimationFire () {
    this.idTimeOutAnimationFire = setTimeout(()=>{
      const {index,layers} = this.animation;
      
      this.animation.index = index + 1 === layers.length ? 0 : index + 1;
      
      this.runAnimationFire()
    },100)
  }
  
  runAnimationBurst () {
    this.idTimeOutAnimationBurst = setTimeout(()=>{
      const {index,layers} = this.animationBurst;
      
      if (index + 1 === layers.length) {
        this.eliminate = true;
        clearTimeout(this.idTimeOutAnimationBurst);
      } else {
        this.animationBurst.index++;
        this.runAnimationBurst();
      }
    },30)
  }
  
  draw ($SPRITES,ctx) {
    let measures = this.explode ? this.animationBurst : this.animation;
    
    const {index,layers} = measures;
    
    const {sx,sy,sw,sh} = layers[index];
    
    if (!this.eliminate) ctx.drawImage($SPRITES,sx,sy,sw,sh,this.x,this.y,sw,sh);
  }
  
  detectACollision (obstacles,scrollXCanvas) {
    let {sw,sh,solidObjects,typeEnemy} = obstacles;
    
    let sizeXFireBall = this.animation.layers[0].sw,
    sizeYFireBall = this.animation.layers[0].sh;
    
    for (let i = 0;i<solidObjects.length;i++) {
      const object = solidObjects[i];
      
      let sizeX = sw ?? object.width ?? object.sw,
      sizeY = sh ?? object.height ?? object.sh;
      
      let xObject = object.x + scrollXCanvas;
      
      if ((typeEnemy === "koopos" && (object.movingFastForDelete || object.struck)) || (typeEnemy === "goombas" && (object.struck || object.crushed))) continue;
      
      let collision = this.x + sizeXFireBall > xObject && this.x < xObject + sizeX && this.y + sizeYFireBall > object.y && this.y < object.y + sizeY;
      
      if (collision) return {index:i};
    }
  }
}