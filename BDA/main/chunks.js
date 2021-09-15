var allWorlds = [];

allWorlds[0] = {
    bg:"darkolivegreen", //darkolivegreen, darkseagreen, mediumseagreen, olivedrab, olive, yellowgreen:bright, seagreen:magical, wheat:beach
    bgCol:convert("darkolivegreen"),
    chunks:{
        "0,0":{
            cx:0,
            cy:0,
            id:"0,0",
            ens:[],
            bullets:[],
            objs:[],
            sobjs:[],
            pBullets:[],
            colls:[],
            players:[],
            //
            doors:[],
            //Biomes
            biomeBuf:null
        }
    },
    id:0
};
var mainWorld = allWorlds[0];
function getNoise(x,y){
    return (noise.simplex2(x/300,y/300)*noise.simplex2(2+x/500,2+y/500)*2+0.2);
}
function initChunkPerlin(chunk){
  if(!chunk.biomeBuf){
    chunk.biomeBuf = new Uint8ClampedArray(nob.size);
  }
  let ii = 0;
  for(let j = 0; j < nob.height; j++) for(let i = 0; i < nob.width; i++){
    let x = chunk.cx*nob.width+i;
    let y = chunk.cy*nob.height+j;
    let v = (noise.simplex2(x/300,y/300)*noise.simplex2(2+x/500,2+y/500)*2+0.2);
    let biome = 0; //plains
    if(v > 0.3) biome = 1;
    chunk.biomeBuf[ii] = biome;
    ii += 4;
  }
}
function loadChunk(o,world,cx,cy){
    let isPlayer = o.isPlayer;
    if(o.chunk){
        if(isPlayer) o.chunk.players.splice(o.chunk.players.indexOf(o),1);
        else o.chunk.ens.splice(o.chunk.ens.indexOf(o),1);
    }

    let s = (cx+","+cy);
    let chunk = world.chunks[s];

    //initChunkPerlin(chunk);

    o.world = world;
    o.cx = cx;
    o.cy = cy;
    o.chunk = chunk;
    if(isPlayer) chunk.players.push(o);
    else chunk.ens.push(o);
    
    if(o == me){
        ens = chunk.ens;
        bullets = chunk.bullets;
        objs = chunk.objs;
        sobjs = chunk.sobjs;
        pBullets = chunk.pBullets;
        colls = chunk.colls;
        players = chunk.players;
        doors = chunk.doors;
    }

    //world.bgCol = convert(world.bg);
}
function loadSideChunk(o,world,cx,cy){
    let s = (cx+","+cy);
    let chunk = world.chunks[s];
    
    if(o == me){
        objs = objs.concat(chunk.objs);
        sobjs = sobjs.concat(chunk.sobjs);
        //ens = chunk.ens;
        //bullets = chunk.bullets;
        //objs = chunk.objs;
        //sobjs = chunk.sobjs;
        //pBullets = chunk.pBullets;
        //colls = chunk.colls;
        //players = chunk.players;
        //doors = chunk.doors;
    }
}
var firstChunk = mainWorld.chunks["0,0"];
var ens = firstChunk.ens;
var bullets = firstChunk.bullets;
var objs = firstChunk.objs;
var sobjs = firstChunk.sobjs;
var pBullets = firstChunk.pBullets;
var colls = firstChunk.colls;
var players = firstChunk.players;
var doors = firstChunk.doors;
mainWorld.time = 0;
mainWorld.lightCast = 0;
mainWorld.rainCast = 0;
mainWorld.isRaining = false;
mainWorld.lastRainTime = 0;
mainWorld.rainAmt = 1;

var dayLength = 6000; //400
var nightLength = 2000; //300
var duskLength = 12000; //6000
var dawnLength = 12000; //6000
var ddScale = 1; //0.5
var startingDay = false;
function runTime(w){
    w.time += 1;
    if(w.time >= dayLength && w.time < dayLength+nightLength) dayEnd(w);
    else if(!startingDay) if(w.time >= dayLength+Math.floor(duskLength*ddScale)+1000+nightLength){
        dayStart(w);
        startingDay = true;
    }
}
function startRain(w){
    w.isRaining = true;
    w.rainCast = 0;
    subAnim(100,function(i,t){
        let a = i/t*2;
        w.rainCast = a;
    });
}
function stopRain(w){
    w.rainCast = 2;
    subAnim(100,function(i,t){
        let a = 2-(i/t*2);
        w.rainCast = a;
        if(i == t-1) w.isRaining = false;
    });
}
function dayStart(w){
    console.log("day start");
    w.lightCast = 20;
    let start = w.time;
    subAnim(dawnLength,function(i2,t){
        let i = w.time-start;
        let a = 20-(i/t*20);
        w.lightCast = a;
        //if(i == Math.floor(t*0.5)-1){
        if(i >= t-1){
            w.time = 0;
            startingDay = false;
        }
    });
}
function dayEnd(w){
    w.lightCast = 0;
    let start = w.time;
    subAnim(duskLength,function(i2,t){
        //let a = i/t*50;
        //w.lightCast = Math.min(a,20);
        let i = w.time-start;
        let a = i/t*20;
        w.lightCast = a;
    });
}

function initChunk(chunk){
    let l_sobjs = sobjs;
    let l_objs = objs;
    sobjs = chunk.sobjs;
    objs = chunk.objs;

    if(!chunk.inside){
        chunk.biomeBuf = new Uint8ClampedArray(nob.size);
        initChunkPerlin(chunk);
        if(true){
            let allowedPixels = [];
            let times = 0;
            let ii = 0;
            for(let j = 0; j < nob.height; j++) for(let i = 0; i < nob.width; i++){
                if(chunk.biomeBuf[ii] == 1) allowedPixels.push([i,j]);
                ii += 4;
            }
            times = Math.floor(allowedPixels.length/300);
            for(let i = 0; i < times; i++){ //24
                //let x = Math.floor(Math.random()*nob.width);
                //let y = Math.floor(Math.random()*nob.height);
                if(Math.random() < 0.6){
                    let i2 = Math.floor(Math.random()*allowedPixels.length);
                    let loc = allowedPixels[i2];
                    let x = loc[0];
                    let y = loc[1];
                    let ind = (x+y*nob.width)*4;
                    let pass = false;
                    if(chunk.biomeBuf[ind] == 1) pass = true;
                    if(pass){
                        let l = getNonPassivesInRange_c(chunk,x,y,0,20);
                        if(l.length == 0){
                            let d = worldObjs.tree1(x,y,10); //10
                            d.l = Math.ceil(Math.random()*6+4);
                            d.w = Math.ceil(Math.random()*2);
                            d.w = 1;
                            //d.l *= 2;
                            d.startW = d.w;
                            d.hp = 10*d.w;
                        }
                    }
                }
            }
        }
        
        for(let i = 0; i < 100; i++){ //24
            let x = Math.floor(Math.random()*nob.width);
            let y = Math.floor(Math.random()*nob.height);
            let ind = (x+y*nob.width)*4;
            if(chunk.biomeBuf[ind] == 0){
                let amt = Math.ceil(Math.random()*10);
                for(let j = 0; j < amt; j++){
                    let offX = (Math.random()-0.5)*10;
                    let offY = (Math.random()-0.5)*10;
                    let l = getNonPassivesInRange_c(chunk,x+offX,y+offY,0,10);
                    if(l.length == 0) worldObjs.tall_grass(x+offX,y+offY,0,Math.floor(Math.random()*4)+2);
                }
            }
        }
        for(let i = 0; i < 50; i++){ //24
            let x = Math.floor(Math.random()*nob.width);
            let y = Math.floor(Math.random()*nob.height);
            let ind = (x+y*nob.width)*4;
            if(chunk.biomeBuf[ind] == 0){
                let amt = Math.ceil(Math.random()*10);
                for(let j = 0; j < amt; j++){
                    let offX = (Math.random()-0.5)*10;
                    let offY = (Math.random()-0.5)*10;
                    let l = getNonPassivesInRange_c(chunk,x+offX,y+offY,0,10);
                    if(l.length == 0) worldObjs.tall_grass(x+offX,y+offY,0,Math.floor(Math.random()*4)+2,[60,76,33]);
                }
            }
        }
        for(let i = 0; i < 5; i++){ //24
            let x = Math.floor(Math.random()*nob.width);
            let y = Math.floor(Math.random()*nob.height);
            let amt = Math.ceil(Math.random()*3)+2;
            for(let j = 0; j < amt; j++){
                let offX = (Math.random()-0.5)*20;
                let offY = (Math.random()-0.5)*20;
                let isFire = false;
                if(j == 1) isFire = true;
                let l = getNonPassivesInRange_c(chunk,x+offX,y+offY,0,isFire?4:15);
                if(l.length == 0){
                    if(isFire) worldObjs.campfire(x+offX,y+offY,0,true);
                    else createObj(tt.env.tent[Math.floor(Math.random()*2)],x+offX,y+offY,0,2);
                }
            }
        }
        for(let i = 0; i < 50; i++){ //24
            let x = Math.floor(Math.random()*nob.width);
            let y = Math.floor(Math.random()*nob.height);
            let ind = (x+y*nob.width)*4;
            let pass = false;
            if(chunk.biomeBuf[ind] == 0) pass = true;
            if(pass){
                let l = getNonPassivesInRange_c(chunk,x,y,0,30);
                if(l.length == 0) createObj(tt.env.rock[0],x,y,0,2,Math.random()<0.5);
            }
        }
        /*for(let i = 0; i < 50; i++){ //24
            let x = Math.floor(Math.random()*nob.width);
            let y = Math.floor(Math.random()*nob.height);
            let ind = (x+y*nob.width)*4;
            let pass = false;
            if(chunk.biomeBuf[ind] == 0) pass = true;
            if(pass){
                let l = getNonPassivesInRange_c(chunk,x,y,0,5);
                if(l.length == 0) worldObjs.campfire(x,y,0,true);
            }
        }*/
    }
    sobjs = l_sobjs;
    objs = l_objs;
}
function createEmptyChunk(cx,cy,inside=false){
    return {
        cx,cy,
        id:cx+","+cy,
        ens:[],
        bullets:[],
        objs:[],
        sobjs:[],
        pBullets:[],
        colls:[],
        players:[],
        doors:[],
        //Biomes
        biomeBuf:null,
        inside
    };
}
function createNewChunk(world,cx,cy,inside=false){
    if(!world.chunks[cx+","+cy]){
        let chunk = createEmptyChunk(cx,cy,inside);
        world.chunks[cx+","+cy] = chunk;
        initChunk(chunk);
        return chunk;
    }
    else return world.chunks[cx+","+cy];
}
function createEmptyWorld(inside=false){
    let d = {
        bg:"black",
        bgCol:[0,0,0,255],
        chunks:{},
        id:allWorlds.length
    };
    createNewChunk(d,0,0,inside);
    allWorlds.push(d);
    return d;
}

let centerX = 150;
let centerY = 75;

let toOppArr = [1,0,3,2];

//DOORS
function createDoor(world,chunk,x,y,toWorld,toChunk,tx,ty,dir=0){ //0 up 1 down 2 right 3 left
    let d = {
        open:0,
        x,y,
        toWorld:toWorld.id,
        toCX:toChunk.cx,
        toCY:toChunk.cy,
        tx,ty,
        dir,
        anim:{
            i:0,
            c:0,
            d:0,
            f:null
        }
    };
    let d2 = {
        open:0,
        x:tx,y:ty,
        toWorld:world.id,
        toCX:chunk.cx,
        toCY:chunk.cy,
        tx:x,ty:y,
        dir:toOppArr[dir],
        anim:{
            i:0,
            c:0,
            d:0,
            f:null
        }
    };
    chunk.doors.push(d);
    toChunk.doors.push(d2);
    var f = function(p,o){
        if(p.static) return;
        let ref = o[9].ref;
        let world = allWorlds[ref.toWorld];
        p.static = true;
        subAnim(20,function(i,t){
            switch(ref.dir){
                case 0:
                    p.y -= 0.5;
                    break;
                case 1:
                    p.y += 0.5;
                    break;
            }
            if(p == me) if(i == 0) if(world != p.world) transitionTest_enter();
            if(i == t-1){
                loadChunk(p,world,ref.toCX,ref.toCY);
                p.x = ref.tx;
                p.y = ref.ty;
                p.static = false;
                switch(ref.dir){
                    case 0:
                        p.y -= 7;
                        break;
                    case 1:
                        p.y += 7;
                        break;
                }
            }
        });
    };
    let c = [x-2,y,x+2,y,0,3,0,null,function(p,o){
        f(p,o);
    },{
        ref:d
    }];
    let c2 = [tx-2,ty,tx+2,ty,0,3,0,null,function(p,o){
        f(p,o);
    },{
        ref:d2
    }];
    chunk.colls.push(c);
    toChunk.colls.push(c2);
    d.ref = d2;
    d2.ref = d;
}
/*let testWorld = createEmptyWorld();
testWorld.bg = "goldenrod";
testWorld.chunks["0,0"].update = function(){
    nob.drawCircle(20,20,10,[255,0,0,255]);
};*/
//createDoor(mainWorld,mainWorld.chunks["0,0"],centerX+40,centerY*1.75,testWorld,testWorld.chunks["0,0"],centerX,centerY);

let a = 10;
function transitionTest_exit(){
    let b = 100;
    //let b = 1;
    subAnim(60,function(i,t,e){
        if(i%4 == 0) b /= 2;
        b = Math.round(b);
        if(b <= 0) b = 1;
        //if(i%4==0) b *= 2;

        //let a = Math.floor(20-(i/t)*20);
        //let a = Math.floor(nob.centerX-(i/t)*nob.centerX);
        //let ay = Math.floor(nob.centerY-(i/t)*nob.centerY);
        //if(a <= 0) a = 1;
        for(let y = 0; y < nob.height; y++){
            for(let x = 0; x < nob.width; x++){
                let a = Math.round(x/b)*b;
                let ay = Math.round(y/b)*b;
                a = Math.floor(a);
                ay = Math.floor(ay);
                let i = (a+ay*nob.width)*4;
                let c = [nob.buf[i],nob.buf[i+1],nob.buf[i+2],nob.buf[i+3]];
                nob.setPixel(x,y,c);
                //if(x%a == 0 && y%a == 0) nob.setPixel(x,y);
            }
        }
    });
}
function transitionTest_enter(){
    //let b = 100;
    let b = 1;
    let bg = convert(me.world.bg);
    let timeStart = performance.now();
    subAnim(45,function(i,t,e){
        //if(i%4 == 0) b /= 2;
        //b = Math.round(b);
        //if(b <= 0) b = 1;
        if(i%4==0) b *= 2;
        //let d = (i/(t*4))*255;

        //let a = Math.floor(20-(i/t)*20);
        //let a = Math.floor(nob.centerX-(i/t)*nob.centerX);
        //let ay = Math.floor(nob.centerY-(i/t)*nob.centerY);
        //if(a <= 0) a = 1;
        for(let y = 0; y < nob.height; y++){
            for(let x = 0; x < nob.width; x++){
                let a = Math.round(x/b)*b;
                let ay = Math.round(y/b)*b;
                a = Math.floor(a);
                ay = Math.floor(ay);
                let i = (a+ay*nob.width)*4;
                let c = [nob.buf[i],nob.buf[i+1],nob.buf[i+2],nob.buf[i+3]];
                nob.setPixel(x,y,c);
                //if(x%a == 0 && y%a == 0) nob.setPixel(x,y);
            }
        }
        for(let y = 0; y < nob.height; y++){
            for(let x = 0; x < nob.width; x++){
                let i = (x+y*nob.width)*4;
                if(nob.buf[i+3] == 0) nob.setPixel(x,y,bg);
                let bb = b/2;
                nob.setData2(i,nob.buf[i]/bb,nob.buf[i+1]/bb,nob.buf[i+2]/bb,nob.buf[i+3]);
            }
        }
        if(i == t-1){
            //console.log("TIME! : ",performance.now()-timeStart);
            transitionTest_exit();
        }
    });
}
function transitionTest2(){
    subAnim(60*6,function(i,t){
        let a = Math.floor(nob.centerX-(i/t)*nob.centerX);
        let ay = Math.floor(nob.centerY-(i/t)*nob.centerY);
        if(a <= 0) a = 1;
        if(ay <= 0) ay = 1;
        for(let y = 0; y < nob.centerY; y += ay){
            for(let x = 0; x < nob.centerX; x += a){
                nob.setPixel(nob.centerX+x,nob.centerY+y,black);
            }
            for(let x = 0; x < nob.centerX; x += a){
                nob.setPixel(nob.centerX-x,nob.centerY+y,black);
            }
        }
    });
}

//FOLIAGE
function createPlant(img,x,y,z=0,isFlipped=false,col){
    let upright = 2;
    if(tt.env.groundFeatures.includes(img)){
        upright = 1;
    }
    let o = {
        x,
        y,
        z,
        img,
        //img:tt.env.plants[Math.floor(Math.random()*tt.env.plants.length)],
        upright,
        origin:"bm",
        isFlipped,
        col
    };
    if(img.w == null){
        o.anim = {
            i:0,
            c:0,
            d:0,
            f:null
        };
        startAnim(o,img,null,0);
    }
    objs.push(o);
}
function createObj(img,x,y,z=0,upright=1,isFlipped=false,coll,col){ //col will replace the color [254,254,254] with col
    let o = {
        x,
        y,
        z,
        img,
        upright,
        origin:"bm",
        isFlipped,
        col
    };
    if(img.w == null){
        o.anim = {
            i:0,
            c:0,
            d:0,
            f:null
        };
        startAnim(o,img,null,0);
    }
    objs.push(o);
    if(coll){
        coll[0] += x;
        coll[2] += x;
        coll[1] += y;
        coll[3] += y;
        coll[4] += z;
        coll[5] += z;
        colls.push(coll);
    }
    return o;
}


///////

function runChunk(chunk,world){
    let ocx = chunk.cx-me.chunk.cx;
    let ocy = chunk.cy-me.chunk.cy;
    let sCamX = nob.camX;
    let sCamY = nob.camY;
    nob.camX -= ocx*nob.width;
    nob.camY -= ocy*nob.height;

    if(true){ //biomes

        let x = 0;
        let y = 0;
        if(nob.useCam){
            x -= nob.camX;
            y -= nob.camY;
            y += nob.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        let w = nob.width;
        let h = nob.height;
        if(w == 0) return;
        if(h == 0) return;

        if(!chunk.inside){
            for(let j = 0; j < h; j++) for(let i = 0; i < w; i++){
                let ind = (i+j*w)*4;
                let biome = chunk.biomeBuf[ind];
                let c = biomeData[biome].c;
    
                let check = true;
                let xx = x+i;
                if(xx < 0) check = false;
                else if(xx >= nob.width) check = false;
                if(check){
                    let tInd = (xx+(y+j)*nob.width)*4;
                    nob.buf[tInd] = c[0];
                    nob.buf[tInd+1] = c[1];
                    nob.buf[tInd+2] = c[2];
                }
            }
        }
    }
    //

    //TEST TEXT
    nob2.drawText("ROCK GOLLUM",0,3,white,black,false,false);

    for(let i = 0; i < chunk.colls.length; i++){
        let c = chunk.colls[i];
        if(c[6] == null){
            nob.drawRect_dep(c[0],c[3]-c[5],c[2]-c[0],c[5]-c[4],black,c[3],2);
            let dep = c[1]+c[5]*nob.height;
            nob.drawRect_dep(c[0],c[1]-c[5],c[2]-c[0],c[3]-c[1],collDBG_0,dep,1);

            nob.drawLine_smart_dep(c[0],c[1]-c[5],c[2]-1,c[1]-c[5],collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[2]-1,c[1]-c[5],c[2]-1,c[3]-c[5]-1,collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[2]-1,c[3]-c[5]-1,c[0],c[3]-c[5]-1,collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[0],c[3]-c[5]-1,c[0],c[1]-c[5],collDBG_1,1,dep+nob.height);
        }
    }


    //RANDOM FIREFLIES
    if(false) if(Math.random() < 0.05) pBullets.push([Math.random()*nob.width,Math.random()*nob.height,Math.random()*10,Math.random()-0.5,Math.random()-0.5,0,null,function(o){
        draw4PSurround(o[0],o[1],o[2]);
        nob.setPixel(o[0],o[1],black);
        nob.setPixel(o[0],o[1]-o[2],convert("lime"));
        //o[3] += Math.random()-0.5;
        //o[4] += Math.random()-0.5;
        o[5] += 0.005;
        let max = 0.2;
        if(o[3] > max) o[3] = max;
        else if(o[3] < -max) o[3] = -max;
        if(o[4] > max) o[4] = max;
        else if(o[4] < -max) o[4] = -max;
        if(o[5] > max) o[3] = max;
        else if(o[5] < -max) o[5] = -max;
        let e = o[8];
        e.count++;
        if(e.count > 40) removeBullet(pBullets,o);
    },{
        count:0
    }]);
    //
    
    //enemies
    let isTick = false;
    if(frames%3 == 0) isTick = true;
    let enL = [];
    for(let i = 0; i < chunk.ens.length; i++){
        enL.push(chunk.ens[i]);
    }
    for(let i = 0; i < enL.length; i++){
        let en = enL[i];
        if(en.visible){
            let o = en;

            //EFFECTS
            if(o.effects.frozen){
                o.tint2 = [1,1,2];
                o.tint = [0,0,100];
                //o.tint2 = [1,1,4];
            }
            let selfDelay = 1;
            let selfDM = 1;
            if(o.effects.frozen) selfDelay = 4;
            selfDM = 1/selfDelay;
            
            //PHYSICS
            if(o.z <= 0){
                o.z = 0;
                o.vz = 0;
                o.grounded = true;
            }
            o.vz -= 0.04;
            let drag = 0.03;
            if(o.drag) drag = o.drag;
            if(o.vx >= drag) o.vx -= drag;
            else if(o.vx <= -drag) o.vx += drag;
            else o.vx = 0;
            if(o.vy >= drag) o.vy -= drag;
            else if(o.vy <= -drag) o.vy += drag;
            else o.vy = 0;

            //keybinds / actions
            if(o.action.jump && o.grounded){
                o.grounded = false;
                o.vz += 1;
                o.action.jump = false;
            }
            //

            nob.flipX = o.isFlipped;

            if(Math.abs(o.vx) < 0.1) o.vx = 0;
            if(Math.abs(o.vy) < 0.1) o.vy = 0;

            o.lastX = o.x;
            o.lastY = o.y;
            o.lastZ = o.z;
            o.x += o.vx*selfDM;
            o.y += o.vy*selfDM;
            o.z += o.vz*selfDM;
            if(o.z < 0){
                o.z = 0;
                o.vz = 0;
                o.grounded = true;
            }

            if(o.z > 0) nob.drawCircle(o.x,o.y,2,black);

            if(!o.isAttacking){
                let type = tt[o.type];
                if(!type) type = tt.enemies[o.type];
                if(o.vx == 0 && o.vy == 0) startAnim(o,type.idle,null,1,true,true)
                else startAnim(o,type.walk,null,1,true);
            }

            //RENDERING
            let im = runAnimator(en,selfDM);
            let img = im;
            if(!im){
                if(en.oimg) img = en.oimg;
                else img = en.img.img;
            }

            //SELECTION
            let outline = null;
            let hit = false;
            switch(o.origin){
                case "bm":
                    if(mx >= o.x-img.w/2 && mx <= o.x+img.w/2 && my >= o.y-img.h && my <= o.y) hit = true;
                    break;
                default:
                    if(mx >= o.x-img.w/2 && mx <= o.x+img.w/2 && my >= o.y-img.h/2 && my <= o.y+img.h/2) hit = true;
            }
            if(hit) outline = white;

            if(o.origin == "bm") nob.drawImage_basic_tint2_dep(img,en.x-img.w/2,en.y-img.h-en.z,en.tint,en.tint2,en.y+(en.z)*nob.height,2,outline);
            else nob.drawImage_basic_tint2_dep(img,en.x-Math.floor(img.w/2),en.y-Math.floor(img.h/2)-en.z,en.tint,en.tint2,en.y+(en.z)*nob.height,2,outline);

            //RUN AI
            en.frames++;
            runEffect(en);
            if(en.frames%selfDelay == 0) if(en.ai) en.ai();
            if(isTick) if(en.tick) en.tick();

            nob.flipX = false;
        }
    }

    //SMART OBJS -PRE-
    let objsL = [];
    for(let i = 0; i < chunk.sobjs.length; i++){
        objsL.push(chunk.sobjs[i]);
    }
    for(let i = 0; i < objsL.length; i++){
        let o = objsL[i];
        if(o.preUpdate) o.preUpdate();
        if(o.lhover) o.lhover = false;
    }

    //players
    let pL = [];
    for(let i = 0; i < chunk.players.length; i++){
        pL.push(chunk.players[i]);
    }
    for(let i = 0; i < pL.length; i++){
        let o = pL[i];
        o.hoverMenu = false;

        //SIDE CHUNKS
        if(o.x <= 1){
            let chunk = createNewChunk(o.world,o.chunk.cx-1,o.chunk.cy);
            if(chunk){
                loadChunk(o,o.world,chunk.cx,chunk.cy);
                o.x = nob.right-1;
            }
        }
        else if(o.x >= nob.right){
            let chunk = createNewChunk(o.world,o.chunk.cx+1,o.chunk.cy);
            if(chunk){
                loadChunk(o,o.world,chunk.cx,chunk.cy);
                o.x = 1
            }
        }
        if(o.y <= 4){
            let chunk = createNewChunk(o.world,o.chunk.cx,o.chunk.cy-1);
            if(chunk){
                loadChunk(o,o.world,chunk.cx,chunk.cy);
                o.y = nob.bottom+1;
            }
        }
        else if(o.y >= nob.bottom+3){
            let chunk = createNewChunk(o.world,o.chunk.cx,o.chunk.cy+1);
            if(chunk){
                loadChunk(o,o.world,chunk.cx,chunk.cy);
                o.y = 4;
            }
        }

        /*let ind = Math.floor(o.x)+(Math.floor(o.y)+1)*nob.width;
        switch(ids[ind]){
            case 0:
                o.vy += 0.04;
                break;
            case 1:
                o.vy = 0;
                me.grounded = true;
                break;
        }*/
        if(o.z <= 0){
            o.z = 0;
            o.vz = 0;
            o.grounded = true;
            o.jumpZ = 0;
        }
        o.vz -= 0.04;
        let drag = 0.03;
        if(o.vx >= drag) o.vx -= drag;
        else if(o.vx <= -drag) o.vx += drag;
        else o.vx = 0;
        if(o.vy >= drag) o.vy -= drag;
        else if(o.vy <= -drag) o.vy += drag;
        else o.vy = 0;

        let noEpGen = false;
        if(o.locks.length > 0) noEpGen = true;
        if(!noEpGen) genEp(o);

        if(o.lockOnEn) if(o.lockOnEn.hp <= 0){
            o.lockOnEn = null;
            o.lockOnHb = null;
        }
        if(i == playerId){
            let mainW = o.equip.weapon;
            if(!o.smallInvOpen || keys.d){
                if(mainW){
                    let wD = weaponData[mainW.getType()];
                    if(!isMenuOpen()) if(wD.keybinds_pre) wD.keybinds_pre(o);
                }
            }
            if(true) if(mainW == null){
                if(!o.isAttacking) if(mouseDown[0]){
                    o.isAttacking = true;
                    let dx = mx-o.x;
                    let dy = my-o.y;
                    let dist = Math.sqrt(dx*dx+dy*dy);
                    let ang = Math.atan2(dy,dx);
                    if(ang < 0) ang += Math.PI*2;
                    ang += Math.PI;
                    if(ang >= Math.PI*2) ang -= Math.PI*2;
                    let ff = tt.tools.sickle.swing;
                    let v = Math.floor(ang/(Math.PI*2)*ff.length);
                    function arAt(i){
                        if(i < 0) i = ff.length-1;
                        else if(i >= ff.length) i = 0;
                        return ff[i];
                    }
                    let f = [arAt(v-1),arAt(v),arAt(v+1)];
                    let d = createParticleAnim(f,o.x,o.y-1,o.z,true,1);
                    subAnim(f.length*(f.delay||4)+10,function(i,t){
                        d.x = o.x;
                        d.y = o.y-1;
                        d.z = o.z;
                        if(i == t-1) o.isAttacking = false;
                    });
                    //hit
                    let rad = 4;
                    let tx = dx/dist*rad+o.x;
                    let ty = dy/dist*rad+o.y;
                    let r = 4;
                    let slist = [];
                    for(let i = 0; i < sobjs.length; i++){
                        slist[i] = sobjs[i];
                    }
                    for(let i = 0; i < slist.length; i++){
                        let s = slist[i];
                        if(s.vhb){ //view hitbox
                            if(s.hp != null) if(tx+r >= s.x+s.vhb[0] && tx-r < s.x+s.vhb[2] && ty+r >= s.y+s.vhb[1] && ty-r < s.y+s.vhb[3]){
                                hitWObj(s,1,o,dx/dist,dy/dist,ang);
                                //break;
                            }
                        }
                    }
                }
            }
            if(true) if(mainW == null) if(mouseDown[2]){ //hands
                let x = mx;
                let y = my;

                let obj;
                let rad = 8;
                for(let i = 0; i < sobjs.length; i++){
                    let s = sobjs[i];
                    if(s.canBePickedUp) if(s.vhb){ //view hitbox
                        let pass = true;
                        if(o.x <= s.x+s.vhb[0]-rad) pass = false;
                        else if(o.x >= s.x+s.vhb[2]+rad) pass = false;
                        else if(o.y <= s.y+s.vhb[1]-rad) pass = false;
                        else if(o.y >= s.y+s.vhb[3]+rad) pass = false;
                        else if(pass) if(x >= s.x+s.vhb[0] && x <= s.x+s.vhb[2] && y >= s.y+s.vhb[1] && y <= s.y+s.vhb[3]) obj = s;
                    }
                }

                if(obj) if(obj.canBePickedUp){
                    if(obj.getDrops) giveDrops(obj.getDrops(o),o);
                    if(obj.onDestroy) obj.onDestroy(o,0,0,0);
                    sobjs.splice(sobjs.indexOf(obj),1);
                }
            }
            //OPEN RCAMENU
            if(pressOnce("f")){
                if(o.bigInv.open) o.bigInv.open = false;
                if(o.craftingMenuOpen) o.craftingMenuOpen = false;
                else{
                    o.RCAMenu.open = !o.RCAMenu.open;
                    if(o.RCAMenu.open){
                        o.RCAMenu.x = mx*guiScale3;
                        o.RCAMenu.y = my*guiScale3;
                    }
                }
            }
            //OPEN BIGINV
            if(!o.RCAMenu.open) if(pressOnce("r")){
                if(o.craftingMenuOpen) o.craftingMenuOpen = false;
                o.bigInv.open = !o.bigInv.open;
            }

            //RENDER LOCKONEN
            if(o.lockOnEn){
                let frame = Math.floor((frames%20)/10);
                let en = o.lockOnEn;
                let hb = o.lockOnHb;
                let hx = en.x+(hb[0]+hb[2])/2;
                let hy = en.y+(hb[1]+hb[3])/2;
                let hz = en.z+(hb[4]+hb[5])/2;
                let img = tt.ui.lockTarget2[frame];
                let xx = hx*guiScale-img.w/2;
                let yy = (hy-hz)*guiScale-img.h/2;
                nob2.drawImage_basic(img,xx,yy,true);
            }
            //

            if(mainW) if((mouseDown[2] && mainW.getType() == WeaponType.Pistol) || keys.q){ // && mainW.getType() == WeaponType.Pistol
                let range = 20;
                let click = (mainW.getType == WeaponType.Pistol ? mouseOnce(0) : mouseOnce(2));
                let isMagic = (mainW.getType() != WeaponType.Pistol);
                let amtHovered = 0;
                let select = mouseDown[2];
                if(!select){
                    o.locks = [];
                    o.locksRef = [];
                }
                if(isMagic) select = false;
                let frame = Math.floor((frames%20)/10);
                let eL = getClosestEnemiesInRange(mx,my,0,range)[0];
                for(let j = 0; j < o.locks.length; j++){
                    eL.push(o.locksRef[j]);
                }
                for(let j = 0; j < eL.length; j++){
                    let en = eL[j];
                    for(let k = 0; k < en.hitboxes.length; k++){
                        let hb = en.hitboxes[k];
                        let hx = en.x+(hb[0]+hb[2])/2;
                        let hy = en.y+(hb[1]+hb[3])/2;
                        let hz = en.z+(hb[4]+hb[5])/2;
                        //let dx = hx-o.x;
                        //let dy = hy-o.y;
                        //let dz = hz-o.z;
                        //let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        //if(dist <= range){
                            let img = tt.ui.target[frame];
                            let xx = hx*guiScale-img.w/2;
                            let yy = (hy-hz)*guiScale-img.h/2;
                            let mx2 = mx*guiScale-3;
                            let my2 = my*guiScale-3;
                            let pad = 1;

                            let ind = o.locks.indexOf(hb);
                            if(mx2 >= xx-pad && mx2 < xx+8+pad && my2 >= yy-pad && my2 < yy+8+pad){
                                if(click){
                                    if(o.lockOnHb == hb){
                                        o.lockOnHb = null;
                                        o.lockOnEn = null;
                                    }
                                    else{
                                        o.lockOnHb = hb;
                                        o.lockOnEn = en;
                                    }
                                }
                                if(select) if(ind == -1){
                                    o.locks.push(hb);
                                    o.locksRef.push(en);
                                    ind = o.locks.length-1;
                                }
                                amtHovered++;
                            }
                            if(hb == o.lockOnHb) img = tt.ui.lockTarget2[frame];
                            if(ind != -1) img = tt.ui.lockTarget[frame];
                            nob2.drawImage_basic(img,xx,yy,true);
                            /*if(!o.lockOnEn) if(pressOnce("q")){
                                o.lockOnEn = en;
                                o.lockOnHb = hb;
                            }*/
                        //}
                    }
                }
                if(!isMagic) if(amtHovered == 0 && click){
                    o.lockOnHb = null;
                    o.lockOnEn = null;
                }
                if(keys.shift && pressOnce("q")){
                    o.lockOnHb = null;
                    o.lockOnEn = null;
                }
            }
            if(false) if(o.classId == CLASSES.Gunman){
                let range = 60;
                let frame = Math.floor((frames%20)/10);
                for(let j = 0; j < ens.length; j++){
                    let en = ens[j];
                    for(let k = 0; k < en.hitboxes.length; k++){
                        let hb = en.hitboxes[k];
                        let hx = en.x+(hb[0]+hb[2])/2;
                        let hy = en.y+(hb[1]+hb[3])/2;
                        let hz = en.z+(hb[4]+hb[5])/2;
                        let dx = hx-o.x;
                        let dy = hy-o.y;
                        let dz = hz-o.z;
                        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        if(dist <= range){
                            let img = tt.ui.target[frame];
                            nob2.drawImage_basic(img,hx*guiScale-img.w/2,(hy-hz)*guiScale-img.h/2);
                            if(!o.lockOnEn) if(pressOnce("q")){
                                o.lockOnEn = en;
                                o.lockOnHb = hb;
                            }
                        }
                    }
                }
                if(o.lockOnEn){
                    let en = o.lockOnEn;
                    let hb = o.lockOnHb;
                    let hx = en.x+(hb[0]+hb[2])/2;
                    let hy = en.y+(hb[1]+hb[3])/2;
                    let hz = en.z+(hb[4]+hb[5])/2;
                    let dx = hx-o.x;
                    let dy = hy-o.y;
                    let dz = hz-o.z;
                    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                    if(dist <= range){
                        let img = tt.ui.lockTarget[frame];
                        nob2.drawImage_basic(img,hx*guiScale-img.w/2,(hy-hz)*guiScale-img.h/2);
                    }
                }
                if(o.lockOnEn) if(pressOnce("q")){
                    o.lockOnEn = null;
                    o.lockOnHb = null;
                }
            }

            //let hb = [o.x+1,o.y-5,o.x+3,o.y+5];
            let hb = getHBFromAnim(o);
            //let hb = aa["swing1"].hb[0];
            //if(o.anim.f == tt.char.swirl1) hb = aa["swirl1"].hb[o.anim.c];
            if(false) if(hb){ //hitbox debug
                nob.drawLine_smart(o.x+hb[0]*(me.isFlipped?-1:1),o.y+hb[1]-o.z,o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-o.z,[255,0,0,255],1);
                nob.drawLine_smart(o.x+hb[0]*(me.isFlipped?-1:1),o.y+hb[3]-o.z,o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[3]-o.z,[255,0,0,255],1);
                nob.drawLine_smart(o.x+hb[0]*(me.isFlipped?-1:1),o.y+hb[1]-o.z,o.x+hb[0]*(me.isFlipped?-1:1),o.y+hb[3]-o.z,[255,0,0,255],1);
                nob.drawLine_smart(o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-o.z,o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[3]-o.z,[255,0,0,255],1);

                nob.drawLine_smart(o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-hb[4]-o.z,o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-hb[5]-o.z,[255,100,100,255],1);
                nob.drawLine_smart(o.x+hb[0]*(me.isFlipped?-1:1),o.y+hb[1]-hb[5]-o.z,o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-hb[5]-o.z,[255,100,100,255],1);
                nob.drawLine_smart(o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1],o.x+hb[2]*(me.isFlipped?-1:1),o.y+hb[1]-hb[4]-o.z,[100,0,0,255],1);
            }

            //keybinds
            if(!o.isDead){
                let cD = classData[o.classId];
                let w = o.equip.weapon;
                if(!cD.wasd && (w?!w.ref.wasd:true)){
                    if(keys.arrowright){
                        o.vx += 0.1;
                        o.isFlipped = false;
                        o.dir = 0;
                    }
                    if(keys.arrowleft){
                        o.vx -= 0.1;
                        o.isFlipped = true;
                        o.dir = 1;
                    }
                    if(keys.arrowup) o.vy -= 0.1;
                    if(keys.arrowdown) o.vy += 0.1;
                }
                else{
                    let prevent = false;
                    if(o.equip.weapon) if(o.equip.weapon.getType() == WeaponType.Sniper) if(o.isAttacking){
                        prevent = true;
                        o.vx = 0;
                        o.vy = 0;
                    }
                    if(!prevent){
                        if(keys.d){
                            o.vx += 0.1;
                            o.isFlipped = false;
                            o.dir = 0;
                        }
                        if(keys.a){
                            o.vx -= 0.1;
                            o.isFlipped = true;
                            o.dir = 1;
                        }
                        if(keys.w) o.vy -= 0.1;
                        if(keys.s) o.vy += 0.1;
                    }
                }
    
                if(keys[" "] && o.grounded){
                    o.grounded = false;
                    o.vz += 1;
                    o.jumpZ = o.z;
                }
    
                if(true){ //(!o.smallInvOpen) || keys.d
                    let mainW = o.equip.weapon;
                    if(mainW){
                        let wd = weaponData[mainW.getType()];
                        if(!isMenuOpen()) if(wd.keybinds) wd.keybinds(o);
                    }
                }
            }
        }
        let max = o.moveMulti;
        if(o.vx > max) o.vx = max;
        if(o.vx < -max) o.vx = -max;
        if(o.vy > max) o.vy = max;
        if(o.vy < -max) o.vy = -max;
        nob.flipX = o.isFlipped;

        if(Math.abs(o.vx) < 0.1) o.vx = 0;

        if(!o.static){
            //o.x += o.vx*o.moveMulti;
            //o.y += o.vy*o.moveMulti;
            //o.z += o.vz;
            moveObj(o,o.vx*o.moveMulti,o.vy*o.moveMulti,o.vz);
        }

        //drawChar(o);
        //if(o.z > 0) nob.drawCircle(o.x,o.y,2,black);
        drawShadow(o.x,o.y,o.z,o);
        //nob.drawLine_smart(o.x,o.y,o.x,o.y-o.z,[40,40,40,255],1);

        if(!o.noRender){
            let img;
            if(!o.isDead){
                if(o.vx == 0 && o.vy == 0) img = anim.char(o,0);
                else img = anim.char(o,1);
            }
            o.img = img;

            img = runAnimator(o);
            if(img){
                nob.drawImage_basic_dep(img,o.x-Math.floor(img.w/2),o.y-o.z-img.h,false,o.y+(o.z+1)*nob.height,2);
                o.img = img;
            }
        }

        if(o.update) o.update();

        //anim.char(o,3);
        //nob.flipX = !nob.flipX;
        //anim.char(o,2);
        nob.flipX = false;
    }

    //SMART OBJS
    for(let i = 0; i < objsL.length; i++){
        let o = objsL[i];
        if(o.update) o.update();
    }

    //DOORS
    for(let i = 0; i < chunk.doors.length; i++){
        let d = chunk.doors[i];

        if(frames%20 == 0){
            let pL = getClosestPlayersInRange(d.x,d.y,0,20)[0];
            pL = pL.concat(getClosestEnemiesInRange(d.x,d.y,0,20)[0]);
            if(pL.length != 0){
                if(d.open == 0) d.open = 1;
            }
            else{
                if(d.open == 3) d.open = 4;
            }
        }

        if(d.open == 1){ //open
            d.open = 2;
            startAnim(d,tt.env.towns.door,function(o){
                o.open = 3;
                if(o.ref.open == 0) o.ref.open = 3;
            });
        }
        else if(d.open == 4){ //close
            d.open = 2;
            startAnim(d,tt.env.towns.door.rev,function(o){
                o.open = 0;
            });
        }

        img = runAnimator(d);
        if(!img) img = tt.env.towns.door[(d.open == 3 ? 3 : 0)];
        if(img) nob.drawImage_basic_dep(img,d.x-img.w/2,d.y-9,false,d.y-9,2);

        //
        if(false){
            if(frames%20 == 0){
                let pL = getClosestPlayersInRange(this.x,this.y,0,30)[0];
                if(pL.length != 0){
                    if(this.doorOpen == 0) this.doorOpen = 1;
                }
                else{
                    if(this.doorOpen == 3) this.doorOpen = 4;
                }
            }
            if(frames%5 == 0) this.closePl = getClosestPlayersInRange(this.x,this.y,0,4)[0];
            if(this.closePl) for(let i = 0; i < this.closePl.length; i++){
                let p = this.closePl[i];
                if(!p.static) if(Math.abs(p.x-this.x) <= 3) if(p.keys.w || p.keys.arrowup){
                    p.static = true;
                    this.closePl.splice(this.closePl.indexOf(p),1);
                    //p.y = this.y+1;
                    let world = this.myWorld;
                    subAnim(20,function(i,t){
                        p.y -= 0.5;
                        if(i == t-1){
                            loadChunk(p,world,0,0);
                            p.static = false;
                        }
                    });
                }
            }

            let img = tt.env.towns.house[0];
            if(!img) return;
            nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h,2);
            img = tt.env.towns.house[1];
            nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h+(25*nob.height),1);

            if(this.doorOpen == 1){ //open
                this.doorOpen = 2;
                startAnim(this,tt.env.towns.door,function(o){
                    o.doorOpen = 3;
                });
            }
            else if(this.doorOpen == 4){ //close
                this.doorOpen = 2;
                startAnim(this,tt.env.towns.door.rev,function(o){
                    o.doorOpen = 0;
                });
            }
            
            img = runAnimator(this);
            if(!img) img = tt.env.towns.door[(this.doorOpen == 3 ? 3 : 0)];
            if(img) nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-9,false,this.y-9,2);
        }
    }

    //GLOBAL BULLETS
    let bulls = [];
    for(let i = 0; i < chunk.bullets.length; i++){
        bulls.push(chunk.bullets[i]);
    }
    for(let i = 0; i < bulls.length; i++){
        let o = bulls[i];
        runBullet(o,chunk.bullets);
    }
    //Player Bullets
    bulls = [];
    for(let i = 0; i < chunk.pBullets.length; i++){
        bulls.push(chunk.pBullets[i]);
    }
    for(let i = 0; i < bulls.length; i++){
        let o = bulls[i];
        runBullet(o,chunk.pBullets);
    }

    //GLOBAL OBJS
    function removeObj(o){
        objs.splice(chunk.objs.indexOf(o),1);
    }
    objsL = [];
    for(let i = 0; i < chunk.objs.length; i++){
        objsL.push(chunk.objs[i]);
    }
    for(let i = 0; i < objsL.length; i++){
        let o = objsL[i];
        let img;
        if(o.anim) img = runAnimator(o);
        if(!img) img = o.img;
        if(o.isFlipped) nob.flipX = true;
        if(img){
            if(o.upright){
                if(!o.col) nob.drawImage_basic_dep(img,o.x-img.w/2,o.y-img.h-o.z,false,o.y+(o.z*nob.height),o.upright);
                else nob.drawImage_basic_replace_dep(img,o.x-img.w/2,o.y-img.h-o.z,replaceCol,o.col,o.y+(o.z*nob.height),o.upright);
            }
            else nob.drawImage_basic(img,o.x-Math.floor(img.w/2),o.y-o.z-Math.floor(img.h/2));
        }
        if(o.destroyAfterAnim){
            if(o.anim.f == null) removeObj(o);
        }
        nob.flipX = false;
    }

    nob.camX = sCamX;
    nob.camY = sCamY;
}