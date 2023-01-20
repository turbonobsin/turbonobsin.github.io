var Obj = /** @class */ (function () {
    function Obj(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    return Obj;
}());
var can = document.querySelector("#can");
can.width *= 2;
can.height = can.width / 2;
var ctx = can.getContext("2d");
var nob = new NobsinCtx(ctx);
var demo = document.getElementById("demo");
var black = [0, 0, 0, 255];
var objs = [];
for (var i = 0; i < 100000; i++) {
    objs.push(new Obj(Math.random() * can.width, Math.random() * can.height, Math.random() - 0.5, Math.random() - 0.5));
}
var frameTime = 0;
var fps = 0;
var drag = 0.98;
var strength = 4;
var keys = new Map();
function update() {
    requestAnimationFrame(update);
    var frameStart = performance.now();
    nob.updateStart();
    if (keys.get("w"))
        strength = -4;
    else
        strength = 4;
    for (var i = 0; i < objs.length; i++) {
        var o = objs[i];
        if (false) {
            if (o.vy < 0)
                o.vy = -o.vy;
            else if (o.vy >= nob.height)
                o.vy = -o.vy;
        }
        if (o.y < 0)
            o.vy = -o.vy;
        else if (o.y >= nob.height)
            o.vy = -o.vy;
        var dx = o.x - nob.centerX;
        var dy = o.y - nob.centerY;
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        o.vx -= dx / dist / strength;
        o.vy -= dy / dist / strength;
        //spin
        var speed = 0.05;
        var ang = Math.atan2(dy, dx);
        ang += Math.PI / 2;
        var tx = Math.cos(ang) * speed;
        var ty = Math.sin(ang) * speed;
        o.vx += tx;
        o.vy += ty;
        o.vx *= drag;
        o.vy *= drag;
        o.x += o.vx;
        o.y += o.vy;
        nob.setPixel(o.x, o.y, black);
    }
    nob.updateEnd();
    frameTime = performance.now() - frameStart;
    fps = 16.666666 / frameTime * 60;
}
update();
document.addEventListener("keydown", function (e) {
    var key = e.key.toLowerCase();
    keys.set(key, true);
});
document.addEventListener("keyup", function (e) {
    var key = e.key.toLowerCase();
    keys.set(key, false);
});
setInterval(function () {
    demo.textContent = "FPS: " + Math.floor(fps);
}, 500);
