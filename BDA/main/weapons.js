const WeaponType = Object.freeze({
    Katana:0,
    Pistol:1,
    Sniper:2,
    Wand:3,
    Staff:4,
    Knife:5,
    Wild:10,
    
    //tools
    Shovel:50,
    Hoe:51,
    SeedBag:52,
    WateringCan:53,
    Bucket:54,
    Sickle:55,
    Tamper:56,
    Axe:57,
    Chain:58
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
                    if(initAttack(o)){
                        startAnim(o,tt.char.swirl1,1);
                        o.ep -= 2;
                    }
                }
                if(keys.d){
                    if(initAttack(o)){
                        startAnim(o,tt.char["swing"+(o.atkI+1)],1);
                    }            
                }
                if(keys.a){
                    if(initAttack(o)){
                        startAnim(o,tt.char.stab1,1);
                    }
                }
            }
        }
    },
    1:{ //Pistol
        keybinds:function(o){
            if(o.gunCooldown > 0) o.gunCooldown--;
            if(o.gunCooldown < 0) o.gunCooldown = 0;
            if(mouseDown[0]) if(o.gunCooldown == 0){
                //if(!o.lockOnEn){
                if(true){
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
                    let tx = 0;
                    let ty = 0;
                    let tz = 0;
                    if(!o.lockOnEn){
                      let dx = mx-o.x;
                      let dy = my-o.y;
                      let a = Math.atan2(dy,dx);
                      tx = Math.cos(a)*speed;
                      ty = Math.sin(a)*speed;
                      tz = 0;
                    }
                    else{
                      let hb = me.lockOnHb;
                      let en = me.lockOnEn;
                      let tax = en.x+(hb[0]+hb[2])/2;
                      let tay = en.y+(hb[1]+hb[3])/2;
                      let taz = en.z+(hb[4]+hb[5])/2;
                      let dx = tax-me.x;
                      let dy = tay-me.y;
                      let dz = taz-(me.z+4);
                      let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                      tx = dx/dist*speed;
                      ty = dy/dist*speed;
                      tz = dz/dist*speed;
                    }
                    
                    //bullets.push([o.x,o.y,o.z,tx,ty,o.targZ||0,tt.bullets.small]);
                    //tz = o.targZ; //OLD SYSTEM LETS YOU AIM UP OR DOWN
                    pBullets.push([o.x,o.y,o.z+4,tx,ty,tz,tt.bullets.small,function(o2){
                        /*let hb = [-1,-1,1,1,-1,1,"bullet"];
                        drawHitBoxPlayer({
                            x:o2[0],
                            y:o2[1],
                            z:o2[2],
                            ref:o2,
                            player:o,
                            hitboxes:[hb]
                        },hb,"a",null,true);*/
                        drawShadow(o2[0],o2[1],o2[2],null);

                        //let dx = o2[0]-o2[8].sx;
                        //let dy = o2[1]-o2[8].sy;
                        //let dz = o2[2]-o2[8].sz;
                        //let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                        //if(dist > 70) removeBullet(pBullets,o2,false);
                    },{
                      sx:o.x,sy:o.y,sz:o.z+4,
                      noShadow:true,
                      hb:[-1,-1,1,1,-1,1,"bullet"],
                      player:o,
                      h:(!o.lockOnEn?4:0),
                      element:0,
                      onDeathAnim:function(o){
                        //particleSims.spark(o[0],o[1],o[2],0,0,1,black,2);
                        particleSims.spark(o[0],o[1],o[2],0,0,1,[255,150,0,255],3);
                      }
                    }]);
                }
                else if(false){
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
                let coolMax = 10*6; //o.gunMaxCooldown
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
                                        let dz = tz-o.z;

                                        let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                                        let speed = 1.5;
                                        vx = dx/dist*speed;
                                        vy = dy/dist*speed;
                                        vz = dz/dist*speed;
                                        //ang = Math.atan2(vy,vx);
                                        //ttx = Math.cos(ang)*1.5;
                                        //tty = Math.sin(ang)*1.5;
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
                                    let b = [x,y,0,vx,vy,vz,black,function(o){
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
            let list1 = magicData[idY];
            let mD = list1[Math.min(idX,list1.length-1)];
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
    5:{ //Knife
        keybinds:function(o){
            if(!o.isAttacking) if(mouseDown[0]){
                o.isAttacking = true;
                let dx = mx-o.x;
                let dy = my-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let ang = Math.atan2(dy,dx);
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
                //let rad = 4;
                //let tx = dx/dist*rad+o.x;
                //let ty = dy/dist*rad+o.y;
                let r = 6;
                drawHitBoxPlayer(o,[-r,-r,r,r,-2,2,"knife"],1);

                /*let slist = [];
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
                }*/
            }
        }
    },
    10:{ //Wild
        keybinds_pre:function(o){
            let weapon = o.equip.weapon;
            if(!weapon) return;
            if(weapon.ref == items.wild.coderGun){ //CODER GUN
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
            if(weapon.ref == items.wild.coderGun){ //CODER GUN
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
    },
    //tools
    50:{ //shovel
        mouseUp:function(button,o){
            if(button == 0) o.selObj = null;
            else if(button == 2){
                let r = this.prev2(o,mx,my);
                if(r){
                    let da = createTilledDirt(r[0],r[1],false,1);
                    let dirs = [null,null,null,null];
                    for(let j = 0; j < sobjs.length; j++){
                        let s = sobjs[j];
                        if(s.type == 1){
                            if(s.x > da.x && s.y == da.y) if(da.x+2 >= s.x-1 && da.x+2 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[2] = s;
                            if(s.x < da.x && s.y == da.y) if(da.x-2 >= s.x-1 && da.x-2 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[3] = s;
                            if(s.y > da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y+2 >= s.y-1 && da.y+2 <= s.y+2) dirs[1] = s;
                            if(s.y < da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y-2 >= s.y-1 && da.y-2 <= s.y+2) dirs[0] = s;
                        }
                    }
                    if(dirs[2]){
                        da.rightObj = dirs[2];
                        dirs[2].leftObj = da;
                        da.right = true;
                        dirs[2].left = true;
                    }
                    if(dirs[3]){
                        da.leftObj = dirs[3];
                        dirs[3].rightObj = da;
                        da.left = true;
                        dirs[3].right = true;
                    }
                    if(!dirs[2] && !dirs[3]){
                        if(dirs[1]){
                            da.downObj = dirs[1];
                            dirs[1].upObj = da;
                            da.down = true;
                            dirs[1].up = true;
                        }
                        if(dirs[0]){
                            da.upObj = dirs[0];
                            dirs[0].downObj = da;
                            da.up = true;
                            dirs[0].down = true;
                        }
                    }
                    sobjs.push(da);
                }
            }
        },
        keybinds:function(o){
            let r, ro;
            if(mouseDown[2]){
                this.prev2(o,mx,my);
            }
            else{
                r = this.prev(o,mx,my,mouseDown[0]);
                ro = r[2];
                if(ro) if(ro.type == 1){
                    let obj = ro;
                    subAnim(1,function(){
                        nob.setPixel(obj.x,obj.y,white);
                    });
                }
            }
            if(mouseDown[0]){
                let x = r[0];
                let y = r[1];
                if(o.selObj) if(o.selObj.type == 1){
                    let obj = o.selObj;

                    let dx = x-obj.x;
                    let dy = y-obj.y;
                    if(dx == 0 && dy == 0) return;
                    let horz = Math.abs(dx)>Math.abs(dy);
                    let dx2 = x-o.selLX;
                    let dy2 = y-o.selLY;
                    let dxn = dx2/Math.abs(dx2);
                    let dyn = dy2/Math.abs(dy2);
                    let dist = Math.sqrt(dx2*dx2+dy2*dy2);
                    if(dist > 5) return;

                    if(horz){
                        y = obj.y;
                    }
                    else{
                        x = obj.x;
                    }

                    let ob;
                    for(let i = 0; i < sobjs.length; i++){
                        let s = sobjs[i];
                        if(s.type == 1){
                            if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) ob = s;
                        }
                    }
                    if(!ob){ //preview tilled soil spot
                        if(horz) obj.horz = true;
                        else obj.horz = false;
                        for(let i = 0; i < Math.max(3,Math.abs(horz?dx2:dy2)); i += 3){
                            if(horz ? (Math.abs(dx)%3 == 0) : (Math.abs(dy)%3 == 0)){
                                let da = createTilledDirt(x+(horz?(i*dxn):0),y+(!horz?(i*dyn):0),horz,1);
                                sobjs.push(da);
                                o.selLX = da.x;
                                o.selLY = da.y;

                                let dirs = [null,null,null,null];
                                for(let j = 0; j < sobjs.length; j++){
                                    let s = sobjs[j];
                                    if(s.type == 1){
                                        if(s.x > da.x && s.y == da.y) if(da.x+3 >= s.x-1 && da.x+3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[2] = s;
                                        if(s.x < da.x && s.y == da.y) if(da.x-3 >= s.x-1 && da.x-3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[3] = s;
                                        if(s.y > da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y+3 >= s.y-1 && da.y+3 <= s.y+2) dirs[1] = s;
                                        if(s.y < da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y-3 >= s.y-1 && da.y-3 <= s.y+2) dirs[0] = s;
                                    }
                                }
                                if(horz){
                                    if(dirs[2]){
                                        da.rightObj = dirs[2];
                                        dirs[2].leftObj = da;
                                        da.right = true;
                                        dirs[2].left = true;
                                    }
                                    if(dirs[3]){
                                        da.leftObj = dirs[3];
                                        dirs[3].rightObj = da;
                                        da.left = true;
                                        dirs[3].right = true;
                                    }
                                }
                                else{
                                    if(dirs[1]){
                                        da.downObj = dirs[1];
                                        dirs[1].upObj = da;
                                        da.down = true;
                                        dirs[1].up = true;
                                    }
                                    if(dirs[0]){
                                        da.upObj = dirs[0];
                                        dirs[0].downObj = da;
                                        da.up = true;
                                        dirs[0].down = true;
                                    }
                                }
                            }
                        }
                    }
                    else{
                        o.selLX = ob.x;
                        o.selLY = ob.y;
                        ob.horz = horz;
                    }
                    nob.drawRect(x-1,y-1,3,3,black);
                }
            }
        },
        prev:function(o,x,y,click){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 1){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
            }
            if(click) if(obj){
                if(!o.selObj){
                    o.selObj = obj;
                    o.selLX = obj.x;
                    o.selLY = obj.y;
                }
            }

            return [Math.floor(x),Math.floor(y),obj];
        },
        prev2:function(o,x,y){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 6){
                x = o.x+dx/dist*6;
                y = o.y+dy/dist*6;
            }
            let vhb = [-1,-1,2,2];
            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.vhb){
                    if(x+vhb[2]-1 >= s.x+s.vhb[0] && x+vhb[0] < s.x+s.vhb[2] && y+vhb[3]-1 >= s.y+s.vhb[1] && y+vhb[1] < s.y+s.vhb[3]){
                        obj = s;
                        return;
                    }
                }
            }
            nob.drawRect(x-1,y-1,3,3,black);
            return [Math.floor(x),Math.floor(y)];
        }
    },
    51:{ //hoe
        mouseUp:function(button,o){
            if(button == 0) o.selObj = null;
            else if(button == 2){
                let r = this.prev2(o,mx,my);
                if(r){
                    let da = createTilledDirt(r[0],r[1],false);
                    let dirs = [null,null,null,null];
                    for(let j = 0; j < sobjs.length; j++){
                        let s = sobjs[j];
                        if(s.type == 0){
                            if(s.x > da.x && s.y == da.y) if(da.x+3 >= s.x-1 && da.x+3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[2] = s;
                            if(s.x < da.x && s.y == da.y) if(da.x-3 >= s.x-1 && da.x-3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[3] = s;
                            if(s.y > da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y+3 >= s.y-1 && da.y+3 <= s.y+2) dirs[1] = s;
                            if(s.y < da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y-3 >= s.y-1 && da.y-3 <= s.y+2) dirs[0] = s;
                        }
                    }
                    if(dirs[2]){
                        da.rightObj = dirs[2];
                        dirs[2].leftObj = da;
                        da.right = true;
                        dirs[2].left = true;
                    }
                    if(dirs[3]){
                        da.leftObj = dirs[3];
                        dirs[3].rightObj = da;
                        da.left = true;
                        dirs[3].right = true;
                    }
                    if(dirs[1]){
                        da.downObj = dirs[1];
                        dirs[1].upObj = da;
                        da.down = true;
                        dirs[1].up = true;
                    }
                    if(dirs[0]){
                        da.upObj = dirs[0];
                        dirs[0].downObj = da;
                        da.up = true;
                        dirs[0].down = true;
                    }
                    sobjs.push(da);
                }
            }
        },
        keybinds:function(o){
            let r, ro;
            if(mouseDown[2]){
                this.prev2(o,mx,my);
            }
            else{
                r = this.prev(o,mx,my,mouseDown[0]);
                ro = r[2];
                if(ro) if(ro.type === 0){
                    let obj = ro;
                    subAnim(1,function(){
                        nob.setPixel(obj.x,obj.y,white);
                    });
                }
            }
            if(mouseDown[0]){
                let x = r[0];
                let y = r[1];
                if(o.selObj) if(o.selObj.type === 0){
                    let obj = o.selObj;

                    let dx = x-obj.x;
                    let dy = y-obj.y;
                    if(dx == 0 && dy == 0) return;
                    let horz = Math.abs(dx)>Math.abs(dy);
                    let dx2 = x-o.selLX;
                    let dy2 = y-o.selLY;
                    let dxn = dx2/Math.abs(dx2);
                    let dyn = dy2/Math.abs(dy2);
                    let dist = Math.sqrt(dx2*dx2+dy2*dy2);
                    if(dist > 5) return;

                    if(horz){
                        y = obj.y;
                    }
                    else{
                        x = obj.x;
                    }

                    let ob;
                    for(let i = 0; i < sobjs.length; i++){
                        let s = sobjs[i];
                        if(s.type == 0){
                            if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) ob = s;
                        }
                    }
                    if(!ob){ //preview tilled soil spot
                        if(horz) obj.horz = true;
                        else obj.horz = false;
                        for(let i = 0; i < Math.max(3,Math.abs(horz?dx2:dy2)); i += 3){
                            if(horz ? (Math.abs(dx)%3 == 0) : (Math.abs(dy)%3 == 0)){
                                let da = createTilledDirt(x+(horz?(i*dxn):0),y+(!horz?(i*dyn):0),horz);
                                sobjs.push(da);
                                o.selLX = da.x;
                                o.selLY = da.y;

                                let dirs = [null,null,null,null];
                                for(let j = 0; j < sobjs.length; j++){
                                    let s = sobjs[j];
                                    if(s.type == 0){
                                        if(s.x > da.x && s.y == da.y) if(da.x+3 >= s.x-1 && da.x+3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[2] = s;
                                        if(s.x < da.x && s.y == da.y) if(da.x-3 >= s.x-1 && da.x-3 <= s.x+2 && da.y >= s.y-1 && da.y <= s.y+2) dirs[3] = s;
                                        if(s.y > da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y+3 >= s.y-1 && da.y+3 <= s.y+2) dirs[1] = s;
                                        if(s.y < da.y && s.x == da.x) if(da.x >= s.x-1 && da.x <= s.x+2 && da.y-3 >= s.y-1 && da.y-3 <= s.y+2) dirs[0] = s;
                                    }
                                }
                                if(dirs[2]){
                                    da.rightObj = dirs[2];
                                    dirs[2].leftObj = da;
                                    da.right = true;
                                    dirs[2].left = true;
                                }
                                if(dirs[3]){
                                    da.leftObj = dirs[3];
                                    dirs[3].rightObj = da;
                                    da.left = true;
                                    dirs[3].right = true;
                                }
                                if(dirs[1]){
                                    da.downObj = dirs[1];
                                    dirs[1].upObj = da;
                                    da.down = true;
                                    dirs[1].up = true;
                                }
                                if(dirs[0]){
                                    da.upObj = dirs[0];
                                    dirs[0].downObj = da;
                                    da.up = true;
                                    dirs[0].down = true;
                                }
                            }
                        }
                    }
                    else{
                        o.selLX = ob.x;
                        o.selLY = ob.y;
                        ob.horz = horz;
                    }
                    nob.drawRect(x-1,y-1,3,3,black);
                }
            }
        },
        prev:function(o,x,y,click){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 0){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
            }
            if(click) if(obj){
                if(!o.selObj){
                    o.selObj = obj;
                    o.selLX = obj.x;
                    o.selLY = obj.y;
                }
            }

            return [Math.floor(x),Math.floor(y),obj];
        },
        prev2:function(o,x,y){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 6){
                x = o.x+dx/dist*6;
                y = o.y+dy/dist*6;
            }
            let vhb = [-1,-1,2,2];
            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.vhb){
                    if(x+vhb[2]-1 >= s.x+s.vhb[0] && x+vhb[0] < s.x+s.vhb[2] && y+vhb[3]-1 >= s.y+s.vhb[1] && y+vhb[1] < s.y+s.vhb[3]){
                        obj = s;
                        return;
                    }
                }
            }
            nob.drawRect(x-1,y-1,3,3,black);
            return [Math.floor(x),Math.floor(y)];
        }
    },
    52:{ //seed bag
        keybinds:function(o){
            let r = this.prev(o,mx,my,mouseDown[0]);
            let ro = r[2];
            if(ro) if(ro.type === 0){
                let obj = ro;
                subAnim(1,function(){
                    nob.setPixel(obj.x,obj.y,white);
                });
            }
            if(mouseDown[0]) if(ro) if(!ro.seed){
                let w = o.equip.weapon;
                let id = w.id;
                if(w.amt[id] > 0){
                    w.amt[id]--;
                    ro.seed = {
                        id,
                        i:0,
                        c:0
                    };
                }
            }
        },
        prev:function(o,x,y,click){
            //y += 3;

            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 0){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
            }
            /*if(click) if(obj){
                if(!o.selObj){
                    o.selObj = obj;
                    o.selLX = obj.x;
                    o.selLY = obj.y;
                }
            }*/

            return [Math.floor(x),Math.floor(y),obj];
            //nob.drawRect(x-1,y-1,2,2,black);
        }
    },
    53:{ //watering can

    },
    54:{ //bucket
        keybinds:function(o){
            let r = this.prev(o,mx,my);
            let ro = r[2];
            if(ro) if(ro.type == 1){
                let obj = ro;
                subAnim(1,function(){
                    nob.setPixel(obj.x,obj.y,white);
                });
                let item = o.equip.weapon;
                if(item.id != 0) if(ro.fluid == 0) if(mouseOnce(0)){
                    setFluid(ro,item.id);
                    particleSims.splash(ro.x,ro.y,0,r[3],r[4],0.5,colors.fluids[item.id-1],4);
                    item.id = 0;
                }
            }
        },
        prev:function(o,x,y,click){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            let liq;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 1){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
                if(s.lhb) if(dist <= 14){
                    if(mx >= s.x+s.lhb[0]-1 && mx <= s.x+s.lhb[2] && my >= s.y+s.lhb[1]-s.lhb[3]-s.lhb[4]-1 && my <= s.y-s.lhb[4] && Math.abs(o.z-s.lhb[4]) <= 60) liq = s;
                }
            }
            if(click) if(obj){
                if(!o.selObj){
                    o.selObj = obj;
                    o.selLX = obj.x;
                    o.selLY = obj.y;
                }
            }

            if(liq){
                let lhb = liq.lhb;
                if(liq.lhover != null) liq.lhover = true;
                else subAnim(1,function(){
                    nob.drawRect(liq.x+lhb[0],liq.y+lhb[1]-lhb[3]-lhb[4],lhb[2]-lhb[0],lhb[3]-lhb[1],white);
                });

                //display info

                let cap = liq.cap;
                let max = liq.maxCap;
                let n = cap+"/"+max;
                nob3.drawText(n,liq.x*guiScale3,(liq.y-lhb[4]+lhb[1])*guiScale3-10,white,black);

                //

                let item = o.equip.weapon;
                if(item.id != 0) if(liq.cap < liq.maxCap) if(mouseOnce(0)){
                    if(liq.onPutFluid) liq.onPutFluid(o,dx/dist,dy/dist);
                    particleSims.splash(liq.x,liq.y,lhb[4],0,0,0.5,colors.fluids[item.id-1],4);
                    item.id = 0;
                    liq.cap++;
                }
                if(item.id == 0) if(mouseOnce(2)){
                    if(liq.overrideTakeFluid){
                        if(liq.onTakeFluid) liq.onTakeFluid(o,dx/dist,dy/dist);
                    }
                    else if(liq.cap > 0){
                        if(liq.onTakeFluid) liq.onTakeFluid(o,dx/dist,dy/dist);
                        liq.cap--;
                        item.id = liq.fluid;
                        particleSims.splash(liq.x,liq.y,lhb[4],0,0,0.2,colors.fluids[item.id-1],1);
                    }
                }
            }

            return [Math.floor(x),Math.floor(y),obj,dx/dist,dy/dist];
        },
    },
    55:{ //Sickle
        mouseUp:function(button,o){
            let r = this.prev(o,mx,my);
            let ro = r[2];
            if(button == 0) if(ro) if(ro.seed){
                let needed = 0;
                switch(ro.seed.id){
                    case 0:
                        needed = 2;
                        break;
                    case 1:
                        break;
                }
                if(!o.isAttacking) if(needed <= ro.seed.c){
                    giveDrops(plantData[ro.seed.id].getDrops(o,ro.seed),o);
                    console.log(ro.x,ro.y,ro.z);
                    if(plantData[ro.seed.id].onDestroy) plantData[ro.seed.id].onDestroy(ro.x,ro.y,ro.z,ro.seed);
                    ro.seed = null;
                    

                    let dx = mx-o.x;
                    let dy = my-o.y;
                    let ang = Math.atan2(dy,dx);
                    if(ang < 0) ang += Math.PI*2;
                    ang += Math.PI;
                    if(ang >= Math.PI*2) ang -= Math.PI*2;
                    o.isAttacking = true;
                    let ff = tt.tools.sickle.swing;
                    let v = Math.floor(ang/(Math.PI*2)*ff.length);
                    function arAt(i){
                        if(i < 0) i = ff.length-1;
                        else if(i >= ff.length) i = 0;
                        return ff[i];
                    }
                    let f = [arAt(v-1),arAt(v),arAt(v+1)];
                    let d = createParticleAnim(f,o.x,o.y-1,o.z,true,1);
                    subAnim(f.length*(f.delay||4),function(i,t){
                        d.x = o.x;
                        d.y = o.y-1;
                        d.z = o.z;
                        if(i == t-1) o.isAttacking = false;
                    });
                }
            }
        },
        keybinds:function(o){
            this.prev(o,mx,my);
        },
        prev:function(o,x,y){
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 0){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
            }

            if(obj) if(obj.type === 0){
                subAnim(1,function(){
                    nob.setPixel(obj.x,obj.y,white);
                });
            }

            return [Math.floor(x),Math.floor(y),obj];
        }
    },
    56:{ //Tamper
        keybinds:function(o){
            let x = mx;
            let y = my;
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 0 || s.type == 1){
                    if(x >= s.x-1 && x <= s.x+2 && y >= s.y-1 && y <= s.y+2) obj = s;
                }
            }

            if(obj) if(obj.type == 0 || obj.type == 1){
                subAnim(1,function(){
                    nob.setPixel(obj.x,obj.y,white);
                });
                if(mouseDown[0]){
                    obj.destroy();
                }
            }
        }
    },
    57:{ //Axe
        keybinds:function(o){
            let x = mx;
            let y = my;
            let dx = x-o.x;
            let dy = y-o.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            let ang = Math.atan2(dy,dx);
            if(dist > 8){
                x = o.x+dx/dist*8;
                y = o.y+dy/dist*8;
            }

            x = Math.floor(x);
            y = Math.floor(y);

            let obj;
            for(let i = 0; i < sobjs.length; i++){
                let s = sobjs[i];
                if(s.type == 2){

                    let tx = Math.floor(Math.sin(s.a)*s.l+s.x);
                    let tz = Math.floor(Math.cos(s.a)*s.l+s.z);

                    let res = nob.isPixelInLine(s.x,s.y,tx,s.y-tz,s.w,x,y);
                    if(res) obj = s;
                }
            }

            if(obj) if(obj.type == 2){
                subAnim(1,function(){
                    nob.setPixel(x,y,white);
                });
                if(mouseOnce(0)){
                    obj.hp--;
                    if(obj.hp <= 0){
                        if(!obj.getDrops) obj.beginFell = true;
                        else{
                            giveDrops(obj.getDrops(o),o);
                            if(obj.destroy) obj.destroy(o);
                            else removeSObj(obj);
                        }
                    }

                    if(ang < 0) ang += Math.PI*2;
                    ang += Math.PI;
                    if(ang >= Math.PI*2) ang -= Math.PI*2;
                    o.isAttacking = true;
                    let ff = tt.tools.sickle.swing;
                    let v = Math.floor(ang/(Math.PI*2)*ff.length);
                    function arAt(i){
                        if(i < 0) i = ff.length-1;
                        else if(i >= ff.length) i = 0;
                        return ff[i];
                    }
                    let f = [arAt(v-1),arAt(v),arAt(v+1)];
                    let d = createParticleAnim(f,o.x,o.y-1,o.z,true,1);
                    subAnim(f.length*(f.delay||4),function(i,t){
                        d.x = o.x;
                        d.y = o.y-1;
                        d.z = o.z;
                        if(i == t-1) o.isAttacking = false;
                    });
                    particleSims.splash(x,y,obj.z,-dx/dist/2,-dy/dist/2,0.5,black,2);
                }
            }
        }
    },
    58:{ //Chain
        keybinds:function(o){
            let tool = o.equip.weapon;
            
            if(mouseDown[2]) tool.obj = null;
            if(tool.obj != null){
                let obj = tool.obj;
                let dx = o.x-obj.x;
                let dy = o.y-obj.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                
                let tx = Math.floor(Math.sin(obj.a)*obj.l+obj.x);
                let ty = Math.floor(Math.cos(obj.a)*obj.l+obj.y);
                
                

                obj.x += o.x-tool.x;
                obj.y += o.y-tool.y;

                let dx2 = obj.x-tx;
                let dy2 = obj.y-ty;
                //let ang = Math.atan2(dy2,dx2);
                //obj.a = ang;
                //let dist2 = Math.sqrt(dx2*dx2+dy2*dy2);
                //obj.l = dist2;

                if(dist > tool.l){
                    moveObj(o,tool.x-o.x,tool.y-o.y,0);
                }
                else{
                    tool.x = o.x;
                    tool.y = o.y;
                }
                let dep = o.y+(o.z+3)*nob.height;
                nob.drawLine_smart_dep(o.x,o.y,obj.x,obj.y,black,1,0);
                nob.drawLine_smart_dep(o.x,o.y-o.z-3,obj.x,obj.y,black,3,dep);
                nob.drawLine_smart_dep(o.x,o.y-o.z-3,obj.x,obj.y,gray,1,dep);
            }
            else{
                let x = mx;
                let y = my;
                let dx = x-o.x;
                let dy = y-o.y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                if(dist > 8){
                    x = o.x+dx/dist*8;
                    y = o.y+dy/dist*8;
                }

                x = Math.floor(x);
                y = Math.floor(y);

                let obj;
                for(let i = 0; i < sobjs.length; i++){
                    let s = sobjs[i];
                    //if(s.type == 2){
                    {        /*let hw = Math.ceil(s.w/2);

                            let tx = Math.floor(Math.sin(s.a)*s.l+s.x);
                            let ty = Math.floor(Math.cos(s.a)*s.l+s.y);
                            //if(x == s.x && y == s.y) obj = s;

                            let res = nob.isPixelInLine(s.x,s.y,tx,-ty,2,x,y);
                            if(res) obj = s;
                            */
                            /*if(x >= s.x && x <= s.x+s.l && y >= s.y-hw && y <= s.y+hw){
                                obj = s;
                            }*/
                        if(x >= s.x-1 && x <= s.x && y >= s.y-1 && y <= s.y) obj = s;
                    }
                }

                if(obj){
                    subAnim(1,function(){
                        nob.setPixel(x,y,white);
                    });
                    if(mouseDown[0]){
                        tool.obj = obj;
                        tool.l = dist;
                        tool.x = o.x;
                        tool.y = o.y;
                    }
                }
            }
        }
    }
};
/*setTimeout(function(){
    changeClass(me,3);
},20);*/

var items = {
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
    knife:{
        rusty:{
            name:"Rusty Knife",
            type:WeaponType.Knife,
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
    },
    shovel:{
        rusty:{
            name:"Rusty Shovel",
            type:WeaponType.Shovel,
        }
    },
    hoe:{
        rusty:{
            name:"Rusty Hoe",
            type:WeaponType.Hoe,
        }
    },
    seedbag:{
        basic:{
            name:"Seed Bag",
            type:WeaponType.SeedBag,
            onCreate:function(w){
                w.id = 0;
                w.amt = [
                    0,
                    0
                ];
                w.size = 60;
            }
        }
    },
    wateringcan:{
        small:{
            name:"Watering Can",
            type:WeaponType.WateringCan
        }
    },
    bucket:{
        small:{
            name:"Bucket",
            type:WeaponType.Bucket,
            onCreate:function(w){
                w.id = 0;
            }
        }
    },
    sickle:{
        small:{
            name:"Small Sickle",
            type:WeaponType.Sickle
        }
    },
    tamper:{
        basic:{
            name:"Tamper",
            type:WeaponType.Tamper
        }
    },
    axe:{
        rusty:{
            name:"Rusty Axe",
            type:WeaponType.Axe
        }
    },
    chain:{
        rusty:{
            name:"Rusty Chain",
            type:WeaponType.Chain
        }
    },
    materials:{
        wheat:{
            name:"Wheat",
            amt:1,
            info:"A BASIC CROP. DROPS FROM HARVESTING WHEAT"
        },
        wheatSeed:{
            name:"Wheat Seeds",
            type:-1,
            subType:0,
            amt:1,
        },
        stick:{
            name:"Stick",
            amt:1,
            info:"A BASIC CRAFTING MATERIAL"
        },
        small_rock:{
            name:"Small Rock",
            amt:1,
            info:"A BASIC CRAFTING MATERIAL"
        },
        wood:{
            name:"Wood",
            amt:1,
            info:"A CRAFTING MATERIAL. USEFUL FOR BUILDING"
        },
        "raw_pork":{
          name:"Raw Pork",
          amt:1,
          info:"RAW FOOD. DROPS FROM PIGS"
        },
        "raw_beef":{
          name:"Raw Beef",
          amt:1,
          info:"RAW FOOD. DROPS FROM COWS"
        },
        "cooked_pork":{
          name:"Cooked Pork",
          amt:1,
          info:"COOKED FOOD"
        },
        "cooked_beef":{
          name:"Cooked Beef",
          amt:1,
          info:"COOKED BEEF"
        }
    }
};
class Item{
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
    getInfo(){
        return this.ref.info||"-NO INFO123-";
    }
}
function createItem(weapon,amt){ //takes item ref: item.katana
    let w = new Item(weapon);
    if(weapon.onCreate) weapon.onCreate(w);
    if(amt) w.amt = amt;
    else if(weapon.amt) w.amt = weapon.amt;
    return w;
}
var emptyItem = createItem({
    name:"Empty",
    type:WeaponType.Wild
});
var wepTypes = [
    WeaponType.Katana,
    WeaponType.Pistol,
    WeaponType.Sniper,
    WeaponType.Wand,
    WeaponType.Staff,
    WeaponType.Wild
];
var toolTypes = [
    WeaponType.Shovel,
    WeaponType.Hoe,
    WeaponType.SeedBag,
    WeaponType.WateringCan,
    WeaponType.Bucket,
    WeaponType.Sickle,
    WeaponType.Tamper,
    WeaponType.Axe,
    WeaponType.Chain
];
function canUseWeapon(o,item){
    if(!item) return false;
    let type = item.getType();
    if(toolTypes.includes(type)) return true;
    let cd = classData[o.classId];
    if(type == WeaponType.Wild) return true;
    if(!cd.allowedWeapons.includes(type)) return false;
    if(item.ref.lvlReq > o.lvl) return false;
    else return true;
}

function createTilledDirt(x,y,horz,type=0){
    particleSims.splash(x,y,0,0,0,0.5,black,4);
    let da = {
        x,
        y,
        horz,
        type, //soil,dughole
        right:false,
        left:false,
        up:false,
        down:false,
        vhb:[-1,-1,2,2],
        destroy:function(){
            let obj = this;
            let b;
            if(obj.right){
                b = obj.rightObj;
                b.left = false;
                b.leftObj = null;
            }
            if(obj.left){
                b = obj.leftObj;
                b.right = false;
                b.rightObj = null;
            }
            if(obj.up){
                b = obj.upObj;
                b.down = false;
                b.downObj = null;
            }
            if(obj.down){
                b = obj.downObj;
                b.up = false;
                b.upObj = null;
            }
            particleSims.splash(obj.x,obj.y,0,0,0,0.3,black,2);
            removeSObj(obj);
        },
        preUpdate:function(){
            this.ran = false;
        },
        update:function(){
            let col = colors.soil;
            if(this.type == 1){
                col = colors.hole;
                if(this.fluid == 1) col = colors.water;
            }
            nob.setPixel_dep(this.x,this.y-1,black,this.y);

            nob.setPixel_dep(this.x-1,this.y,black,this.y);
            nob.setPixel_dep(this.x,this.y,black,this.y);
            nob.setPixel_dep(this.x+1,this.y,black,this.y);

            nob.setPixel_dep(this.x,this.y+1,black,this.y);

            nob.setPixel_dep(this.x,this.y,col,this.y+2);
            if(this.type == 0){
                if(this.horz){
                    if(this.right){
                        nob.setPixel_dep(this.x+1,this.y,col,this.y+2);
                        nob.setPixel_dep(this.x+1,this.y-1,black,this.y);
                        nob.setPixel_dep(this.x+1,this.y+1,black,this.y);
                    }
                    if(this.left){
                        nob.setPixel_dep(this.x-1,this.y,col,this.y+2);
                        nob.setPixel_dep(this.x-1,this.y-1,black,this.y);
                        nob.setPixel_dep(this.x-1,this.y+1,black,this.y);
                    }
                }
                else{
                    if(this.up){
                        nob.setPixel_dep(this.x,this.y-1,col,this.y+3);
                        nob.setPixel_dep(this.x-1,this.y-1,black,this.y+1);
                        nob.setPixel_dep(this.x+1,this.y-1,black,this.y+1);
                    }
                    if(this.down){
                        nob.setPixel_dep(this.x,this.y+1,col,this.y+2);
                        nob.setPixel_dep(this.x-1,this.y+1,black,this.y);
                        nob.setPixel_dep(this.x+1,this.y+1,black,this.y);
                    }
                }
            }
            else if(this.type == 1){
                if(this.right){
                    nob.setPixel_dep(this.x+1,this.y,col,this.y+2);
                    nob.setPixel_dep(this.x+1,this.y-1,black,this.y);
                    nob.setPixel_dep(this.x+1,this.y+1,black,this.y);
                }
                if(this.left){
                    nob.setPixel_dep(this.x-1,this.y,col,this.y+2);
                    nob.setPixel_dep(this.x-1,this.y-1,black,this.y);
                    nob.setPixel_dep(this.x-1,this.y+1,black,this.y);
                }
                if(this.up){
                    nob.setPixel_dep(this.x,this.y-1,col,this.y+3);
                    nob.setPixel_dep(this.x-1,this.y-1,black,this.y+1);
                    nob.setPixel_dep(this.x+1,this.y-1,black,this.y+1);
                }
                if(this.down){
                    nob.setPixel_dep(this.x,this.y+1,col,this.y+2);
                    nob.setPixel_dep(this.x-1,this.y+1,black,this.y);
                    nob.setPixel_dep(this.x+1,this.y+1,black,this.y);
                }

                //handle fluid
                if(this.fluid != 0){
                    //nob.setPixel_dep(this.x,this.y,colors.water,this.y+3);
                    if(!this.ran) if(frames%4 == 0){
                        let obj;

                        //FIX TURNS AND ALL

                        switch(this.fluidDir){
                            case 0:
                                if(!this.up || (this.up?this.upObj.fluid!=0:false)){
                                    if(this.right){ 
                                        this.fluidDir = 2;
                                    }
                                    else if(this.left) this.fluidDir = 3;
                                    else this.fluidDir = 1;
                                }
                                break;
                            case 1:
                                if(!this.down || (this.down?this.downObj.fluid!=0:false)){
                                    if(this.left){ 
                                        this.fluidDir = 3;
                                    }
                                    else if(this.right) this.fluidDir = 2;
                                    else this.fluidDir = 0;
                                }
                                break;
                            case 2:
                                if(!this.right || (this.right?this.rightObj.fluid!=0:false)){
                                    if(this.down){ 
                                        this.fluidDir = 1;
                                    }
                                    else if(this.up) this.fluidDir = 0;
                                    else this.fluidDir = 3;
                                }
                                break;
                            case 3:
                                if(!this.left || (this.left?this.leftObj.fluid!=0:false)){
                                    if(this.up){ 
                                        this.fluidDir = 0;
                                    }
                                    else if(this.down) this.fluidDir = 1;
                                    else this.fluidDir = 2;
                                }
                                break;
                        }

                        //

                        switch(this.fluidDir){
                            case 0:
                                obj = this.upObj;
                                break;
                            case 1:
                                obj = this.downObj;
                                break;
                            case 2:
                                obj = this.rightObj;
                                break;
                            case 3:
                                obj = this.leftObj;
                                break;
                        }
                        if(obj){
                            if(obj.fluid != 0){
                                if(obj.fluidDir != this.fluidDir){
                                    //this.fluidDir = obj.fluidDir;//toOppArr[this.fluidDir];
                                }
                                else{
                                    obj.fluidWatch = this;
                                }
                            }
                            else{
                                obj.fluid = this.fluid;
                                obj.fluidDir = this.fluidDir;
                                this.fluid = 0;
                                obj.ran = true;
                                this.ran = false;
                                //this.fluidDir = 0;
                                if(this.fluidWatch){
                                    runFluidWatch(this);
                                }
                            }
                        }
                        else{
                            //let last = this.fluidDir;
                            
                            /*if(this.fluidDir != last){
                                //this.ran = false;
                                //this.update();
                            }*/
                            //this.fluidDir = toOppArr[this.fluidDir];
                        }
                    }
                    this.ran = true;
                }
            }

            //draw plant
            if(this.seed){
                this.seed.i++;
                switch(this.seed.id){
                    case 0: //Wheat
                        let h = Math.min(2,Math.floor(this.seed.i/360*2));
                        this.seed.c = h;
                        nob.setPixel_dep(this.x,this.y+1,black,this.y+2);
                        nob.setPixel_dep(this.x,this.y-h,black,this.y+2+(h*nob.height));
                        for(let i = 0; i < h; i++){
                            nob.setPixel_dep(this.x,this.y-i,colors.seeds[0],this.y+2+(i*nob.height));
                            nob.setPixel_dep(this.x-1,this.y-i,black,this.y+2+(i*nob.height));
                            nob.setPixel_dep(this.x+1,this.y-i,black,this.y+2+(i*nob.height));
                        }
                        break;
                }
            }
        }
    };
    if(type == 1){
        da.fluid = 0;
        da.fluidDir = 0;
    }
    return da;
}

function setFluid(o,id=1){
    o.fluid = id;
    let dirs = [];
    if(o.right) dirs.push(2);
    if(o.left) dirs.push(3);
    if(o.up) dirs.push(0);
    if(o.down) dirs.push(1);
    o.fluidDir = dirs[Math.floor(Math.random()*dirs.length)]||0;
}
function runFluidWatch(t){
    let ob = t.fluidWatch;
    t.fluid = ob.fluid;
    t.fluidDir = ob.fluidDir;
    t.ran = true;
    ob.fluid = 0;
    ob.ran = false;
    t.fluidWatch = null;
    //ob.update();
    if(ob.fluidWatch) runFluidWatch(ob);
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
    if(!eD) eD = {exp:1};
    let l = getClosestPlayersInRange(o.x,o.y,o.z,100)[0];
    let exp = eD.exp;
    for(let i = 0; i < l.length; i++){
        let p = l[i];
        giveExp(p,exp);
    }
    displayDamage(exp+" EXP",o.x*guiScale,o.y*guiScale,(o.z+10)*guiScale,epTypeCols[0],60);
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

/*document.addEventListener("wheel",e=>{
    let v = (e.deltaY < 0 ? 0.1 : -0.1);
    if(me.classId == CLASSES.Gunman){
        me.targZ += v;
    }
});*/

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
            name:"Dragon's Breath"
        },
        {
            name:"Flame Prison"
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
            name:"Tornado"
        },
        {
            name:"Air Push"
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
    me.inv.weapons.push(createItem(d));
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
        - "A" Does rushing penetrating attack, not implimented yet. <br><br>

        - Normal attacks and special attacks can be chained, for example: Holding "S" for swirl twice then imidiately pressing "D" for a slash will skip to the 3rd normal attack which is more powerful and can reach slightly behind you.
    `,
    `
    A class for long range attacks focused on doing consistant damage to enemies.<br><br>
    Controls for Gunman Class:<br><br>
        - Move with <span style='color:green'>WASD</span> keys. <br>
        - Jump with spacebar. <br><br>

        - Open/Close quick inventory with "Enter" and cycle<br>
        with "Up Arrow" or "Down Arrow". <br><br>

        - Aim with mouse. <br>
        - Hold left mouse button to shoot with normal attack, does not take energy. <br>
        - Hold "Shift" while shooting for a 2x faster shot that takes 1 energy per shot. <br>
        - Hold "C" while shooting for a 4x faster shot and 2x faster bullet that<br>
        takes 4 energy per shot.
    `,
    `
    A class for combat magic use. Used for attacks of all kinds and stunning or freezing<br>
    the enemy. Some defence capabilities.<br><br>
    <span style='text-decoration:underline'>Mage has not fully been completed yet. WIP</span><br>
        - Move with <span style='color:green'>WASD</span> keys. <br>
        - Jump with spacebar. <br><br>

        - Open/Close quick inventory with "Enter" and cycle<br>
        with "Up Arrow" or "Down Arrow". <br><br>

        - Aim with mouse and hold left mouse button for a bit to charge up spell, once the white indicator at your mouse position is gone, it will display a guide of where the attack will happen and then let go to execute spell.<br><br>

        (With the quick inventory closed)<br>
        <div style='margin-left:20px'>
              - press up or down arrow to cycle through spell element types.<br><br> 
              - press right or left arrow to bring up the spell menu and use the arrow keys to cycle through spells. Press "Enter" to close.</div>
    `,
    `
    A class for support magic use. Used for healing, bufs, and superior defence such<br>
    as making barriers and walls.<br><br>
    Sage has not been implimented yet.`,
    `
    A class focused on dark magic and bringing the dead back to life and using the enemy against themselves.<br><br>
    Necroman has not been implimented yet.`,
    `
    A class for mobbing, tracking fast moving enemies, and doing "damage over time" attacks by manipulating bugs.<br><br>
    Bugman has not been implimented yet.`
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

const recipes = [
    {
        res:items.materials.stick,
        resAmt:3,
        items:[items.materials.wood],
        amts:[1]
    }
];

function DebugActions(id=0){
  switch(id){
  case 0: //Add health
    me.hp += 2;
    break;
  case 1: //Add energy
    me.ep += 2;
    break;
  case 2: //Remove decor
    for(let i = 0; i < sobjs.length; i++){
      let s = sobjs[i];
      if(s.gId == "tall_grass"){
        sobjs.splice(i,1);
        i--;
      }
    }
    for(let i = 0; i < objs.length; i++){
      let o = objs[i];
      if(!o.getDrops){
        objs.splice(i,1);
        i--;
      }
    }
    break;
  case 3: //Toggle rain
    if(!me.world.isRaining){
        startRain(me.world);
        if(Math.random() < 0.3) me.world.rainAmt = Math.floor(Math.random()*4)+1;
        else me.world.rainAmt = 1;
    }
    else stopRain(me.world);
    me.world.lastRainTime = frames;
    break;
  case 4: //Rare drop anim
    window.scrollTo(0,0)
    setTimeout(function(){
      rareDrop_start();
    },500);
    break;
  case 5: //Load physics playground
    for(let i = 0; i < sobjs.length; i++){
      let s = sobjs[i];
      if(s.gId == "tree1"){
        removeSObj(s);
        i--;
      }
    }
    //MOVING COLLIDER TEST
    var cx = nob.centerX;
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
        let a = (i%90)/90*Math.PI*2;
        let tx = Math.floor(Math.cos(a)*r+x);
        let ty = Math.floor(Math.sin(a)*r+y);
        movingCube[0] = tx;
        movingCube[1] = ty;
        movingCube[2] = tx+35;
        movingCube[3] = ty+15;
        let d = movingCube[9];
        d.fx = tx-d.lx;
        d.fy = ty-d.ly;
        d.lx = tx;
        d.ly = ty;
    });
    //STAIRS 3
    colls.push([96,100,98,120,0,1]);
    colls.push([94,100,96,120,0,2]);
    colls.push([92,100,94,120,0,3]);
    colls.push([90,100,92,120,0,4]);
    colls.push([88,100,90,120,0,5]);
    //FIRST
    colls.push([30,30,40,40,0,5]); //left,top,right,bottom,down,up, rot, upHeightMap
    colls.push([43,30,53,40,11,15]);
    colls.push([60,40,100,40,0,10]);
    colls.push([80,20,81,60,0,10]);
    /*colls.push([40,70,50,80,-4,1,null,[
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9,
        0,1,2,3,4,5,6,7,8,9
    ]]);*/
    colls.push([30,100,32,120,0,1]);
    colls.push([32,100,34,120,0,2]);
    colls.push([34,100,36,120,0,3]);
    colls.push([36,100,38,120,0,4]);
    colls.push([38,100,40,120,0,5]);
    //stairs2
    colls.push([60,136,80,138,0,1]);
    colls.push([60,134,80,136,0,2]);
    colls.push([60,132,80,134,0,3]);
    colls.push([60,130,80,132,0,4]);
    colls.push([60,128,80,130,0,5]);
    colls.push([60,126,80,128,0,6]);
    colls.push([60,124,80,126,0,7]);
    colls.push([60,122,80,124,0,8]);
    colls.push([60,120,80,122,0,9]);
    //stairs3
    colls.push([86,100,88,120,0,6]);
    colls.push([84,100,86,120,0,7]);
    colls.push([82,100,84,120,0,8]);
    colls.push([80,100,82,120,0,9]);
    //
    colls.push([40,100,60,120,0,6]);
    colls.push([60,100,80,120,0,10]);
    colls.push([45,70,50,75,0,6]);
    break;
  }
}
let curTime_l = document.getElementById("curTime");
let time_i = document.getElementById("timeInp");
function setTime(a){
  a = parseInt(a);
  me.world.time = a;
  curTime_l.innerHTML = a;
  time_i.value = a;
}