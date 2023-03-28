var can = document.getElementById("can");
var scale = 4;
can.width *= scale;
can.height *= scale;
var ctx = can.getContext("2d");
var gravity = 0.2;
var drag = 0.99;
var bounce = 0.5;
var Obj = /** @class */ (function () {
    function Obj(x, y, r, col, vx, vy) {
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.r = 0;
        var t = this;
        t.x = x;
        t.y = y;
        t.r = r;
        t.col = col;
        t.vx = vx;
        t.vy = vy;
        // t.vx = (Math.random()-0.5)*4;
    }
    return Obj;
}());
var objs = [];
var constant = false;
function makeNewBall(x, y, vx, vy, r) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (vx === void 0) { vx = 0; }
    if (vy === void 0) { vy = 0; }
    if (r === void 0) { r = 20; }
    // r = 5+Math.floor(Math.random()*40);
    // r = 2+Math.floor(Math.random()*10);
    r = 18;
    objs.push(new Obj(x, y, r, "red", vx, vy));
}
for (var i = 0; i < 30; i++) {
    makeNewBall(Math.random() * can.width, Math.random() * can.height);
}
function makeLot(num) {
    for (var i = 0; i < num; i++)
        makeNewBall(Math.random() * can.width, 0);
}
var gameFrames = 0;
function update() {
    requestAnimationFrame(update);
    gameFrames++;
    ctx.clearRect(0, 0, can.width, can.height);
    var _loop_1 = function (i) {
        var o = objs[i];
        o.vy += gravity;
        o.vx *= drag;
        o.vy *= drag;
        o.x += o.vx;
        o.y += o.vy;
        function moveOut(o1) {
            for (var j = 0; j < objs.length; j++) {
                var o2 = objs[j];
                if (o2 == o1)
                    continue;
                var dx = o2.x - o.x;
                var dy = o2.y - o.y;
                var radDist = o2.r + o.r;
                var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (dist < radDist) {
                    o2.x = o.x + dx / dist * radDist;
                    o2.y = o.y + dy / dist * radDist;
                }
            }
        }
        for (var j = 0; j < objs.length; j++) {
            var o2 = objs[j];
            if (o2 == o)
                continue;
            var dx = o2.x - o.x;
            var dy = o2.y - o.y;
            var radDist = o2.r + o.r;
            var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            var ang = Math.atan2(dy, dx);
            if (dist < radDist) {
                ang -= Math.PI;
                var drag2 = 0.8 * bounce;
                var speed = Math.sqrt(Math.pow(o.vx, 2) + Math.pow(o.vy, 2)) * -1 * drag2;
                var amtX = Math.cos(ang) * speed;
                var amtY = Math.sin(ang) * speed;
                var force = 0.8 * (o.r / 20) * 0.8; //0.2 //0.8
                o2.vx += dx / dist * force;
                o2.vy += dy / dist * force;
                o.vx = -amtX;
                o.vy = -amtY;
                // o.vx += dx/dist*force;
                // o.vy += dy/dist*force;
                o.x = o2.x + Math.cos(ang) * radDist;
                o.y = o2.y + Math.sin(ang) * radDist;
                moveOut(o);
            }
        }
        if (o.y + o.r >= can.height) {
            o.vy = -Math.abs(o.vy * 0.8 * bounce);
            o.y = can.height - o.r;
        }
        else if (o.y - o.r < 0) {
            o.vy = Math.abs(o.vy * 0.8 * bounce);
            o.y = o.r;
        }
        if (o.x + o.r >= can.width) {
            o.vx = -Math.abs(o.vx * 0.8 * bounce);
            o.x = can.width - o.r;
        }
        else if (o.x - o.r < 0) {
            o.vx = Math.abs(o.vx * 0.8 * bounce);
            o.x = o.r;
        }
        //draw
        ctx.fillStyle = o.col;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
    };
    for (var i = 0; i < objs.length; i++) {
        _loop_1(i);
    }
    if (constant)
        if (gameFrames % 30 == 0)
            makeNewBall(can.width * 0.75, can.height * 0.25, -2, 0);
}
update();
