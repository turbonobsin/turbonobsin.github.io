const d_locks = document.getElementById("d_locks");

interface Slider extends HTMLDivElement{
    vy:number;
    scrollAmt:number;
}

class ComboLock{
    constructor(code:number[]){
        this.code = code;
        let d = document.createElement("div");
        d.className = "lock";
        d_locks.appendChild(d);
        
        for(const num of code){
            let slider = document.createElement("div") as Slider;
            slider.vy = 0;
            slider.scrollAmt = 0;
            slider.className = "slider";
            for(let i = -1; i < 10; i++){
                let numDiv = document.createElement("div");
                numDiv.textContent = i.toString();
                slider.appendChild(numDiv);
            }
            d.appendChild(slider);
            this.sliders.push(slider);
            slider.onwheel = function(e){
                slider.vy += e.deltaY/10;
            };
        }

        let secretDiv = document.createElement("div");
        secretDiv.textContent = "Secret Text";
        secretDiv.className = "secret";
        d.appendChild(secretDiv);
        this.secretEle = secretDiv;

        let top = document.createElement("canvas");
        top.width = 200;
        top.height = 200;
        let ctx = top.getContext("2d");
        let rad = top.width/4;
        let halfW = top.width/2;
        let halfH = top.height/2;
        ctx.fillStyle = "darkslategray";
        ctx.fillRect(top.width-rad,top.height-halfH,rad,halfH);
        ctx.beginPath();
        ctx.arc(halfW,halfH,halfW,0,Math.PI,true);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(halfW,halfH,halfW/2,0,Math.PI,true);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill();
        d.appendChild(top);
        this.topEle = top;
        ctx.globalCompositeOperation = "source-over";
    }
    update(){
        let ready = [false,false,false];
        let h = 40;
        for(let i = 0; i < this.sliders.length; i++){
            let s = this.sliders[i];
            let drag = 0.95;
            let maxVel = 10;
            if(s.vy > maxVel) s.vy = maxVel;
            else if(s.vy < -maxVel) s.vy = -maxVel;
            s.vy *= drag;
            s.scrollAmt += s.vy;
            if(s.scrollAmt < h){
                s.scrollAmt = h;
                s.vy = 0;
            }
            else if(s.scrollAmt >= s.scrollHeight-h-54){
                s.scrollAmt = s.scrollHeight-h-54;
                s.vy = 0;
            }
            s.scrollTop = s.scrollAmt;
            let line = Math.round(s.scrollTop/h)*h;
            let dif = (s.scrollAmt-line);
            if(Math.abs(dif) <= h/2){ //4
                s.vy -= dif/20; //8
                s.vy *= 0.8;
            }
            if(Math.abs(dif) < 1){
                ready[i] = true;
            }
        }
        if(!ready.includes(false)){
            let check = true;
            for(let i = 0; i < this.sliders.length; i++){
                let s = this.sliders[i];
                let ind = Math.round(s.scrollAmt/h)-1;
                if(ind != this.code[i]){
                    check = false;
                    break;
                }
            }
            if(check) this.open();
        }
        else{
            this.isOpen = false;
            this.topEle.style.translate = "0px -50%";
            this.secretEle.classList.remove("blur");
        }
    }
    code:number[];
    sliders:Slider[] = [];
    vy = 0;
    isOpen = false;
    topEle:HTMLElement;
    secretEle:HTMLElement;
    TO = null;
    async open(){
        this.isOpen = true;
        this.topEle.style.translate = "0px -85%";
        await wait(800);
        if(!this.isOpen) return;
        this.secretEle.classList.add("blur");
    }
}

function wait(delay:number){
    return new Promise<void>(resolve=>{
        setTimeout(()=>{
            resolve();
        },delay);
    });
}

let lock = new ComboLock([1,2,3]);

function update(){
    requestAnimationFrame(update);
    lock.update();
}
update();