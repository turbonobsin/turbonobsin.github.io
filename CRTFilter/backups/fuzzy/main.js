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
    let scale = 1;

    can.width = tCan.width * 3 * scale;
    can.height = tCan.height * 3 * scale;

    let buf = tCtx.getImageData(0,0,tCan.width,tCan.height).data;
    let x2 = 0;
    let y2 = 0;
    let i = 0;
    for(let y = 0; y < tCan.height; y++){
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
            ctx.moveTo(x2,y2);
            ctx.lineTo(x2,y2+3*scale);
            ctx.stroke();
            
            ctx.strokeStyle = `rgba(0,${buf[i+1]},0,${buf[i+3]})`;
            ctx.beginPath();
            ctx.moveTo(x2+1*scale,y2);
            ctx.lineTo(x2+1*scale,y2+3*scale);
            ctx.stroke();

            ctx.strokeStyle = `rgba(0,0,${buf[i+2]},${buf[i+3]})`;
            ctx.beginPath();
            ctx.moveTo(x2*2*scale,y2);
            ctx.lineTo(x2*2*scale,y2+3*scale);
            ctx.stroke();

            x2 += 3 * scale;
            i += 4;
        }
        y2 += 3 * scale;
        x2 -= 3 * tCan.width * scale;
    }
    console.log(x2,y2,i);

    document.body.appendChild(tCan);
    window.tCan = tCan;
}
load();