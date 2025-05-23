class NobsinCtx{
    constructor(ctx){
      this.ctx = ctx;
      ctx.imageSmoothingEnabled = false;
  
      let can = ctx.canvas;
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
    }
    ctx;
    buf;
    dep;
    size;
    width;
    height;
    background;
    
    centerX;
    centerY;
    right;
    bottom;
  
    blendMode = 0;
    pixelCount = 0;
  
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
    setPixel(x=0,y=0,col){
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
    setPixel_ex(ind,col){
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
        this.buf[ind+3] = 255;
      }
      this.pixelCount++;
    }
    setPixel_dep(x=0,y=0,col,dep=0){
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
    drawCircle(x1,y1,r,col){
      //if(Math.ceil(r) <= 0) return;
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
    drawCircle_grad(x1,y1,r,col){ //circle with gradient, ex by default
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
            this.setPixel_ex(ind,c2);
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
      for(let j = 0; j < d; j++){
        let j2 = j-r;
        let l;
        if(r < 6) l = Math.floor(Math.abs(Math.sqrt(r*r-j2*j2)));
        else l = Math.round(Math.abs(Math.sqrt(r*r-j2*j2)));
        x += (r-l);
        ind += (r-l)*4;
        for(let i = r-l; i < r+l; i++){
          let pass = true;
          if(i != r-l && i != r+l-1) pass = false;
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
    drawRect_dep(x,y,w,h,col,dep=0){
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
              this.setPixel(x0+i,y0,c);
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              this.setPixel(x0,y0+i,c);
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
      //posibly temp
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
  
        let dx = Math.abs(x1-x0);
        let sx = x0<x1 ? 1 : -1;
        let dy = -Math.abs(y1-y0);
        let sy = y0<y1 ? 1 : -1;
        let err = dx+dy;
  
        while(true){
          if(am >= 1){ //vertical slope
            for(let i = -hw; i <= hw; i++){
              this.setPixel_dep(x0+i,y0,c,dep);
            }
          }
          else{ //horz slope
            for(let i = -hw; i <= hw; i++){
              this.setPixel_dep(x0,y0+i,c,dep);
            }
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
    drawImage_basic(data,x=0,y=0){
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
    drawImage_warp(data,x=0,y=0,sx=1,sy=1,a=0,dep=0,upright=false){
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
  
          t.names[name+"_"+ii] = t.buf.length;
          let dd = {w:cw,h:ch,loaded:true,data:dat};
          t.buf[t.buf.length] = dd;
          list.push(dd);
        }
  
        //this.buf[this.buf.length] = 
      });
      return list;
    }
  }
  
  var tl = new NobsinTextureLoader();
  var imgA = tl.load("char.png","char",null,{depMap:"char_dep.png"});
  var imgB = tl.load("char2.png","char2");
  var testAnim = tl.loadAnim("anim.png","anim",8,8);
  
  //var slicerImg = tl.load("enemies/schlom.png");