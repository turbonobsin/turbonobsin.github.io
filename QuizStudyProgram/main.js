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
    constructor(name,/**@type {[string,string|Object][]}*/terms){
        this.name = name;
        if(useShuffle){
            terms = terms.filter(v=>v[0] != "-");
            terms.sort((a,b)=>Math.random()-0.5);
        }
        this.list = terms;
        // this.terms = objToMap(terms);
    }
    // /**@type {Map<string,string>} */
    // terms;
    /**@type {[string,string|Object][]} */
    list;
    name;
}
let file2, file3, file11, fileFinal;
function construct(){
    fileFinal = new TermsFile("Final Exam Review",[
        // Quiz 1
        ["-","Quiz 1"],
        ["A point in motion",{
            desc:"Define the term line",
            otherAns:[
                "A point in motion",
                "A series of adjacent points",
                "A connection between points",
                "An implied connection between points"
            ],
            textarea:true
        }],
        ["Closure","The inclination to connect fragmentary information is called,"],
        ["An implied line","The inclination for closure, the human minds process of filling in missing pieces is so strong that connections will be made even when a line is broke. This type of line is called ___"],
        ["Direction","refers to the implied movement of a line"],
        ["Organizational Lines","are often used to create the loose linear 'skeleton' on which a composition can be build"],
        ["Hatching, Cross Hatching","Multiple lines that are grouped together or layered to generate value; this technique is called ___ or ___"],
        ["Focal Point","A ___ is the primary point of interest in a composition"],
        // Quiz 2
        ["-","Quiz 2"],
        ["Shape","is a flat, enclosed area created with continuous lines, surrounding it with other elements, or filling it with a solid color or texture"],
        ["Gradation, Shading","___, or ___ can be used to make a two-dimensional shape appear three-dimensional"],
        ["Figure, Ground","A shape that is distinguished from the background is called a positive shape or ___. The area surroudning it is called the negative shape or ___"],
        ["Rectilinear","a composition dominated by straight lines and angular corners is called,"],
        ["Curvilinear","a composition dominated by curves and flowing lines is called,"],
        ["Physical, Visual","The two types of texture are, ___ and ___"],
        ["Tromphe L'Oeil","Taken to an extreme, illusionary texture can so resemble reality that a desception occurs. The French term ___ is used to categorie this"],
        ["relative difference in lightness",{
            desc:"Define the term Value",
            otherAns:[
                "relative difference in lightness"
            ],
            textarea:true
        }],
        ["Value Contrast","The amount of differences in values is called"],
        ["Value Distribution","refers to the proportion and arrangement of lights and darks in a composition"],
        ["Grisaille","early oil painters used a gray underpainting called,"],
        ["Volumetric","when we use a full range of values, two-dimensional shapes can appear three-dimensional, or ___"],
        ["Chiaroscuro","___ is an Italian term literally meaning 'light-dark' which is another way to create the illusion of space"],
        // Quiz 3: Chapter 3
        ["-","Quiz 3, Chapter 3"],
        ["Similarity between elements in a composition",{
            desc:"Define the term Unity",
            otherAns:[
                "Similarity between elements in a composition"
            ],
            textarea:true
        }],
        ["variety is difference and unity is similarity",{
            desc:"How is Variety different than Unity",
            otherAns:[
                "They are in opposition to each other variety is difference and unity is similarity"
            ],
            textarea:true
        }],
        ["Gestalt","psychology where visual information is understood holistically before it is examined separately"],
        ["Containment","is a unifying force created by the outer edge of a composition or by a boundary within a composition"],
        ["Proximity","the distance between visual elements is called ___"],
        ["Closure","refers to the mind's inclination to connect fragmentary information to produce a complete form"],
        ["Distribution of weight and force in a composition",{
            desc:"Define the term Balance",
            otherAns:[
                "The distribution of weight and force among visual units"
            ],
            textarea:true
        }],
        ["Value Weight","refers to the inclination of shapes to float or sink based on their solidity and composition location"],
        ["Radial","in ___ symmetry, shapes are mirrored both vertically and horiontally, with the center acting as the focal point"],
        ["Asymmetrical balance","creates equilibrium among visual elements that do NOT mirror each other on either side of the axis"],
        ["Proportion","refers to the relative size of visual elements with-in an image"],
        ["Scale","commonly refers to the size of a form when compared to human scale"],
        ["Emphasis","is used to give part of a design particular prominence"],
        ["Centricity, Eccentricity","The compositional center of a composition is a very potent design tool. ___ (compressive compositional force) and ___ (expansive compositional force) are the two types of this"],
        ["Contrast","is created when two or more forces operate in opposition"],
        // Quiz 4: Chapter 2, Color (Needs correcting)
        ["-","Quiz 4: Chapter 2"],
        ["Additive, subtractive","The two primary systems of color are ___ and ___"],
        ["Contrast","colors are never seen in isolation, each is affected by what ever color it is placed next to. This visual effect is called,"],
        ["Complementary","colors found at the opposite sides of the color wheel are called,"],
        ["hue","We refer to the name of a color such as red, yellow, or purple as a:"],
        ["-list",{
            desc:"the three primary colors are:",
            ans:[
                "red","yellow","blue"
            ],
            n:3
        }],
        ["-list",{
            desc:"the three secondary colors are:",
            ans:[
                "orange","green","purple"
            ],
            n:3
        }],
        ["tertiary colors","a primary color mixed with a secondary color adjacent to it are called"],
        ["monochromatic color scheme","Variations on a single hue are called"],
        ["analogous","adjacent colors in the spectrum are used in an ___ color scheme"],
        ["triadic","a color scheme that uses three hues equally spaced around the color wheel is called ___"],
        ["key color","A ___, or dominant color, can heighten psychological as well as compositional impact"],
        ["red to mean anger","give a specific example of a symbolic color"],
        // Quiz 5
        ["-","Quiz 5"],
        ["-list",{
            desc:"What are three of the 'characteristics of creative thinking'?",
            ans:[
                "curiosity",
                "complexity",
                "wide range of interests",
                "receptivity",
                "attentiveness",
                "connection seeking",
                "conviction",
                "complexity"
            ],
            n:3
        }],
        ["-list",{
            desc:"What are four of the strategies for good time management?",
            ans:[
                "see the big picture",
                "work sequentially",
                "use parts to create the whole",
                "set the stage",
                "prioritize",
                "make the most of class time",
                "when in doubt crank it out"
            ],
            n:4
        }],
        ["",{
            desc:"why is time management important?",
            otherAns:[
                "It can help you achieve your goals, and it helps you to work smarter, not harder"
            ],
            textarea:true
        }],
        ["-list",{
            desc:"What are three of the 'Habits of Work'?",
            ans:[
                "organized persistance",
                "daily practice",
                "self-reliance",
                "appropriate speed",
                "valuing alternative viewpoints",
                "incremental excellence"
            ],
            n:3
        }],
        // Quiz 6
        ["-","Quiz 6"],
        ["volume,mass","we generally define an empty three-dimensional form as a ___, while we generally define a solid form as a ___"],
        ["static,dynamic","___ forms appear stable and unmoving, ___ forms imply movement"],
        ["installation","is an ensemble of images and objects that are presented in a three-dimensional space"],
        ["environmental","a ___ work presents a space that we can enter physically"],
        ["earthwork","an ___ is a large-scale outdoor installation"],
        ["direction","refers to the implied movement of a line"],
        ["continuity",", or linear flow, can increase visual movement and accentuate a form"],
        ["plane","A ___ is a three-dimensional form that has length and width but minimal thickness"],
        ["space","In three-dimensional design, ___ is the area within or around an area of substance (please correct, according to online this answer is correct but he marked it wrong on my quiz)"],
        ["ambient,directed","___ light encompasses an entire space or setting, ___ light is localized and focusedlike a spotlight on a performer"],
        ["actual,implied","___ time refers to the location and duration of a temporal event, ___ time is an event's suggested location or duration"],
        // Quiz 7: Chapter 5
        ["-","Quiz 7"],
        ["convergent thinking","involves the pursuit of a predetermined goal, usually a linear progression and through a highly focused problem-solving technique"],
        ["divergent thinking","in ___ the means determines the end. This process is more open ended; specific results are hard to predict"],
        ["-list",{
            desc:"what are three good sources of ideas when problem solving?",
            ans:[
                "transform a common object",
                "study nature",
                "visit a museum",
                "look around your surroundings"
            ],
            n:3
        }],
        ["",{
            desc:"One of the 'Characteristics of a Good Problem', Socially Responsible is listed. Please explain why this is important",
            otherAns:[
                "It's the idea that artists should consider the environmental and economic impact of their projects so they don't waste as much"
            ],
            textarea:true
        }],
        ["-list",{
            desc:"what are three of the five common strategies for brainstorming",
            ans:[
                "make a list",
                "use a thesaurus",
                "explore connections",
                "keep a journal",
                "collaborative creativity",
                "thumbnail sketches"
            ],
            n:3
        }],
        ["maquette","a ___ is a well-developed three-dimensional sketch"],
        ["model","a ___ is a technical experiment"],
        // Quiz 8: Chapter 10
        ["-","Quiz 8: Chapter 10"],
        ["proximity","the distance between visual units is called ___"],
        ["continuity","a fluid connection among compositional parts creates ___"],
        ["repetition","occurs when we use the same visual element or effect any number of times within a composition"],
        ["matrix","a ___ is a three-dimensional grid"],
        ["subordinate","one or more ___, or secondary, forms often balance a dominant, or primary, form"],
        ["scale","commonly refers to the size of a form when compared with human size"],
        ["focal point","a ___ is a compositional device to create emphasis"],
        ["rhythm","this musical term, ___ can be defined as te organization of multiple elements or effects in a deliberate pattern"],
        ["tempo","the number of beats with in a given space creates the ___ or rate of change"],
        // Quiz 9: Chapter 11
        ["-","Quiz 9: Chapter 11"],
        ["composite","a ___ is created when we fuse together two or more materials of different strength"],
        ["exoskeleton","an ___ provides a structure on the outside like insects, crabs and lobsters use"],
        ["compression","occurs when you push a material inward"],
        ["tension","occurs when you pull a material outward"],
        ["additive sculpture","in ___ the artwork is created from separate parts that have been connected using glue, joints, stiching or welds"],
        ["subtractive sculpture","in ___ the artist removes materials from a larger mass to create a sculpture"],
        ["gradation","creates sequential change within a consistent pattern"],
        ["solidification","in ___, a liquid material is poured into a mold or extruded through a pipe and then allowed to harden"],
        ["ephemera","is a material that rapidly decays or trash which is already in a state of decay"],
        ["assemblage","is a method of using objects or images orginally designed for another purpose to create a work of art or design"],
        // Quiz 10: Chapter 8 (we got one wrong on this quiz but I don't know which one it was)
        ["-","Quiz 10: Chapter 8"],
        ["Iconography","is a cultural and historical reference that builds meaning that describes images. It is the study of such symbolic visual systems."],
        ["Stereotype","A ___ is a fixed generalization based on a preconception"],
        ["Cliche","A ___ is an an overused expression or a predictable treatment of an idea"],
        ["pure forms","Nonobjective, such as circles, rectangles, and squares are called ___"],
        ["Representational shapes","We derive ___ from specific subject matter that is strongly based on direct observation?"],
        ["Abstract shapes","Between these two extremes, ___ are derived from visual reality but are distilled and transformed, reducing their resemblance to the original source"],
        ["Definition","is the degree to which we distinguish one visual component from another"],
        ["Analogy","an ___ creates a general connection between unrelated objects or ideas,"],
        ["Simile","whereas a ___ creates the connection using the word 'as' or 'like'"],
        ["Appropriation","We often use ___ (the reuse of an existing artwork) to create a connection between past and present cultural values"],
        ["Layering","Artists often use ___ to create complex or even contradictory meanings"]
    ]);
    
    file11 = new TermsFile("Chapter 11",[
        ["Strength","how much weight can a given material support? What is its breaking point when it is twisted, folded, or bent?"],
        ["Workability","how difficult is it to alter the shape of a material? Does it cut and bend easily? Can it be melted and cast or dripped to create a new form?"],
        ["Durability","What range of forces can this material withstand and for how long? Is it impervious to heat, water, wind, and ultraviolet light?"],
        ["Weight","material that is too light for a given purpose can be as problematic as a material that is too heavy. What is the function of that project, and how can material weight best serve that function"],
        ["Cost","can the material chosen be obtained easily and at a reasonable cost? If you budget is limited, you may have to remove expensive materials from consideration"],
        ["Toxicity","many plastics produce toxic gases when they are cut, etched, or burned"],
        ["Function","how appropriate is a given material for a particular purpose?"],
        ["Composite","created when two or more materials of differing strengths are fused together"],
        ["Skeleton"," (or endoskeleton) provides the internal structure needed by mammals and fish while insects and many sea creatures rely on an external exoskeleton for support"],
        ["Flying buttress","to increase building height while reducing mass, medieval architects developed this - it was used in hundreds of cathedrals throughout Europe"],
        ["Armature","artists and designers often use this to create internal structure"],
        ["Additive sculpture","the artwork is created from separate parts that have been connected, usually using glues, joints, stitching, or welds"],
        ["Assemblage","an example of an additive method - when things are put together that were originally for a different purpose"],
        ["Modeling","is an additive process often used by ceramicists, pinching and pushing the pliable clay"],
        ["Subtractive sculpture","the artist removes materials from a larger mass, carving, drilling, cutting, and turning on a lathe are all subtractive processes"],
        ["Solidification","a liquid material is poured into a mold or extruded through a pipe, then allowed to harden"],
        ["Displacement","a solid material is physically forced into a new configuration"],
        ["Visual connections","unify multiple surfaces"],
        ["Physical connections","increase strength, flexibility, functionality, and stability"],
        ["Gradation","creates sequential change within a constant pattern"],
        ["Ephemera","materials that rapidly decay or trash which is already in a state of decay"]
    ]);
    file2 = new TermsFile("Chapter 8",[
        ["Iconography","the study of cultural and historical symbolic visual systems"],
        ["Stereotype","a fixed generalization based on a preconception"],
        ["Cliche","an overused expression or a predictable treatment of an idea"],
        ["Analogy","creates a general connection between unrelated objects or ideas"],
        ["Simile","creates a connection using 'like' or 'as'"],
        ["Metaphor","more explicit; 'is' - (creates a connection)"],
        ["Metaphorical thinking","can be used to connect an image and an idea"],
        ["Anesthetic","used to induce insensitivity or unconsciousness"],
        ["Aesthetic","the study of human responses to beauty"],
        ["Postmodernism","contemporary art and design"],
        ["Modernism","general term that encompasses a wide range of individual movements that began in Europe in 19th century (World War I)"],
        ["Form","the physical manifestation of an idea"],
        // "-","Five common characteristics of postmodern art,"],
        ["Appropriation","\t - the reuse of an existing artwork"],
        ["Recontextualization","\t - another postmodern strategy (process that extracts text, signs or meaning from its original context AND THEN REUSES IT IN ANOTHER CONTEXT)"],
        ["Layering","used to create complex or contradictory meanings"],
        ["Hybridity","the creation of artworks using disparate media and meanings to create a unified statement"]
    ]);
    file3 = new TermsFile("Chapter 8 (Real/Final Version)",[
        ["Iconography","is a cultural and historical reference that builds meaning that describes images. It is the study of such symbolic visual systems."],
        ["Stereotype","A ___ is a fixed generalization based on a preconception"],
        ["Cliche","A ___ is an an overused expression or a predictable treatment of an idea"],
        ["Nonrepresentational shapes","Nonobjective, such as circles, rectangles, and squares are called ___"],
        ["Representational shapes","We derive ___ from specific subject matter that is strongly based on direct observation?"],
        ["Abstract shapes","Between these two extremes, ___ are derived from visual reality but are distilled and transformed, reducing their resemblance to the original source"],
        ["Definition","is the degree to which we distinguish one visual component from another"],
        ["Analogy","an ___ creates a general connection between unrelated objects or ideas,"],
        ["Simile","whereas a ___ creates the connection using the word 'as' or 'like'"],
        ["Appropriation","We often use ___ (the reuse of an existing artwork) to create a connection between past and presnet cultural values"],
        ["Layering","Artists often use ___ to create complex or even contradictory meanings"]
    ]);
}
construct();

let main = document.querySelector(".area");
let cb_random = document.querySelector(".cb-random");
let b_cp11 = document.querySelector(".b-cp11");
let b_cp8 = document.querySelector(".b-cp8");
let b_check = document.querySelector(".b-check-answers");
b_cp11.onclick = function(){
    selectFile(fileFinal);
};
b_cp8.onclick = function(){
    selectFile(file3);
};
cb_random.onclick = function(){
    useShuffle = cb_random.checked;
    let i = (_file == fileFinal ? 0 : file2);
    construct();
    if(i == 0) _file = fileFinal;
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
    let terms = file.list;

    main.textContent = "";
    
    let header = document.createElement("h2");
    header.textContent = "Quiz, "+file.name;
    main.appendChild(header);

    // for(const [k,v] of terms){
    for(let i = 0; i < terms.length; i++){
        if(!terms[i]){
            // console.warn("Couldn't find term at i: ",i);
            continue;
        }
        let k = terms[i][0];
        let v = terms[i][1];
        let isObj = (typeof v == "object");
        let desc = (isObj ? v.desc : v);
        let div = document.createElement("div");
        let textarea = false;
        if(isObj) if(v.textarea) textarea = true;
        if(textarea){
            div.classList.add("textarea-cont");
            div.innerHTML = `<div>${desc}</div><br><textarea class="inp"></textarea><div class="otherAns-out">`;
        }
        else if(k == "-") div.innerHTML = `<h2>${desc}</h2>`;
        else if(k == "-list"){
            let s = `<div>${v.desc}</div><div class="inp-grid">`;
            for(let i = 0; i < v.n; i++){
                s += "<input class='inp'>";
            }
            div.innerHTML = s+"</div>";
        }
        else div.innerHTML = `<input class="inp"><div>${desc}</div></div>`;
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
    let inps = [...main.children];
    inps.splice(0,1);
    let ans = [];
    // let map = [...file.terms];
    let map = file.list;
    function tweak(s){
        if(!s) return s;
        return s.toLowerCase().trim().replaceAll(" ","");
    }
    for(let i = 0; i < inps.length; i++){
        let div = inps[i];
        let e = div.querySelector(".inp");
        if(!e) continue;
        
        let v = tweak(e.value);
        let obj = map[i][1];
        let isObj = (typeof obj == "object");
        let answer = tweak(map[i][0]);
        let j = 1;
        function test(){
            if(answer == "-") return true;
            let res = compare(v,answer) < Math.ceil(answer.length*0.25);
            // let res = compare(v,answer) < 1;

            if(!res && obj?.otherAns){
                answer = tweak(obj.otherAns[j]);
                if(answer){
                    j++;
                    test();
                    return;
                }
            }

            ans.push(res);
            e.classList.remove("correct","wrong");
            if(map[i][0] != ""){
                e.classList.add(res?"correct":"wrong");
                if(!res) e.value = map[i][0]+" (yours, "+e.value+")";
            }
            // e.parentElement.className = "";
            // e.parentElement.classList.add(res?"correct":"wrong");
        }
        if(answer == "-list"){
            let ansList = obj.ans.map(v=>tweak(v));
            let ansEle = div.querySelectorAll(".inp");
            let ansEleList = [...ansEle].map(v=>tweak(v.value));
            let res = true;
            // for(const s of ansList){
            //     if(!ansEleList.includes(s)){
            //         res = false;
            //         break;
            //     }
            // }
            let k = 0;
            for(const e of ansEleList){
                let e2 = ansEle[k];
                if(!ansList.includes(e)){
                    res = false;
                    e2.classList.remove("correct","wrong");
                    e2.classList.add("wrong");
                    // break;
                }
                else{
                    e2.classList.remove("correct","wrong");
                    e2.classList.add("correct");
                }
                k++;
            }
            ans.push(res);
            // e.parentElement.className = "";
            // e.parentElement.classList.add(res?"correct":"wrong");
            if(!res){
                // let i = 0;
                // for(const e of ansEle){
                //     e.value = obj.ans[i]+" (yours, "+e.value+")";
                //     i++;
                // }
                let div2 = e.parentElement.querySelector(".div2") ?? document.createElement("div");
                div2.innerHTML = "Answers:<br>"+obj.ans.join(", ");
                div2.className = "div2";
                e.parentElement.appendChild(div2);
            }
        }
        else if(test()) continue;
        
        if(isObj) if(obj.otherAns){
            let multiAnsOut = e.nextElementSibling;
            multiAnsOut.innerHTML = "Answer:<br>"+obj.otherAns.map(v=>"<div class='space'>"+v+"</div>").join("<br>");
        }
    }
}

/**@type {TermsFile} */
let _file;

document.addEventListener("keydown",e=>{
    let key = e.key.toLowerCase();
    if(key == "enter"){
        checkAnswers(_file);
    }
});

_file = fileFinal;
loadTerms(_file);


function selectFile(file){
    _file = file;
    loadTerms(_file);
}