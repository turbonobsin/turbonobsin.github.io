import * as THREE from '../threejs/Three.js';
import { OrbitControls } from "../threejs/controls/OrbitControls.js";
import { GLTFLoader } from '../threejs/loaders/GLTFLoader.js';
import { FBXLoader } from '../threejs/loaders/FBXLoader.js';
import { OBJLoader } from '../threejs/loaders/OBJLoader.js';
import { MTLLoader } from '../threejs/loaders/MTLLoader.js';

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	
let texture = new THREE.TextureLoader().load('/images/grid.png' );
	
let material = new THREE.MeshBasicMaterial( { map:texture } );
	
let cube = new THREE.Mesh( geometry, material );
let _s;

/**@type {OrbitControls} */
let controls, /**@type {GLTFLoader}*/loader, /**@type {FBXLoader}*/loaderFBX;
/**@type {THREE.Scene} */
let scene;

globalThis.loaded3D = false;
function init3D(){
	globalThis.loaded3D = true;

	// RL, LL, chest, RA, LA, head, outer_chest, outer_RL, outer_LL, outer_RA, outer_LA, outer_head
	
	scene = new THREE.Scene();
	window.scene = scene;
	// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
	
	// let threeCanCont = document.getElementById("threeCan-cont");
	let threeCanOps = document.getElementById("threeCan-ops");

	function setupThreeCanOps(){
		class Option{
			constructor(label,id){
				this.label = label;
				this.id = id;
			}
			label = "";
			id = "";
			show = true;
			/**@type {HTMLButtonElement} */
			btn = null;
			action(){}
		}
		class OptionToggle extends Option{
			constructor(label,id){
				super(label,id);
				this.show = true;
			}
			toggle(){
				this.show = !this.show;
				if(this.btn){
					this.btn.classList.toggle("unchecked",!this.show);
				}

				/**@type {THREE.Object3D} */
				let obj = scene.getObjectByName(this.id);
				if(obj){
					obj.visible = this.show;
				}
			}
			action(){
				this.toggle();
			}
		}
		class OptionMirrorToggle extends Option{
			constructor(label,id){
				super(label,id);
				this.show = true;
			}
			toggle(){
				this.show = !this.show;
				if(this.btn){
					this.btn.classList.toggle("checked",this.show);
				}

				autoClone[this.id] = this.show;
				if(this.show){
					runAutoClone(false);
				}
			}
			action(){
				this.toggle();
			}
		}
		let grid1 = document.createElement("div");
		grid1.classList.add("threeCanOpsGrid");
		threeCanOps.appendChild(grid1);
		let grid2 = document.createElement("div");
		grid2.classList.add("threeCanOpsGrid-2");
		threeCanOps.appendChild(grid2);
		let options = [
			new OptionToggle("Head","head"),
			new OptionToggle("Head (outer)","outer_head"),
			new OptionToggle("Body","chest"),
			new OptionToggle("Body (outer)","outer_chest"),
			new OptionToggle("Left Arm","LA"),
			new OptionToggle("Left Arm (outer)","outer_LA"),
			new OptionToggle("Right Arm","RA"),
			new OptionToggle("Right Arm (outer)","outer_RA"),
			new OptionToggle("Left Leg","LL"),
			new OptionToggle("Left Leg (outer)","outer_LL"),
			new OptionToggle("Right Leg","RL"),
			new OptionToggle("Right Leg (outer)","outer_RL"),
		];
		let ops2 = [
			new OptionMirrorToggle("LA","mirrorLA"),
			new OptionMirrorToggle("LA (outer)","mirrorLAOuter"),
			new OptionMirrorToggle("LL","mirrorLL"),
			new OptionMirrorToggle("LL (outer)","mirrorLLOuter"),
		];
		ops2.forEach(op=>op.show = false);
		for(const op of options){
			let btn = document.createElement("button");
			btn.className = "threeCanOp";
			btn.textContent = op.label;
			btn.onmousedown = ()=>{
				op.action();
			};
			grid1.appendChild(btn);
			btn.classList.toggle("unchecked",!op.show);
			op.btn = btn;
		}
		grid1.appendChild(document.createElement("hr"));
		grid1.appendChild(document.createElement("hr"));
		let label = document.createElement("div");
		label.textContent = "Auto clone options:";
		grid2.parentElement.insertBefore(label,grid2);
		for(const op of ops2){
			let btn = document.createElement("button");
			btn.className = "threeCanOp";
			btn.textContent = op.label;
			btn.onmousedown = ()=>{
				op.action();
			};
			grid2.appendChild(btn);
			btn.classList.toggle("checked",op.show);
			op.btn = btn;
		}
	}
	setupThreeCanOps();
	
	let newCan = document.getElementById("threeCan")
	const renderer = new THREE.WebGLRenderer({
		canvas:newCan
	});
	// renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize( window.innerHeight, window.innerHeight );
	renderer.sortObjects = false;
	// document.body.appendChild( renderer.domElement );
	// renderer.domElement.classList.add("threejs-canvas");

	// let light = new THREE.AmbientLight(0xffffff,1000);
	// scene.add(light);
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 4 );
	directionalLight.position.set(50,50,50);
	directionalLight.lookAt(0,0,0);
	scene.add( directionalLight );

	const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2.5 );
	directionalLight2.position.set(-30,-30,-50);
	directionalLight2.lookAt(0,0,0);
	scene.add( directionalLight2 );
	
	cube.position.y -= 5;
	// scene.add( cube );
	
	camera.position.z = 5;

	renderer.domElement.style.height = null;
	
	function animate() {
		requestAnimationFrame( animate );
	
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	
		renderer.render( scene, camera );
	}
	
	animate();
	
	controls = new OrbitControls( camera, renderer.domElement );
	loader = new GLTFLoader();
	loaderFBX = new FBXLoader();
	// const loader = new OBJLoader();

	// loader.load(
	// 	// resource URL
	// 	'models/player.obj',
	// 	// called when resource is loaded
	// 	function ( object ) {
	
	// 		scene.add( object );
	
	// 	},
	// 	// called when loading is in progresses
	// 	function ( xhr ) {
	
	// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
	// 	},
	// 	// called when loading has errors
	// 	function ( error ) {
	
	// 		console.log( 'An error happened' );
	
	// 	}
	// );

	// scene.remove(cube);

	
	// loaderFBX.load("/models/player2.fbx",(s)=>{
	// 	console.log("loaded player fbx");
	// 	console.log(s);
	// 	scene.add(s);
	// });
	
	console.log("Finished loading 3D.");
}

function load3D_player(path){
	let skin_texture = new THREE.TextureLoader().load('models/skin.png');
	globalThis.skin_texture = skin_texture;

	if(_s) scene.remove(_s);

	loader.load(`models/${path}.glb`,(/**@type {{scene:THREE.Group}}*/s)=>{
		console.log("loaded player");
		console.log(s);
		scene.add(s.scene);
		_s = s.scene;

		window.player = s.scene;
		
		function run(obj){
			for(let c of obj.children){
				c.material = new THREE.MeshStandardMaterial({map:c.material.map});
				/**@type {THREE.MeshBasicMaterial} */
				let mat = c.material;
				mat.needsUpdate = true;
				mat.transparent = true;
				mat.side = THREE.DoubleSide;
				// mat.depthWrite = false;
				// console.log(c.name,c);

				if(c.children?.length != 0) run(c);
			}
		}
		run(s.scene);
	});
}
function load3D_cube(){
	let cube = new THREE.Mesh(new THREE.BoxGeometry(5,5,5,1,1,1),new THREE.MeshStandardMaterial({color:0xffffff}));
	scene.add(cube);
	_s = scene;
	globalThis._s = _s;
	if(project.name.endsWith+"_n") new_skin_texture_n = new THREE.DataTexture(nob.buf,img.w,img.h);
}

let new_skin_texture_n;
function update3D(){
	let image = document.createElement("canvas");
	image.width = img.w;
	image.height = img.h;
	let layer = img.layers[0];
	let nob = layer.nob;
	// let newBuf = new Uint8ClampedArray(nob.size);
	// // newBuf = cloneBuf(nob.buf,nob.size);
	// // newBuf = nob.buf;

	// function flipBuffer(buffer, width, height) {
	// 	let flippedBuffer = newBuf;
	// 	// const flippedBuffer = new Uint8ClampedArray(buffer.length);
	// 	for (let y = 0; y < height; y++) {
	// 		for (let x = 0; x < width; x++) {
	// 			const index = (y * width + x) * 4;
	// 			const flippedIndex = ((height - y - 1) * width + x) * 4;
	// 			flippedBuffer[flippedIndex] = buffer[index];
	// 			flippedBuffer[flippedIndex + 1] = buffer[index + 1];
	// 			flippedBuffer[flippedIndex + 2] = buffer[index + 2];
	// 			flippedBuffer[flippedIndex + 3] = buffer[index + 3];
	// 		}
	// 	}
	// 	// return flippedBuffer;
	// }
	// flipBuffer(nob.buf,image.width,image.height);

	// for(let i = 0; i < nob.size; i += 4){
	// 	newBuf[i+0] = 255;
	// 	newBuf[i+1] = 0;
	// 	newBuf[i+2] = 0;
	// 	newBuf[i+3] = 255;
	// }

	// image.getContext("2d").putImageData(new ImageData(newBuf,nob.width,nob.height),0,0);
	// let image2 = document.createElement("canvas");
	// image2.width = image.width;
	// image2.height = image.height;
	
	// let ct = image2.getContext("2d");
	// ct.translate(0,image.height);
	// ct.scale(1,-1);
	// ct.drawImage(image,0,0);
	// mirrorImage(ct,image,0,0,false,true);

	// texture = new THREE.CanvasTexture(image,THREE.UVMapping,THREE.ClampToEdgeWrapping,THREE.ClampToEdgeWrapping,THREE.NearestFilter,THREE.NearestFilter);
	// material.transparent = true;
	// material.map = texture;
	// material.side = THREE.DoubleSide;
	// material.needsUpdate = true;

	// 

	if(_s){
		let new_skin_texture = new THREE.DataTexture(nob.buf,image.width,image.height);
		new_skin_texture.flipY = false;
		new_skin_texture.needsUpdate = true;
		new_skin_texture.colorSpace = "srgb";
		function run(obj){
			for(const s of obj.children){
				/**@type {THREE.MeshStandardMaterial} */
				let mat = s.material;
				if(!mat) continue;
	
				mat.map = new_skin_texture;
				// mat.normalMap = new_skin_texture_n;
	
				// mat.transparent = true;
				// mat.side = THREE.DoubleSide;
				mat.needsUpdate = true;

				if(s.children?.length != 0) run(s);
			}
		}
		run(_s);
	}
}

globalThis.init3D = function(){
	init3D();
};
globalThis.update3D = function(){
	update3D();
};
globalThis.load3D_player = load3D_player;
globalThis.load3D_cube = load3D_cube;

// init3D();

document.addEventListener("mousemove",e=>{
	if(e.button == 0 || e.button == 2) update3D();
});

globalThis.compareObjs = function(a,b){
	let okA = Object.keys(a);
	let okB = Object.keys(b);
	let list = okA.concat(okB);
	for(const key of list){
		let valueA = a[key];
		let valueB = b[key];
		if(valueA != valueB) console.log("!=",key,valueA,valueB);
	}
};