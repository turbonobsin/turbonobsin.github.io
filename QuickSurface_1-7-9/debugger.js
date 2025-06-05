var dev_console = document.createElement("div");
dev_console.id = "dev_console";
dev_console.style.visibility = "hidden";
document.body.insertBefore(dev_console,document.body.children[0]);
var dev_log = document.createElement("div");
dev_log.id = "dev_log";
dev_console.appendChild(dev_log);
var dev_inp = document.createElement("input");
dev_inp.id = "dev_inp";
dev_inp.placeholder = "Debug command..."
dev_console.appendChild(dev_inp);

var dev_auto = document.createElement("div");
dev_auto.id = "dev_auto";
dev_auto.style.visibility = "hidden";
document.body.appendChild(dev_auto);
function displayAutoOptions(o){
    dev_auto.innerHTML = "";
    dev_auto.style.visibility = "visible";
    dev_auto.style.bottom = "20px";
    dev_auto.style.left = "20px";
    if(typeof o != "object" && typeof o != "string") return;
    let ok = Object.keys(o);
    for(let i = 0; i < ok.length; i++){
        let k = ok[i];
        let v = o[k];
        let d = document.createElement("div");
        let name = document.createElement("span");
        let val = document.createElement("span");
        name.innerHTML = k;
        val.innerHTML = typeof v;
        d.appendChild(name);
        d.appendChild(val);
        dev_auto.appendChild(d);
    }
}

var oldlog = console.log;
var iii = 0;
var scriptURLS = {};
var offline = (window.location.protocol.startsWith("file"));
offline = true;
function registerScript(src,logging,erroring,call){
    if(offline){
        let s = document.createElement("script");
        s.src = src;
        s.onload = ()=>{
            iii++;
            let d = dev_scripts[iii];
            if(d) registerScript(d.src,d.log,d.error);
        };
        document.body.appendChild(s);
    }
    else fetch("/"+src).then(res=>res.text()).then(data=>{
        if(!data){
            console.error("Script could not be loaded: "+src);
            return;
        }
        let list = data.split("\n");
        for(let i = 0; i < list.length; i++){
            while(list[i].includes("console.log(")){
                list[i] = list[i].replace("console.log(","con_log('"+src+"',"+(i+1)+",");
            }
        }
        let f = list.join("\n");
        //oldlog(f);
        
        let s = document.createElement("script");
        let blob = new Blob([f]);
        let url = URL.createObjectURL(blob);
        scriptURLS[url.replace(window.location.origin,"").replace("/","")] = src;
        s.src = url;
        s.onload = ()=>{
            oldlog("loaded...");
            iii++;
            let d = dev_scripts[iii];
            if(d) registerScript(d.src,d.log,d.error);
        };
        document.body.appendChild(s);
    });
}
async function ca(i){
    let d = dev_scripts[i];
    oldlog(d);
    if(d) await registerScript(d.src,d.log,d.error,function(){
        //oldlog("222");
        //ca(i+1);
    });
}
var dev_scripts = [
    {
        src:"test.js",
        log:true,
        error:true
    },
    {
        src:"conversions.js",
        log:true,
        error:true
    },
    {
        src:"NobsinEngine.js",
        log:true,
        error:true
    },
    {
        src:"script.js",
        log:true,
        error:true
    }
];
registerScript("test.js",true,true);
(async ()=>{
    //await ca(0);
    //await ca(1);
    //await ca(2);
    //await ca(3);
})();

document.addEventListener("keydown",e=>{
    let key = e.key;
    if(document.activeElement.tagName != "INPUT"){
        if(key == "/"){
            if(dev_console.style.visibility == "hidden"){
                dev_console.style.visibility = "visible";
                window.requestAnimationFrame(function(){
                    dev_inp.focus();
                });
            }
            else{
                dev_console.style.visibility = "hidden";
            }
        }
    }
    else{

    }
});
var dev_inpHist = [];
var dev_inpI = -1;
var az = "abcdefghijklmnopqrstuvwxyz0123456789_";
dev_inp.oninput = function(){
    let t = this.value;
    let flist = t.split(".");
    let list = [];
    for(let i = 0; i < flist.length; i++){
        let s = flist[i];
        list.push(...s.split("["));
    }
    let o = window;
    let lastO = window;
    for(let i = 1; i < list.length; i++){
        let s = list[i-1];
        let name = "";
        for(let j = 0; j < s.length; j++){
            if(az.includes(s[j].toLowerCase())) name += s[j];
            else break;
        }
        if(o != null) if(typeof o == "object"){
            o = o[name];
            if(o != null) lastO = o;
        }
    }
    if(lastO != null){
        let type = typeof lastO;
        let display = false;
        if(list.length != 1) if(type == "object" || type == "string") display = true;
        if(display) displayAutoOptions(lastO);
        else dev_auto.style.visibility = "hidden";
        this.style.backgroundColor = (type == "function"?"lightgreen":"lightblue");
    }
    else{
        this.style.backgroundColor = "white";
        dev_auto.style.visibility = "hidden";
    }
};
dev_inp.onkeydown = function(e){
    let key = e.key.toLowerCase();
    if(key == "arrowup"){
        if(this.value.length != 0) dev_inpI--;
        if(dev_inpI < 0) dev_inpI = 0;
        if(dev_inpHist[dev_inpI]) this.value = dev_inpHist[dev_inpI];
        else this.value = "";
    }
    else if(key == "arrowdown"){
        if(this.value.length != 0) dev_inpI++;
        if(dev_inpI >= dev_inpHist.length) dev_inpI = dev_inpHist.length-1;
        if(dev_inpHist[dev_inpI]) this.value = dev_inpHist[dev_inpI];
        else this.value = "";
    }
    else if(this.value.length > 0) if(key == "enter"){
        let f = null;
        if(this.value.startsWith("var")){
            let s = this.value.replace("var","").trim();
            let name = "";
            for(let i = 0; i < s.length; i++){
                if(az.includes(s[i])) name += s[i];
                else break;
            }
            let val = s.split("=")[1].trim();
            val = Function("return "+val)();
            //if(parseInt(val) == val) val = parseInt(val);
            //else if(parseFloat(val) == val) val = parseFloat(val);
            //else if(JSON.stringify(JSON.parse(val)) == val) val = JSON.parse(val);
            window[name] = val;
            f = Function("return null");
        }
        else f = Function("return "+this.value);
        let res = null;
        con_log(null,null,"*txt:> ","*txt:"+this.value);
        try{
            res = f();
        }
        catch(err){
            res = "*err:"+err.message;
        }
        con_log(null,null,"*txt:< ",res);
        if(this.value != dev_inpHist[dev_inpI]){
            dev_inpI++;
            dev_inpHist.splice(dev_inpI,0,this.value);
        }
        this.value = "";
        this.style.backgroundColor = "white";
        dev_auto.style.visibility = "hidden";
    }
};
var lastlog = null;
var azstr = `'"`;
function con_log(src,lineNum,...v){
    let str = src+":"+lineNum+":";
    for(const l of v) str += JSON.stringify(l)+",";
    if(str == lastlog){
        let lastcont = dev_log.lastChild;
        lastcont.times++;
        if(lastcont.times > 1){
            lastcont.children[0].innerHTML = `(${lastcont.times})`;
            lastcont.children[0].style.marginRight = "10px";
        }
        dev_log.scrollTop = dev_log.scrollHeight;
        lastcont.children[1].style.width = (window.innerWidth-lastcont.children[0].offsetWidth-35.5)+"px";
        return;
    }
    else lastlog = str;
    let cont = document.createElement("div");
    let num = document.createElement("span");
    cont.appendChild(num);
    let d = document.createElement("div");
    cont.times = 1;
    if(lineNum != null || src != null){
        let s = document.createElement("span");
        s.className = "dev_lineNum";
        s.innerHTML = src+":"+lineNum;
        d.appendChild(s);
    }
    for(var l of v){
        if(typeof l == "string"){
            if(l.startsWith("*err:")){
                var s = document.createElement("span");
                s.innerHTML = l.substring(5,l.length);
                s.style.color = "red";
                d.appendChild(s);
                continue;
            }
            else if(l.startsWith("*txt:")){
                var s = document.createElement("span");
                s.innerHTML = l.substring(5,l.length);
                d.appendChild(s);
                continue;
            }
            else if(l.startsWith("*pre:")){
                var s = document.createElement("pre");
                s.innerHTML = l.substring(5,l.length);
                d.appendChild(s);
                continue;
            }
        }
        if(l == null){
            var s = document.createElement("span");
            s.innerHTML = "null";
            s.style.color = "darkmagenta";
            d.appendChild(s);
        }
        else switch(typeof l){
            case "string":
                var s = document.createElement("span");
                if(!azstr.includes(l[0])) l = "'"+l;
                if(!azstr.includes(l[l.length-1])) l += "'";
                s.innerHTML = l;
                s.style.color = "seagreen";
                d.appendChild(s);
                break;
            case "number":
                var s = document.createElement("span");
                s.innerHTML = l;
                s.style.color = "blue";
                d.appendChild(s);
                break;
            case "boolean":
                var s = document.createElement("span");
                s.innerHTML = l;
                s.style.color = "darkmagenta";
                d.appendChild(s);
                break;
            case "object":
                var s = document.createElement("pre");
                s.innerHTML = JSON.stringify(l,null,2);
                d.appendChild(s);
                break;
            case "function":
                var s = document.createElement("pre");
                s.innerHTML = l.toString();
                d.appendChild(s);
                break;
        }
    }
    /*let lastcont = dev_log.lastChild;
    if(lastcont) if(lastcont.children[1].innerHTML == d.innerHTML){
        lastcont.times++;
        if(lastcont.times > 1){
            lastcont.children[0].innerHTML = `(${lastcont.times})`;
            lastcont.children[0].style.marginRight = "10px";
            //lastd.innerHTML = "<span>("+lastd.times+")  </span>"+lastd.innerHTML;
        }
        dev_log.scrollTop = dev_log.scrollHeight;
        lastcont.children[1].style.width = (window.innerWidth-lastcont.children[0].offsetWidth-35.5)+"px";
        return;
    }*/
    cont.appendChild(d);
    dev_log.appendChild(cont);
    dev_log.scrollTop = dev_log.scrollHeight;
}
console.log = function(...v){
    con_log(null,null,...v);
    oldlog(...v);
};
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        con_log(null,null,"*err:Script Error. If you are offline errors cannot be shown.");
      //alert('Script Error: See Browser Console for Detail');
    } else {
      var message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error)
      ].join(' - ');
  
      //oldlog(message);
      url = url.replace(window.location.origin,"").replace("/","");
      let src = scriptURLS[url];
      con_log(src?src:url,lineNo+":"+columnNo,"<span style='color:red'>"+msg+"</span>");
    }
  
    return false;
  };

console.log("bob",1,2,{bob:123});