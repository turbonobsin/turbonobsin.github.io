const control = document.getElementById("controls");
function getByClass(a,c){
    return a.getElementsByClassName(c)[0];
}
const redraw = getByClass(control,"redraw");
const zoom = getByClass(control,"zoom");
const left1 = getByClass(control,"left");
const right1 = getByClass(control,"right");
const eq1 = getByClass(control,"eq");
const step1 = getByClass(control,"step");
const instant1 = getByClass(control,"instant");
const delay1 = getByClass(control,"delay");
const skip1 = getByClass(control,"skip");

function compute(s){
    return Function(`let _;with(Math){return ${s}};return _;`)();
}

const scale = 4;
let scale2 = zoom.valueAsNumber; //16
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

let list = [
    t=>2*(1+Math.cos(t)),
    t=>Math.log(t),
    t=>2*Math.sin(4*t),
    t=>Math.abs(Math.tan(t))**(Math.abs(1/Math.tan(t)))
];
let eq = function(t){
    return list[0](t);//4*Math.cos(t);
};
let left = compute(left1.value);//0
let right = compute(right1.value); //Math.PI*2
let step = step1.valueAsNumber; //0.01

let isInstant = instant1.checked; //true
let delay = delay1.valueAsNumber; //0
let skip = skip1.valueAsNumber; //3 //6

let drawRad = true;
let autoLoop = true;

let lastx = null;
let lasty = null;
let lastt = null;
function drawRaw(t,raw=false){
    let r = eq(t)*scale*scale2;
    let x = Math.cos(t)*r;
    let y = -Math.sin(t)*r;
    if(!raw){
        if(lastx != null){
            let dx = x-lastx;
            let dy = y-lasty;
            let dist = Math.sqrt(dx**2+dy**2);
            if(dist > 1){
                for(let i = 0; i < step; i += step/dist){
                    drawRaw(lastt+i,true);
                }
            }
        }
        lastx = x;
        lasty = y;
        lastt = t;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(mx+x,my+y,1,1);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(mx,my);
    ctx.lineTo(mx+x,my+y);
    //ctx.stroke();

    if(drawRad){
        r *= 2;
        ctx2.clearRect(0,0,can2.width,can2.height);
        ctx2.fillRect(can2.width*0.25,can2.height/2-r,20,r);

        ctx2.lineWidth = 5;
        ctx2.font = "50px arial";
        ctx2.fillText("Angle: "+(t*180/Math.PI).toFixed(1),can2.width/2,can2.height/2);
    }
}

let loopT = 0;
let loopTO = null;
function loop(skipM=1){
    for(let i = 0; i < skip*skipM; i++){
        drawRaw(loopT);
        loopT += step;
    }
    if(autoLoop) if(loopT < right) loopTO = setTimeout(loop,delay);
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
    if(k == "enter"){
        redraw.onmousedown();
    }
});

draw();

redraw.onmousedown = function(){
    lastx = null;
    lasty = null;
    lastt = null;
    scale2 = zoom.valueAsNumber;
    left = compute(left1.value);
    right = compute(right1.value);
    list[0] = Function("t",`let _;with(Math){_=${eq1.value}};return _`);
    step = step1.valueAsNumber;
    isInstant = instant1.checked;
    delay = delay1.valueAsNumber;
    skip = skip1.valueAsNumber;
    loopT = 0;
    clearTimeout(loopTO);
    loopTO = null;
    localStorage.left = left1.value;
    localStorage.right = right1.value;
    localStorage.eq = eq1.value;
    localStorage.step = step1.value;
    localStorage.isInstant = instant1.checked;
    localStorage.delay = delay1.value;
    localStorage.skip = skip1.value;
    draw();
};

window.onerror = function(e){
    alert("THERE WAS AN ERROR COMPUTING THAT");
};

if(!localStorage.getItem("left")) localStorage.left = 0;
if(!localStorage.getItem("right")) localStorage.right = "2*PI";
if(!localStorage.getItem("eq")) localStorage.eq = "4*sin(4*t)";
if(!localStorage.getItem("step")) localStorage.step = 0.005;
if(!localStorage.getItem("delay")) localStorage.delay = 0;
if(!localStorage.getItem("skip")) localStorage.skip = 2;
if(!localStorage.getItem("isInstant")) localStorage.isInstant = false;
left1.value = localStorage.left;
right1.value = localStorage.right;
eq1.value = localStorage.eq;
step1.value = localStorage.step;
instant1.checked = (localStorage.isInstant=="true"?true:false);
delay1.value = localStorage.delay;
skip1.value = localStorage.skip;
//localStorage.delay = delay;
//localStorage.skip = skip;

redraw.onmousedown();

let list1 = document.getElementsByTagName("input");
for(let i = 0; i < list1.length; i++){
    let l = list1[i];
    if(!l.type == "checkbox") continue;
    l.onclick = function(){
        localStorage.isInstant = instant1.checked;
    };
}

let b_reset = document.getElementById("reset");
b_reset.onclick = function(){
    localStorage.clear();
    location.reload();
};