var tt = {
    gollum:{
        main:tl.load("gollum/gollum_2.png"),
        idle:tl.loadAnim("gollum/gollum_idle.png","gollum_idle",16,16,null,{delay:20}),
        walk:tl.loadAnim("gollum/gollum_walk.png","gollum_walk",16,16,null,{delay:14}),
        throw:tl.loadAnim("gollum/gollum_throw.png","gollum_throw",16,16,null,{delay:6}),
        swing0:tl.loadAnim("gollum/gollum_swing0.png","gollum_swing0",16,16,null,{delay:6})
    },
    speedRoller:{
        main:tl.load("speedRoller/speedRoller.png"),
        blades:tl.loadAnim("speedRoller/speedRoller_blades.png","sr_blades",16,16),
        stunned:tl.loadAnim("speedRoller/speedRoller_stunned.png","sr_stunned",16,16,null,{delay:14}),
        roll:tl.loadAnim("speedRoller/speedRoller_roll.png","sr_roll",16,16)
    },
    chars:[
        tl.load("cool_char2.png")
    ],
    char:{
        main:tl.load("cool_char2.png"),
        walk:tl.loadAnim("c2_walk.png","c2_walk",12,12),
        dead:tl.loadAnim("char_dead.png","c2_dead",12,12,null,{delay:20}),
        //stretch:tl.loadAnim("c2_stretch.png",12,12)

        swing1:tl.loadAnim("c2_swing2.png","c2_swing1",24,24),
        swing2:tl.loadAnim("c2_swing3.png","c2_swing2",24,24),
        swing3:tl.loadAnim("c2_swing4.png","c2_swing3",24,24),
        swirl1:tl.loadAnim("c2_swirl1.png","c2_swirl1",24,24),
        stab1:tl.loadAnim("c2_stab1.png","c2_stab1",24,24),
    },
    scenes:[
        tl.load("scene1.2.png")
    ],
    bullets:{
        dirtball:tl.load("dirtball.png"),
        dart:tl.load("bullets/dart.png"),
        small:tl.load("bullets/smallBullet.png")
    },
    particles:{
        smoke:[
            tl.loadAnim("particles/smoke.png","smoke",16,16,null,{delay:4})
        ]
    },
    ui:{
        target:tl.loadAnim("ui/target.png","target",16,16,null,{delay:10}),
        lockTarget:tl.loadAnim("ui/lockTarget.png","lockTarget",16,16,null,{delay:10}),
        lockTarget2:tl.loadAnim("ui/lockTarget2.png","lockTarget2",16,16,null,{delay:10})
    },
    magic:{
        heal:tl.loadAnim("magic/heal2.png","heal",16,16)
    }
};
var enemyData = {
    gollum:{
        exp:20
    },
    speedRoller:{
        exp:50
    }
};

var anim = {
    char:function(o,id){
        let frame;
        switch(id){
            case 0: //idle
                nob.drawImage_basic(tt.char.main,o.x-6,o.y-11-o.z);
                break;
            case 1: //walk
                frame = Math.floor((frames%30)/(30/2));
                nob.drawImage_basic(tt.char.walk[frame],o.x-6,o.y-11-o.z);
                break;
            case 2: //swing1
                frame = Math.floor((frames%20)/(20/3));
                nob.drawImage_basic(tt.char.swing2[frame],o.x-12,o.y-23-o.z);
                break;
            case 3: //swirl1
                frame = Math.floor((frames%20)/(20/5));
                nob.drawImage_basic(tt.char.swirl1[frame],o.x-12,o.y-23-o.z);
                break;
        }
    }
};

function createParticleAnim(f,x,y,z,destroyAfterAnim=true){
    let d = {
        x,y,z,
        anim:{
            i:0,
            c:0,
            d:0,
            f:null
        },
        destroyAfterAnim
    };
    objs.push(d);
    startAnim(d,f,null,1);
    return d;
}

//colors ops

function tint(data,col){ //col must be [1,1,1] not [255,255,255]
    let d = deepClone(data);
    if(!d) return;
    for(let i = 0; i < d.length; i += 4){
        d[i] *= col[0];
        d[i+1] *= col[1];
        d[i+2] *= col[2];
    }
    return d;
}

function hitboxCollide(o,hb,en){
    let res = {hit:false};
    if(hb == null) return res;
    for(let bi = 0; bi < en.hitboxes.length; bi++){
        let box = en.hitboxes[bi];
        let flip = o.isFlipped;
        if(
            en.x+box[0] <= (flip?(o.x-hb[0]):(o.x+hb[2])) && en.x+box[2] >= (flip?(o.x-hb[2]):(o.x+hb[0]))
            && en.y+box[1] <= o.y+hb[3] && en.y+box[3] >= o.y+hb[1]
            && en.z+box[4] <= o.z+hb[5] && en.z+box[5] >= o.z+hb[4]
        ){
            //colliding
            res.who = en;
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
            res.hit = true;
            return res;
        }
    }
}

function getDamage(o,en,weaknessMulti){
    //let damage = o.mStrength;
    let damage = 0;
    let aa = getAAFromAnim(o);
    if(aa){
        let atk = aa.atk;
        damage += atk;
    }
    if(o.equip.weapon) damage += o.equip.weapon.ref.damage;
    let type = o.equip.weapon.getType();

    if(weaknessMulti != null){
        switch(type){
            case WeaponType.Katana:
                damage *= weaknessMulti/2;
                break;
            default:
                damage *= Math.max(weaknessMulti/4,1.5);
        }
    }

    let crit = (Math.random() < o.mCrt);
    if(crit) damage *= o.mCrtDam;

    return Math.floor(damage);
}
function displayDamage(amt,x,y,z,isPlayer,extraTime=0){
    let ranx = (Math.random()-0.5)*2;
    let rany = (Math.random()-0.5)*2;
    y -= z;
    subAnim(30+extraTime,function(i){
        let v = 20+extraTime;
        let h = Math.floor(v/2);
        let a = (i < v ? 255 : (255-(i-v)/h*255));
        let str = (amt<0?"+":"")+(Math.abs(amt)).toString();
        nob2.drawText(str,x+ranx,y+rany+(a != 255 ? 1 : 0),isPlayer===true?(amt>=0?[255,20,20,a]:[100,255,100,a]):isPlayer?isPlayer:[255,255,255,a],true);
    });
}
function dealDamage(amt,en,who){ //to enemy
    if(en.onHit) en.onHit(amt,who);
    en.hp -= amt;
    if(en.hp <= 0){
        awardEnemyDeath(en);
        destroyEnemyAnim(en);
    }
}
function takeDamage(amt,o,vx,vy,vz,display=true){ //to player
    if(o.isDead) return;
    o.hp -= amt;
    if(display) displayDamage(amt,o.x*guiScale,o.y*guiScale,(o.z+2)*guiScale,true);
    if(vx) o.vx += vx;
    if(vy) o.vy += vy;
    if(vz) o.vz += vz;
    if(vz > 0) o.grounded = false;
    if(o.hp <= 0){
        console.warn("PLAYER DEAD");
        o.isDead = true;
        startAnim(o,tt.char.dead,null,0);
    }
    if(o.hp > o.maxHp) o.hp = o.maxHp;
}

function hitHelper(a,o){
    if(a.i == 0) a.data = {};
    switch(a.f){
        case tt.char.swing1:
        case tt.char.swing2:
        case tt.char.swing3:
            if(a.c == 1){
                for(let i = 0; i < ens.length; i++){
                    let en = ens[i];
                    let hb = getHBFromAnim(o);//aa.swing1.hb[0];
                    let res = hitboxCollide(o,hb,en);
                    if(res) if(res.hit){
                        console.warn("HIT!: " + res.box[6]);
                        subAnim(8,function(i,t){
                            if(i == t-1) en.tint = [1,1,1];
                            else en.tint = [1,0,0];
                        });
                        let damage = getDamage(o,en,res.box[7]);
                        displayDamage(damage,res.x,res.y,res.z);
                        dealDamage(damage,en);
                    }
                }
            }
            break;
        case tt.char.swirl1:
            for(let i = 0; i < ens.length; i++){
                let en = ens[i];
                let hb = aa.swirl1.hb[a.c];
                let res = hitboxCollide(o,hb,en);
                if(res) if(res.hit){
                    console.warn("HIT!: " + res.box[6]);
                    subAnim(5,function(i,t){
                        if(i == t-1) en.tint = [1,1,1];
                        else en.tint = [1,0,0];
                    });
                    let damage = getDamage(o,en,res.box[7]);
                    displayDamage(damage,res.x,res.y,res.z);
                    dealDamage(damage,en);
                }
            }
            break;
    }
}

function getHBFromAnim(o){
    switch(o.anim.f){
        case tt.char.swing1:
            return aa.swing1.hb[0];
        case tt.char.swing2:
            return aa.swing2.hb[0];
        case tt.char.swing3:
            return aa.swing3.hb[0];
        case tt.char.swirl1:
            return aa.swirl1.hb[o.anim.c];
    }
}
function getAAFromAnim(o){
    switch(o.anim.f){
        case tt.char.swing1:
            return aa.swing1;
        case tt.char.swing2:
            return aa.swing2;
        case tt.char.swing3:
            return aa.swing3;
        case tt.char.swirl1:
            return aa.swirl1;
    }
}
var aa = {
    swing1:{
        hb:[
            [3,-9,6,0,0,3],
        ],
        atk:3
    },
    swing2:{
        hb:[
            [1,-8,4,-1,0,4],
        ],
        atk:3
    },
    swing3:{
        hb:[
            [-6,-3,5,0,0,1]
        ],
        atk:5
    },
    swirl1:{
        hb:[
            [3,-4,6,2,0,2],
            [-5,-1,5,2,0,2],
            [-6,-4,-3,2,0,2],
            [-5,-10,5,-7,0,2],
            [3,-10,6,-6,0,2]
        ],
        atk:1
    }
};

function deleteEnemy(en){
    ens.splice(ens.indexOf(en),1);
}
function destroyEnemyAnim(en){
    en.visible = false;
    let pixels = 0;
    let img = deepClone(en.baseImg);
    let d = img.data;
    let objs = [];
    en.x = Math.floor(en.x);
    en.y = Math.floor(en.y);
    let x = en.x;
    let y = en.y;
    en.vx = 0;
    en.vy = 0;
    en.vz = 0;
    deleteEnemy(en);
    for(let i = 0; i < d.length; i += 4){
        if(d[i+3] != 0 && d[i] == 0 && d[i+1] == 0 && d[i+2] == 0){
            pixels++;
            let x = (i%(img.w*4))/4;
            let y = Math.floor(i/(img.w*4));
            x += en.x;
            y += en.y;
            x -= Math.floor(img.w/2);
            y -= img.h;
            objs.push([x,y,0,0,[d[i],d[i+1],d[i+2],d[i+3]],0]);
        }
    }
    let n2 = registerNob(null,nob.width,nob.height).nob;
    //n2.setPixel(5,5,[255,0,255,255]);
    let evt;
    evt = subAnim(60000,function(i){
        if(i%2 == 0){
            n2.pixelCount = 0;
            n2.buf = new Uint8ClampedArray(n2.size);
            let obs = [];
            for(let j = 0; j < objs.length; j++){
                obs.push(objs[j]);
            }
            for(let j = 0; j < obs.length; j++){
                let o = obs[j];
                if(!n2.isFree(o[0],o[1])){
                    o[1]--;
                }
                if(n2.isFree(o[0],o[1]+1)){
                    o[1]++;
                }
                else if(n2.isFree(o[0]-1,o[1]+1)){
                    o[0]--;
                    o[1]++;
                }
                else if(n2.isFree(o[0]+1,o[1]+1)){
                    o[0]++;
                    o[1]++;
                }
                let dx = o[0]-en.x;
                let rad = Math.floor(img.w/2);
                let ty = en.y;
                if(Math.abs(dx) < rad) ty++;
                if(o[1] > ty){ //en.y
                    o[1] = ty;
                    o[5]++;
                    if(o[5] > 1) objs.splice(objs.indexOf(o),1);
                }
                n2.setPixel(o[0],o[1],o[4]);
            }
        }
        let imgN = fromNob(n2);
        nob.drawImage_basic(imgN,0,0);
        if(objs.length == 0){
            //console.log("CLEARED: ",evt);
            clearEvt(evt);
        }
    });
}

function cloneWhenLoaded(img){
    let d = {img};
    let f = function(d){
        if(!d.img.loaded) setTimeout(f,10,d);
        else d.img = deepClone(d.img);
    };
    setTimeout(f,10,d);
    return d;
}
function getPlayersInRange(x,y,z,r){
    let list = [];
    
    return list;
}
function getClosestPlayersInRange(x,y,z,r){
    let list = [];
    let dList = [9999];
    for(let i = 0; i < players.length; i++){
        let o = players[i];
        if(!o.isDead){
            let dx = o.x-x;
            let dy = o.y-y;
            let dz = o.z-z;
            let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
            if(dist < r){
                let l = dList.length;
                for(let j = 0; j < l; j++){
                    let d = dList[j];
                    if(dist < d){
                        dList.splice(j,0,dist);
                        list.splice(j,0,o);
                    }
                }
            }
        }
    }
    return [list,dList];
}
function getClosestEnemiesInRange(x,y,z,r){
    let list = [];
    let dList = [9999];
    for(let i = 0; i < ens.length; i++){
        let o = ens[i];
        if(!o.isDead){
            let dx = o.x-x;
            let dy = o.y-y;
            let dz = o.z-z;
            let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
            if(dist < r){
                let l = dList.length;
                for(let j = 0; j < l; j++){
                    let d = dList[j];
                    if(dist < d){
                        dList.splice(j,0,dist);
                        list.splice(j,0,o);
                    }
                }
            }
        }
    }
    return [list,dList];
}
function getClosestPlayerInRange(x,y,z,r){
    let p;
    let d = 9999;
    for(let i = 0; i < players.length; i++){
        let o = players[i];
        if(!o.isDead){
            let dx = o.x-x;
            let dy = o.y-y;
            let dz = o.z-z;
            let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
            if(dist < r) if(dist < d){
                d = dist;
                p = o;
            }
        }
    }
    return p;
}
function drawHitBox(o,hb,damage=1,func){
    let pL = getClosestPlayersInRange(o.x,o.y,o.z,Math.abs(hb[0])*4)[0];
    let hit = false;
    let res2;
    for(let i = 0; i < pL.length; i++){
        let p = pL[i];
        let res = hitboxCollide(o,hb,p);
        if(res) if(res.hit){
            hit = true;
            res2 = res;
            if(func == null){
                if(damage != null){
                    takeDamage(damage,p,o[3]/2,o[4]/2,o[5]/2,false);
                    displayDamage(damage,res.x,res.y,res.z,true);
                }
            }
            else func(o,hb,p,res,damage);
        }
    }
    return res2;
}
function drawHitBoxPlayer(o,hb,damage=1,func,destroyOnHit=false,exDamage=0){
    let pL;
    let x = (o[0] == null ? o.x : o[0]);
    let y = (o[1] == null ? o.y : o[1]);
    let z = (o[2] == null ? o.z : o[2]);
    pL = getClosestEnemiesInRange(x,y,z,Math.max(Math.abs(hb[0])*4,10))[0];
    for(let i = 0; i < pL.length; i++){
        let p = pL[i];
        let res = hitboxCollide(o,hb,p);
        function hit(){
            if(func == null){
                //dealDamage(damage,p,o[3]/2,o[4]/2,o[5]/2,false);
                if(damage == "a"){
                    damage = getDamage(o.player,p,res.box[7]);
                }
                damage += exDamage;
                dealDamage(damage,p,o.ref);
                displayDamage(damage,res.x,res.y,res.z);
                if(destroyOnHit) removeBullet(pBullets,o.ref,true);
            }
            else func(o,hb,p,res,damage+exDamage);
        }
        if(res) if(res.hit){
            hit();
        }
        /*else{
            for(let j = 0; j < p.hitboxes.length; j++){
                let hh = p.hitboxes[j];
                res = hitboxCollide(p,hh,o);
                if(res.hit) hit();
            }
        }
        console.log("USE ALT",res.hit);*/
    }
}

var ENEMIES = {
    gollum:{
        type:"gollum",
        origin:"bm",
        hp:50,
        hitboxes:[[-5,-7,5,0,0,5,"body"],[-3,-4,3,0,6,10,"head",20]],
        gray:convert("gray"),
        img:cloneWhenLoaded(tt.gollum.main),
        viewRad:100,
        baseImg:tt.gollum.main,
        ai:function(){
            if(this.frames%10 == 0 && !this.isAttacking){ //scan for players in radius
                let list = getClosestPlayersInRange(this.x,this.y,this.z,this.viewRad);
                if(list[0].length != 0){
                    let cls = list[0][0];
                    let clsDist = list[1][0];
                    if(clsDist < 6 && clsDist > 1){
                        if(!this.isAttacking){
                            if(this.vx > 0) this.isFlipped = false;
                            else if(this.vx < 0) this.isFlipped = true;
                            let dx = cls.x-this.x;
                            let dy = cls.y-this.y;
                            let ang = Math.atan2(dy,dx);
                            let speed2 = 0.2;
                            let speed = (20-clsDist)/40;
                            let ty = Math.sin(ang)*speed;
                            let tx = Math.cos(ang)*speed;
                            if(Math.abs(tx) > 0.01 && Math.abs(ty) > 0.01){
                                this.vx -= tx;
                                this.vy -= ty;
                            }
                        }
                    }
                    else if(clsDist >= 5 && clsDist < 7){
                        if(!this.isAttacking){
                            if(cls.x > this.x) this.isFlipped = true;
                            else this.isFlipped = false;
                            let self = this;
                            this.isAttacking = true;
                            startAnim(this,tt.gollum.swing0,function(o){
                                o.isAttacking = false;
                            },1,true,false,function(o,i,t){
                                if(i == 7){
                                    let pL = getClosestPlayersInRange(self.x,self.y,self.z,7)[0];
                                    for(let j = 0; j < pL.length; j++){
                                        let p = pL[j];
                                        let dx = p.x-self.x;
                                        let no = false;
                                        if(dx > 0 && !self.isFlipped) no = true;
                                        else if(dx < 0 && self.isFlipped) no = true;
                                        if(!no){
                                            let dy = p.y-self.y;
                                            let dz = p.z-self.z;
                                            if(dx > 0 && dx < 1) dx = 1;
                                            else if(dx < 0 && dx > -1) dx = -1;
                                            if(dy > 0 && dy < 1) dy = 1;
                                            else if(dy < 0 && dy > -1) dy = -1;
                                            
                                            let damage = 4;
                                            takeDamage(damage,p,dx/2,dy/2,dz/2);
                                        }
                                    }
                                }
                            });
                        }
                    }
                    else if(clsDist >= 7 && clsDist < 25){ //move closer
                        if(!this.isAttacking){
                            if(cls.x > this.x) this.isFlipped = true;
                            else this.isFlipped = false;
                            let dx = cls.x-this.x;
                            let dy = cls.y-this.y;
                            let dist = Math.sqrt(dx*dx+dy*dy);
                            let speed = 0.3;
                            this.vx += dx/dist*speed;
                            this.vy += dy/dist*speed;
                        }
                    }
                    else if(clsDist >= 25 && clsDist < 40){ //throw
                        if(!this.isAttacking){
                            if(cls.x > this.x) this.isFlipped = true;
                            else this.isFlipped = false;
                            let self = this;
                            startAnim(this,tt.gollum.throw,function(o){
                                o.isAttacking = false;
                            },1,true,false,function(o,i,t){
                                if(i == 13){
                                    let dx = cls.x-(self.x+2*(self.isFlipped?-1:1));
                                    let dy = cls.y-self.y;
                                    let dz = cls.z-(self.z+12);
                                    let dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
                                    let speed = 0.5;
                                    let tx = dx/dist*speed;
                                    let ty = dy/dist*speed;
                                    let tz = dz/dist*speed;
                                    bullets.push([o.x+2*(self.isFlipped?-1:1),o.y,o.z+12,tx,ty,tz,tt.bullets.dirtball,function(o){
                                        let hb = [-3,-3,3,3,-3,3,"mudball"];
                                        let pL = getClosestPlayersInRange(o[0],o[1],o[2],12)[0];
                                        for(let i = 0; i < pL.length; i++){
                                            console.log("found player");
                                            let p = pL[i];
                                            let res = hitboxCollide({
                                                x:o[0],y:o[1],z:o[2]
                                            },hb,p);
                                            if(res) if(res.hit){
                                                console.warn("mudball hit");
                                                let damage = 2;
                                                takeDamage(damage,p,o[3]/2,o[4]/2,o[5]/2,false);
                                                displayDamage(damage,res.x,res.y,res.z,true);
                                                removeBullet(bullets,o,true);
                                            }
                                        }
                                    }]);
                                }
                            });
                        }
                        this.isAttacking = true;
                    }
                }
            }
        },
        init:function(){
            startAnim(this,tt.gollum.idle,null,0);
        }
    },
    speedRoller:{
        type:"speedRoller",
        hp:10,
        hitboxes:[[-3,-3,3,3,0,6,"body"]],
        img:cloneWhenLoaded(tt.speedRoller.main),
        viewRad:100,
        baseImg:tt.speedRoller.main,
        wheel:[
            0,0,0,
            0,0,0,
            0,0,0
        ],
        reqDirs:[],
        reqDirsLvl:[],
        ang:0,
        delay:4,
        data:{},
        effects:{},
        lastDown:-9999,
        downTime:240,
        downCooldown:720,
        onHit:function(){
            if(!this.effects.stunned) if(this.frames >= this.lastDown+this.downCooldown) if(Math.random() < 0.25){
                createParticleAnim(tt.particles.smoke[0],this.x,this.y,this.z);
                this.action.move = 4;
                this.data.i = 0;
                this.effects.stunned = true;
            }
        },
        init:function(){
            this.action.goOut = false;
        },
        hitboxCustom:{
            blades:[-3,-3,3,3,1,2,"blades"],
            stomp:[-5,-5,5,5,0,4,"stomp"]
        },
        ai:function(){
            if(this.action.blades){
                if(this.frames%10 == 0) drawHitBox(this,this.hitboxCustom.blades,1);
                startAnim(this,tt.speedRoller.blades,null,1,true,true);
            }
            if(this.frames%this.delay == 0){
                let p;
                if(this.action.p) p = this.action.p;
                else{
                    let id = Math.floor(Math.random()*players.length);
                    p = players[id];
                    this.action.p = p;
                    this.action.move = -1;
                }
                if(p.isDead){
                    this.action.move = -1;
                    this.action = {};
                }

                
                if(this.action.move == -1){
                    this.data = {};
                    this.action.blades = false;

                    let dx = p.x-this.x;
                    let dy = p.y-this.y;
                    let dist = Math.sqrt(dx*dx+dy*dy);

                    if(dist < 4 && this.grounded){ //stomp
                        this.action.move = 3;
                        this.action.jump = true;
                        this.action.blades = false;
                        this.data.i = 0;
                        this.vz = 0;
                        this.z = 0;
                    }
                    else if(dist < 10){ //swirl
                        this.action.move = 0;
                        this.data.x = p.x;
                        this.data.y = p.y;
                        this.data.i = 0;
                        this.data.ang = Math.atan2(-dy,-dx);
                        this.data.dist = dist;
                        this.data.times = 0;
                        this.action.blades = true;
                    }
                    else if(dist < 75){ //move //40
                        if(Math.random() < 0.5) return;
                        if(Math.random() < 0.7 || dist > 20){ //straight
                            function func(t){
                                t.data.i = 0;
                                t.data.times = 0;
                                t.data.sx = t.x;
                                t.data.sy = t.y;
                                t.data.x = p.x;
                                t.data.y = p.y;
                                t.data.dist = Math.min(dist*1.2,20); //dist*1.9 //dist+4
                                t.data.vx = dx/dist;
                                t.data.vy = dy/dist;
                                t.data.scale = 1;
                            }
                            if(dist < 20){
                                this.action.move = -2;
                                this.action.blades = true;
                                let self = this;
                                subAnim(20,function(i,t,e){
                                    if(self.effects.stunned){
                                        self.action.move = -1;
                                        clearEvt(e);
                                    }
                                    if(i == t-1){
                                        self.action.move = 1;
                                        func(self);
                                    }
                                });
                            }
                            else{
                                this.action.move = 1;
                                func(this);
                            }
                        }
                        else{ //180 swirl
                            this.action.move = 2;
                            this.data.x = p.x;
                            this.data.y = p.y;
                            this.data.i = 0;
                            this.data.ang = Math.atan2(-dy,-dx);
                            this.data.dist = dist;
                            this.data.times = 0;
                            this.data.rot = 180;
                        }
                    }
                    if(this.action.move != 3) if(this.action.move != -1){
                        if(this.action.jump) this.action.jump = false;
                        if(!this.action.blades) if(Math.random() < 0.4) this.action.jump = true;
                    }
                }
            }
            if(this.action.move == 0){
                let tx = Math.cos(this.data.ang+this.data.i)*this.data.dist+this.data.x;
                let ty = Math.sin(this.data.ang+this.data.i)*this.data.dist+this.data.y;
                this.x = tx;
                this.y = ty;
                this.data.times++;
                this.data.i += (Math.sin(this.data.times/10)+1.1)/10;
                if(this.data.i >= Math.PI*2){
                    this.action.move = -1;
                    return;
                }
                this.data.dist *= 0.99;
            }
            else if(this.action.move == 2){
                let tx = Math.cos(this.data.ang+this.data.i)*this.data.dist+this.data.x;
                let ty = Math.sin(this.data.ang+this.data.i)*this.data.dist+this.data.y;
                this.x = tx;
                this.y = ty;
                this.data.times++;
                this.data.i += (Math.sin(this.data.times/10)+1.1)/(this.data.dist);
                if(this.data.i >= Math.PI*2*(this.data.rot/360)){
                    this.action.move = -1;
                    return;
                }
            }
            else if(this.action.move == 1){
                if(!this.action.blades){
                    startAnim(this,tt.speedRoller.roll,null,1,true);
                    let delay = Math.abs(this.vx)+Math.abs(this.vy);
                    delay /= 10;
                    if(delay > 1) delay = 1;
                    this.anim.d = 10-delay*10;
                }
                let dx = this.x-this.data.sx;
                let dy = this.y-this.data.sy;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let scale = this.data.scale;
                if(dist >= this.data.dist){
                    this.data.scale *= 0.9;
                    if(this.data.scale < 0.05){
                        this.action.move = -1;
                        this.action.blades = false;
                        return;
                    }
                }
                else this.data.scale = (Math.sin((dist/(this.data.dist/2))-0.5)+1.1)*0.4;
                scale = this.data.scale;
                
                this.x += this.data.vx*scale;
                this.y += this.data.vy*scale;
                this.data.times++;
            }
            else if(this.action.move == 3){ //stomp
                this.data.i++;
                if(!this.data.done) if(Math.floor(this.z) <= 0 && this.data.i > 30){
                    this.data.done = true;
                    createParticleAnim(tt.particles.smoke[0],this.x,this.y,this.z-2);
                    drawHitBox(this,this.hitboxCustom.stomp,7);
                }
                if(this.data.i > 30 && this.z > 0) this.vz *= 1.2;
                else if(this.data.i > 60) this.action.move = -1;
            }
            else if(this.action.move == 4){ //hit stunned
                startAnim(this,tt.speedRoller.stunned,null,1,true);
                this.data.i++;
                if(this.data.i > this.downTime){
                    this.action.move = -1;
                    this.anim.f = null;
                    this.effects.stunned = false;
                    this.action.jump = false;
                    this.lastDown = this.frames;
                }
            }
        },
        ai_old2:function(){
            //draw wheel
            //let w = this.wheel;
            let self = this;
            function drawReqHelper(a,c){
                let x = Math.cos(a)*10+self.x;
                let y = Math.sin(a)*10+self.y;
                nob.drawLine_smart(self.x,self.y,x,y,c,1);
            }
            for(let i = 0; i < this.reqDirs.length; i++){
                drawReqHelper(this.reqDirs[i],[255,255,0,255]);
            }
            drawReqHelper(this.ang,[0,255,255,255]);
            //nob.drawLine_smart(this.x,this.y,this.x-w[3],this.y,);
            //
            if(this.frames%5 == 0){
                this.reqDirs = [];
                this.reqDirsLvl = [];

                let id = Math.floor(Math.random()*players.length);
                let p;
                if(this.action.p) p = this.action.p;
                else{
                    p = players[id];
                    this.action.p = p;
                }
                let dx = p.x-this.x;
                let dy = p.y-this.y;
                let ang = Math.atan2(dy,dx);
                if(ang < 0) ang += Math.PI*2;
                this.reqDirs.push(ang);
                this.reqDirsLvl.push(1);

                if(this.ang < 0) this.ang += Math.PI;
                this.ang %= 6.28;
                
                //let d1 = ang-this.ang;
                //let d2 = Math.PI*2-Math.abs(d1);//this.ang+(Math.PI*2-ang);
                /*let d1 = this.ang-ang;
                let d2 = Math.PI*2-Math.abs(d1);
                if(Math.abs(d1) <= Math.abs(d2)) this.ang -= 0.1;
                else this.ang += 0.1;*/
                var wantRot = ang;
                var MoveDir = 0;
                var BehindMe = this.ang - Math.PI;
                if (BehindMe < 0)
                    BehindMe += Math.PI*2;

                if (wantRot != this.ang)
                {
                    if (wantRot == BehindMe)
                        MoveDir = -1; // or randomly choose
                    else if ((wantRot > BehindMe && wantRot < this.ang) ||
                            (this.rotation < 180 && (wantRot > BehindMe ||
                                                    wantRot < this.ang)))
                        MoveDir = 1;
                    else if ((wantRot < BehindMe && wantRot > this.ang) ||
                            (this.ang > 180 && (wantRot < BehindMe ||
                                                    wantRot > this.ang)))
                        MoveDir= -1;

                    this.ang += MoveDir/10;// * MathHelper.ToRadians(45) * Time.deltaTime;
                }

                //console.log(this.ang);
                //let da = this.reqDirs[0]-this.ang;
                //this.ang += da/4;
                //if(ang > Math.PI ? (ang > this.ang) : (ang < this.ang)) this.ang += 0.1;
                //else this.ang -= 0.1;

                let tx = Math.cos(this.ang)*0.5;
                let ty = Math.sin(this.ang)*0.5;
                this.vx += tx;
                this.vy += ty;

                let max = 1;
                if(this.vx > max) this.vx = max;
                else if(this.vx < -max) this.vx = -max;
                if(this.vy > max) this.vy = max;
                else if(this.vy < -max) this.vy = -max;
            }
        },
        ai_old:function(){
            if(this.frames%10 == 0){
                let id = Math.floor(Math.random()*players.length);
                let p = players[id];
                let targX = p.x;
                let targY = p.y;
                if(false) if(!this.action.start){
                    if(this.x > p.x){
                        if(this.x-p.x >= Math.abs(this.y-p.y)){
                            if(p.y >= this.y){
                                targY -= 11;
                                this.action.dir = -1;
                            }
                            else{
                                targY += 11;
                                this.action.dir = 1;
                            }
                        }
                        else{
                            targX += 11;
                            if(p.y >= this.y){
                                this.action.dir = -1;
                            }
                            else{
                                this.action.dir = 1;
                            }
                        } 
                    }
                    else{
                        
                    }
                }
                let dx = targX-this.x;
                let dy = targY-this.y;
                let dz = 0;//p.z-this.z;
                let dx2 = p.x-this.x;
                let dy2 = p.y-this.y;
                let dist = Math.sqrt(dx2*dx2+dy2*dy2+dz*dz)-10;
                let vx = dx/dist;
                let vy = dy/dist;
                let vz = dz/dist;
                let speed = 0.35;
                
                

                //if(Math.random()<0.01) this.action.goOut = !this.action.goOut;
                
                
                if(false) if(dist <= 11){
                    this.action.start = true;
                    //this.vx -= vx*speed;
                    //this.vy -= vy*speed;

                    /*this.vx = 0;
                    this.vy = 0;
                    let ang = Math.atan2(-dy2,-dx2);
                    ang += 0.05;
                    let tx = Math.cos(ang)*10+p.x;
                    let ty = Math.sin(ang)*10+p.y;
                    this.x = tx;
                    this.y = ty;*/
                    this.vx = 0;
                    this.vy = 0;
                    let ang = Math.atan2(-dy2,-dx2);
                    //ang += Math.PI/2;
                    ang += 0.08;//*this.action.dir;
                    let tx = Math.cos(ang)*11+p.x;
                    let ty = Math.sin(ang)*11+p.y;
                    let lx = tx-this.x;
                    let ly = ty-this.y;
                    this.x += lx/4;
                    this.y += ly/4;

                    //dx = tx-this.x;
                    //dy = ty-this.y;
                    //dist = Math.sqrt(dx*dx+dy*dy);
                    //vx = dx/dist;
                    //vy = dy/dist;
                }

                if(dist <= 11){
                    this.vx += -dx/dist*speed;
                    this.vy += -dy/dist*speed;
                }
                else {
                    this.vx += vx*speed;
                    this.vy += vy*speed;
                    this.action.start = false;
                }

                let max = 1;
                if(this.vx > max) this.vx = max;
                else if(this.vx < -max) this.vx = -max;
                if(this.vy > max) this.vy = max;
                else if(this.vy < -max) this.vy = -max;
                
                
                //this.vz += vz*speed;
                //this.z++;
                //this.grounded = false;
            }
        }
    }
};