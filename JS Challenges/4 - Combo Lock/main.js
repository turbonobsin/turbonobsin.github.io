var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var d_locks = document.getElementById("d_locks");
var ComboLock = /** @class */ (function () {
    function ComboLock(code) {
        this.sliders = [];
        this.vy = 0;
        this.isOpen = false;
        this.TO = null;
        this.code = code;
        var d = document.createElement("div");
        d.className = "lock";
        d_locks.appendChild(d);
        var _loop_1 = function (num) {
            var slider = document.createElement("div");
            slider.vy = 0;
            slider.scrollAmt = 0;
            slider.className = "slider";
            for (var i = -1; i < 10; i++) {
                var numDiv = document.createElement("div");
                numDiv.textContent = i.toString();
                slider.appendChild(numDiv);
            }
            d.appendChild(slider);
            this_1.sliders.push(slider);
            slider.onwheel = function (e) {
                slider.vy += e.deltaY / 10;
            };
        };
        var this_1 = this;
        for (var _i = 0, code_1 = code; _i < code_1.length; _i++) {
            var num = code_1[_i];
            _loop_1(num);
        }
        var secretDiv = document.createElement("div");
        secretDiv.textContent = "Secret Text";
        secretDiv.className = "secret";
        d.appendChild(secretDiv);
        this.secretEle = secretDiv;
        var top = document.createElement("canvas");
        top.width = 200;
        top.height = 200;
        var ctx = top.getContext("2d");
        var rad = top.width / 4;
        var halfW = top.width / 2;
        var halfH = top.height / 2;
        ctx.fillStyle = "darkslategray";
        ctx.fillRect(top.width - rad, top.height - halfH, rad, halfH);
        ctx.beginPath();
        ctx.arc(halfW, halfH, halfW, 0, Math.PI, true);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(halfW, halfH, halfW / 2, 0, Math.PI, true);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill();
        d.appendChild(top);
        this.topEle = top;
        ctx.globalCompositeOperation = "source-over";
    }
    ComboLock.prototype.update = function () {
        var ready = [false, false, false];
        var h = 40;
        for (var i = 0; i < this.sliders.length; i++) {
            var s = this.sliders[i];
            var drag = 0.95;
            var maxVel = 10;
            if (s.vy > maxVel)
                s.vy = maxVel;
            else if (s.vy < -maxVel)
                s.vy = -maxVel;
            s.vy *= drag;
            s.scrollAmt += s.vy;
            if (s.scrollAmt < h) {
                s.scrollAmt = h;
                s.vy = 0;
            }
            else if (s.scrollAmt >= s.scrollHeight - h - 54) {
                s.scrollAmt = s.scrollHeight - h - 54;
                s.vy = 0;
            }
            s.scrollTop = s.scrollAmt;
            var line = Math.round(s.scrollTop / h) * h;
            var dif = (s.scrollAmt - line);
            if (Math.abs(dif) <= h / 2) { //4
                s.vy -= dif / 20; //8
                s.vy *= 0.8;
            }
            if (Math.abs(dif) < 1) {
                ready[i] = true;
            }
        }
        if (!ready.includes(false)) {
            var check = true;
            for (var i = 0; i < this.sliders.length; i++) {
                var s = this.sliders[i];
                var ind = Math.round(s.scrollAmt / h) - 1;
                if (ind != this.code[i]) {
                    check = false;
                    break;
                }
            }
            if (check)
                this.open();
        }
        else {
            this.isOpen = false;
            this.topEle.style.translate = "0px -50%";
            this.secretEle.classList.remove("blur");
        }
    };
    ComboLock.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isOpen = true;
                        this.topEle.style.translate = "0px -85%";
                        return [4 /*yield*/, wait(800)];
                    case 1:
                        _a.sent();
                        if (!this.isOpen)
                            return [2 /*return*/];
                        this.secretEle.classList.add("blur");
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComboLock;
}());
function wait(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, delay);
    });
}
var lock = new ComboLock([1, 2, 3]);
function update() {
    requestAnimationFrame(update);
    lock.update();
}
update();
