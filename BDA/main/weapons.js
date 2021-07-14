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
        keybinds:function(o){

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
            col:convert("red")
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
            col:convert("dodgerblue")
        },
        {
            name:"Ice Shards"
        }
    ],
    [ //Earth spells
        {
            name:"Earth",
            col:convert("chocolate")
        },
        {
            name:"Turn over Earth"
        }
    ],
    [ //Lightning spells
        {
            name:"Lightning",
            col:convert("gold")
        },
        {
            name:"Viscious Bolt"
        }
    ],
    [ //Wind spells
        {
            name:"Wind",
            col:convert("green")
        },
        {
            name:"Whirlwind"
        }
    ],
    [ //Light spells
        {
            name:"Light",
            col:convert("palegoldenrod")
        },
        {
            name:"Laser"
        },
        {
            name:"Resta"
        },
        {
            name:"Anti"
        }
    ]
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
    me.x = 20;
    me.y = 20;
    me.z = 0;
    me.vx = 0;
    me.vy = 0;
    me.vz = 0;
    me.hp = me.maxHp;
    me.ep = me.maxEp;
    me.isDead = false;
    me.anim.f = [];
    me.anim.i = 0;
    me.anim.c = 0;
    me.anim.d = 0;
}