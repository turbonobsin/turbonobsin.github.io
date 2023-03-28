class Particle extends Obj{
    constructor(x,y,vx,vy,col){
        super(x,y,3,3);
        let t = this;
        t.vx = vx;
        t.vy = vy;
        t.col = col;
    }
    vx = 0;
    vy = 0;
    col = "";
    lifetime = 60;
    onupdate = function(){
        let p = this;
        ctx.fillStyle = p.col;
        ctx.fillRect(p.x-1,p.y-1,3,3);
    };
    isDead = false;
}

function createParticleBatch(x,y){
    for(let i = 0; i < 10; i++){
        let vx = (Math.random()-0.5)/2;
        let vy = (Math.random()-0.5)/2;
        let p = new Particle(x+vx*5,y+vy*5,vx*2,vy*2,"red");
        particles.push(p);
    }
}
function landingAnim(x,y,strength){
    return;
    let amt = 10+Math.floor(Math.random()*10);
    for(let i = 0; i < amt; i++){
        let vx = (Math.random()-0.5)/2;
        let vy = (-Math.random());
        let p = new Particle(x+vx*strength,y+vy*2,vx*strength,vy-strength/3,"gray");
        p.onupdate = function(){
            this.lifetime--;
            ctx.fillStyle = this.col;
            ctx.globalAlpha = this.lifetime/60;
            ctx.fillRect(this.x-1,this.y-1,3,3);
            this.vy += 0.2;
            ctx.globalAlpha = 1;
        };
        particles.push(p);
    }
}
function jumpAnim(x,y){
    let amt = 5+Math.floor(Math.random()*2);
    for(let i = 0; i < amt; i++){
        let vx = (Math.random()-0.5)/2;
        let vy = (-Math.random()/4);
        let p = new Particle(x+vx*20,y+vy*25,vx,vy/4,"lightgray");
        p.onupdate = function(){
            this.vx += (Math.random()-0.5)/20;
            this.vy += (Math.random()-0.5)/20;
            this.vy += 0.01;
            this.lifetime--;
            ctx.globalAlpha = this.lifetime/60;
            ctx.beginPath();
            ctx.arc(this.x,this.y,8,0,Math.PI*2);
            ctx.fillStyle = this.col;
            ctx.fill();
            ctx.globalAlpha = 1;
        };
        particles.push(p);
    }
}

//MENU

class SpellMenu{
    constructor(){

    }
    types = [
        "fire",
        "ice",
        "earth",
        "lightning",
        "life",
        "light",
        "energy"
    ];
    typeCols = [
        "tomato",
        "dodgerblue",
        "sienna",
        "gold",
        "limegreen",
        "palegoldenrod",
        "mediumorchid",
        //
        "red",
        "dodgerblue",
        "saddlebrown",
        "yellow",
        "lightgreen",
        "palegoldenrod",
        "mediumorchid"
    ];
    isOpen = false;
    opening = false;
    prog = 0;
    x = 0;
    y = 0;
    ang = 0;
    va = 0;
    vdrag = 0.9;
    scale = 1;
    vscale = 0;
    scaleDrag = 0.02;
    open(){
        let t = this;
        t.opening = true;
        t.x = mx;
        t.y = my;
    }
    close(){
        let t = this;
        t.opening = false;
    }
    draw(){
        let t = this;

        if(t.opening) t.prog += 0.1;
        else t.prog -= 0.1;
        if(t.prog > 1){
            t.prog = 1;
            if(!t.isOpen){
                t.ang = 0;
                t.va = 0.1;
                t.scale = 1;
                t.vscale = 0.05;
            }
            t.isOpen = true;
        }
        else if(t.prog < 0){
            t.prog = 0;
            t.isOpen = false;
            t.ang = 0;
            t.va = 0;
            t.scale = 1;
            t.vscale = 0;
        }

        let prog = t.prog;

        t.ang += t.va;
        t.va *= t.vdrag;
        t.scale += t.vscale;
        if(t.scale >= 1+t.scaleDrag) t.vscale -= t.scaleDrag;
        else if(t.scale <= 1-t.scaleDrag) t.vscale += t.scaleDrag;
        else t.vscale = 0;
        
        ctx.beginPath();
        let cx = t.x;
        let cy = t.y;
        let rad = 50*prog*t.scale;
        ctx.arc(cx,cy,rad,0,Math.PI*2);
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 4;
        ctx.stroke();

        let angAmt = 1/t.types.length*Math.PI*2;

        for(let i = 0; i < t.types.length; i++){
            let type = t.types[i];
            let col = t.typeCols[i];
            let angOff = prog*Math.PI/1.5+t.ang;
            let ang = i/t.types.length*Math.PI*2+angOff;
            let tx = Math.cos(ang-angAmt/2)*rad;
            let ty = Math.sin(ang-angAmt/2)*rad;
            let subRad = 15*prog;
            // let tx2 = Math.cos(ang+angAmt/2)*rad;
            // let ty2 = Math.sin(ang+angAmt/2)*rad;
            // ctx.beginPath();
            // ctx.moveTo(cx+Math.cos(ang)*rad/2,cy+Math.sin(ang)*rad/2);
            // ctx.lineTo(cx+tx/2,cy+ty/2);
            // ctx.lineTo(cx+tx,cy+ty);
            // // ctx.lineTo(cx+tx2,cy+ty2);
            // ctx.lineTo(cx+tx2/2,cy+ty2/2);
            // ctx.fillStyle = col;
            // ctx.fill();
            // ctx.beginPath();
            // ctx.arc(cx,cy,rad,ang-angAmt/2,ang+angAmt/2);
            // ctx.fill();
            // ctx.closePath();
            
            let orbX = cx+tx;
            let orbY = cy+ty;
            
            let dx = mx-orbX;
            let dy = my-orbY;
            let dist = Math.sqrt(dx**2+dy**2);
            let hover = false;
            if(t.isOpen) if(dist <= subRad) hover = true;

            ctx.beginPath();
            if(hover) ctx.filter = "contrast(0.8)";
            ctx.fillStyle = col;
            ctx.arc(orbX,orbY,subRad,0,Math.PI*2);
            ctx.fill();
            ctx.strokeStyle = (hover ? "whitesmoke" : "white");
            ctx.stroke();
            ctx.filter = "none";
        }
        ctx.lineWidth = 1;
    }
}
let spellMenu = new SpellMenu();

//Spells

class Spell{
    constructor(name,type){
        let t = this;
        t.name = name;
        t.type = type;
    }
    name = "";
    type = 0;
}
class FireSpell extends Spell{
    constructor(){
        super("Fire",0);
    }
}
let spells = {
    fire:new FireSpell()
};