let scale = 2;
const can = document.getElementById("can");
can.width *= scale;
can.height *= scale;
const ctx = can.getContext("2d");
const nob = new NobsinCtx(ctx);
class Obj {
    constructor(x, y, vx, vy, dir) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.dir = dir;
    }
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    dir = 0;
}
const black = [0, 0, 0, 255];
let objs = [];
for (let i = 0; i < 10000; i++) {
    objs.push(new Obj(Math.random() * nob.width, Math.random() * nob.height, Math.random() - 0.5, Math.random() - 0.5, Math.random() * 6.28));
}
let cx = nob.centerX;
let cy = nob.centerY;
let maxVel = 4;
let drag = 1;
let dir = 1;
let rotation = 0;
let keys = {};
document.addEventListener("keydown", e => {
    let key = e.key.toLowerCase();
    keys[key] = true;
    if (key == "r") {
        for (let i = 0; i < objs.length; i++) {
            let o = objs[i];
            o.vx += (Math.random() - 0.5) * 20;
            o.vy += (Math.random() - 0.5) * 20;
        }
    }
});
document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});
function update() {
    requestAnimationFrame(update);
    nob.updateStart();
    if (keys.q)
        drag = 0.96;
    else
        drag = 1;
    if (keys.w)
        dir = -1;
    else
        dir = 1;
    if (keys.d)
        rotation = 1;
    else
        rotation = 0;
    if (keys.r)
        maxVel = 9999;
    else {
        if (keys.a)
            maxVel = 1;
        else
            maxVel = 4;
    }
    for (let i = 0; i < objs.length; i++) {
        let o = objs[i];
        let dx = o.x - cx;
        let dy = o.y - cy;
        let dist = Math.sqrt(dx ** 2 + dy ** 2);
        // o.dir += 0.01;
        o.dir += Math.sin(performance.now() / 300) / 10;
        let speed = 1;
        // o.vx = Math.cos(o.dir)*speed;
        // o.vy = Math.sin(o.dir)*speed;
        o.vx += Math.cos(o.dir) * speed / 10;
        o.vy += Math.sin(o.dir) * speed / 10; //30
        o.vx -= dx / dist / 8 * dir; //12
        o.vy -= dy / dist / 8 * dir;
        if (o.vx > maxVel)
            o.vx = maxVel;
        else if (o.vx < -maxVel)
            o.vx = -maxVel;
        if (o.vy > maxVel)
            o.vy = maxVel;
        else if (o.vy < -maxVel)
            o.vy = -maxVel;
        let ang = Math.atan2(dy, dx) + Math.PI / 2;
        o.vx += Math.cos(ang) / 4 * rotation;
        o.vy += Math.sin(ang) / 4 * rotation;
        o.vx *= drag;
        o.vy *= drag;
        o.x += o.vx;
        o.y += o.vy;
        nob.setPixel(o.x, o.y, black);
    }
    // connect();
    // pushAway();
    nob.updateEnd();
}
function connect() {
    for (let i = 0; i < objs.length; i++) {
        let o1 = objs[i];
        for (let j = i + 1; j < objs.length; j++) {
            let o2 = objs[j];
            let dx = o2.x - o1.x;
            let dy = o2.y - o1.y;
            let dist = Math.sqrt(dx ** 2 + dy ** 2);
            if (dist < 5 * scale) {
                nob.drawLine_smart(o1.x, o1.y, o2.x, o2.y, black, 1);
            }
        }
    }
}
function pushAway() {
    for (let i = 0; i < objs.length; i++) {
        let o1 = objs[i];
        for (let j = i + 1; j < objs.length; j++) {
            let o2 = objs[j];
            let dx = o2.x - o1.x;
            let dy = o2.y - o1.y;
            let dist = Math.sqrt(dx ** 2 + dy ** 2);
            if (dist <= 1)
                dist = 1;
            if (dist < 5) {
                o2.vx -= dx / dist / 12;
                o2.vy -= dy / dist / 12;
            }
        }
    }
}
update();
//# sourceMappingURL=main.js.map