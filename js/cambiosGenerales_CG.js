//Función para linkear el logo con el INDEX 
let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    window.location = "index.html";
});

//Función para linkear el botón plus para Create GIFOS
let btnVideo = document.getElementById("btnVideo");
    btnVideo.addEventListener("click", () => {
    window.location = "createGIFOS_1.html";
    
});

//Instrucciones para que el btn plus esté active en la páginas de Create GIFOS
function plusDiurno () {
let plus = document.getElementById("plus");
btnVideo.style.backgroundColor = "#9CAFC3";
btnVideo.style.border = "solid 1px #9CAFC3";
plus.style.color = "#ffffff";
}

function plusNocturno () {
    let plus = document.getElementById("plus");
    btnVideo.style.backgroundColor = "#ffffff";
    btnVideo.style.border = "solid 1px #ffffff";
    plus.style.color = "#000000";
    }

plusDiurno();

//Función para cambiar a Dark Mode
let darkMode = document.getElementById("darkMode");
let styleCSS = document.getElementById("styleCSS");
let switchMode = document.getElementById("switchMode");
let borderLi = document.getElementById("borderLi");
let camera = document.getElementById("camera");
let cinta = document.getElementById("cinta");

const cssDIURNO = "css_gifos/sassDiurno/main.css";
const cssNOCTURNO = "css_gifos/sassNocturno/main.css";

let darkModeLS = localStorage.getItem("darkModeLS");

const enableDarkMode = () => {
    styleCSS.setAttribute("href", cssNOCTURNO);
    localStorage.setItem("darkModeLS", "enabled");
    logo.src = "img/logo_nocturno.svg";
    camera.src = "img/camara-modo-noc.svg";
    cinta.src = "img/pelicula-modo-noc.svg";
    switchMode.appendChild(borderLi);
    plusNocturno();    
    switchMode.innerHTML = "Modo Diurno";    

};

const disableDarkMode = () => {
    styleCSS.setAttribute("href", cssDIURNO);
    localStorage.setItem("darkModeLS", null);
    logo.src = "img/logo.svg";
    camera.src = "img/camara.svg";
    cinta.src = "img/pelicula.svg";
    switchMode.appendChild(borderLi);
    plusDiurno();   
    switchMode.innerHTML = "Modo Nocturno";
    
};

if (darkModeLS === "enabled") {
    enableDarkMode();
}

darkMode.addEventListener("click", () => {
    darkModeLS = localStorage.getItem("darkModeLS");
    if (darkModeLS !== "enabled") {
        enableDarkMode();
        
    } else {
        disableDarkMode();
        
    }
});