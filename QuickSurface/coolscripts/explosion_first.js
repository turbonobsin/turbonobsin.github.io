for(let i = 0; i < 15; i++){
    createFrame(i);
    SR.loopAllPixels((x,y,i)=>{
        SR.drawPixel(x,y,[SR.rand255(),0,0,255]); //rand255()/10
    });   
    // for(let j = 0; j < 3; j++) img.curLayer.nob.drawCircle_grad(project.w/2,project.h/2,12,red,false);

    createLayer(1,"circle");

    img.curLayer.nob.drawCircle(project.w/2,project.h/2,2+i,[255,0,0,255]);
    img.curLayer.nob.drawCircle(project.w/2,project.h/2,2+i/2,[255,255,255,255]);
}  

deleteFrame(project.frames.length-1);       