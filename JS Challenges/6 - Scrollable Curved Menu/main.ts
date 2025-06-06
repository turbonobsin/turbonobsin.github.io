const menu = document.getElementById("menu");
const cont = menu.querySelector(".cont") as HTMLElement;
const overlay = menu.querySelector(".overlay") as HTMLElement;


class Slot{
    constructor(txt){
        this.txt = txt;
    }
    ref:HTMLElement;
    y = 0;
    x = 0;
    yy = 0;
    txt = "-.-";
    update(){
        let d = this.ref;
        let height = h*(list.length)-8;
        this.yy = (height/2 + (this.y+y) % height);
        d.style.top = this.yy+"px";
        
        let yoff = ((this.yy+height)-height)/height;
        
        
        let scale = yoff;
        scale = Math.abs(scale);
        scale = 1-scale;
        d.style.scale = scale+"";
        let w = ((scale*4)**2)**2+100;
        d.style.width = `${w}px`;

        let ang = yoff*Math.PI/1.5*1.4-Math.PI/2;
        this.x = Math.sin(ang)*100-w+100;
        
        d.style.left = this.x+"px";
    }
}
let list:Slot[] = [];
for(let i = 0; i < 7; i++){
    list.push(new Slot(`${i+1}th Item`));
}
let h = 100;
let y = -h*list.length;
let vy = 0;
let drag = 0.98; //0.93

function load(){
    for(let i = 0; i < list.length; i++){
        let d = document.createElement("div");
        let data = list[i];
        data.y = i*h;
        d.innerHTML = `<div>${data.txt}</div>`;
        cont.appendChild(d);
        data.ref = d;
        data.update();
    }
    overlay.style.height = (h*list.length+h)+"px";
}
load();

overlay.onwheel = function(e){
    let speedScale = 3;
    vy -= e.deltaY/150*speedScale;
};

function update(){
    requestAnimationFrame(update);
    y += vy;
    if(y > -h*list.length) y -= h*list.length;
    else if(y < -h*list.length*2) y += h*list.length;
    for(let i = 0; i < list.length; i++){
        let data = list[i];
        data.update();
    }
    vy *= drag;

    //

    let tarr = (Math.abs(y) % (h*list.length))/h*list.length;
    let tar = Math.round(tarr/h*2*list.length)*h/2/list.length;
    let tol = 0;
    if(tar > tarr+tol){
        vy += 0.3;
        vy *= 0.94;
    }
    else if(tar < tarr-tol){
        vy -= 0.3;
        vy *= 0.94;
    }
}
update();