/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
let scale = 3; //3
can.width *= scale;
can.height *= scale;
const ctx = can.getContext("2d");

function drawOutlineRect(){

}

class Obj{
    constructor(x,y,w,h){
        let t = this;
        t.x = x;
        t.y = y;
        t.w = w*scale;
        t.h = h*scale;
    }
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    draw(){
        let t = this;
        ctx.fillStyle = "gray";
        ctx.fillRect(Math.floor(t.x),Math.floor(t.y),t.w,t.h);
    }
}
class Player extends Obj{
    constructor(x,y,col){
        super(x,y,8,15);
        let t = this;
        t.col = col;
    }
    lx = 0;
    ly = 0;
    col = "red";
    vx = 0;
    vy = 0;
    ay = 0;
    grounded = false;
    wasGrounded = false;
    grapple = null; //x,y,dist,dx,dy
    /**@type {Spell} */
    spell = null;
    endGrapple(){
        let t = this;
        t.grapple = null;
        let dx = t.x-t.lx;
        let dy = t.y-t.ly;
        t.vx = dx*0.5;
        t.vy = dy*0.5;
    }
    draw(){
        let t = this;
        ctx.fillStyle = t.col;
        ctx.fillRect(Math.floor(t.x),Math.floor(t.y),t.w,t.h);

        if(t.grapple){
            ctx.beginPath();
            ctx.strokeStyle = "gray";
            ctx.moveTo(t.x+t.w/2,t.y);
            let g = t.grapple;
            ctx.lineTo(g.x,g.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(g.x,g.y,5,0,Math.PI*2);
            ctx.stroke();

            t.x = g.x+Math.cos(g.ang)*g.dist-t.w/2;
            t.y = g.y+Math.sin(g.ang)*g.dist;
            if(t.vx){
                g.va -= t.vx/80; // /30 /100
            }
            t.vx = 0;
            t.vy = 0;
            // g.va *= 0.95;
            g.va *= 0.98;
            g.ang += g.va;
            if(g.ang < 0) g.ang += Math.PI*2;
            if(g.ang >= Math.PI*2) g.ang -= Math.PI*2;
            let tol = 0.01;
            if((g.ang < Math.PI/2-tol && g.ang >= 0) || (g.ang >= 3*Math.PI/2 && g.ang <= Math.PI*2)){
                g.va += 0.005;
            }
            else if(g.ang > Math.PI/2+tol && g.ang < 3*Math.PI/2){
                g.va -= 0.005;
            }
        }
        if(t.spell){
            let s = t.spell;
            let col = spellMenu.typeCols[s.type];
        }
    }
}

/**@type {Obj[]} */
let objs = [];
/**@type {Player[]} */
let ens = [];
/**@type {Particle[]} */
let particles = [];

objs.push(new Obj(0,Math.floor(can.height*0.9),can.width,Math.floor(can.height*0.2)));
objs.push(new Obj(40,Math.floor(can.height*0.8),can.width-80,Math.floor(can.height*0.2)));

let cx = can.width/2;
let cy = can.height/2;

//platforms
objs.push(new Obj(cx+50*scale,cy+15*scale,20,3));
objs.push(new Obj(cx+10*scale,cy+30*scale,20,3));
objs.push(new Obj(cx+80*scale,cy,20*scale,3));
objs.push(new Obj(cx+30*scale,cy-20*scale,20,3));

//players
let me = new Player(can.width/2,can.height/2,"red");
ens.push(me);

let gravity = 0.2;
let drag = 0.8;

let speed = 0.5;
let maxVel = 4;
let velTolerance = 0.05;

let holdJump = -1;
let canJump = true;

let frames = 0;
function update(){
    requestAnimationFrame(update);
    frames++;
    ctx.clearRect(0,0,can.width,can.height);

    for(let i = 0; i < objs.length; i++){
        let o = objs[i];
        o.draw();
    }
    for(let i = 0; i < ens.length; i++){
        let o = ens[i];
        o.grounded = false;
        o.vy += o.ay;
        let drag2 = 0.3;
        if(o.ay >= drag2) o.ay -= drag2;
        else if(o.ay <= -drag2) o.ay += drag2;
        else o.ay = 0;
        o.vy += gravity;
        function check(vx,vy){
            let lx = o.x;
            let ly = o.y;
            o.x += vx;
            o.y += vy;
            for(let j = 0; j < objs.length; j++){
                let o2 = objs[j];
                let tol = speed/2;
                let left = (o.x+o.w - o2.x);
                let right = (o.x - (o2.x+o2.w));
                let top = (o.y+o.h - o2.y);
                let bottom = (o.y - (o2.y+o2.h));
                if(left < tol) continue;
                if(top < tol) continue;
                if(right > tol) continue;
                if(bottom > tol) continue;

                let atop = Math.abs(top);
                let abottom = Math.abs(bottom);
                let aleft = Math.abs(left);
                let aright = Math.abs(right);
                let min = Math.min(atop,abottom,aleft,aright);
                if(min == atop){
                    if(!o.wasGrounded) landingAnim(o.x+o.w/2,o.y+o.h,Math.abs(o.vy));
                    o.y = o2.y-o.h;
                    o.vy = 0;
                    o.grounded = true;
                    o.wasGrounded = true;
                    holdJump = -1;
                    o.vx *= 0.9;
                    if(o.grapple) o.endGrapple();
                }
                else if(min == abottom){
                    if(vy < 0){
                        o.y = o2.y+o2.h;
                        o.vy = 0;
                    }
                }
                else if(min == aleft){
                    o.x = o2.x-o.w;
                    if(o.vx > 0) o.vx = 0;
                }
                else if(min == aright){
                    if(!(vx > 0)){
                        o.x = o2.x+o2.w;
                        if(o.vx < 0) o.vx = 0;
                    }
                }
            }
            o.lx = lx;
            o.ly = ly;
        }
        check(o.vx*scale,0);
        check(0,o.vy*scale);
        o.draw();
    }
    for(let i = 0; i < particles.length; i++){
        let p = particles[i];
        p.lifetime--;
        if(p.lifetime <= 0) p.isDead = true;
        if(p.isDead){
            particles.splice(i,1);
            i--;
            continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        if(p.onupdate) p.onupdate();
    }

    //player keybinds
    if(keys.a){
        me.vx -= (me.grounded ? speed : speed*0.3);
    }
    else if(keys.d){
        me.vx += (me.grounded ? speed : speed*0.3);
    }
    if(canJump)if(keys[" "]){
        if(me.grounded || me.grapple){
            if(me.grapple) me.endGrapple();
            me.vy -= 1.8;
            me.grounded = false;
            me.wasGrounded = false;
            holdJump = 0;
            canJump = false;
            jumpAnim(me.x+me.w/2,me.y+me.h);
        }
    }
    if(holdJump != -1) if(keys[" "] && !me.grounded){
        holdJump++;
        if(holdJump < 10){ //15
            me.vy -= 0.18; //0.15
        }
    }
    if(me.vx > maxVel) me.vx = maxVel;
    else if(me.vx < -maxVel) me.vx = -maxVel;
    if(me.vy > maxVel) me.vy = maxVel;
    else if(me.vy < -maxVel) me.vy = -maxVel;
    if(me.grounded) me.vx *= drag;
    else me.vx *= 0.90;
    if(me.vx <= velTolerance && me.vx >= -velTolerance) me.vx = 0;
    if(me.vy <= velTolerance && me.vy >= -velTolerance) me.vy = 0;

    //menus
    spellMenu.draw();
}

/**@type {{[k:string]:string}} */
let keys = {};
document.addEventListener("keydown",e=>{
    let key = e.key.toLowerCase();
    keys[key] = true;
});
document.addEventListener("keyup",e=>{
    let key = e.key.toLowerCase();
    keys[key] = false;
    if(key == " "){
        holdJump = -1;
        canJump = true;
    }
    if(key == "e"){
        createParticleBatch(me.x,me.y);
    }
});

document.addEventListener("contextmenu",e=>{
    e.preventDefault();
});
function screenToCanCoords(x,y){
    let rect = can.getBoundingClientRect();
    return [(x-rect.x)/rect.width*can.width,(y-rect.y)/rect.height*can.height];
}
let mx = 0;
let my = 0;
document.addEventListener("mousemove",e=>{
    let rect = can.getBoundingClientRect();
    mx = (e.clientX-rect.x)/rect.width*can.width;
    my = (e.clientY-rect.y)/rect.height*can.height;
});
document.addEventListener("mousedown",e=>{
    if(e.button == 0){
        if(e.shiftKey){
            if(!spellMenu.isOpen) spellMenu.open();
            else spellMenu.close();
        }
    }
    else if(e.button == 2){
        //create grapple
        if(me.grapple){
            me.endGrapple();
            return;
        }
        let [x,y] = screenToCanCoords(e.clientX,e.clientY);
        let dx = (me.x+me.w/2)-x;
        let dy = (me.y)-y;
        let dist = Math.sqrt(dx**2+dy**2);
        if(dist < 40) return;
        let ang = Math.atan2(dy,dx);
        me.grapple = {x,y,dist,ang,va:0};
    }
});