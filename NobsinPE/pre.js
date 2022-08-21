var darkModeStyle = document.createElement("link");
darkModeStyle.rel = "stylesheet";
darkModeStyle.href = "darkMode.css";
function toggleContrastMode(){
  let b = document.getElementById("darkMode_b");
  if(darkModeStyle.parentNode == document.head){
    document.head.removeChild(darkModeStyle);
    b.innerHTML = "wb_sunny";
    window.localStorage.setItem("theme","light");
    return;
  }
  else{
    document.head.appendChild(darkModeStyle);
    b.innerHTML = "nightlight";
    window.localStorage.setItem("theme","dark");
  }
}
function setContrastMode(v){
  let b = document.getElementById("darkMode_b");
  if(v){
    document.head.appendChild(darkModeStyle);
    b.innerHTML = "nightlight";
  }
  else{
    document.head.removeChild(darkModeStyle);
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
  if(theme == "dark") toggleContrastMode();
})();
//setContrastMode(true);