/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
const ctx = can.getContext("2d");

// let scale = 0.05;
let scale = 3; //9
let useGlow = true;
let useLoop = false;

let img1 = document.createElement("img");
// img1.src = "ship1.jfif";
// img1.src = "insiders.png";
// img1.src = "emoji.png";
img1.src = "char.png";
// img1.src = "green.jpg";
// img1.src = "blue.jpg";

let rez = 256; //256

async function load(){
    ctx.clearRect(0,0,can.width,can.height);

    /**@type {HTMLImageElement} */
    let img = img1;
    if(!useLoop) img = await new Promise(resolve=>{
        let image = document.createElement("img");
        // image.src = "insiders.png";
        image.src = "emoji.png";
        // image.src = "char.png";
        // image.src = "green.jpg";
        // image.src = "blue.jpg";
        // image.src = "ship1.jfif";
        // image.src = "mc2.png";
        // image.src = "mc3.png";
        // image.src = "sectionTest2 - Copy (13).png";
        // image.src = "mc_shaders1.png";
        image.onload = function(){
            resolve(image);
        };
    });
    let tCan = document.createElement("canvas");
    // let subScale = 0.2; //1 //0.2 is perfect for emoji.png
    // let subScale = 128 / img.width * 0.3;
    // let subScale = 256 / img.width * 0.3;
    // let subScale = 512 / img.width * 0.3;
    let subScale = rez / img.width * 0.3;
    tCan.width = img.width * subScale;
    tCan.height = img.height * subScale;
    let tCtx = tCan.getContext("2d");
    let frameSpeed = 0.2;
    tCtx.drawImage(img,Math.round(Math.round(Math.sin(frameI*frameSpeed)*3)/3),0,tCan.width,tCan.height);

    can.width = tCan.width * 3 * scale;
    can.height = tCan.height * 3 * scale;

    let buf = tCtx.getImageData(0,0,tCan.width,tCan.height).data;
    let x2 = 0;
    let y2 = 0;
    let i = 0;
    let tol = scale/9*6;
    // let tol = scale/9*5;
    let skip = 1; //1
    if(true) for(let y = 0; y < tCan.height; y += skip){
        for(let x = 0; x < tCan.width; x += skip){

            // ctx.fillStyle = `rgba(${buf[i]},0,0,${buf[i+3]})`;
            // ctx.fillRect(x2,y2,scale,3*scale);
            // ctx.fillStyle = `rgba(0,${buf[i+1]},0,${buf[i+3]})`;
            // ctx.fillRect(x2+1*scale,y2,scale,3*scale);
            // ctx.fillStyle = `rgba(0,0,${buf[i+2]},${buf[i+3]})`;
            // ctx.fillRect(x2+2*scale,y2,scale,3*scale);

            let r = buf[i];
            let g = buf[i+1];
            let b = buf[i+2];
            let a = buf[i+3];

            ctx.lineCap = "round";
            ctx.lineWidth = scale;

            ctx.strokeStyle = `rgba(${r},0,0,${a})`;
            ctx.beginPath();
            ctx.moveTo(x2,y2+tol);
            ctx.lineTo(x2,y2+3*scale-tol);
            ctx.stroke();
            
            ctx.strokeStyle = `rgba(0,${g},0,${a})`;
            ctx.beginPath();
            ctx.moveTo(x2+1*scale,y2+tol);
            ctx.lineTo(x2+1*scale,y2+3*scale-tol);
            ctx.stroke();

            ctx.strokeStyle = `rgba(0,0,${b},${a})`;
            ctx.beginPath();
            ctx.moveTo(x2+2*scale,y2+tol);
            ctx.lineTo(x2+2*scale,y2+3*scale-tol);
            ctx.stroke();

            if(!useGlow){
                ctx.beginPath();
                ctx.rect(x2,y2,scale,3*scale);
                // ctx.arc(x2+scale,y2+1.5*scale,scale/2,0,Math.PI*2);
                // ctx.arc(x2+scale,y2+1.5*scale,scale*10,0,Math.PI*2); // blur
                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.globalAlpha = 0.5;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }

    i = 0;
    x2 = 0;
    y2 = 0;
    if(true) for(let y = 0; y < tCan.height; y += skip){
        for(let x = 0; x < tCan.width; x += skip){

            let r = buf[i];
            let g = buf[i+1];
            let b = buf[i+2];
            let tx = x2+scale;
            let ty = y2+1.5*scale;
            let int = 0.7;
            // let total = 
            let minBrightness = 0;
            if(r > minBrightness) if(Math.max(r,g,b) == r || true){
                drawGlow(tx,ty,r,0,0,r/255);
            }
            // if(g > minBrightness) if(Math.max(r,g,b) == g || true){
            //     drawGlow(tx,ty,0,g,0,g/255);
            // }
            // if(b > minBrightness) if(Math.max(r,g,b) == b || true){
            //     drawGlow(tx,ty,0,0,b,b/255);
            // }
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }
    // 
    i = 0;
    x2 = 0;
    y2 = 0;
    if(true) for(let y = 0; y < tCan.height; y += skip){
        for(let x = 0; x < tCan.width; x += skip){

            let r = buf[i];
            let g = buf[i+1];
            let b = buf[i+2];
            let tx = x2+scale;
            let ty = y2+1.5*scale;
            let int = 0.7;
            // let total = 
            let minBrightness = 0;
            if(g > minBrightness) if(Math.max(r,g,b) == g || true){
                drawGlow(tx,ty,0,g,0,g/255);
            }
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }
    // 
    i = 0;
    x2 = 0;
    y2 = 0;
    if(true) for(let y = 0; y < tCan.height; y += skip){
        for(let x = 0; x < tCan.width; x += skip){

            let r = buf[i];
            let g = buf[i+1];
            let b = buf[i+2];
            let tx = x2+scale;
            let ty = y2+1.5*scale;
            let int = 0.7;
            // let total = 
            let minBrightness = 0;
            if(b > minBrightness) if(Math.max(r,g,b) == b || true){
                drawGlow(tx,ty,0,0,b,b/255);
            }
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }

    if(!useLoop) document.body.appendChild(tCan);
    window.tCan = tCan;
}

// function drawGlow(x,y,r,g,b,intensity=0.3){
//     let rad = 300; //50
//     let rad2 = 20;
//     intensity *= 0.3;
//     intensity *= 0.05;
//     if(intensity < 0.002) return;
    
//     ctx.beginPath();
//     ctx.arc(x,y,rad,0,Math.PI*2);
//     let grad = ctx.createRadialGradient(x,y,0,x,y,rad);
//     grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
//     grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
//     ctx.fillStyle = grad;
//     ctx.globalCompositeOperation = "lighter";
//     ctx.globalAlpha = intensity;
//     ctx.fill();

//     ctx.beginPath();
//     ctx.arc(x,y,rad,0,Math.PI*2);
//     grad = ctx.createRadialGradient(x,y,0,x,y,rad2);
//     grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
//     grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
//     ctx.fillStyle = grad;
//     ctx.globalCompositeOperation = "lighter";
//     ctx.globalAlpha = intensity;
//     ctx.fill();
// }

// load();

let _cnt = 0;
function drawGlow(x,y,r,g,b,intensity=0.3){    
    if(!useGlow) return;

    intensity = (r+g+b)/180*(r ? r : g ? g : b) / 128;

    let cap = 1;
    if(intensity > cap) intensity = cap;
    
    let rad = 300; //50 //300
    let rad2 = scale/9*16;
    // intensity *= 0.99;
    // intensity *= 0.01;
    // if(intensity < 0.3) return;
    
    if(true) if(_cnt <= 0) if(intensity > 0.95){
        // intensity *= 0.035;
        intensity *= 0.02;
        _cnt = 40;
        ctx.beginPath();
        ctx.arc(x,y,rad,0,Math.PI*2);
        let grad = ctx.createRadialGradient(x,y,0,x,y,rad);
        grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
        grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = intensity;
        ctx.fill();
    }
    _cnt--;

    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    let grad = ctx.createRadialGradient(x,y,0,x,y,rad2);
    grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.fill();
}
function drawGlow_perfect(x,y,r,g,b,intensity=0.3){
    if(!useGlow) return;
    
    let rad = 300; //50
    let rad2 = scale/9*16;
    intensity *= 0.99;
    // intensity *= 0.01;
    if(intensity < 0.3) return;
    
    if(false) if(intensity > 0.6){
        ctx.beginPath();
        ctx.arc(x,y,rad,0,Math.PI*2);
        let grad = ctx.createRadialGradient(x,y,0,x,y,rad);
        grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
        grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = intensity;
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    let grad = ctx.createRadialGradient(x,y,0,x,y,rad2);
    grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.fill();
}

let frameI = 0;
function update(){
    requestAnimationFrame(update);

    load();
    frameI++;
}
if(useLoop) update();
else load();