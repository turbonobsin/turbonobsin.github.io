const can = document.getElementById("can") as HTMLCanvasElement;
let scale = 4;
can.width *= scale;
can.height *= scale;
const ctx = can.getContext("2d");

let gravity = 0.2;
let drag = 0.99;
let bounce = 0.5;

class Obj{
    constructor(x:number,y:number,r:number,col:string,vx=0,vy=0){
        let t = this;
        t.x = x;
        t.y = y;
        t.r = r;
        t.col = col;
        t.vx = vx;
        t.vy = vy;
        // t.vx = (Math.random()-0.5)*4;
    }
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    r = 0;
    col:string;
}

let objs:Obj[] = [];
let constant = false;

function makeNewBall(x=0,y=0,vx=0,vy=0,r=20){
    // r = 5+Math.floor(Math.random()*40);
    // r = 2+Math.floor(Math.random()*10);
    r = 18;
    objs.push(new Obj(x,y,r,"red",vx,vy));
}
for(let i = 0; i < 30; i++){
    makeNewBall(Math.random()*can.width,Math.random()*can.height);
}
function makeLot(num:number){
    for(let i = 0; i < num; i++) makeNewBall(Math.random()*can.width,0);
}

let gameFrames = 0;
function update(){
    requestAnimationFrame(update);
    gameFrames++;
    ctx.clearRect(0,0,can.width,can.height);

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        o.vy += gravity;
        o.vx *= drag;
        o.vy *= drag;
        
        o.x += o.vx;
        o.y += o.vy;

        function moveOut(o1:Obj){
            for(let j = 0; j < objs.length; j++){
                let o2 = objs[j];
                if(o2 == o1) continue;
                let dx = o2.x-o.x;
                let dy = o2.y-o.y;
                let radDist = o2.r+o.r;
                let dist = Math.sqrt(dx**2+dy**2);
                if(dist < radDist){
                    o2.x = o.x+dx/dist*radDist;
                    o2.y = o.y+dy/dist*radDist;
                }
            }
        }
        for(let j = 0; j < objs.length; j++){
            let o2 = objs[j];
            if(o2 == o) continue;
            let dx = o2.x-o.x;
            let dy = o2.y-o.y;
            let radDist = o2.r+o.r;
            let dist = Math.sqrt(dx**2+dy**2);
            let ang = Math.atan2(dy,dx);
            if(dist < radDist){
                ang -= Math.PI;
                let drag2 = 0.8*bounce;
                let speed = Math.sqrt(o.vx**2+o.vy**2)*-1*drag2;
                let amtX = Math.cos(ang)*speed;
                let amtY = Math.sin(ang)*speed;
                let force = 0.8*(o.r/20)*0.8; //0.2 //0.8
                o2.vx += dx/dist*force;
                o2.vy += dy/dist*force;

                o.vx = -amtX;
                o.vy = -amtY;
                // o.vx += dx/dist*force;
                // o.vy += dy/dist*force;

                o.x = o2.x+Math.cos(ang)*radDist;
                o.y = o2.y+Math.sin(ang)*radDist;
                moveOut(o);
            }
        }

        if(o.y+o.r >= can.height){
            o.vy = -Math.abs(o.vy*0.8*bounce);
            o.y = can.height-o.r;
        }
        else if(o.y-o.r < 0){
            o.vy = Math.abs(o.vy*0.8*bounce);
            o.y = o.r;
        }
        if(o.x+o.r >= can.width){
            o.vx = -Math.abs(o.vx*0.8*bounce);
            o.x = can.width-o.r;
        }
        else if(o.x-o.r < 0){
            o.vx = Math.abs(o.vx*0.8*bounce);
            o.x = o.r;
        }

        //draw
        ctx.fillStyle = o.col;
        ctx.beginPath();
        ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
        ctx.fill();
    }

    if(constant) if(gameFrames % 30 == 0) makeNewBall(can.width*0.75,can.height*0.25,-2,0);
}
update();