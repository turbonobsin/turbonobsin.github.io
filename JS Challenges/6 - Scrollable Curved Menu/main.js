var menu = document.getElementById("menu");
var cont = menu.querySelector(".cont");
var overlay = menu.querySelector(".overlay");
var Slot = /** @class */ (function () {
    function Slot(txt) {
        this.y = 0;
        this.x = 0;
        this.yy = 0;
        this.txt = "-.-";
        this.txt = txt;
    }
    Slot.prototype.update = function () {
        var d = this.ref;
        var height = h * (list.length) - 8;
        this.yy = (height / 2 + (this.y + y) % height);
        d.style.top = this.yy + "px";
        var yoff = ((this.yy + height) - height) / height;
        var scale = yoff;
        scale = Math.abs(scale);
        scale = 1 - scale;
        d.style.scale = scale + "";
        var w = Math.pow((Math.pow((scale * 4), 2)), 2) + 100;
        d.style.width = "".concat(w, "px");
        var ang = yoff * Math.PI / 1.5 * 1.4 - Math.PI / 2;
        this.x = Math.sin(ang) * 100 - w + 100;
        d.style.left = this.x + "px";
    };
    return Slot;
}());
var list = [];
for (var i = 0; i < 7; i++) {
    list.push(new Slot("".concat(i + 1, "th Item")));
}
var h = 100;
var y = -h * list.length;
var vy = 0;
var drag = 0.98; //0.93
function load() {
    for (var i = 0; i < list.length; i++) {
        var d = document.createElement("div");
        var data = list[i];
        data.y = i * h;
        d.innerHTML = "<div>".concat(data.txt, "</div>");
        cont.appendChild(d);
        data.ref = d;
        data.update();
    }
    overlay.style.height = (h * list.length + h) + "px";
}
load();
overlay.onwheel = function (e) {
    var speedScale = 3;
    vy -= e.deltaY / 150 * speedScale;
};
function update() {
    requestAnimationFrame(update);
    y += vy;
    if (y > -h * list.length)
        y -= h * list.length;
    else if (y < -h * list.length * 2)
        y += h * list.length;
    for (var i = 0; i < list.length; i++) {
        var data = list[i];
        data.update();
    }
    vy *= drag;
    //
    var tarr = (Math.abs(y) % (h * list.length)) / h * list.length;
    var tar = Math.round(tarr / h * 2 * list.length) * h / 2 / list.length;
    var tol = 0;
    if (tar > tarr + tol) {
        vy += 0.3;
        vy *= 0.94;
    }
    else if (tar < tarr - tol) {
        vy -= 0.3;
        vy *= 0.94;
    }
}
update();
