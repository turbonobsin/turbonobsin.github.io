class NobsinEngine{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.buf = new Uint8ClampedArray(width*height*4);
    }

    width;
    height;
    buf;

    setPixel(x,y,color){
        x = Math.floor(x);
        y = Math.floor(y);
        
        if(x < 0) return;
        if(y < 0) return;
        if(x >= this.width) return;
        if(y >= this.height) return;

        let ind = (x+y*this.width)*4;

        this.buf[ind] = color[0];
        this.buf[ind+1] = color[1];
        this.buf[ind+2] = color[2];
        this.buf[ind+3] = color[3];
    }
}