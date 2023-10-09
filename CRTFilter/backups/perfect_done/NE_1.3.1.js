/*
 * WELCOME TO THE NOBSIN ENGINE
 *	- the insanely fast per-pixel CPU renderer
 *
 * AUTHORS: Turbo Nobsin
 *
 * VERSION: a1.3.1 (changes may not be compatible with a1.2.x projects!)
 * DATE: 8-26-22
 * (Last update was 8-30-21, almost a year)
 *
 * WHATS NEW?
 *  - Added bezier curves from QS Version of NE
 * 	- Added some static colors from Universal NE a1.3.0
 */
var NobsinCtx = /** @class */ (function () {
    function NobsinCtx(ctx) {
        this.blendMode = 0;
        this.pixelCount = 0;
        this.camX = 0;
        this.camY = 0;
        this.camZ = 0;
        this.useCam = false;
        this.useRecord = false;
        this.useIndRestriction = false;
        this.pMap = new Map();
        this.useNewRec = false;
        this.newRecMap = new Map();
        this.outlineColor = [0, 0, 0, 255];
        this.flipX = false;
        this.widthOff = 0;
        this.sqrt2 = Math.sqrt(2);
        this.ctx = ctx;
        ctx.imageSmoothingEnabled = false;
        var can = ctx.canvas;
        this.can = can;
        //can.width = 250;
        this.centerX = Math.floor(can.width / 2);
        this.centerY = Math.floor(can.height / 2);
        this.right = can.width - 1;
        this.bottom = can.height - 1;
        this.ssize = can.width * can.height;
        this.size = this.ssize * 4;
        this.width = can.width;
        this.height = can.height;
        for (var i = 0; i < this.inits.length; i++) {
            this.inits[i](this);
        }
        this.checkColArr = [];
        //this.background = [128,128,128,255];
        this.background = [48, 48, 48, 255];
        //this.data = new ImageData(this.width,this.height);
    }
    NobsinCtx.prototype.initRec = function () {
        this.useNewRec = true;
        this.newRecMap = new Map();
    };
    NobsinCtx.prototype.finishRec = function () {
        this.useNewRec = false;
        this.pixelCount = 0;
        this.dep = new Uint8ClampedArray(this.ssize);
        return this.newRecMap;
    };
    NobsinCtx.prototype.resize = function (w, h) {
        if (this.useRecord) {
            this.recMap = new Uint8ClampedArray(this.ssize);
        }
    };
    NobsinCtx.prototype.updateStart = function () {
        this.pixelCount = 0;
        this.buf = new Uint8ClampedArray(this.size);
    };
    NobsinCtx.prototype.updateEnd = function () {
        this.ctx.putImageData(new ImageData(this.buf, this.width, this.height), 0, 0);
    };
    NobsinCtx.prototype.isFree = function (x, y) {
        if (x < 0)
            return;
        if (y < 0)
            return;
        if (x >= this.width)
            return;
        if (y >= this.height)
            return;
        var ind = (x + y * this.width) * 4;
        if (this.buf[ind + 3] != 0)
            return;
        return true;
    };
    NobsinCtx.prototype.setData = function (ind, col) {
        if (ind == null)
            return;
        ind = Math.floor(ind);
        this.buf[ind] = col[0];
        this.buf[ind + 1] = col[1];
        this.buf[ind + 2] = col[2];
        this.buf[ind + 3] = col[3];
        this.pixelCount++;
        return 1;
    };
    NobsinCtx.prototype.setData2 = function (ind, r, g, b, a) {
        if (ind == null)
            return;
        ind = Math.floor(ind);
        this.buf[ind] = r;
        this.buf[ind + 1] = g;
        this.buf[ind + 2] = b;
        this.buf[ind + 3] = a;
        this.pixelCount++;
        return 1;
    };
    NobsinCtx.prototype.setData_dep = function (ind, col, dep) {
        if (ind == null)
            return;
        ind = Math.floor(ind);
        var i = Math.floor(ind / 4);
        if (this.dep[i] <= dep) {
            this.dep[i] = dep;
            this.buf[ind] = col[0];
            this.buf[ind + 1] = col[1];
            this.buf[ind + 2] = col[2];
            this.buf[ind + 3] = 255;
            this.pixelCount++;
        }
    };
    NobsinCtx.prototype.setPixel = function (x, y, col) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0)
            return;
        if (x > this.right)
            return;
        if (y < 0)
            return;
        if (y > this.bottom)
            return;
        //i Simple
        var iS = x + y * this.width;
        var i = iS * 4;
        if (!col) {
            this.buf[i] = 0;
            this.buf[i + 1] = 0;
            this.buf[i + 2] = 0;
            this.buf[i + 3] = 255;
        }
        else {
            this.buf[i] = col[0];
            this.buf[i + 1] = col[1];
            this.buf[i + 2] = col[2];
            this.buf[i + 3] = col[3];
            //this.setPixelCol(iS);
        }
        this.pixelCount++;
        return 1;
    };
    NobsinCtx.prototype.setPixel_ex = function (ind, col, a) {
        if (a === void 0) { a = 255; }
        ind = Math.floor(ind);
        if (col[3] == 0) {
            this.buf[ind] = 0;
            this.buf[ind + 1] = 0;
            this.buf[ind + 2] = 0;
            this.buf[ind + 3] = 0;
        }
        else if (col[3] == 255) {
            this.buf[ind] = col[0];
            this.buf[ind + 1] = col[1];
            this.buf[ind + 2] = col[2];
            this.buf[ind + 3] = 255;
        }
        else {
            if (this.buf[ind + 3] == 0) {
                this.buf[ind] = this.background[0];
                this.buf[ind + 1] = this.background[1];
                this.buf[ind + 2] = this.background[2];
                this.buf[ind + 3] = this.background[3];
            }
            var o = col[3] / 255;
            this.buf[ind] += (this.buf[ind] + col[0]) * o;
            this.buf[ind + 1] += (this.buf[ind + 1] + col[1]) * o;
            this.buf[ind + 2] += (this.buf[ind + 2] + col[2]) * o;
            if (this.transparentBg)
                this.buf[ind + 3] = col[3];
            else
                this.buf[ind + 3] = a; // = col[3] awesome effect
        }
        this.pixelCount++;
    };
    NobsinCtx.prototype.setPixel_blend = function (x, y, col, a) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (a === void 0) { a = 1; }
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0)
            return;
        if (x > this.right)
            return;
        if (y < 0)
            return;
        if (y > this.bottom)
            return;
        //i Simple
        var iS = x + y * this.width;
        var i = iS * 4;
        if (!col) {
            this.buf[i] = 0;
            this.buf[i + 1] = 0;
            this.buf[i + 2] = 0;
            this.buf[i + 3] = 255;
        }
        else {
            this.buf[i] = Math.floor((this.buf[i] + col[0]) / 2 * a);
            this.buf[i + 1] = Math.floor((this.buf[i + 1] + col[1]) / 2 * a);
            this.buf[i + 2] = Math.floor((this.buf[i + 2] + col[2]) / 2 * a);
            this.buf[i + 3] = Math.floor((this.buf[i + 3] + col[3]) / 2);
        }
        this.pixelCount++;
        return 1;
    };
    NobsinCtx.prototype.setPixel_dep = function (x, y, col, dep) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0)
            return;
        if (x > this.right)
            return;
        if (y < 0)
            return;
        if (y > this.bottom)
            return;
        var iD = x + y * this.width;
        var i = iD * 4;
        if (this.dep[iD] <= dep) {
            this.dep[iD] = dep;
            if (!col) {
                this.buf[i] = 0;
                this.buf[i + 1] = 0;
                this.buf[i + 2] = 0;
                this.buf[i + 3] = 255;
            }
            else {
                this.buf[i] = col[0];
                this.buf[i + 1] = col[1];
                this.buf[i + 2] = col[2];
                this.buf[i + 3] = col[3];
            }
            this.pixelCount++;
        }
        return 1;
    };
    NobsinCtx.prototype.setPixelSize = function (x, y, w, col) {
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        var h = Math.floor(w / 2);
        for (var xx = -h; xx <= h; xx++) {
            for (var yy = -h; yy <= h; yy++) {
                this.setPixel(x + xx, y + yy, col);
            }
        }
        return 1;
    };
    NobsinCtx.prototype.setPixelSize_smart = function (x, y, w, col) {
        if (!col)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        var half = Math.floor(w / 2);
        x -= half;
        y -= half;
        var h = w;
        if (x < 0) {
            w += x;
            if (w <= 0)
                return;
            x = 0;
        }
        var lx = x + w;
        if (lx > this.right) {
            w += this.right - lx;
            if (w <= 0)
                return;
        }
        if (y < 0) {
            h += y;
            if (h <= 0)
                return;
            y = 0;
        }
        var ly = y + h;
        if (ly > this.bottom) {
            h += this.bottom - ly;
            if (h <= 0)
                return;
        }
        var ind = (x + y * this.width) * 4;
        for (var j = 0; j < h; j++) {
            var f1 = ind + j * this.width * 4;
            for (var i = 0; i < w; i++) {
                var f = f1 + i * 4;
                switch (this.blendMode) {
                    case 0:
                        if (col) {
                            this.buf[f] = col[0];
                            this.buf[f + 1] = col[1];
                            this.buf[f + 2] = col[2];
                            this.buf[f + 3] = col[3];
                        }
                        else {
                            this.buf[f] = 0;
                            this.buf[f + 1] = 0;
                            this.buf[f + 2] = 0;
                            this.buf[f + 3] = 255;
                        }
                        this.pixelCount++;
                        break;
                    case 1:
                        if (this.buf[f] == 0 && this.buf[f + 1] == 0 && this.buf[f + 2] == 0 && this.buf[f + 3] == 0) {
                            this.buf[f] = col[0];
                            this.buf[f + 1] = col[1];
                            this.buf[f + 2] = col[2];
                            this.buf[f + 3] = col[3];
                        }
                        this.pixelCount++;
                        break;
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.checkRectCol = function (p, x, y, w, h, call, id) {
        this.checkColArr.push([this.checkRectCol_func, call, id, p, x, y, w, h]);
    };
    NobsinCtx.prototype.checkRectCol_func = function (ref, x, y, w, h) {
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        h = Math.floor(h);
        var half = Math.floor(w / 2);
        var halfh = Math.floor(h / 2);
        x -= half;
        y -= halfh;
        if (x < 0) {
            w += x;
            if (w <= 0)
                return;
            x = 0;
        }
        var lx = x + w;
        if (lx > ref.right) {
            w += ref.right - lx;
            if (w <= 0)
                return;
        }
        if (y < 0) {
            h += y;
            if (h <= 0)
                return;
            y = 0;
        }
        var ly = y + h;
        if (ly > ref.bottom) {
            h += ref.bottom - ly;
            if (h <= 0)
                return;
        }
        var hit = false;
        var ind = (x + y * ref.width) * 4;
        for (var j = 0; j < h; j++) {
            var f1 = ind + j * ref.width * 4;
            for (var i = 0; i < w; i++) {
                var f = f1 + i * 4;
                var res = ref.setPixelCol(Math.floor(f / 4), true);
                if (res)
                    hit = true;
            }
        }
        return (hit ? 2 : 1);
    };
    NobsinCtx.prototype.drawRect_fast = function (x1, y1, r, col) {
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x1 + y1 * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            for (var i = 0; i < d; i++) {
                this.buf[ind] = col[0];
                this.buf[ind + 1] = col[1];
                this.buf[ind + 2] = col[2];
                this.buf[ind + 3] = col[3];
                ind += 4;
            }
            ind += (this.width * 4 - d * 4);
        }
    };
    NobsinCtx.prototype.drawRect_smart = function (x1, y1, r, col) {
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            for (var i = 0; i < d; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    this.buf[ind] = col[0];
                    this.buf[ind + 1] = col[1];
                    this.buf[ind + 2] = col[2];
                    this.buf[ind + 3] = col[3];
                }
                x++;
                ind += 4;
            }
            y++;
            x -= d;
            ind += (this.width * 4 - d * 4);
        }
    };
    NobsinCtx.prototype.drawRect2_smart = function (x1, y1, wr, hr, col) {
        wr = Math.floor(wr);
        hr = Math.floor(hr);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - wr;
        var y = y1 - hr;
        var ind = (x + y * this.width) * 4;
        var wd = wr + wr;
        var hd = hr + hr;
        for (var j = 0; j < hd; j++) {
            for (var i = 0; i < wd; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    this.buf[ind] = col[0];
                    this.buf[ind + 1] = col[1];
                    this.buf[ind + 2] = col[2];
                    this.buf[ind + 3] = col[3];
                }
                x++;
                ind += 4;
            }
            y++;
            x -= wd;
            ind += (this.width * 4 - wd * 4);
        }
    };
    /* DEP:
    let dInd = xx+(y+j)*this.width;
    let dd = (upright===2?(dep+(h-j)*this.height):upright?(dep+(h-j)):dep);
    if(check) if(this.dep[dInd] <= dd){
      let tInd = dInd*4;
      this.dep[dInd] = dd;
      */
    NobsinCtx.prototype.drawRect = function (x1, y1, wr, hr, col) {
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        wr = Math.floor(wr);
        hr = Math.floor(hr);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1;
        var y = y1;
        var ind = (x + y * this.width) * 4;
        var wd = wr;
        var hd = hr;
        for (var j = 0; j < hd; j++) {
            for (var i = 0; i < wd; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    this.drawPixel_ind(ind, col[0], col[1], col[2], col[3], true);
                    /*this.buf[ind] = col[0];
                    this.buf[ind+1] = col[1];
                    this.buf[ind+2] = col[2];
                    this.buf[ind+3] = col[3];*/
                }
                x++;
                ind += 4;
            }
            y++;
            x -= wd;
            ind += (this.width * 4 - wd * 4);
        }
    };
    NobsinCtx.prototype.drawRect_dep = function (x1, y1, wr, hr, col, dep, upright) {
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        wr = Math.floor(wr);
        hr = Math.floor(hr);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1;
        var y = y1;
        var ind = (x + y * this.width) * 4;
        var wd = wr;
        var hd = hr;
        for (var j = 0; j < hd; j++) {
            for (var i = 0; i < wd; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                //let dInd = x+(y+j)*this.width;
                var dInd = Math.floor(ind / 4);
                if (col[0] == 0 && col[1] == 0 && col[2] == 0 && col[3] == 0) {
                    this.dep[dInd] = 0;
                }
                var dd = (upright == 2 ? (dep + (hd - j) * this.height) : upright ? (dep + (hd - j)) : dep);
                if (pass)
                    if (this.dep[dInd] < dd) {
                        this.dep[dInd] = dd;
                        this.drawPixel_ind(ind, col[0], col[1], col[2], col[3]);
                        /*this.buf[ind] = col[0];
                        this.buf[ind+1] = col[1];
                        this.buf[ind+2] = col[2];
                        this.buf[ind+3] = col[3];*/
                    }
                x++;
                ind += 4;
            }
            y++;
            x -= wd;
            ind += (this.width * 4 - wd * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_other = function (buf, width, scale, x1, y1, r, col, useCam) {
        if (useCam === void 0) { useCam = false; }
        if (useCam)
            if (this.useCam) {
                x1 -= this.camX;
                y1 -= this.camY;
                y1 += this.camZ;
            }
        if (Math.floor(r) < 1) {
            //this.setPixel(x1,y1,col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * width) * scale;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * scale;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= width)
                    pass = false;
                if (pass) {
                    buf[ind] = col[0];
                    buf[ind + 1] = col[1];
                    buf[ind + 2] = col[2];
                    buf[ind + 3] = col[3];
                    this.pixelCount++;
                }
                x++;
                ind += scale;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (width * scale - shiftX * scale);
        }
    };
    NobsinCtx.prototype.drawCircle_new = function (x1, y1, r, col) {
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        r = Math.floor(r);
        var inc = Math.PI / r / 2;
        var a = 0;
        var lastX = 0;
        for (var j = -r; j <= r; j++) {
            a += inc;
            var ll = Math.floor(Math.abs(Math.sqrt(r * r - j * j)));
            var l = ll / 2;
            //let x = Math.sin(a)*r;
            if (l >= lastX)
                for (var i = lastX; i <= l; i++)
                    this.setPixel(x1 + l + i, y1 + j, col);
            else
                for (var i = lastX; i >= l; i--)
                    this.setPixel(x1 + l + i, y1 + j, col);
            lastX = l;
        }
    };
    NobsinCtx.prototype.drawCircle_outline = function (x1, y1, r, col) {
        //if(Math.ceil(r) <= 0) return;
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        if (Math.floor(r) <= 1) {
            this.setPixel(x1, y1, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        var last = 0;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            //x += (r-l);
            //ind += (r-l)*4;
            var ll = l * 4;
            if (l >= last)
                for (var k = last; k < l; k++) {
                    var i = ind + ll + k * 4;
                    var pass = true;
                    if (x < 0)
                        pass = false;
                    else if (x >= this.width)
                        pass = false;
                    if (pass) {
                        this.buf[i] = col[0];
                        this.buf[i + 1] = col[1];
                        this.buf[i + 2] = col[2];
                        this.buf[i + 3] = col[3];
                        this.pixelCount++;
                    }
                }
            last = ll;
            /*for(let i = r-l; i < r+l; i += r+r-1){
              let pass = true;
              if(x < 0) pass = false;
              else if(x >= this.width) pass = false;
              if(pass){
                this.buf[ind] = col[0];
                this.buf[ind+1] = col[1];
                this.buf[ind+2] = col[2];
                this.buf[ind+3] = col[3];
                this.pixelCount++;
              }
              x += r+r-1;
              ind += (r+r-1)*4;
            }*/
            y++;
            //let shiftX = (l+l+(r-l));
            //x -= shiftX;
            ind += (this.width * 4);
        }
    };
    NobsinCtx.prototype.drawCircle = function (x1, y1, r, col) {
        //if(Math.ceil(r) <= 0) return;
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        if (Math.floor(r) <= 1) {
            this.setPixel(x1, y1, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    this.buf[ind] = col[0];
                    this.buf[ind + 1] = col[1];
                    this.buf[ind + 2] = col[2];
                    this.buf[ind + 3] = col[3];
                    this.pixelCount++;
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_dep = function (x1, y1, r, col, dep, upright) {
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        //if(Math.ceil(r) <= 0) return;
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        if (Math.floor(r) <= 1) {
            this.setPixel(x1, y1, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    var dd = (upright == 2 ? (dep + (d - j) * this.height) : upright ? (dep + (d - j)) : dep);
                    this.setData_dep(ind, col, dd);
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_ex = function (x1, y1, r, col) {
        if (Math.floor(r) <= 1) {
            this.setPixel_ex((x1 + y1 * this.width) * 4, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    this.setPixel_ex(ind, col);
                    //this.buf[ind] = col[0];
                    //this.buf[ind+1] = col[1];
                    //this.buf[ind+2] = col[2];
                    //this.buf[ind+3] = col[3];
                    //this.pixelCount++;
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_custom = function (x1, y1, r, col, func, arg) {
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        if (Math.floor(r) <= 1) {
            this.setPixel_ex((x1 + y1 * this.width) * 4, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    //this.setPixel_ex(ind,c2,solidEdge?c2[3]*solidEdge:255);
                    func(this, x, y, ind, x1, y1, r, col, l, arg);
                    //pixel x, pixel y, pixel index, origin x, origin y, radius, color, line width, args
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_grad = function (x1, y1, r, col, solidEdge) {
        if (solidEdge === void 0) { solidEdge = null; }
        if (this.useCam) {
            x1 -= this.camX;
            y1 -= this.camY;
            y1 += this.camZ;
        }
        if (Math.floor(r) <= 1) {
            this.setPixel_ex((x1 + y1 * this.width) * 4, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    var dx = x - x1;
                    var dy = y - y1;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    //let o = r/(dist||1)*32;
                    var o = dist / r * col[3];
                    o = col[3] - o;
                    var c2 = [col[0], col[1], col[2], o];
                    //let c2 = [o,o,o,o];
                    this.setPixel_ex(ind, c2, solidEdge ? c2[3] * solidEdge : 255);
                    //this.buf[ind] = col[0];
                    //this.buf[ind+1] = col[1];
                    //this.buf[ind+2] = col[2];
                    //this.buf[ind+3] = col[3];
                    //this.pixelCount++;
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawCircle_grad_smart = function (x1, y1, r, col) {
        if (Math.floor(r) <= 1) {
            this.setPixel_ex((x1 + y1 * this.width) * 4, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        for (var j = 0; j < d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.round(Math.abs(Math.sqrt(r * r - j2 * j2)));
            x += (r - l);
            ind += (r - l) * 4;
            for (var i = r - l; i < r + l; i++) {
                var pass = true;
                if (x < 0)
                    pass = false;
                else if (x >= this.width)
                    pass = false;
                if (pass) {
                    var dx = x - x1;
                    var dy = y - y1;
                    var dist = Math.abs(dx) + Math.abs(dy);
                    //dist /= 1.2; //make a little bigger shape
                    var o = dist / r * col[3];
                    o = col[3] - o;
                    if (o < 0)
                        o = 0;
                    var c2 = [col[0], col[1], col[2], o];
                    this.setPixel_ex(ind, c2);
                }
                x++;
                ind += 4;
            }
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.strokeCircle = function (x1, y1, r, col) {
        if (Math.floor(r) <= 0)
            return;
        if (Math.floor(r) <= 1) {
            this.setPixel(x1, y1, col);
            return;
        }
        r = Math.floor(r);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        var x = x1 - r;
        var y = y1 - r;
        var ind = (x + y * this.width) * 4;
        var d = r + r;
        var wlDiam = 0;
        var lastL = 0;
        for (var j = 1; j <= d; j++) {
            var j2 = j - r;
            var l = void 0;
            if (r < 6)
                l = Math.floor(Math.abs(Math.sqrt(r * r - j2 * j2)));
            else
                l = Math.ceil(Math.abs(Math.sqrt(r * r - j2 * j2)));
            var wl = (r - l);
            //let offX = (l*2)-wlDiam;
            wlDiam = l * 2;
            x += wl;
            ind += wl * 4;
            this.setPixel(x1 - l, y, col);
            if (l >= lastL) {
                for (var i1 = lastL; i1 <= l; i1++) {
                    this.setPixel(x1 + i1, y, col);
                    this.setPixel(x1 - i1, y, col);
                }
            }
            else {
                for (var i1 = lastL; i1 >= l; i1--) {
                    this.setPixel(x1 + i1, y, col);
                    this.setPixel(x1 - i1, y, col);
                }
            }
            lastL = l;
            /*for(let i = r-l; i < r+l; i++){
              let pass = true;
              if(i != r-l && i != r+l-1) pass = false;
              if(x < 0) pass = false;
              else if(x >= this.width) pass = false;
              if(pass){
                for(let i1 = 0; i1 <= Math.abs(offX); i1++){
                  let i2 = i1*(offX<0?-1:1);
                  this.buf[ind+i2] = col[0];
                  this.buf[ind+i2+1] = col[1];
                  this.buf[ind+i2+2] = col[2];
                  this.buf[ind+i2+3] = col[3];
                  this.pixelCount++;
                }
              }
              x++;
              ind += 4;
            }*/
            y++;
            var shiftX = (l + l + (r - l));
            x -= shiftX;
            ind += (this.width * 4 - shiftX * 4);
        }
    };
    NobsinCtx.prototype.drawRect_dep_old = function (x, y, w, h, col, dep) {
        if (dep === void 0) { dep = 0; }
        if (!col)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        h = Math.floor(h);
        var half = Math.floor(w / 2);
        var halfh = Math.floor(h / 2);
        x -= half;
        y -= halfh;
        if (x < 0) {
            w += x;
            if (w <= 0)
                return;
            x = 0;
        }
        var lx = x + w;
        if (lx > this.right) {
            w += this.right - lx;
            if (w <= 0)
                return;
        }
        if (y < 0) {
            h += y;
            if (h <= 0)
                return;
            y = 0;
        }
        var ly = y + h;
        if (ly > this.bottom) {
            h += this.bottom - ly;
            if (h <= 0)
                return;
        }
        var ind = (x + y * this.width) * 4;
        for (var j = 0; j < h; j++) {
            var f1 = ind + j * this.width * 4;
            for (var i = 0; i < w; i++) {
                var f = f1 + i * 4;
                var dInd = Math.floor(f / 4);
                if (this.dep[dInd] <= dep) {
                    this.dep[dInd] = dep;
                    switch (this.blendMode) {
                        case 0:
                            if (col) {
                                this.buf[f] = col[0];
                                this.buf[f + 1] = col[1];
                                this.buf[f + 2] = col[2];
                                this.buf[f + 3] = col[3];
                            }
                            else {
                                this.buf[f] = 0;
                                this.buf[f + 1] = 0;
                                this.buf[f + 2] = 0;
                                this.buf[f + 3] = 255;
                            }
                            this.pixelCount++;
                            break;
                        case 1:
                            if (this.buf[f + 3] == 0) {
                                this.buf[f] = col[0];
                                this.buf[f + 1] = col[1];
                                this.buf[f + 2] = col[2];
                                this.buf[f + 3] = col[3];
                            }
                            this.pixelCount++;
                            break;
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawRect_depMap = function (x, y, w, h, col, depMap, dep) {
        if (dep === void 0) { dep = 0; }
        if (!depMap)
            return;
        if (!col)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        w = Math.floor(w);
        h = Math.floor(h);
        if (this.offX)
            x += this.offX;
        if (this.offY)
            y += this.offY;
        var half = Math.floor(w / 2);
        var halfh = Math.floor(h / 2);
        x -= half;
        y -= halfh;
        if (x < 0) {
            w += x;
            if (w <= 0)
                return;
            x = 0;
        }
        var lx = x + w;
        if (lx > this.right) {
            w += this.right - lx;
            if (w <= 0)
                return;
        }
        if (y < 0) {
            h += y;
            if (h <= 0)
                return;
            y = 0;
        }
        var ly = y + h;
        if (ly > this.bottom) {
            h += this.bottom - ly;
            if (h <= 0)
                return;
        }
        var iS = x + y * this.width;
        var ind = iS * 4;
        var hit = false;
        for (var j = 0; j < h; j++) {
            var f1 = ind + j * this.width * 4;
            for (var i = 0; i < w; i++) {
                var f = f1 + i * 4;
                var dInd = Math.floor(f / 4);
                var rInd = (i + j * w) * 4;
                var dep2 = depMap[rInd] + depMap[rInd + 1] * this.height + dep;
                if (this.dep[dInd] <= dep2) {
                    this.dep[dInd] = dep2;
                    switch (this.blendMode) {
                        case 0:
                            if (col) {
                                this.buf[f] = col[0];
                                this.buf[f + 1] = col[1];
                                this.buf[f + 2] = col[2];
                                this.buf[f + 3] = col[3];
                            }
                            else {
                                this.buf[f] = 0;
                                this.buf[f + 1] = 0;
                                this.buf[f + 2] = 0;
                                this.buf[f + 3] = 255;
                            }
                            this.pixelCount++;
                            break;
                        case 1:
                            if (this.buf[f + 3] == 0) {
                                this.buf[f] = col[0];
                                this.buf[f + 1] = col[1];
                                this.buf[f + 2] = col[2];
                                this.buf[f + 3] = col[3];
                            }
                            this.pixelCount++;
                            break;
                    }
                }
                var hitRes = this.setPixelCol(Math.floor(f / 4));
                if (hitRes)
                    hit = true;
            }
        }
        return (hit ? 2 : 1);
    };
    NobsinCtx.prototype.plotLine = function (x0, y0, x1, y1, c) {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var err = dx + dy; /* error value e_xy */
        while (true) { /* loop */
            var res = this.setPixel(x0, y0, c);
            //if(!res) break;
            if (x0 == x1 && y0 == y1)
                break;
            var e2 = 2 * err;
            if (e2 >= dy) { /* e_xy+e_x > 0 */
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) { /* e_xy+e_y < 0 */
                err += dx;
                y0 += sy;
            }
        }
    };
    NobsinCtx.prototype.plotLine_marker = function (t, normWidth, normHeight, x0, y0, x1, y1) {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var err = dx + dy;
        while (true) {
            var inside = true;
            if (x0 < 0)
                inside = false;
            if (x0 > normWidth - 1)
                inside = false;
            if (y0 < 0)
                inside = false;
            if (y0 > normHeight - 1)
                inside = false;
            if (inside) {
                var ind = x0 + y0 * normWidth;
                t[ind] = 1;
            }
            if (x0 == x1 && y0 == y1)
                break;
            var e2 = 2 * err;
            if (e2 >= dy) {
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) {
                err += dx;
                y0 += sy;
            }
        }
    };
    NobsinCtx.prototype.plotLineSize = function (x0, y0, x1, y1, c, w) {
        //this.drawLine_smart(x0,y0,x1,y1,c,w);
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var err = dx + dy; /* error value e_xy */
        while (true) { /* loop */
            //let res = this.setPixelSize_smart(x0,y0,w,c);
            //this.setPixel(x0,y0,c);
            //this.setPixelSize(x0,y0,w,c);
            this.setPixelSize_smart(x0, y0, w, c);
            /*for(let yy = 0; yy < w; yy++){
              for(let xx = 0; xx < w; xx++){
                this.setPixel(x0+xx,y0+yy,c);
              }
            }*/
            //if(!res) break;
            if (x0 == x1 && y0 == y1)
                break;
            var e2 = 2 * err;
            if (e2 >= dy) { /* e_xy+e_x > 0 */
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) { /* e_xy+e_y < 0 */
                err += dx;
                y0 += sy;
            }
        }
    };
    NobsinCtx.prototype.drawLine_smart = function (x0, y0, x1, y1, c, w) {
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        //fix ends
        //this.drawRect(x0-hw,y0-hw,w,w,c);
        //this.drawRect(x1-hw,y1-hw,w,w,c);
        //
        //if(Math.floor(w) == 1) return;
        //this.plotLine(x0,y0,x1,y1,c);
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy; /* error value e_xy */
            while (true) { /* loop */
                //let res = this.setPixel(x0,y0,c);
                if (am >= 1) { //vertical slope
                    this.drawPixel(x0, y0, c);
                    //this.drawRect(x0-hw,y0-hw,w,w,c);
                    /*for(let i = -hw; i <= hw; i++){
                      this.setPixel(x0+i,y0,c);
                      //if(this.useRecord){
                        //this.recMap[Math.floor(x0+i+y0*this.width)] = 1;
                        //if(!this.pMap.has(c)) this.pMap.set(c,[]);
                        //this.pMap.get(c).push((x0+i+y0*this.width)*4);
                      //}
                    }*/
                }
                else { //horz slope
                    this.drawPixel(x0, y0, c);
                    //this.drawRect(x0-hw,y0-hw,w,w,c);
                    /*for(let i = -hw; i <= hw; i++){
                      this.setPixel(x0,y0+i,c);
                      //if(this.useRecord) this.recMap[Math.floor(x0+(y0+i)*this.width)] = 1;
                      //if(!this.pMap.has(c)) this.pMap.set(c,[]);
                      //this.pMap.get(c).push((x0+(y0+i)*this.width)*4);
                    }*/
                }
                //if(!res) break;
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                }
            }
        }
    };
    NobsinCtx.prototype.isPixelInLine = function (x0, y0, x1, y1, w, mx, my) {
        var hw = Math.floor(w / 2); //half width
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            //this.drawRect_dep(x0-hw,y0-hw,w,w,c,dep,upright);
            //this.drawRect_dep(x1-hw,y1-hw,w,w,c,dep+(upright==2?(Math.max(0,(y1-y0)*this.height)):0),upright);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy;
            while (true) { /* loop */
                if (am >= 1) { //vertical slope
                    for (var i = -hw; i <= hw; i++) {
                        if (x0 + i == mx && y0 == my)
                            return true;
                    }
                }
                else { //horz slope
                    for (var i = -hw; i <= hw; i++) {
                        if (x0 == mx && y0 + i == my)
                            return true;
                    }
                }
                if (x0 == x1 && y0 == y1)
                    return false;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                }
            }
        }
    };
    NobsinCtx.prototype.drawLine_smart_filled = function (x0, y0, x1, y1, c, w, dep, upright) {
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        /*
    
        let dInd = xx+(y+j)*this.width;
              let dd = (upright===2?(dep+(h-j)*this.height):upright?(dep+(h-j)):dep);
              if(check) if(this.dep[dInd] <= dd){
                let tInd = dInd*4;
                this.dep[dInd] = dd;
    
        */
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var startY = y0;
            this.drawRect_dep(x0 - hw, y0 - hw, w, w, c, dep, upright);
            this.drawRect_dep(x1 - hw, y1 - hw, w, w, c, dep + (upright == 2 ? (Math.max(0, (y1 - y0) * this.height)) : 0), upright);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy; /* error value e_xy */
            while (true) { /* loop */
                //let res = this.setPixel(x0,y0,c);
                if (am >= 1) { //vertical slope
                    for (var i = -hw; i <= hw; i++) {
                        var depi = (startY - y0) * this.height;
                        this.setPixel_dep(x0 + i, y0, c, dep + depi);
                    }
                }
                else { //horz slope
                    for (var i = -hw; i <= hw; i++) {
                        var depi = (startY - (y0 + i)) * this.height;
                        this.setPixel_dep(x0, y0 + i, c, dep + depi);
                    }
                }
                //if(!res) break;
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                }
            }
        }
    };
    NobsinCtx.prototype.getLine = function (x0, y0, x1, y1, c, w) {
        var l = [];
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        //fix ends
        //
        //if(Math.floor(w) == 1) return;
        //this.plotLine(x0,y0,x1,y1,c);
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy; /* error value e_xy */
            while (true) { /* loop */
                //let res = this.setPixel(x0,y0,c);
                if (am >= 1) { //vertical slope
                    for (var i = -hw; i <= hw; i++) {
                        //this.setPixel(x0+i,y0,c);
                        l.push([x0 + i, y0, 0]);
                    }
                }
                else { //horz slope
                    for (var i = -hw; i <= hw; i++) {
                        //this.setPixel(x0,y0+i,c);
                        l.push([x0, y0 + i, 0]);
                    }
                }
                //if(!res) break;
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                }
            }
        }
        return l;
    };
    NobsinCtx.prototype.drawLine_smart_outline = function (x0, y0, x1, y1, c, w) {
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        //if(Math.floor(w) == 1) return;
        //this.plotLine(x0,y0,x1,y1,c);
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy; /* error value e_xy */
            while (true) { /* loop */
                //let res = this.setPixel(x0,y0,c);
                if (am >= 1) { //vertical slope
                    for (var i = -hw; i <= hw; i++) {
                        if (i == -hw || i == hw)
                            this.setPixel(x0 + i, y0, this.outlineColor);
                        else
                            this.setPixel(x0 + i, y0, c);
                    }
                }
                else { //horz slope
                    for (var i = -hw; i <= hw; i++) {
                        if (i == -hw || i == hw)
                            this.setPixel(x0, y0 + i, this.outlineColor);
                        else
                            this.setPixel(x0, y0 + i, c);
                    }
                }
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                }
            }
        }
    };
    NobsinCtx.prototype.drawLine_smart_dep_outline = function (x0, y0, x1, y1, c, w, dep, endW) {
        if (dep === void 0) { dep = 0; }
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        //if(Math.floor(w) == 1) return;
        //this.plotLine(x0,y0,x1,y1,c);
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        var startX = x0;
        var startY = y0;
        var inc = 0;
        if (endW != null) {
            inc = (w - endW) / ly / 2;
            hw = endW / 2;
        }
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy; /* error value e_xy */
            while (true) { /* loop */
                //let res = this.setPixel(x0,y0,c);
                var oy = (ly - (y0 - startY));
                var f = Math.round(hw);
                if (am >= 1) { //vertical slope
                    for (var i = -f; i <= f; i++) {
                        if (i == -f || i == f)
                            this.setPixel_dep(x0 + i, y0, this.outlineColor, dep + oy);
                        else
                            this.setPixel_dep(x0 + i, y0, c, dep + oy);
                    }
                }
                else { //horz slope
                    for (var i = -f; i <= f; i++) {
                        if (i == -f || i == f)
                            this.setPixel_dep(x0, y0 + i, this.outlineColor, dep + oy - i);
                        else
                            this.setPixel_dep(x0, y0 + i, c, dep + oy - i);
                    }
                }
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) { /* e_xy+e_x > 0 */
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) { /* e_xy+e_y < 0 */
                    err += dx;
                    y0 += sy;
                    hw += inc;
                }
            }
        }
    };
    NobsinCtx.prototype.drawLine_smart_dep = function (x0, y0, x1, y1, c, w, dep) {
        if (dep === void 0) { dep = 0; }
        //posibly temp
        var hw = Math.floor(w / 2); //half width
        if (w < 1 && w > 0.1)
            w = 1;
        var ly = y1 - y0;
        var lx = x1 - x0;
        var m = ly / lx;
        var am = Math.abs(m);
        this.drawRect_dep(x0 - hw, y0 - hw, w, w, c, dep, 0);
        this.drawRect_dep(x1 - hw, y1 - hw, w, w, c, dep, 0);
        {
            x0 = Math.floor(x0);
            x1 = Math.floor(x1);
            y0 = Math.floor(y0);
            y1 = Math.floor(y1);
            var dx = Math.abs(x1 - x0);
            var sx = x0 < x1 ? 1 : -1;
            var dy = -Math.abs(y1 - y0);
            var sy = y0 < y1 ? 1 : -1;
            var err = dx + dy;
            while (true) {
                this.drawRect_dep(x0 - hw, y0 - hw, w, w, c, dep, 0);
                /*if(am >= 1){ //vertical slope
                  for(let i = -hw; i <= hw; i++){
                    this.drawPixel_dep(x0+i,y0,c,dep);
                  }
                }
                else{ //horz slope
                  for(let i = -hw; i <= hw; i++){
                    this.drawPixel_dep(x0,y0+i,c,dep);
                  }
                }*/
                if (x0 == x1 && y0 == y1)
                    break;
                var e2 = 2 * err;
                if (e2 >= dy) {
                    err += dy;
                    x0 += sx;
                }
                if (e2 <= dx) {
                    err += dx;
                    y0 += sy;
                }
            }
        }
    };
    NobsinCtx.prototype.drawPolygon2 = function (v, x, y, c) {
        var left = 9999;
        var right = -9999;
        var top = 9999;
        var bottom = -9999;
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0];
            var y0 = vert[1];
            if (x0 < left)
                left = x0;
            if (x0 > right)
                right = x0;
            if (y0 < top)
                top = y0;
            if (y0 > bottom)
                bottom = y0;
        }
        var normLeft = Math.abs(left);
        var normLeft2 = normLeft * 2;
        var normTop = Math.abs(top);
        var normTop2 = normTop * 2;
        var normWidth = Math.abs(normLeft + right) + 1;
        var normHeight = Math.abs(normTop + bottom) + 1;
        var size = normWidth * normHeight;
        var t = new Uint8ClampedArray(size);
        //draw outline
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0] + normLeft;
            var y0 = vert[1] + normTop;
            var nI = i + 1;
            if (i == v.length - 1)
                nI = 0;
            var next = v[nI];
            var x1 = next[0] + normLeft;
            var y1 = next[1] + normTop;
            this.plotLine_marker(t, normWidth, normHeight, x0, y0, x1, y1);
        }
        for (var j = normTop2; j < normHeight; j++) {
            var curH = 0;
            var hits = [];
            var hitAmt = 0;
            for (var i = normLeft2; i < normWidth; i++) {
                var ind = i + j * normWidth;
                if (t[ind] != curH) {
                    curH = t[ind];
                    if (curH == 1) {
                        hitAmt++;
                        hits[i] = 1;
                    }
                }
                if (t[ind])
                    this.setPixel(x + i - normLeft, y + j - normTop, c);
            }
            if (hitAmt > 1) {
                var draw = false; //false for fill, true for invert fill
                for (var i = normLeft2; i < normWidth; i++) {
                    if (hits[i])
                        draw = !draw;
                    if (draw)
                        this.setPixel(x + i - normLeft, y + j - normTop, c);
                }
            }
        }
    };
    NobsinCtx.prototype.drawPolygon2_dep = function (v, x, y, c, dep) {
        if (dep === void 0) { dep = 0; }
        var left = 9999;
        var right = -9999;
        var top = 9999;
        var bottom = -9999;
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0];
            var y0 = vert[1];
            if (x0 < left)
                left = x0;
            if (x0 > right)
                right = x0;
            if (y0 < top)
                top = y0;
            if (y0 > bottom)
                bottom = y0;
        }
        var normLeft = Math.abs(left);
        var normLeft2 = normLeft * 2;
        var normTop = Math.abs(top);
        var normTop2 = normTop * 2;
        var normWidth = Math.abs(normLeft + right) + 1;
        var normHeight = Math.abs(normTop + bottom) + 1;
        var size = normWidth * normHeight;
        var t = new Uint8ClampedArray(size);
        //draw outline
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0] + normLeft;
            var y0 = vert[1] + normTop;
            var nI = i + 1;
            if (i == v.length - 1)
                nI = 0;
            var next = v[nI];
            var x1 = next[0] + normLeft;
            var y1 = next[1] + normTop;
            this.plotLine_marker(t, normWidth, normHeight, x0, y0, x1, y1);
        }
        for (var j = normTop2; j < normHeight; j++) {
            var curH = 0;
            var hits = [];
            var hitAmt = 0;
            for (var i = normLeft2; i < normWidth; i++) {
                var ind = i + j * normWidth;
                if (t[ind] != curH) {
                    curH = t[ind];
                    if (curH == 1) {
                        hitAmt++;
                        hits[i] = 1;
                    }
                }
                if (t[ind])
                    this.setPixel_dep(x + i - normLeft, y + j - normTop, c, dep);
            }
            if (hitAmt > 1) {
                var draw = false; //false for fill, true for invert fill
                for (var i = normLeft2; i < normWidth; i++) {
                    if (hits[i])
                        draw = !draw;
                    if (draw)
                        this.setPixel_dep(x + i - normLeft, y + j - normTop, c, dep);
                }
            }
        }
    };
    NobsinCtx.prototype.drawPolygon = function (v, x, y, c) {
        var left = 9999;
        var right = -9999;
        var top = 9999;
        var bottom = -9999;
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0];
            var y0 = vert[1];
            if (x0 < left)
                left = x0;
            if (x0 > right)
                right = x0;
            if (y0 < top)
                top = y0;
            if (y0 > bottom)
                bottom = y0;
        }
        var normLeft = Math.abs(left);
        var normTop = Math.abs(top);
        var normWidth = Math.abs(normLeft + right) + 50;
        var normHeight = Math.abs(normTop + bottom) + 50;
        var size = normWidth * normHeight;
        var t = new Uint8ClampedArray(size);
        for (var i = 0; i < v.length; i++) {
            var vert = v[i];
            var x0 = vert[0] + normLeft;
            var y0 = vert[1] + normTop;
            var nI = i + 1;
            if (i == v.length - 1)
                nI = 0;
            var next = v[nI];
            var x1 = next[0] + normLeft;
            var y1 = next[1] + normTop;
            this.plotLine_marker(t, normWidth, normHeight, x0, y0, x1, y1);
        }
        for (var j = 0; j < normHeight; j++) {
            var hit = false;
            var curH = 0;
            var hits = [];
            var hitAmt = 0;
            for (var i = 0; i < normWidth; i++) {
                var ind = i + j * normWidth;
                if (t[ind] != curH) {
                    hitAmt++;
                    curH = t[ind];
                }
                if (t[ind]) {
                    hits[i] = 1;
                    this.setPixel(x + i - normLeft, y + j - normTop, c);
                }
                /*if(t[ind]){
                
                  if((i != 0 ? !t[ind-1] : true)){
                    hitAmt++;
                  }
                  hits[i] = 1;
                  this.setPixel(x+i-normLeft,y+j-normTop,c);
                }*/
            }
            if (hitAmt > 1) {
                var h = false;
                var cH = 0;
                for (var i = 0; i < normWidth; i++) {
                    if (hits[i] != cH) {
                        h = !h;
                        cH = hits[i];
                        //if(i != 0 ? !hits[i-1] : true) h = !h;
                    }
                    if (h || hits[i])
                        this.setPixel(x + i - normLeft, y + j - normTop, c);
                }
            }
            else {
                for (var i = 0; i < normWidth; i++) {
                    var ind = i + j * normWidth;
                    if (t[ind])
                        this.setPixel(x + i - normLeft, y + j - normTop, c);
                }
            }
        }
    };
    NobsinCtx.prototype.drawImage = function (data, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        w -= this.widthOff;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    var tInd = ((x + i - hw) + (y + j - hh) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var tInd = ((x + i - hw) + (y + j - hh) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_ex = function (data, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        w -= this.widthOff;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    var tInd = ((x + i - hw) + (y + j - hh) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.setPixel_ex(tInd, [
                            data.data[ind],
                            data.data[ind + 1],
                            data.data[ind + 2],
                            data.data[ind + 3]
                        ]);
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var tInd = ((x + i - hw) + (y + j - hh) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.setPixel_ex(tInd, [
                            data.data[ind],
                            data.data[ind + 1],
                            data.data[ind + 2],
                            data.data[ind + 3]
                        ]);
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_upright = function (data, x, y, dep) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (!data)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        w -= this.widthOff;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    var xx = (x + i - hw);
                    var yy = (y + j - hh);
                    var tInd = (xx + yy * this.width) * 4;
                    var dInd = xx + yy * this.width;
                    var doy = dep + (h - j);
                    if (data.data[ind + 3])
                        if (this.dep[dInd] <= doy) {
                            this.dep[dInd] = doy;
                            this.buf[tInd] = data.data[ind];
                            this.buf[tInd + 1] = data.data[ind + 1];
                            this.buf[tInd + 2] = data.data[ind + 2];
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var xx = (x + i - hw);
                    var yy = (y + j - hh);
                    var tInd = (xx + yy * this.width) * 4;
                    var dInd = xx + yy * this.width;
                    var doy = dep + (h - j);
                    if (data.data[ind + 3])
                        if (this.dep[dInd] <= doy) {
                            this.dep[dInd] = doy;
                            this.buf[tInd] = data.data[ind];
                            this.buf[tInd + 1] = data.data[ind + 1];
                            this.buf[tInd + 2] = data.data[ind + 2];
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawPixel = function (x, y, c) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0)
            return;
        if (x > this.right)
            return;
        if (y < 0)
            return;
        if (y > this.bottom)
            return;
        var r = c[0];
        var g = c[1];
        var b = c[2];
        var a = c[3];
        var ind = (x + y * this.width) * 4;
        this.drawPixel_ind(ind, r, g, b, a);
    };
    NobsinCtx.prototype.drawPixel_ind_dep = function (ind, r, g, b, a, replace, dep) {
        if (dep === void 0) { dep = 0; }
        var ind2 = Math.floor(ind / 4);
        var d = this.dep[ind2];
        if (dep > d) {
            this.dep[ind2] = dep;
            this.drawPixel_ind(ind, r, g, b, a, replace);
        }
    };
    NobsinCtx.prototype.drawPixel_ind = function (ind, r, g, b, a, replace) {
        if (replace === void 0) { replace = false; }
        var list;
        if (this.useNewRec) {
            var cstr = "[".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, "]");
            if (!this.newRecMap.has(cstr))
                this.newRecMap.set(cstr, []);
            list = this.newRecMap.get(cstr);
        }
        if (replace || (r == 0 && g == 0 && b == 0 && a == 0)) {
            this.buf[ind] = r;
            this.buf[ind + 1] = g;
            this.buf[ind + 2] = b;
            this.buf[ind + 3] = a;
            this.pixelCount++;
            if (this.useNewRec) {
                list.push(ind);
            }
            return;
        }
        var lr = this.buf[ind];
        var lg = this.buf[ind + 1];
        var lb = this.buf[ind + 2];
        var la = this.buf[ind + 3];
        if (la == 0) {
            lr = r;
            lg = g;
            lb = b;
        }
        var o = a / 255;
        var lo = la / 255;
        if (la != 0 && la != 255) {
            lr *= o;
            lg *= o;
            lb *= o;
        }
        var no = (lo + (1.0 - lo) * o);
        var c = 1 - o;
        this.buf[ind] = Math.floor(o * r + c * lr);
        this.buf[ind + 1] = Math.floor(o * g + c * lg);
        this.buf[ind + 2] = Math.floor(o * b + c * lb);
        this.buf[ind + 3] = Math.floor(no * 255);
        this.pixelCount++;
        if (this.useNewRec) {
            list.push(ind);
        }
        /*let o = a/255;
        let lo = la/255;
        let no = (lo + (1.0 - lo) * o);
        this.buf[ind+3] = no*255;
        this.buf[ind] = r*no+lr*(1-no);
        this.buf[ind+1] = g*no+lg*(1-no);
        this.buf[ind+2] = b*no+lb*(1-no);*/
    };
    NobsinCtx.prototype.drawPixel_dep = function (x, y, c, dep) {
        var list;
        if (this.useNewRec) {
            var cstr = JSON.stringify(c);
            if (!this.newRecMap.has(cstr))
                this.newRecMap.set(cstr, []);
            list = this.newRecMap.get(cstr);
        }
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0)
            return;
        if (x > this.right)
            return;
        if (y < 0)
            return;
        if (y > this.bottom)
            return;
        var r = c[0];
        var g = c[1];
        var b = c[2];
        var a = c[3];
        var iD = x + y * this.width;
        var ind = iD * 4;
        if (r == 0 && g == 0 && b == 0 && a == 0) {
            //this.dep[iD] = 0;
            this.buf[ind] = 0;
            this.buf[ind + 1] = 0;
            this.buf[ind + 2] = 0;
            this.buf[ind + 3] = 0;
            this.pixelCount++;
            if (this.useNewRec) {
                list.push(ind);
            }
            return;
        }
        if (this.dep[iD] < dep) {
            this.dep[iD] = dep;
            var lr = this.buf[ind];
            var lg = this.buf[ind + 1];
            var lb = this.buf[ind + 2];
            var la = this.buf[ind + 3];
            if (la == 0) {
                lr = r;
                lg = g;
                lb = b;
            }
            var o = a / 255;
            var lo = la / 255;
            if (la != 0 && la != 255) {
                lr *= o;
                lg *= o;
                lb *= o;
            }
            var no = (lo + (1.0 - lo) * o);
            var c_1 = 1 - o;
            this.buf[ind] = Math.floor(o * r + c_1 * lr);
            this.buf[ind + 1] = Math.floor(o * g + c_1 * lg);
            this.buf[ind + 2] = Math.floor(o * b + c_1 * lb);
            this.buf[ind + 3] = Math.floor(no * 255);
            if (this.useNewRec) {
                list.push(ind);
            }
        }
        this.pixelCount++;
    };
    NobsinCtx.prototype.drawImage_basic_skip = function (data, x, y, skip) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (skip === void 0) { skip = 1; }
        if (!data)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        for (var j = 0; j < h; j += skip) {
            for (var i = 0; i < w; i += skip) {
                var ind = (i + j * w) * 4;
                if (data.data[ind + 3]) {
                    var check = true;
                    var xx = x + (i / skip);
                    if (xx < 0)
                        check = false;
                    else if (xx >= this.width)
                        check = false;
                    if (check) {
                        var tInd = (xx + (y + (j / skip)) * this.width) * 4;
                        this.drawPixel_ind(tInd, data.data[ind], data.data[ind + 1], data.data[ind + 2], data.data[ind + 3]);
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic = function (data, x, y, camera) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (camera === void 0) { camera = false; }
        if (!data)
            return;
        if (this.useCam || camera) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        /*let tx = x+w;
        let ty = y+h;
        if(tx > this.right) w -= tx-this.right;
        if(w <= 0) return;
        if(ty > this.bottom) h -= ty-this.bottom;
        if(h <= 0) return;
    
        w -= this.widthOff;*/
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.drawPixel_ind(tInd, data.data[ind], data.data[ind + 1], data.data[ind + 2], data.data[ind + 3]);
                            //this.buf[tInd] = data.data[ind];
                            //this.buf[tInd+1] = data.data[ind+1];
                            //this.buf[tInd+2] = data.data[ind+2];
                            //this.buf[tInd+3] = data.data[ind+3];
                        }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.buf[tInd] = data.data[ind];
                            this.buf[tInd + 1] = data.data[ind + 1];
                            this.buf[tInd + 2] = data.data[ind + 2];
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_dep = function (data, x, y, camera, dep, upright) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (camera === void 0) { camera = false; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        if (!data)
            return;
        if (this.useCam || camera) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                this.buf[tInd] = data.data[ind];
                                this.buf[tInd + 1] = data.data[ind + 1];
                                this.buf[tInd + 2] = data.data[ind + 2];
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                this.buf[tInd] = data.data[ind];
                                this.buf[tInd + 1] = data.data[ind + 1];
                                this.buf[tInd + 2] = data.data[ind + 2];
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_tint = function (data, x, y, tr, tg, tb) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.buf[tInd] = Math.floor(data.data[ind] * tr);
                            this.buf[tInd + 1] = Math.floor(data.data[ind + 1] * tg);
                            this.buf[tInd + 2] = Math.floor(data.data[ind + 2] * tb);
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.buf[tInd] = Math.floor(data.data[ind] * tr);
                            this.buf[tInd + 1] = Math.floor(data.data[ind + 1] * tg);
                            this.buf[tInd + 2] = Math.floor(data.data[ind + 2] * tb);
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_tint2 = function (data, x, y, t1, t2) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.buf[tInd] = Math.floor((data.data[ind] + t1[0]) * t2[0]);
                            this.buf[tInd + 1] = Math.floor((data.data[ind + 1] + t1[1]) * t2[1]);
                            this.buf[tInd + 2] = Math.floor((data.data[ind + 2] + t1[2]) * t2[2]);
                            this.buf[tInd + 3] = Math.floor((data.data[ind + 3] + t1[3]) * t2[3]);
                        }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            this.buf[tInd] = Math.floor((data.data[ind] + t1[0]) * t2[0]);
                            this.buf[tInd + 1] = Math.floor((data.data[ind + 1] + t1[1]) * t2[1]);
                            this.buf[tInd + 2] = Math.floor((data.data[ind + 2] + t1[2]) * t2[2]);
                            this.buf[tInd + 3] = Math.floor((data.data[ind + 3] + t1[3]) * t2[3]);
                        }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_tint2_dep = function (data, x, y, t1, t2, dep, upright, outline) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                this.buf[tInd] = Math.floor((data.data[ind] + t1[0]) * t2[0]);
                                this.buf[tInd + 1] = Math.floor((data.data[ind + 1] + t1[1]) * t2[1]);
                                this.buf[tInd + 2] = Math.floor((data.data[ind + 2] + t1[2]) * t2[2]);
                                this.buf[tInd + 3] = data.data[ind + 3];
                                if (outline) {
                                    if (i == 0) {
                                        this.buf[tInd - 4] = outline[0];
                                        this.buf[tInd - 4 + 1] = outline[1];
                                        this.buf[tInd - 4 + 2] = outline[2];
                                        this.buf[tInd - 4 + 3] = 255;
                                    }
                                    if (j == 0) {
                                        this.buf[tInd - this.width * 4] = outline[0];
                                        this.buf[tInd - this.width * 4 + 1] = outline[1];
                                        this.buf[tInd - this.width * 4 + 2] = outline[2];
                                        this.buf[tInd - this.width * 4 + 3] = 255;
                                    }
                                    if (i == w - 1) {
                                        this.buf[tInd + 4] = outline[0];
                                        this.buf[tInd + 4 + 1] = outline[1];
                                        this.buf[tInd + 4 + 2] = outline[2];
                                        this.buf[tInd + 4 + 3] = 255;
                                    }
                                    if (j == h - 1) {
                                        this.buf[tInd + this.width * 4] = outline[0];
                                        this.buf[tInd + this.width * 4 + 1] = outline[1];
                                        this.buf[tInd + this.width * 4 + 2] = outline[2];
                                        this.buf[tInd + this.width * 4 + 3] = 255;
                                    }
                                }
                            }
                    }
                    else if (outline) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var tInd = dInd * 4;
                        if (check)
                            if (!(this.buf[tInd] == 255 && this.buf[tInd + 1] == 255 && this.buf[tInd + 2] == 255)) {
                                if (check) {
                                    var pass = false;
                                    if (ind + 3 + 4 < data.data.length && data.data[ind + 3 + 4] != 0)
                                        pass = true;
                                    else if (ind + 3 - 4 >= 0 && data.data[ind + 3 - 4] != 0)
                                        pass = true;
                                    else if (ind + 3 + w * 4 < data.data.length && data.data[ind + 3 + w * 4] != 0)
                                        pass = true;
                                    else if (ind + 3 - w * 4 >= 0 && data.data[ind + 3 - w * 4] != 0)
                                        pass = true;
                                    if (pass) {
                                        this.dep[dInd] = 60000;
                                        this.buf[tInd] = outline[0];
                                        this.buf[tInd + 1] = outline[1];
                                        this.buf[tInd + 2] = outline[2];
                                        this.buf[tInd + 3] = 255;
                                    }
                                }
                            }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                this.buf[tInd] = Math.floor((data.data[ind] + t1[0]) * t2[0]);
                                this.buf[tInd + 1] = Math.floor((data.data[ind + 1] + t1[1]) * t2[1]);
                                this.buf[tInd + 2] = Math.floor((data.data[ind + 2] + t1[2]) * t2[2]);
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                    else if (outline) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var tInd = dInd * 4;
                        if (check)
                            if (!(this.buf[tInd] == 255 && this.buf[tInd + 1] == 255 && this.buf[tInd + 2] == 255)) {
                                if (check) {
                                    var pass = false;
                                    if (ind + 3 + 4 < data.data.length && data.data[ind + 3 + 4] != 0)
                                        pass = true;
                                    else if (ind + 3 - 4 >= 0 && data.data[ind + 3 - 4] != 0)
                                        pass = true;
                                    else if (ind + 3 + w * 4 < data.data.length && data.data[ind + 3 + w * 4] != 0)
                                        pass = true;
                                    else if (ind + 3 - w * 4 >= 0 && data.data[ind + 3 - w * 4] != 0)
                                        pass = true;
                                    if (pass) {
                                        this.dep[dInd] = 60000;
                                        this.buf[tInd] = outline[0];
                                        this.buf[tInd + 1] = outline[1];
                                        this.buf[tInd + 2] = outline[2];
                                        this.buf[tInd + 3] = 255;
                                    }
                                }
                            }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_replace_dep = function (data, x, y, t1, t2, dep, upright) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                if (data.data[ind] == t1[0] && data.data[ind + 1] == t1[1] && data.data[ind + 2] == t1[2]) {
                                    this.buf[tInd] = t2[0];
                                    this.buf[tInd + 1] = t2[1];
                                    this.buf[tInd + 2] = t2[2];
                                }
                                else {
                                    this.buf[tInd] = data.data[ind];
                                    this.buf[tInd + 1] = data.data[ind + 1];
                                    this.buf[tInd + 2] = data.data[ind + 2];
                                }
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                if (data.data[ind] == t1[0] && data.data[ind + 1] == t1[1] && data.data[ind + 2] == t1[2]) {
                                    this.buf[tInd] = t2[0];
                                    this.buf[tInd + 1] = t2[1];
                                    this.buf[tInd + 2] = t2[2];
                                }
                                else {
                                    this.buf[tInd] = data.data[ind];
                                    this.buf[tInd + 1] = data.data[ind + 1];
                                    this.buf[tInd + 2] = data.data[ind + 2];
                                }
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_replace2_dep = function (data, x, y, t1, t2, t3, t4, dep, upright) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                if (data.data[ind] == t1[0] && data.data[ind + 1] == t1[1] && data.data[ind + 2] == t1[2]) {
                                    this.buf[tInd] = t2[0];
                                    this.buf[tInd + 1] = t2[1];
                                    this.buf[tInd + 2] = t2[2];
                                }
                                else if (data.data[ind] == t3[0] && data.data[ind + 1] == t3[1] && data.data[ind + 2] == t3[2]) {
                                    this.buf[tInd] = t4[0];
                                    this.buf[tInd + 1] = t4[1];
                                    this.buf[tInd + 2] = t4[2];
                                }
                                else {
                                    this.buf[tInd] = data.data[ind];
                                    this.buf[tInd + 1] = data.data[ind + 1];
                                    this.buf[tInd + 2] = data.data[ind + 2];
                                }
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        var dInd = xx + (y + j) * this.width;
                        var dd = (upright === 2 ? (dep + (h - j) * this.height) : upright ? (dep + (h - j)) : dep);
                        if (check)
                            if (this.dep[dInd] <= dd) {
                                var tInd = dInd * 4;
                                this.dep[dInd] = dd;
                                if (data.data[ind] == t1[0] && data.data[ind + 1] == t1[1] && data.data[ind + 2] == t1[2]) {
                                    this.buf[tInd] = t2[0];
                                    this.buf[tInd + 1] = t2[1];
                                    this.buf[tInd + 2] = t2[2];
                                }
                                else if (data.data[ind] == t3[0] && data.data[ind + 1] == t3[1] && data.data[ind + 2] == t3[2]) {
                                    this.buf[tInd] = t4[0];
                                    this.buf[tInd + 1] = t4[1];
                                    this.buf[tInd + 2] = t4[2];
                                }
                                else {
                                    this.buf[tInd] = data.data[ind];
                                    this.buf[tInd + 1] = data.data[ind + 1];
                                    this.buf[tInd + 2] = data.data[ind + 2];
                                }
                                this.buf[tInd + 3] = data.data[ind + 3];
                            }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_tintAdd = function (data, x, y, tr, tg, tb) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            if (data.data[ind] == 0 && data.data[ind + 1] == 0 && data.data[ind + 2] == 0) {
                                this.buf[tInd] = 0;
                                this.buf[tInd + 1] = 0;
                                this.buf[tInd + 2] = 0;
                            }
                            else {
                                this.buf[tInd] = Math.floor(data.data[ind] + tr);
                                this.buf[tInd + 1] = Math.floor(data.data[ind + 1] + tg);
                                this.buf[tInd + 2] = Math.floor(data.data[ind + 2] + tb);
                            }
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    if (data.data[ind + 3]) {
                        var check = true;
                        var xx = x + i;
                        if (xx < 0)
                            check = false;
                        else if (xx >= this.width)
                            check = false;
                        if (check) {
                            var tInd = (xx + (y + j) * this.width) * 4;
                            if (data.data[ind] == 0 && data.data[ind + 1] == 0 && data.data[ind + 2] == 0) {
                                this.buf[tInd] = 0;
                                this.buf[tInd + 1] = 0;
                                this.buf[tInd + 2] = 0;
                            }
                            else {
                                this.buf[tInd] = Math.floor(data.data[ind] + tr);
                                this.buf[tInd + 1] = Math.floor(data.data[ind + 1] + tg);
                                this.buf[tInd + 2] = Math.floor(data.data[ind + 2] + tb);
                            }
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_trans = function (data, x, y, opacity) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (opacity === void 0) { opacity = 1; }
        if (!data)
            return;
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    var tInd = ((x + i) + (y + j) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = Math.floor((this.buf[tInd] + data.data[ind] * opacity) / 2);
                        this.buf[tInd + 1] = Math.floor((this.buf[tInd + 1] + data.data[ind + 1] * opacity) / 2);
                        this.buf[tInd + 2] = Math.floor((this.buf[tInd + 2] + data.data[ind + 2] * opacity) / 2);
                        this.buf[tInd + 3] = Math.floor((this.buf[tInd + 3] + data.data[ind + 3] * opacity) / 2);
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var tInd = ((x + i) + (y + j) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                    }
                }
            }
        }
        return 1;
    };
    /**
     * temporarily disabled
     */
    NobsinCtx.prototype.drawImage_custom = function (data, x, y, func, arg) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        /*let tx = x+w;
        let ty = y+h;
        if(tx > this.right) w -= tx-this.right;
        if(w <= 0) return;
        if(ty > this.bottom) h -= ty-this.bottom;
        if(h <= 0) return;
    
        w -= this.widthOff;*/
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    var tInd = ((x + i) + (y + j) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        // func(this, tInd, ind, col, arg); //TO-DO - need this fix this line
                        //this.buf[tInd] = data.data[ind];
                        //this.buf[tInd+1] = data.data[ind+1];
                        //this.buf[tInd+2] = data.data[ind+2];
                        //this.buf[tInd+3] = data.data[ind+3];
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var tInd = ((x + i) + (y + j) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_smart = function (data, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (!data)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        /*let tx = x+w;
        let ty = y+h;
        if(tx > this.right) w -= tx-this.right;
        if(w <= 0) return;
        if(ty > this.bottom) h -= ty-this.bottom;
        if(h <= 0) return;
    
        w -= this.widthOff;*/
        //if(x+w > this.right-10) w = this.right-x-10;
        if (!this.flipX)
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = (i + j * w) * 4;
                    if (x + i < this.right && x + i >= 0) {
                        var tInd = ((x + i) + (y + j) * this.width) * 4;
                        if (data.data[ind + 3]) {
                            this.buf[tInd] = data.data[ind];
                            this.buf[tInd + 1] = data.data[ind + 1];
                            this.buf[tInd + 2] = data.data[ind + 2];
                            this.buf[tInd + 3] = data.data[ind + 3];
                        }
                    }
                }
            }
        else {
            for (var j = 0; j < h; j++) {
                for (var i = 0; i < w; i++) {
                    var ind = ((w - i - 1) + j * w) * 4;
                    var tInd = ((x + i) + (y + j) * this.width) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_basic_scale = function (data, x, y, sx, sy) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sx === void 0) { sx = 1; }
        if (sy === void 0) { sy = 1; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var right = Math.min(x + w * sx, this.width);
        var bottom = Math.min(y + h * sy, this.height);
        for (var j = Math.max(y, 0); j < bottom; j++) {
            for (var i = Math.max(x, 0); i < right; i++) {
                var ax = Math.floor((i - x) / sx);
                var ay = Math.floor((j - y) / sy);
                var aInd = (ax + ay * w) * 4;
                if (data.data[aInd + 3]) {
                    var ind = (i + j * this.width) * 4;
                    this.drawPixel_ind(ind, data.data[aInd], data.data[aInd + 1], data.data[aInd + 2], data.data[aInd + 3], false);
                }
            }
        }
    };
    NobsinCtx.prototype.drawImage_basic_rot = function (data, x, y, a, dep, srx, sry) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (a === void 0) { a = 0; }
        if (dep === void 0) { dep = 0; }
        if (srx === void 0) { srx = 0; }
        if (sry === void 0) { sry = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var srx2 = 1 - srx;
        var sry2 = 1 - sry;
        var ox = x + w * srx - 0.5;
        var oy = y + h * sry - 0.5;
        var lar = (Math.abs(w) > Math.abs(h) ? w : h) * this.sqrt2;
        var larSx = (srx < 0.5 ? srx2 : srx);
        var larSy = (sry < 0.5 ? sry2 : sry);
        var larS = (Math.abs(larSx) > Math.abs(larSy) ? larSx : larSy);
        var left = Math.round(ox - lar * larS);
        var right = Math.round(ox + lar * larS);
        var top = Math.round(oy - lar * larS);
        var bottom = Math.round(oy + lar * larS);
        //if(a < Math.PI/2 && a >= 0) left += w*(larSx-0.5)*2;
        //left += Math.floor((Math.cos(a-Math.PI/2)+0.5)*w*(larSx-0.5));
        for (var j = Math.max(top, 0); j < Math.min(bottom, this.height); j++) {
            for (var i = Math.max(left, 0); i < Math.min(right, this.width); i++) {
                //let li = i-ox;
                //let ji = j-oy;
                //let sx2 = sx;
                //let sy2 = sy;
                var fi = Math.floor(i);
                var fj = Math.floor(j);
                var ax = Math.round(Math.cos(a) * (fi - ox) - Math.sin(a) * (fj - oy) + ox - x);
                var ay = Math.round(Math.sin(a) * (fi - ox) + Math.cos(a) * (fj - oy) + oy - y);
                //this.setData(ind,[255,0,0,255]);
                if (ax < 0)
                    continue;
                if (ay < 0)
                    continue;
                if (ax >= w)
                    continue;
                if (ay >= h)
                    continue;
                var aInd = (ax + ay * w) * 4;
                //aInd = ((i-left)+(j-top)*w)*4;
                //if(Math.floor(Math.floor(performance.now())%100) <= 20) console.log("draw: ",ax,ay);
                //this.drawPixel_ind(ind,255,0,0,255,false);
                if (data.data[aInd + 3]) {
                    var ind = (i + j * this.width) * 4;
                    this.drawPixel_ind(ind, data.data[aInd], data.data[aInd + 1], data.data[aInd + 2], data.data[aInd + 3], false);
                }
            }
        }
    };
    NobsinCtx.prototype.drawImage_warp2_NOSXSY = function (data, x, y, sx, sy, a, dep, srx, sry) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sx === void 0) { sx = 1; }
        if (sy === void 0) { sy = 1; }
        if (a === void 0) { a = 0; }
        if (dep === void 0) { dep = 0; }
        if (srx === void 0) { srx = 0; }
        if (sry === void 0) { sry = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var srx2 = 1 - srx;
        var sry2 = 1 - sry;
        var ox = x + w * srx + 0.5;
        var oy = y + h * sry + 0.5;
        var lar = (Math.abs(w) > Math.abs(h) ? w : h) * this.sqrt2;
        var larSx = (srx < 0.5 ? srx2 : srx);
        var larSy = (sry < 0.5 ? sry2 : sry);
        var left = Math.floor(ox - lar * larSx);
        var right = Math.floor(ox + lar * larSx);
        var top = Math.floor(oy - lar * larSy);
        var bottom = Math.floor(oy + lar * larSy);
        //if(a < Math.PI/2 && a >= 0) left += w*(larSx-0.5)*2;
        //left += Math.floor((Math.cos(a-Math.PI/2)+0.5)*w*(larSx-0.5));
        for (var j = Math.max(top, 0); j < Math.min(bottom, this.height); j++) {
            for (var i = Math.max(left, 0); i < Math.min(right, this.width); i++) {
                var ax = Math.round(Math.cos(a) * (i - ox) - Math.sin(a) * (j - oy) + ox - x);
                var ay = Math.round(Math.sin(a) * (i - ox) + Math.cos(a) * (j - oy) + oy - y);
                var ind = (i + j * this.width) * 4;
                this.setData(ind, [255, 0, 0, 255]);
                if (ax < 0)
                    continue;
                if (ay < 0)
                    continue;
                if (ax >= w)
                    continue;
                if (ay >= h)
                    continue;
                var aInd = (ax + ay * w) * 4;
                //aInd = ((i-left)+(j-top)*w)*4;
                //if(Math.floor(Math.floor(performance.now())%100) <= 20) console.log("draw: ",ax,ay);
                //this.drawPixel_ind(ind,255,0,0,255,false);
                //if(data.data[aInd+3]){
                //let ind = (i+j*this.width)*4;
                this.drawPixel_ind(ind, data.data[aInd], data.data[aInd + 1], data.data[aInd + 2], data.data[aInd + 3], false);
                //}
            }
        }
    };
    NobsinCtx.prototype.drawImage_warp = function (data, x, y, sx, sy, a, dep, upright) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sx === void 0) { sx = 1; }
        if (sy === void 0) { sy = 1; }
        if (a === void 0) { a = 0; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
        //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
        if (this.useCam) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var srx = 0.5;
        var sry = 0.5;
        var srx2 = 1 - srx;
        var sry2 = 1 - sry;
        var hw = Math.floor(w * srx);
        var hh = Math.floor(h * sry);
        var ox = hw - 0.5;
        var oy = hh - 0.5;
        var lar = h > w ? h : w;
        var oox = lar - w;
        var ooy = lar - h;
        hw *= sx;
        hw = Math.floor(hw);
        hh *= sy;
        hh = Math.floor(hh);
        lar *= sx;
        lar *= sy;
        lar = Math.floor(lar);
        for (var jj = Math.floor(-ooy - lar / 2); jj < lar / sx + lar / 2; jj++) {
            for (var ii = Math.floor(-oox - lar / 2); ii < lar / sy + lar / 2; ii++) {
                var i = ii;
                var j = jj;
                //let dx = i-hw;
                //let dy = j-hh;
                //let dist = Math.sqrt(dx*dx+dy*dy);
                //if(dist <= lar/2+1){
                if (true) {
                    var xx = (x + i - hw);
                    var yy = (y + j - hh);
                    var fakeI = Math.floor(this.flipX ? lar / sy - i - 1 : i) / sx; //((w)-i-1)
                    //this makes larger pixels - fakeI = Math.floor(fakeI);
                    var fakeJ = j / sy; //j/2000 weird mechanic
                    var ax = Math.round(Math.cos(a) * (fakeI - ox) - Math.sin(a) * (fakeJ - oy) + ox);
                    var ay = Math.round(Math.sin(a) * (fakeI - ox) + Math.cos(a) * (fakeJ - oy) + oy);
                    //epic loading effect xx *= (this.flipX ? Math.floor(w/sx) : 1);
                    //if(this.flipX) xx = (x+((w)-i-2)-hw);
                    var iS = (xx + yy * this.width);
                    var tInd = iS * 4;
                    var ind = (ax + ay * w) * 4;
                    var doy = dep + (upright ? (h - j) : 0);
                    if (ax >= 0 && ax < w && ay >= 0 && ay < h)
                        if (data.data[ind + 3])
                            if (this.dep[iS] <= doy) {
                                this.dep[iS] = doy;
                                this.buf[tInd] = data.data[ind];
                                this.buf[tInd + 1] = data.data[ind + 1];
                                this.buf[tInd + 2] = data.data[ind + 2];
                                this.buf[tInd + 3] = data.data[ind + 3];
                                this.pixelCount++;
                                this.setPixelCol(iS);
                            }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_warp3D = function (data, x, y, sx, sy, aax, aay, aaz, dep, upright) {
        //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
        //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (sx === void 0) { sx = 1; }
        if (sy === void 0) { sy = 1; }
        if (aax === void 0) { aax = 0; }
        if (aay === void 0) { aay = 0; }
        if (aaz === void 0) { aaz = 0; }
        if (dep === void 0) { dep = 0; }
        if (upright === void 0) { upright = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        var ox = hw - 0.5;
        var oy = hh - 0.5;
        var lar = h > w ? h : w;
        var oox = lar - w;
        var ooy = lar - h;
        hw *= sx;
        hw = Math.floor(hw);
        hh *= sy;
        hh = Math.floor(hh);
        lar *= sx;
        lar *= sy;
        lar = Math.floor(lar);
        for (var jj = Math.floor(-ooy - lar / 2); jj < lar / sx + lar / 2; jj++) {
            for (var ii = Math.floor(-oox - lar / 2); ii < lar / sy + lar / 2; ii++) {
                var i = ii;
                var j = jj;
                //let dx = i-hw;
                //let dy = j-hh;
                //let dist = Math.sqrt(dx*dx+dy*dy);
                //if(dist <= lar/2+1){
                if (true) {
                    var xx = (x + i - hw);
                    var yy = (y + j - hh);
                    var fakeI = Math.floor(this.flipX ? lar / sy - i - 1 : i) / sx; //((w)-i-1)
                    //this makes larger pixels - fakeI = Math.floor(fakeI);
                    var fakeJ = j / sy; //j/2000 weird mechanic
                    var res = rot3D_s(fakeI, fakeJ, 0, ox, oy, 0, aax, aay, aaz);
                    //let ax = Math.round(Math.cos(a)*(fakeI-ox)-Math.sin(a)*(fakeJ-oy)+ox);
                    //let ay = Math.round(Math.sin(a)*(fakeI-ox)+Math.cos(a)*(fakeJ-oy)+oy);
                    var ax = Math.round(res[0]);
                    var ay = Math.round(res[1]);
                    //epic loading effect xx *= (this.flipX ? Math.floor(w/sx) : 1);
                    //if(this.flipX) xx = (x+((w)-i-2)-hw);
                    var iS = (xx + yy * this.width);
                    var tInd = iS * 4;
                    var ind = (ax + ay * w) * 4;
                    var doy = dep + (upright ? (h - j) : 0);
                    if (ax >= 0 && ax < w && ay >= 0 && ay < h)
                        if (data.data[ind + 3])
                            if (this.dep[iS] <= doy) {
                                this.dep[iS] = doy;
                                this.buf[tInd] = data.data[ind];
                                this.buf[tInd + 1] = data.data[ind + 1];
                                this.buf[tInd + 2] = data.data[ind + 2];
                                this.buf[tInd + 3] = data.data[ind + 3];
                                this.pixelCount++;
                                this.setPixelCol(iS);
                            }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_rot = function (data, x, y, a) {
        //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
        //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (a === void 0) { a = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        var ox = hw - 0.5;
        var oy = hh - 0.5;
        for (var j = 0; j < h; j++) {
            for (var i = 0; i < w; i++) {
                var xx = (x + i - hw);
                var yy = (y + j - hh);
                var ax = Math.round(Math.cos(a) * (i - ox) - Math.sin(a) * (j - oy) + ox);
                var ay = Math.round(Math.sin(a) * (i - ox) + Math.cos(a) * (j - oy) + oy);
                var iS = (xx + yy * this.width);
                var tInd = iS * 4;
                var ind = (ax + ay * w) * 4;
                if (data.data[ind + 3]) {
                    this.buf[tInd] = data.data[ind];
                    this.buf[tInd + 1] = data.data[ind + 1];
                    this.buf[tInd + 2] = data.data[ind + 2];
                    this.buf[tInd + 3] = data.data[ind + 3];
                    this.setPixelCol(iS);
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_rot2 = function (data, x, y, a) {
        //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
        //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (a === void 0) { a = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        var ox = hw - 0.5;
        var oy = hh - 0.5;
        var lar = h > w ? h : w;
        var oox = lar - w;
        var ooy = lar - h;
        for (var j = -ooy; j < lar; j++) {
            for (var i = -oox; i < lar; i++) {
                if (true) {
                    var xx = (x + i - hw);
                    var yy = (y + j - hh);
                    var ax = Math.round(Math.cos(a) * (i - ox) - Math.sin(a) * (j - oy) + ox);
                    var ay = Math.round(Math.sin(a) * (i - ox) + Math.cos(a) * (j - oy) + oy);
                    var iS = (xx + yy * this.width);
                    var tInd = iS * 4;
                    var ind = (ax + ay * w) * 4;
                    if (data.data[ind + 3]) {
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                        this.setPixelCol(iS);
                    }
                }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_dep = function (data, x, y, dep) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        for (var j = 0; j < w; j++) {
            for (var i = 0; i < h; i++) {
                var ind = (i + j * w) * 4;
                var xx = (x + i - hw);
                var yy = (y + j - hh);
                var tInd = (xx + yy * this.width) * 4;
                var dInd = xx + yy * this.width;
                if (data.data[ind + 3])
                    if (this.dep[dInd] <= dep) {
                        this.dep[dInd] = dep;
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                        this.pixelCount++;
                    }
            }
        }
        return 1;
    };
    NobsinCtx.prototype.drawImage_depMap = function (data, x, y, depMap, dep) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (dep === void 0) { dep = 0; }
        if (!depMap)
            return;
        x = Math.floor(x);
        y = Math.floor(y);
        var w = data.w;
        var h = data.h;
        if (w == 0)
            return;
        if (h == 0)
            return;
        if (!data.data)
            return;
        if (data.data.length == 0)
            return;
        var tx = x + w;
        var ty = y + h;
        if (tx > this.right)
            w -= tx - this.right;
        if (w <= 0)
            return;
        if (ty > this.bottom)
            h -= ty - this.bottom;
        if (h <= 0)
            return;
        var hw = Math.floor(w / 2);
        var hh = Math.floor(h / 2);
        for (var j = 0; j < w; j++) {
            for (var i = 0; i < h; i++) {
                var ind = (i + j * w) * 4;
                var xx = (x + i - hw);
                var yy = (y + j - hh);
                var dInd = xx + yy * this.width;
                var tInd = dInd * 4;
                var dep2 = depMap[ind] + depMap[ind + 1] * this.height + dep;
                if (data.data[ind + 3])
                    if (this.dep[dInd] <= dep2) {
                        this.dep[dInd] = dep2;
                        this.buf[tInd] = data.data[ind];
                        this.buf[tInd + 1] = data.data[ind + 1];
                        this.buf[tInd + 2] = data.data[ind + 2];
                        this.buf[tInd + 3] = data.data[ind + 3];
                        this.pixelCount++;
                    }
            }
        }
        return 1;
    };
    //set pixel and handle collision events
    /**
     * @deprecated
     */
    NobsinCtx.prototype.setPixelCol = function (iS, noSet) {
        if (iS === void 0) { iS = 0; }
        if (noSet === void 0) { noSet = false; }
        if (!this.objId)
            return;
        var pastId = this.objId[iS];
        var obj1 = this.rObjs[this.gObjId - 1];
        var hit = false;
        if (pastId)
            if (pastId != this.gObjId) {
                hit = true;
                var obj0 = this.rObjs[pastId - 1];
                if (obj0 == obj1)
                    return;
                if (obj0) {
                    if (!obj0.collision) {
                        if (obj0.onhit)
                            obj0.onhit(obj1);
                        obj0.collision = true;
                    }
                    if (!obj0.hit)
                        if (obj0.onhitenter)
                            obj0.onhitenter(obj1);
                    obj0.hit = true;
                }
                if (obj1) {
                    if (!obj1.collision) {
                        if (obj1.onhit)
                            obj1.onhit(obj0);
                        obj1.collision = true;
                    }
                    if (!obj1.hit)
                        if (obj1.onhitenter)
                            obj1.onhitenter(obj0);
                    obj1.hit = true;
                }
            }
            else if (false) {
                if (obj1.hit) {
                    obj1.hit = false;
                    if (obj1.onhitleave)
                        obj1.onhitleave();
                }
            }
        if (!noSet)
            this.objId[iS] = this.gObjId;
        return hit;
    };
    //TEXT
    NobsinCtx.prototype.drawLetter = function (l, x, y, c, border) {
        var d = letterData[l];
        if (!d)
            return;
        var row = 0;
        var collumn = 0;
        x--;
        y -= 2;
        if (border) {
            this.drawLine_smart(x - 1, y - 1, x + 3, y - 1, border, 1);
            this.drawLine_smart(x - 1, y + 5, x + 3, y + 5, border, 1);
            this.drawLine_smart(x - 1, y - 1, x - 1, y + 5, border, 1);
            this.drawLine_smart(x + 3, y - 1, x + 3, y + 5, border, 1);
        }
        for (var i = 0; i < d.length; i++) {
            if (d[i]) {
                row = Math.floor(i / 3);
                collumn = i % 3;
                this.setPixel(x + collumn, y + row, c);
            }
            else if (border) {
                row = Math.floor(i / 3);
                collumn = i % 3;
                this.setPixel(x + collumn, y + row, border);
            }
        }
    };
    NobsinCtx.prototype.drawLetter_custom = function (tData, l, x, y, c, border) {
        var data = tData;
        var d = tData[l];
        if (!d) {
            d = letterData[l];
            data = letterData;
        }
        if (!d)
            return;
        var row = 0;
        var collumn = 0;
        x--;
        y -= data.halfh;
        if (border) {
            this.drawLine_smart(x - 1, y - 1, x + data.rwidth, y - 1, border, 1);
            this.drawLine_smart(x - 1, y + data.height, x + data.rwidth, y + data.height, border, 1);
            this.drawLine_smart(x - 1, y - 1, x - 1, y + data.height, border, 1);
            this.drawLine_smart(x + data.rwidth, y - 1, x + data.rwidth, y + data.height, border, 1);
        }
        for (var i = 0; i < d.length; i++) {
            if (d[i]) {
                row = Math.floor(i / data.rwidth);
                collumn = i % data.rwidth;
                this.setPixel(x + collumn, y + row, c);
            }
            else if (border) {
                row = Math.floor(i / data.rwidth);
                collumn = i % data.rwidth;
                this.setPixel(x + collumn, y + row, border);
            }
        }
    };
    NobsinCtx.prototype.drawText = function (text, x, y, c, border, glow, centered, camera) {
        if (glow === void 0) { glow = false; }
        if (centered === void 0) { centered = true; }
        if (camera === void 0) { camera = false; }
        if (camera) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        var half = (text.length / 2 * 4);
        if (glow)
            this.drawCircle_grad(x, y, 8, [0, 0, 0, 220]);
        if (border === true)
            border = [0, 0, 0, c[3]];
        else if (border)
            border = [border[0], border[1], border[2], c[3]];
        for (var i = 0; i < text.length; i++) {
            this.drawLetter(text[i], x + i * 4 - (centered ? (half) : -2), y, c, border);
        }
    };
    NobsinCtx.prototype.drawText_custom = function (tData, text, x, y, c, border, glow, camera) {
        if (glow === void 0) { glow = false; }
        if (camera === void 0) { camera = false; }
        if (camera) {
            x -= this.camX;
            y -= this.camY;
            y += this.camZ;
        }
        if (glow)
            this.drawCircle_grad(x, y, 8, [0, 0, 0, 220]);
        if (border === true)
            border = [0, 0, 0, c[3]];
        else if (border)
            border = [border[0], border[1], border[2], c[3]];
        for (var i = 0; i < text.length; i++) {
            this.drawLetter_custom(tData, text[i], x + i * tData.width, y, c, border);
        }
    };
    //Compressed images
    NobsinCtx.prototype.drawCompressedImage = function (com, x, y) {
        var ind = (x + y * this.width) * 4;
        var tInd = 0;
        var ok = Object.keys(com.buf);
        for (var i = 0; i < ok.length; i++) {
            var k = ok[i];
            var d = com.buf[k];
            this.setData_dep(k, d[0], d[1]);
        }
    };
    return NobsinCtx;
}());
NobsinCtx.prototype.inits = [];
var valll = 0;
var BlendModes = {
    normal: 0,
    under: 1
};
function deepClone(ar) {
    if (!ar)
        return ar;
    if (typeof ar != "object")
        return ar;
    var ok = Object.keys(ar);
    var a = ar.length != null ? [] : {};
    for (var i = 0; i < ok.length; i++) {
        var k = ok[i];
        var val = ar[k];
        if (typeof val == "object")
            val = deepClone(val);
        a[k] = val;
    }
    return a;
}
//create trig tables
var TrigTable = {
    sin: new Float32Array(360),
    cos: new Float32Array(360)
};
for (var i = 0; i < 360; i++) {
    var a = i * Math.PI / 180;
    TrigTable.sin[i] = Math.sin(a);
    TrigTable.cos[i] = Math.cos(a);
}
var Trig = {
    sin: function (v) {
        v = Math.floor(v);
        v %= 360;
        if (v < 0)
            v = 360 + v;
        return TrigTable.sin[v] || 0;
    },
    cos: function (v) {
        v = Math.floor(v);
        v %= 360;
        if (v < 0)
            v = 360 + v;
        return TrigTable.cos[v] || 1;
    }
};
var NobsinTextureLoader = /** @class */ (function () {
    function NobsinTextureLoader() {
        var c = document.createElement("canvas");
        this.dummy = c.getContext("2d");
        this.buf = [];
        this.names = {};
    }
    /**
     *
     * @param {String} path URL of image
     * @param {Function} call Callback when loaded
     * @param {{}} atr Additional options
     * @returns
     */
    NobsinTextureLoader.prototype.load = function (path, call, atr) {
        if (atr === void 0) { atr = {}; }
        var img = new Image();
        var data = { img: img, data: null, loaded: false, w: 0, h: 0, dep: null };
        var ind = this.buf.length;
        this.buf[ind] = data;
        var name = 0;
        if (name == null)
            name = ind;
        this.names[name] = ind;
        //Access by: tl.buf[tl.names.char]
        img.src = "images/" + path;
        var dummy = this.dummy;
        img.onload = function () {
            data.loaded = true;
            var img = data.img;
            data.w = img.width;
            data.h = img.height;
            dummy.canvas.width = img.width;
            dummy.canvas.height = img.height;
            dummy.drawImage(img, 0, 0);
            data.data = dummy.getImageData(0, 0, img.width, img.height).data;
            // @ts-ignore
            if (call)
                call(data);
        };
        //atr
        // @ts-ignore
        if (atr.depMap) {
            // @ts-ignore
            data.dep = this.load(atr.depMap /*,name+"_dep"*/);
        }
        //
        return data;
    };
    /**
     *
     * @param {String} url URL of image
     * @param {Number} cw Cell width
     * @param {Number} ch Cell height
     * @param {Function} call Callback when loaded
     * @param {{}} atr Addition options
     * @returns
     */
    NobsinTextureLoader.prototype.loadAnim = function (url, cw, ch, call, atr) {
        if (atr === void 0) { atr = {}; }
        var name = "";
        var t = this;
        var list = [];
        var img = this.load(url, function (d) {
            var sw = Math.floor(d.w / cw);
            for (var ii = 0; ii < sw; ii++) { //loop through frames found
                var dat = new Uint8ClampedArray(cw * ch * 4);
                for (var j = 0; j < ch; j++) {
                    for (var i = 0; i < cw; i++) {
                        var xx = i + ii * cw;
                        var ind = (i + j * cw) * 4;
                        var indF = (xx + j * d.w) * 4;
                        dat[ind] = d.data[indF];
                        dat[ind + 1] = d.data[indF + 1];
                        dat[ind + 2] = d.data[indF + 2];
                        dat[ind + 3] = d.data[indF + 3];
                    }
                }
                if (name)
                    t.names[name + "_" + ii] = t.buf.length;
                var dd = { w: cw, h: ch, loaded: true, data: dat, img: null, dep: null };
                t.buf[t.buf.length] = dd;
                list.push(dd);
                // @ts-ignore
                if (atr.rev) { //also create anim in reverse
                    // @ts-ignore
                    list.rev.splice(0, 0, dd);
                }
            }
            // @ts-ignore
            if (atr.rubberband) { //go forwards and back through anim
                var l = list.length - 1;
                for (var i = 1; i < l; i++) {
                    list.push(list[l - i]);
                }
            }
            //this.buf[this.buf.length] = 
        });
        // @ts-ignore
        if (atr.delay)
            list.delay = atr.delay;
        // @ts-ignore
        if (atr.rev) { //also create anim in reverse
            // @ts-ignore
            list.rev = []; //deepClone(list).reverse()
        }
        return list;
    };
    return NobsinTextureLoader;
}());
var tl = new NobsinTextureLoader();
//var imgA = tl.load("char.png","char",null,{depMap:"char_dep.png"});
//var imgB = tl.load("char2.png","char2");
//var testAnim = tl.loadAnim("anim.png","anim",8,8);
//var slicerImg = tl.load("enemies/schlom.png");
//Rotation math functions
function rot2D(x, y, ox, oy, a) {
    return [
        Math.cos(a) * (x - ox) - Math.sin(a) * (y - oy) + ox,
        Math.sin(a) * (x - ox) + Math.cos(a) * (y - oy) + oy
    ];
}
function rot3D(x, y, z, ox, oy, oz, ax, ay, az) {
    //global rotation around x
    var r = rot2D(y, z, oy, oz, ax);
    y = r[0];
    z = r[1];
    //global rotation around y
    r = rot2D(x, z, ox, oz, ay);
    x = r[0];
    z = r[1];
    //global rotation around z
    r = rot2D(x, y, ox, oy, az);
    x = r[0];
    y = r[1];
    return [x, y, z];
}
function rot3D_s(x, y, z, ox, oy, oz, ax, ay, az) {
    //global rotation around x
    var r = rot2D(y, z, oy, oz, ax);
    y = r[0];
    z = r[1];
    //global rotation around y
    r = rot2D(x, z, ox, oz, ay);
    x = r[0];
    z = r[1];
    //global rotation around z
    r = rot2D(x, y, ox, oy, az);
    x = r[0];
    y = r[1];
    return [x, y - z / 2];
}
//Multiple canvas helpers
//This should not be used to create the main this context or contexts that are perminent as it uses slightly more memory, can be more annoying to work with on a larger scale, and can be slower with thousands of draw calls. The registerNob2 function creates temporary small canvases that will constantly resized and redrawn to. These are used for layering rotation effects for images, making a parent child system or doing image effects on a small set of data.
//Using an ID allows you to constantly call the registerNob2 function when you need the canvas, it will be saved based on the unique id. All the contextes are generated on the first call and after that they are just received. Although it is still faster to save this in a variable and directly access your context by reference. 
/*
Ex:
 
  //slower but can be useful
  {
    let _nob = registerNob2("_nob",4,4); //this is in your restricted scope and is called millions of times.
    _nob.draw...
  }
 
  //faster but can be annoying and tedious
  var _nob = registerNob2(null,4,4); //this is somewhere in the global scope and is only called once. ID is not necessary.
  {
    _nob.draw...
  }
    
 
*/
//Convert this context to image
//this is slow because of js object creation, store and get from reference.
function fromNob(_nob) {
    return {
        loaded: true, w: _nob.width, h: _nob.height,
        data: _nob.buf
    };
}
var RegisteredNob = /** @class */ (function () {
    function RegisteredNob(c, n) {
        this.c = c;
        this.nob = n;
    }
    return RegisteredNob;
}());
var nob2nds = [];
var nob2Ref = {};
function registerNob(id, w, h) {
    if (w === void 0) { w = 1; }
    if (h === void 0) { h = 1; }
    if (id != null)
        if (nob2Ref[id]) {
            var n = nob2Ref[id];
            if (n["this"].width != w || n["this"].height != h) {
                n.c.width = w;
                n.c.height = h;
                var no = n["this"];
                no.width = w;
                no.height = h;
                no.right = w - 1;
                no.bottom = h - 1;
                no.centerX = Math.floor(w / 2);
                no.centerY = Math.floor(h / 2);
                var ssize = w * h;
                var size = ssize * 4;
                no.buf = new Uint8ClampedArray(size);
                no.dep = new Uint8ClampedArray(ssize);
                //n.this = new NobsinCtx(n.c.getContext("2d"));
            }
            return n;
        }
    var _c = document.createElement("canvas");
    _c.width = w;
    _c.height = h;
    var _ctx = _c.getContext("2d");
    if (!_ctx)
        return;
    var _nob = new NobsinCtx(_ctx);
    _nob.pixelCount = 0;
    _nob.buf = new Uint8ClampedArray(_nob.size);
    _nob.dep = new Uint8ClampedArray(_nob.ssize);
    var d = new RegisteredNob(_c, _nob);
    if (id != null)
        nob2Ref[id] = d;
    nob2nds.push(d);
    return d;
}
function freeNob(data) {
    nob2nds.splice(nob2nds.indexOf(data), 1);
    // delete data;
}
function registerNob2(id, w, h) {
    if (w === void 0) { w = 1; }
    if (h === void 0) { h = 1; }
    if (id != null)
        if (nob2Ref[id])
            return nob2Ref[id];
    var _c = document.createElement("canvas");
    _c.width = w * 3;
    _c.height = h * 3;
    var _ctx = _c.getContext("2d");
    if (!_ctx)
        return;
    var _nob = new NobsinCtx(_ctx);
    _nob.pixelCount = 0;
    _nob.buf = new Uint8ClampedArray(_nob.size);
    _nob.dep = new Uint8ClampedArray(_nob.ssize);
    var d = new RegisteredNob(_c, _nob);
    if (id != null)
        nob2Ref[id] = d;
    nob2nds.push(d);
    return d;
}
/* //Test code that uses this functionality from scratch
let _c = document.createElement("canvas");
let img = tt.weapons.doublesaber.main;
let nw = img.w*3;
let nh = img.h*3;
_c.width = nw;
_c.height = nh;
let _ctx = _c.getContext("2d");
let _nob = new NobsinCtx(_ctx);
_nob.pixelCount = 0;
_nob.buf = new Uint8ClampedArray(_nob.size);
_nob.dep = new Uint8ClampedArray(_nob.ssize);
let aa = performance.now()/50;
_nob.drawImage_warp(img,_nob.centerX,_nob.centerY,1,0.5,aa,0,false);
this.drawImage_warp({
  w:nw,h:nh,loaded:true,
  data:_nob.buf
},this.centerX,this.centerY+20,1,1,Math.PI/4,0,false);
*/
/* //This uses the new functions but produces the same result with better performance
let _nob = registerNob2("nob1",1,1);
let aa = performance.now()/50;
_nob.drawImage_warp(img,_nob.centerX,_nob.centerY,1,0.5,aa,0,false);
this.drawImage_warp(fromNob(_nob),this.centerX,this.centerY+20,1,1,Math.PI/4,0,false);
*/
/**
 * ~~~~~~~~~~~~~~~~
 * COLOR CONVERTERS
 * ~~~~~~~~~~~~~~~~
 */
//color coverter static
var cc_st = {
    dummy: document.createElement("canvas"),
    // @ts-ignore
    c: null
};
cc_st.c = cc_st.dummy.getContext("2d");
cc_st.dummy.width = 1;
cc_st.dummy.height = 1;
function convert(color) {
    cc_st.c.clearRect(0, 0, 1, 1);
    cc_st.c.fillStyle = color;
    cc_st.c.fillRect(0, 0, 1, 1);
    return cc_st.c.getImageData(0, 0, 1, 1).data;
}
/**
 * ~~~~~~~~~~~~~~~~
 * SUBSCRIBE EVENTS
 * ~~~~~~~~~~~~~~~~
 * added 7-8-21 from Inter-Shooter 4 project
 */
var Evt = /** @class */ (function () {
    function Evt(i, t, f, inc) {
    }
    return Evt;
}());
var subEvt = [];
var subEvtLate = [];
function subAnim(t, f, i, late) {
    if (i === void 0) { i = 1; }
    if (late === void 0) { late = false; }
    if (!late) {
        subEvt.push(new Evt(0, t, f, i));
        return subEvt[subEvt.length - 1];
    }
    else {
        subEvtLate.push(new Evt(0, t, f, i));
        return subEvtLate[subEvtLate.length - 1];
    }
}
function clearEvt(e) {
    var i = subEvt.indexOf(e);
    if (i != -1)
        subEvt.splice(i, 1);
    else {
        i = subEvtLate.indexOf(e);
        if (i != -1)
            subEvtLate.splice(i, 1);
    }
}
function updateEvts() {
    var subList = [];
    for (var i = 0; i < subEvt.length; i++) {
        subList.push(subEvt[i]);
    }
    for (var i = 0; i < subList.length; i++) {
        var e = subList[i];
        e[2](e[0], e[1], e);
        e[0] += e[3];
        if (e[0] >= e[1]) {
            subEvt.splice(subEvt.indexOf(e), 1);
        }
    }
}
/**
 * ~~~~~~~~~~~~~~~~~
 * DRAW TEXT/NUMBERS
 * ~~~~~~~~~~~~~~~~~
 * added 7-8-21, brand new feature
 */
var letterDataWide = {
    width: 6,
    height: 5,
    halfh: 2,
    rwidth: 5,
    "H": [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1
    ],
    "W": [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 1, 0, 1,
        1, 1, 0, 1, 1,
        1, 0, 0, 0, 1
    ],
    //special characters
    "u": [
        0, 0, 1, 0, 0,
        0, 1, 1, 1, 0,
        1, 1, 1, 1, 1,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0
    ],
    "d": [
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0,
        1, 1, 1, 1, 1,
        0, 1, 1, 1, 0,
        0, 0, 1, 0, 0
    ]
};
var letterData = {
    width: 4,
    height: 5,
    halfh: 2,
    rwidth: 3,
    0: [
        1, 1, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 1, 1
    ],
    1: [
        1, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        1, 1, 1
    ],
    2: [
        1, 1, 1,
        0, 0, 1,
        1, 1, 1,
        1, 0, 0,
        1, 1, 1
    ],
    3: [
        1, 1, 1,
        0, 0, 1,
        0, 1, 1,
        0, 0, 1,
        1, 1, 1
    ],
    4: [
        1, 0, 1,
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,
        0, 0, 1
    ],
    5: [
        1, 1, 1,
        1, 0, 0,
        1, 1, 1,
        0, 0, 1,
        1, 1, 1
    ],
    6: [
        1, 1, 1,
        1, 0, 0,
        1, 1, 1,
        1, 0, 1,
        1, 1, 1
    ],
    7: [
        1, 1, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ],
    8: [
        1, 1, 1,
        1, 0, 1,
        1, 1, 1,
        1, 0, 1,
        1, 1, 1
    ],
    9: [
        1, 1, 1,
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,
        0, 0, 1
    ],
    "/": [
        0, 0, 1,
        0, 0, 1,
        0, 1, 0,
        0, 1, 0,
        1, 0, 0
    ],
    "A": [
        1, 1, 1,
        1, 0, 1,
        1, 1, 1,
        1, 0, 1,
        1, 0, 1
    ],
    "B": [
        1, 1, 1,
        1, 0, 1,
        1, 1, 0,
        1, 0, 1,
        1, 1, 1
    ],
    "C": [
        1, 1, 1,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 1, 1
    ],
    "D": [
        1, 1, 0,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 1, 0
    ],
    "E": [
        1, 1, 1,
        1, 0, 0,
        1, 1, 0,
        1, 0, 0,
        1, 1, 1
    ],
    "F": [
        1, 1, 1,
        1, 0, 0,
        1, 1, 0,
        1, 0, 0,
        1, 0, 0
    ],
    "G": [
        1, 1, 1,
        1, 0, 0,
        1, 0, 1,
        1, 0, 1,
        1, 1, 1
    ],
    "H": [
        1, 0, 1,
        1, 0, 1,
        1, 1, 1,
        1, 0, 1,
        1, 0, 1
    ],
    "I": [
        1, 1, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        1, 1, 1
    ],
    "J": [
        1, 1, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        1, 1, 0
    ],
    "K": [
        1, 0, 1,
        1, 0, 1,
        1, 1, 0,
        1, 0, 1,
        1, 0, 1
    ],
    "L": [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 1, 1
    ],
    "M": [
        1, 0, 1,
        1, 1, 1,
        1, 1, 1,
        1, 0, 1,
        1, 0, 1
    ],
    "N": [
        1, 0, 1,
        1, 1, 1,
        1, 1, 1,
        1, 1, 1,
        1, 0, 1
    ],
    "O": [
        0, 1, 0,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        0, 1, 0
    ],
    "P": [
        1, 1, 0,
        1, 0, 1,
        1, 1, 0,
        1, 0, 0,
        1, 0, 0
    ],
    "Q": [
        0, 1, 0,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        0, 1, 1
    ],
    "R": [
        1, 1, 0,
        1, 0, 1,
        1, 1, 0,
        1, 0, 1,
        1, 0, 1
    ],
    "S": [
        0, 1, 1,
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        1, 1, 0
    ],
    "T": [
        1, 1, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ],
    "U": [
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 1, 1
    ],
    "V": [
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        0, 1, 0
    ],
    "W": [
        1, 0, 1,
        1, 0, 1,
        1, 1, 1,
        1, 1, 1,
        1, 0, 1
    ],
    "X": [
        1, 0, 1,
        1, 0, 1,
        0, 1, 0,
        1, 0, 1,
        1, 0, 1
    ],
    "Y": [
        1, 0, 1,
        1, 0, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ],
    "Z": [
        1, 1, 1,
        0, 0, 1,
        0, 1, 0,
        1, 0, 0,
        1, 1, 1
    ],
    " ": [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ],
    "+": [
        0, 0, 0,
        0, 1, 0,
        1, 1, 1,
        0, 1, 0,
        0, 0, 0
    ],
    "-": [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1,
        0, 0, 0,
        0, 0, 0
    ],
    ":": [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ],
    "|": [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ],
    //0.1.7 symbols
    ",": [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 1, 0,
        0, 1, 0
    ],
    ".": [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 1, 0
    ],
    ";": [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0,
        0, 1, 0,
        0, 1, 0
    ],
    "'": [
        0, 1, 0,
        0, 1, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ],
    '"': [
        1, 0, 1,
        1, 0, 1,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ],
    "=": [
        0, 0, 0,
        1, 1, 1,
        0, 0, 0,
        1, 1, 1,
        0, 0, 0
    ],
    "?": [
        1, 1, 1,
        0, 0, 1,
        0, 1, 1,
        0, 0, 0,
        0, 1, 0
    ],
    "!": [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 0, 0,
        0, 1, 0
    ],
    "*": [
        1, 0, 1,
        0, 1, 0,
        1, 0, 1,
        0, 0, 0,
        0, 0, 0
    ],
    "(": [
        0, 1, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        0, 1, 0
    ],
    ")": [
        0, 1, 0,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 1, 0
    ],
    "[": [
        1, 1, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 1, 0
    ],
    "]": [
        0, 1, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 1, 1
    ],
    //SPECIAL SHAPES
    "l": [
        0, 0, 1,
        0, 1, 1,
        1, 1, 1,
        0, 1, 1,
        0, 0, 1
    ],
    "r": [
        1, 0, 0,
        1, 1, 0,
        1, 1, 1,
        1, 1, 0,
        1, 0, 0
    ],
    "u": [
        0, 1, 0,
        1, 1, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ]
};
function createCompressedImage() {
    var buf = {};
    for (var i = 0; i < this.size; i += 4) {
        if (this.buf[i + 3]) {
            if (!buf[i])
                buf[i] = [];
            buf[i].push([[this.buf[i], this.buf[i + 1], this.buf[i + 2], 255], this.dep[i]]);
        }
    }
    var d = {
        w: this.width,
        h: this.height,
        buf: buf
    };
    return d;
}
//BEZIERS (9-2-22 - a1.3.0 (qs))
function drawBezier(nob1, bez, x, y, dep) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (dep === void 0) { dep = 0; }
    bez.list = [];
    for (var i1 = 0; i1 < 1; i1 += 0.01) {
        _drawBez(nob1, bez, i1, x, y); //, dep);
    }
    for (var j = 0; j < bez.list.length; j++) {
        var c = bez.list[j];
        var c1 = bez.list[j + 1];
        if (!c1)
            break;
        nob1.drawLine_smart_dep(c[0], c[1], c1[0], c1[1], bez.col, bez.w, dep);
    }
}
function _drawBez(nob, bez, i, xx, yy) {
    if (xx === void 0) { xx = 0; }
    if (yy === void 0) { yy = 0; }
    var t = bez;
    if (true /**doShake */)
        for (var j = 0; j < t.c.length; j++) {
            var c = t.c[j];
            if (c[2] == null)
                c[2] = c[0];
            if (c[3] == null)
                c[3] = c[1];
            var ang = performance.now() / 300 + j;
            var r = 0; //shake; //2
            c[0] = c[2] + Math.cos(ang) * r + xx;
            c[1] = c[3] + Math.sin(ang) * r + yy;
        }
    var mids = deepClone(t.c);
    var times = t.c.length;
    var lvl = 0;
    var col = [
        [255, 0, 0, 50],
        [255, 200, 0, 50],
        [255, 255, 0, 50],
        [0, 100, 0, 50],
        [0, 0, 255, 50],
        [200, 50, 220, 50],
        [0, 0, 0, 255]
    ];
    function ss() {
        var ar = [];
        for (var j = 0; j < mids.length - 1; j++) {
            var m = mids[j];
            var nm = mids[j + 1];
            if (!nm) {
                console.log("no nm");
                continue;
            }
            var color = col[lvl];
            var fm = mids[j + 2];
            if (!fm) {
                if (mids.length == 2) {
                    // lvl--;
                    var mid_1 = doMid(this, i, m[0], m[1], nm[0], nm[1]);
                    ar.push(mid_1);
                    color = col[lvl];
                    drawRectc(mid_1[0], mid_1[1], 2, color);
                }
                {
                    lvl++;
                    for (var j1 = 0; j1 < ar.length; j1++) {
                        var c = ar[j1];
                        drawRectc(c[0], c[1], 2, col[lvl]);
                    }
                    mids = ar;
                    lvl++;
                    if (mids.length == 1) {
                        t.list.push(ar[0]);
                    }
                    if (lvl > times) {
                        //list.push(ar[0]);
                        continue;
                    }
                    ss();
                }
                break;
            }
            drawRectc(m[0], m[1], 1, color);
            drawRectc(nm[0], nm[1], 1, color);
            drawRectc(fm[0], fm[1], 1, color);
            var d = doLine(nob, i, m[0], m[1], nm[0], nm[1]);
            var qx = d.qx;
            var qy = d.qy;
            d = doLine(this, i, nm[0], nm[1], fm[0], fm[1]);
            var qx1 = d.qx;
            var qy1 = d.qy;
            var mid = doMid(nob, i, qx, qy, qx1, qy1);
            color = col[lvl];
            drawRectc(qx, qy, 2, color);
            drawRectc(qx1, qy1, 2, color);
            ar.push(mid);
        }
    }
    ss();
}
function nobCreateBezier(c, w, col) {
    return {
        w: w,
        c: c,
        col: col,
        list: []
    };
}
var _drawBezDebug = false;
var _bezLightgreen = [200, 255, 200, 220];
var _bezGray = [200, 200, 200, 50];
function drawRectc(x, y, w, c, over) {
    if (c === void 0) { c = COLORS.black; }
    if (over === void 0) { over = false; }
    if (!over)
        if (!_drawBezDebug)
            return;
    if (w == 1)
        this.setPixel(x, y, c);
    this.drawRect(x - Math.floor(w / 2), y - Math.floor(w / 2), w, w, c);
}
function getAng(x, y, x1, y1) {
    var dx = x1 - x;
    var dy = y1 - y;
    return Math.atan2(dy, dx);
}
function doLine(nob, i, x, y, tx, ty) {
    var dx1 = tx - x;
    var dy1 = ty - y;
    var dist1 = Math.sqrt(Math.pow(dx1, 2) + Math.pow(dy1, 2));
    var ang1 = Math.atan2(dy1, dx1);
    var q0x = x + Math.cos(ang1) * dist1 * i;
    var q0y = y + Math.sin(ang1) * dist1 * i;
    if (_drawBezDebug)
        nob.drawLine_smart(x, y, tx, ty, _bezGray, 1);
    return {
        qx: q0x,
        qy: q0y
    };
}
function doMid(nob, i, sx, sy, tx, ty) {
    if (_drawBezDebug)
        nob.drawLine_smart(sx, sy, tx, ty, _bezLightgreen, 1);
    var dx = tx - sx;
    var dy = ty - sy;
    var x = sx + dx * i;
    var y = sy + dy * i;
    return [x, y];
}
//STATIC COLORS
var COLORS = {
    red: [255, 0, 0, 255],
    green: [0, 255, 0, 255],
    blue: [0, 0, 255, 255],
    black: [0, 0, 0, 255],
    white: [255, 255, 255, 255],
    orange: convert("orange")
};
export { NobsinCtx, NobsinTextureLoader, nobCreateBezier, drawBezier, Evt, updateEvts, subEvt, subAnim, COLORS };
