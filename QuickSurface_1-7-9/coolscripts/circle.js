// for(let j = 0; j < 30; j++){
//     for(let i = 0; i < Math.PI*2; i += Math.PI*2 / 1000){
//         let rad = project.w*0.1*j/3;
//         let tx = Math.cos(i)*rad+project.w/2+0.5;
//         let ty = Math.sin(i)*rad+project.h/2+0.5;
//         SR.drawPixel(tx,ty,black);
//     }
//     createFrame(j);
// }

(async ()=>{
    var lastx = null;
    var lasty = null;
    var n = img.curLayer.nob;
    var amt = 0;
    for(let j = 0; j < 120; j++){
        for(let k = 0; k < 1; k++){
            var n = img.curLayer.nob;
            let i = amt/(120*1)*Math.PI*2;
            let rad = project.w*0.3;
            let tx = Math.cos(i)*rad+project.w/2+0.5;
            let ty = Math.sin(i)*rad+project.h/2+0.5;
            if(lastx != null) n.drawLine_smart(lastx,lasty,tx,ty,black,3);
            else n.drawRect(tx,ty,3,3,black);
            lastx = tx;
            lasty = ty;
            amt++;
        }
        cloneFrame(j,j+1,true);
        await wait(1);
    }
})();

(async ()=>{
    var lastx = null;
    var lasty = null;
    var n = img.curLayer.nob;
    var objs = [];

    n.drawRect(0,0,project.w,project.h,[0,0,0,255]);

    for(let i = 0; i < 120; i++){
        var n = img.curLayer.nob;

        let speed = 3;

        n.drawRect(0,0,project.w,project.h,[0,0,0,100]);

        objs.push([
            project.w/2,project.h/2,
            (Math.random()-0.5)*speed,
            (Math.random()-0.5)*speed
        ]);

        for(let i = 0; i < objs.length; i++){
            let o = objs[i];
            o[0] += o[2];
            o[1] += o[3];
            n.setPixel(o[0],o[1],white);
        }
        
        cloneFrame(i,i+1);
        await wait(1);
    }
    deleteFrame(project.frames.length-1);
})();

//perfect pSim
(async ()=>{
    var lastx = null;
    var lasty = null;
    var n = img.curLayer.nob;
    var objs = [];

    n.drawRect(0,0,project.w,project.h,[0,0,0,255]);

    for(let i = 0; i < 120; i++){
        var n = img.curLayer.nob;

        let speed = 3;

        n.drawRect(0,0,project.w,project.h,[0,0,0,100]);

        for(let j = 0; j < 3; j++) objs.push([
            project.w/2,project.h/2,
            0.5*speed+0.5,
            Math.random()*Math.PI*2,
            0
            // (Math.random()-0.5)*speed
        ]);

        for(let i = 0; i < objs.length; i++){
            let o = objs[i];
            let vx = 0;
            let vy = 0;

            vx = Math.cos(o[3])*o[2];
            vy = Math.sin(o[3])*o[2];

            o[4] += 0.005;
            o[2] *= 0.97;
            o[3] += o[4];
            // o[3] += 0.02;

            o[0] += vx;
            o[1] += vy;
            // o[0] += o[2];
            // o[1] += o[3];
            n.setPixel(o[0],o[1],white);
        }
        
        cloneFrame(i,i+1,true);
        await wait(1);
    }
    deleteFrame(project.frames.length-1,true);
})();

//faster/bigger
(async ()=>{
    var lastx = null;
    var lasty = null;
    var n = img.curLayer.nob;
    var objs = [];

    n.drawRect(0,0,project.w,project.h,[0,0,0,255]);

    for(let i = 0; i < 120; i++){
        var n = img.curLayer.nob;

        let speed = 3;

        n.drawRect(0,0,project.w,project.h,[0,0,0,100]);

        for(let j = 0; j < 3; j++) objs.push([
            project.w/2,project.h/2,
            0.8*speed+0.5,
            Math.random()*Math.PI*2,
            -0.05
            // (Math.random()-0.5)*speed
        ]);

        for(let i = 0; i < objs.length; i++){
            let o = objs[i];
            let vx = 0;
            let vy = 0;

            vx = Math.cos(o[3])*o[2];
            vy = Math.sin(o[3])*o[2];

            o[4] += 0.002;
            o[2] *= 0.985;
            o[3] += o[4];
            // o[3] += 0.02;

            o[0] += vx;
            o[1] += vy;
            // o[0] += o[2];
            // o[1] += o[3];
            n.setPixel(o[0],o[1],white);
        }
        
        cloneFrame(i,i+1,true);
        await wait(1);
    }
    deleteFrame(project.frames.length-1,true);
})();