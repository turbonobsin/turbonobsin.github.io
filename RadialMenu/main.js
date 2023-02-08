let sides = 7;
let ang = Math.PI*2/sides;
let labelList = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven"
];

/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
can.width = innerWidth/2;
can.height = can.width;
const ctx = can.getContext("2d");
ctx.fillStyle = "red";

let offAng = -Math.PI/2;

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
        if(dx < toll) this.val -= dx*this.speed;
        else this.val = this._tarVal;
    }
}
class Sect{
    constructor(txt="Hello"){
        let t = this;
        t.txt = txt;
    }
    txt = "";
    scale = new AnimProp(1,0.0085,0);
    click(){
        alert("You clicked section: "+this.txt);
    }
}

/**@type {Sect[]} */
let sects = [];

/**@type {Sect} */
let hoverSect = null;

function genSects(){
    sects = [];
    for(let i = 0; i < sides; i++){
        sects.push(new Sect(labelList[i]));
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
    let mouseDist = Math.sqrt(dx**2+dy**2);
    let mouseAng = Math.atan2(dy,dx);
    if(mouseAng < 0) mouseAng += Math.PI*2;

    hoverSect = null;
    function drawSect(i){
        let sect = sects[i];

        let left = -ang/2+i*ang+offAng;
        let right = ang/2+i*ang+offAng;
        if(left < 0) left += Math.PI*2;
        if(right < 0) right += Math.PI*2;

        function betweenAngles(){
            if (left < right) return left <= mouseAng && mouseAng <= right;
            return left <= mouseAng || mouseAng <= right;
        }
        let hover = (betweenAngles()
            && mouseDist > innerR && mouseDist < outerR*sect.scale.val);
        if(hover) sect.scale.setVal(1.05);
        else sect.scale.setVal(1);
        let r = outerR*sect.scale.val;
        
        ctx.beginPath();
        if(sides == 1){
            ctx.arc(ox,oy,r,0,Math.PI*2);
            ctx.arc(ox,oy,innerR,Math.PI*2,0,true);
        }
        else{
            ctx.arc(ox,oy,r,left,right);
            ctx.arc(ox,oy,innerR,right,left,true);
        }
        let lTx = Math.cos(left);
        let lTy = Math.sin(left);
        ctx.moveTo(ox+lTx*r,oy+lTy*r);
        ctx.lineTo(ox+lTx*innerR,oy+lTy*innerR);
        ctx.stroke();

        if(hover){
            ctx.fillStyle = "royalblue";
            hoverSect = sect;
        }
        else{
            ctx.fillStyle = "whitesmoke";
        }
        ctx.fill();

        //

        let fontSize = 32;
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

    drawMenu();
}
update();

can.addEventListener("click",e=>{
    if(hoverSect){
        hoverSect.click();
    }
});

document.getElementById("b_changeList").onclick = function(){
    let listStr = prompt("Insert list of labels for the sections",labelList.join(","));
    if(!listStr) return;
    let list = listStr.split(",");
    sides = list.length;
    labelList = list;
    ang = Math.PI*2/sides;
    genSects();
};