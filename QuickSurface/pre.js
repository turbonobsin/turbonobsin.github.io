let allThemes = [];
function createThemeStyle(url){
  let e = document.createElement("link");
  e.rel = "stylesheet";
  e.href = url;
  allThemes.push(e);
  return e;
}
let darkModeStyle = createThemeStyle("darkMode.css");
let lightModeStyle = createThemeStyle("light.css");
let curTheme = "light";
function toggleContrastMode(){
  let b = document.getElementById("darkMode_b");
  for(let i = 0; i < allThemes.length; i++) if(allThemes[i].parentNode) document.head.removeChild(allThemes[i]);
  if(curTheme == "dark"){
    document.head.appendChild(lightModeStyle);
    b.innerHTML = "wb_sunny";
    window.localStorage.setItem("theme","light");
    curTheme = "light";
    return;
  }
  else{
    document.head.appendChild(darkModeStyle);
    b.innerHTML = "nightlight";
    window.localStorage.setItem("theme","dark");
    curTheme = "dark";
  }
}
function setContrastMode(v){
  let b = document.getElementById("darkMode_b");
  for(let i = 0; i < allThemes.length; i++) if(allThemes[i].parentNode) document.head.removeChild(allThemes[i]);
  if(v){
    document.head.appendChild(darkModeStyle);
    b.innerHTML = "nightlight";
  }
  else{
    document.head.appendChild(lightModeStyle);
    b.innerHTML = "wb_sunny";
  }

  return;

  let menuBar = document.getElementsByClassName("menuBar")[0];
  let toolBar = document.getElementById("toolBar");
  let ctxes = document.getElementById("ctxes");
  let menus = document.getElementsByClassName("menu");

  let hist = document.getElementById("hist");
  let tools = document.getElementById("tools");
  let layers = document.getElementById("layers");
  let frames = document.getElementById("frames");
  
  let f = (v?"invert(1)":"unset");
  menuBar.style.filter = f;
  toolBar.style.filter = f;
  ctxes.style.filter = f;
  hist.style.filter = f;
  tools.style.filter = f;
  //layers.style.filter = f;
  frames.style.filter = f;
  for(let i = 0; i < menus.length; i++){
    menus[i].style.filter = f;
  }
}
(()=>{
  let theme = window.localStorage.getItem("theme");
  curTheme = theme;
  if(theme == "dark") setContrastMode(true);
  else setContrastMode(false);
})();
//setContrastMode(true);



