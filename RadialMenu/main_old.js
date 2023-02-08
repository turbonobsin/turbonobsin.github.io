/*const path1 = document.getElementById("path");
const path2 = document.getElementById("path1");
const path3 = document.getElementById("path2");

let sides = 6;
let sidesh = sides/2;
let ang = Math.PI*2/sides;
let r = 25;
let ox = 50;
let oy = 50;

function setData(path,pos=0){
    let tx = Math.cos(Math.PI/2+ang+pos*ang)*r+ox;
    let ty = -Math.sin(Math.PI/2+ang+pos*ang)*r+oy;
    let tx2 = Math.cos(Math.PI/2-ang+pos*ang)*r+ox;
    let ty2 = -Math.sin(Math.PI/2-ang+pos*ang)*r+oy;
    path.setAttribute("d",`M ${tx} ${ty} C ${tx} ${ty-r/sidesh} ${tx2} ${ty2-r/sidesh} ${tx2} ${ty2}`);
}
setData(path1,0);
setData(path2,1);*/

// path.setAttribute("d",`M ${tx} ${ty} Q ${tx} ${ty-r} ${ox} ${ty-r} M ${tx2} ${ty2} Q ${tx2} ${ty2-r} ${ox} ${ty2-r}`);
// path.setAttribute("d",`M ${tx} ${ty} C ${tx2} ${ty2} ${tx} ${ty-r} ${tx2} ${ty2-r}`);
/*
const can = document.getElementById("can");
const ctx = can.getContext("2d");

can.width = 100;
can.height = 100;*/

let sides = 6;
let ang = Math.PI*2/sides;

function genMenu(){
    for(let i = 0; i < 6; i++){
        // let can = document.createElement("canvas");
        // can.width = 100;
        // can.height = 100;
        // let ctx = can.getContext("2d");
        let path = document.getElementById("path"+i);
        let p = [];
        let ox = 500;
        let oy = 500;
        let r = 250;
        let cnt = 0;
        let ang = Math.PI/3;
        let left = -ang/2+i*ang;
        let right = ang/2+i*ang;
        for(let j = left; j < right; j += Math.PI/60){
            let tx = Math.floor(Math.cos(j)*r+ox);
            let ty = Math.floor(Math.sin(j)*r+oy);
            if(cnt == 0) p.push("M "+tx+" "+ty);
            else p.push("L "+tx+" "+ty);
            cnt++;
        }
        let stx = Math.cos(right)*r+ox;
        let sty = Math.sin(right)*r+oy;
        p.push(`L ${stx} ${sty}`);
        cnt = 0;
        for(let j = left; j < right; j += Math.PI/60){
            let tx = Math.floor(Math.cos(j)*r/2+ox);
            let ty = Math.floor(Math.sin(j)*r/2+oy);
            if(cnt == 0) p.push("M "+tx+" "+ty);
            else p.push("L "+tx+" "+ty);
            cnt++;
        }
        
        stx = Math.cos(right)*r/2+ox;
        sty = Math.sin(right)*r/2+oy;
        p.push(`L ${stx} ${sty}`);
        stx = Math.cos(right)*r+ox;
        sty = Math.sin(right)*r+oy;
        p.push(`L ${stx} ${sty}`);
        p.push(`M ${stx} ${sty}`);
        
        stx = Math.cos(left)*r+ox;
        sty = Math.sin(left)*r+oy;
        p.push(`M ${stx} ${sty}`);
        stx = Math.cos(left)*r/2+ox;
        sty = Math.sin(left)*r/2+oy;
        p.push(`L ${stx} ${sty}`);

        path.setAttribute("d",p.join(" "));
    }
}
// genMenu();

/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
can.width = 500;
can.height = 500;
const ctx = can.getContext("2d");
ctx.fillStyle = "red";

let offAng = ang/2;

let mx = 0;
let my = 0;

document.addEventListener("mousemove",e=>{
    let rect = can.getBoundingClientRect();
    mx = (e.clientX-rect.x)/rect.width*can.width;
    my = (e.clientY-rect.y)/rect.height*can.height;
});

class AnimProp{
    constructor(val,speed,min=-999){
        let t = this;
        t.val = val;
        t._tarVal = val;
        t.speed = speed;
        t.min = min;
    }
    val;
    speed;
    _tarVal = 1;
    min;
    setVal(v){
        this._tarVal = v;
        if(this._tarVal < this.min) this._tarVal = this.min;
    }
    update(){
        let toll = 0.1;
        let dx = this.val-this._tarVal;
        if(dx != 0) dx /= Math.abs(dx);
        if(dx < toll) this.val -= dx*this.speed/20;
        else this.val = this._tarVal;
        if(this.val < this.min) this.val = this.min;
    }
}
class Sect{
    constructor(i,txt="Hello"){
        let t = this;
        t.i = 0;
        t.txt = txt;
    }
    i = 0;
    txt = "";
    scale = new AnimProp(1,0.2,0);
}

/**@type {Sect[]} */
let sects = [];

function genSects(amt){
    for(let i = 0; i < amt; i++){
        sects.push(new Sect(i));
    }
}
genSects(sides);

function drawMenu(){
    let ox = can.width/2;
    let oy = can.height/2;
    let outerR = can.width*0.4;
    let innerR = can.width*0.2;

    let dx = mx-ox;
    let dy = my-oy;
    let mouseAng = Math.atan2(dy,dx);
    if(mouseAng < 0) mouseAng += Math.PI*2;

    function drawSect(i){
        let sect = sects[i];

        let left = -ang/2+i*ang+offAng;
        let right = ang/2+i*ang+offAng;
        if(left < 0) left += Math.PI*2;
        if(right < 0) right += Math.PI*2;

        let hover = (mouseAng < right && mouseAng > left);
        if(hover) sect.scale.setVal(1.05);
        else sect.scale.setVal(1);
        let r = outerR*sect.scale.val;
        
        ctx.beginPath();
        ctx.arc(ox,oy,r,left,right);
        ctx.arc(ox,oy,innerR,right,left,true);
        let lTx = Math.cos(left);
        let lTy = Math.sin(left);
        ctx.moveTo(ox+lTx*r,oy+lTy*r);
        ctx.lineTo(ox+lTx*innerR,oy+lTy*innerR);
        ctx.stroke();

        if(hover){
            ctx.fillStyle = "red";
            ctx.fill();
        }

        //

        let fontSize = 16;
        ctx.font = fontSize+"px monospace";

        let midR = (innerR+outerR)/2;
        let cx = Math.cos(i*ang+offAng)*midR+ox;
        let cy = Math.sin(i*ang+offAng)*midR+oy;
        let width = ctx.measureText(sect.txt).width;
        if(hover) ctx.fillStyle = "white";
        else ctx.fillStyle = "black";
        ctx.fillText(sect.txt,cx-width/2,cy+fontSize/2);

        //

        sect.scale.update();
    }
    for(let i = 0; i < sects.length; i++){
        drawSect(i);
    }
}

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0,0,can.width,can.height);
    // offAng += 0.01;
    // offAng %= ang;

    drawMenu();
}
update();