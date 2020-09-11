//Función para linkear el logo con el INDEX
const APIKEY = "api_key=Ods4EcKhWO60qYc7JGihzArT2MGDIqip";

let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    window.location = "index.html";
});


//Función para linkear el botón plus para Create GIFOS
let btnVideo = document.getElementById("btnVideo");
btnVideo.addEventListener("click", () => {
    window.location = "createGIFOS_1.html";
});

//Función para cambiar a Dark Mode
let darkMode = document.getElementById("darkMode");
let styleCSS = document.getElementById("styleCSS");
let switchMode = document.getElementById("switchMode");
let borderLi = document.getElementById("borderLi");

//Función para cambiar las flechas de Trending GIFOS en DarkMode
let izq = document.getElementById("Izq");
let flechaIzq = document.getElementById("flechaIzq");
let der = document.getElementById("Der");
let flechaDer = document.getElementById("flechaDer");

//Función para deslizar las flechas en el carrousel de Trend GIFOS
function carrouselGIFOS (index) {
    let gifos = document.getElementsByClassName("cardTrendingGIFOS");

    Array.prototype.forEach.call(gifos, function(gif) {
        gif.style.display = "";
        
    });
    
    if (index == 0) {        
         hiddenCarrousel(gifos, 3);
         hiddenCarrousel(gifos, 6);
    } 
    
    if(index == 1) {
         hiddenCarrousel(gifos, 0);
         hiddenCarrousel(gifos, 6);
    }

    if(index == 2) {
         hiddenCarrousel(gifos, 0);
         hiddenCarrousel(gifos, 3);
    }
           
}

function hiddenCarrousel (gifosArray, i) {
    let upperBound = i + 3;
    for (let index = i; index < upperBound; index += 1) {
        gifosArray[index].style.display = "none";
    }    
}

let slider_index = 0;


izq.addEventListener("click", () => {
    
    slider_index -= 1;
    if(slider_index == -1) {
        slider_index = 2;
    }
    carrouselGIFOS(slider_index);
     
});

der.addEventListener("click", () => {
    
    slider_index += 1;
    if(slider_index == 3) {
        slider_index = 0;
    }
    carrouselGIFOS(slider_index);    
});

//Cambio de interfaz diurno / nocturno

const cssDIURNO = "css_gifos/sassDiurno/main.css";
const cssNOCTURNO = "css_gifos/sassNocturno/main.css";

//Declaración de variables para gifMax Nocturno y Diurno

const cssDiugifMax = "css_gifos/sassgifoMax/gifoMaxDiurno/gifoMaxDiurno.css";
const cssNocgifMax = "css_gifos/sassgifoMax/gifoMaxNocturno/gifoMaxNocturno.css";

let darkModeG = localStorage.getItem("darkModeLS");

const enableDarkMode = () => {
    let darkModeLS = localStorage.getItem("darkModeLS");
    styleCSS.setAttribute("href", cssNOCTURNO);
    localStorage.setItem("darkModeLS", "enabled");
    logo.src = "img/logo_nocturno.svg";
    switchMode.appendChild(borderLi);
    flechaIzq.src = "img/button-left-w.svg";
    flechaDer.src = "img/button-right-w.svg";
    switchMode.innerHTML = "Modo Diurno";

    let gifoMaxCSS = document.getElementById("gifoMaxCSS");
    let flechaDerMax = document.getElementById("flechaDerMax");
    let flechaIzqMax = document.getElementById("flechaIzqMax");
    let imgCloseMax = document.getElementById("closeMax"); 
    
    if (gifoMaxCSS != null && gifoMaxCSS != undefined) {
        gifoMaxCSS.setAttribute("href", cssNocgifMax);
        flechaDerMax.src = "img/button-right-w.svg";
        flechaIzqMax.src = "img/button-left-w.svg";
        imgCloseMax.src = "img/close-w.svg";
        imgCloseMax.style.width = "41px";
        imgCloseMax.style.height = "40px";

    }
};

const disableDarkMode = () => {
    let darkModeLS = localStorage.getItem("darkModeLS");
    styleCSS.setAttribute("href", cssDIURNO);
    localStorage.setItem("darkModeLS", null);
    logo.src = "img/logo.svg";
    switchMode.appendChild(borderLi);
    flechaIzq.src = "img/button-left.svg";
    flechaDer.src = "img/button-right.svg";
    switchMode.innerHTML = "Modo Nocturno";

    let gifoMaxCSS = document.getElementById("gifoMaxCSS");
    let flechaDerMax = document.getElementById("flechaDerMax");
    let flechaIzqMax = document.getElementById("flechaIzqMax");
    let imgCloseMax = document.getElementById("closeMax"); 

    if (gifoMaxCSS != null && gifoMaxCSS != undefined) {
        gifoMaxCSS.setAttribute("href", cssDiugifMax);
        flechaDerMax.src = "img/button-right.svg";
        flechaIzqMax.src = "img/button-left.svg";
        imgCloseMax.src = "img/close.svg";
        imgCloseMax.style.width = "initial";
        imgCloseMax.style.height = "initial";
    }    
};

if (darkModeG === "enabled") {
    enableDarkMode();
}

darkMode.addEventListener("click", () => {
    let darkModeLS = localStorage.getItem("darkModeLS");
    darkModeLS = localStorage.getItem("darkModeLS");
    if (darkModeLS !== "enabled") {
        enableDarkMode();
        
    } else {
        disableDarkMode();
        
    }
});