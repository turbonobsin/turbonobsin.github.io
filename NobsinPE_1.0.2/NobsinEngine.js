/*
 * WELCOME TO THE NOBSIN ENGINE
 *	- the insanely fast per-pixel CPU renderer
 *
 * AUTHORS: Turbo Nobsin
 *
 * VERSION: a1.3.0
 * DATE: 9-2-22
 * Last Update: 8-30-21
 *
 * WHATS NEW?
 *  - Added DrawBezier Functionality
 */

 class NobsinCtx{
    constructor(ctx){
      this.ctx = ctx;
      ctx.imageSmoothingEnabled = false;
  
      let can = ctx.canvas;
      this.can = can;
      //can.width = 250;
      this.centerX = Math.floor(can.width/2);
      this.centerY = Math.floor(can.height/2);
      this.right = can.width-1;
      this.bottom = can.height-1;
  
      this.ssize = can.width*can.height;
      this.size = this.ssize*4;
      this.width = can.width;
      this.height = can.height;
  
      for(let i = 0; i < this.inits.length; i++){
        this.inits[i](this);
      }
  
      this.checkColArr = [];
      //this.background = [128,128,128,255];
      this.background = [48,48,48,255];
      //this.data = new ImageData(this.width,this.height);
    }
    ctx;
    buf;
    dep;
    data;
    size;
    ssize;
    width;
    height;
    background;
    
    centerX;
    centerY;
    right;
    bottom;
  
    blendMode = 0;
    pixelCount = 0;
  
    camX = 0;
    camY = 0;
    camZ = 0;
    useCam = false;
    useRecord = false;
    useIndRestriction = false;
    pMap = new Map();
    recMap;
    useNewRec = false;
    newRecMap = new Map();
    initRec(){
      this.useNewRec = true;
      this.newRecMap = new Map();
    }
    finishRec(){
      this.useNewRec = false;
      this.pixelCount = 0;
      this.dep = new Uint8ClampedArray(this.ssize);
      return this.newRecMap;
    }
  
    resize(w,h){
      if(useRecord){
        recMap = new Uint8ClampedArray(this.ssize);
      }
    }
  
    isFree(x,y){
      if(x < 0) return;
      if(y < 0) return;
      if(x >= nob.width) return;
      if(y >= nob.height) return;
      let ind = (x+y*this.width)*4;
      if(this.buf[ind+3] != 0) return;
      return true;
    }
    setData(ind,col){ //set pixel at index
      if(ind == null) return;
      ind = Math.floor(ind);
      this.buf[ind] = col[0];
      this.buf[ind+1] = col[1];
      this.buf[ind+2] = col[2];
      this.buf[ind+3] = col[3];
      this.pixelCount++;
      return 1;
    }
    setData2(ind,r,g,b,a){ //set pixel at index
      if(ind == null) return;
      ind = Math.floor(ind);
      this.buf[ind] = r;
      this.buf[ind+1] = g;
      this.buf[ind+2] = b;
      this.buf[ind+3] = a;
      this.pixelCount++;
      return 1;
    }
    setData_dep(ind,col,dep){
      if(ind == null) return;
      ind = Math.floor(ind);
      let i = Math.floor(ind/4);
      if(this.dep[i] <= dep){
        this.dep[i] = dep;
        this.buf[ind] = col[0];
        this.buf[ind+1] = col[1];
        this.buf[ind+2] = col[2];
        this.buf[ind+3] = 255;
        this.pixelCount++;
      }
    }
    setPixel(x=0,y=0,col){
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      if(x < 0) return;
      if(x > this.right) return;
      if(y < 0) return;
      if(y > this.bottom) return;
      
      //i Simple
      let iS = x+y*this.width;
      let i = iS*4;
      if(!col){
        this.buf[i] = 0;
        this.buf[i+1] = 0;
        this.buf[i+2] = 0;
        this.buf[i+3] = 255;
      }
      else{
        this.buf[i] = col[0];
        this.buf[i+1] = col[1];
        this.buf[i+2] = col[2];
        this.buf[i+3] = col[3];
  
        //this.setPixelCol(iS);
      }
      this.pixelCount++;
      return 1;
    }
    setPixel_ex(ind,col,a=255){
      ind = Math.floor(ind);
      if(col[3] == 0){
        this.buf[ind] = 0;
        this.buf[ind+1] = 0;
        this.buf[ind+2] = 0;
        this.buf[ind+3] = 0;
      }
      else if(col[3] == 255){
        this.buf[ind] = col[0];
        this.buf[ind+1] = col[1];
        this.buf[ind+2] = col[2];
        this.buf[ind+3] = 255;
      }
      else{
        if(this.buf[ind+3] == 0){
          this.buf[ind] = this.background[0];
          this.buf[ind+1] = this.background[1];
          this.buf[ind+2] = this.background[2];
          this.buf[ind+3] = this.background[3];
        }
        let o = col[3]/255;
        this.buf[ind] += (this.buf[ind]+col[0])*o;
        this.buf[ind+1] += (this.buf[ind+1]+col[1])*o;
        this.buf[ind+2] += (this.buf[ind+2]+col[2])*o;
        if(this.transparentBg) this.buf[ind+3] = col[3];
        else this.buf[ind+3] = a; // = col[3] awesome effect
      }
      this.pixelCount++;
    }
    setPixel_blend(x=0,y=0,col,a=1){
      x = Math.floor(x);
      y = Math.floor(y);
      if(x < 0) return;
      if(x > this.right) return;
      if(y < 0) return;
      if(y > this.bottom) return;
      
      //i Simple
      let iS = x+y*this.width;
      let i = iS*4;
      if(!col){
        this.buf[i] = 0;
        this.buf[i+1] = 0;
        this.buf[i+2] = 0;
        this.buf[i+3] = 255;
      }
      else{
        this.buf[i] = Math.floor((this.buf[i]+col[0])/2*a);
        this.buf[i+1] = Math.floor((this.buf[i+1]+col[1])/2*a);
        this.buf[i+2] = Math.floor((this.buf[i+2]+col[2])/2*a);
        this.buf[i+3] = Math.floor((this.buf[i+3]+col[3])/2);
      }
      this.pixelCount++;
      return 1;
    }
    setPixel_dep(x=0,y=0,col,dep=0){
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      if(x < 0) return;
      if(x > this.right) return;
      if(y < 0) return;
      if(y > this.bottom) return;
  
      let iD = x+y*this.width;
      let i = iD*4;
      if(this.dep[iD] <= dep){
        this.dep[iD] = dep;
        if(!col){
          this.buf[i] = 0;
          this.buf[i+1] = 0;
          this.buf[i+2] = 0;
          this.buf[i+3] = 255;
        }
        else{
          this.buf[i] = col[0];
          this.buf[i+1] = col[1];
          this.buf[i+2] = col[2];
          this.buf[i+3] = col[3];
        }
        this.pixelCount++;
      }
      return 1;
    }
  
    setPixelSize(x,y,w,col){
      x = Math.floor(x);
      y = Math.floor(y);
      w = Math.floor(w);
  
      let h = Math.floor(w/2);
      for(let xx = -h; xx <= h; xx++){
        for(let yy = -h; yy <= h; yy++){
          this.setPixel(x+xx,y+yy,col);
        }
      }
      return 1;
    }
  
    setPixelSize_smart(x,y,w,col){
      if(!col) return;
      x = Math.floor(x);
      y = Math.floor(y);
      w = Math.floor(w);
  
      let half = Math.floor(w/2);
      x -= half;
      y -= half;
      let h = w;
      if(x < 0){
        w += x;
        if(w <= 0) return;
        x = 0;
      }
      let lx = x+w;
      if(lx > this.right){
        w += this.right-lx;
        if(w <= 0) return;
      }
      if(y < 0){
        h += y;
        if(h <= 0) return;
        y = 0;
      }
      let ly = y+h;
      if(ly > this.bottom){
        h += this.bottom-ly;
        if(h <= 0) return;
      }
  
      let ind = (x+y*this.width)*4;
      for(let j = 0; j < h; j++){
        let f1 = ind+j*this.width*4;
        for(let i = 0; i < w; i++){
          let f = f1+i*4;
          switch(this.blendMode){
            case 0:
              if(col){
                this.buf[f] = col[0];
                this.buf[f+1] = col[1];
                this.buf[f+2] = col[2];
                this.buf[f+3] = col[3];
              }
              else{
                this.buf[f] = 0;
                this.buf[f+1] = 0;
                this.buf[f+2] = 0;
                this.buf[f+3] = 255;
              }
              this.pixelCount++;
              break;
            case 1:
              if(this.buf[f] == 0 && this.buf[f+1] == 0 && this.buf[f+2] == 0 && this.buf[f+3] == 0){
                this.buf[f] = col[0];
                this.buf[f+1] = col[1];
                this.buf[f+2] = col[2];
                this.buf[f+3] = col[3];
              }
              this.pixelCount++;
              break;
          }
        }
      }
      return 1;
    }
    checkColArr;
    checkRectCol(p,x,y,w,h,call,id){
      this.checkColArr.push([this.checkRectCol_func,call,id,p,x,y,w,h]);
    }
    checkRectCol_func(ref,x,y,w,h){
      x = Math.floor(x);
      y = Math.floor(y);
      w = Math.floor(w);
      h = Math.floor(h);
  
      let half = Math.floor(w/2);
      let halfh = Math.floor(h/2);
      x -= half;
      y -= halfh;
      if(x < 0){
        w += x;
        if(w <= 0) return;
        x = 0;
      }
      let lx = x+w;
      if(lx > ref.right){
        w += ref.right-lx;
        if(w <= 0) return;
      }
      if(y < 0){
        h += y;
        if(h <= 0) return;
        y = 0;
      }
      let ly = y+h;
      if(ly > ref.bottom){
        h += ref.bottom-ly;
        if(h <= 0) return;
      }
  
      let hit = false;
      let ind = (x+y*ref.width)*4;
      for(let j = 0; j < h; j++){
        let f1 = ind+j*ref.width*4;
        for(let i = 0; i < w; i++){
          let f = f1+i*4;
          let res = ref.setPixelCol(Math.floor(f/4),true);
          if(res) hit = true;
        }
      }
      return (hit ? 2 : 1);
    }
    drawRect_fast(x1,y1,r,col){
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x1+y1*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        for(let i = 0; i < d; i++){
          this.buf[ind] = col[0];
          this.buf[ind+1] = col[1];
          this.buf[ind+2] = col[2];
          this.buf[ind+3] = col[3];
          ind += 4;
        }
        ind += (this.width*4-d*4);
      }
    }
    drawRect_smart(x1,y1,r,col){
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        for(let i = 0; i < d; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            this.buf[ind] = col[0];
            this.buf[ind+1] = col[1];
            this.buf[ind+2] = col[2];
            this.buf[ind+3] = col[3];
          }
          x++;
          ind += 4;
        }
        y++;
        x -= d;
        ind += (this.width*4-d*4);
      }
    }
    drawRect2_smart(x1,y1,wr,hr,col){
      wr = Math.floor(wr);
      hr = Math.floor(hr);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-wr;
      let y = y1-hr;
      let ind = (x+y*this.width)*4;
      let wd = wr+wr;
      let hd = hr+hr;
      for(let j = 0; j < hd; j++){
        for(let i = 0; i < wd; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            this.buf[ind] = col[0];
            this.buf[ind+1] = col[1];
            this.buf[ind+2] = col[2];
            this.buf[ind+3] = col[3];
          }
          x++;
          ind += 4;
        }
        y++;
        x -= wd;
        ind += (this.width*4-wd*4);
      }
    }
    /* DEP:
    let dInd = xx+(y+j)*this.width;
    let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
    if(check) if(this.dep[dInd] <= dd){
      let tInd = dInd*4;
      this.dep[dInd] = dd;
      */
    drawRect(x1,y1,wr,hr,col){
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      wr = Math.floor(wr);
      hr = Math.floor(hr);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1;
      let y = y1;
      let ind = (x+y*this.width)*4;
      let wd = wr;
      let hd = hr;
      for(let j = 0; j < hd; j++){
        for(let i = 0; i < wd; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            this.drawPixel_ind(ind,col[0],col[1],col[2],col[3]);
            // this.drawPixel_ind(ind,col[0],col[1],col[2],col[3],true);
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
        ind += (this.width*4-wd*4);
      }
    }
    drawRect_dep(x1,y1,wr,hr,col,dep=0,upright=false){
      let replace = false;
      if(col == clear) replace = true;
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      wr = Math.floor(wr);
      hr = Math.floor(hr);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1;
      let y = y1;
      let ind = (x+y*this.width)*4;
      let wd = wr;
      let hd = hr;
      for(let j = 0; j < hd; j++){
        for(let i = 0; i < wd; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          //let dInd = x+(y+j)*this.width;
          let dInd = Math.floor(ind/4);
          if(col[0] == 0 && col[1] == 0 && col[2] == 0 && col[3] == 0){
            this.dep[dInd] = 0;
          }
          let dd = (upright===2?(dep+(hd-j)*nob.height):upright?(dep+(hd-j)):dep);
          if(pass) if(this.dep[dInd] < dd){
            this.dep[dInd] = dd;
            this.drawPixel_ind(ind,col[0],col[1],col[2],col[3]);
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
        ind += (this.width*4-wd*4);
      }
    }
    drawCircle_other(buf,width,scale,x1,y1,r,col,useCam=false){
      if(useCam) if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) < 1){
        //this.setPixel(x1,y1,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*width)*scale;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*scale;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= width) pass = false;
          if(pass){
            buf[ind] = col[0];
            buf[ind+1] = col[1];
            buf[ind+2] = col[2];
            buf[ind+3] = col[3];
            this.pixelCount++;
          }
          x++;
          ind += scale;
        }
        y++;
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (width*scale-shiftX*scale);
      }
    }
    drawCircle_new(x1,y1,r,col){
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      r = Math.floor(r);
      let inc = Math.PI/r/2;
      let a = 0;
      let lastX = 0;
      for(let j = -r; j <= r; j++){
        a += inc;
        let ll = Math.floor(Math.abs(Math.sqrt(r*r-j*j)));
        let l = ll/2;
        //let x = Math.sin(a)*r;
        if(l >= lastX) for(let i = lastX; i <= l; i++) this.setPixel(x1+l+i,y1+j,col);
        else for(let i = lastX; i >= l; i--) this.setPixel(x1+l+i,y1+j,col);
        lastX = l;
      }
    }
    drawCircle_outline(x1,y1,r,col){
      //if(Math.ceil(r) <= 0) return;
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) <= 1){
        this.setPixel(x1,y1,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      let last = 0;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        //x += (r-l);
        //ind += (r-l)*4;
        let ll = l*4;
        if(l >= last) for(let k = last; k < l; k++){
          let i = ind+ll+k*4;
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            this.buf[i] = col[0];
            this.buf[i+1] = col[1];
            this.buf[i+2] = col[2];
            this.buf[i+3] = col[3];
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
        ind += (this.width*4);
      }
    }
    drawCircle(x1,y1,r,col){
      //if(Math.ceil(r) <= 0) return;
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) <= 1){
        this.setPixel(x1,y1,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
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
          x++;
          ind += 4;
        }
        y++;
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawCircle_dep(x1,y1,r,col,dep=0,upright=0){
      //if(Math.ceil(r) <= 0) return;
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) <= 1){
        this.setPixel(x1,y1,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            let dd = (upright==2?(dep+(d-j)*this.height):upright?(dep+(d-j)):dep)
            this.setData_dep(ind,col,dd);
          }
          x++;
          ind += 4;
        }
        y++;
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawCircle_ex(x1,y1,r,col){ //ex suffix for functions that use setpixel_ex
      if(Math.floor(r) <= 1){
        this.setPixel_ex((x1+y1*this.width)*4,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            this.setPixel_ex(ind,col);
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
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawCircle_custom(x1,y1,r,col,func,arg){
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) <= 1){
        this.setPixel_ex((x1+y1*this.width)*4,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            //this.setPixel_ex(ind,c2,solidEdge?c2[3]*solidEdge:255);
            func(this,x,y,ind,x1,y1,r,col,l,arg);
            //pixel x, pixel y, pixel index, origin x, origin y, radius, color, line width, args
          }
          x++;
          ind += 4;
        }
        y++;
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawCircle_grad(x1,y1,r,col,solidEdge=null){ //circle with gradient, ex by default
      if(this.useCam){
        x1 -= this.camX;
        y1 -= this.camY;
        y1 += this.camZ;
      }
      if(Math.floor(r) <= 1){
        this.setPixel_ex((x1+y1*this.width)*4,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            let dx = x-x1;
            let dy = y-y1;
            let dist = Math.sqrt(dx*dx+dy*dy);
            //let o = r/(dist||1)*32;
            let o = dist/r*col[3];
            o = col[3]-o;
            let c2 = [col[0],col[1],col[2],o];
            //let c2 = [o,o,o,o];
            this.setPixel_ex(ind,c2,solidEdge?c2[3]*solidEdge:255);
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
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawCircle_grad_smart(x1,y1,r,col){ //circle with gradient, ex by default
      if(Math.floor(r) <= 1){
        this.setPixel_ex((x1+y1*this.width)*4,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(x < 0) pass = false;
          else if(x >= this.width) pass = false;
          if(pass){
            let dx = x-x1;
            let dy = y-y1;
            let dist = Math.abs(dx)+Math.abs(dy);
            //dist /= 1.2; //make a little bigger shape
            let o = dist/r*col[3];
            o = col[3]-o;
            if(o < 0) o = 0;
            let c2 = [col[0],col[1],col[2],o];
            this.setPixel_ex(ind,c2);
          }
          x++;
          ind += 4;
        }
        y++;
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    strokeCircle(x1,y1,r,col){
      if(Math.floor(r) <= 0) return;
      if(Math.floor(r) <= 1){
        this.setPixel(x1,y1,col);
        return;
      }
      r = Math.floor(r);
      x1 = Math.floor(x1);
      y1 = Math.floor(y1);
      let x = x1-r;
      let y = y1-r;
      let ind = (x+y*this.width)*4;
      let d = r+r;
      let wlDiam = 0;
      let lastL = 0;
      for(let j = 1; j <= d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.ceil(Math.abs(Math.sqrt(r*r-j2*j2)));
        let wl = (r-l);
        //let offX = (l*2)-wlDiam;
        wlDiam = l*2;
        x += wl;
        ind += wl*4;
        this.setPixel(x1-l,y,col);
        if(l>=lastL){
          for(let i1 = lastL; i1 <= l; i1++){
            this.setPixel(x1+i1,y,col);
            this.setPixel(x1-i1,y,col);
          }
        }
        else{
          for(let i1 = lastL; i1 >= l; i1--){
            this.setPixel(x1+i1,y,col);
            this.setPixel(x1-i1,y,col);
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
        let shiftX = (l+l+(r-l));
        x -= shiftX;
        ind += (this.width*4-shiftX*4);
      }
    }
    drawRect_dep_old(x,y,w,h,col,dep=0){
      if(!col) return;
      x = Math.floor(x);
      y = Math.floor(y);
      w = Math.floor(w);
      h = Math.floor(h);
  
      let half = Math.floor(w/2);
      let halfh = Math.floor(h/2);
      x -= half;
      y -= halfh;
      if(x < 0){
        w += x;
        if(w <= 0) return;
        x = 0;
      }
      let lx = x+w;
      if(lx > this.right){
        w += this.right-lx;
        if(w <= 0) return;
      }
      if(y < 0){
        h += y;
        if(h <= 0) return;
        y = 0;
      }
      let ly = y+h;
      if(ly > this.bottom){
        h += this.bottom-ly;
        if(h <= 0) return;
      }
  
      let ind = (x+y*this.width)*4;
      for(let j = 0; j < h; j++){
        let f1 = ind+j*this.width*4;
        for(let i = 0; i < w; i++){
          let f = f1+i*4;
          let dInd = Math.floor(f/4);
          if(this.dep[dInd] <= dep){
            this.dep[dInd] = dep;
            switch(this.blendMode){
              case 0:
                if(col){
                  this.buf[f] = col[0];
                  this.buf[f+1] = col[1];
                  this.buf[f+2] = col[2];
                  this.buf[f+3] = col[3];
                }
                else{
                  this.buf[f] = 0;
                  this.buf[f+1] = 0;
                  this.buf[f+2] = 0;
                  this.buf[f+3] = 255;
                }
                this.pixelCount++;
                break;
              case 1:
                if(this.buf[f+3] == 0){
                  this.buf[f] = col[0];
                  this.buf[f+1] = col[1];
                  this.buf[f+2] = col[2];
                  this.buf[f+3] = col[3];
                }
                this.pixelCount++;
                break;
            }
          }
        }
      }
      return 1;
    }
    offX;
    offY;
    drawRect_depMap(x,y,w,h,col,depMap,dep=0){
      if(!depMap) return;
      if(!col) return;
      x = Math.floor(x);
      y = Math.floor(y);
      w = Math.floor(w);
      h = Math.floor(h);
      if(this.offX) x += this.offX;
      if(this.offY) y += this.offY;
  
      let half = Math.floor(w/2);
      let halfh = Math.floor(h/2);
      x -= half;
      y -= halfh;
      if(x < 0){
        w += x;
        if(w <= 0) return;
        x = 0;
      }
      let lx = x+w;
      if(lx > this.right){
        w += this.right-lx;
        if(w <= 0) return;
      }
      if(y < 0){
        h += y;
        if(h <= 0) return;
        y = 0;
      }
      let ly = y+h;
      if(ly > this.bottom){
        h += this.bottom-ly;
        if(h <= 0) return;
      }
  
      let iS = x+y*this.width;
      let ind = iS*4;
      let hit = false;
      for(let j = 0; j < h; j++){
        let f1 = ind+j*this.width*4;
        for(let i = 0; i < w; i++){
          let f = f1+i*4;
          let dInd = Math.floor(f/4);
          let rInd = (i+j*w)*4;
          let dep2 = depMap[rInd]+depMap[rInd+1]*this.height+dep;
          if(this.dep[dInd] <= dep2){
            this.dep[dInd] = dep2;
            switch(this.blendMode){
              case 0:
                if(col){
                  this.buf[f] = col[0];
                  this.buf[f+1] = col[1];
                  this.buf[f+2] = col[2];
                  this.buf[f+3] = col[3];
                }
                else{
                  this.buf[f] = 0;
                  this.buf[f+1] = 0;
                  this.buf[f+2] = 0;
                  this.buf[f+3] = 255;
                }
                this.pixelCount++;
                break;
              case 1:
                if(this.buf[f+3] == 0){
                  this.buf[f] = col[0];
                  this.buf[f+1] = col[1];
                  this.buf[f+2] = col[2];
                  this.buf[f+3] = col[3];
                }
                this.pixelCount++;
                break;
            }
          }
          let hitRes = this.setPixelCol(Math.floor(f/4));
          if(hitRes) hit = true;
        }
      }
      return (hit ? 2 : 1);
    }
  
    plotLine(x0,y0,x1,y1,c){
      x0 = Math.floor(x0);
      x1 = Math.floor(x1);
      y0 = Math.floor(y0);
      y1 = Math.floor(y1);
  
      let dx = Math.abs(x1-x0);
      let sx = x0<x1 ? 1 : -1;
      let dy = -Math.abs(y1-y0);
      let sy = y0<y1 ? 1 : -1;
      let err = dx+dy;  /* error value e_xy */
  
      while(true){   /* loop */
        let res = this.setPixel(x0,y0,c);
        //if(!res) break;
        
        if(x0 == x1 && y0 == y1) break;
        let e2 = 2*err;
        if(e2 >= dy){ /* e_xy+e_x > 0 */
          err += dy;
          x0 += sx;
        }
        if(e2 <= dx){ /* e_xy+e_y < 0 */
          err += dx;
          y0 += sy;
        }
      }
    }
    plotLine_marker(t,normWidth,normHeight,x0,y0,x1,y1){
      x0 = Math.floor(x0);
      x1 = Math.floor(x1);
      y0 = Math.floor(y0);
      y1 = Math.floor(y1);
  
      let dx = Math.abs(x1-x0);
      let sx = x0<x1 ? 1 : -1;
      let dy = -Math.abs(y1-y0);
      let sy = y0<y1 ? 1 : -1;
      let err = dx+dy;
  
      while(true){
        let inside = true;
        if(x0 < 0) inside = false;
        if(x0 > normWidth-1) inside = false;
        if(y0 < 0) inside = false;
        if(y0 > normHeight-1) inside = false;
        if(inside){
          let ind = x0+y0*normWidth;
          t[ind] = 1;
        }
        
        if(x0 == x1 && y0 == y1) break;
        let e2 = 2*err;
        if(e2 >= dy){
          err += dy;
          x0 += sx;
        }
        if(e2 <= dx){
          err += dx;
          y0 += sy;
        }
      }
    }
  
    plotLineSize(x0,y0,x1,y1,c,w){
  
      //this.drawLine_smart(x0,y0,x1,y1,c,w);
  
      x0 = Math.floor(x0);
      x1 = Math.floor(x1);
      y0 = Math.floor(y0);
      y1 = Math.floor(y1);
  
      let dx = Math.abs(x1-x0);
      let sx = x0<x1 ? 1 : -1;
      let dy = -Math.abs(y1-y0);
      let sy = y0<y1 ? 1 : -1;
      let err = dx+dy;  /* error value e_xy */
  
      while(true){   /* loop */
        //let res = this.setPixelSize_smart(x0,y0,w,c);
        //this.setPixel(x0,y0,c);
        //this.setPixelSize(x0,y0,w,c);
        this.setPixelSize_smart(x0,y0,w,c);
        /*for(let yy = 0; yy < w; yy++){
          for(let xx = 0; xx < w; xx++){
            this.setPixel(x0+xx,y0+yy,c);
          }
        }*/
        //if(!res) break;
        
        if(x0 == x1 && y0 == y1) break;
        let e2 = 2*err;
        if(e2 >= dy){ /* e_xy+e_x > 0 */
          err += dy;
          x0 += sx;
        }
        if(e2 <= dx){ /* e_xy+e_y < 0 */
          err += dx;
          y0 += sy;
        }
      }
    }
  
    drawLine_smart(x0,y0,x1,y1,c,w){
      
  
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      //fix ends
  
      //this.drawRect(x0-hw,y0-hw,w,w,c);
      //this.drawRect(x1-hw,y1-hw,w,w,c);
  
      //
  
      //if(Math.floor(w) == 1) return;
      //this.plotLine(x0,y0,x1,y1,c);
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;  /* error value e_xy */
  
        while(true){   /* loop */
          //let res = this.setPixel(x0,y0,c);
          if(am >= 1){ //vertical slope
            this.drawRect(x0-hw,y0-hw,w,w,c);
            /*for(let i = -hw; i <= hw; i++){
              this.setPixel(x0+i,y0,c);
              //if(this.useRecord){
                //this.recMap[Math.floor(x0+i+y0*nob.width)] = 1;
                //if(!this.pMap.has(c)) this.pMap.set(c,[]); 
                //this.pMap.get(c).push((x0+i+y0*this.width)*4);
              //}
            }*/
          }
          else{ //horz slope
            this.drawRect(x0-hw,y0-hw,w,w,c);
            /*for(let i = -hw; i <= hw; i++){
              this.setPixel(x0,y0+i,c);
              //if(this.useRecord) this.recMap[Math.floor(x0+(y0+i)*nob.width)] = 1;
              //if(!this.pMap.has(c)) this.pMap.set(c,[]); 
              //this.pMap.get(c).push((x0+(y0+i)*this.width)*4);
            }*/
          }
          //if(!res) break;
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
          }
        }
      }
    }
    isPixelInLine(x0,y0,x1,y1,w,mx,my){
      let hw = Math.floor(w/2); //half width
  
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        //this.drawRect_dep(x0-hw,y0-hw,w,w,c,dep,upright);
        //this.drawRect_dep(x1-hw,y1-hw,w,w,c,dep+(upright==2?(Math.max(0,(y1-y0)*this.height)):0),upright);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;
  
        while(true){   /* loop */
          if(am >= 1){ //vertical slope
            for(let i = -hw; i <= hw; i++){
              if(x0+i == mx && y0 == my) return true;
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              if(x0 == mx && y0+i == my) return true;
            }
          }
          if(x0 == x1 && y0 == y1) return false;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
          }
        }
      }
    }
    drawLine_smart_filled(x0,y0,x1,y1,c,w,dep=0,upright=false){
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
  
      /*
  
      let dInd = xx+(y+j)*this.width;
            let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
            if(check) if(this.dep[dInd] <= dd){
              let tInd = dInd*4;
              this.dep[dInd] = dd;
  
      */
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
        let startY = y0;
  
        this.drawRect_dep(x0-hw,y0-hw,w,w,c,dep,upright);
        this.drawRect_dep(x1-hw,y1-hw,w,w,c,dep+(upright==2?(Math.max(0,(y1-y0)*this.height)):0),upright);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;  /* error value e_xy */
  
        while(true){   /* loop */
          //let res = this.setPixel(x0,y0,c);
          if(am >= 1){ //vertical slope
            for(let i = -hw; i <= hw; i++){
              let depi = (startY-y0)*this.height;
              this.setPixel_dep(x0+i,y0,c,dep+depi);
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              let depi = (startY-(y0+i))*this.height;
              this.setPixel_dep(x0,y0+i,c,dep+depi);
            }
          }
          //if(!res) break;
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
          }
        }
      }
    }
    getLine(x0,y0,x1,y1,c,w){
  
      let l = [];
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      //fix ends
  
      
  
      //
  
      //if(Math.floor(w) == 1) return;
      //this.plotLine(x0,y0,x1,y1,c);
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;  /* error value e_xy */
  
        while(true){   /* loop */
          //let res = this.setPixel(x0,y0,c);
          if(am >= 1){ //vertical slope
            for(let i = -hw; i <= hw; i++){
              //this.setPixel(x0+i,y0,c);
              l.push([x0+i,y0,0]);
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              //this.setPixel(x0,y0+i,c);
              l.push([x0,y0+i,0]);
            }
          }
          //if(!res) break;
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
          }
        }
      }
      return l;
    }
    outlineColor = [0,0,0,255];
    drawLine_smart_outline(x0,y0,x1,y1,c,w){
  
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      //if(Math.floor(w) == 1) return;
      //this.plotLine(x0,y0,x1,y1,c);
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;  /* error value e_xy */
  
        while(true){   /* loop */
          //let res = this.setPixel(x0,y0,c);
          if(am >= 1){ //vertical slope
            for(let i = -hw; i <= hw; i++){
              if(i == -hw || i == hw) this.setPixel(x0+i,y0,this.outlineColor);
              else this.setPixel(x0+i,y0,c);
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              if(i == -hw || i == hw) this.setPixel(x0,y0+i,this.outlineColor);
              else this.setPixel(x0,y0+i,c);
            }
          }
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
          }
        }
      }
    }
    drawLine_smart_dep_outline(x0,y0,x1,y1,c,w,dep=0,endW){
  
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      //if(Math.floor(w) == 1) return;
      //this.plotLine(x0,y0,x1,y1,c);
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
      let startX = x0;
      let startY = y0;
  
      let inc = 0;
      if(endW != null){
        inc = (w-endW)/ly/2;
        hw = endW/2;
      }
      
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;  /* error value e_xy */
  
        while(true){   /* loop */
          //let res = this.setPixel(x0,y0,c);
          let oy = (ly-(y0-startY));
          let f = Math.round(hw);
          if(am >= 1){ //vertical slope
            for(let i = -f; i <= f; i++){
              if(i == -f || i == f) this.setPixel_dep(x0+i,y0,this.outlineColor,dep+oy);
              else this.setPixel_dep(x0+i,y0,c,dep+oy);
            }
          }
          else{ //horz slope
            for(let i = -f; i <= f; i++){
              if(i == -f || i == f) this.setPixel_dep(x0,y0+i,this.outlineColor,dep+oy-i);
              else this.setPixel_dep(x0,y0+i,c,dep+oy-i);
            }
          }
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){ /* e_xy+e_x > 0 */
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){ /* e_xy+e_y < 0 */
            err += dx;
            y0 += sy;
            hw += inc;
          }
        }
      }
    }
    drawLine_smart_dep(x0,y0,x1,y1,c,w,dep=0){
      if(!this.dep) return;
      //posibly temp
      let hw = Math.floor(w/2); //half width
  
      if(w < 1 && w > 0.1) w = 1;
      let ly = y1-y0;
      let lx = x1-x0;
      let m = ly/lx;
      let am = Math.abs(m);
  
      this.drawRect_dep(x0-hw,y0-hw,w,w,c,dep,0);
      this.drawRect_dep(x1-hw,y1-hw,w,w,c,dep,0);
  
      {
        x0 = Math.floor(x0);
        x1 = Math.floor(x1);
        y0 = Math.floor(y0);
        y1 = Math.floor(y1);
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;
  
        while(true){
          this.drawRect_dep(x0-hw,y0-hw,w,w,c,dep,0);
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
          
          if(x0 == x1 && y0 == y1) break;
          let e2 = 2*err;
          if(e2 >= dy){
            err += dy;
            x0 += sx;
          }
          if(e2 <= dx){
            err += dx;
            y0 += sy;
          }
        }
      }
    }
  
    drawPolygon2(v,x,y,c){
      let left = 9999;
      let right = -9999;
      let top = 9999;
      let bottom = -9999;
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0];
        let y0 = vert[1];
        if(x0 < left) left = x0;
        if(x0 > right) right = x0;
        if(y0 < top) top = y0;
        if(y0 > bottom) bottom = y0;
      }
      let normLeft = Math.abs(left);
      let normLeft2 = normLeft*2;
      let normTop = Math.abs(top);
      let normTop2 = normTop*2;
      let normWidth = Math.abs(normLeft+right)+1;
      let normHeight = Math.abs(normTop+bottom)+1;
      let size = normWidth*normHeight;
      let t = new Uint8ClampedArray(size);
  
      //draw outline
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0]+normLeft;
        let y0 = vert[1]+normTop;
        let nI = i+1;
        if(i == v.length-1) nI = 0;
        let next = v[nI];
        let x1 = next[0]+normLeft;
        let y1 = next[1]+normTop;
        this.plotLine_marker(t,normWidth,normHeight,x0,y0,x1,y1);
      }
  
      for(let j = normTop2; j < normHeight; j++){
        let curH = 0;
        let hits = [];
        let hitAmt = 0;
        for(let i = normLeft2; i < normWidth; i++){
          let ind = i+j*normWidth;
          if(t[ind] != curH){
            curH = t[ind];
            if(curH == 1){
              hitAmt++;
              hits[i] = 1;
            }
          }
          if(t[ind]) this.setPixel(x+i-normLeft,y+j-normTop,c);
        }
  
        if(hitAmt > 1){
          let draw = false; //false for fill, true for invert fill
          for(let i = normLeft2; i < normWidth; i++){
            if(hits[i]) draw = !draw;
            if(draw) this.setPixel(x+i-normLeft,y+j-normTop,c);
          }
        }
      }
    }
    drawPolygon2_dep(v,x,y,c,dep=0){
      let left = 9999;
      let right = -9999;
      let top = 9999;
      let bottom = -9999;
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0];
        let y0 = vert[1];
        if(x0 < left) left = x0;
        if(x0 > right) right = x0;
        if(y0 < top) top = y0;
        if(y0 > bottom) bottom = y0;
      }
      let normLeft = Math.abs(left);
      let normLeft2 = normLeft*2;
      let normTop = Math.abs(top);
      let normTop2 = normTop*2;
      let normWidth = Math.abs(normLeft+right)+1;
      let normHeight = Math.abs(normTop+bottom)+1;
      let size = normWidth*normHeight;
      let t = new Uint8ClampedArray(size);
  
      //draw outline
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0]+normLeft;
        let y0 = vert[1]+normTop;
        let nI = i+1;
        if(i == v.length-1) nI = 0;
        let next = v[nI];
        let x1 = next[0]+normLeft;
        let y1 = next[1]+normTop;
        this.plotLine_marker(t,normWidth,normHeight,x0,y0,x1,y1);
      }
  
      for(let j = normTop2; j < normHeight; j++){
        let curH = 0;
        let hits = [];
        let hitAmt = 0;
        for(let i = normLeft2; i < normWidth; i++){
          let ind = i+j*normWidth;
          if(t[ind] != curH){
            curH = t[ind];
            if(curH == 1){
              hitAmt++;
              hits[i] = 1;
            }
          }
          if(t[ind]) this.setPixel_dep(x+i-normLeft,y+j-normTop,c,dep);
        }
  
        if(hitAmt > 1){
          let draw = false; //false for fill, true for invert fill
          for(let i = normLeft2; i < normWidth; i++){
            if(hits[i]) draw = !draw;
            if(draw) this.setPixel_dep(x+i-normLeft,y+j-normTop,c,dep);
          }
        }
      }
    }
  
    drawPolygon(v,x,y,c){
      let left = 9999;
      let right = -9999;
      let top = 9999;
      let bottom = -9999;
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0];
        let y0 = vert[1];
        if(x0 < left) left = x0;
        if(x0 > right) right = x0;
        if(y0 < top) top = y0;
        if(y0 > bottom) bottom = y0;
      }
      let normLeft = Math.abs(left);
      let normTop = Math.abs(top);
      let normWidth = Math.abs(normLeft+right)+50;
      let normHeight = Math.abs(normTop+bottom)+50;
      let size = normWidth*normHeight;
      let t = new Uint8ClampedArray(size);
  
      for(let i = 0; i < v.length; i++){
        let vert = v[i];
        let x0 = vert[0]+normLeft;
        let y0 = vert[1]+normTop;
        let nI = i+1;
        if(i == v.length-1) nI = 0;
        let next = v[nI];
        let x1 = next[0]+normLeft;
        let y1 = next[1]+normTop;
        this.plotLine_marker(t,normWidth,normHeight,x0,y0,x1,y1);
      }
  
      for(let j = 0; j < normHeight; j++){
        let hit = false;
        let curH = 0;
        let hits = [];
        let hitAmt = 0;
        for(let i = 0; i < normWidth; i++){
          let ind = i+j*normWidth;
          if(t[ind] != curH){
            hitAmt++;
            curH = t[ind];
          }
          if(t[ind]){
            hits[i] = 1;
            this.setPixel(x+i-normLeft,y+j-normTop,c);
          }
          /*if(t[ind]){
            
            if((i != 0 ? !t[ind-1] : true)){
              hitAmt++;
            }
            hits[i] = 1;
            this.setPixel(x+i-normLeft,y+j-normTop,c);
          }*/
        }
        if(hitAmt > 1){
          let h = false;
          let cH = 0;
          for(let i = 0; i < normWidth; i++){
            if(hits[i] != cH){
              h = !h;
              cH = hits[i];
              //if(i != 0 ? !hits[i-1] : true) h = !h;
            }
            if(h || hits[i]) this.setPixel(x+i-normLeft,y+j-normTop,c);
          }
        }
        else{
          for(let i = 0; i < normWidth; i++){
            let ind = i+j*normWidth;
            if(t[ind]) this.setPixel(x+i-normLeft,y+j-normTop,c);
          }
        }
      }
    }
  
    flipX = false;
    widthOff = 0;
    drawImage(data,x=0,y=0){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          let tInd = ((x+i-hw)+(y+j-hh)*this.width)*4;
          if(data.data[ind+3]){
            this.buf[tInd] = data.data[ind];
            this.buf[tInd+1] = data.data[ind+1];
            this.buf[tInd+2] = data.data[ind+2];
            this.buf[tInd+3] = data.data[ind+3];
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let tInd = ((x+i-hw)+(y+j-hh)*this.width)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_ex(data,x=0,y=0){
      if(!data) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          let tInd = ((x+i-hw)+(y+j-hh)*this.width)*4;
          if(data.data[ind+3]){
            this.setPixel_ex(tInd,[
              data.data[ind],
              data.data[ind+1],
              data.data[ind+2],
              data.data[ind+3]
            ]);
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let tInd = ((x+i-hw)+(y+j-hh)*this.width)*4;
            if(data.data[ind+3]){
              this.setPixel_ex(tInd,[
                data.data[ind],
                data.data[ind+1],
                data.data[ind+2],
                data.data[ind+3]
              ]);
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_upright(data,x=0,y=0,dep=0){
      if(!data) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          let xx = (x+i-hw);
          let yy = (y+j-hh);
          let tInd = (xx+yy*this.width)*4;
          let dInd = xx+yy*this.width;
          let doy = dep+(h-j);
          if(data.data[ind+3]) if(this.dep[dInd] <= doy){
            this.dep[dInd] = doy;
            this.buf[tInd] = data.data[ind];
            this.buf[tInd+1] = data.data[ind+1];
            this.buf[tInd+2] = data.data[ind+2];
            this.buf[tInd+3] = data.data[ind+3];
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let xx = (x+i-hw);
            let yy = (y+j-hh);
            let tInd = (xx+yy*this.width)*4;
            let dInd = xx+yy*this.width;
            let doy = dep+(h-j);
            if(data.data[ind+3]) if(this.dep[dInd] <= doy){
              this.dep[dInd] = doy;
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
  
      return 1;
    }
    drawPixel(x,y,c){
      x = Math.floor(x);
      y = Math.floor(y);
      if(x < 0) return;
      if(x > this.right) return;
      if(y < 0) return;
      if(y > this.bottom) return;
      let r = c[0];
      let g = c[1];
      let b = c[2];
      let a = c[3];
      let ind = (x+y*this.width)*4;
      this.drawPixel_ind(ind,r,g,b,a);
    }
    drawPixel_ind_dep(ind,r,g,b,a,replace,dep=0){
      let ind2 = Math.floor(ind/4);
      let d = this.dep[ind2];
      if(dep > d){
        this.dep[ind2] = dep;
        this.drawPixel_ind(ind,r,g,b,a,replace);
      }
    }
    drawPixel_ind(ind,r,g,b,a,replace=false){
      let list;
      if(this.useNewRec){
        let cstr = `[${r},${g},${b},${a}]`;
        if(!this.newRecMap.has(cstr)) this.newRecMap.set(cstr,[]);
        list = this.newRecMap.get(cstr);
      }
      if(replace || (r == 0 && g == 0 && b == 0 && a == 0)){
        this.buf[ind] = r;
        this.buf[ind+1] = g;
        this.buf[ind+2] = b;
        this.buf[ind+3] = a;
        this.pixelCount++;
        if(this.useNewRec){
          list.push(ind);
        }
        return;
      }
      let lr = this.buf[ind];
      let lg = this.buf[ind+1];
      let lb = this.buf[ind+2];
      let la = this.buf[ind+3];
      if(la == 0){
        lr = r;
        lg = g;
        lb = b;
      }
      let o = a/255;
      let lo = la/255;
      if(la != 0 && la != 255){
        lr *= o;
        lg *= o;
        lb *= o;
      }
      let no = (lo + (1.0 - lo) * o);
      let c = 1-o;
      this.buf[ind] = Math.floor(o*r+c*lr);
      this.buf[ind+1] = Math.floor(o*g+c*lg);
      this.buf[ind+2] = Math.floor(o*b+c*lb);
      this.buf[ind+3] = Math.floor(no*255);
      this.pixelCount++;
      if(this.useNewRec){
        list.push(ind);
      }
      /*let o = a/255;
      let lo = la/255;
      let no = (lo + (1.0 - lo) * o);
      this.buf[ind+3] = no*255;
      this.buf[ind] = r*no+lr*(1-no);
      this.buf[ind+1] = g*no+lg*(1-no);
      this.buf[ind+2] = b*no+lb*(1-no);*/
    }
    drawPixel_dep(x,y,c,dep){
      let list;
      if(this.useNewRec){
        let cstr = JSON.stringify(c);
        if(!this.newRecMap.has(cstr)) this.newRecMap.set(cstr,[]);
        list = this.newRecMap.get(cstr);
      }
      x = Math.floor(x);
      y = Math.floor(y);
      if(x < 0) return;
      if(x > this.right) return;
      if(y < 0) return;
      if(y > this.bottom) return;
      
      let r = c[0];
      let g = c[1];
      let b = c[2];
      let a = c[3];
      let iD = x+y*this.width;
      let ind = iD*4;
      if(r == 0 && g == 0 && b == 0 && a == 0){
        //this.dep[iD] = 0;
        this.buf[ind] = 0;
        this.buf[ind+1] = 0;
        this.buf[ind+2] = 0;
        this.buf[ind+3] = 0;
        this.pixelCount++;
        if(this.useNewRec){
          list.push(ind);
        }
        return;
      }
      if(this.dep[iD] < dep){
        this.dep[iD] = dep;
        let lr = this.buf[ind];
        let lg = this.buf[ind+1];
        let lb = this.buf[ind+2];
        let la = this.buf[ind+3];
        if(la == 0){
          lr = r;
          lg = g;
          lb = b;
        }
        let o = a/255;
        let lo = la/255;
        if(la != 0 && la != 255){
          lr *= o;
          lg *= o;
          lb *= o;
        }
        let no = (lo + (1.0 - lo) * o);
        let c = 1-o;
        this.buf[ind] = Math.floor(o*r+c*lr);
        this.buf[ind+1] = Math.floor(o*g+c*lg);
        this.buf[ind+2] = Math.floor(o*b+c*lb);
        this.buf[ind+3] = Math.floor(no*255);
        if(this.useNewRec){
          list.push(ind);
        }
      }
      this.pixelCount++;
    }
    drawImage_basic_skip(data,x=0,y=0,skip=1){
      if(!data) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      for(let j = 0; j < h; j += skip){
        for(let i = 0; i < w; i += skip){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+(i/skip);
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            if(check){
              let tInd = (xx+(y+(j/skip))*this.width)*4;
              this.drawPixel_ind(tInd,data.data[ind],data.data[ind+1],data.data[ind+2],data.data[ind+3]);
            }
          }
        }
      }
      return 1;
    }
    drawImage_basic(data,x=0,y=0,camera=false){
      if(!data) return;
      if(this.useCam || camera){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      /*let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;*/
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            if(check){
              let tInd = (xx+(y+j)*this.width)*4;
              this.drawPixel_ind(tInd,data.data[ind],data.data[ind+1],data.data[ind+2],data.data[ind+3]);
              //this.buf[tInd] = data.data[ind];
              //this.buf[tInd+1] = data.data[ind+1];
              //this.buf[tInd+2] = data.data[ind+2];
              //this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              if(check){
                let tInd = (xx+(y+j)*this.width)*4;
                this.buf[tInd] = data.data[ind];
                this.buf[tInd+1] = data.data[ind+1];
                this.buf[tInd+2] = data.data[ind+2];
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_dep(data,x=0,y=0,camera=false,dep=0,upright=false){
      if(!data) return;
      if(this.useCam || camera){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            let dInd = xx+(y+j)*this.width;
            let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
            if(check) if(this.dep[dInd] <= dd){
              let tInd = dInd*4;
              this.dep[dInd] = dd;
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              let dInd = xx+(y+j)*this.width;
              let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
              if(check) if(this.dep[dInd] <= dd){
                let tInd = dInd*4;
                this.dep[dInd] = dd;
                this.buf[tInd] = data.data[ind];
                this.buf[tInd+1] = data.data[ind+1];
                this.buf[tInd+2] = data.data[ind+2];
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_tint(data,x=0,y=0,tr,tg,tb){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            if(check){
              let tInd = (xx+(y+j)*this.width)*4;
              this.buf[tInd] = Math.floor(data.data[ind]*tr);
              this.buf[tInd+1] = Math.floor(data.data[ind+1]*tg);
              this.buf[tInd+2] = Math.floor(data.data[ind+2]*tb);
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              if(check){
                let tInd = (xx+(y+j)*this.width)*4;
                this.buf[tInd] = Math.floor(data.data[ind]*tr);
                this.buf[tInd+1] = Math.floor(data.data[ind+1]*tg);
                this.buf[tInd+2] = Math.floor(data.data[ind+2]*tb);
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_tint2(data,x=0,y=0,t1,t2){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            if(check){
              let tInd = (xx+(y+j)*this.width)*4;
              this.buf[tInd] = Math.floor((data.data[ind]+t1[0])*t2[0]);
              this.buf[tInd+1] = Math.floor((data.data[ind+1]+t1[1])*t2[1]);
              this.buf[tInd+2] = Math.floor((data.data[ind+2]+t1[2])*t2[2]);
              this.buf[tInd+3] = Math.floor((data.data[ind+3]+t1[3])*t2[3])
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              if(check){
                let tInd = (xx+(y+j)*this.width)*4;
                this.buf[tInd] = Math.floor((data.data[ind]+t1[0])*t2[0]);
                this.buf[tInd+1] = Math.floor((data.data[ind+1]+t1[1])*t2[1]);
                this.buf[tInd+2] = Math.floor((data.data[ind+2]+t1[2])*t2[2]);
                this.buf[tInd+3] = Math.floor((data.data[ind+3]+t1[3])*t2[3]);
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_tint2_dep(data,x=0,y=0,t1,t2,dep=0,upright=false,outline){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            let dInd = xx+(y+j)*this.width;
            let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
            if(check) if(this.dep[dInd] <= dd){
              let tInd = dInd*4;
              this.dep[dInd] = dd;
              this.buf[tInd] = Math.floor((data.data[ind]+t1[0])*t2[0]);
              this.buf[tInd+1] = Math.floor((data.data[ind+1]+t1[1])*t2[1]);
              this.buf[tInd+2] = Math.floor((data.data[ind+2]+t1[2])*t2[2]);
              this.buf[tInd+3] = data.data[ind+3];
              if(outline){
                if(i == 0){
                  this.buf[tInd-4] = outline[0];
                  this.buf[tInd-4+1] = outline[1];
                  this.buf[tInd-4+2] = outline[2];
                  this.buf[tInd-4+3] = 255;
                }
                if(j == 0){
                  this.buf[tInd-nob.width*4] = outline[0];
                  this.buf[tInd-nob.width*4+1] = outline[1];
                  this.buf[tInd-nob.width*4+2] = outline[2];
                  this.buf[tInd-nob.width*4+3] = 255;
                }
                if(i == w-1){
                  this.buf[tInd+4] = outline[0];
                  this.buf[tInd+4+1] = outline[1];
                  this.buf[tInd+4+2] = outline[2];
                  this.buf[tInd+4+3] = 255;
                }
                if(j == h-1){
                  this.buf[tInd+nob.width*4] = outline[0];
                  this.buf[tInd+nob.width*4+1] = outline[1];
                  this.buf[tInd+nob.width*4+2] = outline[2];
                  this.buf[tInd+nob.width*4+3] = 255;
                }
              }
            }
          }
          else if(outline){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            let dInd = xx+(y+j)*this.width;
            let tInd = dInd*4;
            if(check) if(!(this.buf[tInd] == 255 && this.buf[tInd+1] == 255 && this.buf[tInd+2] == 255)){
              if(check){
                let pass = false;
                if(ind+3+4 < data.data.length && data.data[ind+3+4] != 0) pass = true;
                else if(ind+3-4 >= 0 && data.data[ind+3-4] != 0) pass = true;
                else if(ind+3+w*4 < data.data.length && data.data[ind+3+w*4] != 0) pass = true;
                else if(ind+3-w*4 >= 0 && data.data[ind+3-w*4] != 0) pass = true;
                if(pass){
                  this.dep[dInd] = 60000;
                  this.buf[tInd] = outline[0];
                  this.buf[tInd+1] = outline[1];
                  this.buf[tInd+2] = outline[2];
                  this.buf[tInd+3] = 255;
                }
              }
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              let dInd = xx+(y+j)*this.width;
              let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
              if(check) if(this.dep[dInd] <= dd){
                let tInd = dInd*4;
                this.dep[dInd] = dd;
                this.buf[tInd] = Math.floor((data.data[ind]+t1[0])*t2[0]);
                this.buf[tInd+1] = Math.floor((data.data[ind+1]+t1[1])*t2[1]);
                this.buf[tInd+2] = Math.floor((data.data[ind+2]+t1[2])*t2[2]);
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
            else if(outline){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              let dInd = xx+(y+j)*this.width;
              let tInd = dInd*4;
              if(check) if(!(this.buf[tInd] == 255 && this.buf[tInd+1] == 255 && this.buf[tInd+2] == 255)){
                if(check){
                  let pass = false;
                  if(ind+3+4 < data.data.length && data.data[ind+3+4] != 0) pass = true;
                  else if(ind+3-4 >= 0 && data.data[ind+3-4] != 0) pass = true;
                  else if(ind+3+w*4 < data.data.length && data.data[ind+3+w*4] != 0) pass = true;
                  else if(ind+3-w*4 >= 0 && data.data[ind+3-w*4] != 0) pass = true;
                  if(pass){
                    this.dep[dInd] = 60000;
                    this.buf[tInd] = outline[0];
                    this.buf[tInd+1] = outline[1];
                    this.buf[tInd+2] = outline[2];
                    this.buf[tInd+3] = 255;
                  }
                }
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_replace_dep(data,x=0,y=0,t1,t2,dep=0,upright=false){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            let dInd = xx+(y+j)*this.width;
            let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
            if(check) if(this.dep[dInd] <= dd){
              let tInd = dInd*4;
              this.dep[dInd] = dd;
              if(data.data[ind] == t1[0] && data.data[ind+1] == t1[1] && data.data[ind+2] == t1[2]){
                this.buf[tInd] = t2[0];
                this.buf[tInd+1] = t2[1];
                this.buf[tInd+2] = t2[2];
              }
              else{
                this.buf[tInd] = data.data[ind];
                this.buf[tInd+1] = data.data[ind+1];
                this.buf[tInd+2] = data.data[ind+2];
              }
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              let dInd = xx+(y+j)*this.width;
              let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
              if(check) if(this.dep[dInd] <= dd){
                let tInd = dInd*4;
                this.dep[dInd] = dd;
                if(data.data[ind] == t1[0] && data.data[ind+1] == t1[1] && data.data[ind+2] == t1[2]){
                  this.buf[tInd] = t2[0];
                  this.buf[tInd+1] = t2[1];
                  this.buf[tInd+2] = t2[2];
                }
                else{
                  this.buf[tInd] = data.data[ind];
                  this.buf[tInd+1] = data.data[ind+1];
                  this.buf[tInd+2] = data.data[ind+2];
                }
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_replace2_dep(data,x=0,y=0,t1,t2,t3,t4,dep=0,upright=false){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            let dInd = xx+(y+j)*this.width;
            let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
            if(check) if(this.dep[dInd] <= dd){
              let tInd = dInd*4;
              this.dep[dInd] = dd;
              if(data.data[ind] == t1[0] && data.data[ind+1] == t1[1] && data.data[ind+2] == t1[2]){
                this.buf[tInd] = t2[0];
                this.buf[tInd+1] = t2[1];
                this.buf[tInd+2] = t2[2];
              }
              else if(data.data[ind] == t3[0] && data.data[ind+1] == t3[1] && data.data[ind+2] == t3[2]){
                this.buf[tInd] = t4[0];
                this.buf[tInd+1] = t4[1];
                this.buf[tInd+2] = t4[2];
              }
              else{
                this.buf[tInd] = data.data[ind];
                this.buf[tInd+1] = data.data[ind+1];
                this.buf[tInd+2] = data.data[ind+2];
              }
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              let dInd = xx+(y+j)*this.width;
              let dd = (upright===2?(dep+(h-j)*nob.height):upright?(dep+(h-j)):dep);
              if(check) if(this.dep[dInd] <= dd){
                let tInd = dInd*4;
                this.dep[dInd] = dd;
                if(data.data[ind] == t1[0] && data.data[ind+1] == t1[1] && data.data[ind+2] == t1[2]){
                  this.buf[tInd] = t2[0];
                  this.buf[tInd+1] = t2[1];
                  this.buf[tInd+2] = t2[2];
                }
                else if(data.data[ind] == t3[0] && data.data[ind+1] == t3[1] && data.data[ind+2] == t3[2]){
                  this.buf[tInd] = t4[0];
                  this.buf[tInd+1] = t4[1];
                  this.buf[tInd+2] = t4[2];
                }
                else{
                  this.buf[tInd] = data.data[ind];
                  this.buf[tInd+1] = data.data[ind+1];
                  this.buf[tInd+2] = data.data[ind+2];
                }
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_basic_tintAdd(data,x=0,y=0,tr,tg,tb){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(data.data[ind+3]){
            let check = true;
            let xx = x+i;
            if(xx < 0) check = false;
            else if(xx >= this.width) check = false;
            if(check){
              let tInd = (xx+(y+j)*this.width)*4;
              if(data.data[ind] == 0 && data.data[ind+1] == 0 && data.data[ind+2] == 0){
                this.buf[tInd] = 0;
                this.buf[tInd+1] = 0;
                this.buf[tInd+2] = 0;
              }
              else{
                this.buf[tInd] = Math.floor(data.data[ind]+tr);
                this.buf[tInd+1] = Math.floor(data.data[ind+1]+tg);
                this.buf[tInd+2] = Math.floor(data.data[ind+2]+tb);
              }
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            if(data.data[ind+3]){
              let check = true;
              let xx = x+i;
              if(xx < 0) check = false;
              else if(xx >= this.width) check = false;
              if(check){
                let tInd = (xx+(y+j)*this.width)*4;
                if(data.data[ind] == 0 && data.data[ind+1] == 0 && data.data[ind+2] == 0){
                  this.buf[tInd] = 0;
                  this.buf[tInd+1] = 0;
                  this.buf[tInd+2] = 0;
                }
                else{
                  this.buf[tInd] = Math.floor(data.data[ind]+tr);
                  this.buf[tInd+1] = Math.floor(data.data[ind+1]+tg);
                  this.buf[tInd+2] = Math.floor(data.data[ind+2]+tb);
                }
                this.buf[tInd+3] = data.data[ind+3];
              }
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_trans(data,x=0,y=0,opacity=1){
      if(!data) return;
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          let tInd = ((x+i)+(y+j)*this.width)*4;
          if(data.data[ind+3]){
            this.buf[tInd] = Math.floor((this.buf[tInd]+data.data[ind]*opacity)/2);
            this.buf[tInd+1] = Math.floor((this.buf[tInd+1]+data.data[ind+1]*opacity)/2);
            this.buf[tInd+2] = Math.floor((this.buf[tInd+2]+data.data[ind+2]*opacity)/2);
            this.buf[tInd+3] = Math.floor((this.buf[tInd+3]+data.data[ind+3]*opacity)/2);
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let tInd = ((x+i)+(y+j)*this.width)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_custom(data,x=0,y=0,func,arg){
      if(!data) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      /*let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;*/
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          let tInd = ((x+i)+(y+j)*this.width)*4;
          if(data.data[ind+3]){
            func(this,tInd,ind,col,arg);
            //this.buf[tInd] = data.data[ind];
            //this.buf[tInd+1] = data.data[ind+1];
            //this.buf[tInd+2] = data.data[ind+2];
            //this.buf[tInd+3] = data.data[ind+3];
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let tInd = ((x+i)+(y+j)*this.width)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_smart(data,x=0,y=0){
      if(!data) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      /*let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      w -= this.widthOff;*/
  
      //if(x+w > this.right-10) w = this.right-x-10;
  
      if(!this.flipX) for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let ind = (i+j*w)*4;
          if(x+i < this.right && x+i >= 0){
            let tInd = ((x+i)+(y+j)*this.width)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
      else{
        for(let j = 0; j < h; j++){
          for(let i = 0; i < w; i++){
            let ind = ((w-i-1)+j*w)*4;
            let tInd = ((x+i)+(y+j)*this.width)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
            }
          }
        }
      }
  
      return 1;
    }
    sqrt2 = Math.sqrt(2);
    drawImage_basic_scale(data,x=0,y=0,sx=1,sy=1){
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;

      let right = Math.min(x+w*sx,this.width);
      let bottom = Math.min(y+h*sy,this.height);

      for(let j = Math.max(y,0); j < bottom; j++){
        for(let i = Math.max(x,0); i < right; i++){
          let ax = Math.floor((i-x)/sx);
          let ay = Math.floor((j-y)/sy);
          let aInd = (ax+ay*w)*4;
          if(data.data[aInd+3]){
            let ind = (i+j*this.width)*4;
            this.drawPixel_ind(ind,data.data[aInd],data.data[aInd+1],data.data[aInd+2],data.data[aInd+3],false);
          }
        }
      }
    }
    drawImage_basic_rot(data,x=0,y=0,a=0,dep=0,srx=0,sry=0){
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;

      let srx2 = 1-srx;
      let sry2 = 1-sry;

      let ox = x+w*srx-0.5;
      let oy = y+h*sry-0.5;

      let lar = (Math.abs(w)>Math.abs(h)?w:h)*this.sqrt2;
      let larSx = (srx<0.5?srx2:srx);
      let larSy = (sry<0.5?sry2:sry);
      let larS = (Math.abs(larSx)>Math.abs(larSy)?larSx:larSy);
      let left = Math.round(ox-lar*larS);
      let right = Math.round(ox+lar*larS);
      let top = Math.round(oy-lar*larS);
      let bottom = Math.round(oy+lar*larS);

      //if(a < Math.PI/2 && a >= 0) left += w*(larSx-0.5)*2;
      //left += Math.floor((Math.cos(a-Math.PI/2)+0.5)*w*(larSx-0.5));
      
      for(let j = Math.max(top,0); j < Math.min(bottom,this.height); j++){
        for(let i = Math.max(left,0); i < Math.min(right,this.width); i++){
          //let li = i-ox;
          //let ji = j-oy;
          //let sx2 = sx;
          //let sy2 = sy;
          let fi = Math.floor(i);
          let fj = Math.floor(j);
          let ax = Math.round(Math.cos(a)*(fi-ox)-Math.sin(a)*(fj-oy)+ox-x);
          let ay = Math.round(Math.sin(a)*(fi-ox)+Math.cos(a)*(fj-oy)+oy-y);
          //this.setData(ind,[255,0,0,255]);
          if(ax < 0) continue;
          if(ay < 0) continue;
          if(ax >= w) continue;
          if(ay >= h) continue;
          let aInd = (ax+ay*w)*4;
          
          //aInd = ((i-left)+(j-top)*w)*4;
          //if(Math.floor(Math.floor(performance.now())%100) <= 20) console.log("draw: ",ax,ay);
          //this.drawPixel_ind(ind,255,0,0,255,false);
          if(data.data[aInd+3]){
            let ind = (i+j*this.width)*4;
            this.drawPixel_ind(ind,data.data[aInd],data.data[aInd+1],data.data[aInd+2],data.data[aInd+3],false);
          }
        }
      }
    }
    drawImage_warp2_NOSXSY(data,x=0,y=0,sx=1,sy=1,a=0,dep=0,srx=0,sry=0){
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;

      let srx2 = 1-srx;
      let sry2 = 1-sry;

      let ox = x+w*srx+0.5;
      let oy = y+h*sry+0.5;

      let lar = (Math.abs(w)>Math.abs(h)?w:h)*this.sqrt2;
      let larSx = (srx<0.5?srx2:srx);
      let larSy = (sry<0.5?sry2:sry);
      let left = Math.floor(ox-lar*larSx);
      let right = Math.floor(ox+lar*larSx);
      let top = Math.floor(oy-lar*larSy);
      let bottom = Math.floor(oy+lar*larSy);

      //if(a < Math.PI/2 && a >= 0) left += w*(larSx-0.5)*2;
      //left += Math.floor((Math.cos(a-Math.PI/2)+0.5)*w*(larSx-0.5));
      
      for(let j = Math.max(top,0); j < Math.min(bottom,this.height); j++){
        for(let i = Math.max(left,0); i < Math.min(right,this.width); i++){
          let ax = Math.round(Math.cos(a)*(i-ox)-Math.sin(a)*(j-oy)+ox-x);
          let ay = Math.round(Math.sin(a)*(i-ox)+Math.cos(a)*(j-oy)+oy-y);
          let ind = (i+j*this.width)*4;
          this.setData(ind,[255,0,0,255]);
          if(ax < 0) continue;
          if(ay < 0) continue;
          if(ax >= w) continue;
          if(ay >= h) continue;
          let aInd = (ax+ay*w)*4;

          //aInd = ((i-left)+(j-top)*w)*4;
          //if(Math.floor(Math.floor(performance.now())%100) <= 20) console.log("draw: ",ax,ay);
          //this.drawPixel_ind(ind,255,0,0,255,false);
          //if(data.data[aInd+3]){
            //let ind = (i+j*this.width)*4;
            this.drawPixel_ind(ind,data.data[aInd],data.data[aInd+1],data.data[aInd+2],data.data[aInd+3],false);
          //}
        }
      }
    }
    drawImage_warp(data,x=0,y=0,sx=1,sy=1,a=0,dep=0,upright=false){
      //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
      //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
      if(this.useCam){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;

      let srx = 0.5;
      let sry = 0.5;
      let srx2 = 1-srx;
      let sry2 = 1-sry;
  
      let hw = Math.floor(w*srx);
      let hh = Math.floor(h*sry);
      let ox = hw-0.5;
      let oy = hh-0.5;
      let lar = h > w ? h : w;
      
      let oox = lar-w;
      let ooy = lar-h;
      hw *= sx;
      hw = Math.floor(hw);
      hh *= sy;
      hh = Math.floor(hh);
      lar *= sx;
      lar *= sy;
      lar = Math.floor(lar);
      for(let jj = Math.floor(-ooy-lar/2); jj < lar/sx+lar/2; jj++){
        for(let ii = Math.floor(-oox-lar/2); ii < lar/sy+lar/2; ii++){
          let i = ii;
          let j = jj;
          //let dx = i-hw;
          //let dy = j-hh;
          //let dist = Math.sqrt(dx*dx+dy*dy);
          //if(dist <= lar/2+1){
          if(true){
            let xx = (x+i-hw);
            let yy = (y+j-hh);
            let fakeI = Math.floor(this.flipX ? lar/sy-i-1 : i)/sx; //((w)-i-1)
            //this makes larger pixels - fakeI = Math.floor(fakeI);
            let fakeJ = j/sy; //j/2000 weird mechanic
            let ax = Math.round(Math.cos(a)*(fakeI-ox)-Math.sin(a)*(fakeJ-oy)+ox);
            let ay = Math.round(Math.sin(a)*(fakeI-ox)+Math.cos(a)*(fakeJ-oy)+oy);
            //epic loading effect xx *= (this.flipX ? Math.floor(w/sx) : 1);
            //if(this.flipX) xx = (x+((w)-i-2)-hw);
            let iS = (xx+yy*this.width);
            let tInd = iS*4;
            let ind = (ax+ay*w)*4;
            let doy = dep+(upright ? (h-j) : 0);
            if(ax >= 0 && ax < w && ay >= 0 && ay < h) if(data.data[ind+3]) if(this.dep[iS] <= doy){
              this.dep[iS] = doy;
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
              this.pixelCount++;
              this.setPixelCol(iS);
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_warp3D(data,x=0,y=0,sx=1,sy=1,aax=0,aay=0,aaz=0,dep=0,upright=false){
      //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
      //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
  
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      let ox = hw-0.5;
      let oy = hh-0.5;
      let lar = h > w ? h : w;
      
      let oox = lar-w;
      let ooy = lar-h;
      hw *= sx;
      hw = Math.floor(hw);
      hh *= sy;
      hh = Math.floor(hh);
      lar *= sx;
      lar *= sy;
      lar = Math.floor(lar);
      for(let jj = Math.floor(-ooy-lar/2); jj < lar/sx+lar/2; jj++){
        for(let ii = Math.floor(-oox-lar/2); ii < lar/sy+lar/2; ii++){
          let i = ii;
          let j = jj;
          //let dx = i-hw;
          //let dy = j-hh;
          //let dist = Math.sqrt(dx*dx+dy*dy);
          //if(dist <= lar/2+1){
          if(true){
            let xx = (x+i-hw);
            let yy = (y+j-hh);
            let fakeI = Math.floor(this.flipX ? lar/sy-i-1 : i)/sx; //((w)-i-1)
            //this makes larger pixels - fakeI = Math.floor(fakeI);
            let fakeJ = j/sy; //j/2000 weird mechanic
            let res = rot3D_s(fakeI,fakeJ,0,ox,oy,0,aax,aay,aaz);
            //let ax = Math.round(Math.cos(a)*(fakeI-ox)-Math.sin(a)*(fakeJ-oy)+ox);
            //let ay = Math.round(Math.sin(a)*(fakeI-ox)+Math.cos(a)*(fakeJ-oy)+oy);
            let ax = Math.round(res[0]);
            let ay = Math.round(res[1]);
            //epic loading effect xx *= (this.flipX ? Math.floor(w/sx) : 1);
            //if(this.flipX) xx = (x+((w)-i-2)-hw);
            let iS = (xx+yy*this.width);
            let tInd = iS*4;
            let ind = (ax+ay*w)*4;
            let doy = dep+(upright ? (h-j) : 0);
            if(ax >= 0 && ax < w && ay >= 0 && ay < h) if(data.data[ind+3]) if(this.dep[iS] <= doy){
              this.dep[iS] = doy;
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
              this.pixelCount++;
              this.setPixelCol(iS);
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_rot(data,x=0,y=0,a=0){
      //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
      //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
  
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      let ox = hw-0.5;
      let oy = hh-0.5;
      for(let j = 0; j < h; j++){
        for(let i = 0; i < w; i++){
          let xx = (x+i-hw);
          let yy = (y+j-hh);
          let ax = Math.round(Math.cos(a)*(i-ox)-Math.sin(a)*(j-oy)+ox);
          let ay = Math.round(Math.sin(a)*(i-ox)+Math.cos(a)*(j-oy)+oy);
          let iS = (xx+yy*this.width);
          let tInd = iS*4;
          let ind = (ax+ay*w)*4;
          if(data.data[ind+3]){
            this.buf[tInd] = data.data[ind];
            this.buf[tInd+1] = data.data[ind+1];
            this.buf[tInd+2] = data.data[ind+2];
            this.buf[tInd+3] = data.data[ind+3];
            this.setPixelCol(iS);
          }
        }
      }
  
      return 1;
    }
    drawImage_rot2(data,x=0,y=0,a=0){
      //p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
      //p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
  
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      let ox = hw-0.5;
      let oy = hh-0.5;
      let lar = h > w ? h : w;
      let oox = lar-w;
      let ooy = lar-h;
      for(let j = -ooy; j < lar; j++){
        for(let i = -oox; i < lar; i++){
          if(true){
            let xx = (x+i-hw);
            let yy = (y+j-hh);
            let ax = Math.round(Math.cos(a)*(i-ox)-Math.sin(a)*(j-oy)+ox);
            let ay = Math.round(Math.sin(a)*(i-ox)+Math.cos(a)*(j-oy)+oy);
            let iS = (xx+yy*this.width);
            let tInd = iS*4;
            let ind = (ax+ay*w)*4;
            if(data.data[ind+3]){
              this.buf[tInd] = data.data[ind];
              this.buf[tInd+1] = data.data[ind+1];
              this.buf[tInd+2] = data.data[ind+2];
              this.buf[tInd+3] = data.data[ind+3];
              this.setPixelCol(iS);
            }
          }
        }
      }
  
      return 1;
    }
    drawImage_dep(data,x=0,y=0,dep=0){
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      for(let j = 0; j < w; j++){
        for(let i = 0; i < h; i++){
          let ind = (i+j*w)*4;
          let xx = (x+i-hw);
          let yy = (y+j-hh);
          let tInd = (xx+yy*this.width)*4;
          let dInd = xx+yy*this.width;
          if(data.data[ind+3]) if(this.dep[dInd] <= dep){
            this.dep[dInd] = dep;
            this.buf[tInd] = data.data[ind];
            this.buf[tInd+1] = data.data[ind+1];
            this.buf[tInd+2] = data.data[ind+2];
            this.buf[tInd+3] = data.data[ind+3];
            this.pixelCount++;
          }
        }
      }
  
      return 1;
    }
    drawImage_depMap(data,x=0,y=0,depMap,dep=0){
      if(!depMap) return;
      x = Math.floor(x);
      y = Math.floor(y);
      let w = data.w;
      let h = data.h;
      if(w == 0) return;
      if(h == 0) return;
      if(!data.data) return;
      if(data.data.length == 0) return;
  
      let tx = x+w;
      let ty = y+h;
      if(tx > this.right) w -= tx-this.right;
      if(w <= 0) return;
      if(ty > this.bottom) h -= ty-this.bottom;
      if(h <= 0) return;
  
      let hw = Math.floor(w/2);
      let hh = Math.floor(h/2);
      for(let j = 0; j < w; j++){
        for(let i = 0; i < h; i++){
          let ind = (i+j*w)*4;
          let xx = (x+i-hw);
          let yy = (y+j-hh);
          let dInd = xx+yy*this.width;
          let tInd = dInd*4;
          let dep2 = depMap[ind]+depMap[ind+1]*this.height+dep;
          if(data.data[ind+3]) if(this.dep[dInd] <= dep2){
            this.dep[dInd] = dep2;
            this.buf[tInd] = data.data[ind];
            this.buf[tInd+1] = data.data[ind+1];
            this.buf[tInd+2] = data.data[ind+2];
            this.buf[tInd+3] = data.data[ind+3];
            this.pixelCount++;
          }
        }
      }
  
      return 1;
    }
  
    //set pixel and handle collision events
    setPixelCol(iS=0,noSet=false){
      if(!this.objId) return;
      let pastId = this.objId[iS];
      let obj1 = this.rObjs[this.gObjId-1];
      let hit = false;
      if(pastId) if(pastId != this.gObjId){
        hit = true;
        let obj0 = this.rObjs[pastId-1];
        if(obj0 == obj1) return;
        if(obj0){
          if(!obj0.collision){
            if(obj0.onhit) obj0.onhit(obj1);
            obj0.collision = true;
          }
          if(!obj0.hit) if(obj0.onhitenter) obj0.onhitenter(obj1);
          obj0.hit = true;
        }
        if(obj1){
          if(!obj1.collision){
            if(obj1.onhit) obj1.onhit(obj0);
            obj1.collision = true;
          }
          if(!obj1.hit) if(obj1.onhitenter) obj1.onhitenter(obj0);
          obj1.hit = true;
        }
      }
      else if(false){
        if(obj1.hit){
          obj1.hit = false;
          if(obj1.onhitleave) obj1.onhitleave();
        }
      }
      if(!noSet) this.objId[iS] = this.gObjId;
      return hit;
    }
  
    //TEXT
    drawLetter(l,x,y,c,border){
      let d = letterData[l];
      if(!d) return;
      let row = 0;
      let collumn = 0;
      x--;
      y -= 2;
      if(border){
        this.drawLine_smart(x-1,y-1,x+3,y-1,border,1);
        this.drawLine_smart(x-1,y+5,x+3,y+5,border,1);
        this.drawLine_smart(x-1,y-1,x-1,y+5,border,1);
        this.drawLine_smart(x+3,y-1,x+3,y+5,border,1);
      }
      for(let i = 0; i < d.length; i++){
        if(d[i]){
          row = Math.floor(i/3);
          collumn = i%3;
          this.setPixel(x+collumn,y+row,c);
        }
        else if(border){
          row = Math.floor(i/3);
          collumn = i%3;
          this.setPixel(x+collumn,y+row,border);
        }
      }
    }
    drawLetter_custom(tData,l,x,y,c,border){
      let data = tData;
      let d = tData[l];
      if(!d){
        d = letterData[l];
        data = letterData;
      }
      if(!d) return;
      let row = 0;
      let collumn = 0;
      x--;
      y -= data.halfh;
      if(border){
        this.drawLine_smart(x-1,y-1,x+data.rwidth,y-1,border,1);
        this.drawLine_smart(x-1,y+data.height,x+data.rwidth,y+data.height,border,1);
        this.drawLine_smart(x-1,y-1,x-1,y+data.height,border,1);
        this.drawLine_smart(x+data.rwidth,y-1,x+data.rwidth,y+data.height,border,1);
      }
      for(let i = 0; i < d.length; i++){
        if(d[i]){
          row = Math.floor(i/data.rwidth);
          collumn = i%data.rwidth;
          this.setPixel(x+collumn,y+row,c);
        }
        else if(border){
          row = Math.floor(i/data.rwidth);
          collumn = i%data.rwidth;
          this.setPixel(x+collumn,y+row,border);
        }
      }
    }
    drawText(text,x,y,c,border,glow=false,centered=true,camera=false){
      if(camera){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      let half = (text.length/2*4);
      if(glow) this.drawCircle_grad(x,y,8,[0,0,0,220]);
      if(border === true) border = [0,0,0,c[3]];
      else if(border) border = [border[0],border[1],border[2],c[3]];
      for(let i = 0; i < text.length; i++){
        this.drawLetter(text[i],x+i*4-(centered?(half):-2),y,c,border);
      }
    }
    drawText_custom(tData,text,x,y,c,border,glow=false,camera=false){
      if(camera){
        x -= this.camX;
        y -= this.camY;
        y += this.camZ;
      }
      if(glow) this.drawCircle_grad(x,y,8,[0,0,0,220]);
      if(border === true) border = [0,0,0,c[3]];
      else if(border) border = [border[0],border[1],border[2],c[3]];
      for(let i = 0; i < text.length; i++){
        this.drawLetter_custom(tData,text[i],x+i*tData.width,y,c,border);
      }
    }
  
    //Compressed images
    drawCompressedImage(com,x,y){
      let ind = (x+y*this.width)*4;
      let tInd = 0;
      let ok = Object.keys(com.buf);
      for(let i = 0; i < ok.length; i++){
        let k = ok[i];
        let d = com.buf[k];
        this.setData_dep(k,d[0],d[1]);
      }
    }
  }
  NobsinCtx.prototype.inits = [];
  
  var valll = 0;
  
  const BlendModes = {
    normal:0,
    under:1
  };
  
  function deepClone(ar){
    if(!ar) return ar;
    if(typeof ar != "object") return ar;
    let ok = Object.keys(ar);
    let a = ar.length != null ? [] : {};
    for(let i = 0; i < ok.length; i++){
        let k = ok[i];
        let val = ar[k];
        if(typeof val == "object") val = deepClone(val);
        a[k] = val;
    }
    return a;
  }
  
  //create trig tables
  var TrigTable = {
    sin:new Float32Array(360),
    cos:new Float32Array(360)
  }
  for(let i = 0; i < 360; i++){
    let a = i*Math.PI/180;
    TrigTable.sin[i] = Math.sin(a);
    TrigTable.cos[i] = Math.cos(a);
  }
  var Trig = {
    sin:function(v){
      v = Math.floor(v);
      v %= 360;
      if(v < 0) v = 360+v;
      return TrigTable.sin[v] || 0;
    },
    cos:function(v){
      v = Math.floor(v);
      v %= 360;
      if(v < 0) v = 360+v;
      return TrigTable.cos[v] || 1;
    }
  };
  
  class NobsinTextureLoader{
    constructor(){
      let c = document.createElement("canvas");
      this.dummy = c.getContext("2d");
  
      this.buf = [];
      this.names = {};
    }
  
    dummy;
    buf;
    names;
  
    load(path="",name,call,atr={}){
      let img = new Image();
      let data = {img,data:null,loaded:false,w:0,h:0};
      let ind = this.buf.length;
      this.buf[ind] = data;
  
      if(name == null) name = ind;
      this.names[name] = ind;
      //Access by: tl.buf[tl.names.char]
  
      img.src = "images/"+path;
      let dummy = this.dummy;
      img.onload = function(){
        data.loaded = true;
        
        let img = data.img;
        data.w = img.width;
        data.h = img.height;
        dummy.canvas.width = img.width;
        dummy.canvas.height = img.height;
        dummy.drawImage(img,0,0);
        data.data = dummy.getImageData(0,0,img.width,img.height).data;
        
        if(call) call(data);
      };
  
      //atr
      if(atr.depMap){
        data.dep = this.load(atr.depMap,name+"_dep");
      }
      //
  
      return data;
    }
    loadAnim(url="",name,cw,ch,call,atr={}){
      let t = this;
      let list = [];
      let img = this.load(url,name,function(d){
        let sw = Math.floor(d.w/cw);
        for(let ii = 0; ii < sw; ii++){ //loop through frames found
          let dat = new Uint8ClampedArray(cw*ch*4);
  
          for(let j = 0; j < ch; j++){
            for(let i = 0; i < cw; i++){
              let xx = i+ii*cw;
              let ind = (i+j*cw)*4;
              let indF = (xx+j*d.w)*4;
              dat[ind] = d.data[indF];
              dat[ind+1] = d.data[indF+1];
              dat[ind+2] = d.data[indF+2];
              dat[ind+3] = d.data[indF+3];
            }
          }
  
          if(name) t.names[name+"_"+ii] = t.buf.length;
          let dd = {w:cw,h:ch,loaded:true,data:dat};
          t.buf[t.buf.length] = dd;
          list.push(dd);
          if(atr.rev){ //also create anim in reverse
            list.rev.splice(0,0,dd);
          }
        }
        if(atr.rubberband){ //go forwards and back through anim
          let l = list.length-1;
          for(let i = 1; i < l; i++){
            list.push(list[l-i]);
          }
        }
  
        //this.buf[this.buf.length] = 
      });
      if(atr.delay) list.delay = atr.delay;
      if(atr.rev){ //also create anim in reverse
        list.rev = []; //deepClone(list).reverse()
      }
      return list;
    }
  }
  
  var tl = new NobsinTextureLoader();
  //var imgA = tl.load("char.png","char",null,{depMap:"char_dep.png"});
  //var imgB = tl.load("char2.png","char2");
  //var testAnim = tl.loadAnim("anim.png","anim",8,8);
  
  //var slicerImg = tl.load("enemies/schlom.png");
  
  //Rotation math functions
  
  function rot2D(x,y,ox,oy,a){
    return [
      Math.cos(a)*(x-ox)-Math.sin(a)*(y-oy)+ox,
      Math.sin(a)*(x-ox)+Math.cos(a)*(y-oy)+oy
    ];
  }
  
  function rot3D(x,y,z,ox,oy,oz,ax,ay,az){
    //global rotation around x
    let r = rot2D(y,z,oy,oz,ax);
    y = r[0];
    z = r[1];
  
    //global rotation around y
    r = rot2D(x,z,ox,oz,ay);
    x = r[0];
    z = r[1];
  
    //global rotation around z
    r = rot2D(x,y,ox,oy,az);
    x = r[0];
    y = r[1];
  
    return [x,y,z];
  }
  
  function rot3D_s(x,y,z,ox,oy,oz,ax,ay,az){ //returns screen coords for rot3D
    //global rotation around x
    let r = rot2D(y,z,oy,oz,ax);
    y = r[0];
    z = r[1];
  
    //global rotation around y
    r = rot2D(x,z,ox,oz,ay);
    x = r[0];
    z = r[1];
  
    //global rotation around z
    r = rot2D(x,y,ox,oy,az);
    x = r[0];
    y = r[1];
  
    return [x,y-z/2];
  }
  
  //Multiple canvas helpers
  //This should not be used to create the main nob context or contexts that are perminent as it uses slightly more memory, can be more annoying to work with on a larger scale, and can be slower with thousands of draw calls. The registerNob2 function creates temporary small canvases that will constantly resized and redrawn to. These are used for layering rotation effects for images, making a parent child system or doing image effects on a small set of data.
  
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
  
  //Convert nob context to image
  //this is slow because of js object creation, store and get from reference.
  function fromNob(_nob){
    return {
      loaded:true,w:_nob.width,h:_nob.height,
      data:_nob.buf
    };
  }
  
  var nob2nds = [];
  var nob2Ref = {};
  function registerNob(id,w=1,h=1){ //register a new nob context
    if(id != null) if(nob2Ref[id]){
      let n = nob2Ref[id];
      if(n.nob.width != w || n.nob.height != h){
        n.c.width = w;
        n.c.height = h;
        let no = n.nob;
        no.width = w;
        no.height = h;
        no.right = w-1;
        no.bottom = h-1;
        no.centerX = Math.floor(w/2);
        no.centerY = Math.floor(h/2);
        let ssize = w*h;
        let size = ssize*4;
        no.buf = new Uint8ClampedArray(size);
        no.dep = new Uint8ClampedArray(ssize);
        //n.nob = new NobsinCtx(n.c.getContext("2d"));
      }
      return n;
    }
    let _c = document.createElement("canvas");
    _c.width = w;
    _c.height = h;
    let _ctx = _c.getContext("2d");
    let _nob = new NobsinCtx(_ctx);
    _nob.pixelCount = 0;
    _nob.buf = new Uint8ClampedArray(_nob.size);
    _nob.dep = new Uint8ClampedArray(_nob.ssize);
    let d = {
      c:_c,
      nob:_nob
    };
    if(id != null) nob2Ref[id] = d;
    nob2nds.push(d);
    return d;
  }
  function freeNob(data){ //safe delete nob, not complete, doesn't clear from id list
    nob2nds.splice(nob2nds.indexOf(data),1);
    delete data;
  }
  function registerNob2(id,w=1,h=1){ //register a new nob context with automatic *3 to handle rotation overscale
    if(id != null) if(nob2Ref[id]) return nob2Ref[id];
    let _c = document.createElement("canvas");
    _c.width = w*3;
    _c.height = h*3;
    let _ctx = _c.getContext("2d");
    let _nob = new NobsinCtx(_ctx);
    _nob.pixelCount = 0;
    _nob.buf = new Uint8ClampedArray(_nob.size);
    _nob.dep = new Uint8ClampedArray(_nob.ssize);
    let d = {
      c:_c,
      nob:_nob
    };
    if(id != null) nob2Ref[id] = d;
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
  nob.drawImage_warp({
    w:nw,h:nh,loaded:true,
    data:_nob.buf
  },nob.centerX,nob.centerY+20,1,1,Math.PI/4,0,false);
  */
  
  /* //This uses the new functions but produces the same result with better performance
  let _nob = registerNob2("nob1",1,1);
  let aa = performance.now()/50;
  _nob.drawImage_warp(img,_nob.centerX,_nob.centerY,1,0.5,aa,0,false);
  nob.drawImage_warp(fromNob(_nob),nob.centerX,nob.centerY+20,1,1,Math.PI/4,0,false);
  */
  
  /**
   * ~~~~~~~~~~~~~~~~
   * COLOR CONVERTERS
   * ~~~~~~~~~~~~~~~~
   */
  //color coverter static
  var cc_st = {
    dummy:null
  };
  cc_st.dummy = document.createElement("canvas");
  cc_st.dummy.width = 1;
  cc_st.dummy.height = 1;
  cc_st.c = cc_st.dummy.getContext("2d");
  function convert(color){
    cc_st.c.clearRect(0,0,1,1);
    cc_st.c.fillStyle = color;
    cc_st.c.fillRect(0,0,1,1);
    return cc_st.c.getImageData(0,0,1,1).data;
  }
  
  /**
   * ~~~~~~~~~~~~~~~~
   * SUBSCRIBE EVENTS
   * ~~~~~~~~~~~~~~~~
   * added 7-8-21 from Inter-Shooter 4 project
   */
  var subEvt = [];
  var subEvtLate = [];
  function subAnim(t,f,i=1,late=false){ //total frames, function, incriment
    if(!late){
      subEvt.push([0,t,f,i]);
      return subEvt[subEvt.length-1];
    }
    else{
      subEvtLate.push([0,t,f,i]);
      return subEvtLate[subEvtLate.length-1];
    }
  }
  function clearEvt(e){
    let i = subEvt.indexOf(e);
    if(i != -1) subEvt.splice(i,1);
    else{
      i = subEvtLate.indexOf(e);
      if(i != -1) subEvtLate.splice(i,1);
    }
  }
  function updateEvts(){
    let subList = [];
    for(let i = 0; i < subEvt.length; i++){
      subList.push(subEvt[i]);
    }
    for(let i = 0; i < subList.length; i++){
      let e = subList[i];
      e[2](e[0],e[1],e);
      e[0] += e[3];
      if(e[0] >= e[1]){
        subEvt.splice(subEvt.indexOf(e),1);
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
    width:6,
    height:5,
    halfh:2,
    rwidth:5,
    "H":[
      1,0,0,0,1,
      1,0,0,0,1,
      1,1,1,1,1,
      1,0,0,0,1,
      1,0,0,0,1
    ],
    "W":[
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,1,0,1,
      1,1,0,1,1,
      1,0,0,0,1
    ],
  
    //special characters
    "u":[
      0,0,1,0,0,
      0,1,1,1,0,
      1,1,1,1,1,
      0,0,1,0,0,
      0,0,1,0,0
    ],
    "d":[
      0,0,1,0,0,
      0,0,1,0,0,
      1,1,1,1,1,
      0,1,1,1,0,
      0,0,1,0,0
    ]
  };
  var letterData = {
    width:4,
    height:5,
    halfh:2,
    rwidth:3,
    0:[
      1,1,1,
      1,0,1,
      1,0,1,
      1,0,1,
      1,1,1
    ],
    1:[
      1,1,0,
      0,1,0,
      0,1,0,
      0,1,0,
      1,1,1
    ],
    2:[
      1,1,1,
      0,0,1,
      1,1,1,
      1,0,0,
      1,1,1
    ],
    3:[
      1,1,1,
      0,0,1,
      0,1,1,
      0,0,1,
      1,1,1
    ],
    4:[
      1,0,1,
      1,0,1,
      1,1,1,
      0,0,1,
      0,0,1
    ],
    5:[
      1,1,1,
      1,0,0,
      1,1,1,
      0,0,1,
      1,1,1
    ],
    6:[
      1,1,1,
      1,0,0,
      1,1,1,
      1,0,1,
      1,1,1
    ],
    7:[
      1,1,1,
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
    ],
    8:[
      1,1,1,
      1,0,1,
      1,1,1,
      1,0,1,
      1,1,1
    ],
    9:[
      1,1,1,
      1,0,1,
      1,1,1,
      0,0,1,
      0,0,1
    ],
    "/":[
      0,0,1,
      0,0,1,
      0,1,0,
      0,1,0,
      1,0,0
    ],
  
    "A":[
      1,1,1,
      1,0,1,
      1,1,1,
      1,0,1,
      1,0,1
    ],
    "B":[
      1,1,1,
      1,0,1,
      1,1,0,
      1,0,1,
      1,1,1
    ],
    "C":[
      1,1,1,
      1,0,0,
      1,0,0,
      1,0,0,
      1,1,1
    ],
    "D":[
      1,1,0,
      1,0,1,
      1,0,1,
      1,0,1,
      1,1,0
    ],
    "E":[
      1,1,1,
      1,0,0,
      1,1,0,
      1,0,0,
      1,1,1
    ],
    "F":[
      1,1,1,
      1,0,0,
      1,1,0,
      1,0,0,
      1,0,0
    ],
    "G":[
      1,1,1,
      1,0,0,
      1,0,1,
      1,0,1,
      1,1,1
    ],
    "H":[
      1,0,1,
      1,0,1,
      1,1,1,
      1,0,1,
      1,0,1
    ],
    "I":[
      1,1,1,
      0,1,0,
      0,1,0,
      0,1,0,
      1,1,1
    ],
    "J":[
      1,1,1,
      0,1,0,
      0,1,0,
      0,1,0,
      1,1,0
    ],
  
    "K":[
      1,0,1,
      1,0,1,
      1,1,0,
      1,0,1,
      1,0,1
    ],
    "L":[
      1,0,0,
      1,0,0,
      1,0,0,
      1,0,0,
      1,1,1
    ],
    "M":[
      1,0,1,
      1,1,1,
      1,1,1,
      1,0,1,
      1,0,1
    ],
    "N":[
      1,0,1,
      1,1,1,
      1,1,1,
      1,1,1,
      1,0,1
    ],
    "O":[
      0,1,0,
      1,0,1,
      1,0,1,
      1,0,1,
      0,1,0
    ],
    "P":[
      1,1,0,
      1,0,1,
      1,1,0,
      1,0,0,
      1,0,0
    ],
    "Q":[
      0,1,0,
      1,0,1,
      1,0,1,
      1,0,1,
      0,1,1
    ],
    "R":[
      1,1,0,
      1,0,1,
      1,1,0,
      1,0,1,
      1,0,1
    ],
    "S":[
      0,1,1,
      1,0,0,
      0,1,0,
      0,0,1,
      1,1,0
    ],
    "T":[
      1,1,1,
      0,1,0,
      0,1,0,
      0,1,0,
      0,1,0
    ],
    "U":[
      1,0,1,
      1,0,1,
      1,0,1,
      1,0,1,
      1,1,1
    ],
    "V":[
      1,0,1,
      1,0,1,
      1,0,1,
      1,0,1,
      0,1,0
    ],
  
    "W":[
      1,0,1,
      1,0,1,
      1,1,1,
      1,1,1,
      1,0,1
    ],
    "X":[
      1,0,1,
      1,0,1,
      0,1,0,
      1,0,1,
      1,0,1
    ],
    "Y":[
      1,0,1,
      1,0,1,
      0,1,0,
      0,1,0,
      0,1,0
    ],
    "Z":[
      1,1,1,
      0,0,1,
      0,1,0,
      1,0,0,
      1,1,1
    ],
    " ":[
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0
    ],
  
    "+":[
      0,0,0,
      0,1,0,
      1,1,1,
      0,1,0,
      0,0,0
    ],
    "-":[
      0,0,0,
      0,0,0,
      1,1,1,
      0,0,0,
      0,0,0
    ],
    ":":[
      0,0,0,
      0,1,0,
      0,0,0,
      0,1,0,
      0,0,0
    ],
    "|":[
      0,1,0,
      0,1,0,
      0,1,0,
      0,1,0,
      0,1,0
    ],
  
    //0.1.7 symbols
    ",":[
      0,0,0,
      0,0,0,
      0,0,0,
      0,1,0,
      0,1,0
    ],
    ".":[
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0,
      0,1,0
    ],
    ";":[
      0,0,0,
      0,1,0,
      0,0,0,
      0,1,0,
      0,1,0
    ],
    "'":[
      0,1,0,
      0,1,0,
      0,0,0,
      0,0,0,
      0,0,0
    ],
    '"':[
      1,0,1,
      1,0,1,
      0,0,0,
      0,0,0,
      0,0,0
    ],
    "=":[
      0,0,0,
      1,1,1,
      0,0,0,
      1,1,1,
      0,0,0
    ],
    "?":[
      1,1,1,
      0,0,1,
      0,1,1,
      0,0,0,
      0,1,0
    ],
    "!":[
      0,1,0,
      0,1,0,
      0,1,0,
      0,0,0,
      0,1,0
    ],
    "*":[
      1,0,1,
      0,1,0,
      1,0,1,
      0,0,0,
      0,0,0
    ],
    "(":[
      0,1,0,
      1,0,0,
      1,0,0,
      1,0,0,
      0,1,0
    ],
    ")":[
      0,1,0,
      0,0,1,
      0,0,1,
      0,0,1,
      0,1,0
    ],
    "[":[
      1,1,0,
      1,0,0,
      1,0,0,
      1,0,0,
      1,1,0
    ],
    "]":[
      0,1,1,
      0,0,1,
      0,0,1,
      0,0,1,
      0,1,1
    ],
  
    //SPECIAL SHAPES
    "l":[
      0,0,1,
      0,1,1,
      1,1,1,
      0,1,1,
      0,0,1
    ],
    "r":[
      1,0,0,
      1,1,0,
      1,1,1,
      1,1,0,
      1,0,0
    ],
    "u":[
      0,1,0,
      1,1,1,
      0,1,0,
      0,1,0,
      0,1,0
    ]
  };
  
  function createCompressedImage(nob){
    let buf = {};
    for(let i = 0; i < nob.size; i += 4){
      if(nob.buf[i+3]){
        if(!buf[i]) buf[i] = [];
        buf[i].push([[nob.buf[i],nob.buf[i+1],nob.buf[i+2],255],nob.dep[i]]);
      }
    }
    let d = {
      w:nob.width,
      h:nob.height,
      buf
    };
    return d;
  }

  var clear = [0,0,0,0];

//BEZIERS (9-2-22 - a1.3.0)
function drawBezier(nob1,bez,x=0,y=0,dep=0){
  bez.list = [];
  for(let i1 = 0; i1 < 1; i1 += 0.01){
      _drawBez(nob1,bez,i1,x,y,dep);
  }
  for(let j = 0; j < bez.list.length; j++){
      let c = bez.list[j];
      let c1 = bez.list[j+1];
      if(!c1) break;
      nob1.drawLine_smart_dep(c[0],c[1],c1[0],c1[1],bez.col,bez.w,dep);
  }
}
function _drawBez(nob,bez,i,xx=0,yy=0){
  let t = bez;
  if(true/**doShake */) for(let j = 0; j < t.c.length; j++){
      let c = t.c[j];
      if(c[2] == null) c[2] = c[0];
      if(c[3] == null) c[3] = c[1];
      let ang = performance.now()/300+j;
      let r = 0;//shake; //2
      c[0] = c[2]+Math.cos(ang)*r+xx;
      c[1] = c[3]+Math.sin(ang)*r+yy;
  }
  let mids = deepClone(t.c);
  let times = t.c.length;
  let lvl = 0;
  let col = [
      [255,0,0,50],
      [255,200,0,50],
      [255,255,0,50],
      [0,100,0,50],
      [0,0,255,50],
      [200,50,220,50],
      [0,0,0,255]
  ];
  function ss(){
      let ar = [];
      for(let j = 0; j < mids.length-1; j++){
          let m = mids[j];
          let nm = mids[j+1];
          if(!nm){
              console.log("no nm");
              continue;
          }
          let color = col[lvl];
          let fm = mids[j+2];
          if(!fm){
              if(mids.length == 2){
                  // lvl--;
                  let mid = doMid(nob,i,m[0],m[1],nm[0],nm[1]);
                  ar.push(mid);
                  color = col[lvl];
                  drawRectc(mid[0],mid[1],2,color);
              }
              {
                  lvl++;
                  for(let j1 = 0; j1 < ar.length; j1++){
                      let c = ar[j1];
                      drawRectc(c[0],c[1],2,col[lvl]);
                  }
                  mids = ar;
                  lvl++;
                  if(mids.length == 1){
                      t.list.push(ar[0]);
                  }
                  if(lvl > times){
                      //list.push(ar[0]);
                      continue;
                  }
                  ss();
              }
              break;
          }
          drawRectc(m[0],m[1],1,color);
          drawRectc(nm[0],nm[1],1,color);
          drawRectc(fm[0],fm[1],1,color);
          let d = doLine(nob,i,m[0],m[1],nm[0],nm[1]);
          let qx = d.qx;
          let qy = d.qy;
          d = doLine(nob,i,nm[0],nm[1],fm[0],fm[1]);
          let qx1 = d.qx;
          let qy1 = d.qy;
          let mid = doMid(nob,i,qx,qy,qx1,qy1);
          color = col[lvl];
          drawRectc(qx,qy,2,color);
          drawRectc(qx1,qy1,2,color);
          ar.push(mid);
      }
  }
  ss();
}
function nobCreateBezier(c,w,col){
  return {
      w,c,col,
      list:[]
  };
}
let _drawBezDebug = false;
const _bezLightgreen = [200,255,200,220];
const _bezGray = [200,200,200,50];
function drawRectc(nob,x,y,w,c,over=false){
  if(!over) if(!_drawBezDebug) return;
  if(w == 1) nob.setPixel(x,y,c);
  nob.drawRect(x-Math.floor(w/2),y-Math.floor(w/2),w,w,c);
}
function getAng(x,y,x1,y1){
  let dx = x1-x;
  let dy = y1-y;
  return Math.atan2(dy,dx);
}
function doLine(nob,i,x,y,tx,ty){
  let dx1 = tx-x;
  let dy1 = ty-y;
  let dist1 = Math.sqrt(dx1**2+dy1**2);
  let ang1 = Math.atan2(dy1,dx1);
  let q0x = x+Math.cos(ang1)*dist1*i;
  let q0y = y+Math.sin(ang1)*dist1*i;
  if(_drawBezDebug) nob.drawLine_smart(x,y,tx,ty,_bezGray,1);
  return {
      qx:q0x,
      qy:q0y
  };
}
function doMid(nob,i,sx,sy,tx,ty){
  if(_drawBezDebug) nob.drawLine_smart(sx,sy,tx,ty,_bezLightgreen,1);
  let dx = tx-sx;
  let dy = ty-sy;
  let x = sx+dx*i;
  let y = sy+dy*i;
  return [x,y];
}