const can = document.getElementById("aperture") as HTMLCanvasElement;
can.width = 700;
can.height = 700;
const ctx = can.getContext("2d");

let innerRad = 0.5;

let amt = 6;

class AnimProp{
    constructor(initial:number,time:number){
        let dummy = document.createElement("div");
        document.body.appendChild(dummy);
        dummy.className = "dummy";
        dummy.style.scale = initial.toString();
        dummy.style.setProperty("--time",time+"s");
        this.dummy = dummy;
    }
    dummy:HTMLElement;
    setTime(time:number){
        this.dummy.style.setProperty("--time",time+"s");
    }
    get(){
        return parseFloat(getComputedStyle(this.dummy).scale);
    }
    set(v:number,time:number){
        this.setTime(time);
        this.dummy.style.scale = v.toString();
    }
    run(className:string){
        this.dummy.classList.add(className);
        this.dummy.onanimationend = ()=>{
            this.dummy.classList.remove(className);
        };
    }
}

let test = new AnimProp(0,0.2);
let p_rot = new AnimProp(0,0.5);
async function change(){
    test.set(0.8,0.8);
    p_rot.set(Math.PI,0.8); //1.2
    await wait(1200);
    test.set(0,1);
    p_rot.set(0,1.5);
}
function wait(delay:number){
    return new Promise<void>(resolve=>{
        setTimeout(()=>{
            resolve();
        },delay);
    });
}


function update(){
    innerRad = test.get();
    requestAnimationFrame(update);
    ctx.clearRect(0,0,can.width,can.height);
    let cx = can.width/2;
    let cy = can.height/2;
    let rad = cx*2.5; //1.5 //0.8 for cool folded effect
    let radClose = cx*innerRad;

    let tmpCan = document.createElement("canvas");
    tmpCan.width = can.width;
    tmpCan.height = can.height;
    let tmpCtx = tmpCan.getContext("2d");
    let lx = null;
    let ly = null;
    let pos = [];
    if(true) for(let i = 0; i < amt; i++){
        let lineW = 5;
        ctx.lineWidth = lineW;
        let radSmall = rad-lineW+2;
        let radCloseSmall = radClose-lineW+2;
        
        let ang = i*Math.PI*2/amt + p_rot.get();
        let x = Math.cos(ang);
        let y = Math.sin(ang);
        let tx = cx+x*radClose;
        let ty = cy+y*radClose;
        let tx_tmp = cx+x*radCloseSmall;
        let ty_tmp = cy+y*radCloseSmall;

        ctx.strokeStyle = "black";
        ctx.fillStyle = "gray";
        // ctx.fillRect(tx-5,ty-5,10,10);

        if(i != -1){
            let tarAng = ang-Math.PI/2-Math.PI*2/(amt*2);
            let tx2 = tx+Math.cos(tarAng)*rad;
            let ty2 = ty+Math.sin(tarAng)*rad;
            let tx2_tmp = tx+Math.cos(tarAng)*radSmall;
            let ty2_tmp = ty+Math.sin(tarAng)*radSmall;
            pos.push([tx_tmp,ty_tmp]);
            // ctx.strokeStyle = "red";
            ctx.beginPath();
            
            if(lx == null){
                let _ang = (amt-1)*Math.PI*2/amt + p_rot.get();
                let _x = Math.cos(_ang);
                let _y = Math.sin(_ang);
                let _tx = cx+_x*radClose;
                let _ty = cy+_y*radClose;
                let _tarAng = _ang-Math.PI/2-Math.PI*2/(amt*2);
                let _tx2 = _tx+Math.cos(_tarAng)*rad;
                let _ty2 = _ty+Math.sin(_tarAng)*rad;
                lx = _tx2;
                ly = _ty2;
            }
            ctx.moveTo(tx,ty);
            ctx.lineTo(tx2,ty2);
            ctx.lineTo(lx,ly);
            ctx.stroke();
            lx = tx2;
            ly = ty2;
        }
    }
    ctx.beginPath();
    for(let i = 0; i < pos.length; i++){
        let [x,y] = pos[i];
        if(i == 0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    }
    ctx.fillStyle = "white";
    ctx.lineWidth = 10;
    ctx.fill();

    ctx.resetTransform();
    ctx.drawImage(tmpCan,0,0);
}
update();