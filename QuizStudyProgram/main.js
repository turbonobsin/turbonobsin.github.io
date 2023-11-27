let useShuffle = false;

function objToMap(data){
    let map = new Map();
    let ok = Object.keys(data);
    if(useShuffle) ok.sort(v=>Math.random()-0.5);
    for(const key of ok){
        map.set(key,data[key]);
    }
    return map;
}

class TermsFile{
    constructor(name,terms){
        this.name = name;
        this.terms = objToMap(terms);
    }
    /**@type {Map<string,string>} */
    terms;
    name;
}
let file, file2;
function construct(){
    file = new TermsFile("Chapter 11",{
        "Strength":"how much weight can a given material support? What is its breaking point when it is twisted, folded, or bent?",
        "Workability":"how difficult is it to alter the shape of a material? Does it cut and bend easily? Can it be melted and cast or dripped to create a new form?",
        "Durability":"What range of forces can this material withstand and for how long? Is it impervious to heat, water, wind, and ultraviolet light?",
        "Weight":"material that is too light for a given purpose can be as problematic as a material that is too heavy. What is the function of that project, and how can material weight best serve that function",
        "Cost":"can the material chosen be obtained easily and at a reasonable cost? If you budget is limited, you may have to remove expensive materials from consideration",
        "Toxicity":"many plastics produce toxic gases when they are cut, etched, or burned",
        "Function":"how appropriate is a given material for a particular purpose?",
        "Composite":"created when two or more materials of differing strengths are fused together",
        "Skeleton":" (or endoskeleton) provides the internal structure needed by mammals and fish while insects and many sea creatures rely on an external exoskeleton for support",
        "Flying buttress":"to increase building height while reducing mass, medieval architects developed this - it was used in hundreds of cathedrals throughout Europe",
        "Armature":"artists and designers often use this to create internal structure",
        "Additive sculpture":"the artwork is created from separate parts that have been connected, usually using glues, joints, stitching, or welds",
        "Assemblage":"an example of an additive method - when things are put together that were originally for a different purpose",
        "Modeling":"is an additive process often used by ceramicists, pinching and pushing the pliable clay",
        "Subtractive sculpture":"the artist removes materials from a larger mass: carving, drilling, cutting, and turning on a lathe are all subtractive processes",
        "Solidification":"a liquid material is poured into a mold or extruded through a pipe, then allowed to harden",
        "Displacement":"a solid material is physically forced into a new configuration",
        "Visual connections":"unify multiple surfaces",
        "Physical connections":"increase strength, flexibility, functionality, and stability",
        "Gradation":"creates sequential change within a constant pattern",
        "Ephemera":"materials that rapidly decay or trash which is already in a state of decay"
    });
    file2 = new TermsFile("Chapter 8",{
        "Iconography":"the study of cultural and historical symbolic visual systems",
        "Stereotype":"a fixed generalization based on a preconception",
        "Cliche":"an overused expression or a predictable treatment of an idea",
        "Analogy":"creates a general connection between unrelated objects or ideas",
        "Simile":"creates a connection using 'like' or 'as'",
        "Metaphor":"more explicit; 'is' - (creates a connection)",
        "Metaphorical thinking":"can be used to connect an image and an idea",
        "Anesthetic":"used to induce insensitivity or unconsciousness",
        "Aesthetic":"the study of human responses to beauty",
        "Postmodernism":"contemporary art and design",
        "Modernism":"general term that encompasses a wide range of individual movements that began in Europe in 19th century (World War I)",
        "Form":"the physical manifestation of an idea",
        // "-":"Five common characteristics of postmodern art:",
        "Appropriation":"\t - the reuse of an existing artwork",
        "Recontextualization":"\t - another postmodern strategy (process that extracts text, signs or meaning from its original context AND THEN REUSES IT IN ANOTHER CONTEXT)",
        "Layering":"used to create complex or contradictory meanings",
        "Hybridity":"the creation of artworks using disparate media and meanings to create a unified statement"
    });
}
construct();

let main = document.querySelector(".area");
let cb_random = document.querySelector(".cb-random");
let b_cp11 = document.querySelector(".b-cp11");
let b_cp8 = document.querySelector(".b-cp8");
let b_check = document.querySelector(".b-check-answers");
b_cp11.onclick = function(){
    selectFile(file);
};
b_cp8.onclick = function(){
    selectFile(file2);
};
cb_random.onclick = function(){
    useShuffle = cb_random.checked;
    let i = (_file == file ? 0 : file2);
    construct();
    if(i == 0) _file = file;
    else _file = file2;
    loadTerms(_file);
};
b_check.onclick = function(){
    checkAnswers(_file);
};

/**
 * @param {TermsFile} file 
 */
function loadTerms(file){
    let terms = file.terms;

    main.textContent = "";
    
    let header = document.createElement("h2");
    header.textContent = "Quiz: "+file.name;
    main.appendChild(header);

    for(const [k,v] of terms){
        let div = document.createElement("div");
        if(k == "-") div.innerHTML = `<input style="display:none"><h2>${v}</h2>`;
        else div.innerHTML = `<input><div>${v}</div>`;
        main.appendChild(div);
    }
}

function compare(a,b){
    if(!a || !b) return 999;
    // if(a.length != b.length) return 999;
    let flags = 0;
    let longer = a;
    if(b.length > a.length) longer = b;
    for(let i = 0; i < longer.length; i++){
        if(a[i] != b[i]) flags++;
    }
    return flags;
}

/**
 * @param {TermsFile} file 
 */
function checkAnswers(file){
    let inps = main.querySelectorAll("input");
    let ans = [];
    let map = [...file.terms];
    function tweak(s){
        if(!s) return s;
        return s.toLowerCase().trim().replaceAll(" ","");
    }
    for(let i = 0; i < inps.length; i++){
        let v = tweak(inps[i].value);
        let answer = tweak(map[i][0]);
        if(answer == "-") continue;
        let res = compare(v,answer) < Math.ceil(answer.length*0.25);
        // let res = compare(v,answer) < 1;
        ans.push(res);
        inps[i].parentElement.className = "";
        inps[i].parentElement.classList.add(res?"correct":"wrong");
        if(!res) inps[i].value = map[i][0]+" (yours: "+inps[i].value+")";
    }
}

let _file = file;

document.addEventListener("keydown",e=>{
    let key = e.key.toLowerCase();
    if(key == "enter"){
        checkAnswers(_file);
    }
});

loadTerms(_file);

_file = file;

function selectFile(file){
    _file = file;
    loadTerms(_file);
}