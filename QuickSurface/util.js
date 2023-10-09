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

function wait(delay){
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve();
		},delay);
	});
}