/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
let size = 4;
can.width *= size;
can.height *= size;
const ctx = can.getContext("2d");

const cont = document.getElementById("cont");

class Crank{
    constructor(ang,x,y){
        let t = this;
        t.ang = ang;
        t.x = innerWidth/2;
        t.y = innerHeight/2;
        t.ref = document.createElement("div");
        t.ref.className = "crankCont";
        cont.appendChild(t.ref);
        let bg = document.createElement("div");
        bg.className = "crankBg";
        t.ref.appendChild(bg);
        let knob = document.createElement("div");
        knob.className = "crankKnob";
        t.ref.appendChild(knob);
        knob.onmousedown = function(){
            t.dragging = true;
        };
        t.knob = knob;
        
        let box = document.createElement("div");
        box.className = "box";
        cont.appendChild(box);
        t.d_water = document.createElement("div");
        t.d_water.className = "water";
        box.appendChild(t.d_water);
    }
    ang = 0;
    x = 0;
    y = 0;
    size = 10;
    dragging = false;
    /**@type {HTMLElement} */
    ref = null;
    /**@type {HTMLElement} */
    knob = null;

    /**@type {HTMLElement} */
    d_water = null;

    lastAng = 0;
    
    water = 0.5;
    update(){
        let t = this;
        if(t.dragging){
            let dx = mx-t.x;
            let dy = my-t.y;
            let ang = Math.atan2(dy,dx);
            let angDist = ang-t.lastAng;
            t.lastAng = ang;
            t.ang = ang;
            if(Math.abs(angDist) > 1) angDist = 0;
            t.water += angDist/20;
            if(t.water < 0) t.water = 0;
            else if(t.water > 1) t.water = 1;
        }

        //

        let rad = t.ref.offsetWidth/2*0.75;

        let tx = Math.cos(t.ang)*rad+t.x;
        let ty = Math.sin(t.ang)*rad+t.y;
        let dx = mx-tx;
        let dy = my-ty;
        let dist = Math.sqrt(dx**2+dy**2);
        // if(mouseDown[0]){
            // if(dist < t.size) t.dragging = true;
            // mouseDown[0] = false;
        // }

        ctx.beginPath();
        ctx.arc(t.x,t.y,rad,0,Math.PI*2);
        ctx.strokeStyle = "gray";
        ctx.stroke();

        t.knob.style.left = (tx-t.ref.offsetLeft+t.ref.offsetWidth/2)+"px";
        t.knob.style.top = (ty-t.ref.offsetTop+t.ref.offsetHeight/2)+"px";
        t.d_water.style.height = (t.water*100)+"%";
        
        // t.knob.style.left = `${}px ${ty-t.ref.offsetTop+t.knob.offsetHeight/2+t.ref.offsetHeight/4}px`;
        // ctx.beginPath();
        // ctx.arc(tx,ty,t.size,0,Math.PI*2);
        // ctx.fillStyle = "red";
        // ctx.fill();

        //draw water
        let boxW = 30;
        let boxH = 50;
        let cx = t.x-rad-boxW-50;
        ctx.beginPath();
        ctx.moveTo(cx-boxW,t.y+boxH);
        ctx.lineTo(cx+boxW,t.y+boxH);
        ctx.lineTo(cx+boxW,t.y-boxH);
        ctx.lineTo(cx-boxW,t.y-boxH);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(cx-boxW,t.y+boxH-boxH*2*t.water,boxW*2,boxH*2*t.water);
    }
}

let mx = 0;
let my = 0;
let mouseDown = [false,false,false];
document.addEventListener("mousedown",e=>{
    mouseDown[e.button] = true;
});
document.addEventListener("mouseup",e=>{
    mouseDown[e.button] = false;
    crank.dragging = false;
});
document.addEventListener("mousemove",e=>{
    mx = e.clientX;
    my = e.clientY;
});
document.addEventListener("touchstart",e=>{
    mouseDown[e.button] = true;
});
document.addEventListener("touchend",e=>{
    mouseDown[e.button] = false;
    crank.dragging = false;
});
document.addEventListener("touchmove",e=>{
    let touch = e.touches[0];
    mx = touch.clientX;
    my = touch.clientY;
});

let crank = new Crank(0,can.width/2,can.height/2);

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0,0,can.width,can.height);
    crank.update();
}
update();