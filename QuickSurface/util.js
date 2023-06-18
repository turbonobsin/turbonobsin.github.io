/**
 * 
 * @param {HTMLElement} d 
 * @param {Function} f
 */
function WhenEnter(d,f){
	d.addEventListener("keydown",e=>{
		if(e.key.toLowerCase() == "enter") f(d);
	});
	d.addEventListener("blur",e=>{
		f(d);
	});
	d._f = f;
}

let objs_open = true;//(localStorage.objs_open == true ? true : false);
const objs_d = document.getElementById("objs");
// const objList = objs_d.getElementsByClassName("list")[0];
// const objOptions = objs_d.getElementsByClassName("options")[0];
let objList = objs_d.querySelector(".old-obj-list");
let objOptions = objs_d.querySelector(".obj-options-list");
let rightPanelData = {
	"frame-hierarchy":{
		title:"Frame Hierarchy"
	},
	"local-objs":{
		title:"Local Objects"
	},
	"old-obj":{
		title:"Objects"
	},
	"obj-options":{
		title:"Object Options"
	}
};
let curRightPanels = [
	"frame-hierarchy",
	"local-objs",
	"old-obj",
	"obj-options"
];
function reconstructRightPanel(){
	objs_d.innerHTML = "";
	let num = curRightPanels.length;
	for(let i = 0; i < curRightPanels.length; i++){
		let id = curRightPanels[i];
		let c = document.createElement("div");
		c.className = "dragB";
		c.setAttribute("nofix","true");
		let data = rightPanelData[id];
		c.innerHTML = `
			<span class="title bt bb">${data.title}</span>
			<div class="list ${id}"></div>
		`;
		objs_d.appendChild(c);
		let height = objs_d.parentNode.getBoundingClientRect().height;
		c.style.height = (height/num)+"px";
		loadRightPanelPane(i);
	}
}
function loadRightPanelPane(i){
	let id = curRightPanels[i];
	let data = rightPanelData[id];
	let c = objs_d.children[i];
	if(id == "old-obj") objList = c.children[1];
	else if(id == "obj-options") objOptions = c.children[1];
}
reconstructRightPanel();
function saveObjsDWidth(){
	localStorage.objs_w = objs_d.style.width;
}
if(false) objs_d.onmousedown = function(){
	if(!objs_open){
		objs_open = true;
		updateObjsOpen();
	}
};
let _lastObjsOpenWidth = (localStorage.objs_w || "200px");
function updateObjsOpen(){
	if(objs_open) objs_d.style.width = _lastObjsOpenWidth;
	else{
		// _lastObjsOpenWidth = objs_d.style.width;
		objs_d.style.width = "0px";
	}
}
updateObjsOpen();
setTimeout(function(){
	/**@type {HTMLElement[]} */
	let list = document.getElementsByClassName("dragT");
	for(let i = 0; i < list.length; i++){
		let t = list[i];
		let nofix = false;
		if(t.getAttribute("nofix") == "true") nofix = true;
		registerDragSide(t,0,t,nofix); //top fixed, bottom, right, left fixed
	}
	list = document.getElementsByClassName("dragL");
	for(let i = 0; i < list.length; i++){
		let t = list[i];
		let nofix = false;
		if(t.getAttribute("nofix") == "true") nofix = true;
		registerDragSide(t,3,t,nofix);
	}
	list = document.getElementsByClassName("dragR");
	for(let i = 0; i < list.length; i++){
		let t = list[i];
		let nofix = false;
		if(t.getAttribute("nofix") == "true") nofix = true;
		registerDragSide(t,2,t,nofix);
	}
	list = document.getElementsByClassName("dragB");
	for(let i = 0; i < list.length; i++){
		let t = list[i];
		let nofix = false;
		if(t.getAttribute("nofix") == "true") nofix = true;
		registerDragSide(t,1,t,nofix);
	}
},500);

/**
 * 
 * @param {HTMLElement} t 
 * @param {*} side 
 * @param {*} tt 
 * @param {*} nofix 
 */
function registerDragSide(t,side,tt,nofix=false){
	if(!tt) tt = t;
	let n_ondrag = t.getAttribute("nondrag");
	if(n_ondrag) t.n_ondrag = Function(n_ondrag);
	let bar = document.createElement("div");
	if(side == 0 || side == 1){
		bar.className = "bar";
		if(side == 0){
			bar.style.left = "0px";
			bar.style.top = "-5px";
		}
		else{
			bar.style.left = "0px";
			bar.style.bottom = "5px";
		}
	}
	else{
		bar.className = "hbar";
		if(side == 2){
			bar.style.right = "5px";
			bar.style.top = "0px";
		}
		else{
			bar.style.left = "-5px";
			bar.style.top = "0px";
		}
	}
	bar.px = 0;
	bar.py = 0;
	bar.x = 0;
	bar.y = 0;
	let rect = tt.getBoundingClientRect();
	bar.sh = rect.height;
	bar.sw = rect.width;
	bar.ssx = rect.x;
	bar.ssy = rect.y;
	bar.h = bar.sh;
	bar.w = bar.sw;
	// tt.style.height = bar.h+"px";
	let smx = 0;
	let smy = 0;
	let sw = rect.width;
	let sh = rect.height;
	function onmove(x,y,e,ref){
		if(t.n_ondrag) t.n_ondrag(t);
		// let rect = can.parentNode.getBoundingClientRect();
		// let cell = rect.width/img.w;
		if(ref.sel == -1){
			console.warn("Side1 was -1");
			return;
		}
		let side1 = ref.sel;
		let side2 = ref.sel2;
		if(side1 == 0){
			let dif = e.clientY-smy;
			bar.h = sh-dif;
			tt.style.height = bar.h+"px";
			if(!nofix){
				let max = (bar.ssy-bar.h+sh);
				if(bar.h < 100) max = bar.ssy-100+sh;
				tt.style.top = max+"px";
			}
		}
		else if(side1 == 1){
			let dif = e.clientY-smy;
			bar.h = sh+dif;
			tt.style.height = bar.h+"px";
		}
		if(side1 == 2 || side2 == 2){
			let dif = e.clientX-smx;
			bar.w = sw+dif;
			tt.style.width = bar.w+"px";
		}
		if(side1 == 3 || side2 == 3){
			let dif = e.clientX-smx;
			bar.w = sw-dif;
			tt.style.width = bar.w+"px";
			if(!nofix){
				let max = (bar.ssx-bar.w+sw);
				if(bar.w < 100) max = bar.ssx-100+sw;
				tt.style.left = max+"px";
			}
		}
	}
	function ondown(e){
		let rr = tt.getBoundingClientRect();
		smx = e.clientX;
		smy = e.clientY;
		let style = getComputedStyle(tt);
		sw = parseFloat(style.width.replace("px",""));
		sh = parseFloat(style.height.replace("px",""));
		bar.ssx = rr.x;
		bar.ssy = rr.y;
	}

	let found = false;
	for(let i = 0; i < uniRanges.length; i++){
		let r1 = uniRanges[i];
		if(r1.ref == tt){
			found = true;
			if(!r1.sides.includes(side)) r1.sides.push(side);
		}
	}
	if(!found){
		let v = {
			v:true,
			sides:[side],
			ref:tt,
			onmove,
			ondown,
			sel:-1
		};
		uniRanges.push(v);
	}
	if(getComputedStyle(t).position == "static") t.style.position = "relative";
}

function wait(delay){
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve();
		},delay);
	});
}