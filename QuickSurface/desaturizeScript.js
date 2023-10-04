SR.loopAllPixels((x,y,i)=>{
    i *= 4;

    let buf = img.curLayer.nob.buf;
    let src = R_G_B_AtoH_S_L_A(buf[i],buf[i+1],buf[i+2],buf[i+3]);

    
    src[1] = 0;
    // src[2] *= 1.25;
    // let contrast = 1/src[2]*2;
    src = H_S_L_AtoR_G_B_A(src[0],src[1],src[2],src[3]);

    // let av = (src[0]+src[1]+src[2])/3;
    let av = 127;
    // let contrast = 0.4;
    let contrast = 0.2;
    let lightness = 50;

    src[0] += (av-src[0])*contrast;
    src[1] += (av-src[1])*contrast;
    src[2] += (av-src[2])*contrast;

    src[0] += lightness;
    src[1] += lightness;
    src[2] += lightness;

    src[0] = Math.min(255,src[0]);
    src[1] = Math.min(255,src[1]);
    src[2] = Math.min(255,src[2]);

    buf[i] = src[0];
    buf[i+1] = src[1];
    buf[i+2] = src[2];
    buf[i+3] = src[3];
});