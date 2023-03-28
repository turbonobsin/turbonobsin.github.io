var cont = document.getElementById("cont");
var Clock = /** @class */ (function () {
    function Clock(ele) {
        var _this = this;
        this.ele = ele;
        var can = ele.querySelector("canvas");
        can.width = 500;
        can.height = 500;
        this.ctx = can.getContext("2d");
        this.ctx.font = "30px Arial";
        var f = function () {
            var date = new Date;
            _this.draw(date.getHours(), date.getMinutes(), date.getSeconds());
        };
        setInterval(function () {
            f();
        }, 1000);
        f();
    }
    Clock.prototype.draw = function (hours, minutes, seconds) {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var offsetAng = -Math.PI / 2 + Math.PI;
        var hoursAng = hours / 12 * Math.PI * 2 - offsetAng;
        var minutesAng = minutes / 60 * Math.PI * 2 - offsetAng;
        var secondsAng = seconds / 60 * Math.PI * 2 - offsetAng;
        hoursAng += (minutes / 60 * 2 * Math.PI / 12);
        minutesAng += (seconds / 60 * 2 * Math.PI / 60);
        var hoursRad = 0.5;
        var minutesRad = 0.7;
        var secondsRad = 0.8;
        var rad = ctx.canvas.width / 2;
        var cx = ctx.canvas.width / 2;
        var cy = ctx.canvas.height / 2;
        //inner circle
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.lineWidth = 1;
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        //draw numbers
        var ang = -Math.PI / 2;
        for (var i = 0; i < 12; i++) {
            var text = (i || 12).toString();
            var width = ctx.measureText(text).width;
            var tx = cx + Math.cos(ang) * rad * 0.85 - width / 2;
            var ty = cy + Math.sin(ang) * rad * 0.85 + 15;
            ctx.fillStyle = "black";
            ctx.fillText(text, tx, ty);
            ang += Math.PI * 2 / 12;
        }
        ang = 0;
        for (var i = 0; i < 60; i++) {
            var tx = Math.cos(ang);
            var ty = Math.sin(ang);
            ctx.beginPath();
            var innerRadScale = 0.95;
            if (i % 5 == 0)
                innerRadScale = 0.92;
            ctx.moveTo(cx + tx * rad * innerRadScale, cy + ty * rad * innerRadScale);
            ctx.lineTo(cx + tx * rad * 1, cy + ty * rad * 1);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gray";
            ctx.stroke();
            ang += Math.PI * 2 / 60;
        }
        ctx.strokeStyle = "black";
        //hours
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineWidth = 8;
        ctx.lineTo(cx + Math.cos(hoursAng) * rad * hoursRad, cy + Math.sin(hoursAng) * rad * hoursRad);
        ctx.stroke();
        //minutes
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineWidth = 4;
        ctx.lineTo(cx + Math.cos(minutesAng) * rad * minutesRad, cy + Math.sin(minutesAng) * rad * minutesRad);
        ctx.stroke();
        //seconds
        ctx.beginPath();
        ctx.moveTo(cx - Math.cos(secondsAng) * 25, cy - Math.sin(secondsAng) * 25);
        ctx.lineWidth = 2;
        ctx.lineTo(cx + Math.cos(secondsAng) * rad * secondsRad, cy + Math.sin(secondsAng) * rad * secondsRad);
        ctx.stroke();
    };
    return Clock;
}());
var clock = new Clock(document.getElementById("clock"));
