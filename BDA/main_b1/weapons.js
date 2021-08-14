const WeaponType = Object.freeze({
    Katana:0,
    Pistol:1,
    Sniper:2,
    Wand:3,
    Staff:4,
    Wild:10
});
const wepIcons = [
    tl.load("icons/katana_icon.png"),
    tl.load("icons/pistol_icon.png"),
    tl.load("icons/sniper_icon.png"),
    tl.load("icons/wand_icon.png"),
    tl.load("icons/staff_icon.png")
];
wepIcons[10] = tl.load("icons/wild_icon.png");
const weaponData = {
    0:{ //Katana
        keybinds:function(o){
            if(!o.isAttacking){
                if(o.ep >= 2) if(keys.s){
                    initAttack(o);
                    startAnim(o,tt.char.swirl1,1);
                    o.ep -= 2;
                }
                if(keys.d){
                    initAttack(o);
                    startAnim(o,tt.char["swing"+(o.atkI+1)],1);
                }
                if(keys.a){
                    initAttack(o);
                    startAnim(o,tt.char.stab1,1);
                }
            }
        }
    },
    1:{ //Pistol
        keybinds:function(o){
            if(o.gunCooldown > 0) o.gunCooldown--;
            if(o.gunCooldown < 0) o.gunCooldown = 0;
            if(mouseDown[0]) if(o.gunCooldown == 0){
                if(!o.lockOnEn){
                    let speed = 2;
                    let coolMax = o.gunMaxCooldown;
                    if(keys.shift) if(o.ep >= 1){
                        o.ep--;
                        coolMax /= 2;
                    }
                    if(keys.c) if(o.ep >= 1){
                        o.ep -= 4;
                        coolMax /= 4;
                        speed *= 2;
                    }
                    coolMax = Math.floor(coolMax);
                    o.gunCooldown = coolMax;
                    o.isAttacking = true;
                    let dx = mx-o.x;
                    let dy = my-o.y;
                    let a = Math.atan2(dy,dx);
                    let tx = Math.cos(a)*speed;
                    let ty = Math.sin(a)*speed;
                    //bullets.push([o.x,o.y,o.z,tx,ty,o.targZ||0,tt.bullets.small]);
                    pBullets.push([o.x,o.y,o.z,tx,ty,o.targZ,tt.bullets.small,function(o2){
                        let hb = [-1,-1,1,1,-1,1,"bullet"];
                        drawHitBoxPlayer({
                            x:o2[0],
                            y:o2[1],
                            z:o2[2],
                            ref:o2,
                            player:o,
                            hitboxes:[hb]
                        },hb,"a",null,true);

                        let dx = o2[0]-o2[8].sx;
                        let dy = o2[1]-o2[8].sy;
                        let dz = o2[2]-o2[8].sz;
                        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        if(dist > 70) removeBullet(pBullets,o2,false);
                    },{sx:o.x,sy:o.y,sz:o.z}]);
                }
                else{
                    o.isAttacking = true;
                    let coolMax = o.gunMaxCooldown;
                    o.gunCooldown = coolMax;
                    let hb = me.lockOnHb;
                    let en = me.lockOnEn;
                    let tx = en.x+(hb[0]+hb[2])/2;
                    let ty = en.y+(hb[1]+hb[3])/2;
                    let tz = en.z+(hb[4]+hb[5])/2;
                    let dx = tx-me.x;
                    let dy = ty-me.y;
                    let dz = tz-me.z;
                    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                    let speed = 2;
                    let vx = dx/dist*speed;
                    let vy = dy/dist*speed;
                    let vz = dz/dist*speed;
                    pBullets.push([me.x,me.y,me.z+2,vx,vy,vz,tt.bullets.small,null,{
                        hb:[-1,-1,1,1,-1,1],
                        player:me,
                        sx:me.x,
                        sy:me.y,
                        sz:me.z+2,
                        h:2
                    }]);
                }
            }
            if(!mouseDown[0]) o.isAttacking = false;
        },
        mouseUp:function(button,o){
            if(button == 2) if(o.gunCooldown == 0) if(me.locks.length > 0) if(o.ep >= me.locks.length){
                let coolMax = o.gunMaxCooldown;
                o.gunCooldown = coolMax;
                o.isAttacking = true;
                o.ep -= me.locks.length;
                for(let i = 0; i < me.locks.length; i++){
                    let hb = me.locks[i];
                    let en = me.locksRef[i];
                    let tx = en.x+(hb[0]+hb[2])/2;
                    let ty = en.y+(hb[1]+hb[3])/2;
                    let tz = en.z+(hb[4]+hb[5])/2;
                    let dx = tx-me.x;
                    let dy = ty-me.y;
                    let dz = tz-me.z;
                    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                    let speed = 2;
                    let vx = dx/dist*speed;
                    let vy = dy/dist*speed;
                    let vz = dz/dist*speed;
                    pBullets.push([me.x,me.y,me.z+2,vx,vy,vz,tt.bullets.small,null,{
                        hb:[-1,-1,1,1,-1,1],
                        player:me,
                        sx:me.x,
                        sy:me.y,
                        sz:me.z+2,
                        h:2
                    }]);
                }
                me.locks = [];
                me.locksRef = [];
            }
        },
        keybinds_kb:function(o){
            if(o.aimDir == null) o.aimDir = Math.PI/2;
            o.aimDir %= 6.28;
            if(o.aimDir < 0) o.aimDir += Math.PI*2;
            let r = {};
            r.d = 0;
            r.e = Math.PI/4;
            r.w = Math.PI/2;
            r.q = Math.PI*0.75;
            r.a = Math.PI;
            r.z = Math.PI*1.25;
            r.x = Math.PI*1.5;
            r.c = Math.PI*1.75;
            if(keys.shift){
                let speed = 3;
                let tx = Math.cos(o.aimDir)*speed;
                let ty = -Math.sin(o.aimDir)*speed;
                bullets.push([o.x,o.y,o.z+4,tx,ty,o.targZ?Math.max(Math.min(0.1,o.targZ-(o.z+4)),-0.1):0,tt.bullets.dirtball]);
            }
            if(!o.lockOnEn){
                let deadzone = 0.1;
                let speed = 0.02;
                if(keys.e) o.aimDir -= speed;
                if(keys.q) o.aimDir += speed;
                speed = 0.12;
                if(keys.d){
                    if(o.aimDir > deadzone && o.aimDir <= Math.PI) o.aimDir -= speed;
                    else if(o.aimDir > Math.PI && o.aimDir < Math.PI*2-deadzone) o.aimDir += speed;
                    else o.aimDir = 0;
                }
                if(keys.a){
                    if(o.aimDir < Math.PI-deadzone && o.aimDir >= 0) o.aimDir += speed;
                    else if(o.aimDir > Math.PI+deadzone && o.aimDir < Math.PI*2) o.aimDir -= speed;
                    else o.aimDir = Math.PI;
                }
                if(keys.w){
                    if(o.aimDir < Math.PI/2 ? (o.aimDir < Math.PI/2-deadzone && o.aimDir >= 0)
                    : (o.aimDir >= Math.PI*1.5)) o.aimDir += speed;
                    else if(o.aimDir > Math.PI/2+deadzone && o.aimDir < Math.PI*1.5) o.aimDir -= speed;
                    else o.aimDir = Math.PI/2;
                }
                if(keys.s){
                    if(o.aimDir > Math.PI*1.5 ? (o.aimDir > Math.PI*1.5+deadzone && o.aimDir <= Math.PI*2)
                    : (o.aimDir <= Math.PI/2)) o.aimDir -= speed;
                    else if(o.aimDir < Math.PI*1.5-deadzone && o.aimDir > Math.PI/2) o.aimDir += speed;
                    else o.aimDir = Math.PI*1.5;
                }
            }
            else{
                let en = o.lockOnEn;
                let hb = o.lockOnHb;
                let hx = en.x+(hb[0]+hb[2])/2;
                let hy = en.y+(hb[1]+hb[3])/2;
                let dx = hx-o.x;
                let dy = hy-o.y;
                let hz = en.z+(hb[4]+hb[5])/2;
                o.targZ = hz;
                o.aimDir = Math.atan2(-dy,dx);
            }
        }
    },
    2:{ //Sniper
        keybinds:function(o){
            if(o.gunCooldown > 0) o.gunCooldown--;
            if(o.gunCooldown < 0) o.gunCooldown = 0;
            if(mouseDown[0]) if(o.gunCooldown == 0){
                let speed = 4;
                let exDamage = 0;
                let coolMax = o.gunMaxCooldown*6;
                if(keys.shift) if(o.ep >= 1){
                    o.ep--;
                    coolMax /= 2;
                }
                if(keys.c) if(o.ep >= 1){
                    o.ep -= 4;
                    coolMax /= 4;
                    speed *= 2;
                }
                coolMax = Math.floor(coolMax);
                o.gunCooldown = coolMax;
                o.isAttacking = true;
                let dx = mx-o.x;
                let dy = my-o.y;
                let a = Math.atan2(dy,dx);
                let tx = Math.cos(a)*speed;
                let ty = Math.sin(a)*speed;
                pBullets.push([o.x,o.y,o.z,tx,ty,o.targZ,black,function(o2){
                    let hb = [-1,-1,1,1,-1,1,"bullet"];
                    drawHitBoxPlayer({
                        x:o2[0],
                        y:o2[1],
                        z:o2[2],
                        ref:o2,
                        player:o,
                        hitboxes:[hb]
                    },hb,"a",null,true,exDamage);

                    let dx = o2[0]-o2[8].sx;
                    let dy = o2[1]-o2[8].sy;
                    let dz = o2[2]-o2[8].sz;
                    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                    if(dist > 100) removeBullet(pBullets,o2,false);
                },{sx:o.x,sy:o.y,sz:o.z}]);
            }
            if(!mouseDown[0]) o.isAttacking = false;
        }
    },
    3:{ //Wand
        mouseUp:function(button,o){
            if(button == 0){
                if(o.chargeTime == 0){
                    let idY = o.spellY;
                    let idX = o.spellX;
                    let mD = magicData[idY][idX];
                    if(idX == 0){
                        switch(idY){
                            case 0: //fire
                                if(o.ep >= 4){
                                    o.ep -= 4;
                                    let vx = 0;
                                    let vy = 0;
                                    let vz = 0;
                                    let ang = 0;
                                    let ttx = 0;
                                    let tty = 0;
                                    if(o.lockOnEn){
                                        let hb = o.lockOnHb;
                                        let en = o.lockOnEn;
                                        let tx = en.x+(hb[0]+hb[2])/2;
                                        let ty = en.y+(hb[1]+hb[3])/2;
                                        let tz = en.z+(hb[4]+hb[5])/2;
                                        let dx = tx-o.x;
                                        let dy = ty-o.y;
                                        let dz = tz-(o.z+4);
                                        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                                        let speed = 1.5;
                                        vx = dx/dist*speed;
                                        vy = dy/dist*speed;
                                        vz = dz/dist*speed;
                                        ang = Math.atan2(vy,vx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                    }
                                    else{
                                        let dx = mx-o.x;
                                        let dy = my-o.y;
                                        ang = Math.atan2(dy,dx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                        vx = ttx;
                                        vy = tty;
                                        vz = 0;
                                    }
                                    ang *= -1;
                                    ang += Math.PI/2;
                                    let x = o.x+ttx*4;
                                    let y = o.y+tty*4;
                                    let z = o.z+4;
                                    o.cooldown = 0;
                                    o.isAttacking = true;
                                    pBullets.push([x,y,z,vx,vy,vz,false,function(o){
                                        let frame = Math.floor((frames%20)/5);
                                        let img = tt.magic.fire2[frame];
                                        o[8].nob.buf = new Uint8ClampedArray(o[8].nob.size);
                                        o[8].nob.dep = new Uint8ClampedArray(o[8].nob.ssize);
                                        o[8].nob.drawImage_warp(img,32,32,1,1,ang,0);
                                        nob.drawImage_basic(fromNob(o[8].nob),o[0]-32,o[1]-o[2]-32);
                                        //shadow
                                        drawShadow(o[0],o[1],o[2],o);
                                        //nob.drawCircle(o[0],o[1],2,black);

                                        //effect
                                        if(frames%2==0) pBullets.push([o[0],o[1],o[2],Math.random()/2-0.25,Math.random()/2-0.25,0,black,function(o2){
                                            //o2[5] -= 0.05;
                                            let e = o2[8];
                                            e.count++;
                                            if(e.count > 20) removeBullet(pBullets,o2);
                                        },{
                                            count:0
                                        }]);
                                        //
                                    },{
                                        noShadow:true,
                                        nob:registerNob(null,64,64).nob,
                                        hb:[-2,-2,2,2,-2,2,"fireball"],
                                        player:o,
                                        sx:x,
                                        sy:y,
                                        sz:z,
                                        h:4,
                                        element:0,
                                        onDeath:function(o){
                                            let hb = [-8,-8,8,8,-6,6,"fireballBlast"];
                                            drawHitBoxPlayer({
                                                x:o[0],
                                                y:o[1],
                                                z:o[2],
                                                ref:o,
                                                player:o[8].player,
                                                hitboxes:[hb],
                                                element:0
                                            },hb,"b");
                                            createParticleAnim(tt.particles.smoke[0],o[0],o[1],o[2],true);
                                        }
                                    }]);
                                }
                                break;
                            case 1: //Ice
                                if(o.ep >= 9){
                                    o.ep -= 9;
                                    let vx = 0;
                                    let vy = 0;
                                    let ang = 0;
                                    let ttx = 0;
                                    let tty = 0;
                                    if(o.lockOnEn){
                                        let hb = o.lockOnHb;
                                        let en = o.lockOnEn;
                                        let tx = en.x+(hb[0]+hb[2])/2;
                                        let ty = en.y+(hb[1]+hb[3])/2;
                                        let dx = tx-o.x;
                                        let dy = ty-o.y;
                                        let dist = Math.sqrt(dx*dx+dy*dy);
                                        let speed = 1.5;
                                        vx = dx/dist*speed;
                                        vy = dy/dist*speed;
                                        ang = Math.atan2(vy,vx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                    }
                                    else{
                                        let dx = mx-o.x;
                                        let dy = my-o.y;
                                        ang = Math.atan2(dy,dx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                        vx = ttx;
                                        vy = tty;
                                        vz = 0;
                                    }
                                    ang *= -1;
                                    ang += Math.PI/2;
                                    let x = o.x+ttx*4;
                                    let y = o.y+tty*4;
                                    let sx = o.x;
                                    let sy = o.y;
                                    let player = o;
                                    o.cooldown = 0;
                                    o.isAttacking = true;
                                    let b = [x,y,0,vx,vy,0,black,function(o){
                                        let dx = o[0]-sx;
                                        let dy = o[1]-sy;
                                        let dist = Math.sqrt(dx*dx+dy*dy);
                                        if(dist > 70) removeBullet(pBullets,o);
                                        let x = o[0];
                                        let y = o[1];

                                        //effect
                                        pBullets.push([x,y,0,Math.random()/2-0.25,Math.random()/2-0.25,Math.random()/2+0.25,white,function(o){
                                            nob.setPixel(o[0],o[1],black);
                                            nob.setPixel(o[0],o[1]-1-o[2],black);
                                            nob.setPixel(o[0],o[1]+1-o[2],black);
                                            nob.setPixel(o[0]-1,o[1]-o[2],black);
                                            nob.setPixel(o[0]+1,o[1]-o[2],black);
                                            o[5] -= 0.05;
                                            if(o[2] <= 0) removeBullet(pBullets,o);
                                        }]);
                                        //

                                        pBullets.push([x,y,0,0,0,0,tt.magic.iceCol,function(o2){
                                            let e = o2[8];
                                            e.count++;
                                            if(e.count > 30) removeBullet(pBullets,o2);
                                            nob.setPixel(o2[0],o2[1]-1,black);
                                            nob.setPixel(o2[0],o2[1]+1,black);
                                            nob.setPixel(o2[0]+1,o2[1],black);
                                            nob.setPixel(o2[0]-1,o2[1],black);
                                        },{
                                            count:0,
                                            hb:[-2,-2,2,2,0,2,"ice"],
                                            player,
                                            sx:x,
                                            sy:y,
                                            sz:0,
                                            h:0,
                                            onHit:function(o2,hb,en,res,damage){
                                                inflictEffect(en,"frozen");
                                            }
                                        }]);
                                    }];
                                    pBullets.push(b);
                                }
                                break;
                            case 2: //earth
                                if(o.ep >= 8){
                                    o.ep -= 8;
                                    let vx = 0;
                                    let vy = 0;
                                    let ang = 0;
                                    let ttx = 0;
                                    let tty = 0;
                                    if(o.lockOnEn){
                                        let hb = o.lockOnHb;
                                        let en = o.lockOnEn;
                                        let tx = en.x+(hb[0]+hb[2])/2;
                                        let ty = en.y+(hb[1]+hb[3])/2;
                                        let dx = tx-o.x;
                                        let dy = ty-o.y;
                                        let dist = Math.sqrt(dx*dx+dy*dy);
                                        let speed = 1.5;
                                        vx = dx/dist*speed;
                                        vy = dy/dist*speed;
                                        ang = Math.atan2(vy,vx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                    }
                                    else{
                                        let dx = mx-o.x;
                                        let dy = my-o.y;
                                        ang = Math.atan2(dy,dx);
                                        ttx = Math.cos(ang)*1.5;
                                        tty = Math.sin(ang)*1.5;
                                        vx = ttx;
                                        vy = tty;
                                        vz = 0;
                                    }
                                    ang *= -1;
                                    ang += Math.PI/2;
                                    let x = o.x+ttx*4;
                                    let y = o.y+tty*4;
                                    let sx = o.x;
                                    let sy = o.y;
                                    let player = o;
                                    o.cooldown = 0;
                                    o.isAttacking = true;
                                    let b = [x,y,0,vx,vy,0,black,function(o){
                                        let dx = o[0]-sx;
                                        let dy = o[1]-sy;
                                        let dist = Math.sqrt(dx*dx+dy*dy);
                                        if(dist > 70) removeBullet(pBullets,o);
                                        let x = o[0];
                                        let y = o[1];
                                        o[8].count++;

                                        if(o[8].count%3 == 0) pBullets.push([x,y,0,0,0,0,null,function(o2){
                                            let e = o2[8];
                                            e.count++;
                                            nob.drawRect(o2[0]-2,o2[1]+1-o2[2],4,o2[2]+1,black);
                                            nob.drawImage_basic(tt.magic.earth,o2[0]-2,o2[1]-2-o2[2]);
                                            o2[2] += Math.sin(e.count/120*Math.PI*2)/4;
                                            if(e.count < 30){
                                                //effect
                                                let rx = (Math.random()<0.5?1:-1);
                                                let ry = (Math.random()<0.5?1:-1);
                                                if(e.count%2 == 0) pBullets.push([o2[0]+2*rx,o2[1]+2*ry,o2[2],rx/8,ry/8,0,gray,function(o){
                                                    //nob.setPixel(o[0],o[1],black);
                                                    nob.setPixel(o[0],o[1]-1-o[2],black);
                                                    nob.setPixel(o[0],o[1]+1-o[2],black);
                                                    nob.setPixel(o[0]-1,o[1]-o[2],black);
                                                    nob.setPixel(o[0]+1,o[1]-o[2],black);
                                                    o[5] -= 0.02;
                                                    if(o[2] <= 0) removeBullet(pBullets,o);
                                                }]);
                                                //
                                            }
                                            e.hb[5] = o2[2];
                                            if(e.count > 105) removeBullet(pBullets,o2);
                                        },{
                                            count:0,
                                            hb:[-2,-2,2,2,0,0,"earth"],
                                            player,
                                            sx:x,
                                            sy:y,
                                            sz:0,
                                            h:0,
                                            onDeath:function(o){
                                                createParticleAnim(tt.particles.smoke[0],o[0],o[1],0,true);
                                            }
                                        }]);
                                    },{
                                        count:0
                                    }];
                                    pBullets.push(b);
                                }
                                break;
                            case 3: //lightning
                                let x = mx;
                                let y = my;
                                let z = 12;
                                if(o.lockOnEn){
                                    let hb = o.lockOnHb;
                                    let en = o.lockOnEn;
                                    let tx = en.x+(hb[0]+hb[2])/2;
                                    let ty = en.y+(hb[1]+hb[3])/2;
                                    let tz = en.z+(hb[4]+hb[5])/2;
                                    x = tx;
                                    y = ty;
                                    z = tz+12;
                                }
                                let dx = x-o.x;
                                let dy = y-o.y;
                                let dist = Math.sqrt(dx*dx+dy*dy);
                                if(dist > 70){
                                    let ang = Math.atan2(dy,dx);
                                    x = Math.cos(ang)*70+o.x;
                                    y = Math.sin(ang)*70+o.y;
                                }
                                if(o.ep >= 8){
                                    o.ep -= 8;
                                    let min = 27/9*4;
                                    let max = 27/9*6;
                                    let r = max-min;
                                    let step = Math.floor(27/9);
                                    o.cooldown = 5;
                                    o.isAttacking = true;
                                    createParticleAnim(tt.magic.lightning,x,y,z,true);
                                    subAnim(27,function(i,t){
                                        let ii = i-min;
                                        if(ii >= 0) if((ii%step) == 0 && ii <= r){
                                            //effect
                                            for(let i2 = 0; i2 < 4; i2++) pBullets.push([x,y,1,Math.random()/2-0.25,Math.random()/2-0.25,Math.random()*0.75+0.5,gray,function(o){
                                                o[5] -= 0.05;
                                                nob.setPixel(o[0],o[1]-1-o[2],black);
                                                nob.setPixel(o[0],o[1]+1-o[2],black);
                                                nob.setPixel(o[0]-1,o[1]-o[2],black);
                                                nob.setPixel(o[0]+1,o[1]-o[2],black);
                                                nob.setPixel(o[0],o[1],black);
                                                if(o[2] <= 0) removeBullet(pBullets,o);
                                            }]);
                                            //
                                            let hb = [-6,-6,6,6,-4,12,"lightning"];
                                            drawHitBoxPlayer({
                                                x,
                                                y,
                                                z:z-12,
                                                ref:[x,y,z-12],
                                                player:o,
                                                hitboxes:[hb],
                                                element:3
                                            },hb,"b",null,false,3);
                                        }
                                    });
                                }
                                break;
                            case 4: //life
                                if(o.ep >= 6){
                                    o.ep -= 6;
                                    let x = o.x;
                                    let y = o.y;
                                    let z = o.z;
                                    o.cooldown = tt.magic.heal.length*(tt.magic.heal.delay||4)+4;
                                    o.isAttacking = true;
                                    subAnim(o.cooldown,function(i,t){
                                        if(i%(t/2)==0){
                                            let pL = getClosestPlayersInRange(x,y,z,14)[0];
                                            for(let i = 0; i < pL.length; i++){
                                                let p = pL[i];
                                                takeDamage(-4,p,0,0,0,true);
                                            }
                                        }
                                        //effect
                                        if(i%2 == 0){
                                            pBullets.push([x+(Math.random()-0.5)*6,y+(Math.random()-0.5)*6,0,0,0,1,black,function(o){
                                                if(o[2] > z+25) removeBullet(pBullets,o);
                                            }]);
                                        }
                                    });
                                    createParticleAnim(tt.magic.heal,o.x,o.y-4,o.z,true);
                                }
                                break;
                            case 5: //wind
                                if(o.ep >= 5){
                                    o.ep -= 5;
                                    let x = o.x;
                                    let y = o.y;
                                    let z = o.z;
                                    o.cooldown = 0;
                                    o.isAttacking = true;
                                    createParticleAnim(tt.particles.smoke[0],x,y,z,true);
                                    subAnim(180,function(i,t){
                                        if(i%20 == 0){
                                            for(let i2 = 0; i2 < 360; i2 += 180){
                                                let rad = 2;
                                                let dir = 1;
                                                let ang = i/t*Math.PI*4*dir+i2;
                                                let sx = Math.cos(ang)*rad+x;
                                                let sy = Math.sin(ang)*rad+y;
                                                let d = [sx,sy,z,0,0,0.2,null,function(o){
                                                    nob.setPixel(o[0],o[1]-o[2],white);
                                                    nob.setPixel(o[0],o[1],black);
                                                    draw4PSurround(o[0],o[1],o[2]);
                                                    let e = o[8];
                                                    e.h = o[2];
                                                    e.count++;
                                                    let max = 60;
                                                    rad = e.count/max*10+2;
                                                    let a = ang+(e.count/max*Math.PI*4*dir);
                                                    let tx = Math.cos(a)*rad+x;
                                                    let ty = Math.sin(a)*rad+y;
                                                    o[0] = tx;
                                                    o[1] = ty;
                                                    if(e.count > max) removeBullet(pBullets,o);
                                                },{
                                                    count:0,
                                                    player:o,
                                                    sx,
                                                    sy,
                                                    sz:z,
                                                    h:0,
                                                    hb:[-1,-1,1,1,-1,1,"wind"],
                                                    element:5
                                                }];
                                                pBullets.push(d);
                                            }
                                        }
                                    });
                                }
                                break;
                            case 6: //energy
                                o.moveMulti = 1;
                                o.isAttacking = false;
                                break;
                            case 7: //light
                                o.cooldown = 0;
                                o.isAttacking = true;
                                for(let i3 = 0; i3 < 1; i3++){
                                    let rad = 30+i3*2;
                                    let n2 = registerNob(null,rad*2,rad*2).nob;
                                    let xx = o.x;
                                    let yy = o.y;
                                    pBullets.push([xx,yy,0,0,0,0,null,function(o2){
                                        subAnim(1,function(){
                                            nob.drawCircle_custom(o2[0],o2[1],rad,white,
                                            function(n,x,y,ind,x1,y1,r,col,l,arg){
                                                let dx = x-x1;
                                                let dy = y-y1;
                                                let dist = Math.sqrt(dx*dx+dy*dy);
                                                let ang = Math.atan2(dy,dx);
                                                //let a = 14;
                                                //ang += (1600/(dist*dist))*Math.PI/180; //crazy warp
                                                //ang += (1600/(dist*dist))*Math.PI/90;
                                                //let r2 = dist/2;
                                                //let r2 = 2/dist;
                                                //let r2 = dist/40;
                                                //let r2 = (rad+1)/dist-1;
                                                //let r2 = (dist-5.5)/dist+0.5; //dent reflection
                                                //let r2 = (dist-10.5)/dist+0.5; //bigger dent
                                                //let r2 = dist/2; //zoom
                                                let f = frames;
                                                let r2 = 0;
                                                if(dist == 0) r2 = dist+(((Math.sin(f/50)*rad+rad)));
                                                else r2 = dist+(((Math.sin(f/50)*rad+rad)/dist)); //zoom
                                                //let r2 = dist+(((frames%160)/4/dist)); //zoom
    
    
                                                let tx = Math.floor(Math.cos(ang)*r2+x1);
                                                let ty = Math.floor(Math.sin(ang)*r2+y1);
                                                let i2 = (tx+ty*n.width)*4;
                                                let dd = (rad*3)-dist*3;//(dist*2/40);
                                                n2.setPixel(x-x1+r,y-y1+r,[n.buf[i2]+dd,n.buf[i2+1]+dd,n.buf[i2+2]+dd,255]);
                                            });
                                            //nob.strokeCircle(o2[0],o2[1],40,black);
                                            nob.drawImage_basic(fromNob(n2),o2[0]-rad,o2[1]-rad);
                                        }); 
                                        let trapped = 0;
                                        let bL = [];
                                        for(let i = 0; i < bullets.length; i++){
                                            bL.push(bullets[i]);
                                        }
                                        let str = (Math.sin(frames/50)*40+40);
                                        for(let i = 0; i < bL.length; i++){
                                            let b = bL[i];
                                            if(b[3] != 0 && b[4] != 0){
                                                let dx = b[0]-o2[0];
                                                let dy = b[1]-o2[1];
                                                let dist = Math.sqrt(dx*dx+dy*dy);
                                                if(dist < 4){
                                                    removeBullet(bullets,b,false);
                                                }
                                                else if(dist < 40){
                                                    let tx = dx/dist;
                                                    let ty = dy/dist;
                                                    b[3] -= tx*str/80;
                                                    b[4] -= ty*str/80;
                                                    let max = 2;
                                                    if(b[3] > max) b[3] = max;
                                                    else if(b[3] < -max) b[3] = -max;
                                                    if(b[4] > max) b[4] = max;
                                                    else if(b[4] < -max) b[4] = -max;
                                                }
                                            }
                                        }
                                        let eL = getClosestEnemiesInRange(o2[0],o2[1],0,40)[0];
                                        for(let i = 0; i < eL.length; i++){
                                            let b = eL[i];
                                            let dx = b.x-o2[0];
                                            let dy = b.y-o2[1];
                                            let dist = Math.sqrt(dx*dx+dy*dy);
                                            if(dist < 4){
                                                trapped++;
                                                if(trapped > 10){
                                                    createParticleAnim(tt.particles.smoke[0],b.x,b.y,b.z,true);
                                                    dealDamage(400,b,o);
                                                }
                                            }
                                            else if(dist < 40){
                                                let tx = dx/dist;
                                                let ty = dy/dist;
                                                b.vx -= tx*str/160;
                                                b.vy -= ty*str/160;
                                                let max = 2;
                                                if(b.vx > max) b.vx = max;
                                                else if(b.vx < -max) b.vx = -max;
                                                if(b.vy > max) b.vy = max;
                                                else if(b.vy < -max) b.vy = -max;
                                            }
                                        }
                                    }]);
                                }
                                /*pBullets.push([o.x,o.y,0,0,0,0,null,function(o2){ //INVERT
                                    nob.drawCircle_custom(o2[0],o2[1],10,white,
                                    function(n,x,y,ind,x1,y1,r,col,l,arg){
                                        let scale = 1.2;
                                        dum[0] = 255-n.buf[ind];
                                        dum[1] = 255-n.buf[ind+1];
                                        dum[2] = 255-n.buf[ind+2];
                                        n.setData(ind,dum);
                                    });
                                }]);*/
                                break;
                        };
                    }
                    else if(mD.onEnd) mD.onEnd(o);
                }
            }
        },
        keybinds:function(o){
            if(o.cooldown == null) o.cooldown = 0;
            if(o.maxCooldown == null) o.maxCooldown = 120;
            let idY = o.spellY;
            let idX = o.spellX;
            let mD = magicData[idY][idX];
            if(o.cooldown == 0){
                if(mouseDown[0]){
                    o.chargeTime--;
                    if(o.chargeTime < 0) o.chargeTime = 0;
                    let icon = tt.magic.magicBase[idY];
                    nob.drawImage_basic(icon,o.x-icon.w/2,o.y-o.z-icon.h/2-(20-o.chargeTime)/20*8);
                        subAnim(1,function(i,t){
                            let lineL = (o.chargeTime)/20*5;
                            if(lineL > 0){
                                nob.drawLine_smart(mx-lineL,my-4,mx+lineL,my-4,white,1);
                                nob.drawLine_smart(mx-lineL,my-5,mx+lineL,my-5,black,1);
                                nob.drawLine_smart(mx-lineL,my-3,mx+lineL,my-3,black,1);
                                nob.setPixel(mx-lineL-1,my-4,black);
                                nob.setPixel(mx+lineL+1,my-4,black);
                            }
                        });
                    if(o.chargeTime == 0){
                        //preview
                        if(!o.lockOnEn) if(mD.posPreview) mD.posPreview(o);
                        //
                        let frame = (frames%40 < 35);
                        if(frame) nob.drawImage_basic(icon,o.x-icon.w/2,o.y-o.z-icon.h/2-(20-o.chargeTime)/20*8);
                        else nob.drawImage_basic_tintAdd(icon,o.x-icon.w/2,o.y-o.z-icon.h/2-(20-o.chargeTime)/20*8,255,255,255);
                    }
                    if(idX == 0) switch(idY){
                        case 6: //energy
                            if(o.ep >= 1){
                                o.ep--;
                                o.moveMulti = 2;
                                o.isAttacking = true;
                                let x = o.x;
                                let y = o.y;
                                let z = o.z;
                                let img = o.img;
                                let t1 = [10,0,20];
                                let t2 = [5,1,7];
                                if(img) subAnim(20,function(i,t){
                                    nob.drawImage_basic_tint2(img,x-img.w/2,y-z-img.h,t1,t2);
                                    //nob.drawCircle(x,y,2,black);
                                    //effect
                                    if(i > 10){
                                        for(let i = 0; i < 1; i++) pBullets.push([x,y,z+4,Math.random()/2-0.25,Math.random()/2-0.25,0,[200,60,255,255],function(o){
                                            let e = o[8];
                                            e.count++;
                                            draw4PSurround(o[0],o[1],o[2]);
                                            nob.setPixel(o[0],o[1],black);
                                            if(e.count > 20) removeBullet(pBullets,o);
                                        },{
                                            count:0
                                        }]);
                                    }
                                    else{
                                        /*pBullets.push([x,y,z+2,Math.random()-0.5,Math.random()-0.5,0,white,function(o){
                                            let e = o[8];
                                            e.count++;
                                            if(e.count > 10) removeBullet(pBullets,o);
                                        },{
                                            count:0
                                        }]);*/
                                    }
                                    //
                                });
                            }
                            else this.mouseUp(0,o);
                            break;
                    }
                }
                else{
                    o.chargeTime = 20;
                    if(keys.shift){
                        //o.cooldown /= 2;
                        o.chargeTime /= 20;
                    }
                    if(mD.chargeTime != null) o.chargeTime = mD.chargeTime;
                }
            }
            else{
                o.chargeTime = 20;
                if(keys.shift){
                    //o.cooldown /= 2;
                    o.chargeTime /= 20;
                }
                if(mD.chargeTime != null) o.chargeTime = mD.chargeTime;
            }
            o.cooldown--;
            if(o.cooldown < 0) o.cooldown = 0;
            if(o.cooldown == 0) o.isAttacking = false;
        }
    },
    4:{ //Staff
        keybinds:function(o){
            if(pressOnce("e")){
                createShield(o.x,o.y,8);
            }
            if(o.cooldown == null) o.cooldown = 0;
            if(o.maxCooldown == null) o.maxCooldown = 120;
            if(o.cooldown == 0){
                if(o.ep >= 6) if(pressOnce("f")){ //heal
                    o.ep -= 6;
                    let x = o.x;
                    let y = o.y;
                    let z = o.z;
                    o.cooldown = tt.magic.heal.length*(tt.magic.heal.delay||4)+4;
                    subAnim(o.cooldown,function(i,t){
                        if(i%(t/2)==0){
                            let pL = getClosestPlayersInRange(x,y,z,14)[0];
                            for(let i = 0; i < pL.length; i++){
                                let p = pL[i];
                                takeDamage(-4,p,0,0,0,true);
                            }
                        }
                    });
                    o.isAttacking = true;
                    createParticleAnim(tt.magic.heal,o.x,o.y-4,o.z,true);
                }
            }
            o.cooldown--;
            if(o.cooldown < 0) o.cooldown = 0;
            if(o.cooldown == 0) o.isAttacking = false;
        }
    },
    10:{
        keybinds_pre:function(o){
            let weapon = o.equip.weapon;
            if(!weapon) return;
            if(weapon.ref == wep.wild.coderGun){ //CODER GUN
                if(keys[" "] && o.grounded){
                    for(let i = 0; i < 360; i += 20){
                        let ang = i*Math.PI/180;
                        let tx = Math.cos(ang)*0.5;
                        let ty = Math.sin(ang)*0.5;
                        createParticleAnim(tt.particles.smoke[0],o.x,o.y,o.z,true);
                        pBullets.push([o.x,o.y,o.z+30,tx,ty,0,tt.bullets.small,function(o){
                            o[5] -= 0.05;
                        },{
                            onDeath:function(o){
                                createParticleAnim(tt.particles.smoke[0],o[0],o[1],o[2],true);
                            }
                        }]);
                    }
                }
            }
        },
        keybinds:function(o){ //wild/custom weapons
            let weapon = o.equip.weapon;
            if(!weapon) return;
            if(weapon.ref == wep.wild.coderGun){ //CODER GUN
                if(pressOnce("z")){
                    let dir = 1;
                    if(Math.random() < 0.5) dir *= -1;
                    subAnim(60,function(i,t){
                        let ang = i/60*Math.PI*4 * dir;
                        let tx = Math.cos(ang);
                        let ty = Math.sin(ang);
                        pBullets.push([o.x+tx*15,o.y+ty*15,o.z+20,0,0,0,tt.bullets.dirtball,function(o){
                            o[5] -= 0.05;
                            if(frames%4==0) pBullets.push([o[0],o[1],o[2],0.5,0.5,-1,black,function(o2){
                                if(o2[2] < 0) removeBullet(pBullets,o2);
                            }]);
                        }]);
                    });
                }
                if(mouseDown[0]){
                    let speed = 3;
                    if(keys.shift){
                        speed *= 2;
                    }
                    if(keys.c){
                        speed /= 4;
                    }
                    o.isAttacking = true;
                    let dx = mx-o.x;
                    let dy = my-o.y;
                    let a = Math.atan2(dy,dx);
                    let tx = Math.cos(a)*speed;
                    let ty = Math.sin(a)*speed;
                    pBullets.push([o.x,o.y,o.z,tx,ty,o.targZ,tt.bullets.dirtball]);
                }
                else if(mouseDown[2]){
                    if(frames%40 <= 30){
                        nob2.drawText("THIS MOVE IS UNDER CONSTRUCTION",nob2.centerX,nob2.centerY,white,black);
                    }
                    /*let speed = 3;
                    if(keys.shift){
                        speed *= 2;
                    }
                    if(keys.c){
                        speed /= 4;
                    }
                    o.isAttacking = true;
                    let dx = mx-o.x;
                    let dy = my-o.y;
                    let a = Math.atan2(dy,dx);
                    let tx = Math.cos(a)*speed;
                    let ty = Math.sin(a)*speed;
                    pBullets.push([o.x,o.y,o.z,tx,ty,o.targZ,tt.bullets.dirtball,function(o){
                        let l = getClosestEnemiesInRange(o[0],o[1],o[2],20)[0];
                        let e = l[0];
                        
                    }]);*/
                }
                if(!mouseDown[0] && !mouseDown[2]) o.isAttacking = false;
            }
        }
    }
};
setTimeout(function(){
    changeClass(me,3);
},20);

var wep = {
    katana:{
        dull:{
            name:"Dull Katana",
            type:WeaponType.Katana,
            damage:1
        },
        steel:{
            name:"Steel Pole",
            type:WeaponType.Katana,
            damage:3
        },
        bamboo:{
            name:"Bamboo Blade",
            type:WeaponType.Katana,
            damage:1
        },
        wood:{
            name:"Wood Katana",
            type:WeaponType.Katana,
            damage:1
        },
        neo:{
            name:"Neo Sakon",
            type:WeaponType.Katana,
            damage:40
        },
        bad:{
            name:"Bad Thing",
            type:WeaponType.Katana,
            damage:2000
        }
    },
    pistol:{
        rusty:{
            name:"Rusty Pistol",
            type:WeaponType.Pistol,
            damage:1
        },
        collectors:{
            name:"Collecters Edition",
            type:WeaponType.Pistol,
            damage:70
        }
    },
    sniper:{
        rusty:{
            name:"Rusty Sniper",
            type:WeaponType.Sniper,
            damage:4
        }
    },
    wand:{
        rotted:{
            name:"Rotted Wand",
            type:WeaponType.Wand,
            damage:1
        },
        bokeh:{
            name:"Bokeh",
            type:WeaponType.Wand,
            damage:2000
        }
    },
    staff:{
        rotted:{
            name:"Rotted Staff",
            type:WeaponType.Staff,
            damage:1
        }
    },
    wild:{
        coderGun:{
            name:"Coders Gun",
            type:WeaponType.Wild,
            damage:0,
            wasd:true
        }
    }
};
class Weapon{
    constructor(ref){
        this.ref = ref;
    }
    ref;
    customName;
    getName(){
        if(this.customName == null) return this.ref.name;
        else return this.customName;
    }
    getType(){
        return this.ref.type;
    }
}
function createWeapon(weapon){ //takes wep ref: wep.katana
    let w = new Weapon(weapon);
    if(weapon.onCreate) weapon.onCreate(w);
    return w;
}
function canUseWeapon(o,item){
    if(!item) return false;
    let cd = classData[o.classId];
    let type = item.getType();
    if(type == WeaponType.Wild) return true;
    if(!cd.allowedWeapons.includes(type)) return false;
    if(item.ref.lvlReq > o.lvl) return false;
    else return true;
}

const expList = [
    50,
    75,
    100,
    125,
    150,
    200,
    250,
    300,
    350,
    400,
    1000,
    1500,
    2000,
    2750,
    3300,
    3900,
    4800,
    6000,
    8000,
    1200,
    4000,
    8000
];

//recieve drops and exp
function awardEnemyDeath(o){
    let eD = enemyData[o.type];
    let l = getClosestPlayersInRange(o.x,o.y,o.z,100)[0];
    for(let i = 0; i < l.length; i++){
        let p = l[i];
        giveExp(p,eD.exp);
    }
    displayDamage(eD.exp+" EXP",o.x*guiScale,o.y*guiScale,(o.z+10)*guiScale,epTypeCols[0],60);
}
function giveExp(o,amt){
    //let startLvl = o.lvl[o.classId];
    while(amt > 0){
        let a = Math.min(amt,expList[o.lvl[o.classId]-1]-o.exp[o.classId]);
        amt -= a;
        o.exp[o.classId] += a;
        if(o.exp[o.classId] >= expList[o.lvl[o.classId]-1]){
            o.exp[o.classId] -= expList[o.lvl[o.classId]-1];
            o.lvl[o.classId]++;
        }
    }
    //console.log("DONE AWARDING EXP. Went up " + (o.lvl[o.classId]-startLvl) + " lvls.");
}

function createShield(x,y,hp){
    let d = {
        anim:{
            i:0,
            c:0,
            d:0,
            f:null
        },
        hitboxes:[[-6,-6,6,6,0,40]],
        x,y,
        z:0,
        vx:0,
        vy:0,
        vz:0,
        hp,
        static:true,
        noRender:true,
        update:function(){
            nob.drawRect2_smart(this.x,this.y,6,6,black);
            if(this.isDead) players.splice(players.indexOf(this),1);
        },
        targZ:0,
        locks:[],
        locksRef:[],
        lockOnEn:null,
        lockOnHb:null
    };
    players.push(d);
}

document.addEventListener("wheel",e=>{
    let v = (e.deltaY < 0 ? 0.1 : -0.1);
    if(me.classId == CLASSES.Gunman){
        me.targZ += v;
    }
});

//MAGIC
const magicData = [
    [ //Fire spells
        {
            name:"Fire",
            col:[255,60,60,255],
            getPos:function(o){
                let x = mx;
                let y = my;
                let dx = x-o.x;
                let dy = y-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let ang = Math.atan2(dy,dx);
                if(dist > 75){
                    x = Math.cos(ang)*75+o.x;
                    y = Math.sin(ang)*75+o.y;
                }
                let sx = Math.cos(ang)*5;
                let sy = Math.sin(ang)*5;
                return [x,y,o.z+4,o.x+sx,o.y+sy];
            },
            posPreview:function(o){
                let p = this.getPos(o);
                //nob.drawLine_smart(p[3],p[4],p[0],p[1],black,1);
                drawShadow(p[3],p[4],o.z+4,null,nob.getLine(p[3],p[4],p[0],p[1],black,1));
                nob.drawLine_smart(p[3],p[4]-o.z-4,p[0],p[1]-p[2],white,1);
            }
        },
        {
            name:"Fire Blanket"
        },
        {
            name:"Enormous Flame"
        },
        {
            name:"Fireball"
        },
        {
            name:"Volcano"
        }
    ],
    [ //Ice spells
        {
            name:"Ice",
            col:convert("cornflowerblue"),
            getPos:function(o){
                let x = mx;
                let y = my;
                let dx = x-o.x;
                let dy = y-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let ang = Math.atan2(dy,dx);
                if(dist > 70){
                    x = Math.cos(ang)*70+o.x;
                    y = Math.sin(ang)*70+o.y;
                }
                let sx = Math.cos(ang)*5;
                let sy = Math.sin(ang)*5;
                return [x,y,0,o.x+sx,o.y+sy];
            },
            posPreview:function(o){
                let p = this.getPos(o);
                nob.drawLine_smart(p[3],p[4],p[0],p[1],black,1);
            }
        },
        {
            name:"Frost Walker"
        },
        {
            name:"Frozen Cage"
        },
        {
            name:"Ice Shards"
        }
    ],
    [ //Earth spells
        {
            name:"Earth",
            col:convert("chocolate"),
            getPos:function(o){
                let x = mx;
                let y = my;
                let dx = x-o.x;
                let dy = y-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let ang = Math.atan2(dy,dx);
                if(dist > 70){
                    x = Math.cos(ang)*70+o.x;
                    y = Math.sin(ang)*70+o.y;
                }
                let sx = Math.cos(ang)*5;
                let sy = Math.sin(ang)*5;
                return [x,y,0,o.x+sx,o.y+sy];
            },
            posPreview:function(o){
                let p = this.getPos(o);
                nob.drawLine_smart(p[3],p[4],p[0],p[1],black,1);
            }
        },
        {
            name:"Turn over Earth"
        }
    ],
    [ //Lightning spells
        {
            name:"Lightning",
            col:convert("gold"),
            getPos:function(o){
                let x = mx;
                let y = my;
                let dx = x-o.x;
                let dy = y-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                if(dist > 70){
                    let ang = Math.atan2(dy,dx);
                    x = Math.cos(ang)*70+o.x;
                    y = Math.sin(ang)*70+o.y;
                }
                return [x,y,0];
            },
            posPreview:function(o){
                let p = this.getPos(o);
                nob.drawCircle(p[0],p[1],2,black);
            }
        },
        {
            name:"Viscious Bolt"
        }
    ],
    [ //Life
        {
            name:"Life",
            col:convert("#5fcc5f") //limegreen
        },
        {
            name:"Resta"
        },
        {
            name:"Anti"
        }
    ],
    [ //Wind spells
        {
            name:"Wind",
            col:convert("lightsteelblue")
        },
        {
            name:"Whirlwind"
        }
    ],
    [ //Energy
        {
            name:"Energy",
            col:convert("mediumorchid"),
            chargeTime:0
        },
        {
            name:"Vortex",
            onEnd:function(o){
                if(o.ep >= 1){
                    o.ep -= 1;
                    o.cooldown = 0;
                    o.isAttacking = true;
                    
                    for(let i3 = 0; i3 < 4; i3++){
                        let rad = 30+i3*2;
                        let n2 = registerNob(null,rad*2,rad*2).nob;
                        let xx = o.x;
                        let yy = o.y;
                        pBullets.push([xx,yy,0,0,0,0,null,function(o2){
                            subAnim(1,function(){
                                nob.drawCircle_custom(o2[0],o2[1],rad,white,
                                function(n,x,y,ind,x1,y1,r,col,l,arg){
                                    let dx = x-x1;
                                    let dy = y-y1;
                                    let dist = Math.sqrt(dx*dx+dy*dy);
                                    let ang = Math.atan2(dy,dx);
                                    let f = frames;
                                    let r2 = dist+(((Math.sin(f/20)*rad+rad)/dist));
    
                                    let tx = Math.floor(Math.cos(ang)*r2+x1);
                                    let ty = Math.floor(Math.sin(ang)*r2+y1);
                                    let i2 = (tx+ty*n.width)*4;
                                    /*let dd = (40*2)-dist*8; //EXTREME
                                    if(dist > 15) dd = 0;*/
                                    let dd = (rad*2)-dist*2;
                                    n2.setPixel(x-x1+r,y-y1+r,[n.buf[i2]-dd,n.buf[i2+1]-dd,n.buf[i2+2]-dd,255]);
                                });
                                nob.drawImage_basic(fromNob(n2),o2[0]-rad,o2[1]-rad);
                            });
                            let trapped = 0;
                            let bL = [];
                            for(let i = 0; i < bullets.length; i++){
                                bL.push(bullets[i]);
                            }
                            let str = (Math.sin(frames/50)*40+40);
                            for(let i = 0; i < bL.length; i++){
                                let b = bL[i];
                                if(b[3] != 0 && b[4] != 0){
                                    let dx = b[0]-o2[0];
                                    let dy = b[1]-o2[1];
                                    let dist = Math.sqrt(dx*dx+dy*dy);
                                    if(dist < 4){
                                        removeBullet(bullets,b,false);
                                    }
                                    else if(dist < 40){
                                        let tx = dx/dist;
                                        let ty = dy/dist;
                                        b[3] -= tx*str/80;
                                        b[4] -= ty*str/80;
                                        let max = 2;
                                        if(b[3] > max) b[3] = max;
                                        else if(b[3] < -max) b[3] = -max;
                                        if(b[4] > max) b[4] = max;
                                        else if(b[4] < -max) b[4] = -max;
                                    }
                                }
                            }
                            let eL = getClosestEnemiesInRange(o2[0],o2[1],0,40)[0];
                            for(let i = 0; i < eL.length; i++){
                                let b = eL[i];
                                let dx = b.x-o2[0];
                                let dy = b.y-o2[1];
                                let dist = Math.sqrt(dx*dx+dy*dy);
                                if(dist < 4){
                                    trapped++;
                                    if(trapped > 10){
                                        createParticleAnim(tt.particles.smoke[0],b.x,b.y,b.z,true);
                                        dealDamage(400,b,o);
                                    }
                                }
                                else if(dist < 40){
                                    let tx = dx/dist;
                                    let ty = dy/dist;
                                    b.vx -= tx*str/160;
                                    b.vy -= ty*str/160;
                                    let max = 2;
                                    if(b.vx > max) b.vx = max;
                                    else if(b.vx < -max) b.vx = -max;
                                    if(b.vy > max) b.vy = max;
                                    else if(b.vy < -max) b.vy = -max;
                                }
                            }
                        }]);
                    }
                }
            }
        }
    ],
    [ //Light spells
        {
            name:"Light",
            col:convert("palegoldenrod")
        },
        {
            name:"Laser"
        }
    ],
    /*[ //MEGA
        {
            name:"Mega",
            acol:[255,255,255,255],
            col:[0,0,0,255],
            text:[255,255,255,255]
        }
    ]*/
];

//DEBUG
function createWepDiv_input(t){
    document.getElementById("cwd_output").innerHTML = Object.keys(WeaponType)[t.value];
}
document.getElementById("cwd_input").value = 0;
createWepDiv_input(document.getElementById("cwd_input"));
function cwd_create(){
    let classId = document.getElementById("cwd_input").value;
    let name = document.getElementById("cwd_name").value;
    let damage = document.getElementById("cwd_damage").value;
    let d = {
        name,
        type:WeaponType.Katana,
        damage
    };
    if(classId == 1) d.type = WeaponType.Pistol;
    else if(classId == 2) d.type = WeaponType.Sniper;
    me.inv.weapons.push(createWeapon(d));
}

const controlInfo = [
    `
    A class for close range attacks focused on dodging and using the right move at the right time.<br><br>
    Controls for Swordman Class:<br><br>
        - Move with <span style='color:red'>Arrow</span> keys. <br>
        - Jump with spacebar. <br><br>

        - Open/Close quick inventory with "Enter" and cycle<br>
        with "W" or "S". It can also be closed by pressing "D". <br><br>

        - "D" Does normal attack that does not take energy, it does 3 different attacks in a row. <br>
        - "S" Does swirl attack to hit enemies around, takes 2 energy per use. <br>
        - "A" Does rushing attack, not implimented yet. <br>
    `,
    `
    A class for long range attacks focused on doing constant damage to enemies.<br><br>
    Controls for Gunman Class:<br><br>
        - Move with <span style='color:green'>WASD</span> keys. <br>
        - Jump with spacebar. <br><br>

        - Open/Close quick inventory with "Enter" and cycle<br>
        with "Up Arrow" or "Down Arrow". <br><br>

        - Aim with mouse. <br>
        - Hold left mouse button to shoot with normal attack, does not take energy. <br>
        - Hold "Shift" while shooting for a 2x faster shot that takes 1 energy per shot. <br>
        - Hold "C" while shooting for a 4x faster shot and 2x faster bullet that<br>
        takes 4 energy per shot. <br><br>
        - Scroll mouse wheel to aim up or down. Click in scroll wheel to reset vertical aim.<br><br>
        
        - Holding right mouse button will show available hitboxes in range, ones hovered<br>
        over will turn red and when mouse let go will shoot bullets to those places.<br>
        - Holding "Q" will show available hitboxes in range and you can click with left mouse button<br>
        to select or deselect hitboxes. Clicking in free space while "Q" held will deselect.<br>
        Upon normal attack, it will aim at selected hitbox.
    `,
    `
    A class for combat magic use. Used for attacks of all kinds and stunning or freezing<br>
    the enemy. Some defence capabilities.<br><br>
    Mage has not been implimented yet. WIP`,
    `
    A class for support magic use. Used for healing, bufs, and superior defence such<br>
    as making barriers and walls.<br><br>
    Sage has not been implimented yet. WIP`,
    `
    A class for bringing the dead back to life and using the enemy against themselves.<br><br>
    Necroman has not been implimented yet.`
];

document.getElementById("cont").style.marginTop = (can.offsetHeight+10)+"px";
window.onresize = function(){
    document.getElementById("cont").style.marginTop = (can.offsetHeight+10)+"px";
};

function spawnDebug(en,times=1){
    for(let i = 0; i < times; i++) createEnemy(en,Math.floor(Math.random()*nob.width),Math.floor(Math.random()*nob.height),0);
}
function debugRevive(){
    me.x = nob.centerX;
    me.y = nob.centerY;
    me.z = 0;
    me.vx = 0;
    me.vy = 0;
    me.vz = 0;
    me.hp = me.maxHp;
    me.ep = me.maxEp;
    me.isDead = false;
    me.anim.f = null;
    me.anim.i = 0;
    me.anim.c = 0;
    me.anim.d = 0;
}