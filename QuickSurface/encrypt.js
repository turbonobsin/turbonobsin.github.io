function getImageBuf(/**@type {HTMLImageElement}*/image,width=null,height=null){
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext('webgl');

    if(width == null){
        width = image.width;
        height = image.height;
    }

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('Framebuffer is incomplete');
        return;
    }

    let sizeData = new Uint8Array(12);
    gl.readPixels(0, 0, 3, 1, gl.RGBA, gl.UNSIGNED_BYTE, sizeData);

    let w = "";
    let h = "";
    let reserveSize = 6;
    for(let i = 0; i < reserveSize; i++) w += String.fromCharCode(sizeData[i]);
    for(let i = 0; i < reserveSize; i++) h += String.fromCharCode(sizeData[reserveSize+i]);
    let metaWidth = parseInt(w.replace(/_/g,""));
    let metaHeight = parseInt(h.replace(/_/g,""));
    
    console.log("META:",metaWidth,metaHeight);
    const pixels = new Uint8Array(metaWidth*metaHeight*4);
    gl.readPixels(0, 0, metaWidth, metaHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    return {pixels,metaWidth,metaHeight};
}

function nobEncrypt(/**@type {Uint8ClampedArray} */buf,fullWidth,text,w,h){
    console.log("-- encrypting --");
    let can = document.createElement("canvas");
    let ctx = can.getContext("2d");

    can.width = w;
    can.height = h;
    console.log("Encryption size: ",w,h);

    let ind = 0;
    let bufSize = w*h*4;
    // let buf = new Uint8ClampedArray(bufSize);
    let x = 0;
    let y = 0;
    for(let i = 0; i < text.length; i += 4){
        let r = text.charCodeAt(i)||0;
        if(r == 0) break;
        let g = text.charCodeAt(i+1)||0;
        let b = text.charCodeAt(i+2)||0;
        let a = text.charCodeAt(i+3)||0;
        // _ctx.fillStyle = `rgb(${r},${g},${b},${a/256})`;
        // _ctx.fillRect(x,y,1,1);
        // if(x == 0 && y == 0){
        //     console.log("LOG: ",r,g,b,a);
        // }
        ind = (x+y*fullWidth)*4;
        buf[ind] = r;
        buf[ind+1] = g;
        buf[ind+2] = b;
        buf[ind+3] = a;
        x++;
        if(x >= w){
            x -= w;
            y++;
        }
        // ind += 4;
    }
    // ctx.putImageData(new ImageData(buf,can.width,can.height),0,0);
    // console.log("encryption buf: ",buf,new ImageData(buf,can.width,can.height).data,ctx.getImageData(0,0,can.width,can.height).data);
    return buf;
}

function nobDecrypt(/**@type {HTMLImageElement}*/image,name){
    console.log("starting nob decrypt");

    let str = "";
    /**@type {HTMLCanvasElement} */
    let can = document.createElement("canvas");
    can.width = image.width;
    can.height = image.height;
    let ctx = can.getContext("2d",{willReadFrequently:true});
    ctx.drawImage(image,0,0);

    //Meta Data
    let {pixels,metaWidth,metaHeight} = getImageBuf(image);
    let data = pixels;
    console.log(data);
    let i = 0;
    let row = 0;
    let col = 0;
    while(true){
        let r = data[i];
        if(r == 0) break;
        // if(col == 0 && r == 0) break;
        let g = data[i+1];
        if(g == 0) break;
        let b = data[i+2];
        if(b == 0) break;
        let a = data[i+3];
        if(a == 0) break;
        let letters = 
            String.fromCharCode(r) + 
            String.fromCharCode(g) + 
            String.fromCharCode(b) + 
            String.fromCharCode(a);
        str += letters;

        i += 4;
        col++;
        if(col >= can.width) break;
        if(row >= can.height) break;
        if(data[i] == 0){
            i -= col*4;
            col = 0;
            i += can.width*4;
            row++;
            continue;
        }
    }

    str = str.substring(12);
    str.trim();
    let lines = str.split("\n");
    
    let firstLine = lines[0].split(",");
    let ver = firstLine[0];
    let cellW = parseInt(firstLine[1]);
    let cellH = parseInt(firstLine[2]);
    console.log(`ver: ${ver}, cellW: ${cellW}, cellH: ${cellH}`);

    let sects = str.split("\n@");
    sects.splice(0,1);

    let names = lines[1].split(";");
    let layerList = [];

    let projI = allProjects.indexOf(project);
    project = createNewProject(name,cellW,cellH);
    resizeProjectCanvas(cellW,cellH,0,0,true);
    allProjects[projI] = project;
    project.hist = [];
    project.histI = -1;

    for(let k = 0; k < names.length; k++){
        let layers = names[k].split(",");
        let frame = createFrame(k,true);
        selectFrame(k);
        deleteLayer_bare(0);
        for(let i1 = 0; i1 < layers.length; i1++){
            let layerName = layers[i1];
            let split = layerName.split("\x01");
            let tags = split[0].split(",");
            let isObj = false;
            let visible = true;
            for(const tag of tags){
                if(tag == "o") isObj = true;
                else if(tag == "h") visible = false;
            }
            layerList.push({
                frame:k,
                layer:i1,
                name:split[1],
                visible,
                isObj
            });
        }
    }

    //Spritesheet Data
    /**@type {Uint8ClampedArray[]} */
    let cells = [];
    let j = metaWidth+1;
    let ind = 0;
    while(j+cellW <= image.width){
        let cell = ctx.getImageData(j,0,cellW,cellH).data;
        cells.push(cell);
        let layerData = layerList[ind];
        let zeroWidth = false;
        if(layerData) if(layerData.isObj){
            cells.push(null);
            zeroWidth = true;
        }
        if(!zeroWidth) j += cellW;
        ind++;
    }

    console.log("Amount of cells: "+cells.length);

    ind = 0;
    for(let k = 0; k < cells.length; k++){
        let cell = cells[k];
        if(!cell){
            // ind++;
            continue;
        }
        let layerData = layerList[ind];
        if(!layerData) continue;
        selectFrame(layerData.frame);
        let name = layerData.name;
        if(layerData.isObj) name = name.substring(1);
        let layer = createLayer_bare(layerData.layer,name);
        if(!layerData.isObj) layer.nob.buf = cell;
        layer.visible = layerData.visible;

        if(layerData.isObj) layer.ops.rendered = true;
        
        ind++;
        // if(layerData.isObj) continue;
    }

    // 

    for(const sect of sects){
        let ln = sect.split("\n");
        let type = ln[0];
        let frameI = ln[1];
        let layerI = ln[2];
        let layer = project.frames[frameI].layers[layerI];
        if(type == "obj"){
            let type = ln[3];
            let name = ln[4];
            let state = ln[5];
            console.log("Loading Obj: ",name,state);
            if(type == "arm"){
                let arm = new Armature(0,name);
                arm.loadState(state);
                layer.ops.obj = arm;
            }
        }
    }
    
    // 
    
    _histAdd(HistIds.full,null,"Load QS File");

    resetView();



    /*for(let y = 0; y < can.height; y++){
        for(let x = 0; x < can.width; x++){
            let r = data[i];
            if(r == 0) break;
            let g = data[i+1];
            let b = data[i+2];
            let a = data[i+3];
            let letters = 
                String.fromCharCode(r) + 
                String.fromCharCode(g) + 
                String.fromCharCode(b) + 
                String.fromCharCode(a);
            str += letters;
            i += 4;
        }
    }*/

    reconstructFramesDiv();
    reconstructLayersDiv();

    console.log("DECRYPT STRING: ["+str+"]");
    return str;
}

// New GIF Support

function saveToGIF_test(){
    // Get the canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Draw something on the canvas (e.g., a rectangle)
    // ctx.fillStyle = 'red';
    // ctx.fillRect(50, 50, 200, 100);

    // Create a new GIF instance
    const gif = new GIF({
        workers: 4,
        quality: 1,
    });

    // Add frames to the GIF
    ctx.fillStyle = "red";
    gif.addFrame(canvas);
    for(let i = 0; i < 5; i++){
        ctx.fillRect(i*6,5,5,5);
        gif.addFrame(ctx, {copy:true,delay:500});
        // gif.addFrame(canvas, { delay: 200 });
    }

    // You can add multiple frames by repeating the above steps

    // Finalize the GIF
    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));
        return;
        // 'blob' contains the generated GIF file
        // You can do something with the blob, such as downloading it
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'myAnimation.gif';
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    });

    // Start rendering the GIF
    gif.render();
}
async function saveToGIF(){
    // Create a new GIF instance
    let w = project.w;
    let h = project.h;

    let scale = 1;
    // let newScale = 4;
    // resizeImage(w*newScale,h*newScale);

    const gif = new GIF({
        workers: 4,
        quality: 1,
        width:w*scale,
        height:h*scale
    });

    let lastSpeed = preview.s;
    let lastI = preview.i;
    
    preview.i = 0;
    // preview.playing = true;

    // Add frames to the GIF
    preview.i = 0;
    preview.s = 60;
    await wait(8);

    let tmpCan = document.createElement("canvas");
    let tmpCtx = tmpCan.getContext("2d");

    prevCtx.imageSmoothingEnabled = false;
    tmpCtx.imageSmoothingEnabled = false;
    
    // gif.addFrame(prevCan);
    for(let i = 0; i < project.frames.length; i++){
        preview.i = 60*i;
        await wait(8);

        // tmpCtx.clearRect(0,0,w,h);
        // tmpCtx.drawImage(prevCan,0,0);
        // prevCan.width = w*scale;
        // prevCan.height = h*scale;
        // prevCtx.drawImage(tmpCan,0,0,w,h,0,0,w*scale,h*scale);
        
        gif.addFrame(prevCtx,{copy:true,delay:60/lastSpeed*17});

        // prevCan.width = w;
        // prevCan.height = h;
        await wait(8);
    }

    // Finalize the GIF
    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));

        preview.s = lastSpeed;
        preview.i = lastI;
        
        return;
        // 'blob' contains the generated GIF file
        // You can do something with the blob, such as downloading it
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'myAnimation.gif';
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    });

    // Start rendering the GIF
    gif.render();
}