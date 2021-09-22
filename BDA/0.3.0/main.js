const can = document.getElementById("can");
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);
//nob.background = [232,232,232,255];
const can2 = document.getElementById("b_can");
can2.width = can.width*guiScale;
can2.height = can.height*guiScale;
const ctx2 = can2.getContext("2d");
const nob2 = new NobsinCtx(ctx2);
nob2.transparentBg = true;
nob2.background = [0,0,0,0];
const can3 = document.getElementById("can3");
can3.width = can.width*guiScale3;
can3.height = can.height*guiScale3;
const ctx3 = can3.getContext("2d");
const nob3 = new NobsinCtx(ctx3);
nob3.transparentBg = true;
nob3.background = [0,0,0,0];

const staticNob = new NobsinCtx(ctx);

var col = [200,20,0,255];
var frames = 0;
var playerId = 0;

var keys = {};

function init(){
    col = convert("dodgerblue");

    //create plants
    if(false) for(let i = 0; i < 200; i++){
        let ar = [];
        ar = ar.concat(tt.env.plants);
        ar = ar.concat(tt.env.groundFeatures);
        /*let list = [
            "plants",
            "groundFeatures"
        ];*/
        //let base = tt.env[list[Math.floor(Math.random()*list.length)]];
        let img = ar[Math.floor(Math.random()*ar.length)];
        let pass = true;
        let upright = 2;
        if(tt.env.groundFeatures.includes(img)){
            upright = 1;
        }
        if(pass){
            let o = {
                x:Math.floor(Math.random()*nob.width),
                y:Math.floor(Math.random()*nob.height),
                z:0,
                img,
                upright,
                origin:"bm",
                isFlipped:(Math.random()<0.5)
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
    }
    if(false) for(let x = 0; x < nob.width; x += nob.width/20) for(let y = 0; y < nob.height; y += nob.height/20){
        if(Math.random() < 0.5){
            let ar = [];
            ar = ar.concat(tt.env.plants);
            ar = ar.concat(tt.env.groundFeatures);
            let img = ar[Math.floor(Math.random()*ar.length)];
            let pass = true;
            let upright = 2;
            if(tt.env.groundFeatures.includes(img)){
                upright = 1;
            }
            if(pass){
                let o = {
                    x,
                    y,
                    z:0,
                    img,
                    upright,
                    origin:"bm",
                    isFlipped:(Math.random()<0.5)
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
        }
    }

    //createEnemy(ENEMIES.walker,60,80,0);
    //createEnemy(ENEMIES.wolf,60,80,0);
    /*for(let i = 0; i < 40; i++){
        createEnemy(ENEMIES.wolf,Math.random()*nob.width,Math.random()*nob.height,0);
    }*/
    return;
    createEnemy(ENEMIES.gollum,60,80,0);
    createEnemy(ENEMIES.gollum,20,80,0);
    createEnemy(ENEMIES.speedRoller,100,20,0);
}
init();

function countDrawnPixels(){
    let c = 0;
    for(let i = 0; i < nob.buf.length; i += 4){
        if(nob.buf[i+3] != 0) c++;
    }
    return c;
}
function isFree(x,y){
    let ind = Math.floor(x)+Math.floor(y)*nob.width;
    if(ids[ind] == 0) return true;
    return false;
}

function runAnimator(o,speed=1){
    let a = o.anim;
    let img;
    if(!a.f){
        a.i = 0;
        a.c = 0;
        a.d = 0;
        a.ti = 0;
        a.t = 1;
        return;
    }
    else{
        a.i += speed;
        img = a.f[a.c];
        if(speed==0) return img;
        if(a.i > a.d){
            a.i = 0;
            if(a.onFrame) a.onFrame(o,a.c,a.f.length);
            a.c++;
            if(a.od == 1) hitHelper(a,o);
            if(a.c >= a.f.length){
                a.ti++;
                a.i = 0;
                a.c = 0;
                if(a.ti >= a.t){
                    a.ti = 0;
                    
                    if(a.t != 0){
                        a.t = 1;
                        a.d = 0;
                        a.f = null;
                        if(a.od){
                            if(a.od == 1){
                                o.isAttacking = false;
                                o.atkLast = frames;
                            }
                            else if(typeof a.od == "function") a.od(o);
                        }
                        a.od = null;
                    }
                }
            }
        }
        return img;
    }
}
function startAnim(o,f,od,times=1,cont=false,noInterupt=false,onFrame){
    if(noInterupt) if(o.anim.f != null && o.anim.f != f) return;
    if(o.anim.f == f && cont) return;
    o.anim.i = 0;
    o.anim.c = 0;
    o.anim.d = 4;
    o.anim.ti = 0;
    o.anim.t = times;
    if(f.delay) o.anim.d = f.delay;
    o.anim.f = f;
    o.anim.od = od;
    o.anim.onFrame = onFrame;
}

function inflictEffect(o,effect){ //effect is string "frozen", "wet"
    let r = o.effectD[effect];
    if(r.i >= r.cooldown){
        o.effects[effect] = true;
        r.i = 0;
        return true; //did it inflict?
    }
    return false;
}
function runEffect(o){
    let ok = Object.keys(o.effectD);
    for(let i = 0; i < ok.length; i++){
        let effect = ok[i];
        let r = o.effectD[effect];
        r.i++;
        if(o.effects[effect]){
            if(r.time != null){
                if(r.i >= r.time){
                    //r.last = o.frames;
                    o.effects[effect] = false;
                    r.i = 0;
                    console.log("END");
                    if(r.onEnd) r.onEnd(o);
                }
            }
        }
    }
}

function createEnemy(en,x,y,z,data,world,cx,cy){
    if(!world){
      world = me.world;
    }
    let chunk;
    //if(cx == null) cx = me.chunk.cx;
    //if(cy == null) cy = me.chunk.cy;
    if(cx == null) chunk = me.chunk;
    else chunk = world[cx+","+cy];
    let d = {
        world,cx,cy,chunk,
        x,y,z,
        vx:0,vy:0,vz:0,
        visible:true,
        tint:[1,1,1],
        tint2:[1,1,1],
        frames:0,
        isFlipped:false,
        action:{
            move:-1
        },
        effects:{},
        effectD:{
            frozen:{
                i:180,
                time:420,
                last:-9999,
                cooldown:180,
                onEnd:function(o){
                    o.tint = [0,0,0];
                    o.tint2 = [1,1,1];
                }
            },
            wet:{
                i:5,
                time:60,
                last:-9999,
                cooldown:5
            }
        },
        anim:{
            i:0, //current incriment in frames
            c:0, //current anim-frame
            d:0, //delay in frames between anim-frame
            f:null
        }
    };
    d.lastX = d.x;
    d.lastY = d.y;
    d.lastZ = d.z;
    Object.keys(en).forEach(c=>{
        d[c] = en[c];
    });
    if(data) Object.keys(data).forEach(c=>{
        d[c] = data[c];
    });
    d.hitboxes = deepClone(d.hitboxes);
    chunk.ens.push(d);
    if(d.init) d.init();
    return d;
}
function initAttack(o){
    if(o.smallInvOpen) return false;
    o.isAttacking = true;
    o.atkI++;
    if(frames-o.atkLast > 10) o.atkI = 0;
    if(o.atkI > 2) o.atkI = 0;
    //o.smallInvOpen = false;
    //o.atkLast = frames;
    return true;
}

function removeBullet(p,o,anim){
    if(o[8]){
        if(o[8].onDeath) o[8].onDeath(o);
        if(o[8].onDeathAnim) if(anim) o[8].onDeathAnim(o);
    }
    p.splice(p.indexOf(o),1);
    o[4] = null;
}

var paused = false;
var pauseDiv = document.getElementById("pauseSpan");
function pause(val){
    paused = val;
    if(!paused){
        pauseDiv.style.visibility = "hidden";
        window.requestAnimationFrame(update);
    }
    else pauseDiv.style.visibility = "visible";
}
var keysPressedOnce = {};
var mousePressedOnce = [];
function pressOnce(key){
    if(keys[key]){
        if(!keysPressedOnce[key]){
            keysPressedOnce[key] = true;
            return true;
        }
    }
    return false;
}
function mouseOnce(key){
    if(mouseDown[key]){
        if(!mousePressedOnce[key]){
            mousePressedOnce[key] = true;
            return true;
        }
    }
    return false;
}
var useBackground = false;
function setCanvasZoom(a){
    can.style.transform = `scale(${a},${a}) translate(50%,50%)`;
    can2.style.transform = `scale(${a},${a}) translate(50%,50%)`;
    can3.style.transform = `scale(${a},${a}) translate(50%,50%)`;
}
var camX = 0;
var camY = 0;
var camZ = 0;
function removeSObj(o){
    sobjs.splice(sobjs.indexOf(o),1);
}
var collDBG_0 = convert("burlywood");
var collDBG_1 = convert("wheat");
var lights;

var testSwitch = false;
noise.seed(Math.random());
var frameCount = 0;
var fps = 0;
setInterval(function(){
    fps = frameCount;
    frameCount = 0;
},1000);
function update(){
    if(!paused) window.requestAnimationFrame(update);
    frameCount++;
    document.getElementById("demo").innerHTML = "FPS: " + fps;
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);
    nob.dep = new Uint16Array(nob.ssize);
    ids = new Uint8ClampedArray(nob.ssize);
    nob2.pixelCount = 0;
    nob2.buf = new Uint8ClampedArray(nob2.size);
    nob3.pixelCount = 0;
    nob3.buf = new Uint8ClampedArray(nob3.size);
    lights = new Uint8ClampedArray(nob.size);
    mUpEvts = [];

    //if(useBackground) nob.drawImage_basic(tt.scenes[0],0,0);
    if(me.world.bg) can.style.backgroundColor = me.world.bg;
    nob.drawRect(0,0,nob.width,nob.height,me.world.bgCol);
    if(me.chunk.update) me.chunk.update();
    //if(me.world == mainWorld) nob.drawImage_basic(tt.scenes[1],0,0);

    //PERLIN TEST
    if(false){ //rivers
        let ii = 0;
        for(let j = 0; j < nob.height; j++) for(let i = 0; i < nob.width; i++){
            let v = (noise.perlin2(i/50,j/50)/2+0.3)*255;
            nob.buf[ii] = v;
            nob.buf[ii+1] = v;
            nob.buf[ii+2] = v;
            ii += 4;
        }
    }
    if(false){ //biomes
        let ii = 0;
        for(let j = 0; j < nob.height; j++) for(let i = 0; i < nob.width; i++){
            let v = (noise.perlin2(i/150,j/150)/2+0.3)*255;
            nob.buf[ii] = v;
            nob.buf[ii+1] = v;
            nob.buf[ii+2] = v;
            ii += 4;
        }
    }

    runChunk(me.chunk,me.world,0,0);
    //if(me.world.chunks[me.chunk.cx-1+","+me.chunk.cy]) runChunk(me.world.chunks[me.chunk.cx-1+","+me.chunk.cy],me.world,-1,0);

    setCamPos(me.x-nob.centerX,me.y-nob.centerY,me.z);

    updateEvts();

    runTime(me.world);

    runChunkAfter(me.chunk,me.world,0,0);

    

    /////////VIEWS

    if(me.view == 1){
      /*let n2 = registerNob(null,nob.width,nob.height).nob;
      for(let i = 0; i < nob.size; i += 4){
        n2.buf[i] = nob.buf[i];
        n2.buf[i+1] = nob.buf[i+1];
        n2.buf[i+2] = nob.buf[i+2];
        n2.buf[i+3] = nob.buf[i+3];
      }
      nob.buf = new Uint8ClampedArray(nob.size);
      nob.drawImage_basic(fromNob(n2),-me.x+nob.centerX,-me.y+nob.centerY);*/
      can.style.marginLeft = ((-me.x+nob.centerX)*(can.offsetWidth/can.width))+"px";
      can.style.marginTop = ((-me.y+nob.centerY)*(can.offsetHeight/can.height))+"px";
    }

    /////////

    //mask: //nob.drawRect_dep(0,0,nob.width,nob.height,me.world.bgCol,0);

    //nob.drawImage_basic(fromNob(staticNob),0,0);

    //GUI
    renderHUD(me);
    //

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),-camX,-camY+camZ);
    ctx2.putImageData(new ImageData(nob2.buf,nob2.width,nob2.height),0,0);
    ctx3.putImageData(new ImageData(nob3.buf,nob3.width,nob3.height),0,0);
    frames++;

    //me.vx -= 0.01;

    /*if(!keys.arrowright && !keys.arrowleft){
        if(me.vx > 0.1) me.vx -= 0.1;
        else if(me.vx < -0.1) me.vx += 0.1;
    }*/
}


can2.addEventListener("contextmenu",e=>{
    e.preventDefault();
});
document.addEventListener("keydown",e=>{
    let key = e.key.toLowerCase();
    if(regInputData){
        let numbers = [0,1,2,3,4,5,6,7,8,9];
        if(numbers.includes(parseInt(e.key))) regInputData.val += key;
        else if(key == "backspace") regInputData.val = regInputData.val.substring(0,regInputData.val.toString().length-1);
        if(regInputData.onChange) regInputData.onChange();
        if(key == "enter") if(regInputData.onSubmit) regInputData.onSubmit();
        return;
    }
    keys[key] = true;
    me.keys[key] = true;
    if(key == " ") e.preventDefault();
    if(key == "arrowdown" || key == "arrowup" || key == "arrowright" || key == "arrowleft") e.preventDefault();
    /*if(key == "c"){
        let c = prompt("Pick a color:");
        col = convert(c);
    }*/

    if(key == "escape"){
        pause(!paused);
    }

    //switch weapons
    //if(key == "control" || ((key == "f" || key == "c" || key == "shift") && !me.smallInvOpen)){
    if(key == "enter"){
        if(me.spellMenuOpen) me.spellMenuOpen = false;
        else me.smallInvOpen = !me.smallInvOpen;
        let indd = me.smallInvCat;
        indd = me.inv.weapons.indexOf(me.equip.weapon);
        if(indd != -1) me.smallInvCat = 0;
        else{
            indd = me.inv.tools.indexOf(me.equip.weapon);
            if(indd != -1) me.smallInvCat = 1;
        }
    }
    if(key == "arrowright" || key == "arrowleft"){
        if(me.smallInvCat == 0) if(me.equip.weapon) if(me.equip.weapon.getType() == WeaponType.Wand || me.equip.weapon.getType() == WeaponType.Staff) if(!me.smallInvOpen) if(!me.spellMenuOpen){
            me.spellMenuOpen = true;
            pressOnce("arrowright");
            pressOnce("arrowleft");
        }
    }
    /*if(!me.isDashing && !me.resetDash){
        if(key == "z"){
            me.vx = -1;
        }
        if(key == "x"){
            me.vx = 1;
        }
    }*/
});
document.addEventListener("keyup",e=>{
    let key = e.key.toLowerCase();
    keys[key] = false;
    me.keys[key] = false;

    keysPressedOnce[key] = false;

    /*switch(key){
        case "arrowright":
            me.vx = 0;
            break;
        case "arrowleft":
            me.vx = 0;
            break;
    }*/
});
can2.addEventListener("mousedown",e=>{
    if(regInputData) regInputData.click = false;
    mouseDown[e.button] = true;
    if(e.button == 1){
        if(me.classId == CLASSES.Gunman) me.targZ = 0;
    }
    if(me.classId == CLASSES.Gunman){
        if(e.button == 2){
            me.locks = [];
            me.locksRef = [];
        }
    }
});

function runBullet(o,p){
    if(o[6] !== false) if(o[6]){
        if(o[6].loaded){
            let renderShadow = true;
            if(o[8]) if(o[8].noShadow) renderShadow = false;
            if(renderShadow) if(o[2] > 0) nob.drawCircle(o[0],o[1],2,black); 
            if(Math.floor(o[2]) < 0) removeBullet(p,o,true);
            else nob.drawImage_basic_dep(o[6],o[0]-Math.floor(o[6].w/2),o[1]-o[2]-Math.floor(o[6].h/2),o[1]+o[2]*nob.height,1);
        }
        else{
            //nob.setPixel(o[0],o[1],black);
            nob.setPixel_dep(o[0],o[1]-o[2],o[6],o[1]+(o[2])*nob.height);
        }
    }

    o[0] += o[3];
    o[1] += o[4];
    o[2] += o[5];

    if(o[8]?!o[8].keepAlive:true){
        if(o[0] < -20) removeBullet(p,o);
        else if(o[1] < -20) removeBullet(p,o);
        else if(o[0] >= nob.width+20) removeBullet(p,o);
        else if(o[1] >= nob.height+20) removeBullet(p,o);
    }

    if(o[8]) if(o[8].groundColl){
      if(Math.floor(o[2]) < 0) removeBullet(p,o,true);
    }

    //coll collision
    if(o[8]) if(o[8].hb) for(let i = 0; i < colls.length; i++){
        let c = colls[i];
        let check = true;
        let x = o[0];
        let y = o[1];
        let z = o[2];
        if(x > c[2]) check = false;
        else if(x < c[0]) check = false;
        else if(y > c[3]) check = false;
        else if(y < c[1]) check = false;
        if(check) if(x >= c[0] && x <= c[2]
            && y >= c[1] && y <= c[3]
            && z >= c[4] && z <= c[5]){
                removeBullet(p,o,true);
                return;
            }
    }
    //

    if(o[7]) o[7](o);
    if(o[8]) if(o[8].hb){
        let hb = o[8].hb;
        let player = o[8].player;

        drawHitBoxPlayer({
            x:o[0],
            y:o[1],
            z:o[2]-o[8].h,
            ref:o,
            player,
            hitboxes:[hb],
            element:o[8].element
        },hb,"a",o[8]?o[8].onHit:null,true);

        let dx = o[0]-o[8].sx;
        let dy = o[1]-o[8].sy;
        let dz = o[2]-o[8].sz;
        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist > 70) removeBullet(p,o,false);
    }
}

//COLLISION
function checkCollision(o,ax,ay,az){
    let x = o.x+ax;
    let y = o.y+ay;
    let z = o.z+az;
    let hb = o.hitboxes[0];
    for(let i = 0; i < colls.length; i++){
        let box = colls[i];
        let flip = o.isFlipped;
        //console.log("check");
        if(
            box[0] <= (flip?(x-hb[0]):(x+hb[2])) && box[2] >= (flip?(x-hb[2]):(x+hb[0]))
            && box[1] <= y+hb[3] && box[3] >= y+hb[1]
            && box[4] <= z+hb[5] && box[5] >= z+hb[4]
        ){
            let res = {};
            res.box = box;
            //console.log("hit!!!");
            //colliding
            /*res.who = en;
            res.box = box;
            let c1x = Math.floor((en.x+box[0]+en.x+box[2])/2);
            let c1y = Math.floor((en.y+box[1]+en.y+box[3])/2);
            let c1z = Math.floor((en.z+box[4]+en.z+box[5])/2);
            let c2x = Math.floor((o.x+hb[0]+o.x+hb[2])/2);
            let c2y = Math.floor((o.y+hb[1]+o.y+hb[3])/2);
            let c2z = Math.floor((o.z+hb[4]+o.z+hb[5])/2);
            res.x = Math.floor((c1x+c2x)/2*guiScale);
            res.y = Math.floor((c1y+c2y)/2*guiScale);
            res.z = Math.floor((c1z+c2z)/2*guiScale);
            res.hit = true;*/
            return res;
        }
    }
    return null;
}
function moveObj_broken(o,ax,ay,az=0){
    let sx = o.x;
    let sy = o.y;
    while(ax != 0 || ay != 0 || az != 0){
        let inside = [false,false,false];
        let vx = (ax>0?Math.min(1,ax):Math.max(-1,ax));
        let vy = (ay>0?Math.min(1,ay):Math.max(-1,ay));
        let vz = (az>0?Math.min(1,az):Math.max(-1,az));
        let tx = o.x+vx;
        let ty = o.y+vy;
        let tz = o.z+vz;
        for(let j = 0; j < colls.length; j++){
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            let bTop = box[5];
            if(zz+hb[4] < bTop && zz+hb[4] >= bTop-2){
                let yCol = (yy+hb[3] > box[1] && yy+hb[1] < box[3]);
                let xCol = (xx+hb[2] > box[0] && xx+hb[0] < box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = bTop-hb[4];
                    o.vz = 0;
                    o.grounded = true;
                    useBoxCol = false;
                }
            }
            else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] > box[1] && yy+hb[1] < box[3]);
                let xCol = (xx+hb[2] > box[0] && xx+hb[0] < box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }
            if(useBoxCol) if(zz+hb[4] < bTop-1 && (o.z+hb[5] >= box[4]+1)){
                function stepUp(){
                    return false;
                    //if(stepped) return false;
                    if(zz+hb[4] < bTop && zz+hb[4] >= bTop+1){
                        o.z = bTop-hb[4];
                        //tz = o.z+vz;
                        //zz = tz;
                        //o.z++;
                        //tz++;s
                        //zz++;
                        //az = bTop-o.z;
                        //o.vz += 0.1;
                        //vz = 0;
                        //o.grounded = true;
                        inside[2] = true;
                        return true;
                    }
                    return false;
                }
                let stepped = false;
                if(yy+hb[3] > box[1] && yy+hb[1] < box[3]){
                    if(sx < cx){
                        if(xx+hb[2] > box[0]-1){
                            if(vx > 0) if(o.x+hb[2] >= box[0]-1) stepped = stepUp();
                            inside[0] = true;
                            if(!stepped){
                                o.x = box[0]-hb[2]-1;
                                if(o.vx > 0) o.vx = 0;
                            }
                            else{
                                //o.x++;
                                //o.z++;
                            }
                        }
                    }
                    else{
                        if(xx+hb[0]-1 < box[2]){
                            if(vx < 0) if(o.x+hb[0]-1 <= box[2]) stepped = stepUp();
                            inside[0] = true;
                            if(!stepped){
                                o.x = box[2]-hb[0]+1;
                                if(o.vx < 0) o.vx = 0;
                            }
                            else{
                                //o.x++;
                                //o.z++;
                            }
                        }
                    }
                }
                if(false) if(xx+hb[2] > box[0] && xx+hb[0] < box[2]){
                    if(sy < cy){
                        if(yy+hb[3] > box[1]-1){
                            if(vy > 0) if(o.y+hb[3] >= box[1]-1) stepped = stepUp();
                            inside[1] = true;
                            if(!stepped){
                                o.y = box[1]-hb[3]-1;
                                if(o.vy > 0) o.vy = 0;
                            }
                            else{
                                //o.x++;
                                //o.z++;
                            }
                        }
                    }
                    else{
                        if(yy+hb[1]-1 < box[3]){
                            if(vy < 0) if(o.y+hb[1]-1 <= box[3]) stepped = stepUp();
                            inside[1] = true;
                            if(!stepped){
                                o.y = box[3]-hb[1]+1;
                                if(o.vy < 0) o.vy = 0;
                            }
                            else{
                                //o.x++;
                                //o.z++;
                            }
                        }
                    }
                }
            }
            if(inside[2]){
                ax = 0;
                ay = 0;
                az = 0;
                break;
            }
        }
        if(!inside[0]) o.x += vx;
        if(!inside[1]) o.y += vy;
        if(!inside[2]) o.z += vz;
        if(ax >= 1) ax--;
        else if(ax <= -1) ax++;
        else ax = 0;
        if(ay >= 1) ay--;
        else if(ay <= -1) ay++;
        else ay = 0;
        if(az >= 1) az--;
        else if(az <= -1) az++;
        else az = 0;
        if(inside.includes(true)) return;
    }
}
function moveObj_stepsFail(o,ax,ay,az=0){
    let sx = o.x;
    let sy = o.y;
    while(ax != 0 || ay != 0 || az != 0){
        let inside = [false,false,false];
        let vx = (ax>0?Math.min(1,ax):Math.max(-1,ax));
        let vy = (ay>0?Math.min(1,ay):Math.max(-1,ay));
        let vz = (az>0?Math.min(1,az):Math.max(-1,az));
        let tx = o.x+vx;
        let ty = o.y+vy;
        let tz = o.z+vz;
        for(let j = 0; j < colls.length; j++){
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            let bTop = box[5];
            if(box[7]){
                let sx2 = (box[0]-xx-Math.floor(hb[0]/2));
                let sy2 = (box[1]-yy-Math.floor(hb[1]/2));
                let boxW = box[3]-box[1];
                for(let yi = hb[1]; yi <= hb[3]; yi++){
                    for(let xi = hb[0]; xi <= hb[2]; xi++){
                        let ind = Math.floor(sx2)+xi-hb[0];
                        ind += (yi-hb[1])*boxW;
                        ind = Math.floor(ind);
                        if(box[5]+box[7][ind] > bTop) bTop = box[5]+box[7][ind];
                    }
                }
            }
            if(zz+hb[4] < bTop && zz+hb[4] >= bTop-1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = bTop-hb[4];
                    o.vz = 0;
                    o.grounded = true;
                    useBoxCol = false;
                }
            }
            else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }
            if(useBoxCol) if(zz+hb[4] < bTop-1 && (o.z+hb[5] >= box[4]+1)){
                function stepUp(){
                    if(zz+hb[4] < bTop && zz+hb[4] >= bTop-2){
                        o.z = bTop;
                        vz = 0;
                        o.grounded = true;
                        return true;
                    }
                    return false;
                }
                if(yy+hb[3] > box[1] && yy+hb[1] < box[3]){
                    if(sx < cx){
                        if(xx+hb[2] > box[0]-1){
                            inside[0] = true;
                            if(!stepUp()){
                                o.x = box[0]-hb[2]-1;
                                if(o.vx > 0) o.vx = 0;
                            }
                        }
                    }
                    else{
                        if(xx+hb[0]-1 < box[2]){
                            inside[0] = true;
                            if(!stepUp()){
                                o.x = box[2]-hb[0]+1;
                                if(o.vx < 0) o.vx = 0;
                            }
                        }
                    }
                }
                if(xx+hb[2] > box[0] && xx+hb[0] < box[2]){
                    if(sy < cy){
                        if(yy+hb[3] > box[1]-1){
                            inside[1] = true;
                            if(!stepUp()){
                                o.y = box[1]-hb[3]-1;
                                if(o.vy > 0) o.vy = 0;
                            }
                        }
                    }
                    else{
                        if(yy+hb[1]-1 < box[3]){
                            inside[1] = true;
                            if(!stepUp()){
                                o.y = box[3]-hb[1]+1;
                                if(o.vy < 0) o.vy = 0;
                            }
                        }
                    }
                }
            }
        }
        if(!inside[0]) o.x += vx;
        if(!inside[1]) o.y += vy;
        if(!inside[2]) o.z += vz;
        if(ax >= 1) ax--;
        else if(ax <= -1) ax++;
        else ax = 0;
        if(ay >= 1) ay--;
        else if(ay <= -1) ay++;
        else ay = 0;
        if(az >= 1) az--;
        else if(az <= -1) az++;
        else az = 0;
        if(inside.includes(true)) return;
    }
}

function moveObj(o,ax,ay,az=0){
    let sx = o.x;
    let sy = o.y;
    //let sz = o.z;
    while(ax != 0 || ay != 0 || az != 0){
        let inside = [false,false,false];
        let vx = (ax>0?Math.min(1,ax):Math.max(-1,ax));
        let vy = (ay>0?Math.min(1,ay):Math.max(-1,ay));
        let vz = (az>0?Math.min(1,az):Math.max(-1,az));
        let tx = o.x+vx;
        let ty = o.y+vy;
        let tz = o.z+vz;
        for(let j = 0; j < colls.length; j++){
            let tInside = [false,false,false];
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            if(zz+hb[4] < box[5] && zz+hb[4] >= box[5]-1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    tInside[2] = true;
                    o.z = box[5]-hb[4];
                    o.vz = 0;
                    o.grounded = true;
                    o.jumpZ = o.z;
                    useBoxCol = false;
                }
            }
            else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    tInside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }
            if(useBoxCol) if(zz+hb[4] < box[5]-1 && (o.z+hb[5] >= box[4]+1)){
                if(yy+hb[3] > box[1]+1 && yy+hb[1]+1 < box[3]){
                    if(sx < cx){
                        if(xx+hb[2] > box[0]-1){
                            inside[0] = true;
                            tInside[0] = true;
                            o.x = box[0]-hb[2]-1;
                            if(o.vx > 0) o.vx = 0;
                        }
                    }
                    else{
                        if(xx+hb[0]-1 < box[2]){
                            inside[0] = true;
                            tInside[0] = true;
                            o.x = box[2]-hb[0]+1;
                            if(o.vx < 0) o.vx = 0;
                        }
                    }
                }
                if(xx+hb[2] > box[0]+1 && xx+hb[0]+1 < box[2]){
                    if(sy < cy){
                        if(yy+hb[3] > box[1]-1){
                            inside[1] = true;
                            tInside[1] = true;
                            o.y = box[1]-hb[3]-1;
                            if(o.vy > 0) o.vy = 0;
                        }
                    }
                    else{
                        if(yy+hb[1]-1 < box[3]){
                            inside[1] = true;
                            tInside[1] = true;
                            o.y = box[3]-hb[1]+1;
                            if(o.vy < 0) o.vy = 0;
                        }
                    }
                }
            }
            let yCol = (yy+hb[3]+2 > box[1] && yy+hb[1]-2 < box[3]);
            let xCol = (xx+hb[2]+2 > box[0] && xx+hb[0]-2 < box[2]);
            if(xCol && yCol){
                if(o.jumpZ+hb[4] < box[5] && o.jumpZ+hb[4] >= box[5]-1
                    && o.z+hb[4] < box[5] && o.z+hb[4] >= box[5]-1){
                    o.z = box[5]-hb[4];
                    inside[2] = true;
                    tInside[2] = true;
                    o.vz = 0;
                    vz = 0;
                }
            }
            if(box[8]) if(tInside.includes(true)) box[8](o,box);
        }
        if(!inside[0]) o.x += vx;
        if(!inside[1]) o.y += vy;
        if(!inside[2]) o.z += vz;
        if(o == me) setCamPos(me.x-nob.centerX,me.y-nob.centerY,me.z);
        if(ax >= 1) ax--;
        else if(ax <= -1) ax++;
        else ax = 0;
        if(ay >= 1) ay--;
        else if(ay <= -1) ay++;
        else ay = 0;
        if(az >= 1) az--;
        else if(az <= -1) az++;
        else az = 0;
        if(inside.includes(true)) return false;
    }
    return true;
}

function moveObj___TRIEDFAILED(o,ax,ay,az=0){
    let sx = o.x;
    let sy = o.y;
    let sz = o.z;
    while(ax != 0 || ay != 0 || az != 0){
        let inside = [false,false,false];
        let vx = (ax>0?Math.min(1,ax):Math.max(-1,ax));
        let vy = (ay>0?Math.min(1,ay):Math.max(-1,ay));
        let vz = (az>0?Math.min(1,az):Math.max(-1,az));
        let tx = o.x+vx;
        let ty = o.y+vy;
        let tz = o.z+vz;
        for(let j = 0; j < colls.length; j++){
            let tInside = [false,false,false];
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            if(zz+hb[4] < box[5] && zz+hb[4] >= box[5]-1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    //inside[2] = 1;
                    //tInside[2] = true;
                    if(box[5]-zz <= 1 || box[5] <= 1.05){
                        o.z = box[5]-hb[4];
                        //vz = 0;
                        //o.vz = 0;
                        //o.z++;
                        tz = o.z+vz;
                        //o.grounded = true;

                        //console.log("ZZZ");
                    }
                    //o.z = box[5]-hb[4];
                    //o.vz = 0;
                    //o.grounded = true;
                    //o.jumpZ = o.z;
                    //useBoxCol = false;
                }
            }
            /*else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = 2;
                    tInside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }*/
            //let yCol = (yy+hb[3]+2 > box[1] && yy+hb[1]-2 < box[3]);
            //let xCol = (xx+hb[2]+2 > box[0] && xx+hb[0]-2 < box[2]);
            if(false) if(xCol && yCol){
                if(o.jumpZ+hb[4] < box[5] && o.jumpZ+hb[4] >= box[5]-1
                    && o.z+hb[4] < box[5] && o.z+hb[4] >= box[5]-1){
                    o.z = box[5]-hb[4];
                    inside[2] = 3;
                    tInside[2] = true;
                    o.vz = 0;
                    vz = 0;
                    inside[0] = 0;
                    inside[1] = 0;
                }
            }
            if(box[8]) if(tInside.includes(true)) box[8](o,box);
        }
        //////
        for(let j = 0; j < colls.length; j++){
            let tInside = [false,false,false];
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            if(zz+hb[4] < box[5] && zz+hb[4] >= box[5]-1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = 1;
                    tInside[2] = true;
                    /*if(box[5]-o.z <= 1 || box[5] <= 1.05){
                        o.z = box[5]-hb[4]+1;
                        vz = 0;
                        o.vz = 0;
                    }*/
                    o.z = box[5]-hb[4];
                    o.vz = 0;
                    o.grounded = true;
                    o.jumpZ = o.z;
                    useBoxCol = false;
                }
            }
            else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = 2;
                    tInside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }
            if(useBoxCol) if(zz+hb[4] < box[5]-1 && (o.z+hb[5] >= box[4]+1)){
                if(yy+hb[3] > box[1]+1 && yy+hb[1]+1 < box[3]){
                    if(sx < cx){
                        if(xx+hb[2] > box[0]-1){
                            inside[0] = 1;
                            tInside[0] = true;
                            o.x = box[0]-hb[2]-1;
                            if(o.vx > 0) o.vx = 0;
                        }
                    }
                    else{
                        if(xx+hb[0]-1 < box[2]){
                            inside[0] = 2;
                            tInside[0] = true;
                            o.x = box[2]-hb[0]+1;
                            if(o.vx < 0) o.vx = 0;
                        }
                    }
                }
                if(xx+hb[2] > box[0]+1 && xx+hb[0]+1 < box[2]){
                    if(sy < cy){
                        if(yy+hb[3] > box[1]-1){
                            inside[1] = 1;
                            tInside[1] = true;
                            o.y = box[1]-hb[3]-1;
                            if(o.vy > 0) o.vy = 0;
                        }
                    }
                    else{
                        if(yy+hb[1]-1 < box[3]){
                            inside[1] = 2;
                            tInside[1] = true;
                            o.y = box[3]-hb[1]+1;
                            if(o.vy < 0) o.vy = 0;
                        }
                    }
                }
            }
            //let yCol = (yy+hb[3]+2 > box[1] && yy+hb[1]-2 < box[3]);
            //let xCol = (xx+hb[2]+2 > box[0] && xx+hb[0]-2 < box[2]);
            if(false) if(xCol && yCol){
                if(o.jumpZ+hb[4] < box[5] && o.jumpZ+hb[4] >= box[5]-1
                    && o.z+hb[4] < box[5] && o.z+hb[4] >= box[5]-1){
                    o.z = box[5]-hb[4];
                    inside[2] = 3;
                    tInside[2] = true;
                    o.vz = 0;
                    vz = 0;
                    inside[0] = 0;
                    inside[1] = 0;
                }
            }
            if(box[8]) if(tInside.includes(true)) box[8](o,box);
        }
        if(!inside[0]) o.x += vx;
        if(!inside[1]) o.y += vy;
        if(!inside[2]) o.z += vz;
        /*if(inside[0] == 1){
            if(o.vx > 0) o.vx = 0;
        }
        else if(inside[0] == 2){
            if(o.vx < 0) o.vx = 0;
        }
        if(inside[1] == 1){
            if(o.vy > 0) o.vy = 0;
        }
        else if(inside[2] == 2){
            if(o.vy < 0) o.vy = 0;
        }
        if(inside[2] == 1) o.jumpZ = o.z;
        if(inside[2]) o.vz = 0;
        if(o.z < 0) o.z = 0;*/
        if(ax >= 1) ax--;
        else if(ax <= -1) ax++;
        else ax = 0;
        if(ay >= 1) ay--;
        else if(ay <= -1) ay++;
        else ay = 0;
        if(az >= 1) az--;
        else if(az <= -1) az++;
        else az = 0;
        if(inside.includes(true)) return;
    }
}

function drawShadow(x,y,sz,o,ll){
    if(sz <= 0) return;
    let l = (ll?ll:[
        [x-1,y-1,0],
        [x,y-1,0],
        [x-2,y,0],
        [x-1,y,0],
        [x,y,0],
        [x+1,y,0],
        [x-1,y+1,0],
        [x,y+1,0]
    ]);
    for(let i = 0; i < colls.length; i++){
        let c = colls[i];
        if(sz > c[5]) for(let j = 0; j < l.length; j++){
            let p = l[j];
            let check = true;
            if(p[0] > c[2]) check = false;
            else if(p[0] < c[0]) check = false;
            else if(p[1] > c[3]) check = false;
            else if(p[1] < c[1]) check = false;
            if(check) if(p[0] >= c[0] && p[0] <= c[2] && p[1] >= c[1] && p[1] <= c[3]){
                nob.setPixel_dep(p[0],p[1]-c[5],black,p[1]+(c[5]+1)*nob.height);
                p[2] = true;
            }
        }
    }
    if(o?!o.grounded:sz>0) for(let i = 0; i < l.length; i++){
        let p = l[i];
        if(!p[2]) nob.setPixel_dep(p[0],p[1],black,p[1]);
    }
}


//////////////////////////////////
//////////////////////////////////

function moveObj_OG(o,ax,ay,az=0){
    let sx = o.x;
    let sy = o.y;
    while(ax != 0 || ay != 0 || az != 0){
        let inside = [false,false,false];
        let vx = (ax>0?Math.min(1,ax):Math.max(-1,ax));
        let vy = (ay>0?Math.min(1,ay):Math.max(-1,ay));
        let vz = (az>0?Math.min(1,az):Math.max(-1,az));
        let tx = o.x+vx;
        let ty = o.y+vy;
        let tz = o.z+vz;
        for(let j = 0; j < colls.length; j++){
            let c = colls[j];
            let box = c;
            let cx = (box[0]+box[2])/2;
            let cy = (box[1]+box[3])/2;
            let hb = o.hitboxes[0];
            let xx = tx;
            let yy = ty;
            let zz = tz;
            let useBoxCol = true;
            if(zz+hb[4] < box[5] && zz+hb[4] >= box[5]-1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = box[5]-hb[4];
                    o.vz = 0;
                    o.grounded = true;
                    useBoxCol = false;
                }
            }
            else if(zz+hb[5] > box[4] && zz+hb[5] <= box[4]+1){
                let yCol = (yy+hb[3] >= box[1] && yy+hb[1] <= box[3]);
                let xCol = (xx+hb[2] >= box[0] && xx+hb[0] <= box[2]);
                if(xCol && yCol){
                    inside[2] = true;
                    o.z = box[4]-hb[5];
                    o.vz = 0;
                    useBoxCol = false;
                    if(o.z < 0){
                        useBoxCol = true;
                        o.z = 0;
                    }
                }
            }
            if(useBoxCol) if(zz+hb[4] < box[5]-1 && (o.z+hb[5] >= box[4]+1)){
                if(yy+hb[3] > box[1] && yy+hb[1] < box[3]){
                    if(sx < cx){
                        if(xx+hb[2] > box[0]-1){
                            inside[0] = true;
                            o.x = box[0]-hb[2]-1;
                            if(o.vx > 0) o.vx = 0;
                        }
                    }
                    else{
                        if(xx+hb[0]-1 < box[2]){
                            inside[0] = true;
                            o.x = box[2]-hb[0]+1;
                            if(o.vx < 0) o.vx = 0;
                        }
                    }
                }
                if(xx+hb[2] > box[0] && xx+hb[0] < box[2]){
                    if(sy < cy){
                        if(yy+hb[3] > box[1]-1){
                            inside[1] = true;
                            o.y = box[1]-hb[3]-1;
                            if(o.vy > 0) o.vy = 0;
                        }
                    }
                    else{
                        if(yy+hb[1]-1 < box[3]){
                            inside[1] = true;
                            o.y = box[3]-hb[1]+1;
                            if(o.vy < 0) o.vy = 0;
                        }
                    }
                }
            }
        }
        if(!inside[0]) o.x += vx;
        if(!inside[1]) o.y += vy;
        if(!inside[2]) o.z += vz;
        if(ax >= 1) ax--;
        else if(ax <= -1) ax++;
        else ax = 0;
        if(ay >= 1) ay--;
        else if(ay <= -1) ay++;
        else ay = 0;
        if(az >= 1) az--;
        else if(az <= -1) az++;
        else az = 0;
        if(inside.includes(true)) return;
    }
}

function setCamPos_eh(x,y,z){
    camX = x;
    camY = y;
    camZ = z;
    ctx.clearRect(0,0,can.width,can.height);
}
function setCamPos(x,y,z){
    mx = mxb+nob.camX;
    my = myb+nob.camY;
    nob.useCam = me.useCam;
    if(!me.useCam) return;
    nob.camX = x;
    nob.camY = y;
    //nob.camZ = z;
    nob2.camX = x*guiScale;
    nob2.camY = y*guiScale;
    //nob2.camZ = z*guiScale;
}

//VILLAGES
let env = tt.env;
let villageObj = {
    x:nob.centerX+30,
    y:nob.centerY,
    z:0,
    hitboxes:[],
    colls:[],
    anim:{
        i:0,
        c:0,
        d:0,
        f:null
    },
    world:mainWorld,
    cx:0,
    cy:0,
    myWorld:createEmptyWorld(true),
    doorOpen:0,
    closePl:null,
    update:function(){
        let img = tt.env.towns.house[0];
        if(!img) return;
        nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h,2);
        img = tt.env.towns.house[1];
        nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h+(25*nob.height),1);

        //chimney smoke
        particleSims.smoke(this.x-9+(Math.random()*3),this.y-16,this.z+22,-0.01,0.02,0.1);
        /*if(Math.random() < 0.1){
            let f = null;
            let img = black;
            let e = null;
            let vz = 0.2;
            pBullets.push([this.x-9+(Math.random()*3),this.y-16,this.z+22,-0.05,-0.05,vz,img,f,e]);
        }*/

        //water on roof
        if(me.world.isRaining){
            if(Math.random() < 0.2){
                let width = 11;
                let edge = width-2;
                let sx = this.x;
                let sz = this.z+26;
                let offx = Math.round((Math.random()-0.5)*edge*2);
                //sx += offx;
                //sz -= Math.abs(offx);
                let ssx = this.x;
                let yy = this.y-Math.floor(Math.random()*14);
                pBullets.push([sx+offx,yy,sz,0,0,0,false,function(o){
                    let col = colors.water;
                    
                    //nob.setPixel(o[0],o[1]-o[2],col);
                    o[8].lx = o[0];
                    o[8].ly = o[1];
                    o[8].lz = o[2];
                    
                    let dx = o[0]-sx;
                    let dx2 = o[0]-ssx;
                    let dxa = Math.abs(dx);
                    let dxa2 = Math.abs(dx2);
                    if(dxa >= width){
                        o[5] -= 0.05;
                        o[3] *= 0.95;
                    }
                    else{
                        //if(dx2 == 0) o[3] -= 0.005;
                        o[3] += 0.005*(1+dxa2/width*2)*(offx/Math.abs(offx));
                        o[2] = sz-dxa;
                    }
                    if(o[2] < 0){
                        particleSims.rain_spash(o[0],o[1],0);
                        removeBullet(pBullets,o);
                    }

                    nob.setPixel_dep(o[0],o[1]-o[2],col,o[1]+(26)*nob.height);
                },{
                    lx:sx+offx,
                    ly:yy,
                    lz:sz
                }]);
            }
        }
    },
    init:function(){
        let x = this.x;
        let y = this.y;
        let cc = [x-15,y-15,x+15,y,0,100,0];
        colls.push(cc);
        this.colls.push(cc);
        this.hitboxes.push([-20,-20,20,5,0,20]);
        
        let w = this.myWorld;
        w.bg = "black";
        let c = w.chunks["0,0"];
        let cx = nob.centerX;
        let cy = nob.centerY;
        c.floorCol = convert("sienna");
        c.update = function(){
            nob.drawRect(cx-20,cy-20,40,37,this.floorCol);
        };
        c.colls.push([cx-20-5,cy-20,cx-20,cy+20,0,100,0]);
        c.colls.push([cx+20,cy-20,cx+20+5,cy+20,0,100,0]);
        c.colls.push([cx-20-5,cy-20-5,cx+20+5,cy-20,0,100,0]);
        c.colls.push([cx-20-5,cy+20,cx+20+5,cy+20+5,0,100,0]);
        c.colls.push([0,0,nob.width,nob.height,200,300]);
        createDoor(mainWorld,mainWorld.chunks["0,0"],x,y,w,c,nob.centerX,nob.centerY+20,0);

        let cols = [
            convert("cornflowerblue"),
            convert("violet"),
            convert("mediumpurple")
        ];
        for(let i = 0; i < 3; i++){
            createPlant(env.plants.leaningFlower,x-6,80+i*5,0,true,cols[i]);
            createPlant(env.plants.leaningFlower,x+6,80+i*5,0,false,cols[i]);
        }
        createPlant(env.plantsL[2],x-13,78,0);
        createPlant(env.plantsL[1],x+12,78,0);

        createObj(env.towns.soil,x+24,y-4);
        createObj(env.towns.farm,x+24,y-4);
        createObj(env.towns.farm_wheat,x+24,y-4);
        
        //barrels

        worldObjs.medium_barrel(x-15,y-4,0,colors.water);
        worldObjs.medium_barrel(x-15,y-9,0,colors.water);
        //createObj(env.towns.medium_barrel,x-15,y-4,0,2,false,null,colors.water);
        //createObj(env.towns.medium_barrel,x-15,y-9,0,2,false,null,colors.water);
    }
};
sobjs.push(villageObj);
sobjs[sobjs.length-1].init();
worldObjs.water_well(nob.centerX,nob.centerY-20,1);
//createObj(env.towns.waterwell,nob.centerX,nob.centerY-20,0,2,false,[-8,-7,8,0,0,10,0]);

//WORLD OBJS

worldObjs.stick(nob.centerX-20,nob.centerY-20,0,0);
worldObjs.stick(nob.centerX-25,nob.centerY-10,0,1);
worldObjs.stick(nob.centerX-15,nob.centerY-15,0,0);
worldObjs.rock(nob.centerX-30,nob.centerY-20,0);
worldObjs.rock(nob.centerX-25,nob.centerY-23,0);
worldObjs.rock(nob.centerX-32,nob.centerY-26,0);
worldObjs.rock(nob.centerX-35,nob.centerY-18,0);

//worldObjs.tree1(nob.centerX-50,nob.centerY-20,0);
//worldObjs.tree1(nob.centerX-60,nob.centerY-40,0);
//worldObjs.tree1(nob.centerX-30,nob.centerY-50,0);
//worldObjs.tree1(nob.centerX-10,nob.centerY-30,0);
//SPAWN TREES TEST
initChunk(firstChunk);

//ALL SCREEN DITCH TEST
/*for(let y = 0; y < nob.width; y += 3){
    for(let x = 0; x < nob.width; x += 3){
        let d = createTilledDirt(x,y,true,1);
        d.up = true;
        d.upObj = d;
        d.down = true;
        d.downObj = d;
        d.left = true;
        d.leftObj = d;
        d.right = true;
        d.rightObj = d;
        sobjs.push(d);
    }
}*/

//MOVING COLLIDER TEST
/*var cx = nob.centerX;
var cy = nob.centerY;
var movingCube = [cx+20,cy+20,cx+25,cy+25,0,5,null,null,function(o,box){
    let e = box[9];
    if(o.z >= box[5]) moveObj(o,e.fx,e.fy,0);
},{
    lx:0,
    ly:0,
    fx:0,
    fy:0
}];
colls.push(movingCube);
subAnim(9999999,(i,t)=>{
    let x = cx+40;
    let y = cy+40;
    let r = 10;
    let a = (i%45)/45*Math.PI*2;
    let tx = Math.floor(Math.cos(a)*r+x);
    let ty = Math.floor(Math.sin(a)*r+y);
    movingCube[0] = tx;
    movingCube[1] = ty;
    movingCube[2] = tx+15;
    movingCube[3] = ty+15;
    let d = movingCube[9];
    d.fx = tx-d.lx;
    d.fy = ty-d.ly;
    d.lx = tx;
    d.ly = ty;
});*/

//ICONIC WOLF:
//createParticleAnim(tt.enemies.wolf.walk,30,30,0,false,0);

update();

window.addEventListener("resize",e=>{
  document.getElementById("guide").height = (can.offsetHeight-3)+"px";
});
document.getElementById("guide").height = (can.offsetHeight-3)+"px";
const b_guide = document.getElementById("guide");
function toggleGuide(){
  if(b_guide.style.visibility == "hidden" || b_guide.style.visibility == "") b_guide.style.visibility = "visible";
  else b_guide.style.visibility = "hidden";
}