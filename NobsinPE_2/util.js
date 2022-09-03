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
}