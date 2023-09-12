var can = document.getElementById("can");
can.width = 800;
can.height = 400;
var ctx = can.getContext("2d");
var nob = new NobsinCtx(ctx);
var useCanvas = true;
var simpleObjs = [];
var Setting = /** @class */ (function () {
    function Setting() {
    }
    return Setting;
}());
var settings = [];
// Colors
var black = [0, 0, 0, 255];
// Global settings
var defaultMaxVel = 10;
var bounceOnEdges = true;
var useConstelation = true;
var spin = 0.1;
var maxVel = 1;
var globalSpeed = 1;
var gameSpeed = 1;
var useSpin = true;
var usePull = false;
var pullStrength = 0.25;
var pullDir = 1;
var greaterSpinStrength = 0;
//Modes
var mode = 1;
function loadMode(m) {
    if (m === void 0) { m = 0; }
    if (m == 0) {
        bounceOnEdges = true;
        useConstelation = true;
        spin = 0.1;
        maxVel = 1;
        globalSpeed = 1;
        gameSpeed = 1;
        useSpin = true;
        usePull = false;
        pullStrength = 0.25;
        pullDir = 1;
        defaultMaxVel = 1;
    }
    else if (m == 1) {
        bounceOnEdges = true;
        useConstelation = true;
        spin = 0.1;
        maxVel = 1;
        globalSpeed = 1;
        gameSpeed = 1;
        useSpin = false;
        usePull = true;
        pullStrength = 0.25;
        pullDir = 1;
        defaultMaxVel = 10;
    }
}
loadMode(mode);
var kb = {};
// Global draw funcs
function drawLine(x1, y1, x2, y2) {
    if (useCanvas) {
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.moveTo(Math.floor(x1), Math.floor(y1));
        ctx.lineTo(Math.floor(x2), Math.floor(y2));
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    else {
        nob.drawLine_set(x1, y1, x2, y2, black);
    }
}
function resize(w, h) {
    nob.resize(w, h);
    can.width = w;
    can.height = h;
}
function genSimpleObjs(n) {
    if (n === void 0) { n = 100; }
    for (var i = 0; i < n; i++) {
        simpleObjs.push([
            Math.random() * can.width,
            Math.random() * can.height,
            Math.random() - 0.5,
            Math.random() - 0.5
        ]);
    }
}
function drawConstelation() {
    for (var i = 0; i < simpleObjs.length; i++) {
        var o1 = simpleObjs[i];
        for (var j = i + 1; j < simpleObjs.length; j++) {
            var o2 = simpleObjs[j];
            var dx = o2[0] - o1[0];
            var dy = o2[1] - o1[1];
            var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            var thres = 20;
            if (dist < thres) {
                drawLine(o1[0], o1[1], o2[0], o2[1]);
            }
        }
    }
}
function update() {
    requestAnimationFrame(update);
    for (var i = 0; i < gameSpeed; i++) {
        if (useCanvas)
            ctx.clearRect(0, 0, can.width, can.height);
        else {
            nob.updateStart();
        }
        var cx = can.width / 2;
        var cy = can.height / 2;
        if (kb.shift)
            gameSpeed = 20;
        else
            gameSpeed = 1;
        if (kb.q)
            maxVel = 5;
        else
            maxVel = defaultMaxVel;
        if (kb.s)
            useSpin = false;
        else
            useSpin = true;
        if (kb.w)
            pullDir = -1;
        else
            pullDir = 1;
        if (kb.a)
            greaterSpinStrength = 0.05;
        else
            greaterSpinStrength = 0;
        for (var i_1 = 0; i_1 < simpleObjs.length; i_1++) {
            var o = simpleObjs[i_1];
            var cDx = o[0] - cx;
            var cDy = o[1] - cy;
            var cAng = Math.atan2(cDy, cDx);
            var cDist = Math.sqrt(Math.pow(cDx, 2) + Math.pow(cDy, 2));
            if (useSpin)
                if (spin) {
                    var ang = cDist + Math.PI / 2;
                    o[2] += Math.cos(ang) * 0.1;
                    o[3] += Math.sin(ang) * 0.1;
                }
            if (usePull) {
                o[2] -= cDx / cDist * pullStrength * pullDir;
                o[3] -= cDy / cDist * pullStrength * pullDir;
            }
            if (greaterSpinStrength) {
                var ang = cAng + Math.PI / 2;
                o[2] += Math.cos(ang) * greaterSpinStrength;
                o[3] += Math.sin(ang) * greaterSpinStrength;
            }
            if (bounceOnEdges) {
                function hit() {
                }
                if (o[0] < 0) {
                    o[0] = 0;
                    o[2] = Math.abs(o[2]);
                    hit();
                }
                else if (o[0] >= can.width) {
                    o[0] = can.width - 1;
                    o[2] = -Math.abs(o[2]);
                    hit();
                }
                if (o[1] < 0) {
                    o[1] = 0;
                    o[3] = Math.abs(o[3]);
                    hit();
                }
                else if (o[1] >= can.height) {
                    o[1] = can.height - 1;
                    o[3] = -Math.abs(o[3]);
                    hit();
                }
            }
            if (o[2] > maxVel)
                o[2] = maxVel;
            else if (o[2] < -maxVel)
                o[2] = -maxVel;
            if (o[3] > maxVel)
                o[3] = maxVel;
            else if (o[3] < -maxVel)
                o[3] = -maxVel;
            o[0] += o[2] * globalSpeed;
            o[1] += o[3] * globalSpeed;
            if (useCanvas) {
                ctx.fillRect(Math.floor(o[0]), Math.floor(o[1]), 1, 1);
            }
            else {
                nob.setPixel(o[0], o[1], black);
            }
        }
        if (useConstelation)
            drawConstelation();
        if (!useCanvas)
            nob.updateEnd();
    }
}
update();
genSimpleObjs(1000);
function startAutoMode() {
    function run() {
        if (Math.random() < 0.3)
            kb.q = !kb.q;
        // if(Math.random() < 0.3) kb.a = !kb.a;
        if (Math.random() < 0.3)
            kb.s = !kb.s;
        function setW() {
            // if(Math.random() < 0.7) kb.a = kb.w;
            // else kb.a = false;
            if (Math.random() < 0.85)
                kb.a = kb.w;
            else
                kb.a = !kb.a;
        }
        if (kb.w) {
            if (Math.random() < 0.8) {
                kb.w = !kb.w;
                setW();
            }
        }
        else {
            if (Math.random() < 0.05) {
                kb.w = !kb.w;
                setW();
            }
        }
        var delay = 50 + Math.random() * 300;
        setTimeout(run, delay);
    }
    run();
}
// Keys
document.addEventListener("keydown", function (e) {
    var key = e.key.toLowerCase();
    kb[key] = true;
    if (key == " ")
        location.reload();
});
document.addEventListener("keyup", function (e) {
    var key = e.key.toLowerCase();
    kb[key] = false;
});
startAutoMode();
// Run FPS
if (false)
    setTimeout(function () {
        greaterSpinStrength = 0.05;
        kb.q = true;
    }, 1000);
//# sourceMappingURL=main.js.map