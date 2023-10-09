/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
const ctx = can.getContext("2d");

async function load(){
    ctx.clearRect(0,0,can.width,can.height);

    /**@type {HTMLImageElement} */
    let img = await new Promise(resolve=>{
        let image = document.createElement("img");
        // image.src = "insiders.png";
        image.src = "emoji.png";
        image.onload = function(){
            resolve(image);
        };
    });
    let tCan = document.createElement("canvas");
    tCan.width = img.width;
    tCan.height = img.height;
    let tCtx = tCan.getContext("2d");
    tCtx.drawImage(img,0,0);

    // let scale = 0.05;
    let scale = 9;

    can.width = tCan.width * 3 * scale;
    can.height = tCan.height * 3 * scale;

    let buf = tCtx.getImageData(0,0,tCan.width,tCan.height).data;
    let x2 = 0;
    let y2 = 0;
    let i = 0;
    let tol = 6;
    if(true) for(let y = 0; y < tCan.height; y++){
        for(let x = 0; x < tCan.width; x++){

            // ctx.fillStyle = `rgba(${buf[i]},0,0,${buf[i+3]})`;
            // ctx.fillRect(x2,y2,scale,3*scale);
            // ctx.fillStyle = `rgba(0,${buf[i+1]},0,${buf[i+3]})`;
            // ctx.fillRect(x2+1*scale,y2,scale,3*scale);
            // ctx.fillStyle = `rgba(0,0,${buf[i+2]},${buf[i+3]})`;
            // ctx.fillRect(x2+2*scale,y2,scale,3*scale);

            ctx.lineCap = "round";
            ctx.lineWidth = scale;

            ctx.strokeStyle = `rgba(${buf[i]},0,0,${buf[i+3]})`;
            ctx.beginPath();
            ctx.moveTo(x2,y2+tol);
            ctx.lineTo(x2,y2+3*scale-tol);
            ctx.stroke();
            
            ctx.strokeStyle = `rgba(0,${buf[i+1]},0,${buf[i+3]})`;
            ctx.beginPath();
            ctx.moveTo(x2+1*scale,y2+tol);
            ctx.lineTo(x2+1*scale,y2+3*scale-tol);
            ctx.stroke();

            // if(buf[i+1] < Math.random()){
            if(false) if(Math.random() < 0.001){
                ctx.beginPath();
                ctx.arc(x2+1*scale,y2+tol);
                let grad = ctx.createRadialGradient(x2,y2,10,x2,y2,20);
                grad.addColorStop(0,"red");
                grad.addColorStop(0.25,"orange");
                grad.addColorStop(0.5, "yellow");
                grad.addColorStop(0.75, "green");
                grad.addColorStop(1, "blue");
                ctx.fillStyle = grad;
                ctx.fill();
            }

            ctx.strokeStyle = `rgba(0,0,${buf[i+2]},${buf[i+3]})`;
            ctx.beginPath();
            ctx.moveTo(x2*2*scale,y2+tol);
            ctx.lineTo(x2*2*scale,y2+3*scale-tol);
            ctx.stroke();

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }

    i = 0;
    x2 = 0;
    y2 = 0;
    if(true) for(let y = 0; y < tCan.height; y++){
        for(let x = 0; x < tCan.width; x++){

            let r = buf[i];
            let g = buf[i+1];
            let b = buf[i+2];
            let tx = x2+scale;
            let ty = y2+1.5*scale;
            let int = 0.7;
            let minBrightness = 0;
            if(r > minBrightness) if(Math.max(r,g,b) == r){
                drawGlow(tx,ty,r,0,0,r/255);
            }
            if(g > minBrightness) if(Math.max(r,g,b) == g){
                drawGlow(tx,ty,0,g,0,g/255);
            }
            if(b > minBrightness) if(Math.max(r,g,b) == b){
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

    document.body.appendChild(tCan);
    window.tCan = tCan;
}

function drawGlow(x,y,r,g,b,intensity=0.3){
    let rad = 300; //50
    let rad2 = 20;
    intensity *= 0.3;
    intensity *= 0.05;
    if(intensity < 0.002) return;
    
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    let grad = ctx.createRadialGradient(x,y,0,x,y,rad);
    grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    grad = ctx.createRadialGradient(x,y,0,x,y,rad2);
    grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.fill();
}

load();

/**function drawGlow(x,y,r,g,b,intensity=0.3){
    let rad = 300; //50
    let rad2 = 20;
    intensity *= 0.3;
    intensity *= 0.05;
    if(intensity < 0.002) return;
    
    if(intensity > 0.6){
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
    grad = ctx.createRadialGradient(x,y,0,x,y,rad2);
    grad.addColorStop(0,`rgba(${r},${g},${b},1)`);
    grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = intensity;
    ctx.fill();
} */