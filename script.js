"use strict";

import {Life} from "./power/life.js";
import {InvincibilityStar} from "./power/invincibilityStar.js";
import {BigMario} from "./power/bigMario.js";
import {Flower,Fireball} from "./power/fireFlower.js";
import {Brick} from "./brick/brickClassic.js";
import {BrickQuestion} from "./brick/brickQuestion.js";
import {CoinBig} from "./coins/coinBig.js";
import {Coin} from "./coins/coinClassic.js";
import {Goombas} from "./enemies/goombas.js";
import {Koopos} from "./enemies/koopos.js";

const $ = selector => document.querySelector(selector);

const $CANVAS = $("#canvas");

const ctx = $CANVAS.getContext("2d");

const $IMGBACKGROUNDGAME = new Image ();

const $SPRITES = new Image ();

const fontGame = new FontFace ("Mario-Font","url('./font/Super Mario Bros. NES.ttf')");

$IMGBACKGROUNDGAME.src = "./bg/originalBG.jpg";

$SPRITES.src = "./sprites/sprites.png";

let statusLoadSprites = 0;

const spriteLoad = () => {
  statusLoadSprites++;
  
  if (statusLoadSprites === 2) {
    let {brickCommon,brickSolid,brickQuestion,pipe,ditch,goombas,koopos,flag,brickSolidInsideThePipe,coinsInsideThePipe} = Levels.getObstaclesLevel(1);
    
    const QUESTIONBLOCK = new BrickQuestion (brickQuestion),
    BRICK = new Brick (brickCommon),
    MARIO = new Mario (QUESTIONBLOCK,BRICK);
    
    const coinBigForHeader = new CoinBig (130,17);
    
    let game = new Game (MARIO,QUESTIONBLOCK,BRICK,pipe,ditch,brickSolid,goombas,koopos,flag,brickSolidInsideThePipe,coinBigForHeader,coinsInsideThePipe);
  
    MARIO.GAME = game;
    
    game.setEvents();
    
    coinBigForHeader.animate(true)
  
    window.requestAnimationFrame(()=>{game.drawGame()});
  }
}

$IMGBACKGROUNDGAME.onload = () => spriteLoad();

$SPRITES.onload = () => spriteLoad()

fontGame.load().then(font=>{
  document.fonts.add(font);
}).catch()

class Levels {
  constructor () {
    this.levels = {
      1:{
        brickQuestion:[
          {x:256,y:144,on:true},
          {x:336,y:144,on:true,power:"BigMario"},
          {x:368,y:144,on:true},
          {x:352,y:80,on:true},
          {x:1025,y:129,on:true,hidden:true,power:"Life"},
          {x:1248,y:144,on:true,power:"BigMario"},
          {x:1504,y:80,on:true},
          {x:1696,y:144,on:true},
          {x:1744,y:144,on:true},
          {x:1792,y:144,on:true},
          {x:1744,y:80,on:true,power:"BigMario"},
          {x:2064,y:80,on:true},
          {x:2079,y:80,on:true},
          {x:2720,y:144,on:true}
        ],
        brickCommon:[
          {x:319,y:144},
          {x:351,y:144},
          {x:383,y:144},
          {x:1231,y:144},
          {x:1263,y:144},
          {x:1279,y:80},
          {x:1293,y:80},
          {x:1307,y:80},
          {x:1321,y:80},
          {x:1335,y:80},
          {x:1349,y:80},
          {x:1363,y:80},
          {x:1377,y:80},
          {x:1391,y:80},
          {x:1459,y:80},
          {x:1473,y:80},
          {x:1487,y:80},
          {x:1504,y:144,coins:6},
          {x:1600,y:144},
          {x:1614,y:144,power:"InvincibilityStar"},
          {x:1888,y:144},
          {x:1935,y:80},
          {x:1949,y:80},
          {x:1963,y:80},
          {x:2047,y:80},
          {x:2064,y:144},
          {x:2079,y:144},
          {x:2094,y:80},
          {x:2689,y:144},
          {x:2703,y:144},
          {x:2735,y:144}
        ],
        brickSolid:[
          {x:2144,y:192,width:15,height:15},
          {x:2160,y:176,width:15,height:15},
          {x:2176,y:160,width:15,height:15},
          {x:2192,y:144,width:15,height:64},
          {x:2240,y:144,width:15,height:64},
          {x:2256,y:160,width:15,height:15},
          {x:2272,y:176,width:15,height:15},
          {x:2288,y:192,width:15,height:15},
          {x:2369,y:192,width:15,height:15},
          {x:2385,y:176,width:15,height:15},
          {x:2401,y:160,width:15,height:15},
          {x:2417,y:144,width:31,height:64},
          {x:2480,y:144,width:15,height:64},
          {x:2496,y:160,width:15,height:15},
          {x:2512,y:176,width:15,height:15},
          {x:2528,y:192,width:15,height:15},
          {x:2897,y:192,width:15,height:15},
          {x:2913,y:176,width:15,height:15},
          {x:2929,y:160,width:15,height:15},
          {x:2945,y:144,width:15,height:15},
          {x:2961,y:128,width:15,height:15},
          {x:2977,y:112,width:15,height:15},
          {x:2993,y:96,width:15,height:15},
          {x:3009,y:80,width:31,height:130},
          {x:3168,y:192,width:15,height:15}
        ],
        brickSolidInsideThePipe:[
        {x:134.5,y:160,width:113,height:49}
        ],
        coinsInsideThePipe:[
          new CoinBig (155.5,81),
          new CoinBig (170.5,81),
          new CoinBig (185.5,81),
          new CoinBig (200.5,81),
          new CoinBig (215.5,81),
          new CoinBig (140.5,113),
          new CoinBig (155.5,113),
          new CoinBig (170.5,113),
          new CoinBig (185.5,113),
          new CoinBig (200.5,113),
          new CoinBig (215.5,113),
          new CoinBig (230.5,113),
          new CoinBig (140.5,145),
          new CoinBig (155.5,145),
          new CoinBig (170.5,145),
          new CoinBig (185.5,145),
          new CoinBig (200.5,145),
          new CoinBig (215.5,145),
          new CoinBig (230.5,145)
        ],
        pipe:[
          {x:449,y:177,width:30,height:31},
          {x:609,y:161,width:30,height:47},
          {x:737,y:145,width:30,height:63},
          {x:913,y:145,width:30,height:63},
          {x:2609,y:177,width:30,height:31},
          {x:2865,y:177,width:30,height:31}],
        ditch:[
          {x:1104,width:32},
          {x:1376,width:48},
          {x:2448,width:32}
        ],
        goombas:[
          new Goombas (400,191,"floor"),
          new Goombas (676,191,"floor",738),
          new Goombas (827,191,"floor",914),
          new Goombas (854,191,"floor",914),
          new Goombas (1293,63,"BrickCommon"),
          new Goombas (1330,63,"BrickCommon"),
          new Goombas (1579,191,"floor"),
          new Goombas (1606,191,"floor"),
          new Goombas (1792,191,"floor"),
          new Goombas (1819,191,"floor"),
          new Goombas (1979,191,"floor"),
          new Goombas (2006,191,"floor"),
          new Goombas (2062,191,"floor"),
          new Goombas (2089,191,"floor"),
          new Goombas (2708,191,"floor",2865),
          new Goombas (2745,191,"floor",2865)
        ],
        koopos:[
          new Koopos ("floor",1730)
        ],
        flag:{
          x:3160,
          y:49,
          sw:16,
          sh:15,
          sx:432,
          sy:84,
          yLimit:170
        }
      }
    }
  }
  
  static getObstaclesLevel (level) {
    const levels = new Levels ();
    let obstacles = levels.levels[level]
    return obstacles;
  }
}

class Mario {
  constructor (QUESTIONBRICK,BRICK) {
    this.layersRun = {index:0,sx:[118,100,85]};
    this.moving = false;
    this.jumping = false;
    this.forceStartJump = -9.3;
    this.gravityJump = 0.7;
    this.velocityJump = 0;
    this.sxLayerJump = 139;
    this.yForWalkInGround = 192;
    this.x = 40;
    this.y = this.yForWalkInGround;
    this.sx = 22;
    this.sy = 507;
    this.sh = 16;
    this.sw = 15;
    this.widthLayerJump = 17;
    this.syLayerJump = null;
    this.idIntervalRunLayers = 0;
    this.idTimeOutJump = 0;
    this.continueJump = false;
    this.idTimeOutMove = 0;
    this.drawMarioInDirectionLeft;
    this.QUESTIONBRICK = QUESTIONBRICK;
    this.BRICK = BRICK;
    this.fallingInDitch = false;
    this.idTimeOutFallingInDitch = 0;
    this.aboveOf = "floor";
    this.powersUpGet = new Map ();
    this.life = 3;
    this.measuresEliminated = {
      sx:45,
      sy:509,
      sw:15,
      sh:15
    };
    this.measuresWithPowerFlower = {
      sx:118,
      sy:630,
      layersRun:[166,186,210],
      syLayerJump:628,
      sxLayerJump:237
    };
    //LAS MEDIDAS DE MARIO AL AGACHARSE SOLO APLICA SI TIENE EL BIG MARIO
    this.bendMeasures = {
      normal:{sx:24,sy:559,sw:16,sh:22},
      white:{sx:95,sy:641,sw:16,sh:22},
      dark:{sx:12,sy:750,sw:16,sh:22}
    };
    //PARA SABER QUE MEDIDAS DE EL COLOR DE MARIO DIBUJAR AL AGACHARSE
    this.bendMeasuresToApply = "normal";
    this.bend = false;
    this.continueDrawing = true;
    this.immunity = false;
    this.stop = false;
    this.eliminated = false;
    this.showLayerMarioBigTouchEnemy = false;
    this.transformingFromSmallToLarge = false;
    //VARIABLES UTILIZADAS AL TOCAR LA BANDERA DE EL FINAL
    this.touchingFlag = false;
    this.measuresMarioTouchingFlag;
    this.drawMarioInOnOtherSideOfFlag = false;
    this.opacityToEnterInDoorCastle = 1;
    //CAMBIARA EL VALOR CUANDO ESTE ENTRANDO POR UNA TUBERIA
    this.enteringDrainage = false;
    this.idTimeOutAscOrDescInPipe = 0;
    //SOLO SE ACTIVA CUANDO YA ESTEMOS DENTRO DE LA TUBERIA
    this.insideThePipe = false;
    //SOLO SE ACTIVA CUANDO YA ESTEMOS SALIENDO DE LA TUBERIA
    this.leaveDrainage = false;
    this.idTimeOutEnterInPipe = 0;
    this.idTimeOutAscendOfPipe = 0;
    this.idTimeOutToOutPipe = 0;
  }
  
  setMeasures (typeHight) {
    let yForWalkInGround = 192,
    sy = 507,
    sh = 16,
    sw = 15,
    sx = 22,
    sxLayerJump = 139,
    layersRun = {index:0,sx:[118,100,85]},
    syLayerJump = null;
    
    if (typeHight === "BigMario") {
      layersRun = {index:0,sx:[140,114,95]};
      sx = 48;
      sxLayerJump = 166;
      yForWalkInGround = 176;
      sw = 17;
      syLayerJump = 546;
      sy = 548;
      sh = 32;
    }
    
    this.yForWalkInGround = yForWalkInGround;
    this.sy = sy;
    this.sh = sh;
    this.sw = sw;
    this.sx = sx;
    this.sxLayerJump = sxLayerJump;
    this.layersRun = layersRun;
    this.syLayerJump = syLayerJump;
  }
  
  draw () {
    let sxPosition = this.sx,
    syPosition = this.sy,
    width = this.sw,
    height = this.sh;
    
    const drawMario = (sw,sh,width,height) => {
      //LA OPACIDAD BAJARA CUANDO ENTREMOS POR LA PUERTA DE EL CASTILLO
      
      ctx.globalAlpha = this.opacityToEnterInDoorCastle;
      
      if (this.drawMarioInDirectionLeft || this.drawMarioInOnOtherSideOfFlag) {
        this.moveToLeftMario(width * (this.drawMarioInOnOtherSideOfFlag ? 2 : 1));
        ctx.drawImage($SPRITES,sxPosition,syPosition,sw,sh,0,0,width,height);
        ctx.restore();
      }
      else ctx.drawImage($SPRITES,sxPosition,syPosition,sw,sh,this.x,this.y,width,height);
      
      ctx.globalAlpha = 1;
    }
    
    const {index,sx} = this.layersRun;
    
    if (this.moving) sxPosition = sx[index];
    
    if (this.jumping || this.fallingInDitch) {
      sxPosition = this.sxLayerJump;
      width = this.widthLayerJump;
      this.syLayerJump ? syPosition = this.syLayerJump : syPosition;
    }
    
    if (this.showLayerMarioBigTouchEnemy) {
      sxPosition = this.powersUpGet.has("Flower") ? 237 : 167;
      syPosition = this.syLayerJump;
      width = 16;
      height = 31;
    }
    
    if (this.transformingFromSmallToLarge) {
      sxPosition = this.sx;
      syPosition = this.sy;
      width = this.sw;
      height = this.sh;
    }
    
    if (this.eliminated) {
      const {sx,sy,sw,sh} = this.measuresEliminated;
      
      sxPosition = sx;
      syPosition = sy;
      width = sw;
      height = sh;
    }
    
    if (this.bend) {
      let {sx,sy,sw,sh} = this.bendMeasures[this.bendMeasuresToApply];
      
      sxPosition = sx;
      syPosition = sy;
      width = sw;
      height = sh;
    }
    
    if (this.touchingFlag) {
      sxPosition = this.measuresMarioTouchingFlag.sx;
      syPosition = this.measuresMarioTouchingFlag.sy;
      
      const {sw,sh,width,height} = this.measuresMarioTouchingFlag;
      
      drawMario(sw,sh,width,height);
      
      return;
    }
    
    if (!this.continueDrawing) return;
    
    drawMario(width,height,width,height)
  }
  
  runLayers () {
    this.idIntervalRunLayers = setInterval(()=>{
      let {index,sx} = this.layersRun;
      
      if (index + 1 === sx.length) this.layersRun.index = 0;
      else this.layersRun.index++;
      
    },100)
  }
  
  isAbovePipeOfOut () {
    let aboveOfPipeOut = this.x + this.sw > 278.5 && this.y + this.sh >= 176 && this.y < 176;
    
    if (aboveOfPipeOut) {
      this.y = 176 - this.sh;
      return true;
    }
  }
  
  effectJump () {
    this.idTimeOutJump = setTimeout(()=>{
      this.effectJump();
    },25)
    
    let crashWithOneObstacleAbove = false,crashWithOneObstacleBelow = false;
    
    const {blocks,sw,sh} = this.QUESTIONBRICK,
      {bricks,sw:w,sh:h} = this.BRICK,
      {pipe,brickSolid,brickSolidInsideThePipe} = this.GAME;
    
    const detectCollapseWithObjects = () => {
      let crashInYWithBrickCommon = this.detectCrashWithBrickInY(bricks,this,w,h),
      crashInYWithBrickQuestion = this.detectCrashWithBrickInY(blocks,this,sw,sh),
      crashInYWithPipe = this.detectCrashWithBrickInY(pipe,this),
      crashInYWithSolidBlock = this.detectCrashWithBrickInY(brickSolid,this);
      
      if (crashInYWithBrickCommon?.direction === "UP") {
        this.aboveOf = "BrickCommon";
        crashWithOneObstacleAbove = true
      }
      else if (crashInYWithBrickQuestion?.direction === "UP") {
        this.aboveOf = "BrickQuestion";
        crashWithOneObstacleAbove = true
      }
      else if (crashInYWithPipe?.direction === "UP") {
        this.aboveOf = "Pipe";
        crashWithOneObstacleAbove = true
      }
      else if (crashInYWithSolidBlock?.direction === "UP") {
        this.aboveOf = "SolidBlock";
        crashWithOneObstacleAbove = true
      }
      else if (crashInYWithBrickCommon?.direction === "DOWN" || crashInYWithBrickQuestion?.direction === "DOWN") crashWithOneObstacleBelow = true
      
      return {crashInYWithBrickQuestion,crashInYWithBrickCommon}
    }
    
    this.y += this.velocityJump;
    
    const {crashInYWithBrickCommon,crashInYWithBrickQuestion} = !this.insideThePipe ? detectCollapseWithObjects() : {};
    
    let indexBrickCommom = crashInYWithBrickCommon?.indexBlock,
    indexBrickQuestion = crashInYWithBrickQuestion?.indexBlock;
    
    if (crashInYWithBrickQuestion?.direction === "DOWN" && blocks[indexBrickQuestion].on) {
      
      let block = blocks[indexBrickQuestion];
      
      block.on = false;
      
      const {y,x,power,hidden} = block;
      
      block.ySkip = y;
      
      if (hidden) block.hidden = false;
      
      this.QUESTIONBRICK.velocitySkip = this.QUESTIONBRICK.velocitySkipStart;
      
      this.QUESTIONBRICK.effectSkip(indexBrickQuestion);
      
      let unlockPowerBigMario = power === "BigMario" && !this.powersUpGet.has(power);
      
      if (unlockPowerBigMario) {
        let MUSHROOMBIGMARIO = new BigMario (x,y);
        
        this.GAME.releasedPowers.set(power,MUSHROOMBIGMARIO);
        
        this.GAME.moveMushrooms(power);
      }
      else if (power === "Life") {
        let MUSHROOMLIFE = new Life (x,y);
        
        this.GAME.releasedPowers.set(power,MUSHROOMLIFE);
        
        this.GAME.moveMushrooms(power);
      }
      else if (!unlockPowerBigMario && x === 1248) {
        let FLOWER = new Flower (x,y);
        
        this.GAME.releasedPowers.set("Flower",FLOWER);
        
        FLOWER.runAnimation();
        
        FLOWER.effectRise();
      }
      else {
        //4.5 es el tamaño de la mitad del coin y el 16 el la altura de el coin;
        
        let xInHalf = x + (sw / 2) - 4.5
        
        let coin = new Coin (xInHalf,y - 16,y);
        
        coin.effectSkip();
        
        coin.changeLayerCoin(0);
        
        this.GAME.coinsReleased.push(coin);
      }
    }
    else if (crashInYWithBrickCommon?.direction === "DOWN" && bricks[indexBrickCommom].power) {
      let brick = bricks[indexBrickCommom];
      
      const {x,y,power} = brick;
      
      const {sxOff,syOff} = this.QUESTIONBRICK;
      
      brick.drawAsBrickQuestionOff = {
        sx:sxOff,
        sy:syOff,
        sw,
        sh
      }
      
      if (power === "InvincibilityStar") {
        //15 es el width de la estrella de poder
        let xStart = x + (sw / 2) - (15 / 2);
        
        let invincibilityStar = new InvincibilityStar (xStart,y);
        
        invincibilityStar.runLayers();
        
        this.GAME.releasedPowers.set(power,invincibilityStar);
      }
      
      this.GAME.moveStar()
      
      delete brick.power;
    }
    else if (crashInYWithBrickCommon?.direction === "DOWN" && this.powersUpGet.has("BigMario") && !("coins" in bricks[indexBrickCommom]) && !bricks[indexBrickCommom].drawAsBrickQuestionOff) {
      
      let {x,y} = bricks[indexBrickCommom],
      sizeMiniBrick = 9,
      sx = 431,sy = 47,
      startVelocityTop = -5,startVelocityBottom = -3,
      gravity = 0.3;
      
      let miniBrickLT = {
        x,y,width:sizeMiniBrick,height:sizeMiniBrick,sx,sy,velocity:startVelocityTop,gravity,corner:"LT"
      },miniBrickRT = {
        x:x + sizeMiniBrick,y,width:sizeMiniBrick,height:sizeMiniBrick,sx,sy,velocity:startVelocityTop,gravity,corner:"RT"
      },miniBrickLB = {
        x,y:y + sizeMiniBrick,width:sizeMiniBrick,height:sizeMiniBrick,sx,sy,velocity:startVelocityBottom,gravity,corner:"LB"
      },miniBrickRB = {
        x:x + sizeMiniBrick,y:y + sizeMiniBrick,width:sizeMiniBrick,height:sizeMiniBrick,sx,sy,velocity:startVelocityBottom,gravity,corner:"RB"
      }
      
      this.GAME.brokenBricks.push([miniBrickLT,miniBrickRT,miniBrickLB,miniBrickRB]);
      
      bricks.splice(indexBrickCommom,1);
      
      let goombasToStruck = this.GAME.goombas.find(goombas=>goombas.x + goombas.sw > x && goombas.x < x + w && goombas.y + goombas.sh >= y && goombas.y < y);
      
      if (goombasToStruck) {
        clearTimeout(goombasToStruck.idTimeOutLayers);
        
        goombasToStruck.animated = false
        
        goombasToStruck.struck = true;
        
        let xCenterGoombas = goombasToStruck.x + (goombasToStruck.sw / 2);
      
        this.GAME.scoresGet.push({score:100,x:xCenterGoombas,y:goombasToStruck.y - 5,yReference:goombasToStruck.y})
        
        goombasToStruck.impactEffect($CANVAS.height);
      }
    }
    else if (crashInYWithBrickCommon?.direction === "DOWN" && bricks[indexBrickCommom].ySkip === undefined && !("coins" in bricks[indexBrickCommom]) && !bricks[indexBrickCommom].drawAsBrickQuestionOff) {
      const {y,x} = bricks[indexBrickCommom];
      
      bricks[indexBrickCommom].ySkip = y
      
      this.BRICK.velocitySkip = this.BRICK.velocitySkipStart;
      
      this.BRICK.effectSkip(indexBrickCommom);
      
      let goombasToStruck = this.GAME.goombas.find(goombas=>goombas.x + goombas.sw > x && goombas.x < x + w && goombas.y + goombas.sh >= y && goombas.y < y);
      
      if (goombasToStruck) {
        clearTimeout(goombasToStruck.idTimeOutLayers);
        
        goombasToStruck.animated = false
        
        goombasToStruck.struck = true;
        
        let xCenterGoombas = goombasToStruck.x + (goombasToStruck.sw / 2);
      
        this.GAME.scoresGet.push({score:100,x:xCenterGoombas,y:goombasToStruck.y - 5,yReference:goombasToStruck.y})
        
        goombasToStruck.impactEffect($CANVAS.height);
      }
    }
    else if (crashInYWithBrickCommon?.direction === "DOWN" && bricks[indexBrickCommom].coins > 0 && bricks[indexBrickCommom].ySkip === undefined) {
      let brick = bricks[indexBrickCommom];
      
      brick.coins--;
      
      const {x,y,coins} = brick;
      
      brick.ySkip = y;
      
      this.BRICK.velocitySkip = this.BRICK.velocitySkipStart;
      
      this.BRICK.effectSkip(indexBrickCommom);
      
      if (coins === 0) {
        let {sxOff,syOff} = this.QUESTIONBRICK;
        
        brick.drawAsBrickQuestionOff = {
          sx:sxOff,
          sy:syOff,
          sw,
          sh
        }
      }
      
      let xDrawCoin = x + (sw / 2) - 4.5
      ,yStartDrawCoin = y - 16;
      
      let coin = new Coin (xDrawCoin,yStartDrawCoin,y);
      
      coin.effectSkip();
      
      coin.changeLayerCoin(0);
      
      this.GAME.coinsReleased.push(coin)
    }
    
    if (!this.insideThePipe) this.detectDropInDitch();
    
    //EN LOS DOS FOR QUE APARECEN ABAJO RECORREMOS LOS ENEMIGOS PARA VER SI APLASTAMOS A UNO DE ELLOS
    for (let i=0;i<this.GAME.goombas.length && !this.insideThePipe;i++) {
      const goombas = this.GAME.goombas[i];
      
      if (!goombas.animated || goombas.crushed || this.immunity || goombas.struck) continue;
      
      let collapse = this.GAME.detectEnemyTouchWithMario(goombas,"goombas");
      
      if (collapse) break;
    }
    
    for (let i=0;i<this.GAME.koopos.length && !this.insideThePipe;i++) {
      const koopos = this.GAME.koopos[i]
      
      if (koopos.movingFastForDelete || this.immunity || koopos.struck) continue;
      
      let collapse = this.GAME.detectEnemyTouchWithMario(koopos,"koopos");
      
      if (collapse) break;
    }
    
    //AQUI DETECTAMOS SI TOCAMOS EL PODER DE LA FLOR , YA QUE LA FLOR ES ESTATICA DEBEMOS DETECTAR EL TOQUE DIRECTAMENTE CUANDO SALTAMOS
    if (this.GAME.releasedPowers.has("Flower") && !this.moving && !this.immunity && !this.insideThePipe) this.GAME.detectCrashPowerUpWithMARIO("Flower");
    
    if (this.insideThePipe && this.detectCrashWithBrickInY(brickSolidInsideThePipe,this)) {
      this.aboveOf = "SolidBlockInsideThePipe";
      crashWithOneObstacleAbove = true
    }
    else if (this.insideThePipe && this.isAbovePipeOfOut()) {
      this.aboveOf = "PipeOfOut";
      crashWithOneObstacleAbove = true;
    }
    
    if (crashWithOneObstacleAbove && this.continueJump) this.velocityJump = this.forceStartJump;
    else if (crashWithOneObstacleAbove) {
      this.velocityJump = 0;
      this.jumping = false;
      clearTimeout(this.idTimeOutJump)
    }
    else if (crashWithOneObstacleBelow) this.velocityJump = 0 + this.gravityJump;
    else if (this.fallingInDitch) {
      clearTimeout(this.idTimeOutJump);
      this.jumping = false;
    }
    else if (this.y > this.yForWalkInGround && this.continueJump) {
      this.aboveOf = "floor";
      this.y = this.yForWalkInGround;
      this.velocityJump = this.forceStartJump;
    }
    else if (this.y > this.yForWalkInGround) {
      this.aboveOf = "floor";
      this.y = this.yForWalkInGround;
      this.velocityJump = 0;
      this.jumping = false;
      clearTimeout(this.idTimeOutJump)
    }
    else this.velocityJump += this.gravityJump;
  }
  
  effectChangeMarioColor (time=50) {
    this.idTimeOutChangeColor = setTimeout(()=>{
      this.effectChangeMarioColor(time);
    },time)
    
    if (this.powersUpGet.has("BigMario")) {
      this.sx = this.sx === 36 ? 209 : 36;
      this.sy = 738;
      this.layersRun.sx = this.sx === 36 ? [82,102,127] : [257,276,300];
      this.syLayerJump = 737;
      this.sxLayerJump = this.sx === 36 ? 154 : 328;
      this.bendMeasuresToApply = this.sx === 36 ? "dark" : "white";
    }
    else {
      this.sx = this.sx === 11 ? 185 : 11;
      this.sy = 698;
      this.layersRun.sx = this.sx === 11 ? [247,262,280] : [73,88,105];
      this.sxLayerJump = this.sx === 11 ? 301 : 127;
    }
  }
  
  detectCrashWithBrickInY (blocks,object,widthBlock,heightBlock) {
    const {scrollX} = this.GAME;
    
    const adjustY = (directionCrash,yBlock,HEIGHTBLOCK) => {
      if (directionCrash === "DOWN") object.y = yBlock + HEIGHTBLOCK;
      else object.y = yBlock - object.sh
    }
    
    for (let i = 0;i < blocks.length;i++) {
      const measures = blocks[i],
      {x,y,ySkip} = measures;
      
      let yBrickReference = ySkip ?? y;
      
      let WIDTH = widthBlock,
      HEIGHT = heightBlock;
      
      if (!widthBlock && !heightBlock) {
        WIDTH = measures.width;
        HEIGHT = measures.height;
      }
      
      let xOfObject = object.power || object.enemy ? object.x + scrollX : object.x;
      
      let xObstacleReletiveToScreen = x + scrollX;
      
      let intoRangeX = xOfObject + object.sw > xObstacleReletiveToScreen && xOfObject < xObstacleReletiveToScreen + WIDTH;
      
      if (object.y <= y + HEIGHT && object.y + object.sh > y + HEIGHT && intoRangeX) {
        adjustY("DOWN",y,HEIGHT);
        return {direction:"DOWN",indexBlock:i}
      }
      else if (object.y + object.sh >= yBrickReference && object.y < yBrickReference && intoRangeX) {
        adjustY("UP",yBrickReference);
        return {direction:"UP"}
      }
    }
  }
  
  effectEliminated () {
    this.idTimeOutEliminated = setTimeout(()=>{
      this.effectEliminated();
    },25)
    
    this.y += this.velocityJump;
    
    if (this.y > $CANVAS.height) {
      clearTimeout(this.idTimeOutEliminated);
      
      this.life--;
      
      this.GAME.showRestartScreen = true
      
      setTimeout(()=>{
        this.GAME.restartGame();
        this.GAME.showRestartScreen = false;
        window.requestAnimationFrame(()=>{this.GAME.drawGame()});
      },2000)
    }
    
    this.velocityJump += 0.4;
  }
  
  effectFallingInDitch () {
    this.idTimeOutFallingInDitch = setTimeout(()=>{
      this.effectFallingInDitch();
    },25)
    
    this.y += this.velocityJump;
    
    if (this.y > $CANVAS.height) {
      this.velocityJump = 0;
      
      clearTimeout(this.idTimeOutFallingInDitch);
      
      this.life--;
      this.GAME.showRestartScreen = true
      this.GAME.stopAnimation();
      
      setTimeout(()=>{
        this.GAME.showRestartScreen = false;
        
        this.GAME.restartGame();
        
        window.requestAnimationFrame(()=>{this.GAME.drawGame()})
      },2000)
      
      return;
    }
    
    this.velocityJump += this.gravityJump;
  }
  
  move (direction) {
    this.idTimeOutMove = setTimeout(()=>{
      this.move(direction);
    },7)
    
    this.drawMarioInDirectionLeft = direction === "left";
    
    this.x += direction === "right" ? 1 : -1;
    
    let halfCanvas = $CANVAS.width / 2,halfWidthMario = this.sw / 2;
    
    if (this.x + halfWidthMario > halfCanvas && !this.insideThePipe) {
      clearTimeout(this.idTimeOutMove);
      
      this.x = halfCanvas - halfWidthMario;
      
      this.GAME.moveScrollX();
      
      return;
    }
    //EL 72.5 ES LA POSICION X DE EL SUBTERRANEO, EN ESA POSICION EMPIEZA A DIBUJARSE y 14 el grozor de el bloque en la pared
    //{x:313.5,y:29,width:12,height:147}
    else if (this.insideThePipe && this.x < 72.5 + 14) this.x = 86.5;
    else if (this.insideThePipe && this.x + this.sw >= 313.5) this.x = 313.5 - this.sw;
    else if (this.x < 0) this.x = 0;
    
    const {bricks,sw,sh} = this.BRICK,
    {blocks,sw:width,sh:height} = this.QUESTIONBRICK,
    {pipe,brickSolid,brickSolidInsideThePipe} = this.GAME;
    
    if (this.insideThePipe) {
      this.detectCrashWithBlocksInX("MARIO",brickSolidInsideThePipe,this);
      
      this.detectFall();
      
      if (this.aboveOf === "floor" && this.x + this.sw > 278.5 && !this.leaveDrainage && !this.jumping) {
        this.leaveDrainage = true;
        this.GAME.directionButtonTouching = null;
        this.stop = true;
      }
      else if (this.leaveDrainage && this.x > 278.5) {
        clearTimeout(this.idTimeOutMove)
        clearInterval(this.idIntervalRunLayers);
      
        this.layersRun.index = 0;
        this.moving = false;
        
        this.GAME.showBlackScreen = true
        
        this.idTimeOutToOutPipe = setTimeout(()=>{
          this.insideThePipe = false;
          this.GAME.scrollX = -2559;
          this.x = 56.5;
          this.y = 177;
          this.GAME.showBlackScreen = false;
          
          this.idTimeOutAscendOfPipe = setTimeout(()=>{
            this.outOrEnterViaPipeline(177)
          },1000)
        },500)
      }
      return;
    }
    
    this.detectCrashWithBlocksInX("MARIO",bricks,this,sw,sh);
    
    this.detectCrashWithBlocksInX("MARIO",blocks,this,width,height);
    
    this.detectCrashWithBlocksInX("MARIO",pipe,this);
    
    this.detectCrashWithBlocksInX("MARIO",brickSolid,this);
    
    this.detectFall();
    
    if (this.GAME.releasedPowers.size > 0) {
      this.GAME.releasedPowers.keys().forEach((powerName)=>{
        if (!this.immunity) this.GAME.detectCrashPowerUpWithMARIO(powerName)
      })
    }
    
    if (!this.jumping) {
      this.detectDropInDitch();
    }
  }
  
  outOrEnterViaPipeline (yPipe) {
    this.idTimeOutAscOrDescInPipe = setTimeout(()=>{
      this.outOrEnterViaPipeline(yPipe);
    },30)
    
    this.enteringDrainage ? this.y++ : this.y--;
    
    if (this.enteringDrainage && this.y >= yPipe) {
      clearTimeout(this.idTimeOutAscOrDescInPipe);
      
      this.GAME.idTimeOutShowBgBlack = setTimeout(()=>{
        this.GAME.showBlackScreen = true
      },50)
      
      this.idTimeOutEnterInPipe = setTimeout(()=>{
        this.insideThePipe = true;
        this.enteringDrainage = false;
        this.bend = false;
        this.jumping = true;
        this.GAME.showBlackScreen = false;
        this.x = 104.5;
        this.y = 0;
        this.GAME.scrollX = 0;
        this.stop = false;
        this.effectJump();
      },1000)
    }
    else if (this.leaveDrainage && this.y + this.sh <= yPipe) {
      clearTimeout(this.idTimeOutAscOrDescInPipe);
      this.y = yPipe - this.sh;
      this.leaveDrainage = false;
      this.stop = false;
      this.aboveOf = "Pipe";
    }
  }
  
  applyMeasuresToTouchFlag () {
    let measuresToApply;
    if (this.powersUpGet.has("Flower")) measuresToApply = {
    sx:119,sy:609,sw:13,sh:16,width:14.625,height:18
    }
    else if (this.powersUpGet.has("BigMario")) measuresToApply = {
    sx:48,sy:528,sw:13,sh:15,width:15,height:18
    }
    else measuresToApply = {
    sx:48,sy:528,sw:13,sh:15,width:13,height:15
    }
    
    this.measuresMarioTouchingFlag = measuresToApply;
  }
  
  slideDown () {
    let idSlideDown = setTimeout(()=>{
      this.slideDown()
    },25);
    
    const {height} = this.measuresMarioTouchingFlag;
    
    this.y += this.velocityJump;
    
    //EL 192 SIGNIFICA QUE ES LA POSICION Y DE EL BLOQUE QUE CONTIENE LA BANDERA
    
    if (this.y + height >= 192) {
      clearTimeout(idSlideDown);
      
      this.aboveOf = "SolidBlock";
      
      this.jumping = false;
      
      this.y = 192 - this.measuresMarioTouchingFlag.height;
    }
    
    this.velocityJump += 0.2;
  }
  
  walkToEnterTheCastle () {
    let idTimeOutWalk = setTimeout(()=>{
      this.walkToEnterTheCastle()
    },7)
    
    this.x += 0.7;
    
    //OBTENEMOS LAS MEDIDAS DE EL BLOQUE QUE SOSTIENE LA VANDERA DE LA META
    
    const {x,y,width,height} = this.GAME.brickSolid.at(-1);
    
    if (Math.abs(this.GAME.scrollX) + this.x > x + width && this.aboveOf === "SolidBlock" && !this.jumping) {
      this.jumping = true;
      this.velocityJump = 0;
      this.effectJump();
    }
    
    //287 ES LA POCISION X DONDE INICIA LA PUERTA DE EL CASTILLO CON UN ANCHO DE 16
    
    if (this.x + this.sw >= 287) {
      this.opacityToEnterInDoorCastle -= 0.04375;
      
      if (this.opacityToEnterInDoorCastle < 0) {
        this.opacityToEnterInDoorCastle = 0;
        
        clearTimeout(idTimeOutWalk);
        
        this.GAME.levelComplete = true;
        
        this.GAME.velocityConsumeTime = 20;
        
        this.GAME.consumeTime();
      }
    }
  }
  
  detectCrashWithBlocksInX (OBJECTMOVING,blocks,object,widthBlock,heightBlock) {
    const {scrollX} = this.GAME;
    
    const adjustX = (directionCrash,xBlockOfReference,WIDTHBLOCK) => {
      if (OBJECTMOVING !== "SCREEN" && directionCrash === "LEFT") {
        object.x = xBlockOfReference - object.sw;
      }
      else if (OBJECTMOVING !== "SCREEN") {
        object.x = xBlockOfReference + WIDTHBLOCK;
      }
      else if (OBJECTMOVING === "SCREEN") {
        this.GAME.scrollX += this.x + this.sw - xBlockOfReference;
      }
    }
    
    for (let measures of blocks) {
      let HEIGHT = heightBlock,WIDTH = widthBlock,
      {x,y} = measures;
      
      if (!widthBlock && !heightBlock) {
        WIDTH = measures.width;
        HEIGHT = measures.height;
      }
      
      let xBlockOfReference = object.power || object.enemy ? x : x + scrollX;
      
      let intoRangeY = object.y + object.sh > y && object.y < y + HEIGHT
      
      if (object.x <= xBlockOfReference + WIDTH && object.x + object.sw > xBlockOfReference + WIDTH && intoRangeY) {
        adjustX("RIGHT",xBlockOfReference,WIDTH);
        return {sideCrash:"RIGHT"}
      }
      else if (object.x + object.sw >= xBlockOfReference && object.x < xBlockOfReference && intoRangeY) {
        adjustX("LEFT",xBlockOfReference)
        return {sideCrash:"LEFT"}
      }
    }
  }
  
  detectFall () {
    if (this.aboveOf !== "floor" && !this.jumping) {
      const {bricks,sw,sh} = this.BRICK,
      {blocks,sw:w,sh:h} = this.QUESTIONBRICK,
      {pipe,brickSolid,brickSolidInsideThePipe} = this.GAME;
      
      if (
      (this.aboveOf === "BrickCommon" && !this.detectCrashWithBrickInY(bricks,this,sw,sh)) ||
      (this.aboveOf === "BrickQuestion" && !this.detectCrashWithBrickInY(blocks,this,w,h)) || 
      (this.aboveOf === "Pipe" && !this.detectCrashWithBrickInY(pipe,this)) ||
      (this.aboveOf === "SolidBlock" && !this.detectCrashWithBrickInY(brickSolid,this)) ||
      (this.aboveOf === "SolidBlockInsideThePipe" && !this.detectCrashWithBrickInY(brickSolidInsideThePipe,this)) ||
      (this.aboveOf === "PipeOfOut" && !this.isAbovePipeOfOut())
      ) {
        this.jumping = true;
        this.effectJump();
      }
    }
  }
  
  detectDropInDitch () {
    const {ditches,scrollX} = this.GAME;
    
    const stopMotion = () => {
      clearTimeout(this.idTimeOutMove);
      clearInterval(this.GAME.idIntervalScrollX);
      clearInterval(this.idIntervalRunLayers);
      
      this.GAME.directionButtonTouching = null;
    }
    
    for (let i=0;i < ditches.length;i++) {
      const {x,width} = ditches[i];
      
      let xDitchRelativeToMario = x + scrollX;
      
      let inFall = this.x >= xDitchRelativeToMario && this.x + this.sw <= xDitchRelativeToMario + width;
      
      if (inFall && ((this.aboveOf === "floor" && !this.jumping) || (this.y >= this.yForWalkInGround && this.jumping))) {
        stopMotion();
        this.fallingInDitch = true;
        this.effectFallingInDitch();
        break;
      }
    }
  }
  
  moveToLeftMario (widthMario) {
    ctx.save();
    ctx.translate(this.x + widthMario,this.y);
    ctx.scale(-1,1);
  }
}

class Game {
  constructor(MARIO,QUESTIONBRICK,BRICK,pipe,ditch,brickSolid,goombas,koopos,flag,brickSolidInsideThePipe,coinBig,coinsInsideThePipe) {
    this.scrollX = 0;
    this.$BLEFT = $("button#left");
    this.$BRIGHT = $("button#right");
    this.$BUP = $("button#up");
    this.$BSHOOT = $("button#shoot");
    this.$BSTART = $("button#start");
    this.$BDOWN = $("button#down");
    this.MARIO = MARIO;
    this.QUESTIONBRICK = QUESTIONBRICK;
    this.BRICK = BRICK;
    this.idIntervalScrollX = 0;
    this.directionButtonTouching = null;
    this.pipe = pipe;
    this.ditches = ditch;
    this.brickSolid = brickSolid;
    this.brickSolidInsideThePipe = brickSolidInsideThePipe;
    this.coinsInsideThePipe = coinsInsideThePipe;
    this.releasedPowers = new Map ();
    this.brokenBricks = [];
    this.coinsReleased = [];
    this.scoresGet = [];
    this.idTimeOutMoveGoombas = 0;
    this.idTimeOutMoveKoopos = 0;
    this.showRestartScreen = false;
    this.showStartMenu = true;
    //ENEMYES
    this.goombas = goombas;
    this.koopos = koopos;
    //EFFECTS POWER FLOWER
    this.fireballs = [];
    this.coinBigForHeader = coinBig;
    //LAS VARIABLES A UTILIZAR EN EL HEADER PARA LAS PUNTUACIONES
    this.coins = 0;
    this.score = 0;
    this.time = 300;
    this.velocityConsumeTime = 500;
    this.levelComplete = false;
    //MEDIDAS DE LA BANDERA DE EL FINAL DE EL NIVEL
    this.flag = flag;
    //SE ACTIVA ANTES DE APARECER DENTRO DE LA ALCANTARIA
    this.showBlackScreen = false;
    this.idTimeOutShowBgBlack = 0;
  }
  
  moveGoombas () {
    this.idTimeOutMoveGoombas = setTimeout(()=>{
        this.moveGoombas();
      },40);
      
    if (!this.goombas.length) {
      clearTimeout(this.idTimeOutMoveGoombas);
      return;
    }
    
    for (let index = 0;index < this.goombas.length && !this.MARIO.insideThePipe;index++) {
      let goombas = this.goombas[index];
      
      if (goombas.remove) {
        this.goombas.splice(index,1)
        continue;
      }
      
      let insideOfRangeForStartMove = goombas.x + this.scrollX < $CANVAS.width + 10;
      
      if (!insideOfRangeForStartMove || goombas.fallingInDitch || goombas.crushed || goombas.struck) continue
      
      if (!goombas.animated) {
        goombas.animated = true;
        goombas.runLayers();
      }
      
      let crashInX = this.MARIO.detectCrashWithBlocksInX("GOOMBAS",this.pipe,goombas);
      
      const {bricks,sw,sh} = this.BRICK,
      {blocks,sw:w,sh:h} = this.QUESTIONBRICK;
      
      if (crashInX?.sideCrash === "RIGHT") goombas.direction = "RIGHT";
      else if (crashInX?.sideCrash === "LEFT") goombas.direction = "LEFT";
      
      let {direction,falling} = goombas;
      
      direction === "RIGHT" ? goombas.x++ : goombas.x--;
      
      if (!falling && ((goombas.aboveOf === "BrickCommon" && !this.MARIO.detectCrashWithBrickInY(bricks,goombas,sw,sh)) || (goombas.aboveOf === "BrickQuestion" && !this.MARIO.detectCrashWithBrickInY(blocks,goombas,w,h)))) {
        goombas.falling = true;
        goombas.fallingEffect(this.QUESTIONBRICK,this.BRICK,this.MARIO);
      }
      
      this.detectObjectDropInDitch(goombas,{type:"enemy",name:"goombas"});
      
      let goombasOut = this.detectEnemyOutScreen(goombas)
      
      if (goombasOut) {
        clearTimeout(goombas.idTimeOutLayers);
        
        clearTimeout(goombas.idTimeOutFallingInDitch);
        
        clearTimeout(goombas.idTimeOutFalling);
        
        let index = this.goombas.indexOf(goombas);
        
        this.goombas.splice(index,1);
        
        continue;
      }
      
      if (this.MARIO.immunity || this.MARIO.jumping) continue;
      
      let touchMario = this.detectEnemyTouchWithMario(goombas,"goombas");
      
      if (touchMario) break;
    }
  }
  
  detectEnemyTouchWithMario (enemy,enemyName) {
    let {x,y,sw,sh,powersUpGet,jumping,velocityJump} = this.MARIO;
    
    let xEnemyInScreen = enemy.x + this.scrollX;
    
    let inRangeX = x + sw > xEnemyInScreen && x < xEnemyInScreen + enemy.sw,
    inRangeY = y + sh > enemy.y && y < enemy.y + enemy.sh;
    
    let crushedEnemy = y + sh > enemy.y && y < enemy.y
    
    let collapseWithEnemy = inRangeX && inRangeY;
    
    let crushedEnemyToJumpMario = inRangeX && crushedEnemy && jumping && !enemy.falling && (velocityJump > 0 || velocityJump === -5);
    
    const marioIsInvicibility = () => {
      let marioIsInvicibility = powersUpGet.has("InvincibilityStar");
      
      if (marioIsInvicibility && enemyName === "goombas") {
        clearTimeout(enemy.idTimeOutLayers);
        
        enemy.struck = true;
        
        enemy.impactEffect($CANVAS.height);
        
        let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
        this.scoresGet.push({score:300,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y})
        
        return true;
      }
      else if (marioIsInvicibility && enemyName === "koopos") {
        clearTimeout(enemy.idTimeOutLayers);
        clearTimeout(enemy.idTimeOutWakeUp);
        clearTimeout(enemy.idTimeOutShowLegs);
        
        enemy.showLegs = false;
        
        if (!enemy.crushed) {
          enemy.y += 8;
          enemy.crushed = true;
        }
        
        enemy.struck = true;
        
        enemy.impactEffect($CANVAS.height);
        
        let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
        this.scoresGet.push({score:500,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y})
        
        return true;
      }
    }
    
    if (crushedEnemyToJumpMario && enemyName === "goombas") {
      
      if (marioIsInvicibility()) return;
      
      clearTimeout(enemy.idTimeOutLayers);
      
      const {sx,sy,sw,sh} = enemy.measuresCrushed;
      
      enemy.sx = sx;
      enemy.sy = sy;
      enemy.sw = sw;
      enemy.sh = sh;
      
      enemy.crushed = true;
      
      enemy.y += 8;
      
      this.MARIO.velocityJump = -5;
      
      setTimeout(()=>{
        enemy.remove = true;
      },1000)
      
      let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
      this.scoresGet.push({score:100,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y})
    }
    else if (crushedEnemyToJumpMario && enemyName === "koopos") {
      
      if (marioIsInvicibility()) return;
      
      clearTimeout(enemy.idTimeOutLayers);
      
      enemy.animated = false;
      
      if (enemy.crushed) {
        clearTimeout(enemy.idTimeOutWakeUp);
        
        clearTimeout(enemy.idTimeOutShowLegs);
        
        enemy.showLegs = false;
        
        enemy.movingFastForDelete = true
        
        let middleEnemy = xEnemyInScreen + (enemy.sw / 2);
        
        enemy.direction = (x + sw) - middleEnemy >= (sw / 2) ? "L" : "R";
        
        enemy.effectMoveFast(this,$CANVAS.width);
        
        let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
        this.scoresGet.push({score:500,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y})
      } else {
        enemy.y += 8;
        
        let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
        this.scoresGet.push({score:200,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y});
        
        enemy.idTimeOutWakeUp = setTimeout(()=>{
          enemy.effectWakeUp();
        },4000)
      }
      
      enemy.crushed = true;
      
      this.MARIO.velocityJump = -5;
    }
    else if (collapseWithEnemy && enemyName === "koopos" && enemy.crushed) {
      
      if (marioIsInvicibility()) return;
      
      enemy.movingFastForDelete = true
      
      let middleEnemy = xEnemyInScreen + (enemy.sw / 2);
      
      enemy.direction = (x + sw) - middleEnemy >= (sw / 2) ? "L" : "R";
      
      enemy.effectMoveFast(this,$CANVAS.width);
      
      let xCenterGoombas = enemy.x + (enemy.sw / 2);
      
      this.scoresGet.push({score:500,x:xCenterGoombas,y:enemy.y - 5,yReference:enemy.y})
      
      clearTimeout(enemy.idTimeOutWakeUp);
      
      clearTimeout(enemy.idTimeOutShowLegs);
      
      enemy.showLegs = false;
    }
    else if (collapseWithEnemy && powersUpGet.has("BigMario")) {
      let ENEMYES = this[enemyName];
      
      if (marioIsInvicibility()) return;
      
      clearTimeout(enemyName === "goombas" ? this.idTimeOutMoveGoombas : this.idTimeOutMoveKoopos);
      
      clearInterval(this.idIntervalScrollX);
      clearTimeout(this.MARIO.idTimeOutMove);
      
      ENEMYES.forEach(E=>{
        E.animated = false;
        //POR SI ES HAY UN GOOMBAS CALLENDO
        if (E.falling) clearTimeout(E.idTimeOutFalling);
        
        clearTimeout(E.idTimeOutLayers);
      })
      
      if (this.MARIO.bend) {
        this.MARIO.y -= 10;
        this.MARIO.bend = false;
      }
      
      this.MARIO.showLayerMarioBigTouchEnemy = true;
      this.MARIO.stop = true;
      this.MARIO.immunity = true;
      this.MARIO.continueDrawing = false
      
      this.MARIO.idIntervalEffectFlicker = setInterval(()=>{
        const {continueDrawing} = this.MARIO;
        this.MARIO.continueDrawing = continueDrawing ? false : true
      },100)
      
      this.MARIO.idTimeOutContinueMiniMario = setTimeout(()=>{
        this.MARIO.setMeasures("MiniMario");
        
        this.MARIO.stop = false;
        
        powersUpGet.delete("BigMario");
        
        powersUpGet.delete("Flower");
        
        this.MARIO.showLayerMarioBigTouchEnemy = false;
        
        if (!this.MARIO.jumping) this.MARIO.effectJump()
        
        if (this.MARIO.moving) this.MARIO.move(this.directionButtonTouching);
        
        ENEMYES.forEach(E=>{
          //ESTO SOLO APLICARIA PARA LOS GOOMBAS EN CASO DE QUE ESTUVIERAN SUSPENDIDOS EN EL AIRE
          if (E.falling) E.fallingEffect(this.QUESTIONBRICK,this.BRICK,this.MARIO);
        })
        
        enemyName === "goombas" ? this.moveGoombas() : this.moveKoopos();
      },1000)
      
      this.MARIO.idTimeOutClearEffectFlicker = setTimeout(()=>{
        clearInterval(this.MARIO.idIntervalEffectFlicker)
        
        this.MARIO.immunity = false;
        
        this.MARIO.continueDrawing = true;
      },3000)
      
      return true;
    }
    else if (collapseWithEnemy) {
      const ENEMYES = this[enemyName];
      
      if (marioIsInvicibility()) return;
      
      this.stopAnimation();
      
      setTimeout(()=>{
        this.MARIO.velocityJump = -6.3
        this.MARIO.effectEliminated();
      },250)
      
      return true;
    }
  }
  
  detectEnemyOutScreen (enemy) {
    if (enemy.xPipeRight) return enemy.xPipeRight + this.scrollX <= 0;
    else return (enemy.x + this.scrollX) + enemy.sw <= 0;
  }
  
  moveKoopos () {
    this.idTimeOutMoveKoopos = setTimeout(()=>{
      this.moveKoopos()
    },40)
    
    if (!this.koopos.length) {
      clearTimeout(this.idTimeOutMoveKoopos);
      return;
    }
    
    for (let i=0;i<this.koopos.length;i++) {
      const koopos = this.koopos[i]
      
      let insideOfRangeForStartMove = koopos.x + this.scrollX < $CANVAS.width + 10;
      
      if (koopos.remove) {
        this.koopos.splice(i,1)
        continue;
      }
      
      if (!insideOfRangeForStartMove || koopos.fallingInDitch || koopos.movingFastForDelete || koopos.struck) continue;
      else if (!koopos.animated && !koopos.crushed) {
        koopos.animated = true;
        koopos.runLayers();
      }
      
      if (!koopos.crushed) koopos.direction === "L" ? koopos.x-- : koopos.x++;
      
      let touchEnemy;
      if (!this.MARIO.jumping && !this.MARIO.immunity) touchEnemy = this.detectEnemyTouchWithMario(koopos,"koopos");
      
      if (touchEnemy) break;
      
      let out = this.detectEnemyOutScreen(koopos)
      
      if (!out) this.detectObjectDropInDitch(koopos,{type:"enemy",name:"koopos"});
      
      if (out) {
        clearTimeout(koopos.idTimeOutWakeUp);
        clearTimeout(koopos.idTimeOutShowLegs);
        clearTimeout(koopos.idTimeOutLayers);
        this.koopos.splice(i,1);
      }
    }
  }
  
  setEvents () {
    const buttonLeftClick = () => {
      if (this.directionButtonTouching || this.MARIO.fallingInDitch || this.MARIO.stop || this.showStartMenu) return
      
      if (this.MARIO.bend) {
        this.MARIO.y -= 10;
        this.MARIO.bend = false;
      }
      
      this.directionButtonTouching = "left";
      this.MARIO.moving = true;
      this.MARIO.runLayers();
      this.MARIO.move("left");
    }
    
    const buttonLeftClickEnd = () => {
      if (this.directionButtonTouching !== "left") return;
      
      this.directionButtonTouching = null
      this.MARIO.moving = false;
      this.MARIO.layersRun.index = 0;
      
      clearTimeout(this.MARIO.idTimeOutMove);
      clearInterval(this.MARIO.idIntervalRunLayers);
    }
    
    const buttonUpClick = () => {
      if (!this.MARIO.jumping && !this.MARIO.fallingInDitch && !this.MARIO.stop && !this.showStartMenu && !this.MARIO.bend) {
        this.MARIO.jumping = true;
        this.MARIO.velocityJump = this.MARIO.forceStartJump;
        this.MARIO.effectJump();
        this.MARIO.continueJump = true;
      }
    }
    
    const buttonUpClickEnd = () => {
      this.MARIO.continueJump = false;
    }
    
    const buttonRightClick = () => {
      if (this.directionButtonTouching || this.MARIO.fallingInDitch || this.MARIO.stop || this.showStartMenu) return
      
      if (this.MARIO.bend) {
        this.MARIO.y -= 10;
        this.MARIO.bend = false;
      }
      
      this.directionButtonTouching = "right";
      this.MARIO.moving = true;
      this.MARIO.runLayers();
      this.MARIO.move("right");
    }
    
    const buttonRightClickEnd = () => {
      if (this.directionButtonTouching !== "right") return;
      
      this.directionButtonTouching = null
      
      clearInterval(this.idIntervalScrollX);
      clearInterval(this.MARIO.idIntervalRunLayers);
      clearTimeout(this.MARIO.idTimeOutMove);
      
      this.MARIO.layersRun.index = 0;
      this.MARIO.moving = false;
    }
    
    const buttonDownClick = () => {
      let MARIO = this.MARIO;
      
      //EL NUMERO 10 QUE SE LE AUMENTA A (axis)Y ES PARA QUE MARIO TOQUE EL SUELO SEA DONDE SEA QUE SE ENCUENTRE YA QUE SI NO SE LE COLOCA QUEDA SUSPENDIDO
      
      if (MARIO.powersUpGet.has("BigMario") && !MARIO.stop && !MARIO.jumping && !MARIO.bend) {
        MARIO.bend = true;
        MARIO.y += 10;
        
        if (this.MARIO.moving) {
          this.directionButtonTouching = null
      
          clearInterval(this.idIntervalScrollX);
          clearInterval(this.MARIO.idIntervalRunLayers);
          clearTimeout(this.MARIO.idTimeOutMove);
      
          this.MARIO.layersRun.index = 0
          this.MARIO.moving = false;
        }
        
        let xAbsoluteMario = Math.abs(this.scrollX) + MARIO.x;
        
        //LA POSICION 913 ES DONDE ESTQ UBICADA LA TUBERIA EN LA QUE PODEMOS BAJAR Y 30 ES SU ANCHO
        
        if (xAbsoluteMario > 913 && xAbsoluteMario + MARIO.sw < 913 + 30 && MARIO.aboveOf === "Pipe") {
          MARIO.enteringDrainage = true;
          MARIO.stop = true;
          MARIO.outOrEnterViaPipeline(144)
        }
      }
    }
    
    const buttonDownClickEnd = () => {
      if (this.MARIO.bend && !this.MARIO.enteringDrainage) {
        this.MARIO.bend = false;
        this.MARIO.y -= 10;
      }
    }
    
    const buttonShootClick = () => {
      const {MARIO} = this;
      
      if (!MARIO.powersUpGet.has("Flower") || this.MARIO.fallingInDitch || !this.time || this.MARIO.stop || this.MARIO.bend) return;
      
      let directionX,
      xStartFireBall;
      
      if (MARIO.drawMarioInDirectionLeft) {
        directionX = "Left";
        xStartFireBall = MARIO.x;
      } else {
        directionX = "Right";
        xStartFireBall = MARIO.x + MARIO.sw;
      }
      
      let fireBall = new Fireball (xStartFireBall,MARIO.y,directionX);
      
      fireBall.runAnimationFire();
      
      this.fireballs.push(fireBall);
      
      if (this.fireballs.length === 1) this.moveFireBalls();
    }
    
    this.$BLEFT.ontouchstart = buttonLeftClick;
    
    this.$BLEFT.ontouchend = buttonLeftClickEnd;

    this.$BRIGHT.ontouchstart = buttonRightClick;

    this.$BRIGHT.ontouchend = buttonRightClickEnd;
    
    this.$BUP.ontouchstart = buttonUpClick;
    
    this.$BUP.ontouchend = buttonUpClickEnd;
    
    this.$BSHOOT.ontouchstart = buttonShootClick;
    
    this.$BSTART.ontouchstart = () => {
      if (!this.showStartMenu) return;
      
      this.showStartMenu = false;
      
      this.score = 0;
      
      this.coins = 0;
    
      this.QUESTIONBRICK.runLayers();
    
      this.moveGoombas();
    
      this.moveKoopos();
    
      this.consumeTime();
    }
    
    this.$BDOWN.ontouchstart = buttonDownClick;
    
    this.$BDOWN.ontouchend = buttonDownClickEnd;
    
    document.onkeydown = (event) => {
      let {key} = event;
      
      if (key === "ArrowUp") buttonUpClick();
      else if (key === "ArrowDown") buttonDownClick();
      else if (key === "ArrowLeft") buttonLeftClick();
      else if (key === "ArrowRight") buttonRightClick();
      else if (event.code === "Space") buttonShootClick();
    }
    
    document.onkeyup = (event) => {
      let {key} = event;
      
      if (key === "ArrowUp") buttonUpClickEnd();
      else if (key === "ArrowDown") buttonDownClickEnd();
      else if (key === "ArrowLeft") buttonLeftClickEnd();
      else if (key === "ArrowRight") buttonRightClickEnd();
    }
  }
  
  moveFireBalls () {
    this.idTimeOutMoveFireBalls = setTimeout(()=>{
      this.moveFireBalls()
    },18);
    
    const {bricks,sw,sh} = this.BRICK,
    {blocks,sw:w,sh:h} = this.QUESTIONBRICK;
    
    let obstacles = [{solidObjects:this.pipe},{sw,sh,solidObjects:bricks},{sw:w,sh:h,solidObjects:blocks},{solidObjects:this.brickSolid},{solidObjects:this.goombas,typeEnemy:"goombas"},{solidObjects:this.koopos,typeEnemy:"koopos"}];
    
    if (!this.fireballs.length) clearTimeout(this.idTimeOutMoveFireBalls);
    
    for (let index = 0;index < this.fireballs.length;index++) {
      const FB = this.fireballs[index];
      
      if (FB.explode && !FB.eliminate) continue;
      else if (FB.eliminate) {
        this.fireballs.splice(index,1);
        continue;
      }
      
      const {velocityY,directionX} = FB;
      
      FB.x += directionX === "Left" ? -3 : 3;
      
      FB.y += velocityY;
      
      let outOfScreen = FB.x + FB.animation.layers[0].sw <= 0 || FB.x >= $CANVAS.width;
      
      if (outOfScreen) {
        FB.eliminate = true;
        continue;
      }
      
      if (!FB.fallingInDitch) for (let ditch of this.ditches) {
        let {width,x} = ditch;
        
        let xFireBallRelativeToMario = x + this.scrollX;
        
        let inRangeX = FB.x > xFireBallRelativeToMario && FB.x + FB.animation.layers[0].sw < xFireBallRelativeToMario + width;
        
        if (inRangeX && FB.y >= FB.yForGround) FB.fallingInDitch = {
            x,width
          }
      }
      
      //AQUI DETECTAMOS SI HACE COLISION CON ALGUN OBJETO EN EL JUEGO
      for (let i=0;i < obstacles.length;i++) {
        let collision = FB.detectACollision(obstacles[i],this.scrollX);
        
        //EL INDICE 4 HACE REFERENCIA A LOS GOOMBAS , (COLISIONA CON UNO DE ELLOS)
        
        //EL 5 HACE REFERENCIA A LOS koopos
        
        if (collision && i === 4) {
          let goombasStruck = this.goombas[collision.index];
          
          clearTimeout(goombasStruck.idTimeOutLayers);
          
          clearTimeout(goombasStruck.idTimeOutFalling);
          
          clearTimeout(goombasStruck.idTimeOutFallingInDitch)
        
          goombasStruck.animated = false
        
          goombasStruck.struck = true;
        
          let xCenterGoombas = goombasStruck.x + (goombasStruck.sw / 2);
      
          this.scoresGet.push({score:200,x:xCenterGoombas,y:goombasStruck.y - 5,yReference:goombasStruck.y})
        
          goombasStruck.impactEffect($CANVAS.height);
        }
        else if (collision && i === 5) {
          let kooposStruck = this.koopos[collision.index];
          
          clearTimeout(kooposStruck.idTimeOutLayers);
          
          clearTimeout(kooposStruck.idTimeOutShowLegs);
          
          clearTimeout(kooposStruck.idTimeOutWakeUp);
          
          kooposStruck.showLegs = false;
          
          if (!kooposStruck.crushed) {
            kooposStruck.crushed = true;
            kooposStruck.y += 8;
          }
          
          kooposStruck.struck = true;
          
          kooposStruck.impactEffect($CANVAS.height);
          
          let xCenterKoopos = kooposStruck.x + (kooposStruck.sw / 2);
      
          this.scoresGet.push({score:300,x:xCenterKoopos,y:kooposStruck.y - 5,yReference:kooposStruck.y})
        }
        
        if (collision) {
          FB.explode = true;
          clearTimeout(FB.idTimeOutAnimationFire);
          FB.runAnimationBurst();
          break;
        }
      }
      
      if (FB.y >= FB.yForGround && !FB.fallingInDitch) {
        FB.velocityY = FB.velocityJump;
        continue;
      }
      else if (FB.fallingInDitch) {
        const {x,width} = FB.fallingInDitch;
        
        if (FB.x + FB.animation.layers[0].sw >= (x + this.scrollX) + width || FB.x <= x + this.scrollX) {
          FB.explode = true;
          clearTimeout(FB.idTimeOutAnimationFire);
          FB.runAnimationBurst();
          continue;
        }
      }
      
      FB.velocityY += FB.gravity;
    }
  }
  
  cleanCanvas () {
    ctx.clearRect(0,0,$CANVAS.width,$CANVAS.height);
  }
  
  moveScrollX () {
    this.idIntervalScrollX = setInterval(()=>{
      this.scrollX--;
      
      if (Math.abs(this.scrollX - $CANVAS.width) > 3376) this.scrollX = -3376 + $CANVAS.width
      
      //SI SE CUMPLE HABREMOS TOCADO LA VANDERA DE LA META 
      if (Math.abs(this.scrollX) + this.MARIO.x + this.MARIO.sw >= 3178) {
        this.MARIO.applyMeasuresToTouchFlag()
        this.MARIO.touchingFlag = true;
        this.MARIO.stop = true;
        this.directionButtonTouching = null;
      
        clearInterval(this.MARIO.idIntervalRunLayers);
        clearInterval(this.idIntervalScrollX);
        clearTimeout(this.MARIO.idTimeOutJump)
        clearTimeout(this.idTimeOutConsumeTime);
        
        this.MARIO.velocityJump = 0;
        
        let score = this.MARIO.y + this.MARIO.sh >= this.brickSolid.at(-1).y ? 100 : 400;
        
        this.scoresGet.push({score,y:180,x:3190,yReference:80,velocity:1.5});
        
        this.MARIO.slideDown();
        
        this.descendFlag();
      
        return;
      }
      
      const {bricks,sw,sh} = this.BRICK,
      {blocks,sw:w,sh:h} = this.QUESTIONBRICK;
      
      this.MARIO.detectCrashWithBlocksInX("SCREEN",bricks,this.MARIO,sw,sh);
      
      this.MARIO.detectCrashWithBlocksInX("SCREEN",blocks,this.MARIO,w,h);
      
      this.MARIO.detectCrashWithBlocksInX("SCREEN",this.pipe,this.MARIO);
      
      this.MARIO.detectCrashWithBlocksInX("SCREEN",this.brickSolid,this.MARIO);
      
      this.MARIO.detectFall();
      
      if (this.releasedPowers.size > 0) this.releasedPowers.keys().forEach((powerName)=>{
        //AQUI LO QUE HACEMOS ES DETECTAR CUANDO EL FLOWER SALE DE PANTALLA
        if (!this.MARIO.immunity) this.detectCrashPowerUpWithMARIO(powerName)
        
        if (powerName === "Flower") this.detectPowerUpOutScreen(powerName);
      });
      
      if (!this.MARIO.jumping) this.MARIO.detectDropInDitch();
    },7);
  }
  
  consumeTime () {
    this.idTimeOutConsumeTime = setTimeout(()=>{
      this.time--;
      this.consumeTime();
    },this.velocityConsumeTime);
    
    let timeFinish = this.time === 0;
    
    if (timeFinish && this.levelComplete) this.MARIO.life = 0;
    else if (timeFinish) {
      this.MARIO.life--;
      this.showRestartScreen = true;
    }
    
    if (this.levelComplete) this.score += 50;
    
    if (timeFinish) {
      this.stopAnimation();
      setTimeout(()=>{
        this.restartGame();
        if (this.showRestartScreen) {
          this.showRestartScreen = false
          window.requestAnimationFrame(()=>{this.drawGame()})
        }
      },2000)
    }
  }
  
  drawHeaderGame () {
    const {sxLayers,index,sw,sh,sy,x,y} = this.coinBigForHeader;
    
    let sx = sxLayers[index];
    
    ctx.font = `10px Mario-Font`;
    
    ctx.fillStyle = "#fff";
    ctx.textAlign = "start";
    
    ctx.fillText("mario",20,20);
    ctx.fillText(String(this.score).padStart(6,"0"),20,30);
    
    ctx.drawImage($SPRITES,sx,sy,sw,sh,x,y,sw,sh);
    ctx.fillText(`×${String(this.coins).padStart(2,"0")}`,142,30);
    
    ctx.fillText("world",230,20);
    ctx.fillText("1-1",240,30);
    
    ctx.fillText("time",335,20);
    if (!this.showRestartScreen && !this.showStartMenu) ctx.fillText(String(this.time).padStart(3,"0"),340,30);
  }
  
  descendFlag () {
    let idTime = setTimeout(()=>{
      this.descendFlag();
    },10)
    
    let {yLimit} = this.flag;
    
    this.flag.y++;
    
    if (this.flag.y >= yLimit) {
      clearTimeout(idTime);
      
      this.flag.y = yLimit;
      
      this.MARIO.drawMarioInOnOtherSideOfFlag = true;
      
      setTimeout(()=>{
        let {MARIO} = this;
        MARIO.drawMarioInOnOtherSideOfFlag = false;
        MARIO.touchingFlag = false;
        MARIO.x = 202;
        MARIO.y = 192 - MARIO.sh;
        MARIO.runLayers();
        MARIO.walkToEnterTheCastle();
      },1000);
      
    }
  }
  
  drawFlag () {
    const {y,x,sx,sy,sw,sh} = this.flag;
    ctx.drawImage($SPRITES,sx,sy,sw,sh,this.scrollX + x,y,sw,sh);
  }
  
  drawRestartScreen () {
    let yCenterCanvas = $CANVAS.height / 2;
    
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,$CANVAS.width,$CANVAS.height);
    
    ctx.fillStyle = "#fff";
    ctx.font = "10px Mario-Font";
    
    ctx.textAlign = "start";
    
    if (this.MARIO.life === 0)
    ctx.fillText("game over",155,yCenterCanvas + 10);
    else {
      ctx.fillText("world 1-1",160,yCenterCanvas - 30);
      ctx.drawImage($SPRITES,22,507,15,16,180,yCenterCanvas - 8,15,16);
      ctx.fillText(`× ${this.MARIO.life}`,200,yCenterCanvas + 5);
    }
    
  }
  
  detectMarioTouchCoinInsidePipe (coin) {
    const {x,y,sw,sh} = coin,
    {MARIO} = this;
    
    let inRangeX = MARIO.x + MARIO.sw > x && MARIO.x < x + sw,
    inRangeY = MARIO.y + MARIO.sh > y && MARIO.y < y + sh;
    
    if (inRangeX && inRangeY) {
      this.coins++;
      
      let index = this.coinsInsideThePipe.indexOf(coin);
      
      this.coinsInsideThePipe.splice(index,1);
      
      return "delete";
    }
  }
  
  drawCoinInsidePipe () {
    for (let coin of this.coinsInsideThePipe) {
      
      const {sxLayers,sy,sw,sh,x,y} = coin;
      
      //REUTILIZAMOS EL INDICE PARA NO ANIMAR TODAS LAS MONEDAS YA COSUMIRIAN MAS RENDIMIENTO
      let sx = sxLayers[this.coinBigForHeader.index];
      
      let marioTouchCoin = this.detectMarioTouchCoinInsidePipe(coin)
      
      if (!marioTouchCoin) ctx.drawImage($SPRITES,sx,sy,sw,sh,x,y,sw,sh);
    }
  }
  
  drawGame () {
    this.cleanCanvas();
    
    //ESTO SOLO SE CUMPLIRA CUANDO BAJEMOS POR UNA TUBERIA O SUBAMOS
    
    if (this.showBlackScreen) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,$CANVAS.width,$CANVAS.height);
      window.requestAnimationFrame(()=>{this.drawGame()})
      return;
    }
    
    if (this.showRestartScreen) {
      this.drawRestartScreen();
      this.drawHeaderGame();
      return;
    }
    
    this.drawBackground();
    this.drawHeaderGame();
    
    if (this.showStartMenu) {
      this.MARIO.draw();
      
      ctx.drawImage($SPRITES,373,533,273,136,63.5,35,273,136);
      
      ctx.fillText(`top- ${String(this.score).padStart(6,"0")}`,150,190);
      
      window.requestAnimationFrame(()=>{this.drawGame()});
      
      return;
    }
    
    if (this.MARIO.insideThePipe) {
      this.drawCoinInsidePipe();
      
      this.MARIO.draw();
      //ESTE ES UN FRAGMENTO DE LA TUBERIA DE SALIDA PARA QUE CUBRA A MARIO CUANDO SE ACERQUE A EL
      ctx.drawImage($IMGBACKGROUNDGAME,975,416,36,32,278.5,176,36,32);
      
      window.requestAnimationFrame(()=>{this.drawGame()})
      return;
    }
    
    //SOLO CUANDO LA ESTRELLA ESTE SALIENDO DE SU CONTENEDOR SE DIBUJA ANTES DE EL BLOQUE PARA QUE SE DIBUJE DETRAS
    
    this.releasedPowers.entries().forEach(([key,power])=>{
      if ((key === "InvincibilityStar" && !power.outOfYourBox) || key !== "InvincibilityStar") power.draw(this.scrollX,$SPRITES,ctx);
    });
    
    this.QUESTIONBRICK.draw(this.scrollX,$SPRITES,ctx)
    this.BRICK.draw(this.scrollX,$SPRITES,ctx);
    
    //AQUI DIBUJAMOS CUANDO LA ESTRELLA SALGA DE SU CONTENEDOR , PARA QUE SE SUPERPONGA ENCIMA DE LOS BLOQUES
    const powerInvincibility = this.releasedPowers.get("InvincibilityStar");
    
    if (powerInvincibility?.outOfYourBox) powerInvincibility.draw(this.scrollX,$SPRITES,ctx);
    
    this.drawBrokenBricks();
    this.drawCoinsReleased();
    this.drawScoreGet();
    
    this.goombas.forEach((goombas,index)=>{
      goombas.draw(this.scrollX,$SPRITES,ctx);
    })
    
    this.koopos.forEach(koopos=>{
      koopos.draw(this.scrollX,$SPRITES,ctx);
    })
    
    this.fireballs.forEach(FIREBALL=>{
      FIREBALL.draw($SPRITES,ctx);
    })
    
    this.drawFlag();
    
    this.MARIO.draw();
    
    if (this.MARIO.enteringDrainage) {
      ctx.drawImage($IMGBACKGROUNDGAME,912,144,32,22,912 + this.scrollX,144,32,22);
    }
    else if (this.MARIO.leaveDrainage) {
      ctx.drawImage($IMGBACKGROUNDGAME,2609,177,30,32,2609 + this.scrollX,177,30,32);
    }
    
    window.requestAnimationFrame(()=>{this.drawGame()})
  }
  
  drawScoreGet () {
    const {scoresGet} = this;
    
    scoresGet.forEach((score,index)=>{
      ctx.font = "7px Mario-Font";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.fillText(score.score,this.scrollX + score.x,score.y);
      
      if (score.fromCoin && !score.registered) this.coins++;
      
      if (!score.registered && !score.itsLife) {
        score.registered = true;
        this.score += score.score;
      }
      
      if (score.y < score.yReference - 20) this.scoresGet.splice(index,1);
      
      score.y -= score.velocity ?? 0.5;
    })
  }
  
  drawCoinsReleased () {
    for (let i = 0;i < this.coinsReleased.length;i++) {
      const coin = this.coinsReleased[i]
      const {yBlock,hidden,x} = coin;
      
      if (hidden) {
        this.scoresGet.push({score:200,y:yBlock - 5,yReference:yBlock,x:x + 4.5,fromCoin:true});
        this.coinsReleased.splice(i,1);
        continue;
      }
      
      coin.draw(this.scrollX,$SPRITES,ctx);
    }
  }
  
  drawBrokenBricks () {
    const rotateCanvasAndDraw = (x,y,scaleX,scaleY,sx,sy,width,height) => {
      ctx.save();
      ctx.translate(this.scrollX + x,y);
      ctx.scale(scaleX,scaleY);
      ctx.drawImage($SPRITES,sx,sy,width,height,0,0,width,height);
      ctx.restore();
    }
    
    for (let index in this.brokenBricks) {
      const partsBricksBroken = this.brokenBricks[index];
      
      let allPartsBricksOutCanvas = true
      
      for (let measures of partsBricksBroken) {
        const {x,y,width,height,sx,sy,corner,velocity,gravity} = measures;
        
        if (corner === "RT") rotateCanvasAndDraw(x + width,y,-1,1,sx,sy,width,height);
        else if (corner === "LB") rotateCanvasAndDraw(x,y + height,1,-1,sx,sy,width,height);
        else if (corner === "RB") rotateCanvasAndDraw(x + width,y + height,-1,-1,sx,sy,width,height);
        else ctx.drawImage($SPRITES,sx,sy,width,height,this.scrollX + x,y,width,height);
      
        if (corner === "LT" || corner === "LB") measures.x -= 0.7;
        else measures.x += 0.7;
      
        measures.y += velocity;
        
        if (measures.y < $CANVAS.height) allPartsBricksOutCanvas = false; 
      
        measures.velocity += gravity;
      }
      
      if (allPartsBricksOutCanvas) this.brokenBricks.splice(Number(index),1)
    }
  }
  
  moveStar () {
    let invincibilityStar = this.releasedPowers.get("InvincibilityStar");
    
    invincibilityStar.idTimeOutPowerUpMoving = setTimeout(()=>{
      this.moveStar();
    },50)
    
    let {x,y,sh:height,yOfBlockContainer,gravityJump,impulseJump,velocityJump,outOfYourBox,direction,yForGround} = invincibilityStar;
    
    if (y + height > yOfBlockContainer && !outOfYourBox) {
      if (y + height - 1 <= yOfBlockContainer) {
        invincibilityStar.outOfYourBox = true;
        invincibilityStar.y = yOfBlockContainer - height;
        invincibilityStar.velocityJump = impulseJump;
      } else invincibilityStar.y--;
      
      return;
    }
    
    invincibilityStar.y += velocityJump;
    invincibilityStar.x += direction === "right" ? 3 : -3;
    
    if (invincibilityStar.y >= yForGround) {
      invincibilityStar.y = yForGround;
      invincibilityStar.velocityJump = impulseJump;
      return;
    }
    
    let crashInX = this.MARIO.detectCrashWithBlocksInX("POWERUP",this.brickSolid,invincibilityStar),
    crashInY = this.MARIO.detectCrashWithBrickInY(this.brickSolid,invincibilityStar);
    
    if (crashInX || crashInY) {
      invincibilityStar.direction = direction === "right" ? "left" : "right";
      invincibilityStar.velocityJump = impulseJump;
      return;
    }
    
    invincibilityStar.velocityJump += gravityJump;
    
    if (!this.MARIO.moving && !this.MARIO.immunity) this.detectCrashPowerUpWithMARIO("InvincibilityStar");
    
    this.detectPowerUpOutScreen("InvincibilityStar")
  }
  
  moveMushrooms (nameMushrooms) {
    const valuePower = this.releasedPowers.get(nameMushrooms)
    
    valuePower.idTimeOutPowerUpMoving = setTimeout(()=>{
      this.moveMushrooms(nameMushrooms);
    },50)
    
    let {x,y,sh:height,yOfBlockContainer,aboveOf,falling,outOfYourBox,direction} = valuePower;
    
    if (y + height > yOfBlockContainer && !outOfYourBox) {
      if (y + height - 1 <= yOfBlockContainer) {
        valuePower.outOfYourBox = true;
        valuePower.y = yOfBlockContainer - height;
      } else valuePower.y--;
      
      return;
    }
    
    const {sw,sh,bricks} = this.BRICK,
    {blocks,sw:w,sh:h} = this.QUESTIONBRICK;
    
    let crashWithBlock = this.MARIO.detectCrashWithBlocksInX("POWERUP",blocks,valuePower,w,h),
    crashWithBrick = this.MARIO.detectCrashWithBlocksInX("POWERUP",bricks,valuePower,sw,sh),
    crashWithPipe = this.MARIO.detectCrashWithBlocksInX("POWERUP",this.pipe,valuePower);
    
    let crashPowerUpInRIGHT = crashWithBlock?.sideCrash === "RIGHT" || crashWithBrick?.sideCrash === "RIGHT" || crashWithPipe?.sideCrash === "RIGHT";
    
    let crashPowerUpInLEFT = crashWithBlock?.sideCrash === "LEFT" || crashWithBrick?.sideCrash === "LEFT" || crashWithPipe?.sideCrash === "LEFT";
    
    if (crashPowerUpInLEFT) {
      valuePower.direction = "LEFT";
      direction = "LEFT";
    }
    else if (crashPowerUpInRIGHT) {
      valuePower.direction = "RIGHT";
      direction = "RIGHT";
    }
    
    if (direction === "RIGHT") valuePower.x++;
    else if (direction === "LEFT") valuePower.x--;
    
    if (!falling && ((aboveOf === "BrickQuestion" && !this.MARIO.detectCrashWithBrickInY(blocks,valuePower,w,h)) || (aboveOf === "BrickCommon" && !this.MARIO.detectCrashWithBrickInY(bricks,valuePower,sw,sh)) || (aboveOf === "Pipe" && !this.MARIO.detectCrashWithBrickInY(this.pipe,valuePower)))) {
      valuePower.falling = true;
      this.powerUpMushRoomFalling(nameMushrooms);
    }
    
    if (!this.MARIO.moving && !this.MARIO.immunity && !this.MARIO.insideThePipe) this.detectCrashPowerUpWithMARIO(nameMushrooms);
    
    this.detectPowerUpOutScreen(nameMushrooms);
    
    if (this.releasedPowers.has(nameMushrooms) && !valuePower.falling) this.detectObjectDropInDitch(valuePower,{type:"power",name:nameMushrooms});
  }
  
  effectDropObjectInDitch (OBJECT,typeAndName) {
    OBJECT.idTimeOutFallingInDitch = setTimeout(()=>{
      this.effectDropObjectInDitch(OBJECT,typeAndName);
    },25);
    
    OBJECT.y += OBJECT.fallSpeed;
    
    let outOfCanvas = OBJECT.y > $CANVAS.height;
    
    if (outOfCanvas) clearTimeout(OBJECT.idTimeOutFallingInDitch);
    
    if (outOfCanvas && typeAndName.type === "power") {
      this.releasedPowers.delete(typeAndName.name);
      
      return;
    }
    else if (outOfCanvas && typeAndName.type === "enemy") {
      clearTimeout(OBJECT.idTimeOutLayers);
      
      let enemyes = this[typeAndName.name];
      
      let indexEnemyToDelete = enemyes.indexOf(OBJECT);
      
      enemyes.splice(indexEnemyToDelete,1);
      
      return;
    }
    
    OBJECT.fallSpeed += OBJECT.gravity;
  }
  
  detectObjectDropInDitch (OBJECT,typeAndName) {
    const {ditches,scrollX} = this;
    
    for (let i=0;i < ditches.length;i++) {
      const {x,width} = ditches[i];
      
      let inFall = OBJECT.x >= x && OBJECT.x + OBJECT.sw <= x + width;
      
      if (inFall && (OBJECT.aboveOf === "floor" || (OBJECT.y >= OBJECT.yForGround && OBJECT.falling && typeAndName.type !== "enemy"))) {
        if (typeAndName.type === "power") clearTimeout(OBJECT.idTimeOutPowerUpMoving);
        
        OBJECT.fallingInDitch = true;
        
        this.effectDropObjectInDitch(OBJECT,typeAndName);
        
        break;
      }
    }
  }
  
  detectPowerUpOutScreen (powerType) {
    if (!this.releasedPowers.has(powerType)) return;
    
    const POWER = this.releasedPowers.get(powerType);
    
    const {x,sw} = powerType === "Flower" ? {sw:POWER.animation.layers[1].sw,x:POWER.x} : POWER;
    
    let xPowerUpRelativeToScreen = x + this.scrollX;
    
    if (xPowerUpRelativeToScreen + sw <= 0) {
      clearTimeout(POWER.idTimeOutPowerUpMoving);
      clearTimeout(POWER.idTimeOutpowerUpFalling);
      clearInterval(POWER.idIntervalRunLayers);
      //ESTO SOLO APLICA PARA EL PODER DE LA FLOR CUANDO ESTA SUBIENDO PARA MOSTRARSE
      clearTimeout(POWER.idTimeOutRise)
      
      this.releasedPowers.delete(powerType);
    }
  }
  
  detectCrashPowerUpWithMARIO (powerType) {
    
    const POWER = this.releasedPowers.get(powerType);
    
    const {sw:width,sh:height,x,y} = this.MARIO,
    {sw:widthPowerUp,sh:heightPowerUp,x:xPowerUp,y:yPowerUp} = powerType !== "Flower" ? POWER : {...POWER.animation.layers[1],x:POWER.x,y:POWER.y};
    
    let xPowerUpRelativeToMario = xPowerUp + this.scrollX;
    
    let powerUpTouchMarioInX = xPowerUpRelativeToMario + widthPowerUp > x && xPowerUpRelativeToMario < x + width
    ,powerUpTouchMarioInY = yPowerUp + heightPowerUp > y && yPowerUp < y + height;
    
    if (powerUpTouchMarioInY && powerUpTouchMarioInX) {
      clearTimeout(POWER.idTimeOutPowerUpMoving);
      clearTimeout(POWER.idTimeOutpowerUpFalling);
      clearInterval(POWER.idIntervalRunLayers);
      
      //EN CASO DE QUE EL PODER SEA LA FLOR 
      clearTimeout(POWER.idTimeOutRise);
      
      this.releasedPowers.delete(powerType);
      
      if (powerType === "Life") {
        this.scoresGet.push({
          score:"1up",
          y:yPowerUp - 5,
          yReference:yPowerUp,
          x:xPowerUp + 8,
          itsLife:true
        })
        
        this.MARIO.life++;
      }
      else if ((powerType === "Flower" && !this.MARIO.powersUpGet.has("BigMario")) || powerType === "BigMario") {
        powerType = "BigMario";
        
        this.MARIO.stop = true;
        this.MARIO.immunity = true;
        this.MARIO.transformingFromSmallToLarge = true;
        this.MARIO.continueDrawing = false;
        
        let typeMario = "BigMario";
        
        this.MARIO.idIntervalTransformingMarioToBig = setInterval(()=>{
          let draw = !this.MARIO.continueDrawing ? true : false;
          
          if (draw) {
            this.MARIO.setMeasures(typeMario);
            
            typeMario === "MiniMario" ? this.MARIO.powersUpGet.delete("BigMario") : this.MARIO.powersUpGet.set("BigMario",true);
            
            if (!this.MARIO.jumping) this.MARIO.effectJump()
            
            typeMario = typeMario !== "BigMario" ? "BigMario" : "MiniMario";
          }
          
          this.MARIO.continueDrawing = draw;
        },70);
        
        clearInterval(this.idIntervalScrollX);
        clearTimeout(this.MARIO.idTimeOutMove);
        
        this.MARIO.idTimeOutSetMeasuresBigMario = setTimeout(()=>{
          clearInterval(this.MARIO.idIntervalTransformingMarioToBig);
          
          this.MARIO.setMeasures("BigMario");
          
          this.MARIO.powersUpGet.set("BigMario",true);
          
          if (!this.MARIO.jumping) this.MARIO.effectJump();
          
          this.MARIO.stop = false;
          this.MARIO.transformingFromSmallToLarge = false;
          this.MARIO.continueDrawing = true;
          this.MARIO.immunity = false;
          
          if (this.MARIO.moving) this.MARIO.move(this.directionButtonTouching);
          
          this.MARIO.bendMeasuresToApply = "normal";
        },1000)
      }
      else if (powerType === "Flower") {
        clearInterval(this.MARIO.idIntervalRunLayers);
        clearInterval(this.idIntervalScrollX);
        clearTimeout(this.MARIO.idTimeOutMove);
        
        this.MARIO.stop = true;
        
        this.MARIO.immunity = true;
        
        this.MARIO.continueJump = false;
        
        this.MARIO.effectChangeMarioColor();
        
        this.MARIO.idTimeOutShowWithPowerFireBall = setTimeout(()=>{
          clearTimeout(this.MARIO.idTimeOutChangeColor)
          
          this.MARIO.stop = false;
          this.MARIO.immunity = false;
          
          const {MARIO} = this;
          
          const {sx,sy,layersRun,syLayerJump,sxLayerJump} = MARIO.measuresWithPowerFlower; 
          
          MARIO.sx = sx;
          MARIO.sy = sy;
          
          MARIO.layersRun.sx = layersRun
          
          MARIO.syLayerJump = syLayerJump;
          MARIO.sxLayerJump = sxLayerJump;
          
          MARIO.bendMeasuresToApply = "white";
          
          if (MARIO.moving) {
            this.MARIO.runLayers();
            this.MARIO.move(this.directionButtonTouching);
          }
        },2000)
      }
      else if (powerType === "InvincibilityStar") {
        this.MARIO.effectChangeMarioColor();
        
        this.idTimeOutLowVelocityChangeColorMario = setTimeout(()=>{
          clearTimeout(this.MARIO.idTimeOutChangeColor);
          
          this.MARIO.effectChangeMarioColor(150)
          
          this.idTimeOutApplyColorOriginalMario = setTimeout(()=>{
            clearTimeout(this.MARIO.idTimeOutChangeColor);
            
            if (this.MARIO.powersUpGet.has("Flower")) {
              const {sx,sy,layersRun,syLayerJump,sxLayerJump} = this.MARIO.measuresWithPowerFlower
              
              this.MARIO.sx = sx;
              this.MARIO.sy = sy;
              this.MARIO.syLayerJump = syLayerJump;
              this.MARIO.sxLayerJump = sxLayerJump;
              this.MARIO.layersRun.sx = layersRun;
              
              this.MARIO.bendMeasuresToApply = "white";
            } else {
              this.MARIO.setMeasures(this.MARIO.powersUpGet.has("BigMario") ? "BigMario" : "MiniMario");
              
              this.MARIO.bendMeasuresToApply = "normal";
            }
            
            this.MARIO.powersUpGet.delete("InvincibilityStar");
          },2000)
        },6000)
      }
      
      if (powerType !== "Life") {
        this.MARIO.powersUpGet.set(powerType,true);
        
        this.scoresGet.push({
          score:1000,
          y:yPowerUp - 5,
          yReference:yPowerUp,
          x:xPowerUp + (widthPowerUp / 2)
        })
      }
    }
  }
  
  powerUpMushRoomFalling (namePower) {
    const MUSHROOM = this.releasedPowers.get(namePower);
    
    MUSHROOM.idTimeOutpowerUpFalling = setTimeout(()=>{
      this.powerUpMushRoomFalling(namePower);
    },25)
    
    const {fallSpeed,yForGround,gravity} = MUSHROOM;
    
    MUSHROOM.y += fallSpeed;
    
    const {blocks,sw,sh} = this.QUESTIONBRICK,
    {bricks,sw:w,sh:h} = this.BRICK,
    {pipe} = this;
    
    let crashInYWithBrickCommon = this.MARIO.detectCrashWithBrickInY(bricks,MUSHROOM,w,h),
    crashInYWithBrickQuestion = this.MARIO.detectCrashWithBrickInY(blocks,MUSHROOM,sw,sh),
    crashInYWithPipe = this.MARIO.detectCrashWithBrickInY(pipe,MUSHROOM);
    
    let crashWithOneObstacleAbove = false;
    
    if (crashInYWithBrickCommon) {
      MUSHROOM.aboveOf = "BrickCommon";
      crashWithOneObstacleAbove = true;
    }
    else if (crashInYWithBrickQuestion) {
      MUSHROOM.aboveOf = "BrickQuestion"
      crashWithOneObstacleAbove = true;
    }
    else if (crashInYWithPipe) {
      MUSHROOM.aboveOf = "Pipe";
      crashWithOneObstacleAbove = true;
    }
    
    this.detectObjectDropInDitch(MUSHROOM,{type:"power",name:namePower});
    
    if (MUSHROOM.fallingInDitch) clearTimeout(MUSHROOM.idTimeOutpowerUpFalling);
    else if (crashWithOneObstacleAbove) {
      MUSHROOM.fallSpeed = 0;
      MUSHROOM.falling = false;
      clearTimeout(MUSHROOM.idTimeOutpowerUpFalling);
    }
    else if (MUSHROOM.y > yForGround) {
      MUSHROOM.aboveOf = "floor";
      MUSHROOM.fallSpeed = 0;
      MUSHROOM.y = yForGround;
      MUSHROOM.falling = false;
      clearTimeout(MUSHROOM.idTimeOutpowerUpFalling);
    }
    else MUSHROOM.fallSpeed += gravity;
  }
  
  stopAnimation () {
    clearTimeout(this.MARIO.idTimeOutMove);
    clearInterval(this.idIntervalScrollX);
    clearInterval(this.MARIO.idIntervalRunLayers);
    clearTimeout(this.MARIO.idTimeOutJump);
    clearTimeout(this.MARIO.idTimeOutFallingInDitch);
    
    //ESTO ES PARA LIMPIAR LOS TEMPORIZADORES QUE GUARDAN CUANDO MARIO BIG ES TOCADO POR UN ENEMYGO
    clearTimeout(this.MARIO.idTimeOutClearEffectFlicker);
    clearTimeout(this.MARIO.idIntervalEffectFlicker);
    clearTimeout(this.MARIO.idTimeOutContinueMiniMario);
    
    //ESTO ES PARA DETENER LA ANIMACION DE CAMBIO DE COLOR AL OBTENER EL PODER DE FIREBALL
    clearTimeout(this.MARIO.idTimeOutChangeColor);
    clearTimeout(this.MARIO.idTimeOutShowWithPowerFireBall);
    
    //DETENEMOS LOS TEMPORIZADORES ACTIVADOS AL OBTENER EL PODER DE INVINCIBILITY
    clearTimeout(this.idTimeOutLowVelocityChangeColorMario);
    clearTimeout(this.idTimeOutApplyColorOriginalMario)
    
    //DETENEMOS LA ANIMACION AL OBTENER EL PODER DE BIG MARIO
    clearTimeout(this.MARIO.idIntervalTransformingMarioToBig)
    clearTimeout(this.MARIO.idTimeOutSetMeasuresBigMario);
    
    this.MARIO.eliminated = true;
    this.MARIO.stop = true;
    
    clearTimeout(this.idTimeOutMoveGoombas);
    
    clearTimeout(this.idTimeOutMoveKoopos);
    
    //RESETEAMOS LAS ANIMACIONES DE LOS FIREBALLS ADEMAS DEJAMOS DE MOVERLAS
    clearTimeout(this.idTimeOutMoveFireBalls);
    
    this.fireballs.forEach(FB=>{
      clearTimeout(FB.idTimeOutAnimationBurst);
      clearTimeout(FB.idTimeOutAnimationFire);
    })
    
    //DETENEMOS LA ANIMACION DE LA MONEDA QUE SALTA AL GOLPEAR UN BLOQUE 
    this.coinsReleased.forEach(coin=>{
      clearTimeout(coin.idTimeOutSkip);
      clearTimeout(coin.idTimeOutLayers)
    })
    
    this.releasedPowers.values().forEach(value=>{
      clearTimeout(value.idTimeOutPowerUpMoving);
      clearTimeout(value.idTimeOutFallingInDitch);
      clearTimeout(value.idTimeOutpowerUpFalling);
      clearTimeout(value.idIntervalRunLayers);
    })
    
    this.koopos.concat(this.goombas).forEach(ENEMY=>{
      ENEMY.animated = false;
      
      clearTimeout(ENEMY.idTimeOutFalling);
      clearTimeout(ENEMY.idTimeOutFallingInDitch);
      clearTimeout(ENEMY.idTimeOutLayers);
      //LO DE ABAJO SOLO APLICA PARA EL KOOPOS QUE SI CUENTA CON ESAS PROPIEDADES
      clearTimeout(ENEMY.idTimeOutShowLegs);
      clearTimeout(ENEMY.idTimeOutWakeUp);
      clearTimeout(ENEMY.idTimeOutMoveFast);
    })
    
    clearTimeout(this.idTimeOutConsumeTime);
    
    clearTimeout(this.MARIO.idTimeOutAscOrDescInPipe);
    
    clearTimeout(this.idTimeOutShowBgBlack);
    
    this.showBlackScreen = false;
    
    clearTimeout(this.MARIO.idTimeOutEnterInPipe);
    
    clearTimeout(this.MARIO.idTimeOutAscendOfPipe);
    
    clearTimeout(this.MARIO.idTimeOutToOutPipe);
  }
  
  restartGame () {
    let distanceTravelMario = Math.abs(this.scrollX) + this.MARIO.x;
    
    //Reseteamos las variables de Mario
    this.directionButtonTouching = null
    this.MARIO.moving = false;
    this.MARIO.layersRun.index = 0;
    this.MARIO.velocityJump = 0;
    this.MARIO.jumping = false;
    this.MARIO.continueJump = false;
    this.MARIO.aboveOf = "floor";
    this.MARIO.fallingInDitch = false;
    this.MARIO.drawMarioInDirectionLeft = false;
    this.MARIO.powersUpGet = new Map ();
    this.MARIO.stop = false;
    this.MARIO.eliminated = false;
    this.MARIO.immunity = false;
    this.MARIO.continueDrawing = true;
    this.MARIO.transformingFromSmallToLarge = false;
    this.MARIO.showLayerMarioBigTouchEnemy = false;
    this.MARIO.bend = false;
    this.MARIO.enteringDrainage = false;
    this.MARIO.insideThePipe = false;
    this.MARIO.leaveDrainage = false;
    this.MARIO.opacityToEnterInDoorCastle = 1;
    this.MARIO.setMeasures("MiniMario");
    
    let levelOne = Levels.getObstaclesLevel(1);
    
    //CREAR LOS ENEMIGOS
    this.koopos = levelOne.koopos;
    this.goombas = levelOne.goombas.slice(distanceTravelMario >= 1425 ? 6 : 0);
    
    //VACIAR LOS POWER UPS LIBERADOS
    this.releasedPowers = new Map ();
    
    //VACIAR LOS BLOQUES ROTOS 
    this.brokenBricks = [];
    
    //VACIAR LAS BOLAS DE FUEGO LANZADAS
    this.fireballs = [];
    
    //VACIAR LOS TEXTOS DE LOS PUNTAJES OBTENIDOS
    this.scoresGet = [];
    
    //VACIAR LAS MONEDAS QUE SALTAN AL GOLPEAR UN BLOQUE
    this.coinsReleased = [];
    
    //RECONSTRUIR LOS BLOCKES QUE AUTOMATICAMENTE ESTA SINCRONIZADO CON MARIO LO CUAL HARA QUE CAMBIE EN EL LOS VALORES DE LOS BLOCKES
    //AL REINICIAR EL JUEGO ELIMINAMOS LA VIDA OCULTA
    
    if (this.MARIO.life > 0) levelOne.brickQuestion.splice(4,1);
    
    this.QUESTIONBRICK.blocks = levelOne.brickQuestion;
    this.BRICK.bricks = levelOne.brickCommon;
    
    //MOVEMOS EL SCROLL X DEPENDIENDO DE LA DISTANCIA QUE HAYAMOS RECORRIDO
    this.scrollX = distanceTravelMario >= 1425 ? -1310 : 0;
    
    //SE REINICIA EL TIME
    this.time = 300;
    
    //RESETEAMOS LA POCISION DE MARIO EN AMBOS EJES
    this.MARIO.x = 40;
    this.MARIO.y = this.MARIO.yForWalkInGround;
    
    this.velocityConsumeTime = 500;
    
    if (this.MARIO.life === 0) {
      clearInterval(this.QUESTIONBRICK.idIntervalRunLayers);
      
      this.scrollX = 0;
      
      this.goombas = levelOne.goombas;
      
      this.showStartMenu = true;
      
      this.MARIO.life = 3;
      
      this.flag = levelOne.flag;
      
      this.levelComplete = false;
      
      return;
    }
    
    //VOLVEMOS A CONSUMIR EL TIEMPO DADO
    this.consumeTime();
    
    //VOLVEMOS A MOVER A LOS ENEMIGOS
    this.moveKoopos();
    this.moveGoombas();
  }
  
  drawBackground () {
    let measuresBG;
    
    if (this.MARIO.insideThePipe) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,$CANVAS.width,$CANVAS.height);
      measuresBG = {
        sx:769,sy:240,sw:255,sh:240,x:72.5,y:0
      }
    }
    else measuresBG = {
      sx:0,sy:0,sw:3376,sh:241,x:this.scrollX,y:0
    }
    
    ctx.drawImage($IMGBACKGROUNDGAME,measuresBG.sx,measuresBG.sy,measuresBG.sw,measuresBG.sh,measuresBG.x,measuresBG.y,measuresBG.sw,measuresBG.sh);
  }
}
