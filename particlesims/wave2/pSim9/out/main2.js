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
var ctx = can.getContext("2d");
var nob = new NobsinCtx(ctx);
var black = [0, 0, 0, 255];
var objs = [];
for (var i = 0; i < 1000; i++) {
    objs.push(new Obj(Math.random() * can.width, Math.random() * can.height, Math.random() - 0.5, Math.random() - 0.5));
}
function update() {
    requestAnimationFrame(update);
    nob.updateStart();
    for (var i = 0; i < objs.length; i++) {
        var o = objs[i];
        o.x += o.vx;
        o.y += o.vy;
        nob.setPixel(o.x, o.y, black);
    }
    nob.updateEnd();
}
update();
console.log("hello there all!!!! asdjaklsd");
