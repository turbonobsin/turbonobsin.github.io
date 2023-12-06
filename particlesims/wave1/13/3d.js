const can = document.getElementById("can");
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);

const black = [0,0,0,255];
const red = [255,0,0,255];
const smoke = [40,40,40,200];

var objs = [];
var decor = [];
var colls = [];
colls.push([
    80,80,-20,-20,20,20
]);
colls.push([
    nob.centerX+50,
    nob.centerY+20,
    -30,
    -30,
    30,30
]);

if(false) for(let i = 0; i < 1000; i++){
    objs.push([
        Math.random()*nob.width,
        Math.random()*nob.height,
        Math.random()-0.5,
        Math.random()-0.5
    ]);
}
if(false) for(let i = 0; i < Math.PI*2; i += Math.PI*2 / 720){
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
var max = 4; //4
var drag = 1;//0.99;

var keys = {};
document.addEventListener("keydown",e=>{
    let k = e.key.toLowerCase();
    keys[k] = true;
});
document.addEventListener("keyup",e=>{
    let k = e.key.toLowerCase();
    keys[k] = false;
});

var frames = 0;
function update(){
    window.requestAnimationFrame(update);
    nob.pixelCount = 0;
    nob.buf = new Uint8ClampedArray(nob.size);

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];

        let dx = o[0]-nob.centerX;
        let dy = o[1]-nob.centerY;
        let dist = Math.sqrt(dx*dx+dy*dy);

        o[3] += 0.1;

        //vortex
        if(keys.q){
            o[2] -= dx/dist/2;
            o[3] -= dy/dist/2;
        }

        //rotate
        if(keys.w){
            let ang = Math.atan2(dy,dx)+Math.PI/2;
            let tx = Math.cos(ang)*10 / (100-dist);
            let ty = Math.sin(ang)*10 / (100-dist);
            o[2] += tx;
            o[3] += ty;
        }

        //bounce
        let hit = false;
        let bounce = keys.e;
        if(true){
            if(o[0] < 0){
                if(bounce) o[2] = -o[2];
                else hit = true;
                o[0] = 0;
            }
            else if(o[0] >= nob.width){
                if(bounce) o[2] = -o[2];
                else hit = true;
                o[0] = nob.right;
            }
            if(o[1] < 0){
                if(bounce) o[3] = -o[3];
                else hit = true;
                o[1] = 0;
            }
            else if(o[1] >= nob.height){
                if(bounce) o[3] = -o[3];
                else hit = true;
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

        let lx = o[0];
        let ly = o[1];

        //run collision
        if(!hit) for(let j = 0; j < colls.length; j++){
            let c = colls[j];
            if(o[0] > c[0]+c[2] && o[0] <= c[0]+c[4] && o[1] > c[1]+c[3] && o[1] <= c[1]+c[5]){
                if(Math.abs(o[0]-c[0]) >= Math.abs(o[1]-c[1])){
                    if(o[0] <= c[0]){
                        o[0] = c[0]+c[2];
                        o[2] = -o[2];
                        hit = true;
                    }
                    else{
                        o[0] = c[0]+c[4];
                        o[2] = -o[2];
                        hit = true;
                    }
                }
                else{
                    if(o[1] <= c[1]){
                        o[1] = c[1]+c[3];
                        o[3] = -o[3];
                        hit = true;
                    }
                    else{
                        o[1] = c[1]+c[5];
                        o[3] = -o[3];
                        hit = true;
                    }
                }
            }
        }

        if(hit){
            let tmpx = o[0];
            let tmpy = o[1];
            o[0] = lx;
            o[1] = ly;
            if(o[6]){
                if(o[6]()){
                    objs.splice(i,1);
                    i--;
                    continue;
                }
            }
            o[0] = tmpx;
            o[1] = tmpy;
        }

        //lifetime
        /*if(o[4] != null){
            o[4]--;
            if(o[4] < 0){
                objs.splice(i,1);
                i--;
                continue;
            }
        }*/
        if(o[5]) o[5]();

        nob.setPixel(o[0],o[1],o[4]||black);
    }
    for(let i = 0; i < decor.length; i++){
        let o = decor[i];
        
        o[0] += o[2];
        o[1] += o[3];

        let des = false;

        if(o[5]) des = o[5]();

        if(!des){
            if(o[0] < 0) des = true;
            else if(o[1] < 0) des = true;
            else if(o[0] >= nob.width) des = true;
            else if(o[1] >= nob.height) des = true;
        }

        if(des){
            decor.splice(i,1);
            i--;
            continue;
        }
        
        nob.drawPixel(o[0],o[1],o[4]);
    }

    //draw colls
    for(let i = 0; i < colls.length; i++){
        let o = colls[i];
        nob.drawLine_smart(o[0]+o[2],o[1]+o[3],o[0]+o[4]-1,o[1]+o[3],red,1);
        nob.drawLine_smart(o[0]+o[2],o[1]+o[5]-1,o[0]+o[4]-1,o[1]+o[5]-1,red,1);
        
        nob.drawLine_smart(o[0]+o[2],o[1]+o[3],o[0]+o[2],o[1]+o[5]-1,red,1);
        nob.drawLine_smart(o[0]+o[4]-1,o[1]+o[3],o[0]+o[4]-1,o[1]+o[5]-1,red,1);
    }

    //spray 1
    if(keys.c) if(Math.random() < 1.2){
        let x = 50;
        let y = 50;
        let dx = x-mx;
        let dy = y-my;
        let ang = Math.atan2(dy,dx);
        let tx = -Math.cos(ang)*4;
        let ty = -Math.sin(ang)*4;
        //let dist = Math.sqrt(dx*dx+dy*dy);
        //let tx = -dx/dist*4;
        //let ty = -dy/dist*4;
        objs.push([
            x,y,tx,ty,black,null,function(){
                for(let i = 0; i < 3; i++) if(Math.random() < 0.2){
                    let t = this;
                    let tx = randScale();
                    let ty = randScale();
                    decor.push([t[0]+tx,t[1]+ty,0.1+tx/1.5,-0.5+ty/2,[40,40,40,100],function(){
                        this[7].lifetime--;
                        this[4][3] -= 2;
                        if(this[4][3] <= 0) return 1;
                        nob.drawCircle(this[0],this[1],(this[7].lifetime/this[7].maxlifetime)*4,this[4]);
                    },null,{
                        lifetime:100,
                        maxlifetime:100+Math.floor(Math.random()*60)
                    }]);
                    decor.push([t[0]+tx/2,t[1]+ty/2,tx,-1+ty/2,[255,120+Math.floor(Math.random()*20),0,200],function(){
                        this[4][3] -= 16;
                        if(this[4][3] <= 0) return 1;
                        nob.drawCircle(this[0],this[1],(this[4][3]/250)*5,this[4]);
                    }]);
                }
                return 1;
            }
        ]);
    }
    //spray 2
    if(true){
        let angoff = (frames%180)*2 * Math.PI/180;
        for(let i = 0; i < Math.PI*2; i += Math.PI/2){
            let tx = Math.cos(i+angoff)*2;
            let ty = Math.sin(i+angoff)*2;
            objs.push([nob.centerX,20,tx,ty,black]);
        }
    }

    ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);

    frames++;
}
function randScale(v=1){
    return (Math.random()-0.5)*v;
}
update();

document.addEventListener("mousemove",e=>{
    mx = e.clientX/window.innerWidth*nob.width;
    my = e.clientY/window.innerHeight*nob.height;
});

function moveObj(o,_ax,_ay){
    main: while(Math.abs(_ax) >= 1 || Math.abs(_ay) >= 1){
        let col = false;
        let ax = 0;
        let ay = 0;
        if(Math.abs(_ax) >= 1) ax = ax/Math.abs(ax);
        else ax = _ax;
        if(Math.abs(_ay) >= 1) ay = ay/Math.abs(ay); 
        else ay = _ay;
        let nx = o[0]+ax;
        let ny = o[1]+ay;
        for(let i = 0; i < colls.length; i++){
            let c = colls[i];
            if(nx >= c[0]+c[2] && nx <= c[0]+c[4] && ny >= c[1]+c[3] && ny <= c[1]+c[5]){
                col = true;
                break main;
            }
        }
        _ax -= ax;
        _ay -= ay;
    }
}