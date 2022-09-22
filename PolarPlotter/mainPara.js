const scale = 4;
const scale2 = 16; //16
/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
/**@type {HTMLCanvasElement} */
const can2 = document.getElementById("can2");
can.width *= scale;
can.height *= scale;
can2.width *= scale;
can2.height *= scale;
const ctx = can.getContext("2d");
const ctx2 = can2.getContext("2d");

const mx = can.width/2;
const my = can.height/2;

var useParam = true;

let list = [
    t=>Math.cos(3*t),
    t=>Math.log(t),
    t=>2*Math.sin(4*t),
    t=>Math.abs(Math.tan(t))**(Math.abs(1/Math.tan(t)))
];
let listP = [
    [
        t=>Math.sin(2*t)+3*Math.sin(t),
        t=>2*Math.sin(3*t)
    ]
];
let eq = function(t){
    return list[2](t);//4*Math.cos(t);
};
let eqPX = function(t){
    return listP[0][0](t);
};
let eqPY = function(t){
    return -listP[0][1](t);
}
let left = -6.3;
let right = 6.3;
let step = 0.01; //0.001

let isInstant = false;
let delay = 0;
let skip = 6; //3

let drawRad = true;
let autoLoop = true;

function drawRaw(t){
    if(!useParam){
        let r = eq(t)*scale*scale2;
        let tmp = r;
        let x = Math.cos(t)*r;
        let y = -Math.sin(t)*r;
        //ctx.fillStyle = "black";
        ctx.fillRect(mx+x,my+y,1,1);
        /*ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(mx,my);
        ctx.lineTo(mx+x,my+y);*/
        //ctx.stroke();

        if(drawRad){
            r *= 2;
            ctx2.clearRect(0,0,can2.width,can2.height);
            ctx2.fillRect(can2.width*0.25,can2.height/2-r,20,r);

            ctx2.lineWidth = 5;
            ctx2.font = "50px arial";
            ctx2.fillText("Angle: "+(t*180/Math.PI).toFixed(1),can2.width/2,can2.height/2);
        }
        return;
    }
    let x = eqPX(t)*scale*scale2;
    let y = eqPY(t)*scale*scale2;
    ctx.fillRect(mx+x,my+y,1,1);
}

let loopT = 0;
function loop(skipM=1){
    for(let i = 0; i < skip*skipM; i++){
        drawRaw(loopT);
        loopT += step;
    }
    if(autoLoop) if(loopT < right) setTimeout(loop,delay);
}

function draw(){
    ctx.clearRect(0,0,can.width,can.height);
    ctx2.clearRect(0,0,can2.width,can2.height);

    ctx.fillRect(mx,0,1,can.height);
    ctx.fillRect(0,my,can.width,1);
    for(let i = 0; i < can.height/2; i += scale*scale2){
        ctx.fillRect(mx-4,my+i,8,1);
    }
    for(let i = 0; i < can.height/2; i += scale*scale2){
        ctx.fillRect(mx-4,my-i,8,1);
    }
    for(let i = 0; i < can.width/2; i += scale*scale2){
        ctx.fillRect(mx+i,my-4,1,8);
    }
    for(let i = 0; i < can.width/2; i += scale*scale2){
        ctx.fillRect(mx-i,my-4,1,8);
    }
    if(isInstant) for(let t = left; t < right; t += step){
        drawRaw(t);
    }
    else{
        loopT = left;
        loop();
    }
}

document.addEventListener("keydown",e=>{
    let k = e.key.toLowerCase();
    if(k == "r"){
        draw();
    }
});

draw();