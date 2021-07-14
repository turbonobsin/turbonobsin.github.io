var mats = {
    dirt:convert("saddlebrown"),
    grass:convert("green"),
    black:[0,0,0,255]
};

var ids;
function setId(i,id){
    ids[i] = id;
}

//gui
var guiScale = 1.5;
//

var screens = [
    {
        draw:function(){
            for(let i = 0; i < nob.width; i++){
                let sI = ((nob.height-4)*nob.width+i);
                nob.setData((sI)*4,mats.black);
                setId(sI,1);
                nob.setData((sI+nob.width)*4,mats.grass);
                setId(sI+nob.width,1);
                for(let j = 0; j < 2; j++){
                    let sI2 = ((nob.height-2+j)*nob.width+i);
                    if(j == 1) nob.setData(sI2*4,mats.dirt);
                    else nob.setData(sI2*4,mats.black);
                    setId(sI2,1);
                }
            }
        }
    }
];

var players = [];
var black = [0,0,0,255];
const classData = [
    {
        name:"Swordman",
        allowedWeapons:[WeaponType.Katana],
    },
    {
        name:"Gunman",
        allowedWeapons:[WeaponType.Pistol,WeaponType.Sniper],
        wasd:true
    },
    {
        name:"Mage",
        allowedWeapons:[WeaponType.Wand,WeaponType.Staff],
        wasd:true
    },
    {
        name:"Sage",
        allowedWeapons:[WeaponType.Staff,WeaponType.Wand],
        wasd:true
    },
    {
        name:"Necroman",
        allowedWeapons:[],
        wasd:true
    }
];
const CLASSES = Object.freeze({
    Swordman:0,
    Gunman:1,
    Mage:2,
    Sage:3,
    Necromancer:4
});
players.push({
    x:20,
    y:20,
    z:0,
    vx:0,
    vy:0,
    vz:0,
    dir:0,
    hp:30,
    maxHp:30,
    ep:60,
    maxEp:60,
    epGenCooldown:0,
    classId:CLASSES.Swordman,
    atkI:2,
    atkLast:-999,
    robeCol:[0,0,0,255],
    skinCol:convert("tan"),
    hatCol:convert("maroon"),
    bagCol:convert("saddlebrown"),
    gloveCol:convert("#3d0c02"),
    hitboxes:[[-2,-2,2,2,0,6,"playerBody"]],
    isPlayer:true,
    anim:{
        i:0, //current incriment in frames
        c:0, //current anim-frame
        d:0, //delay in frames between anim-frame
        f:null
    },
    //attacking
    mCrt:0.1, //10% chance on hit of critical hit
    mCrtDam:1.5, //5% extra damage on critical hit,
    mStrength:1, //Character melee strength, base damage per hit

    //inv
    inv:{
        items:[],
        weapons:[],
        armor:[]
    },
    equip:{
        weapon:null
    },
    smallInvOpen:false,
    lvl:[
        1,
        2,
        7,
        8,
        9,
    ],
    exp:[
        0,
        4,
        40,
        200,
        300
    ],
    targZ:0,
    locks:[],
    locksRef:[]
});
var me = players[0];
me.inv.weapons.push(createWeapon(wep.katana.dull));
me.inv.weapons.push(createWeapon(wep.katana.steel));
me.inv.weapons.push(createWeapon(wep.katana.bamboo));
me.inv.weapons.push(createWeapon(wep.katana.wood));
me.inv.weapons.push(createWeapon(wep.katana.neo));
me.inv.weapons.push(createWeapon(wep.pistol.rusty));
me.inv.weapons.push(createWeapon(wep.pistol.collectors));
me.inv.weapons.push(createWeapon(wep.katana.bad));
me.inv.weapons.push(createWeapon(wep.sniper.rusty));
me.inv.weapons.push(createWeapon(wep.wild.coderGun));
me.inv.weapons.push(createWeapon(wep.wand.rotted));
me.inv.weapons.push(createWeapon(wep.staff.rotted));

function drawChar_lq(char){
    nob.setPixel(char.x,char.y,char.robeCol);

    nob.setPixel(char.x,char.y-1,char.skinCol);
    nob.setPixel(char.x,char.y-2,char.hatCol);
    nob.setPixel(char.x-1,char.y-1,char.hatCol);
    //hands
    //nob.setPixel(char.x-1,char.y,char.gloveCol);
    //nob.setPixel(char.x+1,char.y,char.gloveCol);
}
function drawChar(char){
    nob.setPixel(char.x,char.y,char.robeCol);
    nob.setPixel(char.x,char.y-1,char.robeCol);

    nob.setPixel(char.x,char.y-2,char.skinCol);
    nob.setPixel(char.x,char.y-3,char.hatCol);
    nob.setPixel(char.x-1,char.y-2,char.hatCol);
    
    //bag
    /*
    nob.setPixel(char.x-1,char.y-1,char.bagCol);
    nob.setPixel(char.x-2,char.y-1,char.bagCol);
    nob.setPixel(char.x-2,char.y-2,char.bagCol);
    nob.setPixel(char.x-1,char.y-3,char.bagCol);*/

    //hands
    nob.setPixel(char.x-1,char.y-1,char.gloveCol);
    nob.setPixel(char.x+1,char.y-1,char.gloveCol);

    //black outline
    nob.setPixel(char.x,char.y-4,black);
    nob.setPixel(char.x-1,char.y-3,black);
    nob.setPixel(char.x+1,char.y-3,black);
    nob.setPixel(char.x+1,char.y-2,black);
    nob.setPixel(char.x-2,char.y-2,black);
    nob.setPixel(char.x+2,char.y-1,black);
    nob.setPixel(char.x-2,char.y-1,black);
    nob.setPixel(char.x+2,char.y-1,black);
    nob.setPixel(char.x+1,char.y,black);
    nob.setPixel(char.x-1,char.y,black);
}

var ens = [];
var bullets = [];
var objs = [];
var pBullets = [];
/*var enemy1 = {
    x:60, //40,
    y:80, //146,
    z:0,
    hp:20,
    visible:true,
    tint:[1,1,1],
    hitboxes:[[-5,-7,5,0,0,5]],
    gray:convert("gray"),
    img:cloneWhenLoaded(tt.gollum.main),
    frames:0,
    viewRad:30,
    ai:function(){
        if(this.frames%10 == 0){ //scan for players in radius

        }
    }
};
ens.push(enemy1);*/

function drawEnemy1(e){
    nob.setPixel(e.x-1,e.y,e.gray);
    nob.setPixel(e.x-2,e.y,e.gray);
    nob.setPixel(e.x-1,e.y-1,e.gray);
    nob.setPixel(e.x-1,e.y-2,e.gray);

    nob.setPixel(e.x+2,e.y,e.gray);
    nob.setPixel(e.x+3,e.y,e.gray);
    nob.setPixel(e.x+3,e.y-1,e.gray);
    nob.setPixel(e.x+3,e.y-2,e.gray);

    nob.setPixel(e.x-1,e.y-3,e.gray);
    nob.setPixel(e.x,e.y-3,e.gray);
    nob.setPixel(e.x+1,e.y-3,e.gray);
}

function changeClass(o,classRef){
    o.classId = classRef;
    if(!canUseWeapon(o,o.equip.weapon)) o.equip.weapon = null;

    switch(o.classId){
        case CLASSES.Gunman:
            o.targZ = 0;
            o.gunCooldown = 0;
            o.gunMaxCooldown = 10;
            break;
    }
    o.isAttacking = false;
    o.anim.f = [];
    o.anim.i = 0;
    o.anim.c = 0;
    o.anim.d = 0;
    document.getElementById("controlInfo").innerHTML = controlInfo[o.classId];
    //console.warn("CHANGED CLASS SUCCESS");
}

//GUI

let white = [255,255,255,255];
let gray = [120,120,120,255];
let darkgray = [40,40,40,255];
let epTypeCols = [ //based on class ids
    [220,160,0,255], //energy,
    [220,160,0,255], //energy,
    [0,80,240,255], //magic
    [0,80,200,255], //magic
    [110,0,230,255], //dark magic
    [200,0,160,255] //environmental
];
let overflowGlow = [200,0,160,255];
let overflowText = [140,180,255,255];
let mgOverflowText = [140,255,180,255];
function getMaxHP(o){
    let lvl1 = o.lvl[o.classId]-1;
    let a = 30+(lvl1*2);
    return a;
}
function getMaxEP(o){
    let lvl1 = o.lvl[o.classId]-1;
    let a = 60+(lvl1*4);
    return a;
}
function renderHUD(o){
    //update info with class
    o.maxHp = getMaxHP(o);
    o.maxEp = getMaxEP(o);
    //

    if(o.hp < 0) o.hp = 0;
    let hpAmt = Math.floor(o.hp/o.maxHp*60);
    let overflowHp = false;
    if(hpAmt > 60){
        hpAmt = 60;
        overflowHp = true;
    }
    if(o.ep < 0) o.ep = 0;
    let epAmt = Math.floor(o.ep/o.maxEp*60);
    let overflowEp = false;
    if(epAmt > 60){
        epAmt = 60;
        overflowEp = true;
    }

    let megaOverflow = (overflowHp&&overflowEp);
    let hpCol = [200,0,0,255];
    let epCol = epTypeCols[o.classId];
    if(!megaOverflow){
        if(overflowHp) hpCol = white;//(frames%30 < 12 ? white : hpCol);
        else if(overflowEp) epCol = white;//(frames%30 < 12 ? white : epTypeCols[o.classId]);
    }
    else{
        hpCol = white;
        epCol = white;
    }

    let str = o.hp.toString();
    nob2.drawText(str,6+(str.length*2),nob2.bottom-25,megaOverflow?mgOverflowText:overflowHp?overflowText:white,black);
    str = "HP/" + o.maxHp.toString();
    nob2.drawText(str,68-(str.length*2),nob2.bottom-25,white,black);
    nob2.drawLine_smart(4,nob2.bottom-18,66,nob2.bottom-18,[0,0,0,255],4);
    if(hpAmt > 0) nob2.drawLine_smart(5,nob2.bottom-18,5+hpAmt,nob2.bottom-18,hpCol,2);

    
    str = o.ep.toString();
    nob2.drawText(str,6+(str.length*2),nob2.bottom-11,megaOverflow?mgOverflowText:overflowEp?overflowText:white,black);
    str = "EP/" + o.maxEp.toString();
    nob2.drawText(str,68-(str.length*2),nob2.bottom-11,white,black);
    nob2.drawLine_smart(4,nob2.bottom-4,66,nob2.bottom-4,[0,0,0,255],4);
    if(epAmt > 0) nob2.drawLine_smart(5,nob2.bottom-4,5+epAmt,nob2.bottom-4,epCol,2);
    //nob2.drawLine_smart(20,nob2.bottom-4-40-2,20,nob2.bottom-4,[0,0,0,255],4);
    //nob2.drawLine_smart(20,nob2.bottom-4-40-2,20,nob2.bottom-4,[0,0,0,255],4);
    //if(epAmt > 0) nob2.drawLine_smart(20,nob2.bottom-5-epAmt,20,nob2.bottom-5,[220,160,0,255],2);

    //hr
    nob2.drawLine_smart(4,nob2.bottom-31,66,nob2.bottom-31,black,2);

    //CLASS NAME / lvl
    str = classData[o.classId].name.toUpperCase();
    nob2.drawText(str,6+(str.length*2),nob2.bottom-37,white,black);
    if(megaOverflow){
        str = "MEGA";
        nob2.drawText(str,6+(str.length*2),nob2.bottom-45,white,black);
    }

    str = "LVL "+o.lvl[o.classId];
    nob2.drawText(str,68-(str.length*2),nob2.bottom-37,white,black);
    let x = 66-(str.length*4);
    let y = nob2.bottom-33;
    nob2.setPixel(x,y,black);
    nob2.setPixel(66,y,black);
    //exp bar
    let l = str.length*4-1;
    let expToNext = expList[o.lvl[o.classId]-1];
    if(!expToNext) expToNext = 9999999;
    let exp = Math.floor(o.exp[o.classId]/expToNext*l);
    nob2.drawRect(x+1,y,exp,1,gray);
    nob2.drawRect(x+1+exp,y,l-exp,1,darkgray);
    if(exp != 0) nob2.setPixel(x+1+exp,y,black);

    //INV
    if(o.smallInvOpen){
        let ind = me.inv.weapons.indexOf(me.equip.weapon);
        let x = 76;
        let y = nob2.bottom-6;
        let width = 60; //60,76
        for(let i = 0; i < me.inv.weapons.length; i++){
            let item = me.inv.weapons[i];
            let n = item.getName();
            let w = n.length*4+2;
            if(w > width) width = w;
        }
        //let h = me.inv.weapons.length*3;
        for(let i = me.inv.weapons.length-1; i >= 0; i--){
            let wI = me.inv.weapons.length-1-i;
            let item = me.inv.weapons[wI];
            let n = item.getName().toUpperCase();
            let yy = y-i*8;
            let textCol = white;
            if(!canUseWeapon(o,item)) textCol = gray;
            nob2.drawRect(x-3,yy-4,width+10,9,black); //n.length*4+3
            if(wI != ind) nob2.drawText(n,x+Math.floor(n.length*2),yy,textCol,black);
            else nob2.drawText(n,x+Math.floor(n.length*2),yy,black,textCol);
            let icon = wepIcons[item.getType()];
            nob2.drawImage_basic(icon,x+width,yy-3);
        }
        //if(pressOnce("shift") || pressOnce("c")){
        let cD = classData[me.classId];
        if(!cD.wasd?pressOnce("s"):pressOnce("arrowdown")){
            let wI = me.inv.weapons.indexOf(me.equip.weapon);
            for(let i = 0; i < me.inv.weapons.length; i++){
                wI++;
                if(!me.inv.weapons[wI]) wI = 0;
                if(canUseWeapon(me,me.inv.weapons[wI])) break;
            }
            if(me.inv.weapons[wI]) if(canUseWeapon(me,me.inv.weapons[wI])) me.equip.weapon = me.inv.weapons[wI];
        }
        //else if(pressOnce("f")){
        else if(!cD.wasd?pressOnce("w"):pressOnce("arrowup")){
            let wI = me.inv.weapons.indexOf(me.equip.weapon);
            for(let i = 0; i < me.inv.weapons.length; i++){
                wI--;
                if(!me.inv.weapons[wI]) wI = me.inv.weapons.length-1;
                if(canUseWeapon(me,me.inv.weapons[wI])) break;
            }
            if(me.inv.weapons[wI]) if(canUseWeapon(me,me.inv.weapons[wI])) me.equip.weapon = me.inv.weapons[wI];
        }
    }
    else{
        let item = me.equip.weapon;
        if(item){
            let n = item.getName().toUpperCase();
            let x = 76;
            let y = nob2.bottom-6;
            let yy = y;
            let textCol = white;
            if(!canUseWeapon(o,item)) textCol = gray;
            //nob2.drawRect(x-3,yy-4,70,9,black);
            nob2.drawRect(x-3,yy-4,n.length*4+3,9,black);
            //nob2.drawRect(x-3,yy-4,n.length*4+3+8,9,black);
            nob2.drawText(n,x+Math.floor(n.length*2),yy,black,textCol);
            //let icon = wepIcons[item.getType()];
            //nob2.drawImage_basic(icon,x+46,yy-3);
        }
    }
}

function genEp(o){
    if(o.isAttacking) o.epGenCooldown = 10;
    if(o.epGenCooldown > 0){
        o.epGenCooldown--;
    }
    if(o.epGenCooldown <= 0){
        if(frames%30 == 0){
            if(o.ep < o.maxEp) o.ep++;
            if(o.ep < o.maxEp-1){
                if(o.vx == 0 && o.vy == 0 && o.vz == -0.04) o.ep += 2;
            }
            else if(o.ep < o.maxEp) o.ep++;
            
            //if(o.ep > o.maxEp) o.ep = o.maxEp;
        }
    }
}

var mouseDown = [];
var mx = 0;
var my = 0;
document.addEventListener("mousemove",e=>{
    mx = e.x/can.offsetWidth*nob.width;
    my = e.y/can.offsetHeight*nob.height;
});
document.addEventListener("mouseup",e=>{
    mouseDown[e.button] = false;
    mousePressedOnce[e.button] = false;
    let w = me.equip.weapon;
    if(w){
        let wD = weaponData[w.getType()];
        if(wD.mouseUp) wD.mouseUp(e.button,me);
    }
});