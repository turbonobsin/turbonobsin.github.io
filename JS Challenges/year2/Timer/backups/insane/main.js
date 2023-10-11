let canW = 500;
let canH = 500;
let w = 80;
let h = 80;

w = 200;
h = 200;

/**@type {HTMLCanvasElement} */
const sandCan = document.getElementById("can-sand");
const sandCtx = sandCan.getContext("2d");
/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
const ctx = can.getContext("2d");

sandCan.width = w;
sandCan.height = h;
can.width = canW;
can.height = canW;

let mouthGap = canW*0.07;

// sandCtx.fillStyle = "green";
// sandCtx.fillRect(0,0,w,h);

const nob = new NobsinCtx(sandCtx);

let bg = getComputedStyle(document.body).getPropertyValue("background-color");

function drawHourGlass(){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "gray";
    
    ctx.moveTo(canW*0.25,0);
    ctx.lineTo(canW*0.75,0);
    ctx.lineTo(canW*0.5+mouthGap,canH*0.5);

    ctx.lineTo(canW*0.75,canH);
    ctx.lineTo(canW*0.25,canH);
    ctx.lineTo(canW*0.5-mouthGap,canH*0.5);

    ctx.closePath();
    ctx.stroke();

    // side covers

    ctx.fillStyle = bg;
    
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(canW*0.25,0);
    ctx.lineTo(canW*0.5-mouthGap,canH*0.5);
    ctx.lineTo(canW*0.25,canH);
    ctx.lineTo(0,canH);

    ctx.moveTo(canW,0);
    ctx.lineTo(canW*0.75,0);
    ctx.lineTo(canW*0.5+mouthGap,canH*0.5);
    ctx.lineTo(canW*0.75,canH);
    ctx.lineTo(canW,canH);

    ctx.fill();
}

// drawHourGlass();

class Obj{
    constructor(x,y,vx,vy,color){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    color;
}

/**@type {Obj[]} */
let objs = [];
for(let i = 0; i < 2000; i++){
    objs.push(new Obj(
        w/2 + (Math.random()-0.5)*20,
        5 + (Math.random())*20,
        (Math.random()-0.5)/10,
        (Math.random()-0.5)/10,
        COLORS.black
    ));
}

let drag = 0.995;
// let drag = 0.95;
let maxVel = 5;

let g_rot = -Math.PI/2;
let gravity = 0.2; //0.02

function update(){
    requestAnimationFrame(update);

    nob.updateStart();
    nob.dep = new Uint16Array(nob.ssize);

    // g_rot += 0.003;

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];
        o.vx += Math.cos(g_rot)*gravity;
        o.vy -= Math.sin(g_rot)*gravity;

        if(o.y >= h){
            o.y = h-1;
            o.vy = 0;
        }
        else if(o.y < 0){
            o.y = 0;
            o.vy = 0;
        }
        if(o.x < 0){
            o.x = 0;
            o.vx = 0;
        }
        else if(o.x >= w){
            o.x = w-1;
            o.vx = 0;
        }

        // hour glass collision

        let left = Math.sin(o.y/h*Math.PI)*w*0.4;
        let right = w-left;
        // let right = Math.sin(o.y/h*Math.PI)*w*0.4;
        if(o.x < left){
            o.x = left;
            o.vx = 0;
        }
        else if(o.x > right){
            o.x = right-1;
            o.vx = 0;
        }

        // other obj collision

        for(let j = i+1; j < objs.length; j++){
            let o2 = objs[j];
            let dx = o2.x-o.x;
            let dy = o2.y-o.y;
            let dist = Math.sqrt(dx**2+dy**2);
            if(dist <= 1){
                let amt = 0.96; //0.9
                let amt3 = 1.7;

                let scale = 3; //10

                o.vx -= dx/dist/scale;
                o.vy -= dy/dist/scale;
                o2.vx += dx/dist/scale;
                o2.vy += dy/dist/scale;

                // o.vx = -(o.vx+o2.vx)/2*amt3;
                // o.vy = -(o.vy+o2.vy)/2*amt3;
                // o2.vx = -(o2.vx+o.vx)/2*amt3;
                // o2.vy = -(o2.vy+o.vy)/2*amt3;
                
                // let amt2 = 100;
                // o.vx -= dx/amt2;
                // o.vy -= dy/amt2;
                // o2.vx += dx/amt2;
                // o2.vy += dy/amt2;

                // o.vx *= amt;
                // o.vy *= amt;
                // o2.vx *= amt;
                // o2.vy *= amt;
            }
        }

        // let ind = Math.floor(o.x+o.y*w);
        // let depI = nob.dep[ind];
        // if(depI && depI != i+1){
            
        //     o.vx = 0;
        //     o.vy = 0;
        //     o.x = Math.round(o.x);
        //     o.y = Math.round(o.y);
        // }
        // if(nob.dep[ind+w]){
        //     o.vy = 0;
        //     o.y = Math.round(o.y-1);
        // }

        if(o.vx > maxVel) o.vx = maxVel;
        else if(o.vx < -maxVel) o.vx = -maxVel;
        if(o.vy > maxVel) o.vy = maxVel;
        else if(o.vy < -maxVel) o.vy = -maxVel;

        o.vx *= drag;
        o.vy *= drag;
        
        o.x += o.vx;
        o.y += o.vy;

        nob.setPixel_dep(o.x,o.y,o.color,5);
        // nob.dep[ind] = i+1;
    }

    nob.updateEnd();
}
update();