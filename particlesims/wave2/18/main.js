/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
let resScale = 2;
can.width *= resScale;
can.height *= resScale;
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

let objs = [];
for(let i = 0; i < 500; i++){
    objs.push([
        Math.random()*nob.width,
        Math.random()*nob.height,
        Math.random()-0.5,
        Math.random()-0.5
    ]);
}

let drag = 1; //0.93
let maxVel = 5;
let useBounce = true;

function group(){
    for(let i = 0; i < objs.length; i++){
        let o = objs[i];
        for(let j = i+1; j < objs.length; j++){
            let o2 = objs[j];
            let dx = o[0]-o2[0];
            let dy = o[1]-o2[1];
            let dist = Math.sqrt(dx**2+dy**2);
            if(dist > 20){
                o[2] -= dx/15000;
                o[3] -= dy/15000;
            }
        }
    }
}
function constellation(){
    for(let i = 0; i < objs.length; i++){
        let o = objs[i];
        for(let j = i+1; j < objs.length; j++){
            let o2 = objs[j];
            let dx = o[0]-o2[0];
            let dy = o[1]-o2[1];
            let dist = Math.sqrt(dx**2+dy**2);
            if(dist < 30 && dist > 20){
                nob.drawLine_smart(o[0],o[1],o2[0],o2[1],c_black,1);
                // nob.drawLine_smart(o[0],o[1],o2[0],o2[1],c_black,3-dist/30*3);
            }
        }
    }
}

function update(){
    requestAnimationFrame(update);
    nob.updateStart();

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        o[2] *= drag;
        o[3] *= drag;
        if(o[2] > maxVel) o[2] = maxVel;
        else if(o[2] < -maxVel) o[2] = -maxVel;
        if(o[3] > maxVel) o[3] = maxVel;
        else if(o[3] < -maxVel) o[3] = -maxVel;

        if(o[0] < 0) o[2] *= -1;
        else if(o[0] >= nob.width) o[2] *= -1;
        if(o[1] < 0) o[3] *= -1;
        else if(o[1] >= nob.height) o[3] *= -1;

        let dx = o[0]-nob.centerX;
        let dy = o[1]-nob.centerY;
        let dist = Math.sqrt(dx**2+dy**2);
        o[2] -= dx/dist/4;
        o[3] -= dy/dist/4;

        let ang = Math.atan2(dy,dx);
        ang += Math.PI/6*(400/dist);
        o[2] -= Math.cos(ang)/10*(100/dist);
        o[3] -= Math.sin(ang)/10*(100/dist);

        o[0] += o[2];
        o[1] += o[3];

        nob.setPixel(o[0],o[1],c_black);
    }

    // group();
    constellation();
    
    nob.updateEnd();

}
update();