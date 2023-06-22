// WebGL Version
function copy2(){
    let canvas = document.createElement("canvas");
    canvas.width = _can.width;
    canvas.height = _can.height;
    let gl = canvas.getContext("webgl2",{premultipliedAlpha:false,alpha:true});
    buf = _ctx.getImageData(0,0,_can.width,_can.height).data;
    buf = nobEncrypt(buf,_can.width,text,metaWidth,metaHeight);
    console.log(buf);
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    console.log('Maximum texture size:', maxTextureSize);

    function createCan(){
        let fwidth = canvas.width;
        let fheight = canvas.height;

        // let sectW = 32;
        // let sectH = 32;
        // let sectSize = sectW*sectH*4;
        // let sectW = fwidth;
        // let sectH = fheight;

        // const width = sectW/* width of your image */;
        // const height = sectH/* height of your image */;
        const level = 0; // Mipmap level, 0 for base level
        const internalFormat = gl.RGBA; // Internal format of the texture
        const srcFormat = gl.RGBA; // Format of the source data
        const srcType = gl.UNSIGNED_BYTE; // Data type of the source data
        let allPixels = buf/* your Uint8ClampedArray */;
        let flippedPixels = new Uint8ClampedArray(fwidth * fheight * 4);
        for (let row = 0; row < fheight; row++) {
            const rowIndex = fheight - row - 1;
            const sourceOffset = rowIndex * fwidth * 4;
            const targetOffset = row * fwidth * 4;
            flippedPixels.set(allPixels.subarray(sourceOffset, sourceOffset + fwidth * 4), targetOffset);
        }
        allPixels = flippedPixels;

        ////////////

        const tileSize = 32; // Size of each tile
        const numTilesX = Math.ceil(fwidth / tileSize);
        const numTilesY = Math.ceil(fheight / tileSize);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        function drawSection(inc=0){
            let tileX = inc;
            let tileY = 0;

            const tileOffsetX = tileX * tileSize;
            const tileOffsetY = tileY * tileSize;

            const tileWidth = Math.min(tileSize, fwidth - tileOffsetX);
            const tileHeight = Math.min(tileSize, fheight - tileOffsetY);

            let sectW = tileWidth;
            let sectH = tileHeight;
            let sectSize = sectW*sectH*4;

            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            let pixels = new Uint8ClampedArray(sectSize);
            let ind = 0;
            let srcInd = inc*sectW*4;//+metaWidth*4+4;
            for(let y = 0; y < sectH; y++){
                for(let x = 0; x < sectW; x++){
                    pixels[ind] = allPixels[srcInd];
                    pixels[ind+1] = allPixels[srcInd+1];
                    pixels[ind+2] = allPixels[srcInd+2];
                    pixels[ind+3] = allPixels[srcInd+3];
                    ind += 4;
                    srcInd += 4;
                }
                srcInd += fwidth*4;
                srcInd -= sectW*4;
            }
            console.log("SECT BUF: ",pixels);
            // if(inc == 1){
            // 	let subCan = document.createElement("canvas");
            // 	subCan.width = sectW;
            // 	subCan.height = sectH;
            // 	let subCtx = subCan.getContext("2d");
            // 	subCtx.putImageData(new ImageData(pixels,sectW,sectH),0,0);
            // 	document.body.appendChild(subCan);
            // 	subCan.style = "position:absolute;top:50%;left:50%;z-index:999;border:solid 1px red;width:50%;translate:-50% -50%;image-rendering:pixelated";
            // }

            // let subCan = document.createElement("canvas");
            // subCan.width = 
            // let subCtx = subCan.getContext("2d");
            // subCtx.putImageData(new ImageData());
            // pixels = getImageBuf(subCan);

            // let pixels = allPixels;

            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, sectW, sectH, 0, srcFormat, srcType, pixels);

            function getQuadVertices(tileOffsetX, tileOffsetY, tileWidth, tileHeight) {
                // const x0 = (tileOffsetX / fwidth) * 2 - 1;    // Left
                // const y0 = 1 - (tileOffsetY / fheight) * 2;    // Top
                // const x1 = ((tileOffsetX + tileWidth) / fwidth) * 2 - 1;    // Right
                // const y1 = 1 - ((tileOffsetY + tileHeight) / fheight) * 2;    // Bottom
              
                // return [
                //   x0, y0,
                //   x1, y0,
                //   x0, y1,
                //   x0, y1,
                //   x1, y0,
                //   x1, y1
                // ];

                if(inc == 0) return [
                    -1,1,
                    -1,-1,
                    1,-1,
                    1,1
                ];
                else if(inc == 1) return [
                    -0.5,1,
                    -0.5,-1,
                    1.5,-1,
                    1.5,1
                ];
            }
            let vertices = getQuadVertices(tileOffsetX, tileOffsetY, tileWidth, tileHeight);
              
            // const vertices = [
            // 	-1, 1,
            // 	-1, -1,
            // 	1, -1,
            // 	1, 1,
            // ];

            
            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            
            const indices = [0, 1, 2, 0, 2, 3];

            const indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

            const vertexShaderSource = `
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }`;
            // const vertexShaderSource = `
            // attribute vec2 aPosition;
            // uniform vec2 uTranslation;
            // varying vec2 vTextureCoord;

            // void main() {
            // 	gl_Position = vec4(aPosition + uTranslation, 0.0, 1.0);
            // 	vTextureCoord = aPosition;
            // }`;

            const fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D uTexture;
            void main() {
                gl_FragColor = texture2D(uTexture, gl_FragCoord.xy / vec2(${sectW}, ${sectH}));
            }`;

            function createShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
            
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.error(gl.getShaderInfoLog(shader));
                    gl.deleteShader(shader);
                    return null;
                }
            
                return shader;
            }
            
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
            
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            
            gl.useProgram(program);

            const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            // const translationUniformLocation = gl.getUniformLocation(program, 'uTranslation');
            // const textureUniformLocation = gl.getUniformLocation(program, 'uTexture');

            // gl.clearColor(0, 0, 0, 0);
            // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //
            // gl.uniform2f(translationUniformLocation, 4, 0);
            // gl.uniform1i(textureUniformLocation, 0);
            //new
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            //old
            // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            // gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        }
        drawSection(0);
        drawSection(1);
    }
    createCan();

    return canvas;
}
// let newCan = copy2();
function copy3(){
    let buf = _ctx.getImageData(0,0,_can.width,_can.height).data;
    buf = nobEncrypt(buf,_can.width,text,metaWidth,metaHeight);

    let textureWidth = width+metaWidth+1;
    let textureHeight = height;

    let flippedPixels = new Uint8ClampedArray(textureWidth * textureHeight * 4);
    for (let row = 0; row < textureHeight; row++) {
        const rowIndex = textureHeight - row - 1;
        const sourceOffset = rowIndex * textureWidth * 4;
        const targetOffset = row * textureWidth * 4;
        flippedPixels.set(buf.subarray(sourceOffset, sourceOffset + textureWidth * 4), targetOffset);
    }
    buf = flippedPixels;

    let canvas = document.createElement("canvas");
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    
    // Access the canvas element
    const canvas3 = document.createElement("canvas");
    document.body.appendChild(canvas3);
    canvas3.style = "position:absolute;top:50%;left:50%;z-index:999;border:solid 1px red;width:50% !important;translate:-50% -50%;image-rendering:pixelated";

    // Set up Three.js renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas3,alpha:true });
    renderer.setClearColor(0xffffff, 0);
    
    renderer.setSize(textureWidth,textureHeight);

    // Create a scene
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
        textureWidth / -2, // Left
        textureWidth / 2,  // Right
        textureHeight / 2, // Top
        textureHeight / -2, // Bottom
        1,                      // Near plane
        1000                    // Far plane
    );
    // window.innerWidth / -2, // Left
    // window.innerWidth / 2,  // Right
    // window.innerHeight / 2, // Top
    // window.innerHeight / -2, // Bottom
    camera.position.set(0, 0, 10); // Adjust camera position if needed  
    
    buf = new Uint8Array(buf);
    let texture = new THREE.DataTexture(buf,textureWidth,textureHeight);
    // texture.flipY = true;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    // texture.colorSpace = THREE.LinearSRGBColorSpace;
    console.log("TEXTURE",texture);

    function getTextureTest(){

        // for ( let i = 0; i < size; i ++ ) {
        // 	const stride = i * 4;
        // 	data[ stride ] = r;
        // 	data[ stride + 1 ] = g;
        // 	data[ stride + 2 ] = b;
        // 	data[ stride + 3 ] = 255;
        // }
        // for(let i = 0; i < size; i += 4){
        // 	data[i] = buf[i];
        // 	data[i+1] = buf[i+1];
        // 	data[i+2] = buf[i+2];
        // 	data[i+3] = buf[i+3];
        // }

        data = buf;

        // used the buffer to create a DataTexture
        const texture = new THREE.DataTexture( data, textureWidth, textureHeight );
        texture.needsUpdate = true;

        return texture;
    }
    texture = getTextureTest();

    const planeGeometry = new THREE.PlaneGeometry(textureWidth,textureHeight); // Adjust the d/imensions of the plane as needed
    // const planeMaterial = new THREE.MeshBasicMaterial({ color:"red" });
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture,premultipliedAlpha:true,transparent:true });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    renderer.render(scene, camera);

    canvas3.style.width = "50%";
    canvas3.style.height = null;
    return canvas3;
}
function copy4(){
    let buf = _ctx.getImageData(0,0,_can.width,_can.height).data;
    buf = nobEncrypt(buf,_can.width,text,metaWidth,metaHeight);

    let w = Math.floor(width+metaWidth+1)/2;
    let h = height;

    let flippedPixels = new Uint8ClampedArray(w * h * 4);
    for (let row = 0; row < h; row++) {
        const rowIndex = h - row - 1;
        const sourceOffset = rowIndex * w * 4;
        const targetOffset = row * w * 4;
        flippedPixels.set(buf.subarray(sourceOffset, sourceOffset + w * 4), targetOffset);
    }
    buf = flippedPixels;

    let tmpCan = document.createElement("canvas");
    tmpCan.width = w;
    tmpCan.height = h;
    let gl = tmpCan.getContext("webgl2");

    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;

        varying vec2 v_texCoord;

        void main() {
            gl_Position = vec4(a_position, 0, 1);
            v_texCoord = a_texCoord;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;

        varying vec2 v_texCoord;
        uniform sampler2D u_texture;

        void main() {
            gl_FragColor = texture2D(u_texture, v_texCoord);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    ///////

    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
      
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
      
    const program = createProgram(gl, vertexShader, fragmentShader);

    //////

    const positions = [
        -1, -1,  // bottom left
        1, -1,   // bottom right
        -1, 1,   // top left
        1, 1,    // top right
    ];
      
    const texCoords = [
        0, 0,    // bottom left
        1, 0,    // bottom right
        0, 1,    // top left
        1, 1,    // top right
    ];

    //////

    function createBuffer(gl, data) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return buffer;
    }
      
    const positionBuffer = createBuffer(gl, positions);
    const texCoordBuffer = createBuffer(gl, texCoords);

    //////

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
                
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
                
    gl.enableVertexAttribArray(texCoordAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
                
    gl.useProgram(program);

    //////
    let fullWidth = width+metaWidth+1;

    function loadTexture(gl, inc, data, width, height) {
        let sectSize = w*h*4;
        data = new Uint8ClampedArray(sectSize);
        let ind = 0;
        let srcInd = inc*w*4;//+metaWidth*4+4;
        for(let y = 0; y < h; y++){
            for(let x = 0; x < w; x++){
                data[ind] = buf[srcInd];
                data[ind+1] = buf[srcInd+1];
                data[ind+2] = buf[srcInd+2];
                data[ind+3] = buf[srcInd+3];
                ind += 4;
                srcInd += 4;
            }
            srcInd += fullWidth*4;
            srcInd -= w*4;
        }
        
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
      
        // Set parameters to enable non-power-of-two textures
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      
        const imageData = new ImageData(new Uint8ClampedArray(data), w, h);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
      
        return texture;
    }
    const texture1 = loadTexture(gl, 0, null, w, h);
    // const texture2 = loadTexture(gl, 1, null, w, h);
    // Load more textures if needed  

    ///////

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the first image
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Translate the position for the second image
    // gl.uniform2f(gl.getUniformLocation(program, "u_translation"), 1, 0);

    // Draw the second image
    // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    ///////

    return tmpCan;
}