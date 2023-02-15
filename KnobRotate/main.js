/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
let size = 4;
can.width *= size;
can.height *= size;
const ctx = can.getContext("2d");

class Crank{
    constructor(ang,x,y){
        let t = this;
        t.ang = ang;
        t.x = x;
        t.y = y;
    }
    ang = 0;
    x = 0;
    y = 0;
    size = 10;
    dragging = false;

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

        let rad = 70;

        let tx = Math.cos(t.ang)*rad+t.x;
        let ty = Math.sin(t.ang)*rad+t.y;
        let dx = mx-tx;
        let dy = my-ty;
        let dist = Math.sqrt(dx**2+dy**2);
        let hover = false;
        if(dist < t.size){
            if(mouseDown[0]){
                t.dragging = true;
                mouseDown[0] = false;
            }
            hover = true;
        }

        ctx.beginPath();
        ctx.arc(t.x,t.y,rad,0,Math.PI*2);
        ctx.strokeStyle = "gray";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tx,ty,t.size,0,Math.PI*2);
        if(hover || t.dragging) ctx.fillStyle = "darkgray";
        else ctx.fillStyle = "gainsboro";
        ctx.fill();
        ctx.stroke();

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
    mx = (e.clientX-can.offsetLeft)/can.offsetWidth*can.width;
    my = (e.clientY-can.offsetTop)/can.offsetHeight*can.height;
});

let crank = new Crank(0,can.width/2,can.height/2);

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0,0,can.width,can.height);
    crank.update();
}
update();