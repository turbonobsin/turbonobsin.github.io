const can = document.getElementById("can");
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

const black = [0,0,0,255];

let objs = [];
if(false) for(let i = 0; i < 1000; i++){
    objs.push([
        Math.random()*nob.width,
        Math.random()*nob.height,
        Math.random()-0.5,
        Math.random()-0.5
    ]);
}
for(let i = 0; i < Math.PI*2; i += Math.PI*2 / 720){
    let tx = Math.cos(i);
    let ty = Math.sin(i);
    objs.push([
        tx*70+nob.centerX,
        ty*70+nob.centerY,
        -tx,-ty
    ]);
}

var mx = nob.centerX;
var my = nob.centerY;
var max = 8;
var drag = 1;//0.99;

function update(){
    window.requestAnimationFrame(update);
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        let dx = o[0]-mx;
        let dy = o[1]-my;
        let dist = Math.sqrt(dx*dx+dy*dy);
        o[2] -= dx/dist/2;
        o[3] -= dy/dist/2;

        let ang = Math.atan2(dy,dx)+Math.PI/2;
        let tx = Math.cos(ang)*10 / (dist-150);
        let ty = Math.sin(ang)*10 / (150-dist);
        o[2] += tx;
        o[3] += ty;

        if(o[2] > max) o[2] = max;
        else if(o[2] < -max) o[2] = -max;
        if(o[3] > max) o[3] = max;
        else if(o[3] < -max) o[3] = -max;

        o[2] *= drag;
        o[3] *= drag;

        o[0] += o[2];
        o[1] += o[3];

        nob.setPixel(o[0],o[1],black);
    }

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
}
update();