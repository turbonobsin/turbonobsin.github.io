function moveProg2(dir){
    let l = document.getElementsByClassName("prog_title");
    let cRect = cur.ref.getBoundingClientRect();
    let close = null;
    let closeDist = 99999;
    for(let i = 0; i < l.length; i++){
        let a = l[i];
        let rect = a.getBoundingClientRect();
        let dx = (cRect.x+cRect.width/2)-(rect.x+rect.width/2);
        let dy = (cRect.y+cRect.height/2)-(rect.y+rect.height/2);
        let dist = Math.sqrt(dx**2+dy**2);
        if(dist < closeDist){
            if(dir == 3){
                //if(
            }
        }
    }
}

cur.ref.parentNode.parentNode.parentNode.parentNode.nextElementSibling

function moveProg1(dir){
    if(dir == 3){
        cur.ref = cur.ref.parentNode.parentNode.parentNode.parentNode.nextElementSibling;
        selectProg(cur.ref);
    }
    if(dir == 2){
        cur.ref = cur.ref.parentNode.parentNode.parentNode.parentNode.previousElementSibling;
        selectProg(cur.ref);
    }
    if(dir == 0){
        cur.ref = cur.ref.parentNode.parentNode.parentNode.parentNode.nextElementSibling;
        cur.ref.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.children[0].children[0].nextElementSibling
        selectProg(cur.ref);
    }
    if(dir == 1){
        cur.ref = cur.ref.parentNode.parentNode.parentNode.parentNode.nextElementSibling;
        selectProg(cur.ref);
    }
}

////////

function moveProg(dir){
    let cRect = cur.ref.parentNode.parentNode.parentNode.parentNode.getBoundingClientRect();
    let cx = cRect.x+cRect.width/2;
    let cy = cRect.y+cRect.height/2;
    let paddingRight = 100;
    let paddingLeft = 200;
    let paddingV = 100;
    if(cx >= innerWidth-paddingRight) cx = innerWidth-paddingRight;
    else if(cx <= paddingLeft) cx = paddingLeft;
    if(cy >= innerHeight-paddingV) cy = innerHeight-paddingV;
    else if(cy <= paddingV) cy = paddingV;
    let dx = 0;
    let dy = 0;
    let amtY = cRect.height;
    let amtX = cRect.width/2+amtY/2;
    if(dir == 0) dy = -amtY;
    else if(dir == 1) dy = amtY;
    else if(dir == 2) dx = -amtX;
    else if(dir == 3) dx = amtX;
    let a = document.elementFromPoint(cx+dx,cy+dy);
    // console.log(cx,cy,dx,dy,a);
    if(a){
        while(!a.classList.contains("prog_title")){
            a = a.children[0];
            // console.log(a);
        }
        selectProg(a);
        cur.ref = a;
    }
    // console.log("FINISHED:",a);
}

function selectProg(a){
    deselectAllProg();
    a.parentNode.parentNode.style.border = "solid 4px white";
    a.parentNode.parentNode.classList.add("__sel");
}

function deselectAllProg(){
    let l = document.getElementsByClassName("__sel");
    for(let i = 0; i < l.length; i++){
        l[i].style.border = "revert";
        l[i].classList.remove("__sel");
    }
}

function selectElm(a){
    deselectAllProg();
    a.style.border = "solid 4px white";
    a.classList.add("__sel");
}

let cur = {ref:null};
cur.ref = document.elementFromPoint(innerWidth/2,300);
while(!cur.ref.classList.contains("prog_title")){
    cur.ref = cur.ref.children[0];
}
selectProg(cur.ref);

document.addEventListener("keydown",e=>{
    let k = e.key.toLowerCase();
    if(mode == "grid"){
        if(k == "arrowup") moveProg(0);
        else if(k == "arrowdown") moveProg(1);
        else if(k == "arrowleft") moveProg(2);
        else if(k == "arrowright") moveProg(3);
        else if(k == "enter"){
            cur.ref.click();
            mode = "";
            setTimeout(function(){
                mode = "watch/rec";
                cur.ref2 = document.querySelector(".btn_parent").children[0];
                selectElm(cur.ref2);
                console.log(cur.ref2);
            },750);
            // cur.width = cur.ref2.getBoundingClientRect().width;
        }
        e.preventDefault();
    }
    else if(mode == "watch/rec"){
        if(k == "arrowright"){
            if(cur.ref2.nextElementSibling){
                cur.ref2 = cur.ref2.nextElementSibling;
                selectElm(cur.ref2);
            }
        }
        else if(k == "arrowleft"){
            if(cur.ref2.previousElementSibling){
                cur.ref2 = cur.ref2.previousElementSibling;
                selectElm(cur.ref2);
            }
        }
        else if(k == "enter"){
            cur.ref2.click();
            mode = "";
        }
        else if(k == "escape"){
            deselectAllProg();
            cur.ref2 = null;
            document.querySelector(".btn_parent").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].click();
            mode = "grid";
            selectProg(cur.ref);
        }
    }

});

//

let mode = "grid";
//grid, watch/rec, confirm/cancel, vid
