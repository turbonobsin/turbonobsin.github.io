class Obj{
    constructor(x:number,y:number,vx:number,vy:number){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    x:number;
    y:number;
    vx:number;
    vy:number;
}

const can = document.querySelector<HTMLCanvasElement>("#can");
can.width *= 2;
can.height = can.width/2;
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

const demo = document.getElementById("demo");

const black = [0,0,0,255];

let objs:Obj[] = [];

for(let i = 0; i < 100000; i++){
    objs.push(new Obj(Math.random()*can.width,Math.random()*can.height,Math.random()-0.5,Math.random()-0.5));
}

let frameTime = 0;
let fps = 0;
let drag = 0.98;
let strength = 4;

let keys = new Map<string,boolean>();

function update(){
    requestAnimationFrame(update);
    let frameStart = performance.now();
    nob.updateStart();

    if(keys.get("w")) strength = -4;
    else strength = 4;

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        if(false){
            if(o.vy < 0) o.vy = -o.vy;
            else if(o.vy >= nob.height) o.vy = -o.vy;
        }
        if(o.y < 0) o.vy = -o.vy;
        else if(o.y >= nob.height) o.vy = -o.vy;

        let dx = o.x-nob.centerX;
        let dy = o.y-nob.centerY;
        let dist = Math.sqrt(dx**2+dy**2);
        o.vx -= dx/dist/strength;
        o.vy -= dy/dist/strength;

        //spin
        let speed = 0.05;
        let ang = Math.atan2(dy,dx);
        ang += Math.PI/2;
        let tx = Math.cos(ang)*speed;
        let ty = Math.sin(ang)*speed;
        o.vx += tx;
        o.vy += ty;

        o.vx *= drag;
        o.vy *= drag;

        o.x += o.vx;
        o.y += o.vy;

        nob.setPixel(o.x,o.y,black);
    }

    nob.updateEnd();

    frameTime = performance.now()-frameStart;
    fps = 16.666666/frameTime*60;
}
update();

document.addEventListener("keydown",e=>{
    let key = e.key.toLowerCase();
    keys.set(key,true);
});
document.addEventListener("keyup",e=>{
    let key = e.key.toLowerCase();
    keys.set(key,false);
});

setInterval(function(){
    demo.textContent = "FPS: "+Math.floor(fps);
},500);