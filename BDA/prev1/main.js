const can = document.getElementById("can");
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);
const can2 = document.getElementById("b_can");
can2.width = can.width*guiScale;
can2.height = can.height*guiScale;
const ctx2 = can2.getContext("2d");
const nob2 = new NobsinCtx(ctx2);
nob2.transparentBg = true;
nob2.background = [0,0,0,0];

var col = [200,20,0,255];
var objs = [];
var frames = 0;
var playerId = 0;

var keys = {};

function init(){
    col = convert("dodgerblue");
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

function runAnimator(o){
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
        a.i++;
        img = a.f[a.c];
        if(a.i > a.d){
            a.i = 0;
            if(a.onFrame) a.onFrame(o,a.c,a.f.length);
            a.c++;
            if(a.od == 1) hitHelper(a,o);
            if(a.c >= a.f.length){
                a.ti++;
                if(a.ti >= a.t){
                    a.i = 0;
                    a.c = 0;
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


function createEnemy(en,x,y,z,data){
    let d = {
        x,y,z,
        vx:0,vy:0,vz:0,
        visible:true,
        tint:[1,1,1],
        frames:0,
        isFlipped:false,
        action:{},
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
    if(o[8]) if(o[8].onDeath) o[8].onDeath(o);
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
var useBackground = true;
function update(){
    if(!paused) window.requestAnimationFrame(update);
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);
    nob.dep = new Uint8ClampedArray(nob.ssize);
    ids = new Uint8ClampedArray(nob.ssize);
    nob2.pixelCount = 0;
    nob2.buf = new Uint8ClampedArray(nob2.size);

    if(useBackground) nob.drawImage_basic(tt.scenes[0],0,0);

    //screens[0].draw();
    
    //enemies
    let enL = [];
    for(let i = 0; i < ens.length; i++){
        enL.push(ens[i]);
    }
    for(let i = 0; i < enL.length; i++){
        let en = enL[i];
        if(en.visible){
            let o = en;
            //PHYSICS
            if(o.z <= 0){
                o.z = 0;
                o.vz = 0;
                o.grounded = true;
            }
            o.vz -= 0.04;
            let drag = 0.03;
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
            o.x += o.vx;
            o.y += o.vy;
            o.z += o.vz;
            if(o.z < 0){
                o.z = 0;
                o.vz = 0;
                o.grounded = true;
            }

            if(o.z > 0) nob.drawCircle(o.x,o.y,2,black);

            if(!o.isAttacking){
                if(o.vx == 0 && o.vy == 0) startAnim(o,tt[o.type].idle,null,1,true,true)
                else startAnim(o,tt[o.type].walk,null,1,true);
            }



            //RENDERING
            let im = runAnimator(en);
            let img;
            if(!im) img = deepClone(en.img.img);
            else img = deepClone(im);//deepClone(en.img.img);
            img.data = tint(img.data,en.tint);
            if(o.origin == "bm") nob.drawImage_basic(img,en.x-8,en.y-16-en.z);
            else nob.drawImage_basic(img,en.x-Math.floor(img.w/2),en.y-Math.floor(img.h/2)-en.z);

            //RUN AI
            en.frames++;
            if(en.ai) en.ai();

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

    //players
    let pL = [];
    for(let i = 0; i < players.length; i++){
        pL.push(players[i]);
    }
    for(let i = 0; i < pL.length; i++){
        let o = pL[i];
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
                    if(wD.keybinds_pre) wD.keybinds_pre(o);
                }
            }

            if(mainW) if(mouseDown[2] || keys.q) if(mainW.getType() == WeaponType.Pistol){
                let range = 20;
                let click = mouseOnce(0);
                let amtHovered = 0;
                let select = mouseDown[2];
                if(!select){
                    o.locks = [];
                    o.locksRef = [];
                }
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
                            nob2.drawImage_basic(img,xx,yy);
                            /*if(!o.lockOnEn) if(pressOnce("q")){
                                o.lockOnEn = en;
                                o.lockOnHb = hb;
                            }*/
                        //}
                    }
                }
                if(amtHovered == 0 && click){
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
                }
    
                if(!o.smallInvOpen || keys.d){
                    let mainW = o.equip.weapon;
                    if(mainW) weaponData[mainW.getType()].keybinds(o);
                }
            }

            if(o.vx > 1) o.vx = 1;
            if(o.vx < -1) o.vx = -1;
            if(o.vy > 1) o.vy = 1;
            if(o.vy < -1) o.vy = -1;
        }
        nob.flipX = o.isFlipped;

        if(Math.abs(o.vx) < 0.1) o.vx = 0;

        if(!o.static){
            o.x += o.vx;
            o.y += o.vy;
            o.z += o.vz;
        }

        //drawChar(o);
        if(o.z > 0) nob.drawCircle(o.x,o.y,2,black);
        //nob.drawLine_smart(o.x,o.y,o.x,o.y-o.z,[40,40,40,255],1);

        if(!o.noRender){
            if(o.vx == 0 && o.vy == 0) anim.char(o,0);
            else anim.char(o,1);

            let img = runAnimator(o);
            if(img) nob.drawImage_basic(img,o.x-Math.floor(img.w/2),o.y-o.z-img.h);
        }

        if(o.update) o.update();

        //anim.char(o,3);
        //nob.flipX = !nob.flipX;
        //anim.char(o,2);
        nob.flipX = false;
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
    let objsL = [];
    for(let i = 0; i < objs.length; i++){
        objsL.push(objs[i]);
    }
    for(let i = 0; i < objsL.length; i++){
        let o = objsL[i];
        let img = runAnimator(o);
        if(img) nob.drawImage_basic(img,o.x-Math.floor(img.w/2),o.y-o.z-Math.floor(img.h/2));
        if(o.destroyAfterAnim){
            if(o.anim.f == null) removeObj(o);
        }
    }

    updateEvts();

    //GUI
    renderHUD(me);
    //

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
    ctx2.putImageData(new ImageData(nob2.buf,nob2.width,nob2.height),0,0);
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
    keys[key] = true;
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
        me.smallInvOpen = !me.smallInvOpen;
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
            if(o[2] > 0) nob.drawCircle(o[0],o[1],2,black); 
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

    if(o[0] < -20) removeBullet(p,o);
    else if(o[1] < -20) removeBullet(p,o);
    else if(o[0] >= nob.width+20) removeBullet(p,o);
    else if(o[1] >= nob.height+20) removeBullet(p,o);

    if(o[6]) if(o[7]) o[7](o);
    if(o[8]) if(o[8].hb){
        let hb = o[8].hb;
        let player = o[8].player;

        drawHitBoxPlayer({
            x:o[0],
            y:o[1],
            z:o[2]-o[8].h,
            ref:o,
            player,
            hitboxes:[hb]
        },hb,"a",null,true);

        let dx = o[0]-o[8].sx;
        let dy = o[1]-o[8].sy;
        let dz = o[2]-o[8].sz;
        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist > 70) removeBullet(p,o,false);
    }
}