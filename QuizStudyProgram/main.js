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
let file2, file3, file11, fileFinal;
function construct(){
    fileFinal = new TermsFile("Final Exam Review",{
        // Quiz 1
        // "-":"Quiz 1",
        "A point in motion":{
            desc:"Define the term line:",
            otherAns:[
                "A point in motion",
                "A series of adjacent points",
                "A connection between points",
                "An implied connection between points"
            ],
            textarea:true
        },
        "Closure":"The inclination to connect fragmentary information is called:",
        "An implied line":"The inclination for closure, the human minds process of filling in missing pieces is so strong that connections will be made even when a line is broke. This type of line is called ___",
        "Direction":"refers to the implied movement of a line",
        "Organizational Lines":"are often used to create the loose linear 'skeleton' on which a composition can be build",
        "Hatching, Cross Hatching":"Multiple lines that are grouped together or layered to generate value; this technique is called ___ or ___",
        "Focal Point":"A ___ is the primary point of interest in a composition",
        // Quiz 2
        // "-":"Quiz 2",
        "Shape":"is a flat, enclosed area created with continuous lines, surrounding it with other elements, or filling it with a solid color or texture",
        "Gradation, Shading":"___, or ___ can be used to make a two-dimensional shape appear three-dimensional",
        "Figure, Ground":"A shape that is distinguished from the background is called a positive shape or ___. The area surroudning it is called the negative shape or ___",
        "Rectilinear":"a composition dominated by straight lines and angular corners is called:",
        "Curvilinear":"a composition dominated by curves and flowing lines is called:",
        "Physical, Visual":"The two types of texture are: ___ and ___",
        "Tromphe L'Oeil":"Taken to an extreme, illusionary texture can so resemble reality that a desception occurs. The French term ___ is used to categorie this",
        "The relative difference in lightness":{
            desc:"Define the term Value:",
            otherAns:[
                "The relative difference in lightness"
            ],
            textarea:true
        },
        "Value Contrast":"The amount of differences in values is called",
        "Value Distribution":"refers to the proportion and arrangement of lights and darks in a composition",
        "Grisaille":"early oil painters used a gray underpainting called:",
        "Volumetric":"when we use a full range of values, two-dimensional shapes can appear three-dimensional, or ___",
        "Chiaroscuro":"___ is an Italian term literally meaning 'light-dark' which is another way to create the illusion of space",
        // Chapter 3
        // "-":"Chapter 3",
        "Similarity between elements in a composition":{
            desc:"Define the term Unity:",
            otherAns:[
                "Similarity between elements in a composition"
            ],
            textarea:true
        },
        "variety is difference and unity is similarity":{
            desc:"How is Variety different than Unity",
            otherAns:[
                "They are in opposition to each other variety is difference and unity is similarity"
            ],
            textarea:true
        },
        "Gestalt":"psychology where visual information is understood holistically before it is examined separately",
        "Containment":"is a unifying force created by the outer edge of a composition or by a boundary within a composition",
        "Proximity":"the distance between visual elements is called ___",
        "Closure":"refers to the mind's inclination to connect fragmentary information to produce a complete form",
        "Distribution of weight and force in a composition":{
            desc:"Define the term Balance:",
            otherAns:[
                "The distribution of weight and force in a composition"
            ],
            textarea:true
        },
        "Value Weight":"refers to the inclination of shapes to float or sink based on their solidity and composition location",
        "Radial":"in ___ symmetry, shapes are mirrored both vertically and horiontally, with the center acting as the focal point",
        "Asymmetrical balance":"creates equilibrium among visual elements that do NOT mirror each other on either side of the axis",
        "Proportion":"refers to the relative size of visual elements with-in an image",
        "Scale":"commonly refers to the size of a form when compared to human scale",
        "Emphasis":"is used to give part of a design particular prominence",
        "Centricity, Eccentricity":"The compositional center of a composition is a very potent design tool. ___ (compressive compositional force) and ___ (expansive compositional force) are the two types of this",
        "Contrast":"is created when two or more forces operate in opposition",
        // Chapter 2: Color (Needs correcting)
        // "-":"Chapter 2: (Needs correcting)",
        "Additive, subtractive":"The two primary systems of color are ___ and ___",
        "Contrast":"colors are never seen in isolation, each is affected by what ever color it is placed next to. This visual effect is caled:",
        "Complementary":"colors found at the opposite sides of the color wheel are called:",
        "hue":"We refer to the name of a color such as red, yellow, or purple as a: (please correct, not sure if this has the correct answer)",
        "red, yellow, blue":"the three primary colors are:",
        "orange, green, purple":"the three secondary colors are:",
        "tertiary colors":"a primary color mixed with a secondary color adjacent to it are called",
        "tints":"Variations on a single hue are called: (please correct, not sure if this has the correct answer)",
        "analogous":"adjacent colors in the spectrum are used in an ___ color scheme",
        "triadic":"a color scheme that uses three hues equally spaced around the color wheel is called ___",
        "key color":"A ___, or dominant color, can heighten psychological as well as compositional impact",
        "red to mean anger":"give a specific example of a symbolic color",

    });
    
    file11 = new TermsFile("Chapter 11",{
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
    file3 = new TermsFile("Chapter 8 (Real/Final Version)",{
        "Iconography":"is a cultural and historical reference that builds meaning that describes images. It is the study of such symbolic visual systems.",
        "Stereotype":"A ___ is a fixed generalization based on a preconception",
        "Cliche":"A ___ is an an overused expression or a predictable treatment of an idea",
        "Nonrepresentational shapes":"Nonobjective, such as circles, rectangles, and squares are called ___",
        "Representational shapes":"We derive ___ from specific subject matter that is strongly based on direct observation?",
        "Abstract shapes":"Between these two extremes, ___ are derived from visual reality but are distilled and transformed, reducing their resemblance to the original source",
        "Definition":"is the degree to which we distinguish one visual component from another",
        "Analogy":"an ___ creates a general connection between unrelated objects or ideas,",
        "Simile":"whereas a ___ creates the connection using the word 'as' or 'like'",
        "Appropriation":"We often use ___ (the reuse of an existing artwork) to create a connection between past and presnet cultural values",
        "Layering":"Artists often use ___ to create complex or even contradictory meanings"
    });
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
        let isObj = (typeof v == "object");
        let desc = (typeof v == "string" ? v : v.desc);
        let div = document.createElement("div");
        let textarea = false;
        if(isObj) if(v.textarea) textarea = true;
        if(textarea){
            div.classList.add("textarea-cont");
            div.innerHTML = `<div>${desc}</div><br><textarea class="inp"></textarea><div class="otherAns-out">`;
        }
        else if(k == "-") div.innerHTML = "";//`<input style="display:none" class="inp"><h2>${desc}</h2></div>`;
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
    let inps = main.querySelectorAll(".inp");
    let ans = [];
    let map = [...file.terms];
    function tweak(s){
        if(!s) return s;
        return s.toLowerCase().trim().replaceAll(" ","");
    }
    for(let i = 0; i < inps.length; i++){
        let v = tweak(inps[i].value);
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
            inps[i].parentElement.className = "";
            inps[i].parentElement.classList.add(res?"correct":"wrong");
            if(!res) inps[i].value = map[i][0]+" (yours: "+inps[i].value+")";
        }
        if(test()) continue;
        
        if(isObj) if(obj.otherAns){
            let multiAnsOut = inps[i].nextElementSibling;
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