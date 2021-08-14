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
var guiScale3 = 2.25;
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
    x:150,
    y:75,
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
    name:"Player1",
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
        armor:[],
        tools:[],
        supItems:[],
        seeds:[]
    },
    equip:{
        weapon:null,
        element:0,
        spell:0,
        hI:0
    },
    smallInvOpen:false,
    smallInvCat:0,
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
    locksRef:[],
    spellX:0,
    spellY:0,
    spell1X:0,
    spell1Y:0,
    moveMulti:1,
    //chunks
    cx:0,
    cy:0,
    world:mainWorld,
    chunk:firstChunk,
    //
    keys:{},
    useCam:false,
    //
    selObj:null,
    selLX:0,
    selLY:0,
    //
    craftingMenuOpen:false,
    craftingMenu:{
        tab:0
    },
    RCAMenu:{
        open:false,
        x:0,
        y:0
    },
    //bigInv
    bigInv:{
        open:false,
        tab:0,
        sel:0,
        recipeSel:0,
        amt:1
    }
});
var me = players[0];
//loadChunk(me,mainWorld,0,0);
me.inv.weapons.push(createItem(items.katana.dull));
me.inv.weapons.push(createItem(items.katana.steel));
me.inv.weapons.push(createItem(items.katana.bamboo));
me.inv.weapons.push(createItem(items.katana.wood));
me.inv.weapons.push(createItem(items.katana.neo));
me.inv.weapons.push(createItem(items.pistol.rusty));
me.inv.weapons.push(createItem(items.pistol.collectors));
me.inv.weapons.push(createItem(items.katana.bad));
me.inv.weapons.push(createItem(items.sniper.rusty));
me.inv.weapons.push(createItem(items.wild.coderGun));
me.inv.weapons.push(createItem(items.wand.rotted));
me.inv.weapons.push(createItem(items.staff.rotted));
me.inv.weapons.push(createItem(items.wand.bokeh));
//tools
me.inv.tools.push(createItem(items.shovel.rusty));
me.inv.tools.push(createItem(items.hoe.rusty));
let bag = createItem(items.seedbag.basic);
bag.amt[0] = 50;
me.inv.tools.push(bag);
me.inv.tools.push(createItem(items.wateringcan.small));
me.inv.tools.push(createItem(items.bucket.small));
me.inv.tools.push(createItem(items.sickle.small));
me.inv.tools.push(createItem(items.seedbag.basic));
me.inv.tools.push(createItem(items.tamper.basic));
me.inv.tools.push(createItem(items.axe.rusty));
me.inv.tools.push(createItem(items.chain.rusty));
//items


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

/*var ens = [];
var bullets = [];
var objs = [];
var sobjs = [];
var pBullets = [];
var colls = [];*/
//STAIRS 3
/*colls.push([96,100,98,120,0,1]);
colls.push([94,100,96,120,0,2]);
colls.push([92,100,94,120,0,3]);
colls.push([90,100,92,120,0,4]);
colls.push([88,100,90,120,0,5]);
//FIRST
colls.push([30,30,40,40,0,5]); //left,top,right,bottom,down,up, rot, upHeightMap
colls.push([43,30,53,40,11,15]);
colls.push([60,40,100,40,0,10]);
colls.push([80,20,81,60,0,10]);
colls.push([40,70,50,80,-4,1,null,[
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
]]);
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
colls.push([45,70,50,75,0,6]);*/
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
let replaceCol = [254,254,254];
let replaceCol2 = [253,253,253];
let gray = [120,120,120,255];
let darkgray = [40,40,40,255];
let lightgray = [180,180,180,255];
let red = [255,0,0,255];
let colors = {
    water:[0,99,170,255],
    soil:[137,62,5,255],
    hole:[100,40,0,255],
    seeds:[
        convert("sandybrown"),
        convert("sienna")
    ],
    fluids:[
        [0,99,170,255]
    ],
    plant:convert("green"),
    darkPlant:tint(convert("green"),[0.5,0.5,0.5,0.5]),
    wood:[127,51,0,255],

    darkred:[180,0,0,255]
};
let names = {
    seeds:[
        "WHEAT",
        "PEANUTS"
    ],
    fluids:[
        "WATER"
    ]
};
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
let catList = [
    "WEAPONS -",
    "TOOLS -",
    "ITEMS -",
    "SUPPORT ITEMS -"
];
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
        if(pressOnce("arrowright")){
            o.smallInvCat++;
            if(o.smallInvCat >= catList.length) o.smallInvCat = 0;
            o.equip.hI = 0;
        }
        else if(pressOnce("arrowleft")){
            o.smallInvCat--;
            if(o.smallInvCat < 0) o.smallInvCat = catList.length-1;
            o.equip.hI = 0;
        }

        let cat = o.inv.weapons;
        let hasUnequip = false;
        switch(o.smallInvCat){
            case 0: cat = o.inv.weapons;
                hasUnequip = true;
                break;
            case 1: cat = o.inv.tools;
                hasUnequip = true;
                break;
            case 2: cat = o.inv.items;
                break;
            case 3: cat = o.inv.supItems;
                break;
            default:
                cat = o.inv.items;
        }
        //if(hasUnequip) cat.push(emptyItem);
        let catLen = cat.length-1;
        if(hasUnequip) catLen++;

        let ind = cat.indexOf(o.equip.weapon);
        if(o.smallInvCat > 1) ind = o.equip.hI;
        let x = 76;
        let y = nob2.bottom-6;
        let width = 62; //60,76
        for(let i = 0; i < cat.length; i++){
            let item = cat[i];
            if(item){
                let n = item.getName();
                let w = n.length*4+2;
                if(w > width) width = w;
            }
        }
        //let h = me.inv.weapons.length*3;
        for(let i = catLen; i >= 0; i--){
            let wI = catLen-i;
            let item = cat[wI];
            if(item){
                let n = item.getName().toUpperCase();
                let yy = y-i*8;
                let textCol = white;
                if(!canUseWeapon(o,item)) textCol = gray;
                nob2.drawRect(x-3,yy-4,width+10,9,black); //n.length*4+3
                if(wI != ind) nob2.drawText(n,x+Math.floor(n.length*2),yy,textCol,black);
                else nob2.drawText(n,x+Math.floor(n.length*2),yy,black,textCol);
                let icon = wepIcons[item.getType()];
                nob2.drawImage_basic(icon,x+width,yy-3);

                //item amt
                if(o.smallInvCat == 2){
                    //if(item.amt){
                        let nn = (item.amt||0).toString();
                        nob2.drawText(nn,x+width-Math.floor(nn.length*2.5),yy,textCol,black,false,false);
                    //}
                }
            }
            else{
                let n = "(NONE)";
                let yy = y-i*8;
                let textCol = gray;
                nob2.drawRect(x-3,yy-4,width+10,9,black);
                if(o.equip.weapon == null) nob2.drawText(n,x+Math.floor(n.length*2),yy,black,textCol);
                else nob2.drawText(n,x+Math.floor(n.length*2),yy,textCol,black);
            }
        }
        if(cat.length == 0){
            let n = "-EMPTY-";
            let yy = y;
            let textCol = white;
            textCol = gray;
            nob2.drawRect(x-3,yy-4,width+10,9,black); //n.length*4+3
            nob2.drawText(n,x+Math.floor(n.length*2),yy,textCol,black);
        }
        //items heading
        {
            let yy = y-(catLen+1||1)*8-1;
            let xx = x-3;
            let n = catList[o.smallInvCat]||"";
            for(let i = n.length*4; i < width-4; i += 4){
                n += "-";
            }
            n += (o.smallInvCat+1)+"-";
            nob2.drawRect(xx,yy-5,width+10,9,black);
            nob2.drawText(n,xx+1,yy-1,white,black,false,false);
        }


        //if(pressOnce("shift") || pressOnce("c")){
        let cD = classData[o.classId];
        if(!cD.wasd?pressOnce("s"):pressOnce("arrowdown")){
            if(o.smallInvCat <= 1){
                let wI = cat.indexOf(o.equip.weapon);
                if(wI == -1) wI = cat.length;
                for(let i = 0; i < catLen; i++){
                    wI++;
                    if(wI == cat.length) break;
                    if(!cat[wI]) wI = 0;
                    if(canUseWeapon(o,cat[wI])) break;
                }
                if(cat[wI]){
                    if(canUseWeapon(o,cat[wI])) o.equip.weapon = cat[wI];
                }
                else if(wI == cat.length) o.equip.weapon = null;
            }
            else{
                let wI = o.equip.hI;
                wI++;
                if(!cat[wI]) wI = 0;
                if(cat[wI]) o.equip.hI = wI;
            }
        }
        //else if(pressOnce("f")){
        else if(!cD.wasd?pressOnce("w"):pressOnce("arrowup")){
            if(o.smallInvCat <= 1){
                let wI = cat.indexOf(o.equip.weapon);
                for(let i = 0; i < catLen; i++){
                    wI--;
                    if(wI == -1) break;
                    if(!cat[wI]) wI = cat.length-1;
                    if(canUseWeapon(o,cat[wI])) break;
                }
                if(cat[wI]){
                    if(canUseWeapon(o,cat[wI])) me.equip.weapon = cat[wI];
                }
                else if(wI == -1) o.equip.weapon = null;
            }
            else{
                let wI = o.equip.hI;
                wI--;
                if(!cat[wI]) wI = cat.length-1;
                if(cat[wI]) o.equip.hI = wI;
            }
        }

        //if(hasUnequip) cat.splice(cat.length-1,1);
    }
    else{
        let item = o.equip.weapon;
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
    //render element
    if(o.smallInvCat == 0) if(o.equip.weapon){
        let item = o.equip.weapon;
        if(item.getType() == WeaponType.Wand || item.getType() == WeaponType.Staff){
            let type = (item.getType() == WeaponType.Wand ? "spell" : "spell1");
            function getRef(t){
                return o[type+t];
            }
            if(!o.smallInvOpen){
                if(pressOnce("arrowup")){
                    o[type+"Y"]--;
                }
                if(pressOnce("arrowdown")){
                    o[type+"Y"]++;
                }
                if(pressOnce("arrowright")){
                    o[type+"X"]++;
                    if(getRef("X") >= magicData[getRef("Y")].length) o[type+"X"] = 0;
                }
                if(pressOnce("arrowleft")){
                    me[type+"X"]--;
                    if(getRef("X") >= magicData[getRef("Y")].length) me[type+"X"] = magicData[getRef("Y")].length-2;
                }
            }
            let col = white;
            let textCol = black;
            if(getRef("Y") < 0) me[type+"Y"] += magicData.length;
            else if(getRef("Y") >= magicData.length) me[type+"Y"] -= magicData.length;
            let width = 10; //60,76
            if(me.smallInvOpen){
                for(let i = 0; i < me.inv.weapons.length; i++){
                    let item = me.inv.weapons[i];
                    let n = item.getName();
                    let w = n.length*4+2;
                    if(w > width) width = w;
                }
            }
            else{
                let n = item.getName();
                width = n.length*4-8;
            }
            let x = 86+width;
            let y = nob2.bottom-6;
            let sDY = magicData[getRef("Y")];
            if(getRef("X") < 0) me[type+"X"] += sDY.length;
            let sDX = sDY[Math.min(sDY.length-1,getRef("X"))];
            if(!me.spellMenuOpen){
                let n = sDX.name.toUpperCase();
                nob2.drawRect(x-3,y-4,n.length*4+3,9,black);
                col = sDY[0].col;
                if(sDY[0].text) textCol = sDY[0].text;
                nob2.drawText(n,x+Math.floor(n.length*2),y,textCol,col);
            }
            else{
                let c = 3;
                for(let i = -1; i <= 1; i++){
                    c--;
                    let yy = c*8;
                    let ind = getRef("Y")+i;
                    if(ind < 0) ind += magicData.length;
                    if(ind >= magicData.length) ind -= magicData.length;
                    sDY = magicData[ind];
                    col = sDY[0].col;
                    if(sDY[0].text) textCol = sDY[0].text;
                    else textCol = black;
                    if(sDY){
                        sDX = sDY[0];
                        let n = sDX.name.toUpperCase();
                        nob2.drawRect(x-3,y-4-yy,n.length*4+3,9,black);
                        if(i == 0 && getRef("X") == 0){
                            nob2.drawText(n,x+Math.floor(n.length*2),y-yy,textCol,col);
                        }
                        else nob2.drawText(n,x+Math.floor(n.length*2),y-yy,col,textCol);
                        let xx = 0;
                        let c2 = 0;
                        for(let j = 1; j < (sDY.length+(Math.min(getRef("X"),sDY.length-1)>0?1:0)-Math.min(getRef("X"),sDY.length-1)); j++){
                            c2++;
                            let ind2 = c2+(Math.max(getRef("X")-1,0));
                            if(ind2 < 0) ind2 += sDY.length;
                            else if(ind2 >= sDY.length) ind2 = sDY.length-1;
                            let spell = sDY[ind2];
                            if(spell){
                                xx += 4;
                                xx += n.length*4;
                                n = spell.name.toUpperCase();
                                nob2.drawRect(x-3+xx,y-4-yy,n.length*4+3,9,black);
                                if(ind2 == Math.min(sDY.length-1,getRef("X")) && ind == getRef("Y")) nob2.drawText(n,x+Math.floor(n.length*2)+xx,y-yy,textCol,col);
                                else nob2.drawText(n,x+Math.floor(n.length*2)+xx,y-yy,col,textCol);
                            }
                        }
                    }
                }
            }
        }
    }
    if(o.smallInvCat == 1) if(o.equip.weapon){
        let item = o.equip.weapon;
        let type = item.getType();
        if(type == WeaponType.SeedBag){
            if(pressOnce("arrowup")){
                item.id--;
                if(item.id < 0) item.id = names.seeds.length-1;
            }
            else if(pressOnce("arrowdown")){
                item.id++;
                if(item.id >= names.seeds.length) item.id = 0;
            }
            let width = 10;
            let n = item.getName().toUpperCase();
            if(me.smallInvOpen){
                for(let i = 0; i < me.inv.tools.length; i++){
                    let item = me.inv.tools[i];
                    let n2 = item.getName();
                    let w = n2.length*4+12;
                    if(w > width) width = w;
                }
            }
            else{
                width = n.length*4-8;
            }
            let x = 84+width;
            let y = nob2.bottom-6;
            n = "WHEAT";
            n = names.seeds[item.id];
            let col = gray;
            col = colors.seeds[item.id];
            nob2.drawRect(x-1,y-4,n.length*4+3,9,black);
            nob2.drawText(n,x,y,black,col,false,false);
            //x += n.length*4+2;
            n = item.amt[item.id]+"/"+item.size;
            nob2.drawRect(x-1,y-12,n.length*4+3,9,black);
            nob2.drawText(n,x,y-8,white,black,false,false);
        }
        else if(type == WeaponType.Bucket){
            let width = 10;
            let n = item.getName().toUpperCase();
            if(me.smallInvOpen){
                for(let i = 0; i < me.inv.tools.length; i++){
                    let item = me.inv.tools[i];
                    let n2 = item.getName();
                    let w = n2.length*4+12;
                    if(w > width) width = w;
                }
            }
            else width = n.length*4-8;
            let x = 84+width;
            let y = nob2.bottom-6;
            n = "EMPTY";
            let col = gray;
            let id = item.id-1;
            if(item.id){
                n = names.fluids[id];
                col = colors.fluids[id];
            }
            nob2.drawRect(x-1,y-4,n.length*4+3,9,black);
            nob2.drawText(n,x,y,black,col,false,false);
        }

        //RIGHT CLICK ACTION MENU
        /*if(!o.craftingMenuOpen) if(mouseOnce(2)){
            o.RCAMenu.open = !o.RCAMenu.open;
            if(o.RCAMenu.open){
                o.RCAMenu.x = mx*guiScale3;
                o.RCAMenu.y = my*guiScale3;
            }
        }*/
    }
    if(o.RCAMenu.open){
        let mx3 = mx*guiScale3;
        let my3 = my*guiScale3;
        let x = o.RCAMenu.x;
        let y = o.RCAMenu.y;
        let sel = null;
        let w = 10;
        for(let i = 0; i < RCAList.length; i++){
            let n = RCAList[i];
            let ww = (n.length*4)+2;
            if(ww > w) w = ww;
        }
        for(let i = 0; i < RCAList.length; i++){
            let hover = false;
            let n = RCAList[i];
            //let w = (n.length*4)+2;
            nob3.drawRect(x,y,w+1,9,black);
            if(mx3 >= x-1 && mx3 < x+w && my3 >= y-1+i*7 && my3 < y+8+i*7){
                hover = true;
                if(mouseDown[0]){
                    sel = i;
                    switch(i){
                        case 0: //Craft Here
                            o.craftingMenuOpen = true;
                            o.craftingMenu.tab = 0;
                            o.craftingMenu.pickX = Math.floor(x/guiScale3);
                            o.craftingMenu.pickY = Math.floor(y/guiScale3);
                            break;
                    }
                    o.RCAMenu.open = false;
                }
            }
            if(!hover) nob3.drawText(n,x+1,4+y+7*i,white,black,false,false);
            else if(sel == i) nob3.drawText(n,x+1,4+y+7*i,black,gray,false,false);
            else nob3.drawText(n,x+1,4+y+7*i,black,white,false,false);
        }
    }

    if(o.bigInv.open){
        let x = Math.floor(nob3.width*0.25);
        let y = Math.floor(nob3.height*0.25);
        let w = nob3.centerX;
        let h = nob3.centerY;
        nob3.drawRect(x,y,w,h,black);
        let mx3 = mx*guiScale3;
        let my3 = my*guiScale3;

        //catagory
        let n = "INVENTORY: ";
        nob3.drawText(n,x+1,y+4,white,black,false,false);
        let xx = x+n.length*4+1;
        //hr
        nob3.drawLine_smart(x+1,y+9,x+w-2,y+9,gray,1);
        //cats
        for(let i = 0; i < bInvCatList.length; i++){
            let d = bInvCatList[i];
            let l = d.name.length;
            let nn = d.name;
            let hover = false;

            if(mx3 >= xx-1 && mx3 < xx+l*4+1 && my3 >= y && my3 < y+8){
                hover = true;
                if(mouseDown[0]) o.bigInv.tab = i;
            }

            if(i == o.bigInv.tab){
                nob3.drawText(nn,xx,y+4,black,hover?gray:lightgray,false,false);
                nob3.drawLine_smart(xx,y+8,xx+l*4,y+8,gray,1);
                //if(hover){
                    nob3.drawLine_smart(xx,y+9,xx+l*4,y+9,black,1);
                //}
            }
            else{
                nob3.drawText(nn,xx,y+4,lightgray,black,false,false);
                if(hover) nob3.drawLine_smart(xx,y+8,xx+l*4,y+8,gray,1);
            }
            xx += nn.length*4+1;
            nob3.drawText(" | ",xx,y+4,lightgray,black,false,false);
            xx += 13;
        }

        //options
        let hoverInfo = "-NO INFO-";
        let hoverItem = null;
        let dd = bInvCatList[o.bigInv.tab];
        let yy = y+18;
        let canBuild = false;
        let cbCount = 0;
        let list = o.inv.items;
        if(list.length == 0){
            let nn = "-EMPTY-";
            nob3.drawText(nn,x+4,yy,gray,black,false,false);
        }
        for(let i = 0; i < list.length; i++){
            let d = list[i];
            let nn = d.getName().toUpperCase()+" ("+d.amt+")";
            let hover = false;

            if(mx3 >= x+3 && mx3 < x+50 && my3 >= yy-4 && my3 < yy+4){
                hover = true;
                hoverInfo = d.getInfo();
                hoverItem = d;
                if(mouseDown[0]) o.bigInv.sel = i;
            }

            if(i == o.bigInv.sel) nob3.drawText(nn,x+4,yy,black,white,false,false);
            else nob3.drawText(nn,x+4,yy,white,black,false,false);
            if(hover) nob3.drawLine_smart(x+nn.length*4+7,yy-3,x+nn.length*4+7,yy+3,lightgray,1);

            yy += 10;
        }
        let d = list[o.bigInv.sel];
        let y2 = y+15;
        let max = 999;
        let dd2;
        if(d){
            dd2 = [];
            //info for option
            for(let j = 0; j < recipes.length; j++){
                let r = recipes[j];
                if(r.res == d.ref) dd2.push(r); 
                else if(r.items.includes(d.ref)) dd2.push(r);
            }
            if(dd2){
                let x2 = x+80;
                nob3.drawText("RECIPES: ("+dd2.length+")",x2,y2,lightgray,black,false,false);
                for(let j = 0; j < dd2.length; j++){
                    let r = dd2[j];
                    let n2 = r.res.name.toUpperCase()+" X"+r.resAmt;
                    let col = white;
                    let yy = y2+j*8+15;
                    let hover = false;
                    if(mx3 >= x2-1 && mx3 < x2+50 && my3 >= yy-4 && my3 < yy+4){
                        hover = true;
                        if(mouseDown[0]) o.bigInv.recipeSel = j;
                        if(r.res.info) hoverInfo = r.res.info;
                        hoverItem = r.res;
                    }
                    if(j == o.bigInv.recipeSel) nob3.drawText(n2,x2,yy,black,col,false,false);
                    else nob3.drawText(n2,x2,yy,col,black,false,false);
                    if(hover) nob3.drawLine_smart(x2+n2.length*4+3,yy-3,x2+n2.length*4+3,yy+3,lightgray,1);
                }
                x2 += 70;
                nob3.drawText("REQUIRED MATERIALS: ",x2,y2,lightgray,null,false,false);
                let dd3 = dd2[o.bigInv.recipeSel];
                if(dd3){
                    let count = [];
                    for(let j = 0; j < dd3.items.length; j++){
                        let mat = dd3.items[j];
                        let amt = dd3.amts[j];
                        let myAmt = 0;
                        for(let k = 0; k < o.inv.items.length; k++){
                            let it = o.inv.items[k];
                            if(it.ref == mat){
                                myAmt = it.amt||0;
                                break;
                            }
                        }
                        let n2 = mat.name.toUpperCase();
                        let n3 = myAmt+" /"+amt;
                        count.push(Math.floor(myAmt/amt));
                        if(myAmt >= amt){
                            cbCount++;
                            if(cbCount >= dd3.amts.length) canBuild = true;
                        }
                        let yy = y2+j*8+15;
                        let hover = false;
                        if(mx3 >= x2-1 && mx3 < x2+50 && my3 >= yy-4 && my3 < yy+4){
                            hover = true;
                            if(mat.info) hoverInfo = mat.info;
                            hoverItem = mat;
                        }
                        let col = white;
                        if(myAmt < amt) col = colors.darkred;
                        nob3.drawText(n2,x2,yy,col,black,false,false);
                        nob3.drawText(n3,x2+60,yy,col,black,false,false);
                        if(hover) nob3.drawLine_smart(x2,yy+5,x2+n2.length*4,yy+5,col,1);
                    }
                    let min = Math.min(...count);
                    max = min;
                    if(max > 0) canBuild = true;
                    else canBuild = false;
                    n = "MAX:";
                    nob3.drawText(n,x+w-96-n.length*4,y+4,gray,black,false,false);
                    n = max.toString();
                    nob3.drawText(n,x+w-81-n.length*4,y+4,gray,black,false,false);
                }
            }
            let x2 = x+250;
            nob3.drawText("INFO: ",x2,y2,lightgray,null,false,false);
            if(hoverItem){
                let isRef = hoverItem.ref!=null;
                let ref = (isRef?hoverItem.ref:hoverItem);
                nob3.drawText(ref.name.toUpperCase(),x2+24,y2,white,null,false,false);
                nob3.drawLine_smart(x2+24,y2+5,x2+24+ref.name.length*4,y2+5,white,1);
            }
            let lineLen = 20;
            let words = hoverInfo.split(" ");
            let line = "";
            let lineI = 0;
            for(let j = 0; j < words.length; j++){
                let word = words[j];
                if(word == "n"){
                    nob3.drawText(line,x2,y2+lineI*8+15,lightgray,null,false,false);
                    line = "";
                    lineI++;
                    continue;
                }
                if(line.length+word.length <= lineLen) line += word+" ";
                else{
                    nob3.drawText(line,x2,y2+lineI*8+15,lightgray,null,false,false);
                    line = "";
                    lineI++;
                    j--;
                }
            }
            nob3.drawText(line,x2,y2+lineI*8+15,lightgray,null,false,false);
        }

        n = "CRAFT";
        xx = x+w-n.length*4-3;
        let xxStart = xx;
        let hover = false;
        if(canBuild) if(mx3 >= xx-1 && mx3 < xx+n.length*4+2 && my3 >= y && my3 < y+10){
            hover = true;
            if(dd2){
                let ref = dd2[o.bigInv.recipeSel];
                if(ref) whenMouseUp(function(){
                    let l = [];
                    for(let j = 0; j < o.bigInv.amt; j++){
                        for(let i = 0; i < ref.amts.length; i++){
                            l.push(createItem(ref.items[i],-ref.amts[i]));
                        }
                        l.push(createItem(ref.res,ref.resAmt));
                    }
                    giveDrops(l,o);
                });
            }
        }
        nob3.drawRect(xx-1,y+1,n.length*4+3,9,hover?black:(canBuild?colors.plant:gray));
        nob3.setPixel(xx-2,y+9,black);
        nob3.drawText(n,xx,y+5,hover?black:(canBuild?colors.plant:gray),hover?colors.plant:black,false,false);

        n = "r";
        xx -= 8;
        hover = false;
        if(canBuild) if(mx3 >= xx-1 && mx3 < xx+5 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.amt++;
                if(o.bigInv.amt > max) o.bigInv.amt = max;
            });
        }
        nob3.drawLine_smart(xx-2,y+9,xx+6,y+9,black,1);
        nob3.drawText(n,xx,y+5,hover?(canBuild?colors.darkPlant:gray):(canBuild?colors.plant:gray),black,false,false);

        n = o.bigInv.amt.toString();
        if(!canBuild) n = "0";
        if(o.bigInv.inputAmt) n = regInputData.val;
        xx -= n.length*4+4;
        hover = false;
        if(canBuild) if(mx3 >= xx-1 && mx3 < xx+n.length*4+1 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.inputAmt = true;
                regInputData = {
                    click:true,
                    val:o.bigInv.amt.toString(),
                    o,
                    min:1,
                    max,
                    onSubmit:function(){
                        if(this.val != parseInt(this.val)) this.val = "1";
                        this.o.bigInv.amt = parseInt(this.val);
                        if(this.o.bigInv.amt < this.min) this.o.bigInv.amt = this.min;
                        else if(this.o.bigInv.amt > this.max) this.o.bigInv.amt = this.max;
                        this.val = this.o.bigInv.amt.toString();
                    },
                    onExit:function(){
                        this.o.bigInv.inputAmt = false;
                        this.onSubmit();
                    }
                };
            });
        }
        nob3.drawText(n,xx,y+5,hover?(canBuild?colors.darkPlant:gray):(canBuild?colors.plant:gray),black,false,false);
        if(o.bigInv.inputAmt) if(frames%45< 20) nob3.drawLine_smart(xx+1+n.length*4,y+2,xx+1+n.length*4,y+8,lightgray,1);

        n = "l";
        xx = xxStart-31;
        hover = false;
        if(canBuild) if(mx3 >= xx-1 && mx3 < xx+5 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.amt--;
                if(o.bigInv.amt <= 0) o.bigInv.amt = 1;
            });
        }
        nob3.drawLine_smart(xx-4,y+9,xx+6,y+9,black,1);
        nob3.drawText(n,xx,y+5,hover?(canBuild?colors.darkPlant:gray):(canBuild?colors.plant:gray),black,false,false);

        xx = xxStart-52;
        nob3.drawRect(xx-1,y+1,16+3,9,gray);
        nob3.drawRect(xx,y+2,16+1,7,black);
        nob3.setPixel(xx-2,y+9,black);
        
        n = "u";
        xx = xxStart-41;
        hover = false;
        if(canBuild) if(mx3 >= xx-3 && mx3 < xx+5 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.amt = max;
            });
        }
        nob3.drawText_custom(letterDataWide,n,xx,y+5,hover?darkgray:gray,black,false,false);

        n = "d";
        xx -= 8;
        hover = false;
        if(canBuild) if(mx3 >= xx-3 && mx3 < xx+5 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.amt = 1;
            });
        }
        nob3.drawText_custom(letterDataWide,n,xx,y+5,hover?darkgray:gray,black,false,false);

        //close button
        n = "EXIT";
        xx = x+w-n.length*4-3;
        y += h;
        hover = false;
        if(mx3 >= xx-1 && mx3 < xx+n.length*4+2 && my3 >= y-10 && my3 < y){
            hover = true;
            whenMouseUp(function(){
                o.bigInv.open = false;
            });
        }
        nob3.drawRect(xx-1,y-9,n.length*4+3,9,black);
        nob3.drawText(n,xx,y-5,hover?black:colors.darkred,hover?colors.darkred:black,false,false);
    }
    if(o.craftingMenuOpen && !o.craftingMenu.picking){
        let x = Math.floor(nob3.width*0.25);
        let y = Math.floor(nob3.height*0.25);
        let w = nob3.centerX;
        let h = nob3.centerY;
        nob3.drawRect(x,y,w,h,black);
        let mx3 = mx*guiScale3;
        let my3 = my*guiScale3;

        //catagory
        let n = "BUILD MENU: ";
        nob3.drawText(n,x+1,y+4,white,black,false,false);
        let xx = x+n.length*4+1;
        //hr
        nob3.drawLine_smart(x+1,y+9,x+w-2,y+9,gray,1);
        //cats
        for(let i = 0; i < craftingCatList.length; i++){
            let d = craftingCatList[i];
            let l = d.name.length;
            let nn = d.name;
            let hover = false;

            if(mx3 >= xx-1 && mx3 < xx+l*4+1 && my3 >= y && my3 < y+8){
                hover = true;
                if(mouseDown[0]) o.craftingMenu.tab = i;
            }

            if(i == o.craftingMenu.tab){
                nob3.drawText(nn,xx,y+4,black,hover?gray:lightgray,false,false);
                nob3.drawLine_smart(xx,y+8,xx+l*4,y+8,gray,1);
                //if(hover){
                    nob3.drawLine_smart(xx,y+9,xx+l*4,y+9,black,1);
                //}
            }
            else{
                nob3.drawText(nn,xx,y+4,lightgray,black,false,false);
                if(hover) nob3.drawLine_smart(xx,y+8,xx+l*4,y+8,gray,1);
            }
            xx += nn.length*4+1;
            nob3.drawText(" | ",xx,y+4,lightgray,black,false,false);
            xx += 13;
        }

        //options
        let dd = craftingCatList[o.craftingMenu.tab];
        let yy = y+18;
        let canBuild = false;
        let cbCount = 0;
        if(dd.list) for(let i = 0; i < dd.list.length; i++){
            let d = dd.list[i];
            let nn = d.name;
            let hover = false;

            if(mx3 >= x+3 && mx3 < x+50 && my3 >= yy-4 && my3 < yy+4){
                hover = true;
                if(mouseDown[0]) o.craftingMenu.sel = i;
            }

            if(i == o.craftingMenu.sel) nob3.drawText(nn,x+4,yy,black,white,false,false);
            else nob3.drawText(nn,x+4,yy,white,black,false,false);
            if(hover) nob3.drawLine_smart(x+nn.length*4+7,yy-3,x+nn.length*4+7,yy+3,lightgray,1);

            yy += 10;

            //info for option
            let dd2 = dd.list[o.craftingMenu.sel];
            if(i == o.craftingMenu.sel) if(dd2){
                let x2 = x+80;
                let y2 = y+15;
                nob3.drawText("REQUIRED MATERIALS: ",x2,y2,lightgray,black,false,false);
                for(let j = 0; j < dd2.reqMat.length; j++){
                    let mat = dd2.reqMat[j];
                    let amt = dd2.reqAmt[j];
                    let myAmt = 0;
                    for(let k = 0; k < o.inv.items.length; k++){
                        let it = o.inv.items[k];
                        if(it.ref == mat){
                            myAmt = it.amt||0;
                            break;
                        }
                    }
                    let n2 = mat.name.toUpperCase();
                    let n3 = myAmt+" /"+amt;
                    if(myAmt >= amt){
                        cbCount++;
                        if(cbCount >= dd2.reqAmt.length) canBuild = true;
                    }
                    let col = white;
                    if(myAmt < amt) col = colors.darkred;
                    nob3.drawText(n2,x2,y2+j*8+15,col,black,false,false);
                    nob3.drawText(n3,x2+60,y2+j*8+15,col,black,false,false);
                }
                x2 += 90;
                nob3.drawText("REQUIRED TOOLS: ",x2,y2,lightgray,null,false,false);
                x2 += 80;
                nob3.drawText("INFO: ",x2,y2,lightgray,null,false,false);
                //let lines = Math.ceil(d.info.length/12);
                let lineLen = 20;
                let words = d.info.split(" ");
                let line = "";
                let lineI = 0;
                for(let j = 0; j < words.length; j++){
                    let word = words[j];
                    if(line.length+word.length <= lineLen) line += word+" ";
                    else{
                        nob3.drawText(line,x2,y2+lineI*8+15,lightgray,null,false,false);
                        line = "";
                        lineI++;
                        j--;
                    }
                }
                nob3.drawText(line,x2,y2+lineI*8+15,lightgray,null,false,false);
                /*for(let j = 0; j < lines; j++){
                    let n2 = d.info.substring(j*lineLen,j*lineLen+lineLen);
                    nob3.drawText(n2,x2,y2+j*8+15,lightgray,null,false,false);
                }*/
            }
        }

        //pick spot button
        n = "BUILD";
        xx = x+w-n.length*4-3;
        let hover = false;
        if(canBuild) if(mx3 >= xx-1 && mx3 < xx+n.length*4+2 && my3 >= y && my3 < y+10){
            hover = true;
            whenMouseUp(function(){
                o.craftingMenu.picking = true;
                o.craftingMenu.obj = craftingCatList[o.craftingMenu.tab].list[o.craftingMenu.sel];
            });
        }
        nob3.drawRect(xx-1,y+1,n.length*4+3,9,hover?black:(canBuild?colors.plant:gray));
        nob3.setPixel(xx-2,y+9,black);
        nob3.drawText(n,xx,y+5,hover?black:(canBuild?colors.plant:gray),hover?colors.plant:black,false,false);
        //close button
        n = "EXIT";
        xx = x+w-n.length*4-3;
        y += h;
        hover = false;
        if(mx3 >= xx-1 && mx3 < xx+n.length*4+2 && my3 >= y-10 && my3 < y){
            hover = true;
            whenMouseUp(function(){
                o.craftingMenuOpen = false;
            });
        }
        nob3.drawRect(xx-1,y-9,n.length*4+3,9,black);
        nob3.drawText(n,xx,y-5,hover?black:colors.darkred,hover?colors.darkred:black,false,false);
    }
    else if(o.craftingMenu.picking){
        if(pressOnce("arrowup")) o.craftingMenu.pickY--;
        else if(pressOnce("arrowdown")) o.craftingMenu.pickY++;
        else if(pressOnce("arrowright")) o.craftingMenu.pickX++;
        else if(pressOnce("arrowleft")) o.craftingMenu.pickX--;

        let mx3 = mx*guiScale3;
        let my3 = my*guiScale3;

        let x = o.craftingMenu.pickX;
        let y = o.craftingMenu.pickY;
        let x2 = x*guiScale3;
        let y2 = y*guiScale3;
        nob.drawCircle(x,y,2,black);

        nob3.drawRect(x2-27,y2+6,49,9,black);
        let hover = false;
        let n = "CANCEL";
        if(mx3 >= x2-n.length*4-3 && mx3 < x2-2 && my3 >= y2+6 && my3 < y2+14){
            hover = true;
            whenMouseUp(function(){
                o.craftingMenu.picking = false;
            });
        }
        if(!hover) nob3.drawText(n,x2-n.length*4-2,y2+10,white,black,false,false);
        else nob3.drawText(n,x2-n.length*4-2,y2+10,black,white,false,false);
        hover = false;
        n = "BUILD";
        if(mx3 >= x2-1 && mx3 < x2+n.length*4+1 && my3 >= y2+6 && my3 < y2+14){
            hover = true;
            whenMouseUp(function(){
                o.craftingMenu.picking = false;
                o.craftingMenuOpen = false;
                let ref = o.craftingMenu.obj;
                let l = [];
                for(let i = 0; i < ref.reqAmt.length; i++){
                    l.push(createItem(ref.reqMat[i],-ref.reqAmt[i]));
                }
                giveDrops(l,o);
                if(ref.build) ref.build(x,y,0);
            });
        }
        if(!hover) nob3.drawText(n,x2,y2+10,colors.plant,black,false,false);
        else nob3.drawText(n,x2,y2+10,black,colors.plant,false,false);
    }
}
let RCAList = [
    "CRAFT HERE"
];
let craftingCatList = [
    {
        name:"SURVIVAL",
        list:[
            {
                name:"CAMPFIRE",
                info:"CAN BE USED TO COOK MEAT OR SOUPS, OR PRODUCE LIGHT",
                reqMat:[items.materials.stick],
                reqAmt:[3],
                build:function(x,y,z){
                    let d = {
                        x,y,z,
                        update:function(){
                            let img = tt.objs.survival.campfire;
                            nob.drawImage_basic(img,this.x-img.w/2,this.y-this.z-img.h/2);
                        }
                    };
                    sobjs.push(d);
                }
            },
            {
                name:"BARREL",
                info:"LARGE STORAGE FOR ONE ITEM, WHETHER IT'S WATER, SEEDS, OR FOOD",
                reqMat:[items.materials.wheat],
                reqAmt:[10]
            },
            {
                name:"LARGE BARREL",
                info:"VERY LARGE STORAGE FOR ONE ITEM, WHETHER IT'S WATER, SEEDS, OR FOOD. HAS A SPOUT TO HOOK UP TO A DITCH FOR IRRIGATION",
                reqMat:[items.materials.wheat],
                reqAmt:[50]
            }
        ]
    },
    {
        name:"FURNATURE"
    },
    {
        name:"TOOLS"
    }
];
let bInvCatList = [
    {
        name:"ITEMS"
    }
];

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

function draw4PSurround(x,y,z){
    nob.setPixel(x,y-1-z,black);
    nob.setPixel(x,y+1-z,black);
    nob.setPixel(x-1,y-z,black);
    nob.setPixel(x+1,y-z,black);
}

var mouseDown = [];
var mxb = 0;
var myb = 0;
var mx = 0;
var my = 0;
document.addEventListener("mousemove",e=>{
    mxb = e.x/can.offsetWidth*nob.width;//+nob.camX;
    myb = e.y/can.offsetHeight*nob.height;//-nob.camY+nob.camZ;
});
document.addEventListener("mouseup",e=>{
    if(regInputData) if(!regInputData.click){
        if(regInputData.onExit) regInputData.onExit();
        regInputData = null;
    }
    mouseDown[e.button] = false;
    mousePressedOnce[e.button] = false;
    let w = me.equip.weapon;
    if(w) if(!isMenuOpen()){
        let wD = weaponData[w.getType()];
        if(wD.mouseUp) wD.mouseUp(e.button,me);
    }
    if(e.button == 0) for(let i = 0; i < mUpEvts.length; i++){
        let e = mUpEvts[i];
        e();
    }
});
function isMenuOpen(){
    if(me.hoverMenu) return true;
    if(me.RCAMenu.open) return true;
    if(me.craftingMenuOpen) return true;
    return false;
}

//TESTS

//test rare drop animation!
var RD_doneList = 0;
var RD_l = 37*9;
function rareDrop_start(){
    if(RD_doneList != 0) return;
    RD_doneList = 0;
    let cx = nob2.centerX-20;
    let cy = 35-3;
    for(let y = 0; y < 9; y++) for(let x = 0; x < 37; x++){
        pBullets.push([Math.floor(Math.random()*nob2.width),Math.floor(Math.random()*nob2.height),(Math.random()-0.5),(Math.random()-0.5),0,0,false,function(o){
            if(!o[8].done){
                let tx = o[8].x+cx;
                let ty = o[8].y+cy;
                let dx = o[0]-tx;
                let dy = o[1]-ty;
                let dist = Math.sqrt(dx*dx+dy*dy);
                let speed = 12; //6
                o[3] -= dx/dist*speed/50; //100
                o[4] -= dy/dist*speed/50;
                let max = 4; //2
                if(o[3] > max) o[3] = max;
                else if(o[3] < -max) o[3] = -max;
                if(o[4] > max) o[4] = max;
                else if(o[4] < -max) o[4] = -max;
                let drag = 0.04; //0.02
                if(o[3] >= drag) o[3] -= drag;
                else if(o[3] <= -drag) o[3] += drag;
                else o[3] = 0;
                if(o[4] >= drag) o[4] -= drag;
                else if(o[4] <= -drag) o[4] += drag;
                else o[4] = 0;
                if(dist < speed){
                    o[0] = tx;
                    o[1] = ty;
                    o[8].done = true;
                    o[3] = 0;
                    o[4] = 0;
                    RD_doneList++;
                    if(RD_doneList == RD_l) rareDrop();
                }
            }
            if(RD_doneList == RD_l) removeBullet(pBullets,o);
            nob2.setPixel(o[0],o[1],black);
        },{x,y,keepAlive:true,done:false}]);
    }
}
function rareDrop(){
    let x = nob2.centerX;
    let x2 = -8;
    let y = 35;
    let n = registerNob(null,35,7).nob;
    subAnim(120,function(i,t){
        n.drawRect(0,0,35,7,black);
        n.drawText("RARE DROP",19,2,lightgray,black);
        let x3 = Math.floor(x2);
        n.drawLine_smart(0,6,x3,6,red,1);
        
        n.drawRect(x3,0,35-(x3),5,black);
        n.drawLine_smart(x3,6,x3+4,0,white,4);
        n.drawLine_smart(x3-4,6,x3,0,white,4);
        n.drawLine_smart(x3*0.8-14,6,x3*0.8-10,0,white,4);
        n.drawLine_smart(x3*0.7-30,6,x3*0.7-26,0,white,4);

        nob2.drawRect(x-20,y-3,37,9,black);
        nob2.drawImage_basic(fromNob(n),x-19,y-2,false);
        x2 += 35/10;

        //END
        if(i == t-1){
            let ii = 0;
            for(let y4 = 0; y4 < 7; y4++) for(let x4 = 0; x4 < 35; x4++){
                ii += 0;
                let xx = x4+x;//-19;
                let yy = y4+y;//-2;

                if(Math.random() < 0.5) pBullets.push([xx-19,yy-2,0,(Math.random()-0.5)*4,-Math.random(),0,false,function(o){
                    nob2.setPixel(o[0],o[1],black);
                    o[3] *= 0.95;
                    o[4] -= 0.05;
                    if(o[1] < 0) removeBullet(pBullets,o);
                }]);
            }
            RD_doneList = 0;
        }

        //if(i <= 60) nob2.drawLine_smart(x-20,y+2,x-20+4,y-2,white,4);
    });
}

var mUpEvts = [];
function whenMouseUp(f){
    mUpEvts.push(f);
}

var regInputData = null;