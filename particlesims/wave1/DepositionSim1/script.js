const can = document.getElementById("can");
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

const black = [0,0,0,255];
const red = [255,0,0,255];
var img = new Uint8ClampedArray(nob.size);
for(let i = 0; i < nob.size; i++){
  img[i] = i/nob.size*255;
  img[i+1] = i/nob.size*255;
  img[i+2] = i;
}

function isFree(x,y){
  x = Math.floor(x);
  y = Math.floor(y);
  if(x < 0) return false;
  if(y < 0) return false;
  if(x >= nob.width) return false;
  if(y >= nob.height) return false;
  let i = (x+y*nob.width)*4;
  if(nob.buf[i+3] != 0) return false;
  return true;
}

var objs = [];
for(let i = 0; i < 1000; i++){
  objs.push([Math.random()*nob.width,Math.random()*nob.height,Math.random()-0.5,Math.random()-0.5,black]);
}

function convertImg(data,x,y){
  alert(data.w);
  alert(data.h);
  console.log(data,x,y);
  let ind = 0;
  for(let j = 0; j < data.h; j++){
    for(let i = 0; i < data.w; i++){
      let d = data.data;
      objs.push([150,75,0,0.5,black]);
      
      ind += 4;
      x++;
    }
    y++;
  }
}
/*var img = tl.load("chrome.png",null,function(data){
  alert(1);
  convertImg(data,150,75);
});*/

let ang = 0;
let ang2 = 0;

var keys = {};
document.addEventListener("keydown",e=>{
  let key = e.key.toLowerCase();
  keys[key] = true;
});
document.addEventListener("keyup",e=>{
  let key = e.key.toLowerCase();
  keys[key] = false;
});

function update(){
  window.requestAnimationFrame(update);
  nob.pixelCount = 0;
  nob.buf = new Uint8ClampedArray(nob.size);

  ang += 0.1;
  ang2 += 0.01; //0.05
  if(false) if(keys.d) for(let i = 0; i < 360; i += 180){
    let speed = 1;
    let tx = Math.cos(ang+i);
    let ty = Math.sin(ang+i);
    objs.push([nob.centerX+tx,nob.centerY+ty,tx,ty,black]);
  }
  if(!keys.f) for(let i = 0; i < 360; i += 90){
    let tx = Math.cos(ang+i);
    let ty = Math.sin(ang+i);
    objs.push([nob.centerX+tx,nob.centerY+ty,tx,ty,black]);
  }

  {
    let tx = Math.cos(ang2)*70;
    let ty = Math.sin(ang2)*70; //20
    let tx2 = Math.cos(-ang2)*20;
    let ty2 = Math.sin(-ang2)*20; //20
    nob.drawLine_smart(40+tx2,70+ty2,140+tx,120+ty,red,10);
    //nob.drawLine_smart(20,70,140+tx,120+ty,red,10);
  }

  for(let i = 0; i < objs.length; i++){
    let o = objs[i];

    let times = 0;
    function check(){
      times++;
      if(times > 50) return;
      if(!isFree(o[0],o[1])){
        if(!isFree(o[0],o[1]-1)){
          if(isFree(o[0]-1,o[1])){
            o[0]--;
            o[2] = 0;
            check();
          }
          else if(isFree(o[0]+1,o[1])){
            o[0]++;
            o[2] = 0;
            check();
          }
          else{
            o[1]--;
            o[3] = 0;
            check();
          }
        }
        else{
          o[1]--;
          o[3] = 0;
          check();
        }
      }
    }
    check();
    
    if(isFree(o[0],o[1]+o[3])){
      o[1] += o[3];
    }
    else{
      o[3] = 0;
    }

    if(isFree(o[0]+o[2],o[1])){
      o[0] += o[2];
    }
    else{
      o[2] = 0;
    }

    if(isFree(o[0]-1,o[1]+1)){
      o[0]--;
      o[1]++;
      o[3] = 0;
    }
    if(isFree(o[0]+1,o[1]+1)){
      o[0]++;
      o[1]++;
      o[3] = 0;
    }

    o[3] += 0.01;

    nob.setPixel(o[0],o[1],black);
  }
  /*for(let i = 0; i < objs.length; i++){
    let o = objs[i];
    nob.setPixel(o[0],o[1],black);
  }*/

  ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);

}
update();