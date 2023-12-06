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
if(true) for(let i = 0; i < Math.PI*2; i += Math.PI*2 / 720){
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
var max = 4;
var drag = 1;//0.99;

function update(){
    window.requestAnimationFrame(update);
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        let dx = o[0]-nob.centerX;
        let dy = o[1]-nob.centerY;
        let dist = Math.sqrt(dx*dx+dy*dy);

        //vortex
        if(true){
            o[2] -= dx/dist/2;
            o[3] -= dy/dist/2;
        }

        //rotate
        if(false){
            let ang = Math.atan2(dy,dx)+Math.PI/2;
            let tx = Math.cos(ang)*10 / (100-dist);
            let ty = Math.sin(ang)*10 / (100-dist);
            o[2] += tx;
            o[3] += ty;
        }

        //bounce
        if(true){
            if(o[0] < 0){
                o[2] = -o[2];
                o[0] = 0;
            }
            else if(o[0] >= nob.width){
                o[2] = -o[2];
                o[0] = nob.right;
            }
            if(o[1] < 0){
                o[3] = -o[3];
                o[1] = 0;
            }
            else if(o[1] >= nob.height){
                o[3] = -o[3];
                o[1] = nob.bottom;
            }
        }

        if(o[2] > max) o[2] = max;
        else if(o[2] < -max) o[2] = -max;
        if(o[3] > max) o[3] = max;
        else if(o[3] < -max) o[3] = -max;

        o[2] *= drag;
        o[3] *= drag;

        o[0] += o[2];
        o[1] += o[3];

        if(o[4] != null){
            o[4]--;
            if(o[4] < 0){
                objs.splice(i,1);
                continue;
            }
        }

        nob.setPixel(o[0],o[1],black);
    }

    //spray 1
    if(false) if(Math.random() < 1.2){
        let x = 50;
        let y = 50;
        let dx = x-mx;
        let dy = y-my;
        let dist = Math.sqrt(dx*dx+dy*dy);
        let tx = -dx/dist*4;
        let ty = -dy/dist*4;
        objs.push([
            x,y,tx,ty,100
        ]);
    }

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
}
update();

document.addEventListener("mousemove",e=>{
    mx = e.clientX/window.innerWidth*nob.width;
    my = e.clientY/window.innerHeight*nob.height;
});