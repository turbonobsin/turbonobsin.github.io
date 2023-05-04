const hexBg = document.getElementById("hex-bg");

/**@type {HTMLElement} */
let hex = null;

let rad = 32;
let w = rad*2;

for(let i = 0; i < 1; i++){
    for(let j = 0; j < 1; j++){
        let div = document.createElement("div");
        // viewBox="0 0 150 150"
        // <path d="M 50 5 L 95 30 L 95 70 L 50 95 L 5 70 L 5 30 Z" />
        // <path d="M 8 0 L 24 0 L 32 16 L 24 32 L 8 32 L 0 16 z" fill="white"/>
        let points = [];
        for(let i = 0; i < Math.PI*2; i += Math.PI*2/6){
            points.push([rad+Math.cos(i)*rad,rad+Math.sin(i)*rad]);
        }
        let str = "";
        let i = 0;
        for(const p of points){
            if(i == 0) str += "M ";
            else str += "L ";
            str += p[0]+" "+p[1]+" ";
            i++;
        }
        div.className = "svgCont";
        div.innerHTML = `
            <svg width="${w}" height="${w}">
                <path d="${str} z" fill="currentColor" stroke="gray" stroke-width="5px"/>
            </svg>
            <svg width="${w}" height="${w}">
                <path d="${str} z" fill="#666" stroke="#444" stroke-width="5px"/>
            </svg>
        `;
        // hexBg.appendChild(div);
        hex = div;
    }
}

//////

// let xAmt = Math.ceil(innerWidth/w);
// let yAmt = Math.ceil(innerHeight/w);
// let xAmt = Math.ceil(innerWidth/w)*0.8+5; //*1.25
// let yAmt = Math.ceil(innerHeight/w)*0.8*3.5+5; //*1.25
let xAmt = Math.ceil(innerWidth/w)/2+5; //*1.25
let yAmt = Math.ceil(innerHeight/w)*2+7; //*1.25
let isEven = false;
let tab = document.createElement("table");
for(let i = 0; i < yAmt; i++){
    let tr = document.createElement("tr");
    if(isEven) tr.style.transform = `translateX(${50}px)`; //25
    else tr.style.transform = "translateX(0px)";
    for(let j = 0; j < xAmt; j++){
        let clone = hex.cloneNode(true);
        let div = clone.children[0];
        let div2 = clone.children[1];
        let td = document.createElement("td");
        td.appendChild(div);
        td.appendChild(div2);
        tr.appendChild(td);
        if(i > yAmt*0.25 && i < yAmt*0.75 && j > xAmt*0.25 && j < xAmt*0.75) setTimeout(()=>{
            td.children[0].classList.add("flip");
        },100+i*35+j*25); //i*j/1000
    }
    hexBg.appendChild(tr);
    // tab.appendChild(tr);
    isEven = !isEven;
}
// hexBg.appendChild(tab);

async function start(){
    await wait(0);
    for(let i = 0; i < xAmt; i++){
        hexBg.children[Math.floor(yAmt/2)].children[i].children[0].classList.add("flip");
    }
}
// start();

function wait(delay){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },delay);
    });
}