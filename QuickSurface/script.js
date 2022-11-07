const _ver = "_vardepricated";
const _date = "_vardepricated";
const _chnlogL = [
  [
    "Version: 1.0.2 - 8-27-22",
    "Added version label",
    "Added Channelog Menu",
    "Added info-labels for Color Palette and Color History",
    "Added toolbar GUI options to change MirrorX, MirrorY, and LineMirrorMode on the pen tool",
    "Added darkened screen tint and when opening menus and preventing the clicking on other buttons when a menu is open",
    "Added a border shadow around menus so they stand out more",
    "Changed the close window button so it was red and easier to see",
    "Changed selecting frames to mousedown event rather than mouseup so it feels faster and more responsive",
    "Changed the preview label to have a border and box-shadow so it's easier to see, especially in dark mode",
    "Fixed Bug: when clicking from the color palette with right click, the old color wouldn't go into the color history",
    "Added the ability to highlight select multiple frames",
    "Added Clone >> and Clone << with undo-redo support",
    "Changed frame cards so that they are easier to distingusish from the selected ones",
    "Added shelves mechanic to change the amount of frames you can see",
    "Changed frames and layers to visually start at 1 instead of 0 to make it less confusing",
    "Fixed Bug: when drawing with translucent colors, it wouldn't layer but replace colors with the translucent one",
    "Changed layer settings button into 'layer actions' with settings under an option",
    "Fixed Bug: Deleting layers apparently was majorly broken and would crash the program when you hit undo after deleting. There still may be bugs but the general use cases are good and smooth.",
    "Added the ability to change the orientation in which info labels are displayed",
    "Fixed Bug: If you selected the first frame and then deleted it, it would crash the program"
  ],
  [
    "Version: 1.0.3 - 8-29-22 and briefly 8-31-22",
    "Added: finished adding the rest of the features to the eraser tool with undo-redo support",
    "Added support for undo-redo when naming layers, and it uses a dedicated undo-redo type so much less RAM is used",
    "Fixed Frames Widget so that when you resize your window small, the option buttons cram together so you can still press them",
    "Added the (Add layer to highlighted frames) layer action with undo-redo support",
    "Added the (merge layer down) layer action with undo-redo support",
    "Added info-labels to the layer actions",
    "Added a wrap feature to info-labels so that if they would appear off the screen, they get moved to the left of whatever you hovered over",
    "Changed when deleting from color palette, it adds the color to the history, in case you accedentally deleted it",
    "Found Issue: (File -> New) doesn't work anymore",
    "Version: 1.0.3.1 - 8-31-22",
    "Fixed File->New and File->Import",
    "Added support for when there isn't enough room for the toolbar, it wraps",
    "Added References tab with support to open files from your computer to show as previews"
  ],
  [
    "Version: 1.0.4 (9-1-22)",
    "Fixed version so that it is reflective of the first element in the channelog, for concurrency",
    "Changed Reference Viewer to get rid of url box and replace it with a color preview to show what you've hovered over",
    "Fixed info-label's 'pos' property so that the orientation is correct; in some cases it was not correct",
    "Added feature where your active 2 colors are unique between opened project (not on save yet)",
    "Fixed the swap buttons they so actually work and have a desc",
  ],
  [
    "Version: 1.0.5 (9-2-22)",
    "Added DrawBezier functionality to NobsinEngine",
    "Added: Started adding functionality for the Bezier Tool (not finished yet)",
    "Fixed up Channelog Menu a bit",
    "Added feature to Channelog to view past version's Channelogs",
    "Version: 1.0.5.1",
    "Added Zen Mode button but am not finished yet",
    "Added hover highlight to Palette",
    "Added info-labels to quick settings at top",
    "Fixed up zen mode with more color features",
    "Added feature so that when you click on reference images they relayer the last one you click will be on top",
  ],
  [
    "Version: 1.0.6 (9-5-22)",
    "Started adding Armature feature",
    "Fixed the theme system to support switching between more than one theme",
    "Revamped the Light theme",
    "Version 1.0.7 (9-6-22)",
    "Added holding [Shift] and [Alt] to scroll horzontally and vertically on the canvas",
    "Changed the interface to be flex based to support moving widgets around in the future",
    "Added ability for frameList to be changed to a vertical mode (currently hardcoded)"
  ],
  [
    "Version: 1.0.8 (9-7-22)",
    "Fixed up interface and removed tests",
    "Added so that frameList position (horz or vert) will save to the harddrive and remember next time",
    "Added back the previewer",
    "Tried to add more to armature feature but ran into issues"
  ],
  [
    "Version: 1.0.9 (9-8-22)",
    "Added most of armature core, the full figure is there"
  ],
  [
    "Version: 1.1.0 (9-9-22)",
    "Added feature to warn you when you try to leave the website",
    "Fixed reference so it is also draggable by the top bar",
    "Added [Objects] widget",
    "Added 'dragT' className and the Objects widget's options panel is resizable"
  ],
  [
    "Version: 1.1.1 (9-10-22)",
    "Added most of the rest of the features for resizing elements, it fully works for references now but there is a layering issue",
    "Changed Frames Widget so you can resize it vertically and it lines up better",
    "Fixed frames widget so that when you drag it up, it doesn't interfere with the widgets on the left",
    "Fixed frames widget so that you can't resize it when you are in vertical mode",
    "Fixed other minor gui bugs",
    "Added objects panel",
    "Added when creating an armature, it shows up in the objects panel, but doesn't do anything yet"
  ],
  [
    "Version: 1.1.2 (9-12-22)",
    "Added auto-save feature",
    "Started adding ondrag events for resizing"
  ],
  [
    "Version: 1.1.3 (9-13-22)",
    "Added the ability to add object layers which run their custom render function",
    "Fixed toggling the visibility of layers so it incorporates the undo-redo buffer and doesn't make all layers visible when undoing",
    "Maybe more?"
  ],
  [
    "Version: 1.1.4 (9-16-22)",
    "Fixed horz and vert scrolling so it doesn't move as much per scroll (its less sensitive)",
    "Fixed updateAPoints so they only show when the layer is selected",
    "Fixed the bug where if you currently had a ARM layer selected then you couldn't click the settings dropdown on either the layers or objs panel"
  ],
  [
    "Version: 1.1.5 (9-17-22)",
    "Added a second row to color palette",
    "Fixed preview so that it always starts at minimum size visually",
    "Added pen and touch support",
    "Fixed bug where you couldn't zoom while hovering over an armature control point",
    "Added support for cloning armatures and editing them individually on frames",
    "Added undo-redo buffer support for editing the armature. (uses full state; not optimized)",
    "Added armature state system encoder and decoder",
    "Added objects and object instances in layers support for the .NBG file format (SAVING and OPENING supported)",
    "*** Basic functionality and core system of Armature complete",
    "Added 'Add Frame (But Clone Objs)' button to the frames panel so you can make new frames for redrawing but keep just the objs from the previous frame",
    "Fixed the GUI element for renaming layers so the colors are correct and the margins don't get messed up when hovering",
    "Changed color history so that it follows horizontal wrapping instead of vertical for clarity",
    "Fixed exportSS so that it doesn't include the armature",
    "Fixed opening files so if you had periods in the name they will be unaffected. So opening image.nbg.png now doesn't crash",
    "Fixed ExportAs so that it saves a file as image.png instead of image.nbg.png",
    "Fixed layerOptions buttons in the layers panel header so they follow the same theme as the frames panel"
  ],
  [
    "Version: 1.1.6 (9-18-22)",
    "Added the ability to add new parts onto the armature by holding CTRL and dragging off a control point",
    "Added the ability to delete parts on a armature by holding ALT and clicking a control point",
    "Added the ability to freely move armature control points by holding SHIFT and CTRL when dragging a control point",
    "Might be more things I did, I don't remember...",
    "Added 'scaleby' option for armature (with undo-redo support)",
    "Added 'updateFromActiveLayer' option for armature",
    "Added 'viewCachedState' option for armature",
    "Added 'delete' option for armature (with undo-redo support)",
    "Added the ability to close projects that are open with a dropdown menu",
    "Fixed when adding armatures to a frame it wouldn't select the right frame",
    "Changed img.curLayer to a getter and setter to avoid crash where curLayer is null",
    "Fixed createLayer button to actually work and not be swapped with moveLayerDown",
    "Added undo-redo buffer support for creating and deleting objs"
  ],
  [
    "Version: 1.1.7 (9-19-22)",
    "Added IK control for Armature when you hold shift to move a control point around"
  ],
  [
    "Version: 1.1.8 (9-20-22)",
    "Fixed (mostly) some bugs regarding the color panel swatches would wrap incorrectly on lower resolution screens",
    "Added undo-redo, save, and load support for custom object types",
    "Added getNobState and loadNobState functions with support for selections/smaller slices"
  ],
  [
    "Version: 1.1.9 (9-22-22)",
    "Continued working on selToNewNob function"
  ],
  [
    "Version: 1.1.9.1 (9-23-22)",
    "Probably some stuff was added"
  ],
  [
    "Version: 1.2.0 (10-5-22)",
    "Added: File recovery system (no GUI yet, just core functionality)",
    "Added some GUI functionality to recovery system: (List files and open file)",
    "Brought back the legacy file system! It all works like it did in the past except that the new button for each system is not differentiated yet",
    "Found a bug: apperently using select mode on the pencil doesn't work anymore and only draws gray translucency"
  ],
  [
    "Version: 1.2.1 (10-6-22)",
    "Fixed both new buttons to work with their systems",
    "Changed lnbg files so their file extention does not show up in the nameDiv",
    "Fixed closing files from nameDiv so even if there is two files with the same name, it works perfectly fine and the highlighting is fixed too",
    "Fixed legacy files so they work good closing from the nameDiv too"
  ],
  [
    "Version: 1.2.2 (10-13-22)",
    "Worked on selToNob functionallity a bit more"
  ],
  [
    "Version: 1.2.3 (10-14-22)",
    "Fixed FramePreviews so that when you do something it instantly updates, and even when you resize all frames it updates the previews of all in an efficient manner",
    "Fixed Preview so that it honors the canvas' aspect-ratio"
  ],
  [
    "Version: 1.2.4 (10-15-22)",
    "Fixed pencil and line tool's select mode so it works now",
    "Fixed recursive fill tool so that it works with select mode"
  ]
];

//GIF CAPTURING
let capturer = {start:()=>{},stop:()=>{},save:()=>{}};
// capturer = new CCapture({format:"gif",workersPath:"",framerate:20});

function startRecording(fr=20) {
  capturer = new CCapture({format:"gif",workersPath:"",framerate:fr,
    verbose:false,
    motionBlurFrames:0
  });
  capturer.start();
}

let _chnlog = _chnlogL[_chnlogL.length-1];
document.getElementById("l_ver").textContent = "Quick Surface - "+_chnlog[0];
const b_chan = document.getElementById("b_chan");
b_chan.onclick = function(){
  let d = openMenu("log");
  let r = this.getBoundingClientRect();
  d.style.transform = "translateX(-50%)";
  d.style.marginTop = (r.top+r.height-5)+"px";
};

let wrongSymbols = ".,/?\\|`'!@#$%^&*()[]{}+="+'"';

//init fileRecoveryFeature
if(!localStorage.sessionId) localStorage.sessionId = 0;
// if(!localStorage.recoveryFiles) localStorage.recoveryFiles = "[]";
let recoveryFiles = {};
let sessionId = parseInt(localStorage.sessionId);
localStorage.sessionId++;
const maxStoredSessions = 30;
function initFileRecovery(){
  recoveryFiles = {};
  let ok = Object.keys(localStorage);
  let len = localStorage.length;
  for(let i = 0; i < len; i++){
    let k = ok[i];
    if(k.startsWith("rcv")){
      let v = localStorage[k];
      let split = k.split("@");
      if(false) if(sessionId-split[1] > maxStoredSessions){
        delete localStorage[k];
        continue;
      }
      let name = split[2];
      if(!recoveryFiles[name]) recoveryFiles[name] = {
        sessions:[]
      };
      let vv = recoveryFiles[name];
      vv.sessions.push(parseInt(split[1]));
    }
  }
}
initFileRecovery();
function addRecoveryBackup(){
  if(project.handle) return;
  if(project.hist.length <= 1) return;
  if(project.legacyName) return;
  console.log("saved...");
  let name = "rcv@"+sessionId+"@"+project.name;
  // console.log("Making recovery backup of... ",name);
  let str = getFileStr();
  // if(localStorage[name]) localStorage[name+"@old"] = localStorage[name];
  localStorage[name] = str;
}
setInterval(function(){
  addRecoveryBackup();
},3000);

const arms_d = document.getElementById("arms");

const canvas = document.getElementById("canvas");
/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
const ctx = can.getContext("2d");
/**@type {HTMLCanvasElement} */
const prev = document.getElementById("prev");
const pCtx = prev.getContext("2d");
pCtx.imageSmoothingEnabled = false;
const overlay = document.getElementById("overlay");
const back = document.getElementById("back");
const hex1i = document.getElementById("hex1");
const hex2i = document.getElementById("hex2");
const nob = new NobsinCtx(ctx);
const pNob = new NobsinCtx(pCtx);
/**@type {HTMLCanvasElement} */
const prevCan = document.getElementById("prevCan");
prevCan.width = 256;
prevCan.height = 256;
const prevCtx = prevCan.getContext("2d");
var cw_xy = {
  x:0,
  y:0
};
var dragging = false;
var draggingColor = false;
var dragLayer = null;
var dragSlider = -1;
var colorArea = null;
let penMirrorX = false;
let penMirrorY = false;
function createEmptyImage(w,h){
  let data = {
    name:"image",
    w,h,
    layers:[],
    _curLayer:null,
    get curLayer(){
      if(!this._curLayer){
        this._curLayer = this.layers[0];
        selectLayer_bare(0);
      }
      return this._curLayer;
    },
    set curLayer(v){
      this._curLayer = v;
    },
    selCol:0,
    select:[],
    select2:new Uint8ClampedArray(nob.ssize),
    selCount:0,
    arms:[],
    objs:[]
  };
  let temp = img;
  img = data;
  createLayer_bare(0,"Main");
  selectLayer_bare(0);
  let temp2 = project.frameI;
  project.frameI = project.frames.length;
  histAdd_all("Init");
  img = temp;
  project.frameI = temp2;
  hist_d.innerHTML = "";
  //layers_d.innerHTML = "";
  //project.frames.push(data);
  return data;
}
var fileName_l = document.getElementById("fileName");
var allProjects = [];
function createNewProject(name,w,h){
  fileName_l.innerHTML = name;
  let data = {
    name,
    w,h,
    frames:[],
    frameI:-1,

    hist:[],
    histI:-1,
    unsaved:true,

    onionSkin:false,
    c1:[255,0,0,255],
    c2:[0,0,255,255],

    /**@type {Obj[]} */
    objs:[],

    og:null,
    ref:null
  };
  data.og = data;
  return data;
}
HTMLElement.prototype.byClass = function(c){
  return this.getElementsByClassName(c)[0];
};
var frames_d = document.getElementById("frameList");
var frameOps = document.getElementById("frameOptions");
function goBackFrame(){
  project.frameI--;
  if(project.frameI < 0) project.frameI = project.frames.length-1;
  loadFrame(project.frames[project.frameI],true);
}
function goForwardFrame(){
  project.frameI++;
  if(project.frameI >= project.frames.length) project.frameI = 0;
  loadFrame(project.frames[project.frameI],true);
}
frameOps.byClass("onionSkin").onclick = function(){
  project.onionSkin = !project.onionSkin;
  let l = this;
  l.innerHTML = (project.onionSkin?"join_full":"join_inner");
  if(project.onionSkin){
    l.style.color = "olivedrab";
  }
  else{
    l.style.color = "gray";
  }
};
frameOps.byClass("navLeft").onclick = function(){
  goBackFrame();
};
frameOps.byClass("navRight").onclick = function(){
  goForwardFrame();
};
frameOps.byClass("newFrame").onclick = function(){
  createFrame(project.frameI+1);
};
frameOps.byClass("newFrameWObjs").onclick = function(){
  createFrameWObjs(project.frameI+1);
};
frameOps.byClass("cloneFrame").onclick = function(){
  cloneFrame(project.frameI,project.frameI+1);
};
function moveFrame(i,toI,bare=false){
  if(toI < 0) return;
  if(toI >= project.frames.length) return;
  let frame = project.frames[i];
  let temp = project.frames[project.frameI];
  project.frames.splice(i,1);
  project.frames.splice(toI,0,frame);
  project.frameI = project.frames.indexOf(temp);
  //project.frameI = toI;
  reconstructFramesDiv();
  updateFramesDiv();
  previewUpdateTimer = 0;
  if(!bare) _histAdd(HistIds.moveFrame,{
    f:i,t:toI,fi:project.frameI
  },"Move frame");
}
function moveLayer(i,toI,bare=false){
  if(toI < 0) return;
  let layers = project.frames[project.frameI].layers;
  if(toI >= layers.length) return;
  let l = layers[i];
  layers.splice(i,1);
  layers.splice(toI,0,l);
  reconstructLayersDiv();
  if(!bare) _histAdd(HistIds.full,null,"Move layer"); //to-do - make dedicated move layer histId
  selectLayer_bare(toI);
}
function createFrame_html(i){
  let d = document.createElement("div");
  let head = document.createElement("div");
  head.className = "header";
  let num = document.createElement("span");
  num.innerHTML = i+1;
  head.appendChild(num);
  d.appendChild(head);
  let cont = document.createElement("div");
  cont.className = "content";
  let c = document.createElement("canvas");
  cont.appendChild(c);
  d.appendChild(cont);

  let op = document.createElement("div");
  op.style.display = "flex";
  op.style.float = "right";
  op.style.height = "19px";
  op.style.transform = "translateY(1px)";
  op.frameI = i;
  /*let b = document.createElement("button");
  b.innerHTML = "<";
  b.frameI = i;
  b.onclick = function(){
    moveFrame(this.frameI,this.frameI-1);
  };
  let b1 = document.createElement("button");
  b1.frameI = i;
  b1.onclick = function(){
    moveFrame(this.frameI,this.frameI+1);
  };
  b1.innerHTML = ">";*/
  let b = document.createElement("div");
  b.className = "material-icons";
  b.classList.add("bLighter");
  b.style = "font-size:18px;line-height:1.2";
  b.frameI = i;
  b.onclick = function(){
    moveFrame(this.parentNode.frameI,this.parentNode.frameI-1);
  };
  b.innerHTML = "arrow_back";
  op.appendChild(b);
  let b2 = document.createElement("div");
  b2.className = "material-icons";
  b2.classList.add("bLighter");
  b2.style = "font-size:18px;line-height:1.2";
  b2.frameI = i;
  b2.onclick = function(){
    moveFrame(this.parentNode.frameI,this.parentNode.frameI+1);
  };
  b2.innerHTML = "arrow_forward";
  //op.appendChild(b);
  //op.appendChild(b1);
  op.appendChild(b2);
  let b3 = document.createElement("div");
  b3.className = "material-icons";
  b3.classList.add("bLighter");
  b3.style = "font-size:18px;line-height:1.2";
  b3.onclick = function(){
    deleteFrame(this.parentNode.frameI);
  };
  b3.innerHTML = "cancel";
  op.appendChild(b3);
  head.appendChild(op);

  frames_d.insertBefore(d,frames_d.children[i]);
}
function cloneOps(ops){
  let o = {};
  if(ops.obj) o.obj = ops.obj.clone();
  return o;
}
function cloneFrame(li,ti,bare=false){
  let lastLayerI = img.curLayer.ind;
  let lf = project.frames[li];
  let f = createFrame(ti,true);
  f.layers = [];
  let temp = project.frameI;
  project.frameI = ti;
  img = f;
  for(let i = 0; i < lf.layers.length; i++){
    let l = createLayer_bare(i,lf.layers[i].name,false,cloneOps(lf.layers[i].ops));
    f.layers.splice(i,0,l);
    l.nob.buf = cloneBuf(lf.layers[i].nob.buf,nob.size);
  }
  if(!bare){
    loadFrame(f);
    _histAdd(HistIds.full,null,"Clone Frame");
  }
  else project.frameI = temp;
  reconstructLayersDiv();
  selectLayer_bare(lastLayerI);
  return f;
}
function createFrameWObjs(i,bare=false){
  let a = getCurFrame();
  createFrame(project.frameI+1,true);
  for(let i = 0; i < a.layers.length; i++){
    let l = a.layers[i];
    if(l.ops.obj){
      cloneLayer(l.ind,project.frameI+1,true);
    }
  }
  _histAdd(HistIds.full,null,"New frame w/ objs");
}
function createFrame(i,bare=false){
  let frame = createEmptyImage(project.w,project.h);
  project.frames.splice(i,0,frame);
  createFrame_html(i);
  let temp = project.frameI;
  project.frameI = i;
  if(!bare){
    project.frameI = i;
    loadFrame(project.frames[project.frameI]);
    _histAdd(HistIds.createFrame,i);
  }
  else project.frameI = temp;
  updateFramesDiv();
  return frame;
}
function deleteFrame(i,bare=false){
  project.frames.splice(i,1);
  if(!bare){
    project.frameI--;
    loadFrame(project.frames[project.frameI]);
    _histAdd(HistIds.deleteFrame,i);
  }
  reconstructFramesDiv();
  updateFramesDiv();
}
var overCanvas = true;
var project = createNewProject("New Image",32,32); //256,256
var img;
function selectLayer(i){
  if(img.curLayer) if(img.curLayer.ind == i) return;
  if(i < 0){
    img.curLayer = null;
    return;
  }
  if(!img.layers[i]){
    img.curLayer = null;
    return;
  }
  let last = img.curLayer;
  let l = img.layers[i];
  if(!l) return;  
  selectLayer_bare(i);
  updateLayersDiv();
  return;
  histAdd({
    id:HistEvt.selLayer,
    sel:(l?l.ind:-1),
    deSel:(last?last.ind:-1)
  },"Select Layer: "+i);
}
function selectLayer_bare(i){
  if(!img.layers[i]){
    img.curLayer = null;
    return;
  }
  img.curLayer = img.layers[i];
  for(let j = img.layers.length-1; j >= 0; j--){
    let l = layers_d.children[j];
    l.className = "";
  }
  layers_d.children[img.layers.length-i-1].className = "sel";
  updateLayersDiv();
  //todo - visually update the selected layer
}
function createLayer(i,name,ops){
  if(name == null) name = "Layer "+i;
  if(i == null) i = img.layers.length;
  createLayer_bare(i,name,true,ops);
  /*histAdd({
    id:HistEvt.createLayer,
    i
  },"Create layer: "+i);*/
  selectLayer(i);
  //histAdd_all("Create-layer: "+i);
  _histAdd(HistIds.createLayer,{
    i,name,ops
  });
}
function selectFrame(i){
  project.frameI = i;
  let f = project.frames[project.frameI];
  img = f;
  loadFrame(f);
  reconstructFramesDiv(true); //maybe don't need this?
}
function cloneLayer(i,frameI,bare=false){
  let layer = img.layers[i];
  let rem = null;
  if(!layer){
    console.warn("no layer found");
    return;
  }
  if(frameI != null){
    selectFrame(frameI);
    rem = deepClone(sel2Frames);
  }
  i = img.layers.length-1;
  let ops = {};
  if(layer.ops){
    if(layer.ops.obj) ops.obj = layer.ops.obj.clone();
  }
  let l = createLayer_bare(i+1,layer.name,true,ops);
  l.nob.buf = cloneBuf(layer.nob.buf,layer.nob.size);
  selectLayer_bare(i+1);
  if(!bare) _histAdd(HistIds.full,null,(frameI!=null?"Clone to other frames":"Clone Layer")); //to-do - make this dedicated
  //if(rem) sel2Frames = rem;
}
function deleteLayer(i){
  //let name = img.layers[i].name;
  deleteLayer_bare(i);
  if(img.layers[i-1]) selectLayer_bare(i-1);
  else selectLayer_bare(0);
  //histAdd_all("Delete-layer: "+i);
  if(img.layers.length == 0){
    let l = createLayer_bare(0,"Layer 0",true);
    selectLayer_bare(0);
    _histAdd(HistIds.full,null,"Clear layer");
  }
  else _histAdd(HistIds.deleteLayer,i);
}
function deleteLayer_bare(i){
  img.layers.splice(i,1);
  layers_d.removeChild(layers_d.children[img.layers.length-i]);
}
function toggleLayerVisibility(i,bare=false,val){
  let l = img.layers[i];
  if(!bare){
    if(val != null) l.visible = val;
    else l.visible = !l.visible;
    _histAdd(HistIds.setLayerVisibility,{l:l.ind,v:l.visible},"Toggle layer visibility");
  }
  //console.log("LOG:",i,layers_d.children.length-1-i,layers_d.children[img.layers.length-1-i]);
  layers_d.children[layers_d.children.length-1-i].children[0].children[1].innerHTML = (l.visible?"visibility":"visibility_off");
  //to-do add hist support - done
}
function createLayer_html(i,name,ops={}){
  let l = img.layers[i];
  let dmain = document.createElement("div");
  let dset = document.createElement("div");
  dset.className = "dset";
  let num = document.createElement("div");
  num.className = "lnum";
  num.innerHTML = i+1;
  dset.appendChild(num);
  let vis = document.createElement("div");
  vis.innerHTML = "visibility";
  vis.className = "material-icons";
  dset.appendChild(vis);
  if(false){
    let del = document.createElement("div");
    del.innerHTML = "-";
    del.className = "ldel";
    dset.appendChild(del);
  }
  let set = document.createElement("div");
  set.innerHTML = "settings";
  set.classList.add("material-icons");
  set.classList.add("settings");
  set.style.marginTop = "auto";
  dset.appendChild(set);

  //
  let d = document.createElement("div");
  /*dmain.onmousedown = function(e){ //DRAGGING LAYERS THING NEEDS WORK
    dragging = true;
    dragLayer = this;
    dragLayer.sScrollTop = layers_d.scrollTop;
    let j = -1;
    for(let i = 0; i < layers_d.children.length; i++){
      if(layers_d.children[i] == this){
        j = i;
        break;
      }
    }
    dragLayer.index = j;
  };*/
  /*d.onclick = function(){
    selectLayer(l.ind);
  };*/
  d.className = "dlayer";
  let s = document.createElement("span");
  s.innerHTML = name;
  s.onclick = function(){
    if(!this.innerHTML.includes("input")){
      let inp = document.createElement("input");
      inp.value = this.innerHTML;
      inp.oldVal = inp.value;
      this.innerHTML = "";
      this.appendChild(inp);
      //this.innerHTML = `<input value='${this.innerHTML}'>`;
      inp.onblur = function(){
        let name = this.value;
        this.onblur = null;
        this.parentNode.innerHTML = "";
        renameLayer(l,name,this.parentNode);
        //this.parentNode.innerHTML = name;
        //this.onkeydown({key:"Enter"});
      };
      inp.onkeydown = function(e){
        if(e.key == "Enter"){
          this.onblur();
          //this.onblur = null;
          //let name = this.value;
          //this.parentNode.innerHTML = name;
        }
        else if(e.key == "Escape"){
          this.onblur = null;
          let name = this.oldVal;
          this.parentNode.innerHTML = name;
        }
      };
      inp.focus();
    }
  };
  let c = document.createElement("canvas");
  c.width = project.w;
  c.height = project.h;
  d.appendChild(s);
  d.appendChild(c);
  if(false) if(ops.isObj){
    c.classList.add("min");
  }
  dmain.appendChild(dset);
  dmain.appendChild(d);
  if(img.layers.length != 0) layers_d.insertBefore(dmain,layers_d.firstChild);
  if(l) toggleLayerVisibility(i,true,l.visible);
}
function createLayer_bare(i,name,visual=true,ops={}){
  can.width = project.w;
  can.height = project.h;
  let l = {
    nob:new NobsinCtx(ctx),
    name:name,
    ind:i,
    visible:true,
    settings:{
      brightness:1,
      contrast:1
    },
    ops:cloneOps(ops)
  };
  l.nob.pixelCount = 0;
  l.nob.buf = new Uint8ClampedArray(l.nob.size);
  l.nob.dep = new Uint8ClampedArray(l.nob.ssize);
  //
  if(visual){
    img.layers.splice(i,0,l);
    createLayer_html(i,name,ops);
    updateLayersDiv();
  }

  return l;
  //else layers_d.appendChild(d);
}
var settings = {
  grid:true,
  gridlines:false
};
var red = [150,0,0,150];
var pink = [255,150,150,150];
var gray = [100,100,100,255];
var lightgray = [150,150,150,255];
var black = [0,0,0,255];
var prevSelect = [100,100,100,160];
var delPrevSelect = [200,0,0,160];
var color = [
  [
    255,0,0,255
  ],
  [0,150,0,255]
];
var toolData = [
  {},
  {
    lx:0,
    ly:0,
    x:0,
    y:0,
    vx:0,
    vy:0,
    list:[]
  },
  {},
  {
    sx:0,
    sy:0,
    w:0,
    h:0,
    drawn:0,
    offx:0,
    offy:0
  },
  {
    sx:0,
    sy:0,
    offx:0,
    offy:0
  },
  {
    sx:0,
    sy:0,
    srx:1,
    sry:1,
    offx:0,
    offy:0,
    data:null,
    done:0,
    px:0,
    py:0,
    fromCP:false,
    tpx:0,
    tpy:0,
    rot:0,
    useTrans:true
  },
  {},
  //
  {
    c:null
  }, //fill
  {},
  {},
  {}, //transform
];
var tools = [
  {
    name:"Pencil"
  },
  {
    name:"Line"
  },
  {
    name:"Pan"
  },
  {
    name:"Rect Select",
    lockable:true
  },
  {
    name:"Move Select"
  },
  {
    name:"Move",
    lockable:true
  },
  {
    name:"Pointer"
  },
  {
    name:"Fill"
  },
  {
    name:"Eye Dropper"
  },
  {
    name:"Simple Eraser"
  },
  {
    name:"Bezier Curve"
  },
  {name:"Edit Armature"},
  {name:"Shape Tool"}
];
var Tools = {
  pencil:0,
  line:1,
  pan:2,
  rectSelect:3,
  moveSelect:4,
  move:5,
  pointer:6,
  fill:7,
  eyeDropper:8,
  eraser:9,
  bezier:10,
  arm:11,
  shape:12
};
var selTool = 0;
var tempTool = -1;
var curTool = 0;

//Layers
var layers_d = document.getElementById("layerList");
var loptions_d = document.getElementById("layerOptions");
loptions_d.children[3].onclick = function(){
  createLayer(img.curLayer?img.curLayer.ind+1:img.layers.length);
};
function updateLayersDiv(){
  for(let i = 0; i < img.layers.length; i++){
    let l = img.layers[i];
    let ll = layers_d.children[img.layers.length-i-1];
    ll.children[1].children[0].innerHTML = l.name;
    ll.children[0].children[0].innerHTML = i+1;
    ll.children[1].onclick = function(){
      selectLayer(l.ind);
    };
    ll.children[0].children[1].onclick = function(){
      toggleLayerVisibility(l.ind);
    };
    if(false) ll.children[0].getElementsByClassName("ldel")[0].onclick = function(){
      deleteLayer(l.ind);
    };
    let aa = ll.children[0].getElementsByClassName("settings")[0];
    aa.onopen = function(){
      aa.style.transition = "all 0.2s";
      aa.style.transform = "rotate(45deg)";
    };
    aa.onclose = function(){
      aa.style.transform = "";
    };
    let l2 = ["Close","Merge Down","Add To Highlighted Frames","Settings","Delete"];
    createDropdown(0,l2,[
      null,
      "Merge the current layer on top of the lower one",
      "Add the current layer to all of the highlighted frames. If there is already a layer with the same name on a frame, the new layer is not added",
      "Adjust layer settings",
      "Deletes the layer"
    ],(j,a)=>{
      let l1 = l2[j];
      if(j == 1){ //Merge Down
        if(!img.layers[i-1]) return;
        let l2 = img.layers[i-1];
        l2.nob.drawImage_basic(rasterizeLayer(l),0,0);
        deleteLayer_bare(i);
        selectLayer_bare(i-1);
        _histAdd(HistIds.full,null,"Merge layer down");
      }
      if(j == 2){ //Add to highlighted
        for(let i1 = 0; i1 < sel2Frames.length; i1++){
          let f1 = sel2Frames[i1];
          let ff = project.frames[f1];
          let cont = false;
          for(let j1 = 0; j1 < ff.layers.length; j1++){
            let l2 = ff.layers[j1];
            if(l2.name == l.name){
              cont = true;
              break;
            }
          }
          if(cont) continue;
          cloneLayer(i,f1,true);
        }
        _histAdd(HistIds.full,null,"Clone to other frames");
        reconstructFramesDiv();
      }
      if(l1 == "Settings") openMenu("layerSettings",l.ind);
      if(l1 == "Delete") deleteLayer(i);
    },aa,true);
    if(false) ll.children[0].getElementsByClassName("settings")[0].onclick = function(){
      //openMenu("layerSettings",l.ind);
      
    };
    if(l == img.curLayer) ll.scrollIntoView(false);
  }
}

//History
function cloneBuf(a,size){
  if(!a) console.warn("CLONEBUF: NO 'A' WAS FOUND");
  let b = new Uint8ClampedArray(size);
  for(let i = 0; i < size; i++){
    b[i] = (a ? a[i] : 0);
  }
  return b;
}
//nob.useRecord = true;
var hist_d = document.getElementById("histList");
var HistEvt = {
  image:0,
  map:1,
  selLayer:2,
  createLayer:3,
  all:4
};
function histAdd_map(map){
  return;
  let m = new Map();
  for(const [k,v] of map){
    m.set(k,v);
  }
  project.hist.push({
    id:HistEvt.map,
    map:m
  });
  project.histI++;
}
function reconstructHistDiv_new(){
  hist_d.innerHTML = "";
  for(let i = 0; i < project.hist.length; i++){
    let l = document.createElement("span");
    l.innerHTML = project.hist[i].name;
    hist_d.appendChild(l);
  }
  updateHistDiv();
}
function reconstructHistDiv(){
  hist_d.innerHTML = "";
  return;
  for(let i = 0; i < project.hist.length; i++){
    let l = document.createElement("span");
    l.innerHTML = project.hist[i].text;
    hist_d.appendChild(l);
  }
  updateHistDiv();
}
function getImg(){
  if(!img){
    if(project.frameI == -1) project.frameI = 0;
    img = project.frames[project.frameI];
  }
  return img;
}
function reconstructLayersDiv(){
  layers_d.innerHTML = "";
  let im = getImg();
  for(let i = 0; i < im.layers.length; i++){
    createLayer_html(i,im.layers[i].name,im.layers[i].ops);
  }
  selectLayer_bare(im.curLayer.ind);
  updateLayersDiv();
}
function reconstructFramesDiv(keepSel=false){
  frames_d.innerHTML = "";
  if(!keepSel) sel2Frames = [];
  for(let i = 0; i < project.frames.length; i++){
    createFrame_html(i);
  }
  updateFramesDiv();
  let skip = 1;
  if(project.w > 128 || project.h > 128) skip = Math.ceil(Math.max(project.w,project.h)/128);
  for(let i = 0; i < project.frames.length; i++){
    let n = rasterizeFrame(i,skip);
    let c = frames_d.children[i].children[1].children[0];
    c.width = project.w/skip;
    c.height = project.h/skip;
    if(c.width > c.height){
      c.style.width = "60px";
      c.style.height = "unset";
    }
    else if(c.width < c.height){
      c.style.width = "unset";
      c.style.height = "60px";
    }
    c.getContext("2d").putImageData(new ImageData(n.buf,project.w,project.h),0,0);
  }
}
function updateHistDiv(){
  for(let i = 0; i < hist_d.children.length; i++){
    let a = hist_d.children[i];
    if(i > project.histI) a.className = "after";
    else a.className = "";
    a.onclick = function(){
      histGoTo(i);
    };
  }
  if(hist_d.children[project.histI]){
    hist_d.children[project.histI].className = "cur";
    hist_d.children[project.histI].scrollIntoView(false);
  }
}
function rasterizeLayer(l){
  let n = new NobsinCtx(ctx);
  /**@type {Obj | Armature} */
  let o = l.ops.obj;
  if(l.visible) if(o){
    if(o.type == ObjType.none){

    }
    else if(o.type == ObjType.test){
      l.nob.buf.fill(0);
      l.nob.pixelCount = 0;
      o.render(l.nob);
      l.nob.pixelCount = 0;
    }
    else if(o.type == ObjType.arm){
      l.nob.buf.fill(0);
      l.nob.pixelCount = 0;
      o.render(l.nob);
      l.nob.pixelCount = 0;
    }
    else if(o.type == ObjType.img){
      l.nob.buf.fill(0);
      l.nob.pixelCount = 0;
      o.render(l.nob);
      l.nob.pixelCount = 0;
    }
  }
  let b = l.nob.buf;
  let nb = new Uint8ClampedArray(nob.size);
  n.buf = nb;
  for(let i = 0; i < nob.size; i += 4){
    nb[i] = b[i];// * l.settings.brightness; //temporarily disable brightness
    nb[i+1] = b[i+1];// * l.settings.brightness;
    nb[i+2] = b[i+2];// * l.settings.brightness;
    nb[i+3] = b[i+3];
  }
  return fromNob(n);
}
function rasterizeFrame(i,skip=1,save=false){
  let f = project.frames[i];
  let n = new NobsinCtx(ctx);
  n.buf = new Uint8ClampedArray(n.size);
  for(let j = 0; j < f.layers.length; j++){
    let l = f.layers[j];
    if(save) if(l.ops.obj) continue;
    if(l.visible) n.drawImage_basic_skip(rasterizeLayer(l),0,0,skip);
  }
  return n;
}

//NEW HIST - STATE MACHINE
var HistIds = {
  px:0,
  createLayer:1,
  deleteLayer:2,
  createFrame:3,
  deleteFrame:4,
  selectFrame:5,
  select:6,
  deselect:7,
  full:8,
  moveFrame:9,
  resizeImage:10,
  resizeCanvas:11,
  renameLayer:12,
  setLayerVisibility:13
};
var HistNames = [
  "Color data",
  "Create layer",
  "Delete layer",
  "Create frame",
  "Delete frame",
  "Select frame",
  "Selection",
  "Deselect"
];
//var _hist = [];
//var _histI = -1;
var _histFreq = 5; //4
function _histAdd(id,data,name){
  if(name == null) name = HistNames[id];

  project.unsaved = true;
  updateFileName();

  let needsRecon = false;
  if(project.hist.length > project.histI+1) needsRecon = true;
  project.hist.splice(project.histI+1,project.hist.length);
  let isFull = false;
  if(id == HistIds.full) isFull = true;
  if(!isFull) if(project.hist.length == 0) isFull = true;
  if(!isFull) if(project.histI % project.histFreq == 0) isFull = true;
  if(isFull){ //save full state
    let d = {
      full:true,
      name,
      frames:[],
      frameI:project.frameI,
      w:project.w,
      h:project.h,
      objs:[]
    };
    for(let i = 0; i < project.objs.length; i++){
      let o = project.objs[i];
      let d1 = {
        type:o.type,
        state:o.getState()
      };
      d.objs.push(d1);
      console.log("LOG: ",d1);
    }
    for(let i = 0; i < project.frames.length; i++){
      let frame = project.frames[i];
      let d2 = {
        layers:[],
        curLayer:frame.curLayer.ind,
        select:cloneBuf(frame.select2,nob.ssize),
        selCount:frame.selCount
      };
      for(let j = 0; j < frame.layers.length; j++){
        let layer = frame.layers[j];
        let ops = {};
        if(layer.ops){
          if(layer.ops.obj){
            /**@type {Obj} */
            let obj = layer.ops.obj;
            ops.obj = {
              ref:obj,
              state:obj.getState()
            }
          }
        }
        d2.layers.push({
          name:layer.name,
          visible:layer.visible,
          buf:cloneBuf(layer.nob.buf,nob.size),
          settings:deepClone(layer.settings),
          ops
        });
      }
      d.frames.push(d2);
    }
    project.hist.push(d);
    project.histI++;
  }
  else{ //save temp state
    //console.warn("NOT IMPLIMENTED YET");
    let d = {
      full:false,
      name,
      id,data,
      f:project.frameI,
      l:img.curLayer.ind
    };
    project.hist.push(d);
    project.histI++;
  }

  if(needsRecon){
    reconstructHistDiv_new();
  }
  else{
    let span = document.createElement("span");
    span.innerHTML = name;
    hist_d.appendChild(span);
    updateHistDiv();
  }

  for(let i = 0; i < project.frames.length; i++){
    updateFramePreview(i,1);
  }
}
//

function histAdd_all(text="..."){
  return;
  if(project.histI != project.hist.length-1){
    for(let i = project.histI+1; i < project.hist.length; i++){
      hist_d.removeChild(hist_d.children[project.histI+1]);
    }
    project.hist.splice(project.histI+1,project.hist.length);
  }
  let d = {
    id:HistEvt.all,
    text,
    layers:[],
    curLayer:(img.curLayer?img.curLayer.ind:-1),
    select:deepClone(img.select),
    frameI:project.frameI,
    frames:[]
  };
  /*let curE = project.hist[project.histI];
  if(curE) if(project.frameI != curE.frameI){
    console.log("SPEC: ",project.frameI,curE.frameI);
    d.special = true;
  }*/
  for(let i = 0; i < img.layers.length; i++){
    let l = img.layers[i];
    d.layers[i] = {
      buf:cloneBuf(l.nob.buf,nob.size),
      name:l.name
    };
  }
  for(let i = 0; i < project.frames.length; i++){
    let n = rasterizeFrame(i);
    d.frames[i] = cloneBuf(n.buf,nob.size);
  }
  project.hist.push(d);
  project.histI++;
  let l = document.createElement("span");
  l.innerHTML = text;
  hist_d.appendChild(l);
  updateHistDiv();
  hist_d.scrollTop = hist_d.scrollHeight;
}
function histAdd(d,text="..."){
  if(histI != hist.length-1){
    for(let i = histI+1; i < hist.length; i++){
      hist_d.removeChild(hist_d.children[histI+1]);
    }
    hist.splice(histI+1,hist.length);
  }
  hist.push(d);
  histI++;
  let l = document.createElement("span");
  l.innerHTML = text;
  hist_d.appendChild(l);
  updateHistDiv();
}
function histAdd_image(overTool){
  return;
  if(histI != hist.length-1){
    for(let i = histI+1; i < hist.length; i++){
      hist_d.removeChild(hist_d.children[histI+1]);
    }
    hist.splice(histI+1,hist.length);
  }
  let e = {
    id:HistEvt.image,
    buf:cloneBuf(img.curLayer.nob.buf,nob.size),
    tool:curTool,
    layer:img.curLayer.ind
  };
  hist.push(e);
  histI++;
  let l = document.createElement("span");
  l.innerHTML = tools[overTool != null ? overTool : e.tool].name;
  hist_d.appendChild(l);
  updateHistDiv();
}
function histGoTo(i){
  let d = 1;
  if(i < project.histI) d = -1;
  while(project.histI != i){
    if(d == 1) redo();
    else undo();
    //histI += d;
    //let 
  }
}
function histAll(e,isUndo=false){
  return;
  //frames_d.innerHTML = "";
  //reconstructFramesDiv();
  /*for(let i = 0; i < project.frames.length; i++){
    
  }*/
  /*if(isUndo){
    let nextE = project.hist[project.histI+1];
    if(e.special) console.log("USE SPECIAL");
    //console.log(e.frameI,nextE.frameI);
    if(nextE.frameI != e.frameI){
      
    }
  }*/

  /*if(!project.frames[e.frameI]){
    let frame = createEmptyImage(project.w,project.h);
    project.frames.splice(e.frameI,0,frame);
    reconstructFramesDiv();
    updateFramesDiv();
  }*/

  project.frameI = e.frameI;
  loadFrame(project.frames[project.frameI]);

  let len = img.layers.length;
  for(let i = 0; i < len; i++){
    deleteLayer_bare(0);
  }
  for(let i = 0; i < e.layers.length; i++){
    let l = e.layers[i];
    let ll = createLayer_bare(i,l.name);
    ll.nob.buf = cloneBuf(l.buf,nob.size);
    //ll.name = l.name;
    //let d = layers_d.children[img.layers.length-i-1].children[1];
    //d.children[0].innerHTML = l.name;
  }
  img.select = deepClone(e.select);
  selectLayer_bare(e.curLayer);
  
  /*for(let i = 0; i < e.layers.length; i++){
    let l = e.layers[i];
    let ll = img.layers[i];
    if(!ll) ll = createLayer_bare(i);
    ll.nob.buf = cloneBuf(l.buf,nob.size);
    ll.name = l.name;
  }*/
  /*for(let i = e.layers.length; i < img.layers.length; i++){
    deleteLayer_bare(i);
  }*/
}
function _runHist(){
  let last = null;
  let lastI = -1;
  for(let i = project.histI; i >= 0; i--){
    if(project.hist[i].full){
      last = project.hist[i];
      lastI = i;
      break;
    }
  }
  //console.log("FROM: ",lastI,project.histI,last);
  if(!last) return;
  //console.log("--START");
  for(let i = lastI; i <= project.histI; i++){
    let e = project.hist[i];
    if(e.full){
      let l = document.getElementsByClassName("aPoint");
      for(const a of l) a.style.visibility = "hidden";

      img = null;
      frames_d.innerHTML = "";
      layers_d.innerHTML = "";
      hist_d.innerHTML = "";
      let projI = allProjects.indexOf(project);
      let _hist = project.hist;
      let _histI = project.histI;
      let _hand = project.handle;
      let _unsaved = project.unsaved;
      let _legacyName = project.legacyName;
      //let _objs = project.objs;
      //if(e.w != can.width || e.h != can.height){
        resizeImage(e.w,e.h,true);
        //resetView();
      //}
      if(!project.og) project.og = project;
      let _og = project.og;
      project = createNewProject(project.name,project.w,project.h);
      project.og = _og;
      project.og.ref = project;
      project.hist = _hist;
      project.histI = _histI;
      project.handle = _hand;
      project.unsaved = _unsaved;
      project.legacyName = _legacyName;
      //project.objs = _objs;
      project.w = e.w;
      project.h = e.h;
      allProjects[projI] = project;
      for(let i = 0; i < e.objs.length; i++){
        let o = e.objs[i];
        if(o.type == ObjType.test){
          let a = new TestObj(o.name,o.x,o.y,ObjType.test);
          a.loadState(o.state);
          project.objs.push(a);
        }
        else if(o.type == ObjType.arm){
          let a = new Armature(0,"-.-");
          a.loadState(o.state);
          project.objs.push(a);
        }
        else if(o.type == ObjType.img){
          let a = new ImgObj("-.-",0,0);
          a.loadState(o.state);
          project.objs.push(a);
        }
      }
      reloadObjsList();
      for(let a = 0; a < e.frames.length; a++){
        let f = createFrame(a,true);
        f.layers = [];
        img = f;
        project.frameI = a;
        let frame = e.frames[a];
        layers_d.innerHTML = "";
        f.select2 = cloneBuf(frame.select,nob.ssize);
        f.selCount = frame.selCount;
        //console.log("BOB: ",img);
        for(let b = 0; b < frame.layers.length; b++){
          let layer = frame.layers[b];
          let ops = {};
          if(layer.ops){
            if(layer.ops.obj){
              ops.obj = layer.ops.obj.ref;
              ops.obj.loadState(layer.ops.obj.state);
            }
          }
          let l = createLayer_bare(b,layer.name,false,ops);
          l.visible = layer.visible;
          f.layers.splice(b,0,l);
          l.nob.buf = cloneBuf(layer.buf,nob.size);
          l.ind = b;
          l.settings = layer.settings;
          //reconstructLayersDiv();
        }
        f.curLayer = f.layers[frame.curLayer];
      }
      project.frameI = e.frameI;
      //updateFramesDiv();
      //selectLayer_bare(e.frames[e.frameI].curLayer);
      //img = project.frames[e.frameI].layers[e.frames[e.frameI].curLayer];
      //reconstructLayersDiv();

      //project.frameI = e.frameI;
      loadFrame(project.frames[project.frameI]);
      //let layerI = project.frames[project.frameI].curLayer.ind;
      selectLayer_bare(e.frames[e.frameI].curLayer);
    }
    else{
      if(project.frameI != e.f) if(project.frames[e.f]){
        project.frameI = e.f;
        loadFrame(project.frames[project.frameI]);
      }
      if(!img.curLayer) img.curLayer = img.layers[0];
      if(img) if(img.curLayer.ind != e.l) if(img.layers.length >= e.l){
        selectLayer_bare(e.l);
      }
      switch(e.id){
        case HistIds.px: //{f:int,l:int,list:map<color,[int]>}
          let f = project.frames[e.f];
          //project.frameI = e.data.f;
          //loadFrame(project.frames[e.data.f]);
          let l = f.layers[e.l];
          //selectLayer_bare(e.data.l);
          for(const [cs,list] of e.data){
            let c = JSON.parse(cs);
            for(let i = 0; i < list.length; i++){
              l.nob.drawPixel_ind(list[i],c[0],c[1],c[2],c[3]);
            }
          }
          //SINGLE:
          /*let f = project.frames[data.f];
          let l = f.layers[data.l];
          let c = data.c;
          for(let i = 0; i < e.data.length; i++){
            l.nob.drawPixel_ind(e.data[i],c[0],c[1],c[2],c[3]);
          }*/
        break;
        case HistIds.createLayer:
          createLayer_bare(e.data.i,e.data.name,true,e.data.ops);
          selectLayer_bare(e.data.i);
        break;
        case HistIds.deleteLayer:
          deleteLayer_bare(e.data);
          selectLayer_bare(e.data-1);
        break;
        case HistIds.createFrame:
          createFrame(e.data,true);
          project.frameI = e.data;
          loadFrame(project.frames[project.frameI]);
        break;
        case HistIds.deleteFrame:
          deleteFrame(e.data,true);
          project.frameI = e.data-1;
          loadFrame(project.frames[project.frameI]);
        break;
        case HistIds.selectFrame:
          project.frameI = e.data;
          loadFrame(project.frames[project.frameI]);
        break;
        case HistIds.select:
          //img.select = deepClone(e.data);
          img.select2 = cloneBuf(e.data.a,nob.ssize);
          img.selCount = e.data.c;
        break;
        case HistIds.deselect:
          //img.select = [];
          img.select2 = new Uint8ClampedArray(nob.ssize);
          img.selCount = 0;
        break;
        case HistIds.moveFrame:
          moveFrame(e.data.f,e.data.t,true);
          project.frameI = e.data.fi;
          loadFrame(project.frames[project.frameI],true);
        break;
        case HistIds.resizeImage:
          resizeProject(e.data.w,e.data.h,true);
        break;
        case HistIds.resizeCanvas:
          resizeProjectCanvas(e.data.w,e.data.h,e.data.ox,e.data.oy,true);
        break;
        case HistIds.renameLayer:
          renameLayer(img.layers[e.data.l],e.data.n,e.data.ref,true);
        break;
        case HistIds.setLayerVisibility:
          img.layers[e.data.l].visible = e.data.v;
          layers_d.children[layers_d.children.length-1-e.data.l].children[0].children[1].innerHTML = (e.data.v?"visibility":"visibility_off");
        break;
      }
      //console.warn("NOT IMPL YET");
    }
  }

  reconstructHistDiv_new();
  previewUpdateTimer = 0;
  if(!img.curLayer) img.curLayer = img.layers[0];
  resetDep();
  updateUndoCtxB();
  updateRedoCtxB();
  updateFileName();
  reconstructFramesDiv();
  setZoom(zoom);
}
function _updateHistDiv(){

}
function isToolLockingHist(){
  let td = toolData[curTool];
  if(curTool == Tools.move) if(td.done != 0) return true;
  if(curTool == Tools.rectSelect) if(td.drawn != 0) return true;
  return false;
}
function undo(){
  if(isToolLockingHist()) return;

  if(project.histI < 0) project.histI = 0;
  else if(project.histI == 0) return;
  project.histI--;
  //let e = project.hist[project.histI];

  project.unsaved = true;

  _runHist();
  _updateHistDiv();
}
function redo(){
  if(isToolLockingHist()) return;

  if(project.histI >= project.hist.length) project.histI = project.hist.length-1;
  else if(project.histI == project.hist.length-1) return;
  project.histI++;
  //let e = project.hist[project.histI];

  project.unsaved = true;

  _runHist();
  _updateHistDiv();
}
function undo_old(){
  if(project.histI < 0) project.histI = 0;
  else if(project.histI == 0) return;
  let le = project.hist[project.histI];
  project.histI--;
  let e = project.hist[project.histI];
  switch(e.id){
    case HistEvt.all:
      histAll(e,true);
    break;
    case HistEvt.image:
      let layer = img.layers[e.layer];
      layer.nob.buf = cloneBuf(e.buf,nob.size);
      selectLayer_bare(e.layer);
    break;
  }
  e = le;
  switch(e.id){
    case HistEvt.selLayer:
      selectLayer_bare(e.deSel);
      console.log("DESEL: "+(e.deSel?e.deSel.name:"NONE"));
    break;
    case HistEvt.createLayer:
      deleteLayer_bare(e.i);
    break;
  }
  updateHistDiv();
}
function redo_old(){
  if(project.histI >= project.hist.length) project.histI = project.hist.length-1;
  else if(project.histI == project.hist.length-1) return;
  let le = project.hist[project.histI];
  project.histI++;
  let e = project.hist[project.histI];
  //console.log("REDO: "+e.id,histI);
  switch(e.id){
    case HistEvt.all:
      histAll(e);
    break;
    case HistEvt.image:
      let layer = img.layers[e.layer];
      layer.nob.buf = cloneBuf(e.buf,nob.size);
      selectLayer_bare(e.layer);
    break;
    case HistEvt.selLayer:
      console.log("SEL: "+(e.sel?e.sel.name:"NONE"));
      selectLayer_bare(e.sel);
    break;
    case HistEvt.createLayer:
      createLayer_bare(e.i);
    break;
  }
  e = le;
  switch(e.id){
    
  }
  updateHistDiv();
}

//Setup
document.addEventListener("selectstart",e=>{
  e.preventDefault();
});
function registerInfo(l,inf,pos){
  if(pos) l.setAttribute("pos",pos);
  if(inf != null){
    l.setAttribute("name","info");
    l.setAttribute("info",inf);
  }
  l.onmouseenter = function(){
    let info = this.getAttribute("info");
    info_l.innerHTML = "(?) "+info;
  };
  l.onmouseleave = function(){
    info_l.innerHTML = "No info.";
  };
  regNewLabel(l);
}
const infos = document.getElementsByName("info");
const info_l = document.getElementById("info_l");
for(const l of infos){
  registerInfo(l);
}
const td_d = document.getElementById("toolData");
const FillMode = {
  flood:0,
  global:1
};
const DrawMode = {
  color:0,
  erase:1,
  select:2
};
const BlendMode = {
  normal:0,
  replace:1,
  add:2,
  multiply:3
};
const FillMethod = {
  recursive:0,
  span:1
};
var toolSettings = [
  {
    size:1,
    drawMode:DrawMode.color,
    blendMode:BlendMode.normal,
    mirrorX:false,
    mirrorY:false,
    lineMirrorMode:false
  },
  {
    size:1,
    drawMode:DrawMode.color,
    blendMode:BlendMode.normal
  },
  {},
  {},
  {},
  {
    move_sx:1,
    move_sy:1,
    rotation:0,
    transform:true
  },
  {},
  //
  {
    fillMode:FillMode.flood,
    drawMode:DrawMode.color,
    blendMode:BlendMode.normal,
    fillMethod:FillMethod.recursive
  }, //fill,
  {},
  { //eraser
    size:1,
    mirrorX:false,
    mirrorY:false,
    lineMirrorMode:false
  },
  { //bezier
    size:1
  },
  { //armature

  },
  { //shape

  }
];
function drawPixel(n,x,y,c,dep){
  let dm = toolSettings[curTool].drawMode;
  switch(dm){
    case DrawMode.color:
      n.drawPixel_dep(x,y,c,dep);
    break;
    case DrawMode.erase:
      n.drawPixel_dep(x,y,clear,dep);
    break;
  }
}
function drawPixel_ind(n,ind,r,g,b,a,replace,dep,override){
  let dm = toolSettings[curTool].drawMode;
  if(override != null) dm = override;
  switch(dm){
    case DrawMode.color:
      n.drawPixel_ind_dep(ind,r,g,b,a,replace,dep);
    break;
    case DrawMode.erase:
      n.drawPixel_ind_dep(ind,0,0,0,0,true,dep);
    break;
    case DrawMode.select:
      addToSelect(ind,0,0,keys.alt);
    break;
  }
}
function drawRect(n,x1,y1,wr,hr,col,dep){
  wr = Math.floor(wr);
  hr = Math.floor(hr);
  x1 = Math.floor(x1);
  y1 = Math.floor(y1);
  let x = x1;
  let y = y1;
  let ind = (x+y*n.width)*4;
  let wd = wr;
  let hd = hr;
  for(let j = 0; j < hd; j++){
    for(let i = 0; i < wd; i++){
      let pass = true;
      if(x < 0) pass = false;
      else if(x >= n.width) pass = false;
      /*let dInd = Math.floor(ind/4);
      if(col[0] == 0 && col[1] == 0 && col[2] == 0 && col[3] == 0){
        n.dep[dInd] = 0;
      }*/
      //if(pass) if(n.dep[dInd] < dep){
        //n.dep[dInd] = dep;
        if(pass) drawPixel_ind(n,ind,col[0],col[1],col[2],col[3],false,dep);
      //}
      x++;
      ind += 4;
    }
    y++;
    x -= wd;
    ind += (n.width*4-wd*4);
  }
}
function drawLine(n,x0,y0,x1,y1,c,w,dep){
  let hw = Math.floor(w/2); //half width
  if(w < 1 && w > 0.1) w = 1;

  drawRect(n,x0-hw,y0-hw,w,w,c,dep);
  drawRect(n,x1-hw,y1-hw,w,w,c,dep);
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
    drawRect(n,x0-hw,y0-hw,w,w,c,dep);

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
var toolFunc = {
  updateSize:function(){
    if(toolSettings[curTool].size < 1) toolSettings[curTool].size = 1;
    let l = document.getElementsByClassName("tool_size_inp");
    for(const d of l){
      d.value = toolSettings[curTool].size;
    }
  },
  decSize:function(){
    toolSettings[curTool].size--;
    this.updateSize();
  },
  incSize:function(){
    toolSettings[curTool].size++;
    this.updateSize();
  },
  setSize:function(v,i){
    toolSettings[curTool].size = v;
    this.updateSize();
    if(i) i.value = toolSettings[curTool].size;
  },
  deleteSelection:function(){
    let m = new Map();
    let l = [];
    m.set("[0,0,0,0]",l);
    let i2 = 0;
    for(let i = 0; i < nob.size; i += 4){
      if(img.select2[i2]){
        l.push(i);
        img.curLayer.nob.drawPixel_ind(i,0,0,0,0,true);
      }
      i2++;
    }
    _histAdd(HistIds.px,m,"Delete");
  }
};
var toolConfirm_d = document.getElementById("toolConfirm_d");
toolConfirm_d.children[0].onclick = function(){
  resetTool(curTool);
};
toolConfirm_d.children[1].onclick = function(){
  confirmTool(curTool);
};
function lockHist(){
  toolConfirm_d.style.visibility = "visible";
}
function unlockHist(){
  toolConfirm_d.style.visibility = "hidden";
}
function getOffset(a){
  let { left, top } = a.getBoundingClientRect();
  left += window.scrollX;
  top += window.scrollY;
  return [left,top];
  //let x = 0;
  //let y = 0;
  /*while(a){
    console.log("--LEFT: ",a.offsetLeft);
    if(a.offsetLeft) x += a.offsetLeft;
    if(a.offsetTop) y += a.offsetTop;
    a = a.parentNode;
  }*/
  //return [x,y];
}
function createDropdown(i,l,desc,f,b,fixed=false){
  if(!b) b = document.createElement("button");
  if(!fixed) b.innerHTML = l[i];
  b.onmousedown = function(){
    if(img.curLayer.nob.pixelCount != 0) return;
    if(this.onopen)  this.onopen();
    let rect = getOffset(this);
    let main = this;
    //let l = ["Flood","Global"];
    this.ctxRef = _loadCtx("dd",l,[],function(j,d,lvl){
      d.i = j;
      d.onclick = function(){
        main.index = this.i;
        if(!fixed) main.innerHTML = l[this.i];
        if(f) f(this.i,this);
        closeAllCtxMenus();
      };
      if(desc) registerInfo(d,desc[j]);
      //if(i == 0) registerInfo(d,"Fill Mode (Flood): Pixels will keep filling from the cursor position until they hit a different pixel color.");
      //else if(i == 1) registerInfo(d,"Fill Mode (Global): All the pixels in the image with the same color as what you clicked on will be replaced with your palet color.");
    },rect[0]-1,rect[1]+this.offsetHeight-1,true,0);
    if(this.ctxRef) this.ctxRef.onclose = this.onclose;
    else if(this.onclose) this.onclose();
  };
  b.load = function(i){
    f(i,this);
  };
  return b;
}
function getCurTool(){
  return toolData[curTool];
}
function genToolSettings(i){
  let td = toolData[curTool];
  td_d.innerHTML = "";
  unlockHist();
  let td2 = tools[i];
  if(td2.lockable) if(isToolLockingHist()) lockHist();
  document.getElementById("toolBar").children[0].innerHTML = tools[i].name;
  let dd = toolSettings[i];
  if(!dd) return;
  let ok = Object.keys(dd);
  for(let j = 0; j < ok.length; j++){
    let id = ok[j];
    let v = dd[id];
    switch(id){
      case "size":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (size): Defines the size of the line/pixel drawn.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Size: ";
        let b = document.createElement("button");
        b.onclick = function(){
          toolFunc.decSize();
        };
        b.className = "button";
        b.innerHTML = "-";
        let inp = document.createElement("input");
        inp.oninput = function(){
          toolFunc.setSize(parseInt(this.value),this);
        };
        inp.className = "tool_size_inp";
        inp.type = "number";
        inp.min = "1";
        inp.value = v;
        let b1 = document.createElement("button");
        b1.onclick = function(){
          toolFunc.incSize();
        };
        b1.className = "button";
        b1.innerHTML = "+";
        d.appendChild(l);
        d.appendChild(b);
        d.appendChild(inp);
        d.appendChild(b1);
        td_d.appendChild(d);
      }
      break;
      case "fillMode":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (fill mode): Defines how confined the fill is.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.textContent = "Fill Mode: ";

        let b = createDropdown(dd.fillMode,[
          "Flood","Global"
        ],[
          "Fill Mode (flood): Pixels will keep filling from the cursor position until they hit a different pixel color.",
          "Fill Mode (global): All the pixels in the image with the same color as what you clicked on will be replaced with your palet color."
        ],function(i,d){
          toolSettings[curTool].fillMode = i;
        });

        d.appendChild(l);
        d.appendChild(b);
        td_d.appendChild(d);
      }
      break;
      case "fillMethod":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (fill method): Lets you choose which algorithm to use for flood fill.")
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.textContent = "Fill Method: ";

        let b = createDropdown(dd.fillMethod,[
          "Recursive",
          "Span"
        ],[
          "Fill Method (recursive): Safe and reliable, but very slow for large areas.",
          "Fill Method (span): Not safe and can break in certain situations, but very fast even for large areas."
        ],(i,d)=>{
          toolSettings[curTool].fillMethod = i;
        });
        d.appendChild(l);
        d.appendChild(b);
        td_d.appendChild(d);
      } break;
      case "drawMode":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (draw mode): Defines what is drawn: color, erase, or selection.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Draw Mode: ";

        let b = createDropdown(dd.drawMode,[
          "Color","Erase","Select"
        ],[
          "Draw Mode (color): to-do.",
          "Draw Mode (erase): to-do.",
          "Draw Mode (select): to-do."
        ],function(i,d){
          toolSettings[curTool].drawMode = i;
        });

        d.appendChild(l);
        d.appendChild(b);
        td_d.appendChild(d);
      }
      break;
      case "move_sx":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (sx): to-do.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Scale X: ";
        let b = document.createElement("button");
        b.onclick = function(){
          toolData[curTool].srx -= 0.1;
          inp.value = toolData[curTool].srx;
        };
        b.className = "button";
        b.innerHTML = "-";
        let inp = document.createElement("input");
        inp.oninput = function(){
          toolData[curTool].srx = parseFloat(this.value);
        };
        inp.id = "srx_inp";
        inp.type = "number";
        inp.min = "0";
        inp.step = "0.1";
        inp.value = toolData[curTool].srx;
        let b1 = document.createElement("button");
        b1.onclick = function(){
          toolData[curTool].srx += 0.1;
          inp.value = toolData[curTool].srx;
        };
        b1.className = "button";
        b1.innerHTML = "+";
        d.appendChild(l);
        d.appendChild(b);
        d.appendChild(inp);
        d.appendChild(b1);
        td_d.appendChild(d);
      } break;
      case "move_sy":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (sy): to-do.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Scale Y: ";
        let b = document.createElement("button");
        b.onclick = function(){
          toolData[curTool].sry -= 0.1;
          inp.value = toolData[curTool].sry;
        };
        b.className = "button";
        b.innerHTML = "-";
        let inp = document.createElement("input");
        inp.oninput = function(){
          toolData[curTool].sry = parseFloat(this.value);
        };
        inp.id = "sry_inp";
        inp.type = "number";
        inp.min = "0";
        inp.step = "0.1";
        inp.value = toolData[curTool].sry;
        let b1 = document.createElement("button");
        b1.onclick = function(){
          toolData[curTool].sry += 0.1;
          inp.value = toolData[curTool].sry;
        };
        b1.className = "button";
        b1.innerHTML = "+";
        d.appendChild(l);
        d.appendChild(b);
        d.appendChild(inp);
        d.appendChild(b1);
        td_d.appendChild(d);
      } break;
      case "transform":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (transform): to-do.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Use Transform: ";
        let b = document.createElement("input");
        b.type = "checkbox";
        b.checked = td.useTrans;
        b.style.marginTop = "2px";
        b.style.marginLeft = "0px";
        b.style.width = "16px";
        b.onclick = function(){
          toolData[curTool].useTrans = this.checked;
        };
        d.appendChild(l);
        d.appendChild(b);
        td_d.appendChild(d);
      } break;
      case "rotation":{
        let d = document.createElement("div");
        registerInfo(d,"Tool Setting (rotation): to-do.");
        let l = document.createElement("span");
        l.style.marginRight = "5px";
        l.innerHTML = "Rotation: ";
        let b = document.createElement("button");
        b.onclick = function(){
          toolData[curTool].rot -= 5*Math.PI/180;
          inp.value = Math.round(toolData[curTool].rot*180/Math.PI);
        };
        b.className = "button";
        b.innerHTML = "-";
        let inp = document.createElement("input");
        inp.oninput = function(){
          toolData[curTool].rot = parseFloat(this.value)*Math.PI/180;
        };
        inp.id = "rotation_inp";
        inp.type = "number";
        inp.step = "5";
        //inp.style.width = "40px";
        inp.value = toolData[curTool].rot*180/Math.PI;
        let b1 = document.createElement("button");
        b1.onclick = function(){
          toolData[curTool].rot += 5*Math.PI/180;
          inp.value = Math.round(toolData[curTool].rot*180/Math.PI);
        };
        b1.className = "button";
        b1.innerHTML = "+";
        d.appendChild(l);
        d.appendChild(b);
        d.appendChild(inp);
        d.appendChild(b1);
        td_d.appendChild(d);
      } break;
      case "mirrorX":{
        let d = document.createElement("div");
        d.style = "display:inline-flex;justify-content:space-between"; //align-items:center
        td_d.appendChild(d);
        d.innerHTML = `<span>Mirror X:</span><input type="checkbox" style="margin:-7px;margin-top:0px;height:15px">`;
        let cb = d.children[1];
        cb.onclick = function(){
          td.mirrorX = this.checked;
        };
        cb.checked = td.mirrorX;
      } break;
      case "mirrorY":{
        let d = document.createElement("div");
        d.style = "display:inline-flex;justify-content:space-between"; //align-items:center
        td_d.appendChild(d);
        d.innerHTML = `<span>Mirror Y:</span><input type="checkbox" style="margin:-7px;margin-top:0px;height:15px">`;
        let cb = d.children[1];
        cb.onclick = function(){
          td.mirrorY = this.checked;
        };
        cb.checked = td.mirrorY;
      } break;
      case "lineMirrorMode":{
        let d = document.createElement("div");
        d.style = "display:inline-flex;justify-content:space-between"; //align-items:center
        td_d.appendChild(d);
        d.innerHTML = `<span>Line Mirror Mode:</span><input type="checkbox" style="margin:-7px;margin-top:0px;height:15px">`;
        let cb = d.children[1];
        cb.onclick = function(){
          td.lineMirrorMode = this.checked;
        };
        cb.checked = td.lineMirrorMode;
      } break;
    }
  }
}
/**
 * 
 * @param {Armature} a 
 * @param {String} v 
 */
function updateAPoints(a,v){
  let l = document.getElementsByClassName("aPoint");
  for(const b of l) b.style.visibility = "hidden";
  if(!a) return;
  if(!a.ref) return;
  l = a.ref.getElementsByClassName("aPoint");
  for(const b of l) b.style.visibility = v;
}
function onStartTool(i){
  //td_d.innerHTML = "";
  switch(i){
    case Tools.arm:{
      // updateAPoints("unset");
    } break;
    case Tools.pan:
      back.style.cursor = "move";
    break;
    case Tools.move:
      let scaleR = document.getElementById("scaleR");
      let scaleL = document.getElementById("scaleL");
      let scaleU = document.getElementById("scaleU");
      let scaleD = document.getElementById("scaleD");
      if(!scaleR){
        scaleR = document.createElement("div");
        scaleR.id = "scaleR";
        scaleR.className = "handle";
        document.body.appendChild(scaleR);
      }
      if(!scaleL){
        scaleL = document.createElement("div");
        scaleL.id = "scaleL";
        scaleL.className = "handle";
        document.body.appendChild(scaleL);
      }
      if(!scaleU){
        scaleU = document.createElement("div");
        scaleU.id = "scaleU";
        scaleU.className = "handle";
        document.body.appendChild(scaleU);
      }
      if(!scaleD){
        scaleD = document.createElement("div");
        scaleD.id = "scaleD";
        scaleD.className = "handle";
        document.body.appendChild(scaleD);
      }
      break;
  }
  genToolSettings(i);
}
function onEndTool(i){
  switch(i){
    case Tools.pan:
      back.style.cursor = "unset";
    break;
    case Tools.arm:{
      // updateAPoints("hidden");
    } break;
  }
}
function setCurTool(i){
  onEndTool(curTool);
  curTool = i;
  onStartTool(i);
}
function selectTool(i){
  if(isToolLockingHist()) return;
  selTool = i;
  if(tempTool == -1) setCurTool(selTool);
  for(let j = 0; j < tools_d.children.length; j++){
    tools_d.children[j].className = "";
    if(j == i) tools_d.children[j].className = "sel";
  }
}
function startTempTool(i){
  if(i == selTool) return;
  tempTool = i;
  tools_d.children[i].className = "temp";
  setCurTool(tempTool);
}
function endTempTool(){
  if(tempTool == -1) return;
  tools_d.children[tempTool].className = "";
  tempTool = -1;
  setCurTool(selTool);
}
function tempSelTool(i){
  if(isToolLockingHist()) return;
  if(i == selTool) return;
  tempTool = i;
  tools_d.children[i].className = "temp";
}
function tempDeselTool(i){
  if(i == selTool) return;
  tools_d.children[i].className = "";
  tempTool = -1;
}
let tools_d = document.getElementById("tools");
for(let i = 0; i < tools_d.children.length; i++){
  tools_d.children[i].onclick = function(){
    selectTool(i);
  }
}
selectTool(selTool);
//

function drawImage_basic_rot(n,data,x=0,y=0,a=0,dep=0,srx=0,sry=0,drawMode=0){
  x = Math.floor(x);
  y = Math.floor(y);
  let w = data.w;
  let h = data.h;
  if(w == 0) return;
  if(h == 0) return;
  if(!data.data) return;
  if(data.data.length == 0) return;

  let srx2 = 1-srx;
  let sry2 = 1-sry;

  let ox = x+w*srx+0.5;
  let oy = y+h*sry+0.5;

  let lar = (Math.abs(w)>Math.abs(h)?w:h)*n.sqrt2;
  let larSx = (srx<0.5?srx2:srx);
  let larSy = (sry<0.5?sry2:sry);
  let larS = (Math.abs(larSx)>Math.abs(larSy)?larSx:larSy);
  let left = Math.floor(ox-lar*larS);
  let right = Math.floor(ox+lar*larS);
  let top = Math.floor(oy-lar*larS);
  let bottom = Math.floor(oy+lar*larS);

  //if(a < Math.PI/2 && a >= 0) left += w*(larSx-0.5)*2;
  //left += Math.floor((Math.cos(a-Math.PI/2)+0.5)*w*(larSx-0.5));
  for(let j = Math.max(top,0); j < Math.min(bottom,n.height); j++){
    for(let i = Math.max(left,0); i < Math.min(right,n.width); i++){
      //let li = i-ox;
      //let ji = j-oy;
      //let sx2 = sx;
      //let sy2 = sy;
      let fi = Math.floor(i);
      let fj = Math.floor(j);
      let ax = Math.round(Math.cos(a)*(fi-ox)-Math.sin(a)*(fj-oy)+ox-x);
      let ay = Math.round(Math.sin(a)*(fi-ox)+Math.cos(a)*(fj-oy)+oy-y);
      //this.setData(ind,[255,0,0,255]);
      if(ax < 0) continue;
      if(ay < 0) continue;
      if(ax >= w) continue;
      if(ay >= h) continue;
      let aInd = (ax+ay*w)*4;
      
      //aInd = ((i-left)+(j-top)*w)*4;
      //if(Math.floor(Math.floor(performance.now())%100) <= 20) console.log("draw: ",ax,ay);
      //this.drawPixel_ind(ind,255,0,0,255,false);
      if(data.data[aInd+3]){
        let ind = (i+j*n.width)*4;
        drawPixel_ind(n,ind,data.data[aInd],data.data[aInd+1],data.data[aInd+2],data.data[aInd+3],false,0,drawMode);
      }
    }
  }
}
var _warpScaleOff = [0,0];
function getWarpScaleOffset(){
  _warpScaleOff[0] = 0;
  _warpScaleOff[1] = 0;
  return _warpScaleOff;
  //
  let td = toolData[selTool];
  let offx = 0;
  let offy = 0;
  if(td.moveMode == 2){
    let dx = cx-scx;
    let dy = cy-scy;
    let lx = Math.cos(td.rot)*dx-Math.sin(td.rot)*dy;
    offx = Math.cos(td.rot)*lx/2;
    offy = -Math.sin(td.rot)*lx/2;
  }
  offx = Math.round(offx);
  offy = Math.round(offy);
  _warpScaleOff[0] = offx;
  _warpScaleOff[1] = offy;
  return _warpScaleOff;
}
function drawImageWarp(tn,tn2,td,n,isSelect=false){
  let mox = td.ox-0.5;
  let moy = td.oy-0.5;
  let offx = -mox*(td.srx*selBounds[2]-selBounds[2])-selBounds[2]*mox; //-selBounds[2]*mox
  let offy = -moy*(td.sry*selBounds[3]-selBounds[3])-selBounds[3]*moy;

  //let off = getWarpScaleOffset();
  //let offx = off[0];
  //let offy = off[1];
  let width = tn.width*td.srx;
  let height = tn.height*td.sry;
  let width2 = -tn2.width/2+tn.width/2;
  let height2 = -tn2.height/2+tn.height/2;
  let xx = offx+Math.round(td.tpx)+td.px+td.offx+td.left+width2;
  let yy = offy+Math.round(td.tpy)+td.py+td.offy+td.top+height2;
  tn2.drawImage_basic_scale(fromNob(tn),-width/2+tn2.width/2,-height/2+tn2.height/2,td.srx,td.sry);
  if(n) n.drawImage_basic_rot(fromNob(tn2),xx,yy,td.rot,0,td.ox,td.oy);
  else{
    drawImage_basic_rot(pNob,fromNob(tn2),xx,yy,td.rot,0,td.ox,td.oy,DrawMode.select);
  }
  if(isSelect){
    //let dx = width*(1-td.ox);
    //let dy = height*(1-td.oy);
    //let lx = Math.cos(td.rot)*dx;
    //let ly = -Math.sin(td.rot)*dy+Math.cos(td.rot)*dy;
    //let ly = 0;
    //let dx = 
    
    //selBounds[6] = (selBounds[0]+selBounds[2]/2+td.px+td.offx);//-Math.cos(td.rot)*(selBounds[2]/2));//(xx+tn2.width/2)-(td.ox*tn2.width)+(selBounds[2]*td.ox);//xx-width/2+tn2.width/2+lx;//xx+tn2.width/2;
    //selBounds[7] = (selBounds[1]+selBounds[3]/2+td.py+td.offy);//-Math.sin(td.rot)*(selBounds[3]/2));//(yy+tn2.height/2)+(td.oy*tn2.height);//yy-height/2+tn2.height/2+ly;//yy+tn2.height/2;
  }
}

var previewUpdateTimer = 0;

var clipboard = [new Map(),new Uint8ClampedArray(0),0];//new Uint8ClampedArray(nob.size);
function copySelection(){
  clipboard[0] = getMapOfSelection();
  clipboard[1] = cloneBuf(img.select2,nob.ssize);
  clipboard[2] = img.selCount;
  /*let i2 = 0;
  for(let i = 0; i < nob.size; i += 4){
    if(img.curLayer.nob.buf[i+3]) if(img.select2[Math.floor(i/4)]){
      clipboard[0][i] = img.curLayer.nob.buf[i];
      clipboard[0][i+1] = img.curLayer.nob.buf[i+1];
      clipboard[0][i+2] = img.curLayer.nob.buf[i+2];
      clipboard[0][i+3] = img.curLayer.nob.buf[i+3];
    }
    i2++;
  }
  return clipboard;*/
}

function getMapOfSelection(){
  let data = new Map();
  let n = img.curLayer.nob;
  let useAll = (img.selCount == 0);
  let len = img.selCount;
  let inc = 1;
  if(len == 0){
    len = nob.size;
    inc = 4;
  }
  let ind = 0;
  let ind2 = 0;
  for(let y = 0; y < project.h; y++) for(let x = 0; x < project.w; x++){
    if(img.select2[ind2]){
      let c = `[${n.buf[ind]},${n.buf[ind+1]},${n.buf[ind+2]},${n.buf[ind+3]}]`;
      let l = data.get(c);
      if(!data.has(c)){
        l = [];
        data.set(c,l);
      }
      l.push([x,y,ind]);
    }
    ind += 4;
    ind2++;
  }
  /*for(let i = 0; i < len; i += inc){
    let ind = (useAll?i:img.select[i]);
    let x = ind%(project.w*4)/4;
    let y = ind/(project.w*4);
    let c = `[${n.buf[ind]},${n.buf[ind+1]},${n.buf[ind+2]},${n.buf[ind+3]}]`;
    let l = data.get(c);
    if(!data.has(c)){
      l = [];
      data.set(c,l);
    }
    l.push([x,y,ind]);
  }*/
  return data;
}
var lastSelLen = 0;
var selBounds = [0,0,0,0,0,0,0,0];
function getSelBounds(){
  let left = project.w;
  let top = project.h;
  let right = 0;
  let bottom = 0;
  for(let i = 0; i < img.selCount; i++){
    let ind = img.select[i];
    let x = Math.floor(ind%(project.w*4)/4);
    let y = Math.floor(ind/(project.w*4));
    if(x < left) left = x;
    if(y < top) top = y;
    if(x > right) right = x;
    if(y > bottom) bottom = y;
  }
  let width = right-left+1;
  let height = bottom-top+1;
  return [left,top,width,height,right,bottom];
}
function calcSelBounds(){
  let left = project.w;
  let top = project.h;
  let right = 0;
  let bottom = 0;
  let i = 0;
  for(let y = 0; y < project.h; y++) for(let x = 0; x < project.w; x++){
    if(img.select2[i]){
      if(x < left) left = x;
      if(y < top) top = y;
      if(x > right) right = x;
      if(y > bottom) bottom = y;
    }
    i++;
  }
  let width = right-left+1;
  let height = bottom-top+1;
  let a = 0;
  let b = 0;
  if(selTool == Tools.move){
    let td = toolData[selTool];
    //let mox = td.ox-0.5;
    //let moy = td.oy-0.5;
    //let offx = -mox*(td.srx*selBounds[2]-selBounds[2])-selBounds[2]*mox/2; //-selBounds[2]*mox
    //let offy = -moy*(td.sry*selBounds[3]-selBounds[3])-selBounds[3]*moy/2;
    //let off = getWarpScaleOffset();
    //let offx = off[0];
    //let offy = off[1];
    //let tn2W = td.width*td.srx;
    //let tn2H = td.height*td.sry;
    //let width2 = -tn2W/2+td.width/2;
    //let height2 = -tn2H/2+td.height/2;
    //a = offx+Math.round(td.tpx)+td.px+td.offx+td.left+width2+tn2W/2;
    //b = offy+Math.round(td.tpy)+td.py+td.offy+td.top+height2+tn2H/2;
    a = (selBounds[0]+selBounds[2]/2+td.px+td.offx);
    b = (selBounds[1]+selBounds[3]/2+td.py+td.offy);
  }
  selBounds = [left,top,width,height,right,bottom,a,b];
}
function calcSRXY(x,y){
  if(x == null) x = cx;
  if(y == null) y = cy;
  let td = toolData[selTool];
  let dx = x-selBounds[4];
  let dy = y-(selBounds[1]+selBounds[3]/2);
  //let dist = Math.sqrt(dx*dx+dy*dy);
  let lx = Math.cos(td.rot)*dx-Math.sin(td.rot)*dy;//dx/Math.cos(td.rot);
  td.srx = (lx+selBounds[2])/selBounds[2];//(cx-(selBounds[0]+selBounds[2]/2))/(selBounds[2]/2)/2;
}
function calcSRXY2(){
  if(selTool != Tools.move) return;
  let td = toolData[selTool];
  let dx = cx-scx;
  let dy = cy-scy;
  let s1 = (0.5-Math.abs(0.5-td.ox));
  let s2 = (0.5-Math.abs(0.5-td.oy));
  if(td.handleI == 0) s1 = 1-s1;
  if(td.handleI == 2) s2 = 1-s2;
  if(td.handleI == 0 || td.handleI == 1) if(s1) dx /= s1;
  if(td.handleI == 2 || td.handleI == 3) if(s2) dy /= s2;
  let lx = Math.cos(td.rot)*dx-Math.sin(td.rot)*dy;
  let ly = -Math.cos(td.rot+Math.PI/2)*dx+Math.sin(td.rot+Math.PI/2)*dy;
  if(td.handleI == 0) td.srx = lx/selBounds[2]+td.s_srx;
  else if(td.handleI == 1) td.srx = -lx/selBounds[2]+td.s_srx;
  else if(td.handleI == 2) td.sry = ly/selBounds[3]+td.s_sry;
  else if(td.handleI == 3) td.sry = -ly/selBounds[3]+td.s_sry;
  document.getElementById("srx_inp").value = td.srx;
  document.getElementById("sry_inp").value = td.sry;
}
function runScaleDiv(scaleI,scaleR,td,visualOnly=false){
  if(!scaleR) return;
  if(!visualOnly){
    scaleR.i = scaleI;
    scaleR.onmousedown = function(e){
      if(e.button != 0) return;
      if(selTool == Tools.move){
        td.moveMode = 2;
        td.handleI = this.i;
        td.s_srx = td.srx;
        td.s_sry = td.sry;
        td.s_px = td.px;
        td.s_py = td.py;
        td.s_ox = td.ox;
        td.s_oy = td.oy;
        let d = 0;
        let amt = 0;
        let ax = 0;
        let ay = 0;
        if(true) switch(this.i){
          case 0:
            d = -td.ox;
            amt = d*selBounds[2]*td.srx;
            ax = Math.cos(td.rot)*amt;
            ay = -Math.sin(td.rot)*amt;
            td.ox = 0;
            break;
          case 1:
            d = 1-td.ox;
            amt = d*selBounds[2]*td.srx;
            ax = Math.cos(td.rot)*amt;
            ay = -Math.sin(td.rot)*amt;
            td.ox = 1;
            break;
          case 2:
            d = -td.oy;
            amt = d*selBounds[3]*td.sry;
            ay = Math.cos(td.rot)*amt;
            ax = Math.sin(td.rot)*amt;
            td.oy = 0;
            break;
          case 3:
            d = 1-td.oy;
            amt = d*selBounds[3]*td.sry;
            ay = Math.cos(td.rot)*amt;
            ax = Math.sin(td.rot)*amt;
            td.oy = 1;
            break;
        }
        td.px += ax;
        td.py += ay;
      }
    };
    scaleR.onmouseup = function(e){
      overCanvas = true;
      _mouseup(e.button);
    };
  }
  if(td.done != 0){
    if(td.moveMode == 2) calcSRXY2();
    switch(scaleI){
      case 0:
      case 1:{
        let cellSize = canvas.offsetWidth/project.w;
        scaleR.style.height = (cellSize*selBounds[3]*td.sry)+"px";
        scaleR.style.width = "15px";

        let sb = selBounds;  
        let mox = (td.ox-0.5);
        let moy = (td.oy-0.5);
        
        let offx = 0;
        let offy = 0;
        if(scaleI == 0){
          offx = -(td.srx*sb[2]*mox)*cellSize+sb[2]*td.srx*td.ox*cellSize - (mox*cellSize*sb[2]*td.srx);
          offy = -(moy*cellSize*sb[3]*td.sry);
        }
        else if(scaleI == 1){
          offx = (td.srx*sb[2]*mox)*cellSize-sb[2]*td.srx*td.ox*cellSize - (mox*cellSize*sb[2]*td.srx);
          offy = -(moy*cellSize*sb[3]*td.sry);
        }
        let rot = rot2D(offx,offy,0,0,-td.rot);

        scaleR.style.left = (canvas.offsetLeft+sb[6]*cellSize+rot[0])+"px";
        scaleR.style.top = (canvas.offsetTop+sb[7]*cellSize+rot[1])+"px";
        scaleR.style.transform = `
          rotate(-${(td.rot<0?(td.rot+6.28):td.rot)}rad) translate(-50%,-50%)
        `;
      } break;
      case 2:
      case 3:{
        let cellSize = canvas.offsetHeight/project.h;
        scaleR.style.width = (cellSize*selBounds[2]*td.srx)+"px";
        scaleR.style.height = "15px";

        let sb = selBounds;  
        let mox = (td.ox-0.5);
        let moy = (td.oy-0.5);
        
        let offx = 0;
        let offy = 0;
        if(scaleI == 2){
          offy = -(td.sry*sb[3]*moy)*cellSize+sb[3]*td.sry*td.oy*cellSize - (moy*cellSize*sb[3]*td.sry);
          offx = -(mox*cellSize*sb[2]*td.srx);
        }
        else if(scaleI == 3){
          offy = (td.sry*sb[3]*moy)*cellSize-sb[3]*td.sry*td.oy*cellSize - (moy*cellSize*sb[3]*td.sry);
          offx = -(mox*cellSize*sb[2]*td.srx);
        }
        let rot = rot2D(offx,offy,0,0,-td.rot);

        scaleR.style.left = (canvas.offsetLeft+sb[6]*cellSize+rot[0])+"px";
        scaleR.style.top = (canvas.offsetTop+sb[7]*cellSize+rot[1])+"px";
        scaleR.style.transform = `
          rotate(-${(td.rot<0?(td.rot+6.28):td.rot)}rad) translate(-50%,-50%)
        `;
      } break;
    }
    scaleR.style.visibility = "visible";
  }
}
let isExportingGif = false;
function exportAsGif(){
  preview.playing = true;
  preview.i = 0;
  isExportingGif = true;
  startRecording(preview.s);
  preview.s = 5;
}
let preview = {
  playing:false,
  i:0,
  s:5, //this will be scaled by 60 (a speed of 15 is 4 frames per second)
  run(){
    if(!this.playing) return;
    prevCan.width = img.w;
    prevCan.height = img.h;
    prevCan.style.aspectRatio = img.w/img.h;
    prevCtx.clearRect(0,0,img.w,img.h);
    let t = this;
    let frameI = Math.floor(t.i/60);
    let frame = project.frames[frameI];
    if(!frame){
      console.warn("There is no frame: ",frameI);
      return;
    }
    // let n = frame.curLayer.nob;
    for(let j = 0; j < frame.layers.length; j++){
      let layer = frame.layers[j];
      let tc = document.createElement("canvas");
      tc.width = frame.w;
      tc.height = frame.h;
      let tctx = tc.getContext("2d");
      tctx.putImageData(new ImageData(layer.nob.buf,frame.w,frame.h),0,0);
      prevCtx.drawImage(tc,0,0);
    }
    if(isExportingGif) capturer.capture(prevCan);
    // prevCtx.putImageData(new ImageData(n.buf,n.width,n.height),0,0);

    t.i += t.s;
    if(t.i >= project.frames.length*60){
      t.i = 0;
      if(isExportingGif){
        isExportingGif = false;
        capturer.stop();
        capturer.save(async function(blob){
          const newHandle = await window.showSaveFilePicker({
            types:[{
              description:"Gif",
              accept:{"image/gif":[".gif"]}
            }],
            suggestedName:project.name+".gif"
          });
        
          // create a FileSystemWritableFileStream to write to
          const writableStream = await newHandle.createWritable();
        
          // write our file
          await writableStream.write(blob);
        
          // close the file and write the contents to disk.
          await writableStream.close();
        });
        // capturer.save();
        // rec.stop();
      }
    }
  },
  cb_play:null,
  i_scale:null,
  i_speed:null,
  init(){
    let t = this;
    t.cb_play = document.getElementById("prev_play");
    t.i_scale = document.getElementById("prev_scale");
    t.i_speed = document.getElementById("prev_speed");
    t.cb_play.onclick = function(){
      t.toggle();
    };
    t.i_scale.oninput = function(){
      let rs = this.value*2+50;
      prevCan.style.width = rs*2+"px";
    };
    t.i_speed.oninput = function(){
      t.s = parseFloat(this.value);
      this.parentNode.children[1].textContent = t.s;
    };
    t.i_scale.oninput();
  },
  toggle(){
    let t = this;
    t.playing = !t.playing;
    t.cb_play.textContent = (t.playing?"pause":"play_arrow");
  }
};
preview.init();
var shiftX = 0;
var shiftY = 0;
function getCurFrame(){
  return project.frames[project.frameI];
}
function updateFramePreview(i,skip){
  let n = rasterizeFrame(i,skip);
  let c = frames_d.children[i].children[1].children[0];
  c.width = project.w/skip;
  c.height = project.h/skip;
  c.getContext("2d").putImageData(new ImageData(n.buf,project.w,project.h),0,0);
}

function update(){
  window.requestAnimationFrame(update);
  nob.pixelCount = 0;
  pNob.pixelCount = 0;
  nob.buf.fill(0);
  pNob.buf.fill(0);
  pNob.dep.fill(0);
  if(!img) return;
  for(let i = 0; i < img.layers.length; i++){
    let l = img.layers[i];
    //l.nob.pixelCount = 0;
    l.ind = i;
    //l.nob.buf = new Uint8ClampedArray(l.nob.size);
  }

  //PREVIEW CAN
  preview.run();

  //Update APoints
  if(img.curLayer.ops.obj && img.curLayer.visible) updateAPoints(img.curLayer.ops.obj,"unset");
  else updateAPoints(img.curLayer.ops.obj,"hidden");

  //RUN ARMS
  if(false) for(let i = 0; i < arms.length; i++){
    let a = arms[i];
    a.render();
  }
  if(false){
    let frame = getCurFrame();
    for(let i = 0; i < frame.arms.length; i++){
      let a = frame.arms[i];
      a.render();
    }
  }

  //DRAGGING
  if(dragLayer){
    dragLayer.style.position = "absolute";
    let ox = mx-smx;
    let oys = my-smy;
    let oy = oys-dragLayer.sScrollTop;
    dragLayer.style.marginLeft = ox+"px";
    dragLayer.style.marginTop = oy+"px";
    let h = 114;
    let lyf = (oys+layers_d.scrollTop-dragLayer.sScrollTop)/h;
    let ly = Math.round(lyf);
    let j = dragLayer.index;
    for(let i = 0; i < layers_d.children.length; i++){
      layers_d.children[i].classList.remove("prevT");
      layers_d.children[i].classList.remove("prevB");
      //if(layers_d.children[i] == dragLayer.parentNode) j = i;
    }
    let start = j;
    j += ly;
    if(lyf > 0){
      //lyf += 3;
      //ly += 3;
      j++;
    }
    if(j < 0) j = 0;
    else if(j >= layers_d.children.length) j = layers_d.children.length-1; 
    if(layers_d.children[j]){
      let l = layers_d.children[j];
      let end = j;
      if(lyf > 0) end--;
      if(j != dragLayer.index){
        if(Math.round(lyf) == Math.floor(lyf)){
          top = true;
          l.classList.add("prevB");
          end++;
        }
        else{
          l.classList.add("prevT");
          //if(lyf < 0) end++;
        }
      }
      dragLayer.start = layers_d.children.length-1-start;
      dragLayer.end = layers_d.children.length-1-end;
    }
  }
  //

  //SELECT DEP
  if(img.selCount != 0) for(let i = 0; i < nob.ssize; i++){
    if(img.curLayer.nob.dep){
      img.curLayer.nob.dep[i] = 255;
      if(img.select2[i]) img.curLayer.nob.dep[i] = 0;
    }
  }

  /*if(img.selCount != 0){
    for(let i = 0; i < nob.ssize; i++) img.curLayer.nob.dep[i] = 255;
  }
  for(let i = 0; i < img.selCount; i++){
    let ind = img.select[i];
    img.curLayer.nob.dep[Math.floor(ind/4)] = 0;
  }*/

  if(selTool == Tools.move){
    let td = toolData[Tools.move];
    if(td.moveMode == 2) if(td.handleI == 0){
      if(td.req){
        let d = -td.ox;
        let amt = d*selBounds[2]*td.srx;
        td.px += amt;
        td.ox = 0;
        scaleR.style.display = "none";
        td.req = false;
      }
      /*window.requestAnimationFrame(function(){
        td.ox = 0;
      });*/
    }
  }

  var td = null;
  var ts = toolSettings[curTool];
  // document.body.style.cursor = "unset"; ()()()
  if(!uniDrag) if(overCanvas || img.curLayer.nob.pixelCount > 0) if(!dragging) if(img.curLayer) switch(curTool){
    case Tools.bezier:{
      pNob.drawLine_smart(lcx,lcy,cx,cy,getCol(mouseDown[2]?2:0,true,true),ts.size);
      if(gbez){
        drawBezier(pNob,gbez,0,0,1);
      }
      if(mouseDown[0]){
        let p = gbez.c[gbez.c.length-1];
        p[2] = cx;
        p[3] = cy;
      }
    } break;
    case Tools.pencil:
    case Tools.eraser:
    {
      let cc = getCurTool();
      let op = !cc.lineMirrorMode;
      function mirrorPos(nob,mode,prev,...ar){
        if(mode == 1 || mode == 3){
          ar[0] = img.w-ar[0];
          if(op) ar[2] = img.w-ar[2];
        }
        if(mode == 2 || mode == 3){
          ar[1] = img.w-ar[1];
          if(op) ar[3] = img.w-ar[3];
        }
        if(prev || ar[4][0] == -1) nob.drawLine_smart(...ar);
        else nob.drawLine_smart_dep(...ar);
      }
      function drawMirror(nob,prev,...ar){
        mirrorPos(nob,0,prev,...ar);
        if(cc.mirrorX) mirrorPos(nob,1,prev,...ar);
        if(cc.mirrorY) mirrorPos(nob,2,prev,...ar);
        if(cc.mirrorX && cc.mirrorY) mirrorPos(nob,3,prev,...ar);
      }
      drawMirror(pNob,true,lcx,lcy,cx,cy,getCol(mouseDown[2]?2:0,true,true),ts.size);
      // pNob.drawLine_smart(lcx,lcy,cx,cy,getCol(mouseDown[2]?2:0,true,true),ts.size);
      
      if(mouseDown[0] || mouseDown[2]){
        let c = getCol(mouseDown[0]?0:2);
        drawMirror(img.curLayer.nob,false,lcx,lcy,cx,cy,c,ts.size,1);
      }
    } break;
    case Tools.line:
      if(mouseDown[0] || mouseDown[2]){
        //let c = color[0];
        //if(mouseDown[2]) c = color[1];
        let c = getCol(mouseDown[0]?0:2,true);
        let tx = cx;
        let ty = cy;
        if(keys.shift){
          let dx = Math.abs(cx-scx);
          let dy = Math.abs(cy-scy);
          if(dy >= dx) tx = scx;
          else ty = scy;
        }
        pNob.drawLine_smart(scx,scy,tx,ty,c,ts.size);
      }
      else pNob.drawLine_smart(lcx,lcy,cx,cy,red,ts.size);
    break;
    case Tools.rectSelect:
      pNob.setPixel(cx,cy,gray);
    break;
    case Tools.moveSelect:
      td = toolData[curTool];
      if(mouseDown[0]){
        td.offx = Math.floor(cx-scx);
        td.offy = Math.floor(cy-scy);
      }
    break;
    case Tools.move:
      td = toolData[curTool];
      if(td.moveMode != 2) if(mouseDown[0]){
        td.offx = Math.floor(cx-scx);
        td.offy = Math.floor(cy-scy);
      }
      let celSizeX = canvas.offsetWidth/project.w;
      let celSizeY = canvas.offsetHeight/project.h;
      let x = canvas.offsetLeft+cx*celSizeX;
      let y = canvas.offsetTop+cy*celSizeY;
      let left = canvas.offsetLeft+selBounds[0]*celSizeX;
      let top = canvas.offsetTop+selBounds[1]*celSizeY;
      let right = canvas.offsetLeft+(selBounds[4]+1)*celSizeX;
      let bottom = canvas.offsetTop+(selBounds[5]+1)*celSizeY;
      let r = 10;
      //let m = Math.tan(td.rot+Math.PI/2);
      /*if(y >= top && y < bottom){
        if(x >= right-r && x <= right+r){
          console.log("RIGHT EDGE");
          
        }
      }*/
      //pNob.drawLine_smart(selBounds[4]+1,selBounds[1],selBounds[4]+1,selBounds[5]+1,red,1);
      /*let x = Math.floor(cx);
      let y = Math.floor(cy);
      let ind = (x+y*project.w)*4;
      if(x-1 >= 0) if(img.select.includes(ind-4) && !img.select.includes(ind)){
        console.log("RIGHT EDGE");
      }*/
    break;
    case Tools.velPencil:{
      d = toolData[curTool];
      if(keys.q){
        d.list = [];
        //d.x = cx;
        //d.y = cy;
        //d.lx = cx;
        //d.ly = cy;
      }
      let vx = cx-lcx;
      let vy = cy-lcy;
      let list = d.list;
      //d.vx += vx/4;
      //d.vy += vy/4;
      let last = list[list.length-1];
      if(last){
        if(!(Math.floor(last[0]) == Math.floor(cx) && Math.floor(last[1]) == Math.floor(cy))) list.push([cx,cy,vx,vy]);
      }
      else list.push([cx,cy,vx,vy]);
      for(let i = 0; i < 1; i++) if(list[0]){
        d.lx = d.x;
        d.ly = d.y;
        let dx = d.x-list[0][0];
        let dy = d.y-list[0][1];
        let dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 3){
          list.splice(0,1);
          continue;
        } 
        //d.x -= dx/dist;
        //d.y -= dy/dist;
        list[0][2] = 0;
        list[0][3] = 0;
        list[0][2] -= dx/dist/2;//dx/80;
        list[0][3] -= dy/dist/2//dy/80;
        let max = 2;
        if(list[0][2] > max) list[0][2] = max;
        else if(list[0][2] < -max) list[0][2] = -max;
        if(list[0][3] > max) list[0][3] = max;
        else if(list[0][3] < -max) list[0][3] = -max;
        let drag = 0;
        if(list[0][2] >= drag) list[0][2] -= drag;
        else if(list[0][2] <= -drag) list[0][2] += drag;
        else list[0][2] = 0;
        if(list[0][3] >= drag) list[0][3] -= drag;
        else if(list[0][3] <= -drag) list[0][3] += drag;
        else list[0][3] = 0;
        d.x += list[0][2];
        d.y += list[0][3];
        pNob.drawLine_smart(d.lx,d.ly,d.x,d.y,red,1);     
        if(mouseDown[0] || mouseDown[2]){
          //let c = color[0];
          //if(mouseDown[2]) c = color[1];
          //if(keys.alt) c = [0,0,0,0];
          let c = getCol(mouseDown[0]?0:2);
          nob.drawLine_smart(d.lx,d.ly,d.x,d.y,c,1);
        } 
      }
    }
    break;
    case -1:
      let max = 60;
      let scale = 20;
      switch(-1){
        case 0: //Zigzag trees
          max = 10;
          scale = 20;
        break;
        case 1:
          max = 30; //Geodes
          scale = 20;
        break;
      }
      let d = toolData[curTool];
      let dx = d.x-cx;
      let dy = d.y-cy;
      let dist = Math.sqrt(dx*dx+dy*dy);
      //d.vx -= dx/dist*scale;
      //d.vy -= dy/dist*scale;
      d.vx -= dx/10;
      d.vy -= dy/10;
      if(d.vx > max) d.vx = max;
      else if(d.vx < -max) d.vx = -max;
      if(d.vy > max) d.vy = max;
      else if(d.vy < -max) d.vy = -max;
      d.lx = d.x;
      d.ly = d.y;
      //d.x -= dx/10;//d.vx;
      //d.y -= dy/10;//d.vy;
      d.x += d.vx;
      d.y += d.vy;
      pNob.drawLine_smart(d.lx,d.ly,d.x,d.y,red,1);
      if(mouseDown[0] || mouseDown[2]){
        let c = color[0];
        if(mouseDown[2]) c = color[1];
        if(keys.alt) c = [0,0,0,0];
        nob.drawLine_smart(d.lx,d.ly,d.x,d.y,c,1);
      }
    break;
    case Tools.eyeDropper:
      let c = [0,0,0,210];
      //pNob.setPixel(cx,cy,c);
      pNob.setPixel(cx-1,cy,c);
      pNob.setPixel(cx+1,cy,c);
      pNob.setPixel(cx,cy-1,c);
      pNob.setPixel(cx,cy+1,c);
    break;
    case Tools.fill:
      pNob.drawPixel(cx,cy,red);
    break;
  }
  if(toolData[Tools.move].done != 0){
    let td = toolData[Tools.move];
    switch(td.moveMode){
      case 1:
        //td.s_px = cx-td.s_sx;
        //td.s_py = cy-selBounds[1];
        break;
    }
    ctx.canvas.width = td.width;
    ctx.canvas.height = td.height;
    let tn = new NobsinCtx(ctx);
    ctx.canvas.width = td.width*td.srx;
    ctx.canvas.height = td.height*td.sry;
    let tn2 = new NobsinCtx(ctx);
    ctx.canvas.width = project.w;
    ctx.canvas.height = project.h;
    if(td.done == 1){
      tn.buf = new Uint8ClampedArray(tn.size);
      tn2.buf = new Uint8ClampedArray(tn2.size);
      tn2.dep = new Uint8ClampedArray(tn2.ssize);
      let l = td.data;
      for(const [cstr,list] of l){
        let c = JSON.parse(cstr);
        for(let i = 0; i < list.length; i++){
          let p = list[i];
          let x = p[0];
          let y = p[1];
          //tn.setData(p[2],c);
          tn.setPixel(x,y,c);
        }
      }
      drawImageWarp(tn,tn2,td,pNob);
    }
     //to-do - make handles and warping and just fix this
    /*if(td.done == 1){
      let l = td.data;
      for(const [cstr,list] of l){
        let c = JSON.parse(cstr);
        for(let i = 0; i < list.length; i++){
          let p = list[i];
          let x = p[0]+td.px+td.offx;
          let y = p[1]+td.py+td.offy;
          pNob.setPixel(x,y,c);
        }
      }
    }*/
  }
  if(selTool == Tools.move){
    let td = toolData[selTool];
    let scaleR = document.getElementById("scaleR");
    let scaleL = document.getElementById("scaleL");
    let scaleU = document.getElementById("scaleU");
    let scaleD = document.getElementById("scaleD");
    selBounds[6] = (selBounds[0]+selBounds[2]/2+td.px+td.offx);
    selBounds[7] = (selBounds[1]+selBounds[3]/2+td.py+td.offy);
    if(td.useTrans){
      runScaleDiv(0,scaleR,td);
      runScaleDiv(1,scaleL,td);
      runScaleDiv(2,scaleU,td);
      runScaleDiv(3,scaleD,td);
    }
    else{
      scaleR.style.visibility = "hidden";
      scaleL.style.visibility = "hidden";
      scaleU.style.visibility = "hidden";
      scaleD.style.visibility = "hidden";
    }
  }
  if(toolData[Tools.rectSelect].drawn != 0){
    let td = toolData[curTool];
    if(td.drawn == 2){
      if(mouseDown[0]){
        td.offx = Math.floor(cx-scx);
        td.offy = Math.floor(cy-scy);
      }
      pNob.drawRect(td.sx+td.offx,td.sy+td.offy,td.w,td.h,gray);
    }
    else if(td.drawn == 1){
      td.w = Math.floor(cx-td.sx)+(cx>=td.sx?1:0);
      td.h = Math.floor(cy-td.sy)+(cy>=td.sy?1:0);
      let x0 = td.sx;
      let y0 = td.sy;
      if(td.w < 0){
        x0 += td.w;
        //td.w = Math.abs(td.w);
      }
      if(td.h < 0){
        y0 += td.h;
        //td.h = Math.abs(td.h);
      }
      let w = Math.abs(td.w);
      let h = Math.abs(td.h);
      if(td.w < 0) w++;
      if(td.h < 0) h++;
      pNob.drawRect(x0,y0,w,h,prevSelect);
    }
  }

  if(project.onionSkin){
    let a = Math.pow(Math.sin(performance.now()/300),2)/4+0.35;
    if(project.frames[project.frameI-1]){
      let d = rasterizeFrame(project.frameI-1);
      nob.drawImage_basic_tint2(fromNob(d),0,0,[0,0,80,0],[1,1,5,a]);
    }
    if(project.frames[project.frameI+1]){
      let d = rasterizeFrame(project.frameI+1);
      nob.drawImage_basic_tint2(fromNob(d),0,0,[0,80,0,0],[1,5,1,a]);
    }
  }
  //layers
  for(let i = 0; i < img.layers.length; i++){
    if(!layers_d.children[i]) continue;
    let l = img.layers[i];

    let i2 = img.layers.length-i-1;
    let c = layers_d.children[i2].children[1].children[1];
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;
    let skip = 1;
    if(project.w > 128 || project.h > 128) skip = Math.ceil(Math.max(project.w,project.h)/128);
    pCtx.canvas.width /= skip;
    pCtx.canvas.height /= skip;
    let n = new NobsinCtx(pCtx);
    n.buf = new Uint8ClampedArray(n.size);
    let lr = rasterizeLayer(l);
    n.drawImage_basic_skip(lr,0,0,skip);
    c.width = pCtx.canvas.width;
    c.height = pCtx.canvas.height;
    if(c.width > c.height){
      c.style.width = "80px";
      c.style.height = "unset";
    }
    else if(c.width < c.height){
      c.style.width = "unset";
      c.style.height = "80px";
    }
    c.getContext("2d").putImageData(new ImageData(n.buf,n.width,n.height),0,0);
    pCtx.canvas.width = w;
    pCtx.canvas.height = h;

    if(l.visible) nob.drawImage_basic(lr,0,0);
  }
  if(previewUpdateTimer == 0){
    //frames
    let skip = 1;
    if(project.w > 128 || project.h > 128) skip = Math.ceil(Math.max(project.w,project.h)/128);
    //for(let i = 0; i < project.frames.length; i++){
      let i = project.frameI;
      //let f = project.frames[i];
      updateFramePreview(i,skip);
    //}
  }
  previewUpdateTimer++;
  if(previewUpdateTimer > 30) previewUpdateTimer = 0;

  if(!td) td = toolData[curTool];
  //LOOPING DEBUG
  if(curTool == Tools.move){
    //td.rot = performance.now()/300;
  }
  //
  //selection
  selColor[3] = Math.pow(Math.sin(performance.now()/300),2)*63+63;
  if(true){ //selTimer<50
    let isOff = false;
    let d = toolData[curTool];
    if(curTool == Tools.moveSelect || toolData[Tools.move].done != 0) isOff = true;
    let offx = 0;
    let offy = 0;
    if(curTool == Tools.moveSelect){
      d = toolData[Tools.moveSelect];
      offx = d.offx;
      offy = d.offy;
    }
    else if(toolData[Tools.move].done != 0){
      d = toolData[Tools.move];
      offx = d.px+d.offx;
      offy = d.py+d.offy;
    }
    let _tn;
    let _tn2;
    if(curTool == Tools.move){
      ctx.canvas.width = d.width;
      ctx.canvas.height = d.height;
      _tn = new NobsinCtx(ctx);
      ctx.canvas.width = d.width*d.srx;
      ctx.canvas.height = d.height*d.sry;
      _tn2 = new NobsinCtx(ctx);
      ctx.canvas.width = project.w;
      ctx.canvas.height = project.h;
      _tn.buf = new Uint8ClampedArray(_tn.size);
      _tn2.buf = new Uint8ClampedArray(_tn2.size);
      _tn2.dep = new Uint8ClampedArray(_tn2.ssize);
    }
    if(img.selCount != 0) for(let i = 0; i < nob.ssize; i++){
      if(img.select2[i]){
        let ind = i*4;
        let xx = 0;
        let yy = 0;
        if(isOff){
          xx = ind%(project.w*4);
          yy = ind/(project.w*4);
          if(curTool == Tools.move){
            xx /= 4;
            xx -= d.left;
            yy -= d.top;
            _tn.setPixel(xx,yy,selColor);
            continue;
          }
        }
        let off = 0;
        if(isOff){
          if(xx+offx*4 < 0) continue;
          else if(yy+offy < 0) continue;
          else if(xx+offx*4 >= project.w*4) continue;
          else if(yy+offy >= project.h) continue;
          off += offx*4;
          off += offy*4*project.w;
          //selTimer = -1;
        }
        ind += off;
        pNob.drawPixel_ind(ind,selColor[0],selColor[1],selColor[2],selColor[3]);
      }
    }
    if(false) for(let i = 0; i < img.selCount; i++){
      let ind = img.select[i];
      let xx = 0;
      let yy = 0;
      if(isOff){
        xx = ind%(project.w*4);
        yy = ind/(project.w*4);
        if(curTool == Tools.move){
          xx /= 4;
          xx -= d.left;
          yy -= d.top;
          _tn.setPixel(xx,yy,selColor);
          continue;
        }
      }
      let off = 0;
      if(isOff){
        if(xx+offx*4 < 0) continue;
        else if(yy+offy < 0) continue;
        else if(xx+offx*4 >= project.w*4) continue;
        else if(yy+offy >= project.h) continue;
        off += offx*4;
        off += offy*4*project.w;
        //selTimer = -1;
      }
      ind += off;
      pNob.drawPixel_ind(ind,selColor[0],selColor[1],selColor[2],selColor[3]);
    }
    if(curTool == Tools.move && d.done != 0){
      drawImageWarp(_tn,_tn2,d,pNob,true);
      //_tn2.drawImage_warp(fromNob(_tn),_tn2.width/2,_tn2.height/2,d.sx,d.sy,d.rot,0,0);
      //pNob.drawImage_basic(fromNob(_tn2),d.px+d.offx+d.centerX-Math.floor(_tn2.width/2),d.py+d.offy+d.centerY-Math.floor(_tn2.height/2));
    }
  }
  selTimer++;
  if(selTimer > 60) selTimer = 0;

  //Tests for preview
  //drawBezier(pNob,bez,0,0);
  //

  ctx.putImageData(new ImageData(nob.buf,nob.width,nob.height),0,0);
  pCtx.putImageData(new ImageData(pNob.buf,pNob.width,pNob.height),0,0);
}
var bez = nobCreateBezier([
  [80,20],
  [30,70],
  [380,30],
  [90,-60],
  [120,40],
  [160,60],
  [120,90]
],1,black);
var selColor = [100,80,255,100];
var selTimer = 0;
var globalRot = 0;
var globalOX = 0.5;
var globalOY = 0.5;

let scroll_horz = document.getElementById("scroll-horz");

function setZoom(a){
  zoom = a;
  canvas.style.width = (project.w*a)+"px";
  canvas.style.height = (project.h*a)+"px";
  //setPan(pan[0],pan[1]);
}
function setPan(x,y){
  pan[0] = x;
  pan[1] = y;
  canvas.style.marginLeft = (window.innerWidth/2+pan[0])+"px";
  canvas.style.marginTop = (window.innerHeight/2+pan[1])+"px";
  //can.style.marginLeft = (window.innerWidth/2+pan[0]-(100*zoom*scaleX))+"px";
  //can.style.marginTop = (window.innerHeight/2+pan[1]-(100*zoom*scaleY))+"px";

  arms_d.style.width = canvas.style.width;
  arms_d.style.height = canvas.style.height;
  arms_d.style.left = canvas.style.marginLeft;
  arms_d.style.top = canvas.style.marginTop;

  //()()()
  if(false){
    let w1 = can.parentNode.getBoundingClientRect().width;
    let w2 = can.parentNode.parentNode.getBoundingClientRect().width;
    let rat = w1/w2;
    scroll_horz.style.width = (w1/w2*100)+"%";
    let r = can.parentNode.getBoundingClientRect();
    let r1 = can.parentNode.parentNode.getBoundingClientRect();
    let l = r.left;
    let l1 = r1.left;
    let w3 = scroll_horz.parentNode.getBoundingClientRect().width-32;
    let scrollW = scroll_horz.getBoundingClientRect().width-rat*w3/2;
    let rr = (l1-l)/r1.width*scrollW;
    console.log(rr);
    scroll_horz.parentNode.scrollTo(rr,0);
    // scroll_horz.parentNode.scrollTo(0.5*scrollW,
  }
}

var zoomSpeed = 1.1;//1.04;
var zoom = 1;
var pan = [0,0];
var scaleX = 0.5;
var scaleY = 0.5;
setZoom(zoom);
setPan(pan[0],pan[1]);
function runZoom(dir){
  if(!overCanvas) return;
  let lastX = canvas.offsetLeft+project.w*zoom;
  let lastY = canvas.offsetTop+project.h*zoom;
  if(dir < 0) zoom *= zoomSpeed*Math.abs(dir);
  else zoom /= zoomSpeed*Math.abs(dir);
  setZoom(zoom);
  let offX = lastX-(canvas.offsetLeft+project.w*zoom);
  let offY = lastY-(canvas.offsetTop+project.h*zoom);
  pan[0] += offX*scaleX;
  pan[1] += offY*scaleY;
  setPan(pan[0],pan[1]);
}
function onwheel(e){
  let v = e.deltaY < 0 ? -1 : 1;
  if(e.shiftKey) setPan(pan[0]-e.deltaY*0.3,pan[1]);
  else if(e.altKey) setPan(pan[0],pan[1]-e.deltaY*0.3);
  else runZoom(v);
}
document.onwheel = function(e){
  onwheel(e);
};

var cx = 0;
var cy = 0;
var lcx = 0;
var lcy = 0;
var scx = 0;
var scy = 0;
var ecx = 0;
var ecy = 0;
var smx = 0;
var smy = 0;
var mouseDown = [false,false,false];
var keys = {};
function resetTool(i){
  let td = toolData[i];
  switch(i){
    case Tools.rectSelect:
      td.sx = 0;
      td.sy = 0;
      td.w = 0;
      td.h = 0;
      td.offx = 0;
      td.offy = 0;
      td.drawn = 0;
      unlockHist();
    break;
    case Tools.moveSelect:
      td.sx = 0;
      td.sy = 0;
      td.offx = 0;
      td.offy = 0;
    break;
    case Tools.move:
      let l = td.data;
      if(!td.fromCP) if(l) for(const [cstr,list] of l){
        let c = JSON.parse(cstr);
        for(let i = 0; i < list.length; i++){
          let p = list[i];
          let x = p[0];
          let y = p[1];
          img.curLayer.nob.drawPixel(x+td.left,y+td.top,c);
        }
      }
      if(td.fromCP) if(td.lastSel2){
        img.select2 = td.lastSel2;
        img.selCount = td.lastSelCount;
      }
      //if(td.fromCP) img.select = [];
      td.sx = 0;
      td.sy = 0;
      td.srx = 1;
      td.sry = 1;
      td.offx = 0;
      td.offy = 0;
      td.data = null;
      td.done = 0;
      td.px = 0;
      td.py = 0;
      td.tpx = 0;
      td.tpy = 0;
      td.fromCP = false;
      img.curLayer.nob.pixelCount = 0;
      scaleR.style.visibility = "hidden";
      scaleL.style.visibility = "hidden";
      scaleU.style.visibility = "hidden";
      scaleD.style.visibility = "hidden";
      document.getElementById("rotation_inp").value = 0;
      document.getElementById("srx_inp").value = 1;
      document.getElementById("sry_inp").value = 1;
      unlockHist();
    break;
  }
}
function addToSelect(ind,x,y,remove=false){
  if(x < 0) return;
  if(y < 0) return;
  if(x >= project.w) return;
  if(y >= project.h) return;
  let ii = Math.floor(ind/4);
  if(remove){
    if(img.select2[ii]){
      img.select2[ii] = 0;
      img.selCount--;
    }
    //let i = img.select.indexOf(ind);
    //if(i != -1) img.select.splice(i,1);
  }
  else if(!img.select2[ii]){
    img.select2[ii] = 1;
    img.selCount++;
  }
  //else if(!img.select.includes(ind)) img.select.push(ind);
}
function cloneMap(map){
  let m = new Map();
  for(const [k,v] of map){
    m.set(k,deepClone(v));
  }
  return m;
}
function addPixelToMap(m,ind,c){
  let l = m.get(c);
  if(!l){
    l = [];
    m.set(c,l);
  }
  l.push(ind);
}
function XYToInd(x,y){
  if(x < 0) return -1;
  if(y < 0) return -1;
  if(x >= project.w) return -1;
  if(y >= project.h) return -1;
  return (x+y*project.w)*4;
}
function translateSelection(xx,yy){
  xx = Math.floor(xx);
  yy = Math.floor(yy);
  let ind = 0;
  let n = new Uint8ClampedArray(nob.ssize);
  let nc = 0;
  for(let j = 0; j < project.h; j++) for(let i = 0; i < project.w; i++){
    if(img.select2[ind]){
      let x = xx+i;
      let y = yy+j;
      let ind2 = x+y*project.w;
      n[ind2] = 1;
      nc++;
    }
    ind++;
  }
  img.select2 = cloneBuf(n,nob.ssize);
  img.selCount = nc;
  selTimer = 0;
  _histAdd(HistIds.select,{
    a:cloneBuf(img.select2,nob.ssize),
    c:img.selCount
  });
}
function translateSelection_old(x,y){
  for(let i = 0; i < img.selCount; i++){
    let ind = img.select[i];
    let xx = ind%(project.w*4);
    let yy = ind/(project.w*4);
    let off = 0;
    let pass = true;
    if(xx+x*4 < 0) pass = false;
    else if(yy+y < 0) pass = false;
    else if(xx+x*4 >= project.w*4) pass = false;
    else if(yy+y >= project.h) pass = false;
    if(!pass){
      img.select.splice(i,1);
      i--;
      continue;
    }
    off += x*4;
    off += y*4*project.w;
    img.select[i] += off;
  }
}
function confirmTool(i){
  let td = toolData[i];
  switch(i){
    case Tools.bezier:{
      drawBezier(img.curLayer.nob,gbez,0,0);
      gbez = null;
    } break;
    case Tools.rectSelect:{
      if(td.w < 0){
        td.sx += td.w;
        td.w = Math.abs(td.w)+1;
      }
      if(td.h < 0){
        td.sy += td.h;
        td.h = Math.abs(td.h)+1;
      }
      if(td.w != 0 && td.h != 0){
        let ind = Math.floor((td.sx+td.sy*project.w))*4;
        let len = img.selCount;
        for(let y = 0; y < td.h; y++){
          for(let x = 0; x < td.w; x++){
            addToSelect(ind,td.sx+x,td.sy+y,keys.alt);
            ind += 4;
          }
          ind += project.w*4;
          ind -= td.w*4;
        }
        selTimer = 0;
        resetTool(i);
        if(len != img.selCount) _histAdd(HistIds.select,{
          a:cloneBuf(img.select2,nob.ssize),
          c:img.selCount
        });
      }
      else resetTool(i);
    }
    break;
    case Tools.move:
      if(td.done == 1){
        ctx.canvas.width = td.width;
        ctx.canvas.height = td.height;
        let tn = new NobsinCtx(ctx);
        ctx.canvas.width = td.width*td.srx;
        ctx.canvas.height = td.height*td.sry;
        let tn2 = new NobsinCtx(ctx);
        ctx.canvas.width = project.w;
        ctx.canvas.height = project.h;
        tn.buf = new Uint8ClampedArray(tn.size);
        tn2.buf = new Uint8ClampedArray(tn2.size);
        tn2.dep = new Uint8ClampedArray(tn2.ssize);
        let l = td.data;
        for(const [cstr,list] of l){
          let c = JSON.parse(cstr);
          for(let i = 0; i < list.length; i++){
            let p = list[i];
            let x = p[0];
            let y = p[1];
            tn.setPixel(x,y,c);
          }
        }
        drawImageWarp(tn,tn2,td,img.curLayer.nob);

        tn.buf = new Uint8ClampedArray(tn.size);
        tn2.buf = new Uint8ClampedArray(tn2.size);
        tn2.dep = new Uint8ClampedArray(tn2.ssize);
        let i1 = 0;
        for(let y = 0; y < project.h; y++) for(let x = 0; x < project.w; x++){
          if(img.select2[i1]){
            tn.setPixel(x-td.left,y-td.top,red);
          }
          i1++;
        }
        img.select2 = new Uint8ClampedArray(nob.ssize);
        img.selCount = 0;
        drawImageWarp(tn,tn2,td,null,true);

        td.data = null;
        td.lastSel2 = null;
        td.lastSelCount = null;
        resetTool(i);
        calcSelBounds();
        _histAdd(HistIds.full,null,"Move pixels");
      }
    break;
  }
}
//FILE SYSTEM API TESTING
const pickerOpts = {
  types: [
    {
      description: 'Text Docs',
      accept: 'text/plain'
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};

async function fs_getTheFile(call) {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  // get file contents
  const fileData = await fileHandle.getFile();
  fileData.text().then(e=>{
    call(e);
  });
}
async function fs_saveFile(blob) {

  // create a new handle
  const newHandle = await window.showSaveFilePicker({
    types:[{
      description:"Nobsin Graphic",
      accept:{"image/nbg":[".nbg"]}
    }],
    suggestedName:project.name+".nbg"
  });

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(blob);

  // close the file and write the contents to disk.
  await writableStream.close();
}
//
const editFunc = {
  selectAll:function(){
    if(!isToolLockingHist()) if(img.selCount < nob.ssize){
      img.select2 = new Uint8ClampedArray(nob.ssize);
      img.selCount = nob.ssize;
      for(let i = 0; i < nob.ssize; i++){
        img.select2[i] = 1;
      }
      _histAdd(HistIds.select,{
        a:cloneBuf(img.select2,nob.ssize),
        c:img.selCount
      },"Select all");
    }
  },
  deselect:function(){
    if(!isToolLockingHist()) if(img.selCount > 0){
      //img.select = [];
      img.select2 = new Uint8ClampedArray(nob.ssize);
      img.selCount = 0;
      _histAdd(HistIds.deselect);
    }
  },
  paste:function(){
    selectTool(Tools.move);
    resetTool();
    let td = toolData[curTool];
    //td.data = cloneMap(clipboard);
    //td.done = 1;
    //td.data = cloneMap(clipboard);
    //td.done = 1;
    //img.select = [];
    //img.select2 = new Uint8ClampedArray(nob.ssize);
    //img.selCount = 0;
    /*let i2 = 0;
    for(let i = 0; i < nob.size; i += 4){
      if(clipboard[i+3]) img.select2[i2] = 1;
      i2++;
    }*/
    /*for(const [cstr,list] of td.data){
    for(let i = 0; i < list.length; i++){
        img.select2[Math.floor(list[i][2]/4)] = 1;
      }
    }*/
    startMoveTool(true);
    lockHist();
  },
  flipX:function(){
    let b = new Uint8ClampedArray(nob.size);
    let i = 0;
    let i2 = 0;
    for(let y = 0; y < nob.height; y++){
      i2 += nob.width*4;
      for(let x = 0; x < nob.width; x++){
        i2 -= 4;
        b[i2] = img.curLayer.nob.buf[i];
        b[i2+1] = img.curLayer.nob.buf[i+1];
        b[i2+2] = img.curLayer.nob.buf[i+2];
        b[i2+3] = img.curLayer.nob.buf[i+3];
        i += 4;
      }
      i2 += nob.width*4;
    }
    img.curLayer.nob.buf = b;
    _histAdd(HistIds.full,null,"Flip X");
  },
  flipY:function(){
    let b = new Uint8ClampedArray(nob.size);
    let i = 0;
    let i2 = nob.size;
    for(let y = 0; y < nob.height; y++){
      i2 -= nob.width*4;
      for(let x = 0; x < nob.width; x++){
        b[i] = img.curLayer.nob.buf[i2];
        b[i+1] = img.curLayer.nob.buf[i2+1];
        b[i+2] = img.curLayer.nob.buf[i2+2];
        b[i+3] = img.curLayer.nob.buf[i2+3];
        i2 += 4;
        i += 4;
      }
      i2 -= nob.width*4;
    }
    img.curLayer.nob.buf = b;
    _histAdd(HistIds.full,null,"Flip Y");
  }
};
function swapColors(){
  let c = color[0];
  color[0] = color[1];
  color[1] = c;
  updateNewCol(color[img.selCol]);
}
function swapCurColor(){
  if(img.selCol == 0) img.selCol = 1;
  else img.selCol = 0;
  updateNewCol(color[img.selCol]);
}
function keydown(e){
  if(prompKeyChord) return;
  let key = e.key.toLowerCase();
  if(false) if(key == "l"){ //test
    exportAsGif();
  }
  if(!keys.shift){
    shiftX = Math.floor(cx);
    shiftY = Math.floor(cy);
  }
  keys[key] = true;
  didBind = false;

  if(key == "z"){
    if(uniDrag) if(uniDrag.jref) uniDrag.jref.IKflip = !uniDrag.jref.IKflip;
  }

  if(isBind(keybinds.preview.togglePlay)) preview.toggle();

  let isInputting = (document.activeElement.tagName == "INPUT");
  if(isInputting) return;

  //FILE
  if(isBind(keybinds.file.new)) fileFunc.createNew_menu();
  if(isBind(keybinds.file.open)) file_open();
  if(isBind(keybinds.file.saveAs)) file_saveAs();
  if(isBind(keybinds.file.save)) file_save();

  if(areMenusOpen()) return;

  let isActionLocked = isToolLockingHist();

  if(isBind(keybinds.edit.undo)) undo();
  if(isBind(keybinds.edit.undo2)) undo();
  if(isBind(keybinds.edit.redo)) redo();
  if(isBind(keybinds.edit.redo2)) redo();

  if(isBind(keybinds.edit.deselect)) editFunc.deselect();
  if(isBind(keybinds.edit.selectAll)) editFunc.selectAll();

  if(!isActionLocked) if(isBind(keybinds.edit.deleteSel)) toolFunc.deleteSelection();
  //EDIT
  if(!isActionLocked){
      if(isBind(keybinds.edit.copy)) copySelection();
      if(isBind(keybinds.edit.cut)){
          copySelection();
          toolFunc.deleteSelection();
      }
      if(isBind(keybinds.edit.paste)){
          editFunc.paste();
      }
  }

  if(keys.control){
    if(key == " "){
      keyDrawing = true;
      _mousedown(0);
    }
  }
  else if(key == " ") startTempTool(Tools.pan);

  if(isBind(keybinds.edit.resetTool)) resetTool(curTool);
  if(isBind(keybinds.edit.confirmTool)) confirmTool(curTool);

  //VIEW
  if(key == "-"){
    runZoom(1.3);
  }
  if(key == "="){
    runZoom(-1.3);
  }
  if(isBind(keybinds.navigation.moveRight)) setPan(pan[0]-can.offsetWidth/project.w,pan[1]);
  if(isBind(keybinds.navigation.moveLeft)) setPan(pan[0]+can.offsetWidth/project.w,pan[1]);
  if(isBind(keybinds.navigation.moveUp)) setPan(pan[0],pan[1]+can.offsetHeight/project.h);
  if(isBind(keybinds.navigation.moveDown)) setPan(pan[0],pan[1]-can.offsetHeight/project.h);
  if(didBind) return;

  if(key == "arrowright"){
    cx++;
    if(!keys.shift) lcx++;
    coords_l.innerHTML = `Cursor (${Math.floor(cx)},${Math.floor(cy)})`;
  }
  else if(key == "arrowleft"){
    cx--;
    if(!keys.shift) lcx--;
    coords_l.innerHTML = `Cursor (${Math.floor(cx)},${Math.floor(cy)})`;
  }
  if(key == "arrowup"){
    cy--;
    if(!keys.shift) lcy--;
    coords_l.innerHTML = `Cursor (${Math.floor(cx)},${Math.floor(cy)})`;
  }
  else if(key == "arrowdown"){
    cy++;
    if(!keys.shift) lcy++;
    coords_l.innerHTML = `Cursor (${Math.floor(cx)},${Math.floor(cy)})`;
  }
  //TOOLS
  if(isBind(keybinds.color.pick)){
    let ind = (Math.floor(cx)+Math.floor(cy)*project.w)*4;
    for(let i = img.layers.length-1; i >= 0; i--){
      let l = img.layers[i];
      if(l.nob.buf[ind+3]){
        color[img.selCol][0] = l.nob.buf[ind];
        color[img.selCol][1] = l.nob.buf[ind+1];
        color[img.selCol][2] = l.nob.buf[ind+2];
        color[img.selCol][3] = l.nob.buf[ind+3];
        updateNewCol(color[img.selCol]);
        break;
      }
    }
  }
  if(isBind(keybinds.frames.clone)) cloneFrame(project.frameI,project.frameI+1);
  if(isBind(keybinds.frames.new)) createFrame(project.frameI+1);

  if(isBind(keybinds.tools.rectSelect)) selectTool(Tools.rectSelect);
  if(isBind(keybinds.tools.pencil)) selectTool(Tools.pencil);
  if(isBind(keybinds.tools.move)) selectTool(Tools.move);

  if(isBind(keybinds.toolSettings.prevTool)){
    let i = curTool-1;
    if(i < 0) i = toolData.length-1;
    selectTool(i);
  }
  else if(isBind(keybinds.toolSettings.nextTool)){
    let i = curTool+1;
    if(i >= toolData.length) i = 0;
    selectTool(i);
  }
  let td = toolData[curTool];
  let ts = toolSettings[curTool];
  if(isBind(keybinds.toolSettings.sizeDec)){
    if(ts.size != null){
      ts.size--;
      if(ts.size < 1) ts.size = 1;
      genToolSettings(curTool);
    }
  }
  if(isBind(keybinds.toolSettings.sizeInc)){
    if(ts.size != null){
      ts.size++;
      genToolSettings(curTool);
    }
  }
  //FRAME CONTROL
  if(isBind(keybinds.frames.next)) goForwardFrame();
  if(isBind(keybinds.frames.prev)) goBackFrame();
  
  if(isBind(keybinds.color.swap)){
    swapColors();
  }
  if(isBind(keybinds.color.swapCur)){
    swapCurColor();
  }

  if(didBind){
    e.preventDefault();
  }
}
document.addEventListener("keydown",function(e){
  keydown(e);
});
var keyDrawing = false;
document.addEventListener("keyup",e=>{
  g_keye = e;
  let key = e.key.toLowerCase();

  if(keyDrawing) if(key == "control"){
    _mouseup(0);
    keyDrawing = false;
  }

  keys[key] = false;
  if(key == " ") endTempTool();
});
document.addEventListener("contextmenu",e=>{
  e.preventDefault();
});
function resetDep(){
  img.curLayer.nob.dep = new Uint8ClampedArray(img.curLayer.nob.ssize);
  img.curLayer.nob.pixelCount = 0;
}
function startMoveTool(fromCP=false){
  if(curTool != Tools.move) return;
  let d = toolData[curTool];
  d.sx = Math.floor(cx);
  d.sy = Math.floor(cy);
  d.data = new Map();
  let n = img.curLayer.nob;
  let useAll = (!fromCP ? img.selCount == 0 : false);
  let sInd = 0;
  let ind = 0;
  let left = project.w;
  let top = project.h;
  let right = 0;
  let bottom = 0;
  if(!fromCP) for(let j = 0; j < project.h; j++) for(let i = 0; i < project.w; i++){
    let pass = useAll;
    if(!pass) if(img.select2[sInd]) pass = true;
    if(pass){
      let c = `[${n.buf[ind]},${n.buf[ind+1]},${n.buf[ind+2]},${n.buf[ind+3]}]`;
      let l = d.data.get(c);
      if(!d.data.has(c)){
        l = [];
        d.data.set(c,l);
      }
      l.push([i,j,ind]);
      n.setData(ind,clear);
      if(i < left) left = i;
      if(j < top) top = j;
      if(i > right) right = i;
      if(j > bottom) bottom = j;
    }
    sInd++;
    ind += 4;
  }
  if(fromCP){
    d.lastSel2 = cloneBuf(img.select2,nob.ssize);
    if(img.selCount) d.lastSelCount = img.selCount;

    d.data = cloneMap(clipboard[0]);
    img.select2 = cloneBuf(clipboard[1],nob.ssize);
    img.selCount = clipboard[2];
    for(const [cstr,list] of d.data){
    for(let i = 0; i < list.length; i++){
        let p = list[i];
        if(p[0] < left) left = p[0];
        if(p[1] < top) top = p[1];
        if(p[0] > right) right = p[0];
        if(p[1] > bottom) bottom = p[1];
      }
    }
  }
  /*let len = img.selCount;
  let inc = 1;
  if(len == 0){
    len = nob.size;
    inc = 4;
  }
  for(let i = 0; i < len; i += inc){
    let ind = (useAll?i:img.select[i]);
    let x = ind%(project.w*4)/4;
    let y = ind/(project.w*4);
    let c = `[${n.buf[ind]},${n.buf[ind+1]},${n.buf[ind+2]},${n.buf[ind+3]}]`;
    let l = d.data.get(c);
    if(!d.data.has(c)){
      l = [];
      d.data.set(c,l);
    }
    l.push([x,y,ind]);
    n.setData(ind,clear);
  }*/
  //
  let width = right-left+1;
  let height = bottom-top+1;
  d.centerX = left+Math.floor(width/2);
  d.centerY = top+Math.floor(height/2);
  d.width = width;
  d.height = height;
  d.left = left;
  d.top = top;
  d.rot = 0;
  d.srx = 1;
  d.sry = 1;
  d.ox = 0.5;
  d.oy = 0.5;
  for(let [c,list] of d.data){
    for(let i = 0; i < list.length; i++){
      let p = list[i];
      p[0] -= left;
      p[1] -= top;
      p[2] = (p[0]+p[1]*width)*4;
    }
  }
  //
  d.moveMode = 0;
  d.done = 1;
  n.pixelCount = 0;
  d.fromCP = fromCP;
  calcSelBounds();
  scaleR.style.visibility = "hidden";
  lockHist();
  d.data.delete("[0,0,0,0]");
}
let gbez = null;
let uniHover = null;
function runUniRanges(e,call){
  for(let i = 0; i < uniRanges.length; i++){
    let f = uniRanges[i];
    if(!f.ref.parentNode){
      uniRanges.splice(i,1);
      i--;
      continue;
    }
    let r = f.ref.getBoundingClientRect();
    let mx = e.clientX;
    let my = e.clientY;
    let x = r.x;
    let y = r.y;
    let w = r.width;
    let h = r.height;
    let rad = 8;
    function down(side,side2){
      if(call) call(f,side,side2);
    }
    let top = false;
    let bot = false;
    let right = false;
    let left = false;
    if(true){
      if(f.sides.includes(0)) if(mx > x-rad && mx <= x+w+rad && my > y-rad && my < y+rad){
        //down(0);
        //f.ondown(e);
        top = true;
      }
      if(f.sides.includes(1)) if(mx > x-rad && mx <= x+w+rad && my > y+h-rad && my < y+h+rad){
        //down(1);
        //f.ondown(e);
        bot = true;
      }
      if(f.sides.includes(2)) if(mx > x+w-rad && mx <= x+w+rad && my > y-rad && my < y+h+rad){
        //down(2);
        //f.ondown(e);
        right = true;
      }
      if(f.sides.includes(3)) if(mx > x-rad && mx <= x+rad && my > y-rad && my < y+h+rad){
        //down(3);
        //f.ondown(e);
        left = true;
      }
      if(top){
        down(0,(left?3:right?2:null));
        f.ondown(e);
      }
      else if(bot){
        down(1,(left?3:right?2:null));
        f.ondown(e);
      }
      else if(left){
        down(3);
        f.ondown(e);
      }
      else if(right){
        down(2);
        f.ondown(e);
      }
    }
    if(false) for(let j = 0; j < f.sides.length; j++){
      let side = f.sides[j];
      switch(side){ //0,1,2,3 //4,5 \n 6,7
        case 0:
          if(mx > x && mx <= x+w && my > y-rad && my < y+rad){
            down(side);
            f.ondown(e);
          }
          break;
        case 1:
          if(mx > x && mx <= x+w && my > y+h-rad && my < y+h+rad){
            down(side);
            f.ondown(e);
          }
          break;
        case 2:
          if(mx > x+w-rad && mx <= x+w+rad && my > y && my < y+h){
            down(side);
            f.ondown(e);
          }
          break;
        case 3:
          if(mx > x-rad && mx <= x+rad && my > y && my < y+h){
            down(side);
            f.ondown(e);
          }
          break;
      }
    }
  }
}
function _mousedown(button,e){
  scx = cx;
  scy = cy;
  mouseDown[button] = true;
  coordsStart_l.innerHTML = `Start (${Math.floor(scx)},${Math.floor(scy)})`;
  if(button == 1) startTempTool(Tools.pan);
  let d;
  let td = toolData[curTool];
  let ts = toolSettings[curTool];

  //RUN UNIRANGES
  if(!uniDrag) runUniRanges(e,(f,side,side2)=>{
    uniDrag = f;
    dragRef = null;
    f.sel = side;
    f.sel2 = side2;
  });

  //console.log(overCanvas,img.curLayer.nob.pixelCount);
  if(!uniDrag) if(overCanvas || img.curLayer.nob.pixelCount > 0) switch(curTool){
    case Tools.bezier:{
      if(!gbez){
        gbez = nobCreateBezier([[cx,cy]],ts.size,getCol(mouseDown[2]?2:0,true,true));
      }
      else{
        gbez.c.push([cx,cy]);
      }
    } break;
    case Tools.pencil:
    case Tools.eraser:
      if(img.curLayer){
        img.curLayer.nob.dep = new Uint8ClampedArray(img.curLayer.nob.ssize);
        img.curLayer.nob.pixelCount = 0;
        let n = img.curLayer.nob;
        lastSelLen = img.selCount;
        n.initRec();
      }
    break;
    case Tools.line:
      resetDep();
      lastSelLen = img.selCount;
      img.curLayer.nob.initRec();
    break;
    case Tools.pan:
      toolData[curTool].spx = pan[0];
      toolData[curTool].spy = pan[1];
    break;
    case Tools.rectSelect:
      d = toolData[curTool];
      if(d.drawn == 0){
        d.sx = Math.floor(cx);
        d.sy = Math.floor(cy);
        d.w = 1;
        d.h = 1;
        d.drawn = 1;
      }
    break;
    case Tools.moveSelect:
      if(img.selCount != 0){
        d = toolData[curTool];
        d.sx = Math.floor(cx);
        d.sy = Math.floor(cy);
      }
    break;
    case Tools.move:
      d = toolData[curTool];
      let flx = Math.floor(cx);
      let fly = Math.floor(cy);
      let flInd = flx+fly*project.w;
      if(d.done == 0) if(img.select2[flInd]){
        startMoveTool();
      }
    break;
    case Tools.eyeDropper:
      let x = Math.floor(cx);
      let y = Math.floor(cy);
      if(x < 0) break;
      if(y < 0) break;
      if(x >= project.w) break;
      if(y >= project.h) break;
      let i = (x+y*project.w)*4;
      let b = nob.buf;
      let c = [b[i],b[i+1],b[i+2],b[i+3]];
      if(button == 0) color[0] = c;
      else color[1] = c;
      updateNewCol(color[img.selCol]);
    break;
    case Tools.fill:{
      let x = Math.floor(cx);
      let y = Math.floor(cy);
      if(x < 0) break;
      if(y < 0) break;
      if(x >= project.w) break;
      if(y >= project.h) break;
      let col = getCol(button);
      let i2 = (x+y*project.w);
      if(ts.drawMode != DrawMode.select) if(img.curLayer.nob.dep[i2]) break;
      let i = i2*4;
      let b = nob.buf;
      let cc = [b[i],b[i+1],b[i+2],b[i+3]];
      if(ts.drawMode != DrawMode.select) if(cc[0] == col[0] && cc[1] == col[1] && cc[2] == col[2] && cc[3] == col[3]) return;
      if(ts.fillMode == FillMode.flood){
        if(ts.fillMethod == FillMethod.span){
          let pitch = project.w*4;
          let d = new Uint8ClampedArray(nob.ssize);
          let stack = [];
          stack.push([x,y,i,i2]);
          d[i2] = 1;
          let inds = [];
          let maxTimes = 99999;
          while(stack.length != 0){
            maxTimes--;
            if(!maxTimes){
              let a = confirm("Do you want to keep going?");
              if(!a) break;
              else maxTimes = 99999;
            }
            //times++;
            let s = stack.pop();
            let ind2 = s[3];
            if(ts.drawMode != DrawMode.select) if(img.curLayer.nob.dep[ind2]) continue;
            let ind = s[2];
            let yy = s[1];
            let xx = s[0];
            if(xx < 0) continue;
            if(yy < 0) continue;
            if(xx >= project.w) continue;
            if(yy >= project.h) continue;
            let r = b[ind];
            let g = b[ind+1];
            let bl = b[ind+2];
            let a = b[ind+3];
            if(cc[0] == r && cc[1] == g && cc[2] == bl && cc[3] == a){
              inds.push(ind);
              if(xx > 0) if(!d[ind2-1]){
                stack.push([xx-1,yy,ind-4,ind2-1]);
                d[ind2-1] = 1;
              }
              if(xx < project.w-1) if(!d[ind2+1]){
                stack.push([xx+1,yy,ind+4,ind2+1]);
                d[ind2+1] = 1;
              }
              if(yy > 0) if(!d[ind2-project.w]){
                stack.push([xx,yy-1,ind-pitch,ind2-project.w]);
                d[ind2-project.w] = 1;
              }
              if(yy < project.h-1) if(!d[ind2+project.w]){
                stack.push([xx,yy+1,ind+pitch,ind2+project.w]);
                d[ind2+project.w] = 1;
              }
            }
          }
          lastSelLen = img.selCount;
          img.curLayer.nob.initRec();
          for(let j = 0; j < inds.length; j++){
            drawPixel_ind(img.curLayer.nob,inds[j],col[0],col[1],col[2],col[3],false,1);
          }
          if(ts.drawMode == DrawMode.select){
            if(img.selCount != lastSelLen){
              _histAdd(HistIds.select,{
                a:cloneBuf(img.select2,nob.ssize),
                c:img.selCount
              },"Flood select");
              img.curLayer.nob.finishRec();
            }
          }
          else _histAdd(HistIds.px,img.curLayer.nob.finishRec(),"Flood fill");
        }
        else if(ts.fillMethod == FillMethod.recursive){
          let l = img.curLayer.nob;
          let cc1 = null;
          l.dep = new Uint8ClampedArray(l.ssize);
          function check(x1,y1){
            let ind1 = x1+y1*l.width;
            let ind = ind1*4;
            if(l.dep[ind1]) return;
            if(col[0] != -1) if(img.selCount) if(!img.select2[ind1]) return;
            l.dep[ind1] = 1;
            let c2 = [l.buf[ind],l.buf[ind+1],l.buf[ind+2],l.buf[ind+3]];
            if(cc[0] == c2[0] && cc[1] == c2[1] && cc[2] == c2[2] && cc[3] == c2[3]){
              if(col[0] == -1) l.drawPixel_ind(ind,col[0],col[1],col[2],col[3],false);
              l.drawPixel_ind_dep(ind,col[0],col[1],col[2],col[3],false,2);
              check(x1-1,y1);
              check(x1+1,y1);
              check(x1,y1-1);
              check(x1,y1+1);
            }
          }
          check(x,y);
          _histAdd(HistIds.full,null,"Recursive fill");
          l.dep = new Uint8ClampedArray(l.ssize);
        }
      }
      else if(ts.fillMode == FillMode.global){
        let n = img.curLayer.nob;
        lastSelLen = img.selCount;
        n.initRec();
        for(let j = 0; j < nob.size; j += 4){
          let r = n.buf[j];
          let g = n.buf[j+1];
          let bl = n.buf[j+2];
          let a = n.buf[j+3];
          if(cc[0] == r && cc[1] == g && cc[2] == bl && cc[3] == a){
            drawPixel_ind(img.curLayer.nob,j,col[0],col[1],col[2],col[3],false,1);
          }
        }
        if(ts.drawMode == DrawMode.select){
          if(img.selCount != lastSelLen){
            _histAdd(HistIds.select,{
              a:cloneBuf(img.select2,nob.ssize),
              c:img.selCount
            },"Global select");
            img.curLayer.nob.finishRec();
          }
        }
        else _histAdd(HistIds.px,n.finishRec(),"Global fill");
      }
    }
    break;
  }
}
document.addEventListener("mousedown",e=>{
  if(areMenusOpen()) return;
  smx = e.x;
  smy = e.y;
  if(e.button != 0) e.preventDefault();
  _mousedown(e.button,e);
});
document.addEventListener("touchstart",e=>{
  if(areMenusOpen()) return;
  let x = e.changedTouches[0].clientX;
  let y = e.changedTouches[0].clientY;
  e.x = x;
  e.y = y;
  e.clientX = x;
  e.clientY = y;
  smx = e.x;
  smy = e.y;
  e.button = 0;
  // if(e.button != 0) e.preventDefault();
  _mousedown(e.button,e);
  // console.log("TOUCH START",e);
});
function tint(c,a,aa=1){
  c = deepClone(c);
  c[0] *= a;
  c[1] *= a;
  c[2] *= a;
  c[3] *= aa;
  return c;
}
function getCol(b,prev=false,darken=false){
  if(curTool == Tools.eraser){
    if(prev) return pink;
    return clear;
  }
  let ts = toolSettings[curTool];
  if(prev) if(keys.alt) return pink;
  if(ts.drawMode != DrawMode.select) if(keys.alt) return clear;
  if(ts.drawMode == DrawMode.erase) return (prev?pink:clear);
  if(b == null){
    if(mouseDown[2]) b = 2;
    else b = 0;
  }
  let c = color[0];
  if(b == 2) c = color[1];
  if(ts.drawMode == DrawMode.select){
    if(!prev){
      if(keys.alt) c = [-1,3,0,0];
      else c = [-1,2,0,0];
    }
    else{
      if(keys.alt) c = delPrevSelect;
      else c = prevSelect;
    }
  }
  else if(darken) return tint(c,0.7,0.6);
  // if(c == prevSelect) console.log("PREV");
  return c;
}
function _mouseup(button){
  mouseDown[button] = false;
  dragRef = null;
  ecx = cx;
  ecy = cy;
  if(button == 1) endTempTool();
  let d;
  let ts = toolSettings[curTool];
  if(!uniDrag) if(button == 0 || button == 2) if(img.curLayer) switch(curTool){
    case Tools.pencil:
    case Tools.eraser:
    {
      if(!overCanvas) break;
      let era = curTool == Tools.eraser;
      let toolS = (era?"Eraser":"Pencil");
      if(ts.drawMode == DrawMode.select){
        if(lastSelLen != img.selCount){
          img.curLayer.nob.finishRec();
          _histAdd(HistIds.select,{
            a:cloneBuf(img.select2,nob.ssize),
            c:img.selCount
          },toolS+" select");
          lastSelLen = img.selCount;
        }
      }
      else if(img.curLayer.nob.pixelCount > 0){
        //histAdd_image();
        //histAdd_all("Pencil");
        /*_histAdd(HistIds.px,{
          f:project.frameI,
          l:img.curLayer.ind,
          list:img.curLayer.nob.finishRec()
        },"Pencil");*/
        
        _histAdd(HistIds.px,img.curLayer.nob.finishRec(),toolS);
        img.curLayer.nob.pixelCount = 0;
      }
    } break;
    case Tools.line:
      let tx = cx;
      let ty = cy;
      if(keys.shift){
        let dx = Math.abs(cx-scx);
        let dy = Math.abs(cy-scy);
        if(dy >= dx) tx = scx;
        else ty = scy;
      }
      drawLine(img.curLayer.nob,scx,scy,tx,ty,getCol(button),ts.size,1);
      if(ts.drawMode == DrawMode.select){
        if(img.selCount != lastSelLen){
          _histAdd(HistIds.select,deepClone(img.select),"Line select");
          img.curLayer.nob.finishRec();
          lastSelLen = img.selCount;
        }
      }
      else if(img.curLayer.nob.pixelCount > 0){
        _histAdd(HistIds.px,img.curLayer.nob.finishRec(),"Line");
        img.curLayer.nob.pixelCount = 0;
      }
    break;
    case Tools.rectSelect:
      d = toolData[curTool];
      if(d.drawn == 1){
        d.drawn = 2;
        if(d.w != 0 && d.h != 0) lockHist();
        else resetTool(curTool);
      }
      else if(d.drawn == 2){
        d.sx += d.offx;
        d.sy += d.offy;
        d.offx = 0;
        d.offy = 0;
      }
      confirmTool(curTool); //possibly temp - skips confirm
    break;
    case Tools.moveSelect:
      d = toolData[curTool];
      if(img.selCount != 0) if(Math.abs(d.offx) > 0 || Math.abs(d.offy) > 0){
        let ind = 0;
        let ns = new Uint8ClampedArray(nob.ssize);
        let nc = 0;
        for(let j = 0; j < project.h; j++){
          for(let i = 0; i < project.w; i++){
            if(img.select2[ind]){
              let x = i+d.offx;
              let y = j+d.offy;
              let pass = true;
              if(x < 0) pass = false;
              else if(y < 0) pass = false;
              else if(x >= project.w) pass = false;
              else if(y >= project.h) pass = false;
              if(pass){
                let tInd = x+y*project.w;
                ns[tInd] = 1;
                nc++;
              }
            }
            ind++;
          }
        }
        img.select2 = ns;
        img.selCount = nc;
        /*for(let i = 0; i < img.selCount; i++){
          let ind = img.select[i];
          let xx = ind%(project.w*4);
          let yy = ind/(project.w*4);
          let off = 0;
          let pass = true;
          if(xx+d.offx*4 < 0) pass = false;
          else if(yy+d.offy < 0) pass = false;
          else if(xx+d.offx*4 >= project.w*4) pass = false;
          else if(yy+d.offy >= project.h) pass = false;
          if(!pass){
            img.select.splice(i,1);
            i--;
            continue;
          }
          off += d.offx*4;
          off += d.offy*4*project.w;
          img.select[i] += off;
        }*/
        _histAdd(HistIds.select,{
          a:cloneBuf(img.select2,nob.ssize),
          c:img.selCount
        },"Move selection");
      }
      resetTool(curTool);
    break;
    case Tools.move:
      d = toolData[curTool];
      if(d.done == 1){
        d.px += d.offx;
        d.py += d.offy;
        d.offx = 0;
        d.offy = 0;
        if(d.moveMode == 2){
          //()()()
          //td.srx = (cx-scx)/selBounds[2]+d.s_srx;
          let off = getWarpScaleOffset();
          d.tpx += off[0];
          d.tpy += off[1];
          
          let amt = 0;
          let ax = 0;
          let ay = 0;
          switch(d.handleI){
            case 0:
              dx = -d.s_ox;
              amt = dx*selBounds[2]*d.srx;
              ax = Math.cos(d.rot)*amt;
              ay = -Math.sin(d.rot)*amt;
              break;
            case 1:
              dx = 1-d.s_ox;
              amt = dx*selBounds[2]*d.srx;
              ax = Math.cos(d.rot)*amt;
              ay = -Math.sin(d.rot)*amt;
              break;
            case 2:
              dx = -d.s_oy;
              amt = dx*selBounds[3]*d.sry;
              ay = Math.cos(d.rot)*amt;
              ax = Math.sin(d.rot)*amt;
              break;
            case 3:
              dx = 1-d.s_oy;
              amt = dx*selBounds[3]*d.sry;
              ay = Math.cos(d.rot)*amt;
              ax = Math.sin(d.rot)*amt;
              break;
          }
          d.px -= ax;
          d.py -= ay;
          d.ox = d.s_ox;
          d.oy = d.s_oy;

          d.moveMode = 0;
          d.s_px = 0;
          d.s_py = 0;
          d.s_sx = 0;
          d.s_sy = 0;
          break;
        }
      }
      if(img.selCount == 0){
        let ox = d.px+d.offx;
        let oy = d.py+d.offy;
        if(ox != 0 || oy != 0) confirmTool(curTool);
        else resetTool(curTool);
      }
      if(overCanvas) if(!d.useTrans) confirmTool(curTool); //possibly temp - gets rid of confirming on move
    break;
  }
  if(uniDrag){
    if(uniDrag.onup) uniDrag.onup(button);
  }
  uniDrag = null;
  dragging = false;
  draggingColor = false;
  dragSlider = -1;
  img.curLayer.nob.pixelCount = 0;
  if(dragLayer){
    dragLayer.style.marginLeft = "0px";
    dragLayer.style.marginTop = "0px";
    dragLayer.style.position = "unset";

    console.log(dragLayer.start,dragLayer.end);
    let layers = project.frames[project.frameI].layers;
    let l = layers[dragLayer.start];
    layers.splice(dragLayer.start,1);
    layers.splice(dragLayer.end,0,l);
    reconstructLayersDiv();

    dragLayer = null;
  }
}
document.addEventListener("mouseup",e=>{
  if(tempOffCanvas){
    tempOffCanvas = false;
    overCanvas = false;
  }
  _mouseup(e.button);
});
document.addEventListener("touchend",e=>{
  if(tempOffCanvas){
    tempOffCanvas = false;
    overCanvas = false;
  }
  let x = e.changedTouches[0].clientX;
  let y = e.changedTouches[0].clientY;
  e.x = x;
  e.y = y;
  e.clientX = x;
  e.clientY = y;
  e.button = 0;
  _mouseup(e.button);
  // console.log("TOUCH END");
});
back.addEventListener("mouseenter",e=>{
  overCanvas = true;
  tempOffCanvas = false;
});
let tempOffCanvas = false;
back.addEventListener("mouseleave",e=>{
  overCanvas = false;
  if(mouseDown[0] || mouseDown[1] || mouseDown[2]) if(scx >= 0 && scy >= 0 && scx < project.w && scy < project.h){
    overCanvas = true;
    tempOffCanvas = true;
  }
});
back.addEventListener("mousedown",e=>{
  closeAllCtxMenus();
});
var mx = 0;
var my = 0;
var coords_l = document.getElementById("coords_l");
var coordsStart_l = document.getElementById("coordsStart_l");
function runScaleXY(){
  scaleX = (mx-canvas.offsetLeft)/canvas.offsetWidth;
  scaleY = (my-canvas.offsetTop)/canvas.offsetHeight;
}
document.addEventListener("mousemove",e=>{
  _mousemove(e);
});
document.addEventListener("touchmove",e=>{
  e.button = 0;
  let x = e.changedTouches[0].clientX;
  let y = e.changedTouches[0].clientY;
  e.x = x;
  e.y = y;
  e.clientX = x;
  e.clientY = y;
  e.button = 0;
  _mousemove(e);
});
function _mousemove(e){
  let x = e.clientX;
  let y = e.clientY;
  mx = x;
  my = y;
  runScaleXY();

  document.body.style.cursor = "unset";

  if(dragRef){ /**if(!e.shiftKey) */
    let lx = x-dragX;
    let ly = y-dragY;
    dragRef.style.left = (dragRef.sx+lx)+"px";
    dragRef.style.top = (dragRef.sy+ly)+"px";
  }

  if(!uniDrag) runUniRanges(e,(f,side,side2)=>{
    if(side == 0 || side == 1){
      // f.tmpCur = document.body.style.cursor;
      document.body.style.cursor = "ns-resize";
    }
    else if(side == 2 || side == 3){
      // f.tmpCur = document.body.style.cursor;
      document.body.style.cursor = "ew-resize";
    }
    if(side2 != null) if(side == 0){
      if(side2 == 3) document.body.style.cursor = "nw-resize";
      else if(side2 == 2) document.body.style.cursor = "ne-resize";
    }
    else if(side == 1){
      if(side2 == 3) document.body.style.cursor = "sw-resize";
      else if(side2 == 2) document.body.style.cursor = "se-resize";
    }
    else if(side == 3){
      if(side2 == 0) document.body.style.cursor = "nw-resize";
      else if(side2 == 1) document.body.style.cursor = "sw-resize";
    }
    else if(side == 2){
      if(side2 == 0) document.body.style.cursor = "ne-resize";
      else if(side2 == 1) document.body.style.cursor = "se-resize";
    }
  });

  lcx = cx;
  lcy = cy;
  cx = scaleX*project.w;
  cy = scaleY*project.h;
  coords_l.innerHTML = `Cursor (${Math.floor(cx)},${Math.floor(cy)})`;
  //if(mouseDown[0]) if(scx >= 0 && scy >= 0 && scx < img.w && scy < img.h) img.overCanvas = true;

  if(uniDrag){
    let lx = cx-uniDragX;
    let ly = cy-uniDragY;
    let xx = uniDrag.sx+lx;
    let yy = uniDrag.sy+ly;
    if(uniDrag.onmove) uniDrag.onmove(xx,yy,e,uniDrag);
  }

  if(scaleX < 0) scaleX = 0;
  else if(scaleX > 1) scaleX = 1;
  if(scaleY < 0) scaleY = 0;    
  else if(scaleY > 1) scaleY = 1;

  //setPan(pan[0],pan[1]);

  if(!uniDrag) if(overCanvas || img.curLayer.nob.pixelCount > 0) switch(curTool){
    case Tools.pan:
      if(mouseDown[0] || mouseDown[1]){
        setPan(toolData[curTool].spx+(x-smx),toolData[curTool].spy+(y-smy));
      }
    break;
  }

  //ColorWheel
  if(draggingColor) updateCW();
  else if(dragSlider != -1) updateSlider();
}

function resizeImage(w,h,bare=false){
  if(!bare){
    project.w = w;
    project.h = h;
  }
  //img.w = w;
  //img.h = h;
  can.width = w;
  can.height = h;
  nob.width = w;
  nob.height = h;
  nob.right = w-1;
  nob.bottom = h-1;
  nob.size = w*h*4;
  nob.ssize = w*h;
  nob.buf = new Uint8ClampedArray(nob.size);
  prev.width = w;
  prev.height = h;
  pNob.width = w;
  pNob.height = h;
  pNob.right = w-1;
  pNob.bottom = h-1;
  pNob.size = w*h*4;
  pNob.ssize = w*h;
  pNob.buf = new Uint8ClampedArray(pNob.size);
  pNob.dep = new Uint8ClampedArray(pNob.ssize);
  pNob.data = new ImageData(pNob.width,pNob.height);
  for(let i = 0; i < project.frames.length; i++){
    let f = project.frames[i];
    f.select2 = new Uint8ClampedArray(nob.ssize);
  }
  if(img) for(let i = 0; i < img.layers.length; i++){
    let l = img.layers[i];
    l.nob.width = w;
    l.nob.height = h;
    l.nob.right = w-1;
    l.nob.bottom = h-1;
    l.nob.size = w*h*4;
    l.nob.ssize = w*h;
    l.nob.buf = new Uint8ClampedArray(l.nob.size);
    l.nob.dep = new Uint8ClampedArray(l.nob.ssize);
  }
  if(!bare){
    setZoom(zoom);
    setPan(pan[0],pan[1]);
    resetView();
  }
}

function resetView(){
  setZoom((window.innerHeight/2)/Math.max(project.w,project.h));
  setPan(-project.w*zoom/2,-project.h*zoom/2);

  //settings
  /*if(settings.grid){
    can.style.backgroundImage = "url('images/grid.png')";
    can.style.backgroundSize = "14px";
  }
  else{
    can.style.backgroundImage = "none";
  }
  if(settings.gridlines){
    overlay.style.backgroundImage = 'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);'
      let a = 100/project.w;
    overlay.style.backgroundSize = a+"% "+a+"%";
  }
  else{
    overlay.style.backgroundImage = "none";
  }*/
}
resetView();

function renameLayer(l,name,html,bare=false){
  l.name = name;
  if(!html) html = layers_d.children[img.layers.length-l.ind-1].children[1].children[0];
  else html.innerHTML = name;
  if(!bare) _histAdd(HistIds.renameLayer,{l:l.ind,n:name,ref:html},"Rename Layer");
  reconstructLayersDiv();
}

//Color
var dummy = document.createElement("canvas");
var dum = dummy.getContext("2d");
function toHSL(rgb){
  dum.fillStyle = ``;
}
let cur = document.getElementById("colorCur");
let cw = document.getElementById("colorArea");
let col1 = document.getElementById("col1");
let col2 = document.getElementById("col2");
col1.onmousedown = function(){
  addToColHist(0);
};
col2.onmousedown = function(){
  addToColHist(1);
};
cw.width = 32; //100
cw.height = 32;
let hw = cw.width/2;
let hh = cw.height/2;
document.addEventListener("dragstart",e=>{
  e.preventDefault();
});
cw.addEventListener("mousedown",e=>{
  dragging = true;
  draggingColor = true;
  cw_xy.x = e.x-(cw.parentNode.parentNode.offsetLeft)-47;
  cw_xy.y = e.y-(cw.parentNode.parentNode.offsetTop)-70;
  updateCW();
  updateColorCur();
});
var colorAreas = {
  basic:{
    name:"Basic",
    f:function(i,j,s=100){
      let a = Math.atan2(j,i)*180/Math.PI;
      if(a < 0) a += 360;
      let dist = Math.sqrt(i*i+j*j); 
      return [a,s,100-dist,255,1]; //h,100,l
    },
    fget:function(c){
      let d = (100-c[2])/50*40;
      if(c[0] < 0) c[0] += 360;
      let a = c[0]*Math.PI/180;
      return [Math.cos(a)*d,Math.sin(a)*d];
    },
    round:true,
    hueRedraw:false
  },
  linear:{
    name:"Linear",
    f:function(i,j){
      return [getHSLA_i(0),100-(j+50),i+50,255,1];
    },
    fget:function(c){
      return [c[2]*0.8-40,40-c[1]*0.8];
    },
    round:false,
    hueRedraw:true
  },
  epic:{
    name:"Epic",
    f:function(i,j){
      i &= j;
      j ^= i;
      let a = Math.atan2(j,i)*180/Math.PI;
      if(a < 0) a += 360;
      let dist = Math.sqrt(i*i+j*j); 
      return [a,100,100-dist/hw*50,255,1];
    },
    round:false,
    hueRedraw:false
  }
};
function initColorArea(d){
  if(!d){
    console.error("NO COLOR AREA SUPPLIED");
    return;
  }
  let ct = cw.getContext("2d");
  //let cc = color[img.selCol];
  //let tc = R_G_B_AtoH_S_L_A(cc[0],cc[1],cc[2],cc[3]);
  for(let j = -hh; j < hh; j++) for(let i = -hw; i < hw; i++){
    //let c = d.f(i&j,j^i);
    //let c = d.f(i^j,j&i);
    //let c = d.f(i|j,j^i&5);
    let c = d.f(i*(50/hw),j*(50/hh));
    ct.fillStyle = `hsl(${c[0]},${c[1]}%,${c[2]}%)`;
    ct.fillRect(i+hw,j+hh,1,1);
  }
  if(d.round) cw.style.borderRadius = "50%";
  else cw.style.borderRadius = "0px";
}
let swatches = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];
let sw = document.getElementById("swatches");
let sw2 = document.getElementById("sw2");
let colHist = [];
function addToColHist(id,over){
  if(id == null) id = img.selCol;
  let la = color[id];
  if(over) la = over;
  let includes = false;
  for(let i = 0; i < colHist.length; i++){
    let cc = colHist[i];
    if(!cc){
      colHist.splice(i,1);
      i--;
      continue;
    }
    if(cc[0] == la[0] && cc[1] == la[1] && cc[2] == la[2] && cc[3] == la[3]){
      includes = true;
      break;
    }
  }
  if(!includes){
    colHist.push([la[0],la[1],la[2],la[3]]);
    if(colHist.length > 8) colHist.splice(0,1);
    updateColHist();
  }
  saveHistSwatches();
}
function updateColHist(){
  for(let i = 0; i < colHist.length; i++){
    let ss = colHist[i];
    let c = sw.children[i];
    if(ss) c.style.backgroundColor = `rgba(${ss[0]},${ss[1]},${ss[2]},${ss[3]})`;
    else c.style.backgroundColor = "unset";
  }
}
function saveSwatches(){
  // while(swatches.includes(null)) swatches.splice(swatches.indexOf(null),1);
  localStorage.setItem("swatches",JSON.stringify(swatches));
}
function saveHistSwatches(){
  localStorage.setItem("histSwatches",JSON.stringify(colHist));
}
function loadSwatches(){
  let r = localStorage.getItem("swatches");
  if(r) swatches = JSON.parse(r);
}
function loadHistSwatches(){
  let r = localStorage.getItem("histSwatches");
  if(r) colHist = JSON.parse(r);
  updateColHist();
}
function initSliders(){
  for(let i = 0; i < sliders.children.length; i++){
    let c = sliders.children[i];
    WhenEnter(c.children[1],(a)=>{
      let v = parseInt(a.value);
      //setSlider(i,v);
      let m = 100;
      if(i == 0) m = 360;
      else if(i >= 3) m = 255;
      mx = 109+(v/m*80);
      c.children[0].onmousedown({button:0});
      updateSlider();
      dragging = false;
      dragSlider = -1;
    });
  }
  for(let i = 0; i < sw.children.length; i++){
    let s = sw.children[i];
    s.onmousedown = function(e){
      if(keys.alt){
        colHist[i] = null;
        this.style.backgroundColor = "unset";
        return;
      }
      let tmp = colHist[i];
      if(!tmp) return;
      let id = e.button==0?0:1;
      color[id] = [tmp[0],tmp[1],tmp[2],tmp[3]];
      updateNewCol(color[img.selCol]);
    }
  }
  for(let i = 0; i < sw2.children.length; i++) {
    let s = sw2.children[i];
    let tmp = swatches[i];
    if(tmp) s.style.backgroundColor = `rgba(${tmp[0]},${tmp[1]},${tmp[2]},${tmp[3]})`;
    s.onmousedown = function(e){
      if(keys.alt){
        addToColHist(0,swatches[i]);
        swatches[i] = null;
        this.style.backgroundColor = "unset";
        saveSwatches();
        return;
      }
      let id = e.button==0?0:1;
      tmp = swatches[i];
      if(!tmp){
        let col = color[id];
        swatches[i] = [0,0,0,0];
        let tmp = swatches[i];
        tmp[0] = col[0];
        tmp[1] = col[1];
        tmp[2] = col[2];
        tmp[3] = col[3];
        this.style.backgroundColor = `rgba(${tmp[0]},${tmp[1]},${tmp[2]},${tmp[3]})`;
        saveSwatches();
        return;
      }
      addToColHist(id);
      color[id] = [tmp[0],tmp[1],tmp[2],tmp[3]];
      updateNewCol(color[img.selCol]);
      return;

      //let tmp = swatches[i];
      // let id = 0; //e.button==0?0:1
      // if(!tmp) id = e.button==0?0:1;
      id = e.button==0?0:1;
      /*if(e.button != 0){
        swatches[i] = null;
        this.style.backgroundColor = "unset";
        return;
      }*/
      let col = color[id];
      if(keys.alt){
        swatches[i] = null;
        this.style.backgroundColor = "unset";
        return;
      }
      if(e.button == 0 && tmp){
        addToColHist();
        color[id] = [tmp[0],tmp[1],tmp[2],tmp[3]];
        updateColorCur();
        return;
      }
      if(e.button == 1 && tmp){
        addToColHist();
        let tmp1 = [tmp[0],tmp[1],tmp[2],tmp[3]];
        swatches[i] = [col[0],col[1],col[2],col[3]];
        color[id] = [tmp1[0],tmp1[1],tmp1[2],tmp1[3]];
        updateColorCur();
        let ss = swatches[i];
        this.style.backgroundColor = `rgba(${ss[0]},${ss[1]},${ss[2]},${ss[3]})`;
        return;``
      }
      // swatches[i] = [col[0],col[1],col[2],col[3]];
      // let ss = swatches[i];
      // this.style.backgroundColor = `rgba(${ss[0]},${ss[1]},${ss[2]},${ss[3]})`;
      /*if(tmp){
        color[id] = [tmp[0],tmp[1],tmp[2],tmp[3]];
        updateColorCur();
      }
      let col = color[id];
      swatches[i] = [col[0],col[1],col[2],col[3]];
      let ss = swatches[i];
      this.style.backgroundColor = `rgba(${ss[0]},${ss[1]},${ss[2]},${ss[3]})`;*/
    };
  }
}
function updateColorCur(){
  if(colorArea.round){
    let dist = Math.sqrt(cw_xy.x*cw_xy.x+cw_xy.y*cw_xy.y);
    if(dist > 40){
      cw_xy.x = cw_xy.x/dist*40;
      cw_xy.y = cw_xy.y/dist*40;
    }
  }
  else{
    if(cw_xy.x < -40) cw_xy.x = -40;
    else if(cw_xy.x > 40) cw_xy.x = 40;
    if(cw_xy.y < -40) cw_xy.y = -40;
    else if(cw_xy.y > 40) cw_xy.y = 40;
  }

  let c1 = color[0];
  let c2 = color[1];
  project.c1 = c1;
  project.c2 = c2;
  c1[0] = Math.floor(c1[0]);
  c1[1] = Math.floor(c1[1]);
  c1[2] = Math.floor(c1[2]);
  c1[3] = Math.floor(c1[3]);
  c2[0] = Math.floor(c2[0]);
  c2[1] = Math.floor(c2[1]);
  c2[2] = Math.floor(c2[2]);
  c2[3] = Math.floor(c2[3]);
  hex1i.value = rgbaToHex(...c1);
  hex2i.value = rgbaToHex(...c2);

  /*let c = colorArea.f(cw_xy.x/40*50,cw_xy.y/40*50);
  if(c[4] == 1) c = H_S_L_AtoR_G_B_A(c[0],100,c[2],c[3]);
  color[img.selCol][0] = c[0];
  color[img.selCol][1] = c[1];
  color[img.selCol][2] = c[2];*/


  updateCurVisual();
  updateSliderVisuals();
}
function updateCurVisual(){
  cur.style.marginLeft = (cw.offsetWidth/2+cw_xy.x)+"px";
  cur.style.marginTop = (cw.offsetHeight/2+cw_xy.y)+"px";

  if(img.selCol == 0) col1.className = "sel";
  else col1.className = "";
  if(img.selCol == 1) col2.className = "sel";
  else col2.className = "";

  col1.children[0].style.backgroundColor = `rgba(${color[0][0]},${color[0][1]},${color[0][2]},${color[0][3]/255})`;
  col2.children[0].style.backgroundColor = `rgba(${color[1][0]},${color[1][1]},${color[1][2]},${color[1][3]/255})`;
}
function updateCol(){
  //let col = color[img.selCol];
  //let c = R_G_B_AtoH_S_L_A(col[0],col[1],col[2],col[3]);
  let c = [(getSliderChild(0).children[0].offsetLeft-3)/80*360,(getSliderChild(1).children[0].offsetLeft-3)/80*100,(getSliderChild(2).children[0].offsetLeft-3)/80*100];
  let p = colorArea.fget(c);
  //let d = (100-c[2])/50*40;
  //if(c[0] < 0) c[0] += 360;
  //let a = c[0]*Math.PI/180;
  //cw_xy.x = Math.cos(a)*d;
  //cw_xy.y = Math.sin(a)*d;
  cw_xy.x = p[0];
  cw_xy.y = p[1];
}
function updateNewCol(col){
  if(col == null) col = color[img.selCol];
  let c = R_G_B_AtoH_S_L_A(col[0],col[1],col[2],col[3]);
  let d = (100-c[2])/50*40;
  if(c[0] < 0) c[0] += 360;
  let a = c[0]*Math.PI/180;
  cw_xy.x = Math.cos(a)*d;
  cw_xy.y = Math.sin(a)*d;
  updateAllSliders(c);
  updateColorCur();
}
function updateSlider(useX=true){
  if(dragSlider != -1){
    let s = getSliderChild(dragSlider);
    let c = s.children[0];
    let mx1 = mx;//parseFloat(s.children[0].style.marginLeft.replace("px",""));//mx;
    let x = mx1-s.parentNode.parentNode.parentNode.offsetLeft-103;
    if(x < 0) x = 0;
    else if(x > 80) x = 80;
    //let mcol = color[img.selCol];
    //let col = R_G_B_AtoH_S_L_A(mcol[0],mcol[1],mcol[2],mcol[3]);
    let isHSL = [0,1,2,6].includes(dragSlider);
    let col = (isHSL?getHSLA():color[img.selCol]);
    let v = 0;
    if(useX) switch(dragSlider){
      case 0: //Hue
        v = x/80*360;
        col[0] = v;
        if(colorArea.hueRedraw) initColorArea(colorArea);
      break;
      case 1: //Sat
        v = x/80*100;
        col[1] = v;
      break;
      case 2: //Lightness
        v = x/80*100;
        col[2] = v;
      break;
      case 3:
        v = x/80*255;
        col[0] = v;
      break;
      case 4:
        v = x/80*255;
        col[1] = v;
        break;
      case 5:
        v = x/80*255;
        col[2] = v;
        //updateSliderVisuals(true);
        break;
      case 6: //Opacity
        v = x/80*255;
        col[3] = v;
        //updateSliderVisuals(true);
      break;
    }
    if(isHSL){
      color[img.selCol] = H_S_L_AtoR_G_B_A(col[0],col[1],col[2],col[3]);
      setSlider(3,color[img.selCol][0]);
      setSlider(4,color[img.selCol][1]);
      setSlider(5,color[img.selCol][2]);
    }
    else updateNewCol(color[img.selCol]);
    if(useX) c.style.marginLeft = x+"px";
    c.parentNode.parentNode.children[1].value = Math.floor(v);
    updateCol();
    updateColorCur();
    if(!isHSL){
      if(colorArea.hueRedraw) initColorArea(colorArea);
    }
  }
}
function setSlider(i,v){
  let s = getSliderChild(i);
  let c = s.children[0];
  switch(i){
    case 0: //Hue
      c.style.marginLeft = (v/360*80)+"px";
    break;
    case 1: //Sat
      c.style.marginLeft = (v/100*80)+"px";
    break;
    case 2: //Lightness
      c.style.marginLeft = (v/100*80)+"px";
    break;
    case 3: //Red
      c.style.marginLeft = (v/255*80)+"px";
    break;
    case 4: //Green
      c.style.marginLeft = (v/255*80)+"px";
    break;
    case 5: //Blue
      c.style.marginLeft = (v/255*80)+"px";
    break;
    case 6: //Alpha
      c.style.marginLeft = (v/255*80)+"px";
    break;
  }
  c.parentNode.parentNode.children[1].value = Math.floor(v);
}
function getSliderChild(i){
  // return sliders.children[i];
  return sliders.children[i].children[0];
}
function getHSLA(){
  return [(getSliderChild(0).children[0].offsetLeft-3)/80*360,(getSliderChild(1).children[0].offsetLeft-3)/80*100,(getSliderChild(2).children[0].offsetLeft-3)/80*100,color[img.selCol][3]];
}
function getHSLA_i(i){
  switch(i){
    case 0:
      return (getSliderChild(0).children[0].offsetLeft-3)/80*360;
    case 1:
      return (getSliderChild(1).children[0].offsetLeft-3)/80*100;
    case 2:
      return (getSliderChild(2).children[0].offsetLeft-3)/80*100
  }
}
function updateSliderVisuals(hslOnly=false){
  let c = getHSLA();
  let c2 = color[img.selCol];
  let a = c[3]/255;
  for(let i = 0; i < sliders.children.length; i++){
    let ss = getSliderChild(i).children[1];
    //if(hslOnly) if(i == 3 || i == 4 || i == 5) continue;
    switch(i){
      case 0:
        //s.style.backgroundImage = `linear-gradient(to right,hsl(45,100%,50%),green)`;
        //let cc = color[img.selCol];
        //let c = R_G_B_AtoH_S_L_A(cc[0],cc[1],cc[2],cc[3]);
        let s = c[1];
        let l = c[2];
        ss.style.backgroundImage = `linear-gradient(to right,
          hsl(${0},${s}%,${l}%),
          hsl(${60},${s}%,${l}%),
          hsl(${120},${s}%,${l}%),
          hsl(${180},${s}%,${l}%),
          hsl(${240},${s}%,${l}%),
          hsl(${300},${s}%,${l}%),
          hsl(${360},${s}%,${l}%)
        )`;
      break;
      case 1:
        ss.style.backgroundImage = `linear-gradient(to right,
          hsl(${c[0]},0%,${c[2]}%),
          hsl(${c[0]},100%,${c[2]}%)
        )`;
      break;
      case 2:
        ss.style.backgroundImage = `linear-gradient(to right,
          hsl(${c[0]},${c[1]}%,0%),
          hsl(${c[0]},${c[1]}%,50%),
          hsl(${c[0]},${c[1]}%,100%)
        )`;
      break;
      case 3:
        ss.style.backgroundImage = `linear-gradient(to right,
          rgb(0,${c2[1]},${c2[2]}),
          rgb(255,${c2[1]},${c2[2]})
        )`;
      break;
      case 4:
        ss.style.backgroundImage = `linear-gradient(to right,
          rgb(${c2[0]},0,${c2[2]}),
          rgb(${c2[0]},255,${c2[2]})
        )`;
      break;
      case 5:
        ss.style.backgroundImage = `linear-gradient(to right,
          rgb(${c2[0]},${c2[1]},0),
          rgb(${c2[0]},${c2[1]},255)
        )`;
      break;
      case 6:
        ss.style.backgroundImage = `linear-gradient(to right,
          rgba(0,0,0,0),
          hsla(${c[0]},${c[1]}%,${c[2]}%,${1})
        )`;
      break;
    }
  }
}
function updateCW(){
  cw_xy.x = mx-(cw.parentNode.parentNode.offsetLeft)-47;
  cw_xy.y = my-(cw.parentNode.parentNode.offsetTop)-75;
  updateColorCur();
  let hslc;
  let c = colorArea.f(cw_xy.x/40*50,cw_xy.y/40*50);
  if(c[4] == 1){
    hslc = c;
    c = H_S_L_AtoR_G_B_A(c[0],c[1],c[2],c[3]);
  }
  else hslc = R_G_B_AtoH_S_L_A(c[0],c[1],c[2],c[3]);
  color[img.selCol][0] = c[0];
  color[img.selCol][1] = c[1];
  color[img.selCol][2] = c[2];
  
  updateAllSliders(hslc);
}
function updateAllSliders(hslc){
  let rgb = H_S_L_AtoR_G_B_A(hslc[0],hslc[1],hslc[2],color[img.selCol][3]);
  setSlider(0,hslc[0]);
  setSlider(1,hslc[1]);
  setSlider(2,hslc[2]);
  setSlider(3,rgb[0]);
  setSlider(4,rgb[1]);
  setSlider(5,rgb[2]);
  setSlider(6,color[img.selCol][3]);
}
let sliders = document.getElementById("sliders");
for(let i = 0; i < sliders.children.length; i++){
  let s = getSliderChild(i);
  let c = s.children[0];
  s.onmousedown = function(){
    dragging = true;
    dragSlider = i;
    updateSlider();
  };
}
function switchColorArea(i){
  switch(i){
    case 0:
      colorArea = colorAreas.basic;
    break;
    case 1:
      colorArea = colorAreas.linear;
    break;
  }
  initColorArea(colorArea);
  updateCol();
  updateColorCur();
}

//initColorArea(colorAreas.linear);

function getLastIndexOf(s,v){
  let j = -1;
  for(let i = 0; i < s.length; i++){
    if(s[i] == v) j = i;
  }
  return j;
}
function getFileExt(s){
  let ind = getLastIndexOf(s,".");
  if(ind == -1) return null;
  let str = s.substring(ind+1,s.length);
  return str;
}

//FILE SYSTEM
function updateFileName(p){
  if(p == null) p = project;
  let name = p.name;

  let ext = getFileExt(name);
  // console.log("EXT: "+ext);
  if(!ext){
    if(!p.legacyName){
      ext = ".nbg";
      name += ext;
    }
  }
  else if(p.legacyName){
    p.name = p.name.replace(".lnbg","");
    name = p.name;
  }

  if(p.unsaved) name += "*";

  fileName_l.innerHTML = name;
  let projI = allProjects.indexOf(p);
  nameDiv.children[projI].innerHTML = name;
}
function printFileList(){
  let s = "";
  let ar = JSON.parse(window.localStorage.getItem("files"));
  if(!ar){
    window.localStorage.setItem("files","[]");
    ar = [];
  }
  for(let i = 0; i < ar.length; i++){
    console.log(i+": ",ar[i]);
    s += (i+": "+ar[i]+"\n");
  }
  if(ar.length == 0){
    console.log("No files.");
    s = "No files."
  }
  return s;
}
function getFileType(){
  let i = 0;
  for(let j = project.name.length-1; j >= 0; j--){
    if(project.name[j] == "."){
      i = j;
      break;
    }
  }
  return project.name.substring(i+1,project.name.length);
}
function getFileStr(){
  let pallet = [];
  let fstr = "";
  let f_head = "";
  f_head += project.name+",";
  f_head += project.w+",";
  f_head += project.h+",";
  f_head += "1,"; //format, 1 is current format
  f_head += project.frameI+",";
  f_head += project.c1.toString().replace("/g/,","|");
  f_head += "\n";
  // console.log(f_head);
  for(let i = 0; i < project.frames.length; i++) f_head += project.frames[i].curLayer.ind+(i+1<project.frames.length?",":"");
  f_head += "\n";
  let f_frames = [];
  for(let j = 0; j < project.frames.length; j++){
    let frame = project.frames[j];
    for(let i = 0; i < frame.layers.length; i++){
      let l = frame.layers[i];
      let lp = "";
      let donob = true;
      if(l.ops.obj) donob = false;
      if(donob) for(let k = 0; k < nob.size; k += 4){
        let r = l.nob.buf[k];
        let g = l.nob.buf[k+1];
        let b = l.nob.buf[k+2];
        let a = l.nob.buf[k+3];
        if(a != 0) {
          let s = "";
          r = r.toString(16);
          if(r.length == 1) r = "0"+r;
          g = g.toString(16);
          if(g.length == 1) g = "0"+g;
          b = b.toString(16);
          if(b.length == 1) b = "0"+b;
	        let la = a;
          a = a.toString(16);
          if(a.length == 1) a = "0"+a;
          s += r;
          s += g;
          s += b;
          if(la != 255) s += a;

          let s2 = s;
          if(!pallet.includes(s)) pallet.push(s);
          let pI = pallet.indexOf(s);
          let loc = ";"+pI+":";
          if(!lp.includes(loc)) lp += loc;
          let ppI = lp.indexOf(loc)+loc.length;
          let ind = Math.floor(k/4).toString(36);
          lp = lp.slice(0,ppI)+ind+","+lp.slice(ppI);
        }
      }
      while(lp.includes(",;")) lp = lp.replace(",;",";");
      if(lp[0] == ";") lp = lp.substring(1,lp.length);
      if(lp[lp.length-1] == ",") lp = lp.substring(0,lp.length-1);
      let str2 = "layer\n";
      str2 += i+","+j+"\n";
      str2 += l.name+"\n";
      str2 += lp+"\n";
      str2 += l.visible+"\n";
      if(l.ops){
        if(l.ops.obj){
          str2 += "#\n";
          str2 += "obj\n";
          str2 += l.ops.obj.name+"\n";
          str2 += l.ops.obj.getState()+"\n";
          //str2 += l.ops.obj.name+"\n";
          //str2 += l.ops.obj.x+","+l.ops.obj.y+"\n";
        }
      }
      f_frames.push(str2);
    }
  }
  let f_objs = [];
  for(let i = 0; i < project.objs.length; i++){
    let o = project.objs[i];
    let s2 = "obj\n"+o.type+"\n"+o.getState()+"\n";
    f_objs.push(s2);
  }
  fstr += f_head;
  for(let i = 0; i < pallet.length; i++) fstr += pallet[i]+(i+1<pallet.length?",":"");
  fstr += "\n@\n";
  for(let i = 0; i < f_frames.length; i++){
    let str = f_frames[i];
    fstr += str+"@\n";
  }
  for(let i = 0; i < f_objs.length; i++){
    let str = f_objs[i];
    fstr += str+"@\n";
  }
  return fstr;
}

let autoSaveTimeout = null;
function autoSaveF(){
  if(project.handle || project.legacyName){
    file_save();
  }
  if(!autoSave) return;
  autoSaveTimeout = setTimeout(function(){
    autoSaveF();
  },7000);
}
async function file_save(){
  keys.s = false;

  if(project.legacyName){
    // console.log("Saving by legacy system...");
    let name = project.legacyName;
    if(!JSON.parse(window.localStorage.getItem("files")).includes(name)){
      let ar = JSON.parse(window.localStorage.getItem("files"));
      if(!ar) ar = [];
      ar.push(name);
      window.localStorage.setItem("files",JSON.stringify(ar));
      // localStorage["file."+name+".lnbg"] = res;
    }
    localStorage["file."+name+".lnbg"] = getFileStr();
    project.unsaved = false;
    updateFileName();
    return;
  }

  let newHandle = project.handle;
  if(!newHandle){
    file_saveAs();
    return;
  }
  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  let type = getFileType();
  console.log("Saving as type: ",type);
  let blob = null;
  switch(type){
    case "png":
      console.log("saving as png...");
      blob = await new Promise(resolve => can.toBlob(resolve,"image/png"));
      //new Blob([nob.buf.buffer],{type:"application/octet-stream"});
      break;
    default:
      let blob2 = await new Promise(resolve => can.toBlob(resolve,"image/png"));
      console.log(blob2);
      //

      let str = getFileStr();
      //console.log("str","*pre:"+str);
      blob = new Blob([str],{type:"text/plain"});
  }

  project.unsaved = false;
  updateFileName();

  // write our file
  if(blob) await writableStream.write(blob);

  // close the file and write the contents to disk.
  await writableStream.close();
}
async function file_saveAs(){
  const newHandle = await window.showSaveFilePicker({
    id:"save",
    types:[{
      description:"Nobsin Graphic",
      accept:{"image/nbg":[".nbg"]}
    },{
      description:"PNG Image",
      accept:{"image/png":[".png"]}
    }],
    suggestedName:project.name+(project.name.includes(".")?"":".nbg")
  });
  project.handle = newHandle;
  project.name = newHandle.name;

  project.legacyName = null; //forces legacy files to become NBGs
  file_save();
}
async function file_exportAs(){
  let tCan = document.createElement("canvas");
  tCan.width = project.w*project.frames.length;
  tCan.height = project.h;
  let tCtx = tCan.getContext("2d");
  let n = new NobsinCtx(tCtx);
  n.buf = new Uint8ClampedArray(n.size);
  for(let i = 0; i < project.frames.length; i++){
    let n1 = rasterizeFrame(i,1,true);
    n.drawImage_basic(fromNob(n1),project.w*i,0);
  }

  tCtx.putImageData(new ImageData(n.buf,n.width,n.height),0,0);

  const h = await window.showSaveFilePicker({
    id:"export",
    types:[{
      description:"Images",
      accept:{
        //"image/nbg":[".nbg"],
        "image/png":[".png"]
      }
    }],
    suggestedName:project.name.replace(".nbg","")+(project.name.endsWith(".png")?"":".png")
  });
  
  const writableStream = await h.createWritable();
  let blob = await new Promise(resolve => tCan.toBlob(resolve,"image/png"));

  if(blob) await writableStream.write(blob);
  await writableStream.close();
}
function file_export(){
  alert("WIP - not started");
}
var dum = document.createElement("canvas");
var dumCtx = dum.getContext("2d");
function file_import(){
  //from https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  let inp = document.createElement("input");
  inp.type = "file";
  inp.onchange = function(e){
    if(!this.files.length){
      //fileList.innerHTML = "<p>No files selected!</p>";
    }
    else{
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
  
        const img1 = document.createElement("img");
        img1.src = URL.createObjectURL(file);
        img1.height = 60;
        console.log("FILE***:",file);
        let name = file.name;
        img1.onload = function() {
          frames_d.innerHTML = "";
          layers_d.innerHTML = "";

          dum.width = project.w;
          dum.height = project.h;
          dumCtx.clearRect(0,0,project.w,project.h);
          dumCtx.drawImage(this,0,0);
          let data = dumCtx.getImageData(0,0,project.w,project.h).data;

          let l = createLayer_bare(img.curLayer.ind+1,name,false);
          img.layers.splice(img.curLayer.ind+1,0,l);
          l.nob.buf = cloneBuf(data,l.nob.size);
          img.curLayer = l;

          _histAdd(HistIds.full,null,"Import File");
          URL.revokeObjectURL(this.src);
          reconstructFramesDiv();
          reconstructLayersDiv();
          return;
          /*project = createNewProject(name,parseInt(this.naturalWidth),parseInt(this.naturalWidth));
          project.handle = null;
          resizeImage(project.w,project.h);
          dum.width = project.w;
          dum.height = project.h;
          dumCtx.clearRect(0,0,project.w,project.h);
          dumCtx.drawImage(this,0,0);
          let data = dumCtx.getImageData(0,0,project.w,project.h).data;
          let f = createFrame(0,true);
          f.layers = [];
          let l = createLayer_bare(0,"Main",false);
          project.frames[0].layers.splice(0,0,l);
          project.frameI = 0;
          f.layers[0].nob.buf = cloneBuf(data,f.layers[0].nob.size);
          project.frames[0].curLayer = f.layers[0];
          selectLayer_bare(0);

          reconstructFramesDiv();
          updateFramesDiv();
          reconstructLayersDiv();
          updateLayersDiv();
          project.hist = [];
          project.histI = -1;
          reconstructHistDiv_new();
          loadFrame(project.frames[project.frameI],true);
          _histAdd(HistIds.full,null,"Open File");

          URL.revokeObjectURL(this.src);*/
        }
      }
    }
  };
  inp.click();
}
function openFileBase(e,type,fd_name,fileHandle){
  frames_d.innerHTML = "";
  layers_d.innerHTML = "";
  // console.log("LOADING TYPE: ",type);
  let secs = e.split("@\n");
  let head = secs[0].split("\n");
  let info = head[0].split(",");
  let frames = head[1].split(",");
  let pallet = head[2].split(",");
  let ppal = [];
  for(let i = 0; i < pallet.length; i++) ppal[i] = hexToR_g_b_a(pallet[i]);
  project = createNewProject(fd_name,parseInt(info[1]),parseInt(info[2]));
  addProject(project);
  project.handle = fileHandle;
  console.log(fileHandle);
  resizeImage(project.w,project.h);
  for(let i = 0; i < frames.length; i++){
    let f = createFrame(i,true);
    f.layers = [];
  }
  project.frameI = parseInt(info[4]);
  if(project.frameI >= project.frames.length) project.frameI = 0;
  for(let si = 1; si < secs.length; si++){
    let sec = secs[si];
    let lines = sec.split("\n");
    let id = lines[0];
    switch(id){
      case "obj":{
        let type = parseInt(lines[1]);
        let state = lines[2];
        if(type == ObjType.test){
          let a = new TestObj("-.-",0,0,ObjType.test);
          a.loadState(state);
          project.objs.push(a);
          console.log("NEW OBJ:",a);
        }
        else if(type == ObjType.arm){ //Armature
          let a = new Armature(0,"-.-");
          a.loadState(state);
          project.objs.push(a);
        }
        else if(type == ObjType.img){ //Img
          let a = new ImgObj("-.-",0,0);
          state += "\n"+lines[3];
          console.log("STATE: ",state);
          a.loadState(state);
          project.objs.push(a);
        }
        else console.warn("UNKNOWN OBJ TYPE while loading");
      } break;
    }
  }
  for(let si = 1; si < secs.length; si++){
    let sec = secs[si];
    let lines = sec.split("\n");
    let id = lines[0];
    switch(id){
      case "layer":
        let ids = lines[1].split(",");
        let ind = parseInt(ids[0]);
        let fi = parseInt(ids[1]);
        let l = createLayer_bare(ind,lines[2],false);
        project.frames[fi].layers.splice(ind,0,l);
        if(frames[fi] == ind) project.frames[fi].curLayer = l;
        let data = lines[3].split(";");
        for(let i = 0; i < data.length; i++){
          let sep = data[i].split(":");
          if(sep.length == 1) continue;
          let pal = parseInt(sep[0]);
          let col = ppal[pal];
          let list = sep[1].split(",");
          for(let j = 0; j < list.length; j++){
            let sind = list[j];
            if(sind.length == 0) continue;
            let vi = parseInt(sind,36)*4;
            l.nob.buf[vi] = col[0];
            l.nob.buf[vi+1] = col[1];
            l.nob.buf[vi+2] = col[2];
            l.nob.buf[vi+3] = col[3];
          }
        }
        l.visible = lines[4]?(lines[4]=="true"?true:false):true;
        if(sec.includes("#")){
          let hash = sec.split("#\n")[1];
          let hl = hash.split("\n");
          if(hl[0] == "obj"){
            let refId = hl[1];
            let ref = null;
            for(let j = 0; j < project.objs.length; j++){
              let o1 = project.objs[j];
              if(o1.name == refId){
                ref = o1;
                break;
              }
            }
            if(!ref){
              console.warn("Wanted to load obj but couldn't find ref");
            }
            l.ops.obj = ref.clone();
            if(hl[3]) hl[2] += "\n"+hl[3];
            l.ops.obj.loadState(hl[2]);
            // let pos = hl[3];
            // if(pos){
            //   pos = pos.split(",");
            //   l.ops.obj.x = parseFloat(pos[0]);
            //   l.ops.obj.y = parseFloat(pos[1]);
            // }
          }
        }
        break;
      case "frame":
        break;
    }
  }
  for(let i = 0; i < project.frames.length; i++){
    if(!project.frames[i].curLayer) project.frames[i].curLayer = project.frames[i].layers[0];
  }
  reconstructFramesDiv();
  updateFramesDiv();
  reconstructLayersDiv();
  updateLayersDiv();
  project.hist = [];
  project.histI = -1;
  reconstructHistDiv_new();
  loadFrame(project.frames[project.frameI],true);
  _histAdd(HistIds.full,null,"Open File");

  project.unsaved = false;
  updateFileName();
  reloadObjsList();
}
async function file_open(){
  // open file picker
  [fileHandle] = await window.showOpenFilePicker({
    id:"open",
    types:[{
      description:"Images",
      accept:{
        "image/nbg":[".nbg",".nbg2"],
        "image/png":[".png"],
        "image/jpg":[".jpg"]
      }
    }]
  });

  // get file contents
  const fileData = await fileHandle.getFile();
  console.log(fileData.name);
  let _namel = fileData.name.split(".");
  let type = _namel[_namel.length-1];
  switch(type){
    case "nbg2":{
      fileData.text().then(e=>{
        console.log("--NBG2-- READING:::",e);

        let a = Int8Array.from(Array.from(e).map(letter => letter.charCodeAt(0)-32));
        console.log(a);
      });
      //fileData.arrayBuffer().then(e1=>{
        //let e = new Int8Array(e1);
        //console.log("--NBG2-- READING:::",e);
        //var blob = new Blob([e], {type: 'image/png'});
        //var url = URL.createObjectURL(blob);
        //var img = new Image;
        //document.body.appendChild(img);
        //img.style = `position:absolute;left:200px;top:200px;width:100px;height:100px;`;
      //});
    } break;
    case "nbg":{
      fileData.text().then(e=>{
        openFileBase(e,type,fileData.name,fileHandle);
      });
    } break;
    case "png":
    case "jpg":
      {
      console.log("FILE2***:",fileData);
      let file = fileData;

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      //console.log("FILE***:",file);
      let name = file.name;
      img.onload = function() {
        frames_d.innerHTML = "";
        layers_d.innerHTML = "";

        project = createNewProject(name,parseInt(this.naturalWidth),parseInt(this.naturalHeight));
        addProject(project);
        project.handle = fileHandle;
        resizeImage(project.w,project.h);
        dum.width = project.w;
        dum.height = project.h;
        dumCtx.clearRect(0,0,project.w,project.h);
        dumCtx.drawImage(this,0,0);
        let data = dumCtx.getImageData(0,0,project.w,project.h).data;
        let f = createFrame(0,true);
        f.layers = [];
        let l = createLayer_bare(0,"Main",false);
        project.frames[0].layers.splice(0,0,l);
        project.frameI = 0;
        f.layers[0].nob.buf = cloneBuf(data,f.layers[0].nob.size);
        project.frames[0].curLayer = f.layers[0];
        selectLayer_bare(0);

        reconstructFramesDiv();
        updateFramesDiv();
        reconstructLayersDiv();
        updateLayersDiv();
        project.hist = [];
        project.histI = -1;
        reconstructHistDiv_new();
        loadFrame(project.frames[project.frameI],true);
        _histAdd(HistIds.full,null,"Open File");

        project.unsaved = false;
        updateFileName();

        URL.revokeObjectURL(this.src);
      }
      return;
      fileData.arrayBuffer().then(e1=>{
        let e = new Int8Array(e1);
        console.log("READING:::",e);
        var blob = new Blob([e], {type: 'image/png'});
        var url = URL.createObjectURL(blob);
        var img = new Image;
        document.body.appendChild(img);
        img.style = `position:absolute;left:200px;top:200px;width:100px;height:100px;`;
        img.onload = function(){
          frames_d.innerHTML = "";
          layers_d.innerHTML = "";

          project = createNewProject(fileData.name,parseInt(this.naturalWidth),parseInt(this.naturalWidth));
          project.handle = fileHandle;
          resizeImage(project.w,project.h);
          dum.width = project.w;
          dum.height = project.h;
          dumCtx.clearRect(0,0,project.w,project.h);
          dumCtx.drawImage(this,0,0);
          let data = dumCtx.getImageData(0,0,project.w,project.h).data;
          console.log("CTXDATA:",data);
          let f = createFrame(0,true);
          f.layers = [];
          let l = createLayer_bare(0,"Main",false);
          project.frames[0].layers.splice(0,0,l);
          project.frameI = 0;
          f.layers[0].nob.buf = data;
          //f.layers[0].nob.buf = cloneBuf(data,f.layers[0].nob.size);
          //f.layers[0].nob.buf = new Uint8ClampedArray(f.layers[0].nob.size);
          //f.layers[0].nob.dep = new Uint8ClampedArray(f.layers[0].nob.ssize);
          project.frames[0].curLayer = f.layers[0];
          selectLayer_bare(0);

          reconstructFramesDiv();
          updateFramesDiv();
          reconstructLayersDiv();
          updateLayersDiv();
          project.hist = [];
          project.histI = -1;
          reconstructHistDiv_new();
          loadFrame(project.frames[project.frameI],true);
          _histAdd(HistIds.full,null,"Open File");
          URL.revokeObjectURL(url);
          document.body.removeChild(this);
        };

        /*img.onload = function() {
          console.log("bob");
          project = createNewProject(fileData.name,parseInt(this.width),parseInt(this.height));
          project.handle = fileHandle;
          resizeImage(project.w,project.h);
          let dum = document.createElement("canvas");
          dum.width = project.w;
          dum.height = project.h;
          let dumCtx = dum.getContext("2d");
          dumCtx.drawImage(this,0,0);
          let data = dumCtx.getImageData(0,0,project.w,project.h).data;
          console.log(data);
          let f = createFrame(0,true);
          f.layers = [];
          let l = createLayer_bare(0,"Main",false);
          project.frames[0].layers.splice(0,0,l);
          project.frameI = 0;
          f.layers[0].nob.buf = cloneBuf(data,f.layers[0].nob.size);
          URL.revokeObjectURL(url);
        };*/
        img.src = url;
      });
    } break;
    default:
      alert("Whatever file type of the image you choose is not supported currently.");
  }
  //console.log("UNSAVED");
  //project.unsaved = false;
  //updateFileName();
}
function saveFile_bare(name,isExport=false){
  let pallet = [];
  let fstr = "";
  let f_head = "";
  f_head = "head\n";
  f_head += project.name+",";
  f_head += project.w+",";
  f_head += project.h+",";
  f_head += "1,"; //format, 1 is current format
  f_head += project.frameI+"\n";
  let data = {
    w:project.w,h:project.h,name:project.name,
    frames:[],
    frameI:project.frameI,
    format:1, //null is original, 1 is efficient
    /*curLayer:img.curLayer.ind,
    layers:[],
    layerNames:[]*/
    p:""
  };
  let f_frames = [];
  for(let j = 0; j < project.frames.length; j++){
    let frame = project.frames[j];
    data.frames.push({
      curLayer:frame.curLayer.ind,
      layers:[],
      layerNames:[]
    });
    //let f_names = "";
    let str = "";
    str = "frame\n";
    str += j+","+frame.curLayer.ind+"\n";
    f_frames.push(str);
    for(let i = 0; i < frame.layers.length; i++){
      let l = frame.layers[i];
      let buf = "";
      let lastS = "";
      let lp = "";
      for(let k = 0; k < nob.size; k += 4){
        let r = l.nob.buf[k];
        let g = l.nob.buf[k+1];
        let b = l.nob.buf[k+2];
        let a = l.nob.buf[k+3];
        if(a == 0){
          buf += "0";
          if(l.nob.buf[k+7] != 0) buf += ",";
        }
        else{
          let s = "";
          r = r.toString(16);
          if(r.length == 1) r = "0"+r;
          g = g.toString(16);
          if(g.length == 1) g = "0"+g;
          b = b.toString(16);
          if(b.length == 1) b = "0"+b;
          a = a.toString(16);
          if(a.length == 1) a = "0"+a;
          s += r;
          s += g;
          s += b;

          let s2 = s;
          if(a != "ff") s2 += a;
          if(!pallet.includes(s)) pallet.push(s);
          let pI = pallet.indexOf(s);
          let loc = ";"+pI+":";
          if(!lp.includes(loc)) lp += loc;
          let ppI = lp.indexOf(loc)+loc.length;
          let ind = Math.floor(k/4).toString(36);
          lp = lp.slice(0,ppI)+ind+","+lp.slice(ppI);

          /*if(lastS != s){
            lastS = s;
            buf += s;
          }
          else buf += "1";
          
          if(a != "ff") buf += a;
          if(k < nob.size-4) buf += ",";*/
        }
      }
      //data.frames[j].layers.push(l.nob.buf);
      //data.frames[j].layers.push(buf);
      
      data.frames[j].layerNames.push(l.name);
      if(lp[0] == ";") lp = lp.substring(1,lp.length);
      if(lp[lp.length-1] == ",") lp = lp.substring(0,lp.length-1);
      let str2 = "layer\n";
      str2 += i+","+j+"\n";
      str2 += l.name+"\n";
      str2 += lp+"\n";
      f_frames.push(str2);
      //f_names += l.name;
      //if(i != frame.layers.length-1) f_names += "&";
    }
    //f_frames += f_names;
    //f_frames += "\n";
    //f_frames += data.p;
  }
  fstr += f_head;
  fstr += "@\n";
  for(let i = 0; i < f_frames.length; i++){
    let str = f_frames[i];
    fstr += str+"@\n";
  }
  //fstr += "@\n";
  //fstr += f_frames;
  let times = 0;
  while(times < 10 && data.p.includes(",;")){
    data.p = data.p.replace(",;",";");
    //times++;
  }
  data.pal = pallet.toString();
  if(data.p[0] == ";") data.p = data.p.substring(1,data.p.length);
  if(data.p[data.p.length-1] == ",") data.p = data.p.substring(0,data.p.length-1);
  console.log("Saved File Size: ",JSON.stringify(data).length*4,data);
  console.log("Saved FSTR:","*pre:"+fstr);
  if(isExport){
    project.name = name;
    data.name = name;
    download(name+".nbg",JSON.stringify(data));
    fileName_l.innerHTML = name;
    return true;
  }
  window.localStorage.setItem("file."+name+".nbg",JSON.stringify(data));
  project.name = name;
  fileName_l.innerHTML = name;
  return true;
}
function saveFile(){
  let name = project.name;
  let f = window.localStorage.getItem("files");
  if(!f) f = [];
  if(!JSON.parse(f).includes(name)){
    openMenu("saveAsFile");
    //saveAsFile();
    return;
  }
  saveFile_bare(name);
  console.log("Save success");
}
function saveAsFile_bare(name){
  let isExport = document.getElementById("saveAs_isExport").checked;
  if(isExport){
    saveFile_bare(name,true);
    return;
  }
  if(!JSON.parse(window.localStorage.getItem("files")).includes(name)){
    let ar = JSON.parse(window.localStorage.getItem("files"));
    if(!ar) ar = [];
    ar.push(name);
    window.localStorage.setItem("files",JSON.stringify(ar));
    saveFile_bare(name);
    return true;
  }
  else if(false){
    if(!confirm("File already exists. Overrite?")) return false;
    else return saveFile_bare(name);
  }
}
function saveAsFile(){
  let name = prompt(printFileList(),project.name);
  if(!confirm("Confirm?")) return;
  saveAsFile_bare(name);
  alert("File successfully saved!");
}
let sel2Frames = [];
function highlightFrame(i){
  let tframe = frames_d.children[i];
  if(sel2Frames.includes(i)){
    sel2Frames.splice(sel2Frames.indexOf(i),1);
    tframe.classList.remove("sel2");
    return;
  }
  if(!sel2Frames.length){
    sel2Frames.push(i);
    console.log("ADDED");
  }
  else if(sel2Frames[0] > i){
    sel2Frames.splice(0,0,i);
    console.log("ADDED");
  }
  else if(sel2Frames[sel2Frames.length-1] < i){
    sel2Frames.push(i);
    console.log("ADDED");
  }
  else for(let j = 0; j < sel2Frames.length; j++){
    let jj = sel2Frames[j];
    if(i < jj){
      sel2Frames.splice(j,0,i);
      console.log("ADDED");
      break;
    }
  }
  tframe.classList.add("sel2");
}
function updateFramesDiv(){
  for(let i = 0; i < project.frames.length; i++){
    let d = frames_d.children[i];
    if(i == project.frameI) d.classList.add("sel");
    else d.classList.remove("sel");
    d.children[0].children[0].innerHTML = i+1;
    d.children[1].onmousedown = function(){
      if(g_keye.shiftKey){
        highlightFrame(i);
        return;
      }
      for(let j = 0; j < sel2Frames.length; j++){
        let dd = frames_d.children[sel2Frames[j]];
        dd.classList.remove("sel2");
      }
      sel2Frames = [];
      if(i != project.frameI){
        project.frameI = i;
        loadFrame(project.frames[project.frameI],false);
      }
    };
  }
}
function loadFrame(data,bare=true){
  img = data;
  hist_d.innerHTML = "";
  layers_d.innerHTML = "";
  /*let size = project.w*project.h*4;
  for(let i = 0; i < data.layers.length; i++){
    //let d = data.layers[i];
    //let l = createLayer_bare(i,data.layerNames[i]||"no name");
    //for(let j = 0; j < size; j++) l.nob.buf[j] = d[j];
  }*/
  //selectLayer_bare(data.curLayer);

  //initColor();

  if(!bare) _histAdd(HistIds.selectFrame,project.frames.indexOf(data));

  //reconstructHistDiv();
  reconstructLayersDiv();
  updateFramesDiv();

  reconstructHistDiv_new();

  //resetView();
  //histAdd_all("Init");
}
function openFile_bare(name,isExport=false){
  if(!isExport){
    let data = window.localStorage.getItem("file."+name+".nbg");
    if(data){
      data = JSON.parse(data);
      openFile_bare_base(name,data);
    }
    else alert("Err: File not found");
  }
  else{
    readFile(function(data){
      openFile_bare_base(data.name,data);
    });
  }
}
function openFile_bare_base(name,data){
  if(!data) return;
    if(data.name != name){
      console.log("warn: glitch discovered with file name, fixing...");
      data.name = name;
    }
    /*hist_d.innerHTML = "";
    layers_d.innerHTML = "";

    img = null;
    project = createNewProject(data.name,data.w,data.h);
    project.frameI = data.frameI;

    //project.name = data.name;
    let size = data.w*data.h*4;

    for(let j = 0; j < data.frames.length; j++){
      let frame = data.frames[j];
      img = createEmptyImage(data.w,data.h);
      img.layers = [];
      for(let i = 0; i < frame.layers.length; i++){
        let d = frame.layers[i];
        let l = createLayer_bare(i,frame.layerNames[i]||"no name");
        for(let j = 0; j < size; j++) l.nob.buf[j] = d[j];
      }
      if(j == data.frameI) selectLayer_bare(frame.curLayer);
    }
    loadFrame(project.frames[project.frameI]);
    initColor();

    resetView();*/
    project.hist = [];
    project.histI = -1;

    img = null;
    frames_d.innerHTML = "";
    layers_d.innerHTML = "";
    hist_d.innerHTML = "";
    let e = data;
    project = createNewProject(e.name,e.w,e.h);
    resizeImage(e.w,e.h);
    for(let a = 0; a < e.frames.length; a++){
      let f = createFrame(a,true);
      f.layers = [];
      img = f;
      project.frameI = a;
      let frame = e.frames[a];
      layers_d.innerHTML = "";
      //f.select = deepClone(frame.select);
      for(let b = 0; b < frame.layers.length; b++){
        let l = createLayer_bare(b,frame.layerNames[b],false);
        f.layers.splice(b,0,l);
        l.nob.buf = cloneBuf(frame.layers[b],nob.size);
        l.ind = b;
      }
      f.curLayer = f.layers[frame.curLayer];
    }
    project.frameI = e.frameI;

    loadFrame(project.frames[project.frameI]);
    selectLayer_bare(e.frames[e.frameI].curLayer);

    _histAdd(HistIds.full,null,"Open image");

    //histAdd_all("Init");
    //alert("Opened successfully!");
}
function openFile(){
  let name = prompt(printFileList(),project.name);
  openFile_bare(name);
}

//MENUS
function areMenusOpen(){
  for(let i = 0; i < menus_d.children.length; i++){
    let d = menus_d.children[i];
    if(d.style.visibility == "visible") return true;
  }
  return false;
}
var close_bs = document.getElementsByClassName("closeWindow_b");
for(let i = 0; i < close_bs.length; i++){
  let b = close_bs[i];
  b.onclick = function(){
    this.parentNode.parentNode.style.visibility = "hidden";
    menus_d.style.backgroundColor = "unset";
    menus_d.style.zIndex = 0;
  };
}
var menus_d = document.getElementById("menus");
function reloadRecoveryList(t,v,k){
  let list = v.sessions;
  list.sort((a,b)=>{return b-a});
  let cont = document.createElement("div");
  cont.className = "sub-rcv";
  let listRepeat = [];
  for(let j = 0; j < list.length; j++){
    let str = "rcv@"+list[j]+"@"+k;
    let val = localStorage[str];
    if(listRepeat.includes(val)){
      console.log("Recovery: caught dupe, fixing...");
      delete localStorage[str];
      return;
    }
    else listRepeat.push(val);
    let b = document.createElement("div");
    b.className = "flex";
    b.innerHTML = `<div>#${list[j]} - <span class="prev">${sessionId-list[j]} sessions ago</span></div>
      <div style="margin-left:auto"><button>Open</button><button>Delete</button></div>
    `;
    cont.appendChild(b);
    b.children[1].children[0].onclick = function(){
      openFileBase(localStorage[str],"nbg",k);
      closeAllCtxMenus();
    };
    b.children[1].children[1].onclick = function(){
      if(!confirm("Are you sure?")) return;
      delete localStorage[str];
      initFileRecovery();
      cont.removeChild(b);
      if(false) setTimeout(function(){
        reloadRecoveryList(t,v,k);
      },500);
    };
  }
  t.ref = cont;
  t.parentNode.insertBefore(cont,t.nextElementSibling);
}
function openMenu(id,atr){ //"openFiles"
  let d = document.getElementById("menu_"+id);
  if(d.style.visibility == "visible"){
    d.style.visibility = "hidden";
    menus_d.style.backgroundColor = "unset";
    menus_d.style.zIndex = 0;
    return;
  }
  for(let i = 0; i < menus_d.children.length; i++){
    menus_d.children[i].style.visibility = "hidden";
  }
  d.style.visibility = "visible";
  menus_d.style.backgroundColor = "rgba(0,0,0,0.2)";
  menus_d.style.zIndex = 4;
  let list_d, list;
  switch(id){
    case "recovery":{
      let l = document.getElementById("fileRcv");
      l.innerHTML = "";
      let ok = Object.keys(recoveryFiles);
      for(let i = 0; i < ok.length; i++){
        let k = ok[i];
        let list = [];
        let d = document.createElement("div");
        d.textContent = k;
        d.ref = null;
        d.onclick = function(){
          if(this.ref){
            this.ref.parentNode.removeChild(this.ref);
            this.ref = null;
          }
          else{
            let v = recoveryFiles[k];
            reloadRecoveryList(this,v,k);
          }
        };
        l.appendChild(d);
        if(false) for(let j = 0; j < v.sessions.length; j++){
          let ses = v.sessions[j];
          let ref = "rcv@"+ses+"@"+k;
          list.push(ref);
        }
        if(false) list.sort((a,b)=>{
          let sa = a.split("@");
          let sb = b.split("@");
          return parseInt(sa[1]) - parseInt(sb[1]);
        });
        if(false) for(let j = 0; j < list.length; j++){
          let ref = list[j];
          let data = localStorage[ref];
          let d = document.createElement("div");
          d.ref = ref;
          d.textContent = "asd";
          console.log("LOADED DATA: ",ref);
        }
      }
    } break;
    case "new":{
      let l = document.getElementById("inp_name");
      let j = 0;
      let n = "New Image";
      let list = JSON.parse(window.localStorage.getItem("files"));
      function check(name){
        if(list.includes(name)){
          j++;
          name = "New Image ("+j+")";
          return check(name);
        }
        return name;
      }
      n = check(n);
      l.value = n;
    }
    break;
    case "openFiles":
      list_d = d.children[2];
      list_d.innerHTML = "";
      list = JSON.parse(window.localStorage.getItem("files"));
      // menu_openFiles_footer.children[0].disabled = true;
      if(list) for(let i = 0; i < list.length; i++){
        let l = document.createElement("div");
        l.innerHTML = list[i]+".lnbg";
        l.name = list[i];
        l.onclick = function(){
          for(let i = 0; i < this.parentNode.children.length; i++){
            this.parentNode.children[i].className = "";
          }
          this.className = "sel";
          menu_openFiles_footer.children[0].disabled = false;
        };
        list_d.appendChild(l);
      }
    break;
    case "saveAsFile":
      list_d = d.children[2];
      list_d.innerHTML = "";
      list = JSON.parse(window.localStorage.getItem("files"));
      let submit = menu_saveAsFile_footer.children[1];
      let input = menu_saveAsFile_footer.children[0];
      submit.disabled = true;
      input.value = project.name;
      input.oninput();
      if(list) for(let i = 0; i < list.length; i++){
        let l = document.createElement("div");
        l.innerHTML = list[i]+".nbg";
        l.name = list[i];
        l.onclick = function(){
          for(let i = 0; i < this.parentNode.children.length; i++){
            this.parentNode.children[i].className = "";
          }
          this.className = "sel";
          menu_saveAsFile_footer.children[0].value = this.name;
          menu_saveAsFile_footer.children[0].oninput();
        };
        list_d.appendChild(l);
      }
    break;
    case "manageFiles":
      list_d = d.children[2];
      list_d.style.maxHeight = "50vh";
      list_d.style.overflow = "scroll";
      list_d.innerHTML = "";
      list = JSON.parse(window.localStorage.getItem("files"));
      // menu_openFiles_footer.children[0].disabled = true;
      if(list) for(let i = 0; i < list.length; i++){
        let l = document.createElement("div");
        l.name = list[i];
        let l1 = document.createElement("div");
        l1.style.float = "right";
        l1.className = "flex";
        let s = document.createElement("span");
        s.innerHTML = list[i]+".nbg";
        l.appendChild(s);
        l.appendChild(l1);
        let b = document.createElement("div");
        b.innerHTML = "X";
        b.className = "closeButton";
        let rename = document.createElement("button");
        rename.textContent = "Rename";
        rename.onclick = function(e,skip=false){
          if(!skip) alert("Warning! renaming LNBGs is still experimental and there may be data loss!");
          let t = this;
          function retry(){
            requestAnimationFrame(function(){
              t.onclick(e,true);
            });
          }
          let old = t.parentNode.parentNode.name;
          let name = prompt("Rename file:",old);
          if(!name) return;
          if(name.includes(".")){
            alert("A file name can't contain any of the following symbols: "+wrongSymbols);
            retry();
            return;
          }
          let files = JSON.parse(localStorage.files);
          if(files.includes(name)){
            alert("There is already a file with that name!");
            retry();
            return;
          }
          files[files.indexOf(old)] = name;
          let k = "file."+old+".lnbg";
          let v = localStorage[k];
          localStorage["bak-"+k] = v;
          delete localStorage[k];
          k = "file."+name+".lnbg";
          localStorage[k] = v;

          for(let i = 0; i < allProjects.length; i++){
            let a = allProjects[i];
            if(!a.legacyName) continue;
            console.log("TEST: ",a.legacyName,old,name);
            if(a.legacyName == old){
              a.legacyName = name;
              a.name = name;
              updateFileName(a);
            }
          }
        };
        l1.appendChild(b);
        l1.appendChild(rename);
        b.onclick = function(){
          let name = this.parentNode.name;
          if(confirm("Are you sure you want to delete: "+name+"?")){
            let li = JSON.parse(window.localStorage.getItem("files"));
            li.splice(list.indexOf(name),1);
            window.localStorage.setItem("files",JSON.stringify(li));
          }
        };
        //l.innerHTML = list[i]+".nbg";
        //l.name = list[i];
        //l.onclick = function(){

        //};
        list_d.appendChild(l);
      }
    break;
    case "resize":{
      let prev = d.getElementsByClassName("l_prevInfo")[0];
      prev.innerHTML = `Previous:<br><div style='margin-left:10px'>width: ${project.w}<br>height: ${project.h}</div>`;
      d.getElementsByClassName("inp_width")[0].value = project.w;
      d.getElementsByClassName("inp_height")[0].value = project.h;
    } break;
    case "keys":{
      d_keys_list.innerHTML = "";
      genKeybinds();
    } break;
    case "resizeCanvas":{
      let prev = d.getElementsByClassName("l_prevInfo")[0];
      prev.innerHTML = `Previous:<br><div style='margin-left:10px'>width: ${project.w}<br>height: ${project.h}</div>`;
      let t = d.getElementsByClassName("originTable")[0].children[0];
      var select = [0.5,1];
      const clear = ()=>{
        for(let j = 0; j < 3; j++) for(let i = 0; i < 3; i++) t.children[j].children[i].style = "";
      };
      clear();
      for(let j = 0; j < 3; j++){
        for(let i = 0; i < 3; i++){
          t.children[j].children[i].onclick = function(){
            clear();
            this.style.border = "solid 2px orange";
            select[0] = i/2;
            select[1] = j/2;
          };
        }
      }
      t.children[2].children[1].style.border = "solid 2px orange";
      let but = d.getElementsByClassName("menuFooter")[0].children[0];
      but.onclick = function(){
        let w = d.getElementsByClassName("inp_width")[0].value;
        let h = d.getElementsByClassName("inp_height")[0].value;
        resizeProjectCanvas(w,h,select[0],select[1]);
        openMenu("resizeCanvas");
        closeAllCtxMenus();
      };
    } break;
    case "createExportPreset":{
      let b = d.getElementsByClassName("presetType_b")[0];
      b.load(0);
    } break;
    case "layerSettings":{
      d.lRef = atr;
      let cont = d.getElementsByClassName("content")[0];
      let op = d.getElementsByClassName("options")[0];
      cont.innerHTML = "";
      for(let i = 0; i < op.children.length; i++){
        let o = op.children[i];
        o.style.backgroundColor = "initial";
      }
      d.getElementsByClassName("menuFooter")[0].children[0].onclick = function(){
        deleteLayer(d.lRef);
      };
    } break;
    case "log":{
      // d.children[1].innerHTML = "";
      let go_l = d.getElementsByClassName("go_l")[0];
      let go_r = d.getElementsByClassName("go_r")[0];
      let l_i = d.getElementsByClassName("l_i")[0];
      go_l.onclick = function(){
        if(this.classList.contains("disabled")) return;
        let ind = _chnlogL.indexOf(_chnlog);
        ind--;
        go_l.classList.remove("disabled");
        go_r.classList.remove("disabled");
        if(ind <= 0){
          ind = 0;
          this.classList.add("disabled");
        }
        l_i.textContent = -(_chnlogL.length-1-ind);;
        _chnlog = _chnlogL[ind];
        reload();
      };
      go_r.onclick = function(){
        if(this.classList.contains("disabled")) return;
        let ind = _chnlogL.indexOf(_chnlog);
        ind++;
        go_l.classList.remove("disabled");
        go_r.classList.remove("disabled");
        if(ind >= _chnlogL.length-1){
          ind = _chnlogL.length-1;
          this.classList.add("disabled");
        }
        l_i.textContent = -(_chnlogL.length-1-ind);
        _chnlog = _chnlogL[ind];
        reload();
      };
      l_i.textContent = 0;
      function reload(){
        let s1 = d.children[1].children[0];
        s1.textContent = _chnlog[0];//"Version: "+_ver+" ("+_date+")";
        s1.className = "prev";
        s1.style.marginBottom = "5px";
        let t = d.children[1].children[1].children[0];
        t.innerHTML = "";
        t.className = "cTable";
        for(let i = 0; i < _chnlog.length; i++){
          let tr = document.createElement("tr");
          let s = _chnlog[i];
          tr.innerHTML = `<td>${i}</td><td>${s}</td>`;
          t.appendChild(tr);
          if(s.startsWith("Added")) tr.children[1].style.color = "limegreen";
          else if(s.startsWith("Changed")) tr.children[1].style.color = "orange";
          else if(s.startsWith("Fixed")) tr.children[1].style.color = "dodgerblue";
          else if(s.startsWith("Removed")) tr.children[1].style.color = "red";
        }
      }
      reload();
    } break;
  }
  return d;
}
let newMenuMode = 0;
document.getElementById("menu_new").getElementsByClassName("menuFooter")[0].children[0].onclick = function(){
  let w = parseInt(document.getElementById("inp_width").value);
  let h = parseInt(document.getElementById("inp_height").value);
  let n = document.getElementById("inp_name").value;
  if(newMenuMode == 1){
    let l = JSON.parse(window.localStorage.getItem("files"));
    if(l.includes(n)){
      if(!confirm("There is already a file with that name, if you save you will overrite it. Continue anyway?")) return;
    }
  }
  fileFunc.createNew(n,w,h,newMenuMode);
  this.parentNode.parentNode.style.visibility = "hidden";
  closeAllCtxMenus();
};
document.getElementById("menu_resize").getElementsByClassName("menuFooter")[0].children[0].onclick = function(){
  let w = parseInt(this.parentNode.parentNode.getElementsByClassName("inp_width")[0].value);
  let h = parseInt(this.parentNode.parentNode.getElementsByClassName("inp_height")[0].value);
  resizeProject(w,h);
  openMenu("resize");
  closeAllCtxMenus();
};
var exportPresets = [];
//Layer settings html
const layerData = [
  {
    name:"Brightness / Contrast",
    html:`
      <p>Brightness:</p>
      <div style="display:flex;width:fit-content">
        <input type="range" min="0" max="200" step="1" value="100" oninput="sliderInput(this,100,this.parentNode.children[2],0)">
        <span style="margin:auto">100%</span>
        <div style="visibility:hidden" class="material-icons reset">restart_alt</div>
      </div>
      <br>
      <p>Contrast:</p>
      <div style="display:flex;width:fit-content">
        <input type="range" min="0" max="200" step="1" value="100" oninput="sliderInput(this,100,this.parentNode.children[2],1)">
        <span style="margin:auto">100%</span>
        <div style="visibility:hidden" class="material-icons reset">restart_alt</div>
      </div>
    `
  }
];
function sliderInput(t,def,reset,id){
  if(keys.shift) t.step = 10;
  else t.step = 1;
  t.parentNode.children[1].innerHTML = t.value+'%';
  let layer = project.frames[project.frameI].layers[t.lRef];
  switch(id){
    case 0:
      layer.settings.brightness = t.value/100;
      break;
    case 1:
      layer.settings.contrast = t.value/100;
      break;
  }
  if(t.value != def){
    reset.style.visibility = "unset";
    reset.onclick = function(){
      t.value = def;
      t.oninput();
    };
  }
  else reset.style.visibility = "hidden";
}
function loadLayerSetting(id,lRef){
  let d = document.getElementById("menu_layerSettings");
  var cont = d.getElementsByClassName("content")[0];
  let data = layerData[id];
  if(!data) return;
  cont.innerHTML = data.html;
  let layer = project.frames[project.frameI].layers[lRef];
  switch(id){
    case 0:
      cont.children[1].children[0].lRef = lRef;
      cont.children[1].children[0].value = layer.settings.brightness*100;
      cont.children[1].children[0].oninput();
      cont.children[4].children[0].lRef = lRef;
      cont.children[4].children[0].value = layer.settings.contrast*100;
      cont.children[4].children[0].oninput();
      break;
  }
}
function initMenus(){
  let exportAs = document.getElementById("menu_exportAs");
  let body = exportAs.getElementsByClassName("body")[0];
  let d = createDropdown(0,[
    "Flood","Global","Test 3"
  ],[
    null,
    null,
    null
  ],function(i,d){
    
  },body.children[0].children[1]);

  let createPreset = document.getElementById("menu_createExportPreset");
  createPreset.getElementsByClassName("closeWindow_b")[0].onclick = function(){
    openMenu("exportAs");
    for(let i = 0; i < options.children.length; i++){
      options.children[i].style.visibility = "hidden";
    }
  };
  createPreset.style.visibility = "hidden";
  let options = createPreset.getElementsByClassName("options")[0];
  let presetType = document.getElementsByClassName("presetType_b")[0];
  if(presetType){
    let d = createDropdown(0,[
      "Spritesheet","Individual Frames"
    ],[
      null,
      null
    ],function(i,d){
      for(let i = 0; i < options.children.length; i++){
        options.children[i].style.visibility = "hidden";
      }
      options.children[i].style.visibility = "visible";
    },presetType);
  }

  //

  var layerSet = document.getElementById("menu_layerSettings");
  var layerCont = layerSet.getElementsByClassName("content")[0];
  var layerOp = layerSet.getElementsByClassName("options")[0];
  for(let i = 0; i < layerData.length; i++){
    let d = layerData[i];
    let div = document.createElement("div");
    div.innerHTML = d.name;
    div.onclick = function(){
      for(let j = 0; j < this.parentNode.children.length; j++){
        let c = this.parentNode.children[j];
        c.style.backgroundColor = "initial";
      }
      this.style.backgroundColor = "var(--button-active)";
      loadLayerSetting(i,layerSet.lRef);
    };
    layerOp.appendChild(div);
  }
}
initMenus();
var menu_openFiles_footer = document.getElementById("openFiles_footer");
var menu_saveAsFile_footer = document.getElementById("saveFiles_footer");
menu_saveAsFile_footer.children[0].oninput = function(e){
  if(this.value.length > 0) this.parentNode.children[1].disabled = false;
  else this.parentNode.children[1].disabled = true;
  let d = document.getElementById("save_fileList");
  for(let i = 0; i < d.children.length; i++){
    d.children[i].className = "";
  }
};
menu_openFiles_footer.children[0].onclick = function(){
  if(project.hist.length > 1){
    if(!confirm("All unsaved progress will be lost! Continue?")) return;
  }
  let sel = document.getElementById("open_fileList").getElementsByClassName("sel");
  if(sel.length != 0){
    let name = sel[0].name;
    // openFile_bare(name);
    let k = "file."+name.replace(".lnbg","")+".lnbg";
    if(!localStorage[k]) k = "bak-"+k;
    if(!localStorage[k]){
      alert("FILE NOT FOUND!");
      return;
    }
    openFileBase(localStorage[k],"nbg",name+".lnbg");
    project.legacyName = name.replace(".lnbg","");
    console.log("OPENING FILE: ",name);
    closeAllCtxMenus();
    // document.getElementById("menu_openFiles").style.visibility = "hidden";
  }
};
menu_saveAsFile_footer.children[1].onclick = function(){
  let name = this.parentNode.children[0].value;
  if(name.length != 0){
    let res = getFileStr();//saveAsFile_bare(name);
    if(res){
      console.log("SAVING AS FILE: ",name);
      closeAllCtxMenus();
      if(!JSON.parse(window.localStorage.getItem("files")).includes(name)){
        let ar = JSON.parse(window.localStorage.getItem("files"));
        if(!ar) ar = [];
        ar.push(name);
        window.localStorage.setItem("files",JSON.stringify(ar));
        localStorage["file."+name.replace(".lnbg","")+".lnbg"] = res;
      }
      else if(false){
        if(!confirm("File already exists. Overrite?")) return false;
        else return saveFile_bare(name);
      }
      openFileBase(res,"nbg",name);
      project.legacyName = name;
      updateFileName();
    }
  }
};

//Context menus
var ctxes = document.getElementById("ctxes");
function _loadCtx(id,l,lkey,f,x,y,temp,lvl=0,b){
  if(!temp) closeAllCtxMenus();
  else{
    let dd = document.getElementById("ctx_"+id);
    if(dd){
      dd.parentNode.removeChild(dd);
      return;
    }
  }
  let d = document.createElement("div");
  d.className = "ctxMenu";
  d.id = "ctx_"+id;
  let dl = document.createElement("div");
  dl.className = "ctxList";
  d.appendChild(dl);
  for(let i = 0; i < l.length; i++){
    let s = document.createElement("div");
    let t = document.createElement("span");
    let key = document.createElement("span");
    t.innerHTML = l[i];
    key.innerHTML = lkey[i];
    key.className = "keybind";
    s.appendChild(t);
    if(lkey[i]) s.appendChild(key);
    dl.appendChild(s);
    s.addEventListener("mouseenter",e=>{
      closeAllCtxLowerLvl(lvl);
    });
    f(i,s,lvl);
  }
  ctxes.appendChild(d);
  let width = d.offsetWidth;
  if(x+width > window.innerWidth) x += window.innerWidth-(x+width);
  d.style.marginLeft = x+"px";
  d.style.marginTop = y+"px";
  d.lvl = lvl;
  if(b) d.bRef = b;
  return d;
  /*if(d.offsetLeft+d.offsetWidth > window.innerWidth-10){
    d.style.marginLeft = (x-d.offsetWidth)+"px";
  }*/
}
function closeAllCtxMenus(){
  if(ctxes.children.length){
    let ll = document.getElementsByClassName("ddHolding");
    for(let j = 0; j < ll.length; j++){
      ll[j].classList.remove("ddHolding");
    }
  }
  for(let i = 0; i < ctxes.children.length; i++){
    let d = ctxes.children[i];
    if(d.onclose) d.onclose();
  }
  menus_d.style.backgroundColor = "unset";
  menus_d.style.zIndex = 0;
  ctxes.innerHTML = "";
  label.style.visibility = "hidden";
  let ll = document.getElementsByClassName("menu");
  for(let i = 0; i < ll.length; i++){
    ll[i].style.visibility = "hidden";
  }
}
function closeAllCtxLowerLvl(lvl){
  for(let i = 0; i < ctxes.children.length; i++){
    let d = ctxes.children[i];
    if(d.lvl > lvl){
      if(d.onclose) d.onclose();
      ctxes.removeChild(d);
      i--;
    }
  }
  label.style.visibility = "hidden";
}
let _lastClicked = null;
function openContext_b(id,b){
  if(_lastClicked != b) closeAllCtxMenus();
  _lastClicked = b;
  if(b.classList.contains("main")) b.classList.add("ddHolding");
  openContext(id,b.offsetLeft,b.offsetTop+b.offsetHeight,null,null,b);
}
var fileFunc = {
  createNew:function(name,w,h,mode=0){
    console.log("Creating new... ",w,h);
    project = createNewProject(name,w,h);
    if(mode == 1) project.legacyName = name;
    addProject(project);
    resizeImage(w,h);
    createFrame(0);
    project.hist = [];
    project.histI = -1;
    _histAdd(HistIds.full,null,"New image");
    reconstructFramesDiv();
    reconstructLayersDiv();
    reconstructHistDiv_new();
    loadProject(project); //clean-up
    updateFileName();
  },
  createNew_menu:function(){
    newMenuMode = 0;
    openMenu("new");
  },
  open_menu:function(){
    openMenu("openFiles");
  },
  saveAs_menu:function(){
    openMenu("saveAsFile");
  }
};
function updateUndoCtxB(){
  let b = document.getElementById("b_undo");
  if(b){
    if(project.histI <= 0) b.className = "disabled";
    else b.className = "";
  }
}
function updateRedoCtxB(){
  let b = document.getElementById("b_redo");
  if(b){
    if(project.histI >= project.hist.length-1) b.className = "disabled";
    else b.className = "";
  }
}
const backRef = document.getElementById("backRef");
//https://www.pngkit.com/png/full/206-2062034_minecraft-bukkit-icon-8-bit-coin.png
let dragRef = null;
let dragX = 0;
let dragY = 0;
let dragDown = false;
let uniDrag = null;
let uniRanges = [];
let uniDragX = 0;
let uniDragY = 0;
/**
 * 
 * @param {HTMLElement} a 
 */
function createDragable(a,onmove,ondown,onup){
  a.onmove = onmove;
  a.onup = onup;
  a.onmousedown = function(e){
    if(ondown) ondown(e);
    uniDrag = a;
    uniDragX = cx;
    uniDragY = cy;
    a.sx = a.px;
    a.sy = a.py;
  };
}
function createDragableV(a,onmove,ondown){ //virtual, no html is created
  a.onmove = onmove;
  a.onmousedown = function(e){
    if(ondown) ondown(e);
    uniDrag = a;
    uniDragX = cx;
    uniDragY = cy;
    a.sx = a.px;
    a.sy = a.py;
  };
}
class Joint{
  /**
   * 
   * @param {String} name 
   * @param {Number} a
   * @param {Number} d 
   * @param {Joint[]} c 
   */
  constructor(name,a,d,c){
    this.name = name;
    this.a = a;
    this.d = d;
    this.c = c;
  }
  name = "";
  a = 0;
  _a = 0;
  d = 0;
  x = 0;
  y = 0;
  IKflip = false;
  c;
  /**@type {HTMLElement} */
  ref;
  /**@type {Joint} */
  before;
}
const ObjType = {
  none:0,
  arm:1,
  img:2,
  test:99
};
class Obj{
  constructor(name,x,y,type=ObjType.none){
    if(false) for(let i = 0; i < project.objs.length; i++){
      let o = project.objs[i];
      if(o.name == name){
        this.err = true;
        return;
      }
    }
    this.name = name;
    this.x = x;
    this.y = y;
    this.type = type;
  }
  name = "";
  x = 0;
  y = 0;
  type;
  getState(){return this.name+","+this.x.toFixed(1)+","+this.y.toFixed(1)}
  loadState(s){
    let c = s.split(",");
    let t = this;
    t.name = c[0];
    t.x = parseFloat(c[1]);
    t.y = parseFloat(c[2]);
    return c;
  }
}
function addObj(o){
  project.objs.push(o);
  _histAdd(HistIds.full,null,"Add Img Obj");
  reloadObjsList();
}
function selToNewNob(){
  console.log(img.selCount,img.select2.toString());
  /**@type {NobsinCtx} */
  let n = img.curLayer.nob;
  calcSelBounds();
  // let s = getNobState(n); //img.select2
  /**@type {NobsinCtx} */
  let n1 = registerNob2(null,selBounds[2],selBounds[3]).nob;
  //setNobState(n1,s,selBounds[0],selBounds[1]);
  let obj = new ImgObj("New Img Obj",0,0);
  let buf = new Uint8ClampedArray(n1.size);
  n1.buf = buf;
  for(let i = 0; i < n.size; i += 4){
    if(!n.buf[i+3]) continue;
    let x = Math.floor(i%(n.width*4)/4);
    let y = Math.floor(i/(n.width*4));
    let ind2 = ((x-Math.floor(selBounds[0]))+(y-Math.floor(selBounds[1]))*n1.width);
    if(img.selCount) if(!img.select2[ind2]) continue;
    let ind = (x+y*n1.width)*4;
    buf[ind] = n.buf[i];
    buf[ind+1] = n.buf[i+1];
    buf[ind+2] = n.buf[i+2];
    buf[ind+3] = n.buf[i+3];
  }
  obj.img = buf;
  obj.w = n1.width;
  obj.h = n1.height;
  addObj(obj);
}
/**
 * 
 * @param {NobsinCtx} n 
 */
function getNobState(n,sel){
  let s = "";
  let pal = [];
  let ref = {};
  let ii = 0;
  for(let i = 0; i < n.size; i += 4){
    if(sel) if(!sel[ii]) continue;
    let r = n.buf[i];
    let g = n.buf[i+1];
    let b = n.buf[i+2];
    let a = n.buf[i+3];
    if(!a) continue;
    let c = rgbaToHex(r,g,b,a);
    c = c.substring(1,c.length);
    let ind = pal.indexOf(c);
    if(ind == -1) ind = pal.push(c)-1;
    if(!ref[ind]) ref[ind] = [];
    ref[ind].push(i.toString(36));
    ii++;
  }
  s += pal.toString()+"\n";
  let ok = Object.keys(ref);
  for(let i = 0; i < ok.length; i++){
    let k = ok[i];
    let l = ref[k];
    s += k+":"+l.toString();
    if(i != ok.length-1) s += ";";
  }
  return s;
}
/**
 * 
 * @param {NobsinCtx} n 
 * @param {String} s 
 */
function setNobState(n,s,x1,y1){
  n.buf.fill(0);
  let trans = x1 != null;
  let lines = s.split("\n");
  let pal = lines[0].split(",");
  for(let i = 0; i < pal.length; i++){
    pal[i] = hexToR_g_b_a(pal[i]);
  }
  let sets = lines[1].split(";");
  for(let i = 0; i < sets.length; i++){
    let set = sets[i];
    let sub = set.split(":");
    let inds = sub[1].split(",");
    let id = parseInt(sub[0]);
    let c = pal[id];
    if(!c){
      console.warn("Couldn't find color in palette");
      continue;
    }
    for(let j = 0; j < inds.length; j++){
      let ind = parseInt(inds[j],36);
      if(trans){
        // let x = Math.floor(ind%(project.w*4)/4);
        // let y = Math.floor(ind/(project.w*4));
        let x = Math.floor(ind%(n.width*4)/4);
        let y = Math.floor(ind/(n.width*4));
        x -= x1;
        y -= y1;
        ind = (x+y*n.width)*4;
        // if(x < 0) continue;
        // if(y)
      }
      n.buf[ind] = c[0];
      n.buf[ind+1] = c[1];
      n.buf[ind+2] = c[2];
      n.buf[ind+3] = c[3];
    }
  }
}
class ImgObj extends Obj{
  constructor(name,x,y){
    super(name,x,y,ObjType.img);
  }
  /**@type {Uint8ClampedArray} */
  img;
  w = 0;
  h = 0;
  getState(){
    let s = super.getState();
    s += ",";
    s += this.w+",";
    s += this.h+"&";
    s += getNobState({
      size:this.w*this.h*4,
      buf:this.img
    });
    return s;
  }
  loadState(s){
    let split = s.split("&");
    let c = super.loadState(split[0]);
    let w = parseInt(c[3]);
    let h = parseInt(c[4]);
    let s1 = split[1];
    this.w = w;
    this.h = h;
    this.img = new Uint8ClampedArray(this.w*this.h*4);
    let ref = {
      width:this.w,
      buf:this.img
    };
    setNobState(ref,s1,0,0);
  }
  /**
   * @param {NobsinCtx} n 
   */
  render(n){
    if(!this.img) return;
    let img = bufToImage(this.img,this.w,this.h);
    n.drawImage_basic(img,0,0);
  }
  clone(){
    let t = this;
    let a = new ImgObj(t.name,t.x,t.y);
    a.x = t.x;
    a.y = t.y;
    a.name = t.name;
    a.img = cloneBuf(t.img,t.w*t.h*4);
    a.w = t.w;
    a.h = t.h;
    return a;
  }
}
class TestObj extends Obj{
  constructor(name,x,y,type){
    super(name,x,y,type);
  }
  getState(){
    let t = this;
    let s = super.getState()+",";
    s += t.color.toString().replace("[","").replace("]","");
    return s;
  }
  loadState(s){
    let c = super.loadState();
    let col = [0,0,0,255];
    col[0] = parseInt(c[3]);
    col[1] = parseInt(c[4]);
    col[2] = parseInt(c[5]);
    col[3] = parseInt(c[6]);
    this.color = col;
  }
  render(/**@type {NobsinCtx}*/n){
    n.drawRect(0,0,4,4,this.color);
  }
  clone(){
    let a = new TestObj(this.name,this.x,this.y,this.type);
    a.color = this.color;
    return a;
  }
}
class ArmState{
  /**
   * 
   * @param {Armature} a 
   */
  constructor(a){
    this.a = a;
  }
  a;
}
class Armature extends Obj{
  constructor(form=0,name=""){
    super(name,0,0,ObjType.arm);
    let t = this;
    t.name = name;
    t.x = Math.floor(project.w*0.5); //pNob.centerX;
    t.y = t.x; //pNob.centerY;
    console.log(project.w,t.x,t.y);
    if(form == 0){
      t.p = [
        [0,0,"root"],
        [0,-20,"neck"],
        [0,-40,"head"]
      ];
      t.c = [
        [0,1,"root-neck"],
        [1,2,"neck-head"]
      ];
      t.pp = new Joint("root",0,0,[
        new Joint("body",0,-20,[
          new Joint("neck",0,-2,[
            new Joint("head",0,-10)
          ]),
          new Joint("elbowR",Math.PI/2,20,[
            new Joint("handR",0,20)
          ]),
          new Joint("elbowL",-Math.PI/2,20,[
            new Joint("handL",0,20)
          ]),
        ]),
        new Joint("thighR",Math.PI/4,20,[
          new Joint("calfR",-Math.PI/6,20)
        ]),
        new Joint("thighL",-Math.PI/4,20,[
          new Joint("calfL",Math.PI/6,20)
        ])
      ]);
    }
    //let d = document.createElement("div");
    //d.className = "arm";
    /**
     * @param {Joint} p 
     */
    function createJoint(p){
      let dd = document.createElement("div");
      dd.className = "aPoint";
      dd.style.visibility = "hidden";
      d.appendChild(dd);
      p.ref = dd;
      createDragable(dd,(x,y)=>{
        if(!p.before){
          //console.log("No before");
          if(p.name == "root"){
            t.x = x;
            t.y = y;
          }
          return;
        }
        let sx = p.before.x;
        let sy = p.before.y;
        let dx = x-sx;
        let dy = y-sy;
        let ang = Math.atan2(dy,dx);
        let ss = 1;
        if(p.d < 0) ss = 3;
        p.a = (ss*Math.PI/2-ang)-p._a;
      });
      if(p.c) for(let i = 0; i < p.c.length; i++){
        createJoint(p.c[i]);
      }
    }
    // t.finalize();
    //createJoint(t.pp);
    if(false) for(let i = 0; i < t.c.length; i++){
      let c = t.c[i];
      let p1 = t.p[c[0]];
      let p2 = t.p[c[1]];
      let dx = p2[0]-p1[0];
      let dy = p2[1]-p1[1];
      let dist = Math.sqrt(dx**2+dy**2);
      let ang = Math.atan2(dy,dx);
      p2[3] = dist;
      p2[4] = ang;
      
      function createPoint(p){
        let dd = document.createElement("div");
        dd.className = "aPoint";
        d.appendChild(dd);
        dd.style.left = (p[0])+"px";
        dd.style.top = (p[1])+"px";
        p[5] = dd;
        dd.px = p[0];
        dd.py = p[1];
        createDragable(dd,(x,y)=>{
          let sx = p1[0];
          let sy = p1[1];
          let dx = x-sx;
          let dy = y-sy;
          let dist = Math.sqrt(dx**2+dy**2);
          console.log(p1,sx,sy,dist,p[3]);
          // if(dist > p[3]){
            x = sx+dx/dist*p[3];
            y = sy+dy/dist*p[3];
          // }
          p[0] = x;
          p[1] = y;
        });
      }
      if(i == 0) createPoint(p1);
      createPoint(p2);
    }
    //arms_d.appendChild(d);

    let r = (project.h/128);
    // this.x *= r;
    // this.y *= r;
    this.scaleBy(r);
  }
  ref;
  finalize(){
    let t = this;
    let d = document.createElement("div");
    d.className = "arm";
    d.id = "arm_"+t.name;
    t.ref = d;
    /**
     * 
     * @param {Joint} p 
     */
    function createJoint(p){
      let dd = document.createElement("div");
      dd.className = "aPoint";
      dd.style.visibility = "hidden";
      dd.jref = p;
      dd.onmouseenter = function(){
        this.tmp = overCanvas;
        overCanvas = true;
      };
      dd.onmouseleave = function(){
        overCanvas = this.tmp;
      };
      d.appendChild(dd);
      p.ref = dd;
      function getMode(e){
        if(e.ctrlKey && e.shiftKey) return 4; //Free move
        else if(e.ctrlKey) return 1; //add
        else if(e.altKey) return 2; //delete
        else if(e.shiftKey) return 3; //IK
        else return 0;
      }
      createDragable(dd,(x,y)=>{
        let mode = dd.mode;
        //if(mode == 0) dd.className = "aPoint";
        //else if(mode == 1) dd.className = "aPoint mode1";
        if(mode == 0){
          if(!p.before){
            if(p.name == "root"){
              t.x = x;
              t.y = y;
            }
            return;
          }
          let sx = p.before.x;
          let sy = p.before.y;
          let dx = x-sx;
          let dy = y-sy;
          let ang = Math.atan2(dy,dx);
          let ss = 1;
          if(p.d < 0) ss = 3;
          p.a = (ss*Math.PI/2-ang)-p._a;
        }
        else if(mode == 1){
          let j = dd.j;
          if(!j){
            console.warn("No j found");
            return;
          }
          let sx = j.before.x;
          let sy = j.before.y;
          let dx = x-sx;
          let dy = y-sy;
          let dist = Math.sqrt(dy**2+dx**2);
          let ang = Math.atan2(dy,dx);
          let ss = 1;
          if(j.d < 0) ss = 3;
          j.a = (ss*Math.PI/2-ang)-j._a;
          j.d = dist;
        }
        else if(mode == 3){ //IK
          if(!p.before) return;
          let p1 = p.before.before;
          if(!p1) return;
          let p2 = p.before;
          let p3 = p;

          let dx = cx-p1.x;
          let dy = cy-p1.y;
          let dist = Math.sqrt(dx**2+dy**2);
          let len = Math.abs(p2.d)+Math.abs(p3.d);
          let rat = p2.d/len;
          let l2 = len*rat;
          let s2 = dist*rat;
          let a = 0;
          if(!p.IKflip) a = Math.asin(s2/l2);
          else a = Math.acos(s2/l2);
          if(a || a == 0){
            let off = 0;
            if(p.IKflip) off = Math.atan2(dx,dy);
            else off = -Math.atan2(dy,dx);
            function fixAng(ang){
              while(ang < 0){
                ang += Math.PI*2;
              }
              while(ang >= Math.PI*2){
                ang -= Math.PI*2;
              }
              return ang;
            }
            p2.a = fixAng(a)-fixAng(p2._a)+off;
            dx = cx-p2.x;
            dy = cy-p2.y;
            a = Math.atan2(-dy,dx);
            p3.a = a-p3._a+Math.PI/2;
          }
          
          // let s2 = dist3/2;
          // let l2 = (dist1+dist2)/2;
          // console.log(s2,l2);
          // let a = Math.acos(s2/l2);
          // p2.a = a-p._a;
          // p3.a = -a;
          
          // let ang = Math.atan2(dy,dx);
          //let ss = 1;
          //if(p.d < 0) ss = 3;
          // p.a = (ss*Math.PI/2-ang)-p._a;
          // p.d = dist;
        }
        else if(mode == 4){ //Free move
          if(!p.before){
            if(p.name == "root"){
              t.x = x;
              t.y = y;
            }
            return;
          }
          let sx = p.before.x;
          let sy = p.before.y;
          let dx = x-sx;
          let dy = y-sy;
          let dist = Math.sqrt(dy**2+dx**2);
          let ang = Math.atan2(dy,dx);
          let ss = 1;
          if(p.d < 0) ss = 3;
          p.a = (ss*Math.PI/2-ang)-p._a;
          p.d = dist;
        }
      },(e)=>{
        let mode = getMode(e);
        dd.mode = mode;
        if(mode == 1){ //create new joint
          let j = new Joint("added_joint",0,10,[]);
          p.c.push(j);
          j.before = p;
          createJoint(j);
          dd.j = j;
          //t.finalize();
        }
        else if(mode == 2){
          p.before.c.splice(p.before.c.indexOf(p),1);
          t.finalize();
        }
      },()=>{
        _histAdd(HistIds.full,null,"Edit armature");
        dd.j = null;
      });
      if(p.c) for(let i = 0; i < p.c.length; i++){
        if(!p.c[i]){
          console.warn("There was a null joint when finalizing");
          continue;
        }
        createJoint(p.c[i]);
      }
    }
    createJoint(this.pp);
    arms_d.appendChild(d);
  }
  /**
   * Scale by a scalar
   * @param {Number} s
   * @param {Joint} p
   */
  scaleBy(s,p){
    if(!p) p = this.pp;
    p.d *= s;
    if(p.c) for(let i = 0; i < p.c.length; i++){
      let c = p.c[i];
      this.scaleBy(s,c);
    }
  }
  clone(){
    let t = this;
    let a = new Armature(0,t.name);
    a.x = t.x;
    a.y = t.y;
    /**
     * 
     * @param {Joint} p 
     */
    function sub(p){
      let p1 = new Joint(p.name,p.a,p.d,[]);
      if(!p.c) return p1;
      p1.c = [];
      for(let i = 0; i < p.c.length; i++){
        let cc = p.c[i];
        let j = sub(cc);
        if(j) p1.c.push(j);
      }
      return p1;
    }
    a.pp = sub(t.pp,null);
    a.finalize();
    return a;
  }
  getState(){
    let s = super.getState();
    s += "&";
    let p = this.pp;
    /** @param {Joint} p */
    function getStr(p){
      s += p.name+","+p.a.toFixed(3)+","+p.d.toFixed(1);
      s += ":";
      if(p.c) for(let i = 0; i < p.c.length; i++){
        let c = p.c[i];
        getStr(c);
      }
      s += "^";
    }
    getStr(p);
    return s;
  }
  /**
   * 
   * @param {String} s 
   */
  loadState(s){
    let t = this;
    let l1 = s.split("&");
    let head = l1[0].split(",");
    let pp = l1[1].split(":");
    t.name = head[0];
    t.x = parseFloat(head[1]);
    t.y = parseFloat(head[2]);
    t.pp = null;
    /**@type {Joint} */
    let last = null;
    for(let i = 0; i < pp.length-1; i++){
      let c = pp[i];
      let list = c.split(",");
      let cAmt = 0;
      function cut(a){
        cAmt = a.length; 
        a = a.replace(/\^/g,"");
        cAmt -= a.length;
        return a;
      }
      list[0] = cut(list[0]);
      let j = new Joint(list[0],parseFloat(list[1]),parseFloat(list[2]),[]);
      for(let k = 0; k < cAmt; k++) last = last.before;
      j.before = last;
      if(last) last.c.push(j);
      else t.pp = j;
      last = j;
    }
    t.finalize();
  }
  /**@type {Number[][]} */
  p; //points
  /**@type {Number[][]} */
  c; //connections
  /**@type {Joint} */
  pp; //structure
  /**
   * 
   * @param {NobsinCtx} n 
   */
  render(n){
    if(!n) return;
    let t = this;
    let x1_ = t.x;
    let y1_ = t.y;
    let a1_ = 0;
    /**
     * 
     * @param {Joint} p 
     */
    function renderJoint(p,before,x1,y1,a1){
      if(!p.before) p.before = before;
      a1 += p.a;
      let x = x1+Math.sin(a1)*p.d;
      let y = y1+Math.cos(a1)*p.d;
      p.x = x;
      p.y = y;
      p._a = a1-p.a;
      p.ref.px = x;
      p.ref.py = y;
      if(p.before) n.drawLine_smart(p.before.x,p.before.y,x,y,black,1);
      if(p.name == "head"){
        n.drawCircle((before.x+x)/2,(before.y+y)/2,Math.abs(p.d)/2,black);
      }
      let scale = can.parentNode.getBoundingClientRect().width/can.width;
      p.ref.style.left = `calc(${(x/nob.width*100)+"%"} + ${scale}px)`;
      p.ref.style.top = `calc(${(y/nob.height*100)+"%"} + ${scale}px)`;
      x1 = x;
      y1 = y;
      if(p.c) for(let i = 0; i < p.c.length; i++){
        renderJoint(p.c[i],p,x1,y1,a1);
      }
    }
    renderJoint(t.pp,null,t.x,t.y,0);
  }
}
// /**@type {Armature[]} */
let arms = {};
function createArmature(name=""){
  // resizeImage(256,256);
  let a = new Armature(0,name);
  a.finalize();
  arms[name] = a;
  project.objs.push(a);
  _histAdd(HistIds.full,null,"Create armature");
  // arms.push(a);
  // project.frames[project.frameI].arms.push(a);
  reloadObjsList();
}
function readImage1(){
  let ctx = this.refCtx;
  if (!this.files || !this.files[0]) return;
  console.log(111);
  const FR = new FileReader();
  FR.addEventListener("load", (evt) => {
    console.log(222);
    const img = new Image();
    img.addEventListener("load", () => {
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.canvas.dat = ctx.getImageData(0,0,img.width,img.height).data;
      console.log(ctx.canvas.dat);
    });
    img.src = evt.target.result;
  });
  FR.readAsDataURL(this.files[0]);
}
function createReference(){
  let d1 = document.createElement("div");
  let d = document.createElement("div");
  let ops = document.createElement("div");
  ops.innerHTML = "<div class='pCol'><div></div></div><div style='font-size:12px;margin-left:4px' class='prev'>(Shift)</div><button style='margin-left:auto'>X</button>"; //<div style='font-size:14px;white-space:nowrap' class='prev'>Shift + Click to take color...</div>
  ops.style = "display:flex;width:100%;align-items:center";
  d1.appendChild(d);
  d.appendChild(ops);
  ops.children[2].onclick = function(){
    let c = this.parentNode.parentNode.parentNode;
    c.parentNode.removeChild(c);
  };
  let pCol = ops.children[0];
  registerInfo(pCol,"Shift + Click to take color","u");
  d1.className = "d_ref";
  let imgCan = document.createElement("canvas");
  let imgCtx = imgCan.getContext("2d");
  let ff = document.createElement("input");
  ff.type = "file";
  ff.refCtx = imgCtx;
  ff.addEventListener("change",readImage1);
  ff.click();
  d.appendChild(imgCan);
  backRef.appendChild(d1);
  registerDragSide(d1,1);
  registerDragSide(d1,2);
  registerDragSide(d1,3);
  registerDragSide(d1,0);
  imgCan.onmousemove = function(e){
    if(!e.shiftKey) return;

    let rect = this.getBoundingClientRect();
    let x = Math.floor((e.x-rect.x)/rect.width*this.width);
    let y = Math.floor((e.y-rect.y)/rect.height*this.height);

    this.inrange = (x >= 0 && y >= 0 && x < this.width && y < this.height);
    if(this.inrange){
      let ind = Math.floor(x+y*this.width)*4;
      let r = imgCan.dat[ind];
      let g = imgCan.dat[ind+1];
      let b = imgCan.dat[ind+2];
      let a = imgCan.dat[ind+3];
      this.col = [r,g,b,a];
      ops.children[0].children[0].style.backgroundColor = `rgba(${r},${g},${b},${a/255})`;
    }
  };
  imgCan.parentNode.onmousedown = function(e){
    let tt = imgCan;
    dragRef = tt.parentNode.parentNode;
    dragX = e.clientX;
    dragY = e.clientY;
    if(dragRef.sx == null) dragRef.style.left = "0px";
    if(dragRef.sy == null) dragRef.style.top = "0px";
    dragRef.sx = parseFloat(dragRef.style.left.replace("px",""));
    dragRef.sy = parseFloat(dragRef.style.top.replace("px",""));
    for(let j = 0; j < tt.parentNode.parentNode.parentNode.children.length; j++){
      let c = tt.parentNode.parentNode.parentNode.children[j];
      c.style.zIndex = "unset";
    }
    tt.parentNode.parentNode.style.zIndex = 11;
    
    if(!e.shiftKey) return;
    if(tt.inrange){
      color[0] = tt.col;
      updateNewCol();
    }
  };
}
let autoSave = (localStorage.autoSave == "false" ? false : true);
function openContext(id,x,y,temp,level,b){
  if(document.getElementById("ctx_"+id)){
    closeAllCtxMenus();
    return;
  }
  switch(id){
    case "armature":{
      _loadCtx(id,[
        "New",
        "Remove All"
      ],[],function(i,d){
        if(i == 0){
          d.onclick = function(){
            createArmature(prompt("Please enter a name for your armature:"));
            closeAllCtxMenus();
          };
        }
        else if(i == 1) closeAllCtxMenus();
      },x,y,temp,level,b);
    } break;
    case "reference":{
      _loadCtx(id,[
        "New",
        "Close All"
      ],[],function(i,d){
        if(i == 0){
          d.onclick = function(){
            createReference();
            closeAllCtxMenus();
          };
        }
        else if(i == 1){
          d.onclick = function(){
            backRef.innerHTML = "";
            closeAllCtxMenus();
          };
        }
      },x,y,temp,level,b);
    } break;
    case "file":{
      _loadCtx(id,[
        "New",
        "Open",
        "Save As",
        "Save",
        "Import",
        "Export As",
        "Export",
        "Export As SS",
        "File Recovery",
        `AutoSave: <span style="color:${autoSave?"limegreen":"red"}">${autoSave?"ON":"OFF"}</span>`,
        "<span class='prev' style='color:darkgray;background-color:black'>Legacy File System:</span>",
        "New",
        "Open",
        "Save As",
        "Manage Files"
      ],[
        "Ctrl-Shift-M",
        "Ctrl-O",
        "Ctrl-Shift-S",
        "Ctrl-S",
        "",
        "",
        "",
        ""
      ],function(i,d,lvl){
        switch(i){
          case 0:
            registerInfo(d,"File -> New: Creates a new empty image.")
            d.onclick = function(){
              fileFunc.createNew_menu();
              //closeAllCtxMenus();
            };
          break;
          case 1:
            registerInfo(d,"File -> Open: Allows you to choose a '.nbg' or '.png' file to open from your hard drive.");
            d.onclick = function(){
              file_open();
              //openMenu("openFiles");
              closeAllCtxMenus();
            };
            /*d.onmouseenter = function(){
              //closeAllCtxLowerLvl(lvl);
              //console.log("LVL: ",lvl+1);
              openContext("recentFiles",x+d.offsetLeft+d.offsetWidth,y+d.offsetTop+d.offsetHeight/2,true,lvl+1);
            };*/
          break;
          case 2:
            registerInfo(d,"File -> Save As: Allows you to save the current file as a duplicate under a different file name.");
            d.onclick = function(){
              file_saveAs();
              //openMenu("saveAsFile");
              closeAllCtxMenus();
            };
          break;
          case 3:
            registerInfo(d,"File -> Save: Quickly saves the current file to your hard drive under the same name.");
            d.onclick = function(){
              file_save();
              //saveFile();
              closeAllCtxMenus();
            };
          break;
          case 4:
            registerInfo(d,"File -> Import: Allows you to open a '.png' file and add it as another layer to the current image.");
            d.onclick = function(){
              file_import();
            };
            break;
          case 5:
            registerInfo(d,"File -> Export As: Allows you to create an export preset. Then export the image with alternate data, such as a spritesheet.");
            d.onclick = function(){
              //file_exportAs();
              openMenu("exportAs");
            };
          break;
          case 6:
            registerInfo(d,"File -> Export: Quickly saves the export using the last used export preset.");
            d.onclick = function(){
              file_export();
              //openFile_bare(null,true);
            };
          break;
          case 7:
            d.onclick = function(){
              file_exportAs();
            };
          break;
          case 8: //recovery
            d.classList.add("bRcv");
            d.onclick = function(){
              openMenu("recovery");
            };
          break;
          case 9:
            d.style.backgroundColor = "black";
            d.style.color = "white";
            d.onclick = function(){
              autoSave = !autoSave;
              localStorage.autoSave = autoSave;
              if(autoSave) autoSaveF();
              else clearTimeout(autoSaveTimeout);
              this.innerHTML = `AutoSave: <span style="color:${autoSave?"limegreen":"red"}">${autoSave?"ON":"OFF"}</span>`;
            };
          break;
          case 10:
            d.style.backgroundColor = "black";
          break;
          case 11:
            d.onclick = function(){
              newMenuMode = 1;
              openMenu("new");
            };
            break;
          case 12:
            d.onclick = function(){
              openMenu("openFiles");
            };
          break;
          case 13:
            d.onclick = function(){
              openMenu("saveAsFile");
            };
          break;
          case 14:
            d.onclick = function(){
              openMenu("manageFiles");
            };
          break;
        }
      },x,y,temp,level);
    } break;
    case "recentFiles":
      _loadCtx(id,[
        "bob",
        "bob2"
      ],[
        "",
        ""
      ],function(i,d,lvl){

      },x,y,temp,level,b);
      break;
    case "edit":
      _loadCtx(id,[
        "Undo",
        "Redo",
        "Select All",
        "Deselect"
      ],[
        "Ctrl-Z",
        "Ctrl-Y",
        "Ctrl-A",
        "Ctrl-D"
      ],function(i,d,lvl){
        switch(i){
          case 0:
            d.id = "b_undo";
            d.onclick = function(){
              if(this.className != "disabled") undo();
            };
            break;
          case 1:
            d.id = "b_redo";
            d.onclick = function(){
              if(this.className != "disabled") redo();
            };
            break;
          case 2:
            d.onclick = function(){
              editFunc.selectAll();
            };
            break;
          case 3:
            d.onclick = function(){
              editFunc.deselect();
            };
            break;
        }
      },x,y,temp,level,b);
      updateUndoCtxB();
      updateRedoCtxB();
      break;
    case "view":
      _loadCtx(id,[
        "Zoom In",
        "Zoom Out",
        "Reset View"
      ],[
        "=","-",null
      ],function(i,d,lvl){
        switch(i){
          case 0:
            d.onclick = function(){
              overCanvas = true;
              scaleX = 0.5;
              scaleY = 0.5;
              runZoom(-1.3);
              overCanvas = false;
            };
            break;
          case 1:
            d.onclick = function(){
              overCanvas = true;
              scaleX = 0.5;
              scaleY = 0.5;
              runZoom(1.3);
              overCanvas = false;
            };
            break;
          case 2:
            d.onclick = function(){
              resetView();
            };
            break;
        }
      },x,y,temp,level,b);
      break;
    case "image":
      _loadCtx(id,[
        "Resize",
        "Resize Canvas",
        "Layer Flip X",
        "Layer Flip Y"
      ],[
        null,null
      ],function(i,d,lvl){
        switch(i){
          case 0:
            d.onclick = function(){
              openMenu("resize");
              //let w = parseInt(prompt("w"));
              //let h = parseInt(prompt("h"));
              //resizeProject(w,h);
              //resetView();
            };
            break;
          case 1:
            d.onclick = function(){
              openMenu("resizeCanvas");
            };
            break;
          case 2:
            d.onclick = function(){
              editFunc.flipX();
            };
            break;
          case 3:
            d.onclick = function(){
              editFunc.flipY();
            };
            break;
        }
      },x,y,temp,level,b);
      break;
    case "object":
      _loadCtx(id,[
        "Toggle Object Panel",
        "Convert to Object",
        // "Manage Objects"
      ],[
        null,null,null
      ],function(i,d,lvl){
        switch(i){
          case 0:
            d.onclick = function(){
              objs_open = !objs_open;
              updateObjsOpen();
              closeAllCtxMenus();
            }
            break;
          case 1:{
            d.onclick = function(){
              let o = new TestObj("New Obj",0,0,ObjType.test);
              o.color = [0,255,0,255];
              project.objs.push(o);
              _histAdd(HistIds.full,null,"Create Obj");
              reloadObjsList();
              closeAllCtxMenus();
            };
          } break;
        }
      },x,y,temp,level,b);
      break;
  }
}

function resizeProject(w,h,bare=false){
  let ow = project.w;
  let oh = project.h;
  let sx = w/project.w;
  let sy = h/project.h;
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  let frames = [];
  for(let i = 0; i < project.frames.length; i++){
    let f = project.frames[i];
    f.w = w;
    f.h = h;
    let ar = [];
    for(let j = 0; j < f.layers.length; j++){
      let l = f.layers[j];
      ar.push(cloneBuf(l.nob.buf,l.nob.size));
    }
    frames.push(ar);
  }
  /*if(!bare){
    if(img.selCount != 0){
      editFunc.deselect();
    }
    _histAdd(HistIds.resizeImage,{w,h},"Resize Image");
  }*/
  resizeImage(w,h,true);
  project.w = w;
  project.h = h;
  for(let i = 0; i < frames.length; i++){
    let f = frames[i];
    for(let j = 0; j < f.length; j++){
      let ll = project.frames[i].layers[j];
      let l = f[j];
      let n = new NobsinCtx(ctx);
      n.buf = new Uint8ClampedArray(n.size);
      n.drawImage_basic_scale(fromNob({
        width:ow,
        height:oh,
        buf:l
      }),0,0,sx,sy);
      ll.nob = n;
    }
  }
  //if(!bare) resetView();
  if(!bare){
    resetView();
    if(img.selCount != 0){
      editFunc.deselect();
    }
    _histAdd(HistIds.resizeImage,{w,h},"Resize Image");
  }
}
function resizeProjectCanvas(w,h,ox,oy,bare=false){
  let ow = project.w;
  let oh = project.h;
  let sx = w/project.w;
  let sy = h/project.h;
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  let frames = [];
  for(let i = 0; i < project.frames.length; i++){
    let f = project.frames[i];
    f.w = w;
    f.h = h;
    let ar = [];
    for(let j = 0; j < f.layers.length; j++){
      let l = f.layers[j];
      ar.push(cloneBuf(l.nob.buf,l.nob.size));
    }
    frames.push(ar);
  }
  /*if(!bare){
    if(img.selCount != 0){
      editFunc.deselect();
    }
    _histAdd(HistIds.resizeCanvas,{w,h,ox,oy},"Resize Canvas");
  }*/
  resizeImage(w,h,true);
  project.w = w;
  project.h = h;
  for(let i = 0; i < frames.length; i++){
    let f = frames[i];
    for(let j = 0; j < f.length; j++){
      let ll = project.frames[i].layers[j];
      let l = f[j];
      let n = new NobsinCtx(ctx);
      n.buf = new Uint8ClampedArray(n.size);
      n.drawImage_basic(fromNob({
        width:ow,
        height:oh,
        buf:l
      }),ox*(w-ow),oy*(h-oh));
      ll.nob = n;
    }
  }
  if(!bare){
    resetView();
    reconstructFramesDiv();
  }
  if(!bare){
    if(img.selCount != 0){
      editFunc.deselect();
    }
    _histAdd(HistIds.resizeCanvas,{w,h,ox,oy},"Resize Canvas");
  }
}

//EXTERNAL FILE SYSTEM
function download(name,text){
  let a = document.createElement("a");
  a.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(text));
  a.setAttribute("download",name);
  a.click();
}
function readFile(call){
  let inp = document.createElement("input");
  inp.type = "file";
  inp.addEventListener("change",()=>{
    if(inp.files && inp.files[0]){
      var file = inp.files[0];
      var reader = new FileReader();
      reader.addEventListener("load",e=>{
        //console.log("result: ",e.target.result);
        //alert(e.target.result);
        call(JSON.parse(e.target.result));
      });
      reader.readAsBinaryString(file);
    }
  });
  inp.click();
}

const nameDiv = document.getElementById("nameDiv");
function canCloseProject(p){
  if(!p) return false;
  if(!p.unsaved) return true;
  if(p.hist.length <= 1) return true;
  return confirm("Unsaved progress, are you sure you want to close it?");
}
function addProject(p1){
  allProjects.push(p1);
  let d = document.createElement("div");
  d.textContent = p1.name;
  if(p1.legacyName) d.textContent = d.textContent.replace(".lnbg","");
  createDropdown(0,[
    "Open",
    "Close"
  ],[],(j1,a)=>{
    let p = p1.ref;
    if(j1 == 0){
      let i = -1;
      for(let j = 0; j < nameDiv.children.length; j++){
        if(nameDiv.children[j] == d){
          i = j;
          break;
        }
      }
      if(i != -1){
        loadProject(allProjects[i]);
      }
    }
    else if(j1 == 1){
      if(allProjects.length <= 1){
        console.warn("Can't close project when there is only 1 open, at the moment");
        return;
      }
      if(canCloseProject(p)){
        console.log("CLOSING");
        d.parentNode.removeChild(d);
        let ind = allProjects.indexOf(p);
        allProjects.splice(ind,1);
        ind--;
        if(ind < 0) ind = 0;
        project = allProjects[ind];
        loadProject(project);
      }
    }
  },d,true);
  for(let i = 0; i < nameDiv.children.length; i++){
    nameDiv.children[i].className = "";
  }
  if(project == p1) d.className = "sel";
  nameDiv.appendChild(d);
  updateFileName();
}
function loadProject(p){
  resizeImage(p.w,p.h,true);
  project = p;
  img = project.frames[project.frameI];
  reconstructLayersDiv();
  reconstructFramesDiv();
  reconstructHistDiv_new();
  _runHist();
  resetView();
  color[0] = deepClone(p.c1);
  color[1] = deepClone(p.c2);
  updateNewCol();
  reloadObjsList();

  for(let i = 0; i < nameDiv.children.length; i++){
    let d = nameDiv.children[i];
    d.className = "";
    if(allProjects[i] == project) d.className = "sel"; //fixed
  }
}

var keybinds = {
  file:{
    name:"File",
    new:["New","M",true,false], //label,key,isCtrl,isShift
    open:["Open","O",true],
    saveAs:["Save As","S",true,true],
    save:["Save","S",true]
  },
  tools:{
    name:"Tools",
    pencil:["Pencil","D"],
    rectSelect:["Rectangle Select","S"],
    move:["Move","A"]
  },
  edit:{
    name:"Edit",
    undo:["Undo","Z",true,false],
    undo2:["Alt. Undo","",false,false],
    redo:["Redo","Y",true,false],
    redo2:["Alt. Redo","Z",true,true],
    deselect:["Deselect","D",true,false],
    selectAll:["Select All","A",true,false],
    deleteSel:["Delete Selection","backspace",false,false],
    copy:["Copy","c",true,false],
    cut:["Cut","x",true,false],
    paste:["Paste","v",true,false],
    resetTool:["Reset Tool","escape",false,false],
    confirmTool:["Confirm Tool","enter",false,false]
  },
  color:{
    name:"Color",
    swapCur:["Swap Focused Color in Pallet","c",false,false],
    swap:["Swap Color Pallet","x",false,false],
    pick:["Pick Color at Mouse Position","r",false,false]
  },
  frames:{
    name:"Frames",
    next:["Next Frame","w",false,false],
    prev:["Previous Frame","q",false,false],
    clone:["Clone Frame","e",false,false],
    new:["New Empty Frame","e",false,true]
  },
  navigation:{
    name:"Navigation",
    moveUp:["Move View Up","w",false,true],
    moveDown:["Move View Down","s",false,true],
    moveRight:["Move View Right","d",false,true],
    moveLeft:["Move View Left","a",false,true]
  },
  toolSettings:{
    name:"Tool Settings",
    sizeInc:["Increase Size","]",false,false],
    sizeDec:["Decrease Size","[",false,false],
    nextTool:["Next Tool","}",false,true],
    prevTool:["Previous Tool","{",false,true]
  },
  preview:{
    name:"Animation Previewer Settings",
    togglePlay:["Toggle Play","p",false,false]
  }
};
function kbsFirst(){
  let ok = Object.keys(keybinds);
  for(let j = 0; j < ok.length; j++){
    let dat = keybinds[ok[j]];
    let ok2 = Object.keys(dat);
    for(let i = 1; i < ok2.length; i++){
      let bind = dat[ok2[i]];
      bind[5] = bind[1];
      bind[6] = bind[2];
      bind[7] = bind[3];
    }
  }
}
kbsFirst();
if(localStorage.kbs) keybinds = JSON.parse(localStorage.kbs);

//FINISH INIT

if(!window.localStorage.getItem("files")) window.localStorage.setItem("files","[]");

function initColor(){
  colorArea = colorAreas.basic;
  updateColorCur();
  initColorArea(colorArea);
  updateNewCol(color[0]);
}

resizeImage(project.w,project.h);

addProject(project);
img = createFrame(0);
//img = createEmptyImage(project.w,project.h);//createEmptyImage(16,16);
project.frameI = 0;
//createEmptyImage(project.w,project.h);
loadFrame(project.frames[project.frameI]);

initColor();

_runHist();

update();
loadSwatches();
loadHistSwatches();
initSliders();

//EXTRA MENU GEN

//gen d_keys
var d_keys = document.getElementById("menu_keys").getElementsByClassName("d_keys")[0];
var d_keys_list = document.getElementById("menu_keys").getElementsByClassName("d_keys_list")[0];
class Key{
  constructor(k,a,w){
    this.k = k;
    this.a = a;
    this.w = w;
  }
  k = "";
  a = "";
  w = 0;
};
let rows = [
  [
    new Key("`","~"),
    new Key("1","!"),
    new Key("2","@"),
    new Key("3","#"),
    new Key("4","%"),
    new Key("5","%"),
    new Key("6","^"),
    new Key("7","&"),
    new Key("8","*"),
    new Key("9","("),
    new Key("0",")"),
    new Key("-","_"),
    new Key("=","+"),
    new Key("Backspace")
  ],
  [
    new Key("Tab"),
    new Key("q"),
    new Key("w"),
    new Key("e"),
    new Key("r"),
    new Key("t"),
    new Key("y"),
    new Key("u"),
    new Key("i"),
    new Key("o"),
    new Key("p"),
    new Key("[","{"),
    new Key("]","}"),
    new Key("\\","|")
  ],
  [
    new Key("Caps Lock"),
    new Key("a"),
    new Key("s"),
    new Key("d"),
    new Key("f"),
    new Key("g"),
    new Key("h"),
    new Key("j"),
    new Key("k"),
    new Key("l"),
    new Key(";",":"),
    new Key("'",'"'),
    new Key("Enter")
  ],
  [
    new Key("Shift",null,70),
    new Key("z"),
    new Key("x"),
    new Key("c"),
    new Key("v"),
    new Key("b"),
    new Key("n"),
    new Key("m"),
    new Key(",","<"),
    new Key(".",">"),
    new Key("/","?"),
    new Key("Shift",null,70)
  ],
  [
    new Key("Control",null,70),
    new Key("Alt",null,70),
    new Key("Space",null,180),
    new Key("Alt",null,70),
    new Key("Control",null,70),
    new Key("^")
  ],
  [
    new Key("<"),
    new Key("v"),
    new Key(">")
  ]
];
for(let j = 0; j < rows.length; j++){
  let row = document.createElement("div");
  d_keys.appendChild(row);
  for(let i = 0; i < rows[j].length; i++){
    let d = document.createElement("div");
    if(rows[j][i].a){
      let alt = document.createElement("span");
      alt.innerHTML = rows[j][i].a;
      d.appendChild(alt);
    }
    let l = document.createElement("span");
    l.innerHTML = rows[j][i].k;
    if(!rows[j][i].a){
      l.style.lineHeight = 2.5;
    }
    d.appendChild(l);
    row.appendChild(d);
    let dat = rows[j][i];
    if(dat.w){
      d.style.width = dat.w+"px";
    }
    if(!dat.k.includes(" ")) d.classList.add("key_"+dat.k.toLowerCase());
    if(dat.a) d.classList.add("key_"+dat.a.toLowerCase());
  }
}
d_keys.children[4].lastChild.style.marginRight = "33px";
d_keys.children[5].style.justifyContent = "right";

var didBind = false;
var m_keys = document.getElementById("menu_keys");
function isBind(ref){ //isBind(keybinds.tools.pencil)
  if(ref[10]){
    ref[10] = false;
    didBind = true;
    return true;
  }
  if(didBind) return false;
  //if(!ref[2] != !keys.control) return false;
  if(!ref[2] != !g_keye.ctrlKey) return false;
  //if(!ref[3] != !keys.shift) return false;
  if(!ref[3] != !g_keye.shiftKey) return false;
  if(!keys[ref[1].toLowerCase()]) return false;
  if(m_keys.style.visibility == "visible"){
    didBind = true;
    return false;
  }
  didBind = true;
  return true;
}
function forceBind(ref){
  // keybinds.color.swap
  // keys[ref[1]] = true;
  // g_keye.ctrlKey = ref[2];
  // g_keye.shiftKey = ref[3];
  ref[10] = true;
  keydown({key:"asd",preventDefault:()=>{}});
}
function resetKeybind(ref){
  if(prompKeyChord){
    endKCPrompt();
    d_keys_list.innerHTML = "";
    genKeybinds();
    resetKeySel();
    return;
  }
  ref[1] = ref[5];
  ref[2] = ref[6];
  ref[3] = ref[7];
  d_keys_list.innerHTML = "";
  genKeybinds();
}
var keyChord = [];
var prompKeyChord = false;
var d_mes = document.getElementById("messages");
function startKCPrompt(){
  prompKeyChord = true;
  let d = document.createElement("div");
  d.className = "message";
  d.innerHTML = "Type a key combination...";
  d_mes.appendChild(d);
}
function endKCPrompt(){
  prompKeyChord = false;
  let list = document.getElementsByClassName("message");
  for(let i = 0; i < list.length; i++){
    let d = list[i];
    d.parentNode.removeChild(d);
  }
  resetKeySel();
}
var g_keye = new KeyboardEvent("");
var az_kb = "abcdefghijklmnopqrstuvwxyz0123456789-=`~!@#$%^&*()_+[]{}\\|;:',.<>/?"+'"';
var az_sym = [
  "tab"," ","enter","backspace",
  "f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","delete",
  "home","end","pageup","pagedown","insert"
];
document.addEventListener("keydown",e=>{
  g_keye = e;
  // console.log("Code: ",e.keyCode,e.key);
  let key = e.key.toLowerCase();
  if(document.activeElement.tagName.toLowerCase() == "input") if(e.ctrlKey) return;
  if(e.altKey && key == "t"){
    e.preventDefault();
    if(window.refresh) window.refresh();
    else window.location.reload();
    e.preventDefault();
  }
  if(e.ctrlKey) if(key != "r"){
    e.preventDefault();
  }
  if(prompKeyChord){
    e.preventDefault();
    //if(key == "control") keyChord[2] = true;
    //else if(key == "shift") keyChord[3] = true;
    if(key == "escape"){
      endKCPrompt();
      d_keys_list.innerHTML = "";
      genKeybinds();
      console.log("Canceled changing keybind");
      resetKeySel();
    }
    else if(az_kb.includes(key) || az_sym.includes(key)){
      let bind = keyChord[0];
      bind[1] = key.toUpperCase();
      bind[2] = e.ctrlKey;
      bind[3] = e.shiftKey;
      endKCPrompt();
      d_keys_list.innerHTML = "";
      genKeybinds();
      console.log("Set keybind success");
      resetKeySel();
    }
  }
});
function changeKeybind(ref){
  if(prompKeyChord){
    endKCPrompt();
    d_keys_list.innerHTML = "";
    genKeybinds();
    resetKeySel();
    return;
  }
  keyChord = [ref,null,false,false];
  startKCPrompt();
}
function resetKeySel(){
  let l = document.getElementsByClassName("key_sel");
  for(let i = 0; i < l.length; i++){
    l[i].classList.remove("key_sel");
  }
}
function getKeybindName(bind){
  return (bind[2]?"Ctrl+":"")+(bind[3]?"Shift+":"")+bind[1].substring(0,1).toUpperCase()+bind[1].substring(1,bind[1].length);
}
//gen keybinds
function genKeybinds(isFirst=false){
  if(!isFirst) localStorage.kbs = JSON.stringify(keybinds);
  let ok = Object.keys(keybinds);
  let tmpBinds = [];
  for(let j = 0; j < ok.length; j++){
    let dat = keybinds[ok[j]];
    let l = document.createElement("p");
    l.innerHTML = dat.name;
    d_keys_list.appendChild(l);
    let ok2 = Object.keys(dat);
    for(let i = 1; i < ok2.length; i++){
      let bind = dat[ok2[i]];
      let d = document.createElement("div");
      d.style.fontSize = "14px";
      d.style.paddingTop = "10px";
      d.style.paddingBottom = "10px";
      d_keys_list.appendChild(d);
      let l2 = document.createElement("span");
      l2.style.marginLeft = "10px";
      l2.className = "prev";
      l2.innerHTML = bind[0]+":";

      let b1 = document.createElement("button");
      let b2 = document.createElement("button");
      b1.innerHTML = "Change";
      b2.innerHTML = "Reset";
      b1.style.float = "right";
      b2.style.float = "right";
      d.appendChild(b2);
      d.appendChild(b1);
      b1.propRef = bind;
      b2.propRef = bind;
      b1.onclick = function(){
        changeKeybind(this.propRef);
      };
      b2.onclick = function(){
        resetKeybind(this.propRef);
      };

      if(false) if(isFirst){
        bind[5] = bind[1];
        bind[6] = bind[2];
        bind[7] = bind[3];
      }
      
      tmpBinds.push(bind);
      let isModified = false;
      if(bind[1] != bind[5] || bind[2] != bind[6] || bind[3] != bind[7]){
        isModified = true;
      }

      let l3 = document.createElement("span");
      l3.style.float = "right";
      l3.style.color = "gray";
      l3.style.marginRight = "20px";
      l3.style.fontStyle = "italic";
      l3.innerHTML = getKeybindName(bind);
      if(isModified) l3.style.color = "goldenrod";
      d.appendChild(l2);
      d.appendChild(l3);
      bind[9] = l3;

      d.onmouseenter = function(){
        resetKeySel();
        let ctrl = document.getElementsByClassName("key_control")[0];
        let shift = document.getElementsByClassName("key_shift")[0];
        let key = document.getElementsByClassName("key_"+bind[1].toLowerCase())[0];
        if(bind[2]) ctrl.classList.add("key_sel");
        if(bind[3]) shift.classList.add("key_sel");
        if(key) key.classList.add("key_sel");
      };
      d.onmouseleave = function(){
        resetKeySel();
      };
      //bind[10] = isModified;
    }
    let hr = document.createElement("hr");
    d_keys_list.appendChild(hr);
  }
  //find conflicts
  for(let i = 0; i < tmpBinds.length; i++){
    let b = tmpBinds[i];
    for(let j = i+1; j < tmpBinds.length; j++){
      let b2 = tmpBinds[j];
      //let isConflict = false;
      if(b[1] == b2[1] && !b[2] == !b2[2] && !b[3] == !b2[3]){
        //isConflict = true;
        //b[9].style.color = "red";
        //b2[9].style.color = "red";
        b[9].style.color = "red";
        b[9].classList.add("conf");
        b2[9].style.color = "red";
        b2[9].classList.add("conf");
      }
    }
  }
}
genKeybinds(true);

function cloneMulti(rev=false){
  if(!sel2Frames.length) return;
  let tmpI = project.frameI;
  let lI = sel2Frames[sel2Frames.length-1]+1;
  if(rev) lI = sel2Frames[0]+1;
  for(let i = 0; i < sel2Frames.length; i++){
    console.log("CLONE: ",sel2Frames[i],lI+i);
    cloneFrame(sel2Frames[i],lI+i,true);
  }
  reconstructFramesDiv();
  loadFrame(project.frames[tmpI]);
  let mode = "Clone Frames";
  if(rev) mode += "  (Reverse)";
  _histAdd(HistIds.full,null,mode);
}

//init2
const label = document.getElementById("label");
function init2(){
  let l = document.getElementsByName("info");//tools_d.children;
  for(let i = 0; i < l.length; i++){
    let c = l[i];
    regNewLabel(c);
  }

  //hardcoded init
  let b_swapCur = document.getElementById("b_swapCur");
  let b_swapPallet = document.getElementById("b_swapPallet");
  b_swapCur.onclick = function(){
    // keybinds.color.swapCur;
    swapCurColor();
  };
  b_swapPallet.onclick = function(){
    swapColors();
  };
  regNewLabel(b_swapCur);
  regNewLabel(b_swapPallet);

  const b_clone = document.getElementById("sel2_clone");
  const b_cloneR = document.getElementById("sel2_cloneR");
  b_clone.onclick = function(){
    cloneMulti();
  };
  b_cloneR.onclick = function(){
    if(!sel2Frames.length) return;
    let tmp = deepClone(sel2Frames);
    for(let i = 0; i < sel2Frames.length; i++){
      sel2Frames[i] = tmp[tmp.length-i-1];
    }
    cloneMulti(true);
  };

  const i_shelves = document.getElementById("i_shelves");
  i_shelves.check = function(){
    if(!this.value) this.value = 1;
    let v = parseInt(this.value);
    let max = Math.floor((innerHeight-50)/86);
    if(v < 1) v = 1;
    else if(v > max) v = max;
    this.value = v;
    return v;
  };
  i_shelves.onwheel = function(){
    let v = parseInt(this.value);
    requestAnimationFrame(()=>{this.check();});
  };
  WhenEnter(i_shelves,function(a){
    let v = a.check();
    // console.log("RUN: ",v,frames_d.getBoundingClientRect().height);
    frames_d.style.height = (86*v+14)+"px";
  });
  i_shelves._f(i_shelves);

  //Hex
  let c1 = deepClone(color[0]);
  let c2 = deepClone(color[1]);
  let hex1 = rgbaToHex(c1[0],c1[1],c1[2],c1[3]);
  let hex2 = rgbaToHex(c2[0],c2[1],c2[2],c2[3]);
  hex1i.value = hex1.replace("#","");
  hex2i.value = hex2.replace("#","");
  WhenEnter(hex1i,(a)=>{
    let cc = hexToR_g_b_a(a.value);
    color[0] = cc;
    updateNewCol();
  });
  WhenEnter(hex2i,(a)=>{
    let cc = hexToR_g_b_a(a.value);
    color[1] = cc;
    updateNewCol();
  });
}

/**
 * 
 * @param {HTMLElement} c 
 */
function regNewLabel(c){
  c.addEventListener("mouseenter",()=>{
    label.textContent = "";
    let txt = c.getAttribute("info");
    let pos = c.getAttribute("pos");
    if(!txt?.length){
      label.style.visibility = "hidden";
      return;
    }
    label.style.visibility = "unset";
    let kb = c.kb;
    let titleTxt = c.getAttribute("header");
    if(!titleTxt){
      if(kb) titleTxt = "Keybind: "+getKB(kb);
    }
    if(titleTxt){
      let title = document.createElement("div");
      title.style = "font-style:italic;color:darkgray";
      // titleTxt += " ---";
      title.textContent = titleTxt;
      label.appendChild(title);
    }
    let span = document.createElement("div")
    span.textContent = txt;
    label.appendChild(span);
    let r = c.getBoundingClientRect();
    let r1 = label.getBoundingClientRect();
    if(pos=="r") if(r.right+r1.width+10 >= innerWidth) pos = "l";
    if(pos == null || pos == "r"){
      label.style.left = (r.left+r.width+10)+"px";
      label.style.top = r.top+"px";
    }
    else if(pos == "l"){
      label.style.left = (r.left-10-r1.width)+"px";
      label.style.top = r.top+"px";
    }
    else if(pos == "u"){
      label.style.left = r.left+"px";
      label.style.top = (r.top-10-r1.height)+"px";
    }
    else if(pos == "d"){
      label.style.left = r.left+"px";
      label.style.top = (r.bottom+10)+"px";
    }
  });
  c.addEventListener("mouseleave",()=>{
    label.style.visibility = "hidden";
  });
  if(!c.regKB){
    let kb = c.getAttribute("kb");
    c.kb = kb;
    c.regKB = true;
  }
}

init2();

let frameDir = (window.localStorage.frameDir=="true"?true:false) || false;
frameDir = !frameDir;
let frames_d_par = frames_d.parentNode;
function toggleFrameDir(t){
  frameDir = !frameDir;
  let tt = t;
  if(!tt) tt = document.getElementById("frame_dir");
  if(tt){
    if(frameDir) tt.textContent = "swap_vert";
    else tt.textContent = "swap_horiz";
  }
  if(frameDir){
    let cont2 = document.getElementsByClassName("cont-cont")[0];
    let l2 = frames_d;
    l2.classList.add("v");
    frames_d_par.classList.add("v");
    cont2.children[0].children[0].children[0].insertBefore(l2,cont2.children[0].children[0].children[0].children[1]);
  }
  else{
    let cont2 = document.getElementsByClassName("cont-cont")[0];
    let l2 = frames_d;
    l2.classList.remove("v");
    frames_d_par.classList.remove("v");
    frames_d_par.appendChild(l2);
    frames_d_par.style.height = "110px";
  }
  if(t) window.localStorage.frameDir = frameDir;
}
toggleFrameDir();

/**
 * 
 * @param {String} s 
 */
function getKB(s){
  let l = s.split(".");
  let r = keybinds;
  while(l.length){
    r = r[l.splice(0,1)];
  }
  let key = r[1];
  key = key.toUpperCase();
  if(r[3]) key = "Shft+"+key;
  if(r[2]) key = "Ctrl+"+key;
  return key;
}

let useZen = false;
const b_zen = document.getElementById("b_zen");
const color_d = document.getElementById("color");
const preview_d = document.getElementById("preview");
function hide(e,v){
  if(v) e.style.visibility = "unset"; //visible
  else e.style.visibility = "hidden"; //hidden
}
function toggleZen(){
  useZen = !useZen;
  let v = !useZen;
  if(v) b_zen.textContent = "visibility";
  else b_zen.textContent = "visibility_off";
  hide(tools_d,v);
  hide(hist_d.parentNode,v);
  hide(layers_d.parentNode,v);
  hide(frames_d.parentNode,v);
  hide(color_d,v);
  hide(preview_d,v);
  if(v){
    color_d.classList.remove("zen");
    sw2.classList.remove("zen");
    sw.classList.remove("zen");
  }
  else{
    color_d.classList.add("zen");
    sw2.classList.add("zen");
    sw.classList.add("zen");
  }
}

if(false){
  const bimg = document.getElementById("back_img");
  bimg.src = "https://cdn.vox-cdn.com/thumbor/7CQOTCxlqSRJpADAIvwcx5IreLI=/0x0:1920x1080/2120x1413/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/60727745/minecraft_steve.0.0.jpg";
  bimg.onload = function(){
    if(this.width >= this.height) bimg.style.width = "100%";
    else bimg.style.height = "100%";
  };
  can.style.backgroundImage = "unset";
  can.style.backgroundColor = "unset";
}

window.onbeforeunload = function(){
  if(!project.unsaved) return;
  if(project.hist.length <= 1) return;
  alert("test");
  return confirm("Yes?");
};

//Objs
const obj_icons = [
  "view_in_ar",
  "directions_run",
  "view_in_ar",
];
const obj_names = [
  "OBJ",
  "ARM",
  "OBJ"
];
function reloadObjsList(){
  /**@type {Obj[]} */
  let all = project.objs;//.concat(getCurFrame().arms);
  objList.innerHTML = "";
  for(let i = 0; i < all.length; i++){
    let o = all[i];
    let icon = document.createElement("div");
    icon.className = "material-icons";
    icon.textContent = obj_icons[o.type];
    icon.style = "border-right:solid 1px gray";
    let sets = document.createElement("div");
    sets.className = "material-icons";
    sets.textContent = "settings";
    let d = document.createElement("div");
    let name = document.createElement("div");
    name.textContent = o.name;
    d.appendChild(icon);
    d.appendChild(name);
    d.appendChild(sets);
    objList.appendChild(d);

    let list = [
      "Add to frame",
      "View cached state",
      "Delete"
    ]
    if(o.type == ObjType.arm){
      list.splice(1,0,"Scale by","Update from active layer");
    }
    createDropdown(0,list,[],(j,a)=>{
      let la = list[j];
      if(la == "Add to frame"){
        createLayer(1,obj_names[o.type]+": "+o.name,{obj:o.clone()});
      }
      else if(la == "Scale by"){
        let amt = parseFloat(prompt("Multiplier to scale by"));
        if(!amt) return;
        if(amt < 0) return;
        if(amt == 1) return;
        for(let k = 0; k < project.frames.length; k++){
          let frame = project.frames[k];
          for(let k1 = 0; k1 < frame.layers.length; k1++){
            let layer = frame.layers[k1];
            if(layer.ops.obj){
              if(layer.ops.obj.name == o.name) layer.ops.obj.scaleBy(amt);
            }
          }
        }
        _histAdd(HistIds.full,null,"Scale armature");
      }
      else if(la == "Update from active layer"){
        let l = img.curLayer;
        if(!l.ops.obj){
          console.warn("Not an obj layer");
          return;
        }
        let state = l.ops.obj.getState();
        o.loadState(state);
      }
      else if(la == "View cached state"){
        project = createNewProject("tmp_viewObj_"+o.name,project.w,project.h);
        addProject(project);
        resizeImage(project.w,project.h);
        createFrame(0);
        project.hist = [];
        project.histI = -1;
        reconstructFramesDiv();
        reconstructLayersDiv();
        reconstructHistDiv_new();
        loadProject(project); //clean-up
        project.frames[0].layers[0].ops.obj = o.clone();
        _histAdd(HistIds.full,null,"*View tmp project");
      }
      else if(la == "Delete"){ //Delete
        if(!confirm("Deleting an object will ALSO DELETE ALL OCCURENCES OF THAT OBJECT IN THE PROJECT. Continue?")) return;
        for(let a = 0; a < project.frames.length; a++){
          let frame = project.frames[a];
          selectFrame(a);
          for(let b = 0; b < frame.layers.length; b++){
            let l = frame.layers[b];
            if(l.ops.obj) if(l.ops.obj.name == o.name){
              //l.nob.buf.fill(0);
              //delete l.ops.obj;
              deleteLayer_bare(b);
              b--;
            }
          }
        }
        project.objs.splice(project.objs.indexOf(o),1);
        selectFrame(0);
        selectLayer_bare(0);
        reloadObjsList();
        reconstructFramesDiv();
        reconstructLayersDiv();
        _histAdd(HistIds.full,null,"Delete obj");
      }
    },sets,true);
  }
}

autoSaveF();