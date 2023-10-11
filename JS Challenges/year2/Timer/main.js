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
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "gray";
    
    // ctx.moveTo(canW*0.25,0);
    // ctx.lineTo(canW*0.75,0);
    // ctx.lineTo(canW*0.5+mouthGap,canH*0.5);

    // ctx.lineTo(canW*0.75,canH);
    // ctx.lineTo(canW*0.25,canH);
    // ctx.lineTo(canW*0.5-mouthGap,canH*0.5);

    // ctx.closePath();
    // ctx.stroke();

    ctx.fillStyle = bg;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.quadraticCurveTo(canW*0.96,canH/2,0,canH);
    ctx.moveTo(canW,0);
    ctx.quadraticCurveTo(canW-canW*0.96,canH/2,canW,canH);
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = "saddlebrown";
    ctx.lineWidth = 80;

    ctx.beginPath();
    ctx.moveTo(0,-40);
    ctx.lineTo(canW,-40);
    ctx.moveTo(0,canH+40);
    ctx.lineTo(canW,canH+40);
    ctx.stroke();
    

    // side covers

    // ctx.fillStyle = bg;
    
    // ctx.beginPath();
    // ctx.moveTo(0,0);
    // ctx.lineTo(canW*0.25,0);
    // ctx.lineTo(canW*0.5-mouthGap,canH*0.5);
    // ctx.lineTo(canW*0.25,canH);
    // ctx.lineTo(0,canH);

    // ctx.moveTo(canW,0);
    // ctx.lineTo(canW*0.75,0);
    // ctx.lineTo(canW*0.5+mouthGap,canH*0.5);
    // ctx.lineTo(canW*0.75,canH);
    // ctx.lineTo(canW,canH);

    // ctx.fill();
}

drawHourGlass();

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

let color = convert("tan");

/**@type {Obj[]} */
let objs = [];
for(let i = 0; i < 3000; i++){
    objs.push(new Obj(
        w/2 + (Math.random()-0.5)*20,
        5 + (Math.random())*20,
        (Math.random()-0.5)/10,
        (Math.random()-0.5)/10,
        color
    ));
}

let drag = 0.995;
// let drag = 0.95;
let maxVel = 5; //5

let g_rot = -Math.PI/2;
let gravity = 0.2; //0.02

function update(){
    requestAnimationFrame(update);

    nob.updateStart();
    nob.dep = new Uint16Array(nob.ssize);

    // g_rot += 0.003; //contant rotation

    can.parentElement.style.transform = `rotate(${Math.PI/2+g_rot}rad)`;

    let scale4 = 0.4;

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

        let left = Math.sin(o.y/h*Math.PI)*w*0.49;
        let right = w-left;
        let scale5 = 1.2;
        // let right = Math.sin(o.y/h*Math.PI)*w*0.4;
        if(o.x < left){
            o.x = left;
            if(false) o.vx = 0;
            else if(Math.abs(o.vx) + Math.abs(o.vy) > 1){
                o.vx = -o.vx*scale4;
                o.vy = -o.vy*scale4;
            }
            else{
                o.vx = 0;
            }

            o.vx *= scale5;
            o.vy *= scale5;
        }
        else if(o.x > right){
            o.x = right-1;
            if(false) o.vx = 0;
            else if(Math.abs(o.vx) + Math.abs(o.vy) > 1){
                o.vx = -o.vx*scale4;
                o.vy = -o.vy*scale4;
            }
            else{
                o.vx = 0;
            }            

            o.vx *= scale5;
            o.vy *= scale5;
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

                let tmpOx = o.x;
                let tmpOy = o.y;
                let tmpO2x = o2.x;
                let tmpO2y = o2.y;

                let r = 1;
                o.x = -dx/dist*r+tmpO2x;
                o.y = -dy/dist*r+tmpO2y;
                o2.x = dx/dist*r+tmpOx;
                o2.y = dy/dist*r+tmpOy;

                //////////////////////////

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

        nob.drawCircle(o.x,o.y,2,o.color);
        //nob.drawRect_dep(o.x-1,o.y-1,3,3,o.color,1,0);
        // nob.setPixel_dep(o.x,o.y,o.color,5);
        // nob.dep[ind] = i+1;
    }

    nob.updateEnd();
}

function wait(delay){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },delay);
    });
}

let b_flip = document.getElementById("b-flip");
let r_left = document.getElementById("r-left");
let r_right = document.getElementById("r-right");

let timeLeft = 23;

b_flip.onclick = async function(){
    for(let i = 0; i < 10; i++){
        g_rot += Math.PI/10;
        await wait(0);
    }
    // startTime();
};

// let id;
// function startTime(){
//     clearInterval(id);
//     timeLeft = 23;
//     l_time.textContent = timeLeft;
//     id = setInterval(()=>{
//         timeLeft--;
//         l_time.textContent = timeLeft;
//         if(timeLeft <= 0){
//             clearInterval(id);
//         }
//     },1000);
// }
// startTime();

r_left.onclick = async function(){
    for(let i = 0; i < 16; i++){
        g_rot -= Math.PI*2/16/16;
        await wait(0);
    }
};
r_right.onclick = async function(){
    for(let i = 0; i < 16; i++){
        g_rot += Math.PI*2/16/16;
        await wait(0);
    }
};

update();