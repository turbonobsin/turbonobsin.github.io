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
    if(!world) world = mainWorld;
    if(cx == null) cx = 0;
    if(cy == null) cy = 0;
    let d = {
        world,cx,cy,chunk:world[cx+","+cy],
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
    ens.push(d);
    if(d.init) d.init();
    return d;
}
function initAttack(o){
    o.isAttacking = true;
    o.atkI++;
    if(frames-o.atkLast > 10) o.atkI = 0;
    if(o.atkI > 2) o.atkI = 0;
    o.smallInvOpen = false;
    //o.atkLast = frames;
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
function update(){
    if(!paused) window.requestAnimationFrame(update);
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

    //TEST TEXT
    nob2.drawText("ROCK GOLLUM",0,3,white,black,false,false);

    for(let i = 0; i < colls.length; i++){
        let c = colls[i];
        if(c[6] == null){
            nob.drawRect_dep(c[0],c[3]-c[5],c[2]-c[0],c[5]-c[4],black,c[3],2);
            let dep = c[1]+c[5]*nob.height;
            nob.drawRect_dep(c[0],c[1]-c[5],c[2]-c[0],c[3]-c[1],collDBG_0,dep,1);

            nob.drawLine_smart_dep(c[0],c[1]-c[5],c[2]-1,c[1]-c[5],collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[2]-1,c[1]-c[5],c[2]-1,c[3]-c[5]-1,collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[2]-1,c[3]-c[5]-1,c[0],c[3]-c[5]-1,collDBG_1,1,dep+nob.height);
            nob.drawLine_smart_dep(c[0],c[3]-c[5]-1,c[0],c[1]-c[5],collDBG_1,1,dep+nob.height);
        }

        /*nob.drawLine_smart(c[0],c[1]-c[4],c[0],c[1]-c[5],black,1);
        nob.drawLine_smart(c[2],c[1]-c[4],c[2],c[1]-c[5],black,1);

        nob.drawLine_smart(c[0],c[1]-c[4],c[2],c[1]-c[4],gray,1);
        nob.drawLine_smart(c[2],c[1]-c[4],c[2],c[3]-cs[4],gray,1);
        nob.drawLine_smart(c[2],c[3]-c[4],c[0],c[3]-c[4],gray,1);
        nob.drawLine_smart(c[0],c[3]-c[4],c[0],c[1]-c[4],gray,1);

        nob.drawLine_smart(c[0],c[1]-c[5],c[2],c[1]-c[5],white,1);
        nob.drawLine_smart(c[2],c[1]-c[5],c[2],c[3]-c[5],white,1);
        nob.drawLine_smart(c[2],c[3]-c[5],c[0],c[3]-c[5],white,1);
        nob.drawLine_smart(c[0],c[3]-c[5],c[0],c[1]-c[5],white,1);

        nob.drawLine_smart(c[2],c[3],c[2],c[3]-c[5],black,1);
        nob.drawLine_smart(c[0],c[3],c[0],c[3]-c[5],black,1);*/
    }

    setCamPos(me.x-nob.centerX,me.y-nob.centerY,me.z);

    //screens[0].draw();

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
    for(let i = 0; i < ens.length; i++){
        enL.push(ens[i]);
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

            //if(!im) img = deepClone(en.img.img);
            //else img = deepClone(im);//deepClone(en.img.img);
            //img.data = tint(img.data,en.tint);
            if(o.origin == "bm") nob.drawImage_basic_tint2_dep(img,en.x-img.w/2,en.y-img.h-en.z,en.tint,en.tint2,en.y+(en.z)*nob.height,2,outline);
            else nob.drawImage_basic_tint2_dep(img,en.x-Math.floor(img.w/2),en.y-Math.floor(img.h/2)-en.z,en.tint,en.tint2,en.y+(en.z)*nob.height,2,outline);

            //RUN AI
            en.frames++;
            runEffect(en);
            if(en.frames%selfDelay == 0) if(en.ai) en.ai();
            if(isTick) if(en.tick) en.tick();

            /*let res = drawHitBox(o,o.hitboxes[0],null,function(o,hb,p,res){
                o.vx = 0;
                o.vy = 0;
                o.vz = 0;
                //o.action = {};
                o.action.move = -1;
                //o.action.jump = true;
                //o.z += 2;
            });
            if(res){
                let who = res.who;
                let hb = res.box;
                let dx = o.x-(who.x);
                let dy = o.y-(who.y);
                let dz = o.z-(who.z);
                o.x += dx/2;
                o.y += dy/2;
                o.z += dz/2;
            }*/

            //hitbox debug
            if(false){
                let x = en.x;
                let y = en.y;
                for(let bb = 0; bb < en.hitboxes.length; bb++){
                    let b = en.hitboxes[bb];
                    nob.drawLine_smart(x+b[0],y+b[1],x+b[2],y+b[1],[0,0,255,255],1);
                    nob.drawLine_smart(x+b[0],y+b[3],x+b[2],y+b[3],[0,0,255,255],1);
                    nob.drawLine_smart(x+b[0],y+b[1],x+b[0],y+b[3],[0,0,255,255],1);
                    nob.drawLine_smart(x+b[2],y+b[1],x+b[2],y+b[3],[0,0,255,255],1);

                    nob.drawLine_smart(x+b[2],y+b[1]-b[4],x+b[2],y+b[1]-b[5],[100,100,255,255],1);
                    nob.drawLine_smart(x+b[0],y+b[1]-b[5],x+b[2],y+b[1]-b[5],[100,100,255,255],1);
                }
            }

            nob.flipX = false;
        }
    }

    //nob.drawCircle_grad(enemy1.x,enemy1.y-6,24,[180,180,180,10]);
    //drawEnemy1(enemy1);

    /*ctx2.clearRect(0,0,nob.width,nob.height);
    ctx2.fillStyle = "white";
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.moveTo(20,20);

    ctx2.bezierCurveTo(20,20,25,18,30,20);
    //ctx2.bezierCurveTo(20,25,20,62.5,20,62.5);

    //ctx2.bezierCurveTo(20,80,40,102,75,120);
    //ctx2.bezierCurveTo(110,102,130,80,130,62.5);

    //ctx2.bezierCurveTo(130,62.5,130,25,100,25);
    //ctx2.bezierCurveTo(85,25,75,37,75,40);

    ctx2.stroke();*/

    //SMART OBJS -PRE-
    let objsL = [];
    for(let i = 0; i < sobjs.length; i++){
        objsL.push(sobjs[i]);
    }
    for(let i = 0; i < objsL.length; i++){
        let o = objsL[i];
        if(o.preUpdate) o.preUpdate();
        if(o.lhover) o.lhover = false;
    }

    //players
    let pL = [];
    for(let i = 0; i < players.length; i++){
        pL.push(players[i]);
    }
    for(let i = 0; i < pL.length; i++){
        let o = pL[i];
        o.hoverMenu = false;
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
    for(let i = 0; i < doors.length; i++){
        let d = doors[i];

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
    for(let i = 0; i < bullets.length; i++){
        bulls.push(bullets[i]);
    }
    for(let i = 0; i < bulls.length; i++){
        let o = bulls[i];
        runBullet(o,bullets);
    }
    //Player Bullets
    bulls = [];
    for(let i = 0; i < pBullets.length; i++){
        bulls.push(pBullets[i]);
    }
    for(let i = 0; i < bulls.length; i++){
        let o = bulls[i];
        runBullet(o,pBullets);
    }

    //GLOBAL OBJS
    function removeObj(o){
        objs.splice(objs.indexOf(o),1);
    }
    objsL = [];
    for(let i = 0; i < objs.length; i++){
        objsL.push(objs[i]);
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

    updateEvts();

    runTime(me.world);

    //LIGHTS
    {
        //nob.drawCircle_other(lights,nob.width,4,x,y,20,white);
        /*for(let j = 0; j < r; j++) for(let i = 0; i < r; i++){
            let xx = x+i;
            let yy = y+j;
            let ind = (xx+yy*nob.width)*4;
            /*nob.buf[ind] *= 4;
            nob.buf[ind] += 40;
            nob.buf[ind+1] *= 4;
            nob.buf[ind+1] += 40;
            nob.buf[ind+2] *= 4;
            nob.buf[ind+2] += 40;*/
            //lights[ind] = Math.floor((lights[ind]+255)/2);
            //lights[ind+1] = Math.floor((lights[ind+1]+255)/2);
            //lights[ind+2] = Math.floor((lights[ind+2]+255)/2);
            //lights[ind+3] += 20;
        //}*/
    }

    //WEATHER EFFECTS
    let light = me.world.lightCast;
    let cast = light;
    let raining = me.world.isRaining;
    //cast += me.world.rainCast;
    for(let i = 0; i < nob.size; i += 4){
        if(lights[i+3] != 0){
            let isBlack = (!nob.buf[i] && !nob.buf[i+1] && !nob.buf[i+2]);

            nob.buf[i] -= (cast>=10?(20*(cast-10)):0);
            nob.buf[i] += (cast<=10?Math.sin(cast/10*Math.PI)*30:0);
            nob.buf[i+1] -= (cast>=10?(20*(cast-10)):0);
            nob.buf[i+2] += (cast>=20?(70/cast):0);

            if(!isBlack){
                nob.buf[i] += light*4;
                nob.buf[i+1] += light*4;
                nob.buf[i+2] += light*4;
            }
        }
        else{
            if(raining){ //raining
                //nob.buf[i] -= 20*cast;
                
                //nob.buf[i] -= (cast>=10?(20*(cast-10)):0);
                //nob.buf[i] += (cast<=10?Math.sin(cast/10*Math.PI)*30:0);
                //nob.buf[i+1] -= (cast>=10?(20*(cast-10)):0);
                
                //nob.buf[i+1] -= 20*cast;
                //nob.buf[i+2] += (cast>=1?(50/cast):50*cast); //50
                /*if(cast <= 10){
                    nob.buf[i+2] += (cast>=20?(70/cast):0)+me.world.rainCast*10;
                    nob.buf[i] -= me.world.rainCast*5;
                    nob.buf[i+1] -= me.world.rainCast*5;
                }
                else*/{
                    nob.buf[i] -= me.world.rainCast*5;
                    nob.buf[i+1] += me.world.rainCast;
                    nob.buf[i+2] += me.world.rainCast*10;
                }
            }
            { //else
                nob.buf[i] -= (cast>=10?(20*(cast-10)):0);
                nob.buf[i] += (cast<=10?Math.sin(cast/10*Math.PI)*30:0);
                nob.buf[i+1] -= (cast>=10?(20*(cast-10)):0);
                nob.buf[i+2] += (cast>=20?(70/cast):0);
            }
        }
    }
    if(me.world.isRaining){
        let chance = 1; //0.5 //0.3 good normal rain
        let amt = me.world.rainAmt; //1
        //let cast = 4; //20 scary //4 night //2 storm //1 normal rain
        if(Math.random() < chance){ //0.5
            for(let j = 0; j < amt; j++) pBullets.push([Math.random()*nob.width,Math.random()*nob.height,nob.height+10,0,0,-2,gray,function(o){ //100 z
                o[3] -= 0.01;
                let remove = false;
                if(o[2] < 0) remove = true;
                if(remove){
                    removeBullet(pBullets,o);
                    for(let i = -1; i <= 1; i += 2){
                        let sz = o[2];
                        pBullets.push([o[0],o[1],sz,(Math.random()-0.5)/3,(Math.random()-0.5)/3,0.8,lightgray,function(o){ //4 //1 //way?(i/6):0,!way?(i/6):0
                            o[5] -= 0.1;
                            if(o[2] < o[8].sz) removeBullet(pBullets,o);
                        },{sz}]);
                    }
                }
            }]);
        }
    }
    if(frames-me.world.lastRainTime > (!me.world.isRaining?1000:3000)) if(frames%60 == 0) if(Math.random() < 0.1){
        if(!me.world.isRaining){
            startRain(me.world);
            if(Math.random() < 0.3) me.world.rainAmt = Math.floor(Math.random()*4)+1;
            else me.world.rainAmt = 1;
        }
        else stopRain(me.world);
        me.world.lastRainTime = frames;
    }

    //LIGHTS
    {
        let x = 30;
        let y = 30;
        let r = 20;
        if(false) for(let j = 0; j < r; j++) for(let i = 0; i < r; i++){
            let xx = x+i;
            let yy = y+j;
            let ind = (xx+yy*nob.width)*4;
            nob.buf[ind] *= 4;
            nob.buf[ind] += 40;
            nob.buf[ind+1] *= 4;
            nob.buf[ind+1] += 40;
            nob.buf[ind+2] *= 4;
            nob.buf[ind+2] += 40;
            //lights[ind] = Math.floor((lights[ind]+255)/2);
            //lights[ind+1] = Math.floor((lights[ind+1]+255)/2);
            //lights[ind+2] = Math.floor((lights[ind+2]+255)/2);
            //lights[ind+3] += 20;
        }
    }

    //mask: //nob.drawRect_dep(0,0,nob.width,nob.height,me.world.bgCol,0);

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
update();


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
            else nob.drawImage_basic(o[6],o[0]-Math.floor(o[6].w/2),o[1]-o[2]-Math.floor(o[6].h/2));
        }
        else{
            //nob.setPixel(o[0],o[1],black);
            nob.setPixel(o[0],o[1]-o[2],o[6]);
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
    if(!me.useCam) return;
    nob.useCam = true;
    nob.camX = x;
    nob.camY = y;
    //nob.camZ = z;
    nob2.camX = x*guiScale;
    nob2.camY = y*guiScale;
    //nob2.camZ = z*guiScale;
}

//VILLAGES
let env = tt.env;
sobjs.push({
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
    myWorld:createEmptyWorld(),
    doorOpen:0,
    closePl:null,
    update:function(){
        let img = tt.env.towns.house[0];
        if(!img) return;
        nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h,2);
        img = tt.env.towns.house[1];
        nob.drawImage_basic_dep(img,this.x-img.w/2,this.y-img.h,false,this.y-img.h+(25*nob.height),1);

        //chimney smoke
        if(Math.random() < 0.1){
            let f = null;
            let img = black;
            let e = null;
            let vz = 0.2;
            pBullets.push([this.x-9+(Math.random()*3),this.y-16,this.z+22,-0.05,-0.05,vz,img,f,e]);
        }

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

                    nob.setPixel(o[0],o[1]-o[2],col);
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

        worldObjs.large_barrel(x-15,y-4,0,colors.water);
        worldObjs.large_barrel(x-15,y-9,0,colors.water);
        //createObj(env.towns.medium_barrel,x-15,y-4,0,2,false,null,colors.water);
        //createObj(env.towns.medium_barrel,x-15,y-9,0,2,false,null,colors.water);
    }
});
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

//Animals Test
for(let i = 0; i < 20; i++){
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let l = getNonPassivesInRange(x,y,0,15);
    if(l.length == 0) createEnemy(ENEMIES.animals.cow,x,y,0);
}

//worldObjs.tree1(nob.centerX-50,nob.centerY-20,0);
//worldObjs.tree1(nob.centerX-60,nob.centerY-40,0);
//worldObjs.tree1(nob.centerX-30,nob.centerY-50,0);
//worldObjs.tree1(nob.centerX-10,nob.centerY-30,0);
//SPAWN TREES TEST
if(false) for(let i = 0; i < 24; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let l = getNonPassivesInRange(x,y,0,15);
    if(l.length == 0){
        let d = worldObjs.tree1(x,y,10);
        d.l = Math.ceil(Math.random()*6+4);
        d.w = Math.ceil(Math.random()*2);
        d.w = 1;
        d.l *= 2;
        d.startW = d.w;
        d.hp = 10*d.w;
    }
}

/*subAnim(240,function(i,t){
    if(i == t-1){
        for(let i = 0; i < sobjs.length; i++){
            let s = sobjs[i];
            if(s.gId == "tree1"){
                s.breaking = true;
            }
        }
    }
});*/

for(let i = 0; i < 100; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let amt = Math.ceil(Math.random()*10);
    for(let j = 0; j < amt; j++){
        let offX = (Math.random()-0.5)*10;
        let offY = (Math.random()-0.5)*10;
        worldObjs.tall_grass(x+offX,y+offY,0,Math.floor(Math.random()*4)+2);
    }
}
for(let i = 0; i < 50; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let amt = Math.ceil(Math.random()*10);
    for(let j = 0; j < amt; j++){
        let offX = (Math.random()-0.5)*10;
        let offY = (Math.random()-0.5)*10;
        worldObjs.tall_grass(x+offX,y+offY,0,Math.floor(Math.random()*4)+2,[60,76,33]);
    }
}
for(let i = 0; i < 5; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let amt = Math.ceil(Math.random()*3);
    for(let j = 0; j < amt; j++){
        let offX = (Math.random()-0.5)*20;
        let offY = (Math.random()-0.5)*20;
        let l = getNonPassivesInRange(x+offX,y+offY,0,15);
        if(l.length == 0) createObj(tt.env.tent[Math.floor(Math.random()*2)],x+offX,y+offY,0,2);
    }
}
for(let i = 0; i < 50; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let amt = 1;
    for(let j = 0; j < amt; j++){
        let l = getNonPassivesInRange(x,y,0,30);
        if(l.length == 0) createObj(tt.env.rock[0],x,y,0,2,Math.random()<0.5);
    }
}
for(let i = 0; i < 50; i++){ //24
    let x = Math.floor(Math.random()*nob.width);
    let y = Math.floor(Math.random()*nob.height);
    let amt = 1;
    for(let j = 0; j < amt; j++){
        let l = getNonPassivesInRange(x,y,0,5);
        if(l.length == 0) worldObjs.campfire(x,y,0,true);
    }
}

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

createParticleAnim(tt.enemies.wolf.walk,30,30,0,false,0);