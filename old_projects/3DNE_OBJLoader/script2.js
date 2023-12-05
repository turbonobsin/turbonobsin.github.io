var resoScale = 1.5; //3
const can = document.getElementById("can");
can.width *= resoScale;
can.height = can.width;
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

/**@type {HTMLInputElement} */
let i_file = document.querySelector(".i-file");
let d_btns = document.querySelector(".d-btns");
let cb_drawFaces = document.querySelector(".cb-drawFaces");
let cb_drawEdges = document.querySelector(".cb-drawEdges");
let cb_mono = document.querySelector(".cb-mono");
let cb_anti = document.querySelector(".cb-anti");

let options = {
    drawFaces:true,
    drawEdges:true,
    scale:50, //80
    autoScale:true,
    autoPos:true,
    fileSizeLimit:false,
    monochromatic:true
};
for(let i = 0; i < d_btns.children.length; i++){
  let b = d_btns.children[i];
  b.onclick = function(){
    let ar = [
      "torus",
      "suzanne",
      "icosphere",
      "cube",
      "cube_triangular",
      "tall_box"
    ];
    loadFile(ar[i]+".obj");
  };
}
i_file.oninput = function(){
  let f = i_file.files[0];
  if(!f) return;
  loadFileByFile(f);
};

cb_drawFaces.onclick = function(){
  options.drawFaces = this.checked;
};
cb_drawEdges.onclick = function(){
  options.drawEdges = this.checked;
};
cb_mono.onclick = function(){
  options.monochromatic = this.checked;
};
cb_anti.onclick = function(){
  can.style.imageRendering = (this.checked ? "unset" : "pixelated");
};

var camera = {
  x:0,
  y:0,
  z:0,
  rx:0,
  ry:0,
  rz:0
};

//3d landscape tests
var land = [];
for(let j = 0; j < 10; j++){
  for(let i = 0; i < 10; i++){
    land.push(Math.floor(Math.random()*10));
  }
}

var cols = [];
function registerCollider(x,y,z,w,h,l,ref,rx,ry,rz,ax=0,ay=0,az=0){
  cols.push([x,y,z,w,h,l,ref,function(a,b){
    //console.log("hit");
    //let p = a[4];
    //if(p.lastX != null) p.x = p.lastX;
    //if(p.lastY != null) p.y = p.lastY;
  },rx,ry,rz,ax,ay,az]);
  return cols[cols.length-1];
}
function handleCollision(){
  for(let i = 0; i < cols.length; i++){
    let a = cols[i];
    for(let j = i; j < cols.length; j++){
      let b = cols[j];
      if(i != j){
        let ar = [];
        ar.push([a[0],a[1]]);
        ar.push([a[0]+a[2],a[1]]);
        ar.push([a[0]+a[2],a[1]+a[3]]);
        ar.push([a[0],a[1]+a[3]]);
        for(let p = 0; p < ar.length; p++){
          let pp = ar[p];
          if(pp[0] >= b[0] && pp[0] <= b[0]+b[2] && pp[1] >= b[1] && pp[1] <= b[1]+b[3]){
            if(a[5]) a[5](a,b);
          }
        }
      }
    }
  }
}
function rotateAroundPoint(x,y,ox,oy,a){
  return [
    Math.round(Math.cos(a)*(x-ox)-Math.sin(a)*(y-oy)+ox),
    Math.round(Math.sin(a)*(x-ox)+Math.cos(a)*(y-oy)+oy)
  ];
}
function rotateAroundPoint_float(x,y,ox,oy,a){
  return [
    Math.cos(a)*(x-ox)-Math.sin(a)*(y-oy)+ox,
    Math.sin(a)*(x-ox)+Math.cos(a)*(y-oy)+oy
  ];
}
function rotateAroundPoint3D(x,y,z,ox,oy,oz,ax,ay,az){
  //global rotation around x
  let r = rotateAroundPoint_float(y,z,oy,oz,ax);
  y = r[0];
  z = r[1];

  //global rotation around y
  r = rotateAroundPoint_float(x,z,ox,oz,ay);
  x = r[0];
  z = r[1];

  //global rotation around z
  r = rotateAroundPoint_float(x,y,ox,oy,az);
  x = r[0];
  y = r[1];

  return [x,y,z];
}
function rotateAroundPoint3D_screen(x,y,z,ox,oy,oz,ax,ay,az,ofX=0,ofY=0,ofZ=0){
  if(ofX != 0 || ofY != 0 || ofZ != 0){
    //console.log(ofX,ofY,ofZ);
  }
  x -= ofX;
  y -= ofY;
  z -= ofZ;

  //global rotation around x
  let r = rotateAroundPoint_float(y,z,oy,oz,ax);
  y = r[0];
  z = r[1];

  //global rotation around y
  r = rotateAroundPoint_float(x,z,ox,oz,ay);
  x = r[0];
  z = r[1];

  //global rotation around z
  r = rotateAroundPoint_float(x,y,ox,oy,az);
  x = r[0];
  y = r[1];

  //y = (y-((y-oy)/8));

  return [x,y,z];
}
function moveObj(a,ax,ay,az=0,arx=0,ary=0,arz=0){
  let amtX = ax/Math.abs(ax);
  let amtY = ay/Math.abs(ay);
  let amtZ = az/Math.abs(az);
  for(let i = 0; i < Math.abs(ax); i++){
    moveObjBase(a,amtX,0,0,arx,ary,arz);
  }
  for(let j = 0; j < Math.abs(ay); j++){
    moveObjBase(a,0,amtY,0,arx,ary,arz);
  }
  for(let j = 0; j < Math.abs(az); j++){
    moveObjBase(a,0,0,amtZ,arx,ary,arz);
  }
  if(ax == 0 && ay == 0 && az == 0){
    moveObjBase(a,0,0,0,arx,ary,arz);
  }
}
function moveObjBase(a,ax,ay,az,arx=0,ary=0,arz=0){
  let r = a[6];
  let x = a[0]+ax; //r.x
  let y = a[1]+ay;
  let z = a[2]+az;
  let rx = a[8];
  let ry = a[9];
  let rz = a[10];
  let ahwl = Math.floor(a[3]/2);
  let ahhl = Math.floor(a[4]/4);
  let ahll = Math.floor(a[5]/2);
  let ahw = Math.ceil(a[3]/2);
  let ahh = Math.ceil(a[4]/4);
  let ahl = Math.ceil(a[5]/2);
  for(let j = 0; j < cols.length; j++){
    let b = cols[j];
    if(b != a){
      let ar = [];
      let bhwl = Math.floor(b[3]/2);
      let bhhl = Math.floor(b[4]/4);
      let bhll = Math.floor(b[5]/2);
      let bhw = Math.ceil(b[3]/2);
      let bhh = Math.ceil(b[4]/4);
      let bhl = Math.ceil(b[5]/2);
      let hasNoRot = (rx == null && b[8] == null && ry == null && b[9] == null && rz == null && b[10] == null);

      let smallerFix = (b[3] < a[3] || b[4] < a[4] || b[5] < a[5]);

      if(hasNoRot){
        ar.push([x-ahw,y-ahh,z-ahl]);
        ar.push([x+ahw,y-ahh,z-ahl]);
        ar.push([x+ahw,y+ahh,z-ahl]);
        ar.push([x-ahw,y+ahh,z-ahl]);
        ar.push([x-ahw,y-ahh,z+ahl]);
        ar.push([x+ahw,y-ahh,z+ahl]);
        ar.push([x+ahw,y+ahh,z+ahl]);
        ar.push([x-ahw,y+ahh,z+ahl]);
      }
      else{
        let angX = (rx||0)+(b[8]||0);
        let angY = (ry||0)+(b[9]||0);
        let angZ = (rz||0)+(b[10]||0);
        let ofX = a[3]*a[11];
        let ofY = a[4]*a[12];
        let ofZ = a[5]*a[13];
        ar.push(rotateAroundPoint3D_screen(x-ahw,y-ahh,z-ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x+ahw,y-ahh,z-ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x+ahw,y+ahh,z-ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x-ahw,y+ahh,z-ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x-ahw,y-ahh,z+ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x+ahw,y-ahh,z+ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x+ahw,y+ahh,z+ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
        ar.push(rotateAroundPoint3D_screen(x-ahw,y+ahh,z+ahl,b[0],b[1],b[2],angX,angY,angZ,ofX,ofY,ofZ));
      }
      if(true) for(let p = 0; p < ar.length; p++){
        let pp = ar[p];
        pp[0] += pp[0]*a[11];
        pp[1] += pp[1]*a[12];
        pp[2] += pp[2]*a[13];


        let abs = Math.abs(ax);
        let absy = Math.abs(ay);
        //let sameFixX = (a[4] == b[4] && a[1] == b[1]);
        //let sameFixY = (a[3] == b[3] && a[0] == b[0]);
        //let sameFixZ = ();
        //if(b[2] == 1) sameFixY = true;
        //if(b[3] == 1) sameFixX = true;
        let sameFixX = true;
        let sameFixY = true;
        let sameFixZ = true;
        let bofX = b[3]*b[11];
        let bofY = b[4]*b[12];
        let bofZ = b[5]*b[13];
        let partA = (sameFixY ? (pp[0] >= bofX+b[0]-bhwl && pp[0] <= bofX+b[0]+bhw) : (pp[0] > bofX+b[0]-bhwl && pp[0] < bofX+b[0]+bhw));
        let partB = (sameFixX ? (pp[1] >= bofY+b[1]-bhhl && pp[1] <= bofY+b[1]+bhh) : (pp[1] > bofY+b[1]-bhhl && pp[1] < bofY+b[1]+bhh));
        let partC = (sameFixZ ? (pp[2] >= bofZ+b[2]-bhll && pp[2] <= bofZ+b[2]+bhl) : (pp[2] > bofZ+b[2]-bhll && pp[2] < bofZ+b[2]+bhl));
        if(partA && partB && partC){
          nob.setPixel(pp[0],pp[1],[0,0,255,255]);
          r.vx = 0;
          r.vy = 0;
          r.vz = 0;
          //r.vz = 0;
          //if(Math.abs(pp[0]-b[0]) < b[3]*0.75 && Math.abs(pp[1]-b[1]) > b[4]*0.8) r.vz = 0;
          r.colliding = true;
          return;
          //if(pp[0] > b[0]-bhw+1 && pp[0] < b[0]+bhw-1 && pp[1] > b[1]-bhh+1 && pp[1] < b[1]+bhh-1){
            if(a[1] <= b[1]+bhh && a[1] >= b[1]-bhhl) if(a[0] >= b[0]){
              r.x++;
              a[0]++;
              //let dif = a[0]-r.x;
              //r.x = (b[0]+bhw)+ahw;
              //a[0] = (b[0]+bhw)+ahw+dif;
            }
            else{
              r.x--;
              a[0]--;
              //let dif = a[0]-r.x;
              //r.x = (b[0]-bhwl)-ahwl;
              //a[0] = (b[0]-bhwl)-ahwl+dif;
            }
            if(a[0] <= b[0]+bhw && a[0] >= b[0]-bhwl) if(a[1] >= b[1]){
              r.y++;
              a[1]++;
              //let dif = a[1]-r.y;
              //r.y = (b[1]+bhh)+ahh;
              //a[1] = (b[1]+bhh)+ahh+dif;
            }
            else{
              r.y--;
              a[1]--;
              //let dif = a[1]-r.y;
              //r.y = (b[1]-bhhl)-ahhl;
              //a[1] = (b[1]-bhhl)-ahhl+dif;
            }
            //r.x += (b[0]-bhw)-pp[0];
            //a[0] += (b[0]-bhw)-pp[0];
          //}
          return;
          //if(a[5]) a[5](a,b);
        }
      }
      if(smallerFix || true){ //if smaller b
        ar = [];
        if(hasNoRot && false){
          ar.push([b[0]-ax-bhwl,b[1]-ay-bhh,b[2]-az-bhl]);
          ar.push([b[0]-ax+bhwl,b[1]-ay-bhh,b[2]-az-bhl]);
          ar.push([b[0]-ax+bhwl,b[1]-ay+bhh,b[2]-az-bhl]);
          ar.push([b[0]-ax-bhwl,b[1]-ay+bhh,b[2]-az-bhl]);
          ar.push([b[0]-ax-bhwl,b[1]-ay-bhh,b[2]-az+bhl]);
          ar.push([b[0]-ax+bhwl,b[1]-ay-bhh,b[2]-az+bhl]);
          ar.push([b[0]-ax+bhwl,b[1]-ay+bhh,b[2]-az+bhl]);
          ar.push([b[0]-ax-bhwl,b[1]-ay+bhh,b[2]-az+bhl]);
        }
        else{
          //console.error("WRONG");
          //return;
          let angX = (a[8]||0)-(b[8]||0)-arx;
          let angY = (a[9]||0)-(b[9]||0)-ary;
          let angZ = (a[10]||0)-(b[10]||0)-arz;
          let ofX = b[3]*b[11];
          let ofY = b[4]*b[12];
          let ofZ = b[5]*b[13];
          ar.push(rotateAroundPoint3D_screen(b[0]-ax-bhwl,b[1]-ay-bhh,b[2]-az-bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax+bhwl,b[1]-ay-bhh,b[2]-az-bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax+bhwl,b[1]-ay+bhh,b[2]-az-bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax-bhwl,b[1]-ay+bhh,b[2]-az-bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax-bhwl,b[1]-ay-bhh,b[2]-az+bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax+bhwl,b[1]-ay-bhh,b[2]-az+bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax+bhwl,b[1]-ay+bhh,b[2]-az+bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
          ar.push(rotateAroundPoint3D_screen(b[0]-ax-bhwl,b[1]-ay+bhh,b[2]-az+bhl,b[0]-ax,b[1]-ay,b[2]-az,angX,angY,angZ,ofX,ofY,ofZ));
        }
        for(let p = 0; p < ar.length; p++){
          let pp = ar[p];
          //render corners - nob.setPixelSize(pp[0],pp[1],2,[0,255,0,255]);
          let abs = Math.abs(ax);
          let absy = Math.abs(ay);
          //let sameFixX = (a[3] == b[3] && a[1] == b[1]);
          //let sameFixY = (a[2] == b[2] && a[0] == b[0]);
          let sameFixX = true;
          let sameFixY = true;
          let sameFixZ = true;
          let aofX = a[3]*a[11];
          let aofY = a[4]*a[12];
          let aofZ = a[5]*a[13];
          let partA = (sameFixX ? (pp[0] >= aofX+a[0]-ahwl && pp[0] <= aofX+a[0]+ahw) : (pp[0] > aofX+a[0]-ahwl && pp[0] < aofX+a[0]+ahw));
          let partB = (sameFixY ? (pp[1] >= aofY+a[1]-ahhl && pp[1] <= aofY+a[1]+ahh) : (pp[1] > aofY+a[1]-ahhl && pp[1] < aofY+a[1]+ahh));
          let partC = (sameFixZ ? (pp[2] >= aofZ+a[2]-ahll && pp[2] <= aofZ+a[2]+ahl) : (pp[2] > aofZ+a[2]-ahll && pp[2] < aofZ+a[2]+ahl));
          if(partA && partB && partC){
            nob.setPixel(pp[0],pp[1],[255,0,0,255]);
            r.vx = 0;
            r.vy = 0;
            r.vz = 0;
            r.colliding = true;
            return;
            //if(pp[0] > b[0]-bhw+1 && pp[0] < b[0]+bhw-1 && pp[1] > b[1]-bhh+1 && pp[1] < b[1]+bhh-1){
              if(a[1] <= b[1]+bhh && a[1] >= b[1]-bhhl) if(a[0] >= b[0]){
                r.x++;
                a[0]++;
                //let dif = a[0]-r.x;
                //r.x = (b[0]+bhw)+ahw;
                //a[0] = (b[0]+bhw)+ahw+dif;
              }
              else{
                r.x--;
                a[0]--;
                //let dif = a[0]-r.x;
                //r.x = (b[0]-bhwl)-ahwl;
                //a[0] = (b[0]-bhwl)-ahwl+dif;
              }
              if(a[0] <= b[0]+bhw && a[0] >= b[0]-bhwl) if(a[1] >= b[1]){
                r.y++;
                a[1]++;
                //let dif = a[1]-r.y;
                //r.y = (b[1]+bhh)+ahh;
                //a[1] = (b[1]+bhh)+ahh+dif;
              }
              else{
                r.y--;
                a[1]--;
                //let dif = a[1]-r.y;
                //r.y = (b[1]-bhhl)-ahhl;
                //a[1] = (b[1]-bhhl)-ahhl+dif;
              }
              //r.x += (b[0]-bhw)-pp[0];
              //a[0] += (b[0]-bhw)-pp[0];
            //}
            return;
            //if(a[5]) a[5](a,b);
          }
        }
      }
    }
  }
  r.x += ax;
  r.y += ay;
  r.z += az;
  a[0] += ax;
  a[1] += ay;
  a[2] += az;
  a[8] += arx;
  a[9] += ary;
  a[10] += arz;
}

var weaponTT = {
  staff:{
    img:tl.load("weapons/longstaff.png","staff"),
    x:0,
    y:0
  },
  gold_knuckles:{
    img:tl.load("weapons/gold_knuckles.png","gold_knuckles"),
    img2:tl.load("weapons/gold_knuckles_large.png","gold_knuckles_large"),
    x:0,
    y:0
  }
};

var playerTT = {
  walk:[
    tl.loadAnim("char_walk_2.png","char_walk",32,32),
    12,0,null,null,[
      [14,21,1,1,0.78],
      [16,19,1,1,1.57],
      [12,21,1,1,0],
      [9,21,1,1,-0.2]
    ]
  ],
  cwalk:[
    tl.loadAnim("char_cwalk.png","char_cwalk",32,32),
    16,0,null,null,[
      [13,21,1,1,0.78],
      [16,20,1,1,1.57],
      [10,20,1,1,0.5],
      [8,20,1,1,0]
    ]
  ],
  idle:[
    tl.loadAnim("char_idle2.png","char_idle",32,32),
    18,0,null,null,[
      [12,22,1,1,0], //x,y,sx,sy,a
      [12,23,1,1,0]
    ]
  ],
  attack_idle:[
    tl.loadAnim("char_attack_idle.png","char_a_idle",32,32),
    10,1,function(p){
      p.attackState = false;
      playAnim(p,playerTT.idle);
    },function(i,p){
      if(i == 0) p.attackState = true;
    },[
      [10,21],
      [10,23],
      [11,23],
      [12,22]
    ]
  ],
  punch:[
    tl.loadAnim("char_a_punch3.png","punch",32,32),
    8,1,function(p){ //8
      //if(keys.enter) playAnim(p,playerTT.punch);
      {
        playAnim(p,playerTT.attack_idle);
        p.isAttacking = false;
      }
    },function(i,p){
      if(i == 0) p.attackState = false;
      if(i >= 3) p.attackState = true;
      if(i >= 5) if(keys.enter || p.attackBuf){
        p.isWalking = false;
        p.attackBuf = 0;
        p.isAttacking = true;
        p.attackState = false;
        playAnim(p,playerTT.punch);
      }
    },[
      [13,21,1,1,0.78], //messure to top left corner of hand
      [12,18,1,1,1],
      [17,17,1,1,Math.PI/2],
      [26,16,1,1,Math.PI/2],
      [17,19,1,1,Math.PI/2],
      [13,21,1,1,Math.PI/4]
    ]
  ]
};
function playAnim(p,a){
  p.a.f = a[0];
  p.a.ce = a[1];
  p.a.i = 0;
  p.a.c = 0;
  p.a.ondone = a[3];
  p.a.t = 0;
  p.a.te = a[2];
  p.a.onframe = a[4];
  p.a.fd = a[5];
  p.a.ref = a;
}
function playAnimFlow(p,a){
  if(p.a.ref == a) return;
  else playAnim(p,a);
}
function endAnim(p){
  let an = p.a;
  an.c = 0;
  an.i = 0;
  an.t = 0;
  an.f = [];
  if(an.ondone){
    an.ondone(p);
  }
}
class Player{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    playAnim(this,playerTT.idle);
    this.col = registerCollider(this.x,this.y-7,this.z,14,6,14,this,0,0,0); //-7 -3 14 6
  }
  colliding = false;
  col;
  x;
  y;
  z;
  vx = 0;
  vy = 0;
  vz = 0;
  speed = 2;
  flipX = false;
  isWalking = false;
  isAttacking = false;
  attackState = false;
  attackBuf = 0;
  a = {
    c:0, //count, in frames
    ce:17/2, //count end, delay between each animFrame
    i:0, //index, which frame is being displayed
    f:null, //frames, array holding animFrame image data
    ondone:null, //on finish running animation,
    t:0, //times the anim has played
    te:0, //times end, times the anim will play, 0 means forever
    onframe:null, //on frame play,
    fd:null, //frameDat
    s:1 //speed multiplier
  }
}
var players = [];
var gsx = 1;
var gsy = 1;
var ga = 0;
function renderPlayers(){
  for(let i = 0; i < players.length; i++){
    let p = players[i];

    let stz = p.z;
    let stx = p.x;
    moveObj(p.col,p.vx,p.vy,p.vz);
    //moveObj(p.col,0,0,p.vz);
    //moveObj(p.col,p.vx,0,0);
    //moveObj(p.col,0,p.vy,0);
    //if(stz == p.z) moveObj(p.col,p.vz,0,p.vz);
    //if(stz == p.z) moveObj(p.col,-p.vz,0,p.vz);
    //if(stx == p.x) moveObj(p.col,p.vz,0,p.vz);
    //if(stx == p.x) moveObj(p.col,-p.vz,0,p.vz);

    if(i == 0){
      //console.log(me.colliding);
      if(me.colliding) if(keys[" "]){
        moveObj(p.col,0,0,p.speed);
        me.vz += 2;
        if(keys.d) me.vx = me.speed;
        else if(keys.a) me.vx = -me.speed;
        if(keys.s) me.vy = me.speed;
        else if(keys.w) me.vy = -me.speed;
        me.colliding = false;
      }
      if(!me.colliding){
        let h = me.speed/2;
        if(keys.d && me.vx < me.speed/2) me.vx += me.speed/4;
        else if(keys.a && me.vx > -me.speed/2) me.vx += -me.speed/4;
        if(keys.s && me.vy < me.speed/2) me.vy += me.speed/4;
        else if(keys.w && me.vy > -me.speed/2) me.vy += -me.speed/4;
      }
      //p.lastX = p.x;
      //p.lastY = p.y;(a[6]||0)-(b[6]||0)
      if(p.colliding){
        if(keys.w){
          if(p.isAttacking && !p.attackState){

          }
          else{
            if(p.attackState){
              p.y -= (p.speed/4);
            }
            else{
              //p.vy = -p.speed;
              moveObj(p.col,0,-p.speed);
              //p.y -= p.speed;
              //p.col[1] -= p.speed;
            }
            p.isWalking = true;
          }
        }
        if(keys.s){
          if(p.isAttacking && !p.attackState){

          }
          else{
            if(p.attackState){
              p.y += (p.speed/4);
            }
            else{
              moveObj(p.col,0,p.speed);
              //p.vy = p.speed;
              //p.y += p.speed;
              //p.col[1] += p.speed;
            }
            p.isWalking = true;
          }
        }
        if(keys.d){
          if(p.isAttacking && !p.attackState) p.flipX = false;
          else{
            if(p.attackState){
              p.x += Math.floor(p.speed/2);
            }
            else{
              moveObj(p.col,p.speed,0);
              //p.vx = p.speed;
              //p.x += p.speed;
              p.flipX = false;
              //p.col[0] += p.speed;
            }
            p.isWalking = true;
          }
        }
        if(keys.a){
          if(p.isAttacking && !p.attackState) p.flipX = true;
          else{
            if(p.attackState){
              p.x -= Math.floor(p.speed/2);
            }
            else{
              moveObj(p.col,-p.speed,0);
              //p.vx = -p.speed;
              //p.x -= p.speed;
              p.flipX = true;
              //p.col[0] -= p.speed;
            }
            p.isWalking = true;
          }
        }
      }
      if(keys.shift){
        //moveObj(p.col,0,0,-p.speed);
      }
    }

    p.col[2] = p.z;
    p.col[0] = p.x;
    p.vz -= 0.1;
    if(p.z <= 0){
      p.vz = 0;
      p.z = 0;
      p.vx = 0;
      p.vy = 0;
      p.colliding = true;
    }

    let an = p.a;
    let img = an.f[an.i];

    nob.flipX = p.flipX;
    if(p.isWalking){
      p.a.c = 0;
      p.a.i = Math.floor((performance.now()%(400/p.a.s))/(100/p.a.s));
      if(p.attackState){
        p.a.f = playerTT.cwalk[0];
        p.a.fd = playerTT.cwalk[5];
        p.a.s = 0.5;
      }
      else{
        p.a.f = playerTT.walk[0];
        p.a.fd = playerTT.walk[5];
        p.a.s = 1;
      }
    }
    else p.a.s = 1;
    let depp = p.y-14+p.z+100; //250 //108
    if(false) if(p.isWalking){
      let a = 450*(p.attackState?2:1);
      let b = a/4;
      let ind = Math.floor(performance.now()%a/b);
      if(!p.attackState) nob.drawImage_upright(playerTT.walk[0][ind],p.x,p.y-16-p.z,depp);
      else nob.drawImage_upright(playerTT.cwalk[0][ind],p.x,p.y-16-p.z,depp);
      //nob.drawImage(img,p.x,p.y-16);
    }
    {
      //let a = 1000;
      //let b = a/6;
      //let b = a/2;
      //let ind = Math.floor(performance.now()%a/b);
      //playerTT.idle[ind]
      nob.drawImage_upright(img,p.x,p.y-16-p.z,depp); //nPunch
      //nob.drawImage(playerTT.idle,p.x,p.y-16);
    }
    

    //render weapons
    //test stuff weapon - it works great
    let frameDat = an.fd;
    if(true) if(frameDat) if(frameDat[an.i]){
      let d = frameDat[an.i];
      let w = weaponTT.gold_knuckles;
      let ox = w.x;
      let oy = w.y;

      let sx = d[2] || 1;
      let sy = d[3] || 1;
      let a = d[4] || 0;

      //ga = performance.now()/1000;
      if(!nob.flipX) nob.drawImage_warp(w.img,p.x-16+d[0]-ox,p.y-32+d[1]-oy,sx,sy,a,28-d[1],true);
      else nob.drawImage_warp(w.img,p.x+16-d[0]+ox,p.y-32+d[1]-oy,sx,sy,a,28-d[1],true);
    }
    //nob.drawImage_rot(weaponTT.gold_knuckles.img,p.x,p.y+30,0);
    //if(playerTT.idle[0][0]) nob.drawImage_warp(weaponTT.gold_knuckles.img2,p.x,p.y+30,gsx,gsy,ga);
    //nob.drawImage_rot2(weaponTT.gold_knuckles.img2,p.x,p.y+60,0);
    //nob.drawImage_rot2(weaponTT.gold_knuckles.img2,p.x-35,p.y+30,0);

    nob.flipX = false;

    //run animator
    /*if(p.attackState){
      if(!p.isWalking){
        an.c++;
      }
    }*/
    an.c += an.s;
    if(an.c > an.ce){
      an.c = 0;
      if(an.onframe) an.onframe(an.i,p);
      an.i++;
      if(an.i >= an.f.length){
        an.i = 0;
        if(an.te != 0){
          an.t++;
          if(an.t >= an.te){
            an.c = 0;
            an.i = 0;
            an.t = 0;
            an.f = [];
            if(an.ondone){
              an.ondone(p);
            }
          }
        }
      }
    }
  }
}
var objs = [];
function renderObjs(){
  for(let objI = 0; objI < objs.length; objI++){
    let obj = objs[objI];
    switch(obj.id){
      case 0: //tree //{id:objId,a:angle,l:length}
        //let x =
        break;
    }
  }
}

var playerId = 0;
players.push(new Player(nob.centerX,nob.centerY,0));
function getMe(){
  return players[playerId];
}
var me = getMe();

var keys = {};
//tree 1
let treeData = {
  x:100,
  y:100,
  w:10,
  h:10
};
let treeCol = registerCollider(100,100,7,24,24,24,treeData,0,0,0); //Math.PI/4 //28
registerCollider(124,100,7,24,24,24,treeData,0,0,0);
registerCollider(150,90,7,24,24,24,treeData,0,0,0); //-Math.PI/8 Math.PI/3
let testData = {
  x:50,
  y:90,
  w:8,
  h:8,
  l:50
};
let testCol = registerCollider(40,90,7,50,8,8,testData,0,0,0,0.5,0,0);
//registerCollider(120,120,7,24,24,24,treeData,0,0,0); //Math.PI/8
/*registerCollider(152,100,0,10,40,10,{
  x:152,
  y:100,
  z:0,
  w:10,
  h:40,
  l:10
},Math.PI/2.2);*/
//registerCollider(152,100,40,10,treeData);
//

var tree = {
  rx:0,
  ry:0,
  rz:0
};

var verts = [];
var faces = [];
var file = ``;
function loadFile(url="444.obj"){
  fetch(url)
  .then(response => response.text())
  .then(async (data) => {
    console.log("length:",data.length);
    file = data;
    await parseFile(file);
    let scale = options.scale; //40 //80 //5
    if(options.autoScale){
      scale = runAutoScale();
    }

    for(let i = 0; i < verts.length; i++){
      verts[i] *= scale;
    }
  });
}

function runAutoScale(){
  let largest = -1;
  let amt = 0;
  let totalX = 0;
  let totalY = 0;
  let totalZ = 0;
  let totalX2 = 0;
  let totalY2 = 0;
  let totalZ2 = 0;
  for(let i = 0; i < verts.length; i += 3){
    let x = Math.abs(verts[i]);
    let y = Math.abs(verts[i+1]);
    let z = Math.abs(verts[i+2]);
    amt++;
    totalX += x;
    totalY += y;
    totalZ += z;
    totalX2 += verts[i];
    totalY2 += verts[i+1];
    totalZ2 += verts[i+2];
    // if(v > largest) largest = v;
  }
  let avX = totalX/amt;
  let avY = totalY/amt;
  let avZ = totalZ/amt;
  let avX2 = totalX2/amt;
  let avY2 = totalY2/amt;
  let avZ2 = totalZ2/amt;
  avX2 = Math.round(avX2*100)/100;
  avY2 = Math.round(avY2*100)/100;
  avZ2 = Math.round(avZ2*100)/100;
  avX -= avX2/2;
  avY -= avY2/2;
  avZ -= avZ2/2;
  let avAll = (avX+avY+avZ)/3;
  console.log("largest: ",avX,avY,avZ,avAll);
  console.log("2nd: ",avX2,avY2,avZ2);
  if(Number.isNaN(avX) || Number.isNaN(avY) || Number.isNaN(avZ) || Number.isNaN(avAll)){
    alert("An error occured while loading the model");
    verts = [];
    faces = [];
    return;
  }
  
  if(options.autoPos){
    for(let i = 0; i < verts.length; i += 3){
      verts[i] -= avX2;
      verts[i+1] -= avY2;
      verts[i+2] -= avZ2;
    }
  }

  return 1/avAll*options.scale;
}

function loadFileByFile(/**@type {File}*/file){
  file.text().then(async data=>{
    console.log("length:",data.length);
    if(options.fileSizeLimit) if(data.length > 100000){
      alert("Your file is too large! Please select a simpler model");
      return;
    }
    
    if(options.drawEdges){
      cb_drawFaces.checked = false;
      options.drawFaces = false;
    }
    
    // return;
    file = data;
    console.log(":: start parse file");
    await parseFile(file);
    console.log(":: end parse file");
    // Auto scale
    let scale = options.scale;
    if(options.autoScale){
      scale = runAutoScale();
    }
    
    for(let i = 0; i < verts.length; i++){
      verts[i] *= scale;
    }
  });
}

loadFile("torus.obj");

function wait(delay){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve();
    },delay);
  });
}

async function parseFile(/**@type {string}*/f){
  verts = [];
  faces = [];
    
  let lines = f.split("\n");
  lines.splice(0,1);
  lines.pop();

  let largestFaceSize = -1;

  let vertInd = lines.findIndex(v=>v.startsWith("v "));
  let faceInd = lines.findIndex(v=>v.startsWith("f "));
  console.log("> TOTAL lines:",lines.length,vertInd,faceInd);
  console.log("> vert start");
  for(let i = vertInd; i < lines.length; i++){
    let line = lines[i];
    if(line.startsWith("v ")){
      line = line.replace("v ","").split(" ");
      verts.push(parseFloat(line[0]),parseFloat(line[1]),parseFloat(line[2]));
    }
    else break;

    if(i % 1000 == 0) await wait(1);
  }
  console.log("> face start");
  for(let i = faceInd; i < lines.length; i++){
    let line = lines[i].trim();
    if(line.startsWith("f ")){
      line = line.replace("f ","").split(" ");
      if(line.length > largestFaceSize){
        largestFaceSize = line.length;
        if(largestFaceSize > 4){
          verts = [];
          faces = [];
          alert("Only models with 3 point or 4 point faces are supported!");
          return;
        }
      }
      for(let i = 0; i < line.length; i++){
        let id = line[i].split("/")[0];
        faces.push(parseInt(id));
      }
      if(line.length == 3){
        faces.push(faces[faces.length-3]);
      }
    }
    else break;
    if(i % 100 == 0) await wait(1);
  }
  console.log("largest face size: ",largestFaceSize);
}
function parseFaceStr(str,vert){
  let sec2 = str.split("\n");
  let sec = [];
  for(let i = 1; i < sec2.length-1; i++){
    sec.push(...sec2[i].split(" "));
  }

  for(let i = 0; i < sec.length; i++){
    let id = sec[i].split("/")[0];
    faces.push(parseInt(id));
    faces.push(0);
    faces.push(0);
  }

  sec2 = vert.split("\n");
  sec = [];
  for(let i = 1; i < sec2.length-1; i++){
    verts.push(...sec2[i].split(" "));
  }
}
var doRenderFace = true;
function renderCube(x=200,y=200,z=0,sx=1,sy=1,sz=1,rx=0,ry=0,rz=0,ax=0,ay=0,az=0){
  let verts = [
    -1,1,1,
    1,1,1,
    1,1,-1,
    -1,1,-1,
    -1,-1,-1,
    -1,-1,1,
    1,-1,1,
    1,-1,-1
  ];
  let faces = [
    1,0,0, 2,0,0, 3,0,0, 4,0,0,
    7,0,0, 6,0,0, 5,0,0, 8,0,0,
    6,0,0, 7,0,0, 2,0,0, 1,0,0, 
    4,0,0, 3,0,0, 8,0,0, 5,0,0, 
    2,0,0, 7,0,0, 8,0,0, 3,0,0, 
    6,0,0, 1,0,0, 4,0,0, 5,0,0
  ];

  for(let i = 0; i < verts.length; i += 3){
    verts[i] /= 2;
    verts[i+1] /= 2;
    verts[i+2] /= 2;

    verts[i] *= sx;
    verts[i] += sx*ax;
    verts[i+1] *= sy;
    verts[i+1] += sy*ay;
    verts[i+2] *= sz;
    verts[i+2] += sz*az;
  }

  //rz = (mouseY%(360*2))*Math.PI/180/2;
  //rx = -(mouseY%(360*2))*Math.PI/180/2;
  //rx = -(mouseX%(360*2))*Math.PI/180/2;

  function connectVerts(i,i2){
    let v = i;
    let v2 = i2;
    let r = rotateAroundPoint3D(x+verts[v],y+verts[v+1],z+verts[v+2],x,y,z,rx,ry,rz);
    let r2 = rotateAroundPoint3D(x+verts[v2],y+verts[v2+1],z+verts[v2+2],x,y,z,rx,ry,rz);

    let py = (r[1]-((r[1]-y)/2))-r[2];
    let py2 = (r2[1]-((r2[1]-y)/2))-r2[2];

    if(Number.isNaN(r[0]) || Number.isNaN(r2[0]) || Number.isNaN(py) || Number.isNaN(py2)) return;

    nob.drawLine_smart_dep(r[0],py,r2[0],py2,[155,35,0,255],1,(r[1]+r2[1])/2);
  }
  function drawFace(i,i2,i3,i4,faceI){
    i--;
    i2--;
    i3--;
    i4--;
    i *= 3;
    i2 *= 3;
    i3 *= 3;
    i4 *= 3;
    let r = rotateAroundPoint3D(x+verts[i],y+verts[i+1],z+verts[i+2],x,y,z,rx,ry,rz);
    let r2 = rotateAroundPoint3D(x+verts[i2],y+verts[i2+1],z+verts[i2+2],x,y,z,rx,ry,rz);
    let r3 = rotateAroundPoint3D(x+verts[i3],y+verts[i3+1],z+verts[i3+2],x,y,z,rx,ry,rz);
    let r4 = rotateAroundPoint3D(x+verts[i4],y+verts[i4+1],z+verts[i4+2],x,y,z,rx,ry,rz);

    let py = (r[1]-((r[1]-y)/2))-r[2];
    let py2 = (r2[1]-((r2[1]-y)/2))-r2[2];
    let py3 = (r3[1]-((r3[1]-y)/2))-r3[2];
    let py4 = (r4[1]-((r4[1]-y)/2))-r4[2];

    avy = (r[1]+r2[1]+r3[1]+r4[1])/4 - sy/4;
    let dep = avy+Math.min(r[2],r2[2],r3[2],r4[2]) + 100;
    let cc = [dep*0.9,dep*0.4,dep*0.2,255];

    if(doRenderFace) nob.drawPolygon2_dep([
      [Math.floor(r[0]),Math.floor(py)],
      [Math.floor(r2[0]),Math.floor(py2)],
      [Math.floor(r3[0]),Math.floor(py3)],
      [Math.floor(r4[0]),Math.floor(py4)]
    ],0,0,cc,dep);

    if(true){
      nob.drawLine_smart_dep(Math.floor(r[0]),Math.floor(py),Math.floor(r2[0]),Math.floor(py2),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r2[0]),Math.floor(py2),Math.floor(r3[0]),Math.floor(py3),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r3[0]),Math.floor(py3),Math.floor(r4[0]),Math.floor(py4),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r4[0]),Math.floor(py4),Math.floor(r[0]),Math.floor(py),nob.outlineColor,1,dep);
    }
    if(false){
      nob.drawLine_smart_dep_outline(Math.floor(r[0]),Math.floor(py),Math.floor(r2[0]),Math.floor(py2),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r2[0]),Math.floor(py2),Math.floor(r3[0]),Math.floor(py3),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r3[0]),Math.floor(py3),Math.floor(r4[0]),Math.floor(py4),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r4[0]),Math.floor(py4),Math.floor(r[0]),Math.floor(py),cc,4,dep);
    }
  }

  for(let i = 0; i < faces.length; i += 12){ //12
    drawFace(faces[i],faces[i+3],faces[i+6],faces[i+9],Math.floor((i/12)%12));
    //drawFace(faces[i],faces[i+1],faces[i+2],faces[i+3],Math.floor((i/4)%4));
  }
}
var cancelCount = 0;
function renderObject(x=200,y=200,z=0){

  x -= camera.x;
  y -= camera.y;
  z -= camera.z;
  let rr = rotateAroundPoint3D(x,y,z,camera.x,camera.y,camera.z,camera.rx,camera.ry,camera.rz);
  x = rr[0];
  y = rr[1];
  z = rr[2];

  //let l = 30; //90

  let rx = tree.rx-camera.rx;
  let ry = tree.ry-camera.ry;
  let rz = tree.rz-camera.rz;
  //tree.rx = (performance.now()%(360*20))*Math.PI/180/20;
  //tree.ry = (performance.now()%(360*10))*Math.PI/180/10;
  tree.rz = (mouseY%(360*2))*Math.PI/180/2;
  tree.rx = -(mouseX%(360*2))*Math.PI/180/2;

  /*if(ry){
    tx = Math.sin(ry)*l;
    ty = -Math.cos(ry)*l;
  }
  if(rx){
    ty *= perspec*Math.cos(rx);
  }
  tx += x;
  ty += y;*/

  //works good
  /*let r = rotateAroundPoint3D(x,y,l,x,y,0,rx,ry,rz);
  let tx = r[0];
  let ty = r[1];
  let tz = r[2];
  let py = (ty-((ty-y)/2))-tz;
  

  nob.drawLine_smart(x,y,tx,py,[155,35,0,255],4);*/
  //end of works good

  /*let verts = [
    -10,10,10,
    10,10,10,
    10,10,-10,
    -10,10,-10,
    -10,-10,-10,
    -10,-10,10,
    10,-10,10,
    10,-10,-10
  ];*/
  //scale verts
  function connectVerts(i,i2){
    let v = i;
    let v2 = i2;
    let r = rotateAroundPoint3D(x+verts[v],y+verts[v+1],z+verts[v+2],x,y,z,rx,ry,rz);
    let r2 = rotateAroundPoint3D(x+verts[v2],y+verts[v2+1],z+verts[v2+2],x,y,z,rx,ry,rz);

    //perspective view - not acurate
    //let px = r[0]-((r[0]-x)/((nob.height-r[1])/nob.height));
    //let px2 = r2[0]-((r2[0]-x)/((nob.height-r2[1])/nob.height));
    //let py = r[1]-r[2];
    //let py2 = r2[1]-r2[2];

    let py = (r[1]-((r[1]-y)/2))-r[2];
    let py2 = (r2[1]-((r2[1]-y)/2))-r2[2];

    if(Number.isNaN(r[0]) || Number.isNaN(r2[0]) || Number.isNaN(py) || Number.isNaN(py2)){
      cancelCount++;
      return;
    }
    

    nob.drawLine_smart_dep(r[0],py,r2[0],py2,[155,35,0,255],1,(r[1]+r2[1])/2);
    //(r[1]+r2[1]+r3[1]+r4[1])/4+(r[2]+r2[2]+r3[2]+r4[2])/4
  }
  function drawFace(i,i2,i3,i4,faceI){
    //let v = verts[i];
    //let v2 = verts[i2];
    //let v3 = verts[i3];
    //let v4 = verts[i4];
    i--;
    i2--;
    i3--;
    i4--;
    i *= 3;
    i2 *= 3;
    i3 *= 3;
    i4 *= 3;
    let r = rotateAroundPoint3D(x+verts[i],y+verts[i+1],z+verts[i+2],x,y,z,rx,ry,rz);
    let r2 = rotateAroundPoint3D(x+verts[i2],y+verts[i2+1],z+verts[i2+2],x,y,z,rx,ry,rz);
    let r3 = rotateAroundPoint3D(x+verts[i3],y+verts[i3+1],z+verts[i3+2],x,y,z,rx,ry,rz);
    let r4 = rotateAroundPoint3D(x+verts[i4],y+verts[i4+1],z+verts[i4+2],x,y,z,rx,ry,rz);

    let py = (r[1]-((r[1]-y)/2))-r[2];
    let py2 = (r2[1]-((r2[1]-y)/2))-r2[2];
    let py3 = (r3[1]-((r3[1]-y)/2))-r3[2];
    let py4 = (r4[1]-((r4[1]-y)/2))-r4[2];

    let dep = (r[1]+r2[1]+r3[1]+r4[1])/4+(r[2]+r2[2]+r3[2]+r4[2])/4 + 100;
    let cc;
    if(!options.monochromatic) cc = [colors[faceI]+dep/2*0.9,colors[faceI+1]+dep/2*0.4,colors[faceI+2]+0.2*dep/2,255];
    else cc = [dep*0.9,dep*0.4,dep*0.2,255];

    // FINAL: draw face
    if(options.drawFaces) nob.drawPolygon2_dep([
      [Math.floor(r[0]),Math.floor(py)],
      [Math.floor(r2[0]),Math.floor(py2)],
      [Math.floor(r3[0]),Math.floor(py3)],
      [Math.floor(r4[0]),Math.floor(py4)]
    ],0,0,cc,dep);

    // FINAL: draw edges
    if(options.drawEdges){
      nob.drawLine_smart_dep(Math.floor(r[0]),Math.floor(py),Math.floor(r2[0]),Math.floor(py2),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r2[0]),Math.floor(py2),Math.floor(r3[0]),Math.floor(py3),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r3[0]),Math.floor(py3),Math.floor(r4[0]),Math.floor(py4),nob.outlineColor,1,dep);
      nob.drawLine_smart_dep(Math.floor(r4[0]),Math.floor(py4),Math.floor(r[0]),Math.floor(py),nob.outlineColor,1,dep);
    }
    if(false){
      nob.drawLine_smart_dep_outline(Math.floor(r[0]),Math.floor(py),Math.floor(r2[0]),Math.floor(py2),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r2[0]),Math.floor(py2),Math.floor(r3[0]),Math.floor(py3),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r3[0]),Math.floor(py3),Math.floor(r4[0]),Math.floor(py4),cc,4,dep);
      nob.drawLine_smart_dep_outline(Math.floor(r4[0]),Math.floor(py4),Math.floor(r[0]),Math.floor(py),cc,4,dep);
    }
    //[Math.floor(r[0]+r[1]),Math.floor(r2[1]+r2[2]),Math.floor(r3[2]),255]
  }
  //faces
  /*let faces = [
    0,1,2,3,
    4,5,6,7,
    0,5,6,1,
    3,4,7,2,
    0,3,4,5,
    1,6,7,2
  ];*/
  let colors = [
    255,0,0,
    255,100,0,
    255,255,0,
    0,255,0,
    0,255,100,
    0,100,255,
    
    0,0,255,
    100,0,255,
    255,0,100,
    255,0,255,
    0,255,255,
    0,0,0,
  ];
  if(true) for(let i = 0; i < faces.length; i += 4){
    // drawFace(faces[i],faces[i+3],faces[i+6],faces[i+9],Math.floor((i/12)%12));
    drawFace(faces[i],faces[i+1],faces[i+2],faces[i+3],Math.floor((i/4)%4));
  }
  //edges
  if(false){
    for(let i = 0; i < verts.length-3; i += 3){
      connectVerts(i,i+3);
    }
    //extra verts for looks
    let extraVerts = [
      0,5,
      1,6,
      2,7,
      0,3,
      4,7
    ];
    if(false) for(let i = 0; i < extraVerts.length; i += 2){
      connectVerts(extraVerts[i]*3,extraVerts[i+1]*3);
    }
  }
}

var mouseX = 0;
var mouseY = 0;
function update(){
  window.requestAnimationFrame(update);

  nob.pixelCount = 0;
  nob.buf = new Uint8ClampedArray(nob.size);
  nob.dep = new Uint16Array(nob.ssize);

  cancelCount = 0;

  //tests
  //testCol[9] = Math.sin(performance.now()/200)/2;
  //testCol[10] = Math.sin(performance.now()/1600)*8;
  //testCol[9] += 0.05;
  //testCol[10] += 0.01;
  //moveObj(testCol,0,0,0,0,0.05,0.01);

  let perspec = 1; //For 1 x, 0.5 y
  //test: render tree with 3d rotation
  renderObject(nob.centerX,nob.centerY,20);
  //let cubeW = 10+(mouseX/16);
  //renderCube(100,100,0,cubeW,5,10,0,0,0,0,0,0);
  if(false){
    for(let i = 0; i < 30; i++){
      for(let j = 0; j < 20; j++){
        renderObject(i*20+40,j*20+40);
      }
    }


    //nob.drawLine_smart_dep_outline(x,y,tx,ty,[155,35,0,255],10,0,6);
  }

  //testcol tests
  //registerCollider(40,90,7,50,8,8,testData,0,0,0,0.5,0,0);
  //testCol[0] = 40+testCol[3]*0.5;

  //render land lines
  if(false) for(let j = 0; j < 10; j++){
    for(let i = 0; i < 10; i++){
      let z = land[i+j*10];
      let dep = j*20+z*nob.height;
      let dep2 = j*20+20+z*nob.height;
      let xx = i*20;
      let yy = j*20-z;
      let rZ = land[i+1+j*10] || 0;
      let dZ = land[i+(j+1)*10] || 0;
      let drZ = land[i+1+(j+1)*10] || 0;
      //nob.setPixel_dep(i*20,j*20-z,nob.outlineColor,dep);
      nob.drawLine_smart(xx,yy,i*20+20,j*20-rZ,nob.outlineColor,1);
      nob.drawLine_smart(xx,yy,i*20,j*20+20-dZ,nob.outlineColor,1);
    }
  }

//   renderPlayers();
  ////nob.drawRect_dep(100,51,20,100,[0,255,0,255],5);
//   nob.drawLine_smart_dep_outline(100+Math.cos(performance.now()/1000)*10,10,100,100,[155,35,0,255],10,0,6);
  //really good brown [155,35,0,255]
  //nob.drawLine_smart_dep(95,100,105,100,nob.outlineColor,1,1);

  //nob.drawRect_dep(100,100,40,20,[0,255,0,255],0);
  //nob.drawRect_dep(me.x,me.y,14,6,[0,100,0,255],0);
  //draw colliders
  
  //treeCol[10] = performance.now()/1000;
  //moveObj(treeCol,0,0,0,0,0,0.02);
  if(false) for(let i = 0; i < cols.length; i++){
    let c = cols[i];

    renderCube(c[0],c[1],c[2],c[3],c[4],c[5],c[8]?-c[8]:0,c[9]?-c[9]:0,c[10]?-c[10]:0,c[11],c[12],c[13]); //0.5

    if(false){
      nob.drawRect_dep(c[0],c[1],c[2],c[3],[c[0]+c[1],c[2]+c[3]+c[0],c[2]*c[3]-c[1],255],0);
      let ar = [];
      ar.push([c[0]-Math.floor(c[2]/2),c[1]-Math.floor(c[3]/2)]);
      ar.push([c[0]-Math.floor(c[2]/2),c[1]+Math.floor(c[3]/2)-1]);
      ar.push([c[0]+Math.floor(c[2]/2)-1,c[1]+Math.floor(c[3]/2)-1]);
      ar.push([c[0]+Math.floor(c[2]/2)-1,c[1]-Math.floor(c[3]/2)]);
      let color2 = [c[2]+c[3]+c[0],c[2]*c[3]-c[1],c[0]+c[1],255];
      for(let j = 0; j < ar.length; j++){
        let pp = ar[j];
        let xy = rotateAroundPoint(pp[0],pp[1],c[0]-0.5,c[1]-0.5,-c[6]||0);
        //nob.drawLine_smart_dep();
        nob.setPixel(xy[0],xy[1],color2);
      }
    }
    
  }

  ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
}
update();

document.addEventListener("mousemove",e=>{
  mouseX = e.x;
  mouseY = e.y;
});

document.addEventListener("keydown",e=>{
  let key = e.key.toLowerCase();
  let p = getMe();  

  if(!p.isAttacking){
    if(key == "w" && !keys.w){
      playAnimFlow(p,playerTT.walk);
    }
    if(key == "s" && !keys.s){
      playAnimFlow(p,playerTT.walk);
    }
    if(key == "d" && !keys.d){
      playAnimFlow(p,playerTT.walk);
    }
    if(key == "a" && !keys.a){
      playAnimFlow(p,playerTT.walk);
    }
  }

  keys[key] = true;
  if(key == "r") window.location.reload();

  if(p.isAttacking && p.attackState) if(keys.w || keys.s || keys.d || keys.a){
    playAnim(p,playerTT.attack_idle);
    p.isAttacking = false;
  }

  switch(key){
    case "enter":
      if(!p.isAttacking){
        p.isWalking = false;
        p.attackBuf = 0;
        p.isAttacking = true;
        p.attackState = false;
        playAnim(p,playerTT.punch);
      }
      else{
        p.attackBuf = 1;
      }
      break;
  }
});
document.addEventListener("keyup",e=>{
  let key = e.key.toLowerCase();
  keys[key] = false;

  let p = getMe();
  switch(key){
    case "w":
      if(!p.isAttacking) if(!keys.s && !keys.a && !keys.d){
        p.isWalking = false;
        if(!p.attackState) playAnim(p,playerTT.idle);
        else playAnim(p,playerTT.attack_idle);
      }
      break;
    case "s":
      if(!p.isAttacking) if(!keys.w && !keys.a && !keys.d){
        p.isWalking = false;
        if(!p.attackState) playAnim(p,playerTT.idle);
        else playAnim(p,playerTT.attack_idle);
      }
      break;
    case "d":
      if(!p.isAttacking) if(!keys.w && !keys.s && !keys.a){
        p.isWalking = false;
        if(!p.attackState) playAnim(p,playerTT.idle);
        else playAnim(p,playerTT.attack_idle);
      }
      break;
    case "a":
      if(!p.isAttacking) if(!keys.w && !keys.s && !keys.d){
        p.isWalking = false;
        if(!p.attackState) playAnim(p,playerTT.idle);
        else playAnim(p,playerTT.attack_idle);
      }
      break;
  }
});

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();