var allWorlds = [];

allWorlds[0] = {
    bg:"darkolivegreen", //darkolivegreen, darkseagreen, mediumseagreen, olivedrab, olive, yellowgreen:bright, seagreen:magical, wheat:beach
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
            doors:[]
        }
    },
    id:0
};
var mainWorld = allWorlds[0];
function loadChunk(o,world,cx,cy){
    let isPlayer = o.isPlayer;
    if(o.chunk){
        if(isPlayer) o.chunk.players.splice(o.chunk.players.indexOf(o),1);
        else o.chunk.ens.splice(o.chunk.ens.indexOf(o),1);
    }

    let s = (cx+","+cy);
    let chunk = world.chunks[s];
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

function createEmptyChunk(cx,cy){
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
        doors:[]
    };
}
function createEmptyWorld(){
    let d = {
        chunks:{
            "0,0":createEmptyChunk(0,0)
        },
        id:allWorlds.length
    };
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
let testWorld = createEmptyWorld();
testWorld.bg = "goldenrod";
testWorld.chunks["0,0"].update = function(){
    nob.drawCircle(20,20,10,[255,0,0,255]);
};
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
                let c = [nob.buf[i]/bb,nob.buf[i+1]/bb,nob.buf[i+2]/bb,nob.buf[i+3]];
                nob.setPixel(x,y,c);
                //if(x%a == 0 && y%a == 0) nob.setPixel(x,y);
            }
        }
        if(i == t-1) transitionTest_exit();
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
function createObj(img,x,y,z=0,upright=1,isFlipped=false,coll){
    let o = {
        x,
        y,
        z,
        img,
        upright,
        origin:"bm",
        isFlipped
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
}