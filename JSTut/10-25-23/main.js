let square = document.getElementById("square");

// square.style.marginLeft = "100px";

let x = 0;
let y = 0;

let keys = {};

document.onkeydown = function(e){
    keys[e.key] = true;
};
document.onkeyup = function(e){
    keys[e.key] = false;
};

function loop(){
    requestAnimationFrame(loop);

    let speed = 10;

    if(keys.d){
        x += speed;
        square.style.marginLeft = x+"px";
        square.style.rotate = "0deg";
    }
    if(keys.a){
        x -= speed;
        square.style.marginLeft = x+"px";
        square.style.rotate = "180deg";
    }
    if(keys.w){
        y -= speed;
        square.style.marginTop = y+"px";
        square.style.rotate = "270deg";
    }
    if(keys.s){
        y += speed;
        square.style.marginTop = y+"px";
        square.style.rotate = "90deg";
    }
}
loop();

// document.onkeydown = function(e){
//     if(e.key == "ArrowRight"){
//         x += 40;
//         square.style.marginLeft = x+"px";
//     }
//     if(e.key == "ArrowLeft"){
//         x -= 40;
//         square.style.marginLeft = x+"px";
//     }
//     if(e.key == "ArrowUp"){
//         y -= 40;
//         square.style.marginTop = y+"px";
//     }
//     if(e.key == "ArrowDown"){
//         y += 40;
//         square.style.marginTop = y+"px";
//     }
// };