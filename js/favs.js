
//Se busca la sección de fav
let partFav = document.getElementById("partFav");

let gridFav = document.getElementById("gridFav");

let gifsFav = JSON.parse(window.localStorage.getItem("almacenFAV"));


//Declaración de variable para mostrar sólo 12
let fav12 = [];

//Declaración de variable global para segmentar los gifs fav en 12
let clickFav; 
if (gifsFav == null || gifsFav == undefined || gifsFav.length == 0) {
    clickFav = 0;
} else {
    clickFav = Math.round(gifsFav.length / 12);
}



let clickConta = 0;

//Declaración del contador
let conta = 0;


function findFav() {

    if (gifsFav == null || gifsFav.length == 0 || gifsFav == undefined) {
        resultNoFav();
    } else if (gifsFav.length > 0) {
        resultFav(gifsFav)
    }
}

findFav();

function resultNoFav() {

    //Se crea el div de sin resultados favoritos
    let gridFavNOResults = document.createElement("div");
    gridFavNOResults.classList.add("gridFavNOResults");
    gridFavNOResults.id = "gridFavNOResults";

    //Se adjudica la ubicación a su padre partfav
    partFav.appendChild(gridFavNOResults);

    //Se crea la imagen de sin fav
    let sinFav = document.createElement("img");
    sinFav.alt = "sinFav";
    sinFav.classList.add("sinFav");
    sinFav.src = "img/icon-fav-sin-contenido.svg";

    //Se adjudica a la ubicación de su padre
    gridFavNOResults.appendChild(sinFav);

    //Se crea el texto
    let pNoFav = document.createElement("p");
    pNoFav.id = "pNoFav";
    pNoFav.innerHTML = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';

    //Se adjudica a la ubicación de su padre
    gridFavNOResults.appendChild(pNoFav);
}


function resultFav(array) {

let gridFav = document.getElementById("gridFav");

    if (gridFav == undefined) {
        //Se crea el div de resultados favoritos
        gridFav = document.createElement("div");
        gridFav.classList.add("gridFav");
        gridFav.id = "gridFav";
        //Se adjudica la ubicación a su padre partfav
        partFav.appendChild(gridFav);
    }

    let cota1 = clickConta * 12;
    

    let cota2 = () => {
        if (clickConta == 0) {
            return 12;
        } else {
            return (clickConta + 1) * 12;
        }
    };

    
    fav12 = gifsFav.slice(cota1, cota2());

    
    fav12.forEach((value, index, array) => {
        //se crean los tags
        let principalDiv = document.createElement("div");
        principalDiv.id = "gridFavs";
        principalDiv.style.position = "relative";
        let imgGifo = document.createElement("img");

        imgGifo.src = value.urlgif;
        imgGifo.alt = "gifav";
        imgGifo.id = "gfav";

        principalDiv.appendChild(imgGifo);
        //se agrega la funcionalidad del purlple tag a los tags de los gifs.

        let indice = index;
        if (conta > 0) {
            indice += conta * 12;
        }

        principalDiv.onmouseenter = (event) => { principalDiv.appendChild(createPurpleFav(value.usergif, value.titlegif, value.urlgif, indice)) };
        principalDiv.onmouseleave = (event) => { principalDiv.removeChild(document.getElementById("cardResults")) };
        //se agrega el tag que acabamos de crear al gridFav
        gridFav.appendChild(principalDiv);
    });

    //Creación del btn dinámico

    let btnMoreFav = document.getElementById("btnFav");
    if (gifsFav.length > 12 && btnMoreFav == undefined) {        
        btnMoreFav = document.createElement("button");
        btnMoreFav.id = "btnFav";
        btnMoreFav.innerHTML = "VER MÁS";
        btnMoreFav.classList.add("btnVM");
        partFav.appendChild(btnMoreFav);

        btnMoreFav.onclick = () => {
            clickConta += 1;
            resultFav(array)

            if (clickFav == clickConta) {
                btnMoreFav.remove();
            }
        }
    }
}


function createPurpleFav(user, titleGif, url, index) {

    // se crean los tags que componen al tag purple.
    let principalDiv = document.createElement("div");
    let imgHover = document.createElement("img");
    let downDiv = document.createElement("div");
    let imgDown = document.createElement("img");
    let maxDiv = document.createElement("div");
    let maxImg = document.createElement("img");
    let paragraph = document.createElement("p");
    let title = document.createElement("h4");

    // se agregan los atributos de los tags.
    principalDiv.classList.add("cardResults");
    principalDiv.id = "cardResults";


    imgHover.src = paintHeart(titleGif);
    imgHover.alt = "iconFavCR";
    imgHover.id = "favCR";
    imgHover.classList.add("favCR");
    //se agrega el evento para el corazon. Pero debe mantenerse activo e inactivo
    imgHover.onclick = () => { eraseFav (imgHover, user, titleGif, url)};

    downDiv.classList.add("downCR");
    downDiv.id = "downCR";

    imgDown.src = "img/icon-download.svg";
    imgDown.alt = "iconDownCR";
    imgDown.id = "iconDownCR";
    imgDown.classList.add("iconDownCR");
    let downloadLink = createDownloadLink(imgDown, url);

    maxDiv.classList.add("maxCR");
    maxImg.src = "img/icon-max.svg";
    maxImg.alt = "iconMaxCR";
    maxImg.classList.add("iconMaxCR");
    maxImg.onclick = () => {
        expanFGIFS(url, user, titleGif);
        sliderIndexExpF = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCR");
    title.innerHTML = titleGif;
    title.classList.add("titleCR");

    // se hace append child para relacionar los tags
    downDiv.appendChild(downloadLink);
    maxDiv.appendChild(maxImg);

    principalDiv.appendChild(imgHover);
    principalDiv.appendChild(downDiv);
    principalDiv.appendChild(maxDiv);
    principalDiv.appendChild(paragraph);
    principalDiv.appendChild(title);
    return principalDiv;
}


//Función para quitar de lista de favoritos
function eraseFav (heart, user, titlegif, url) {    
   
    if (heart.src.includes("img/icon-fav-active.svg")) {
        let gifIndex;
        gifsFav.forEach((value, index) => {
            
            if(value.titlegif == titlegif) {
                gifIndex = index;
            }
        });

        gifsFav.splice(gifIndex, 1);
        localStorage.setItem("almacenFAV", JSON.stringify(gifsFav));
        heart.src="img/icon-fav-hover.svg";
    } else {
        heart.src = "img/icon-fav-active.svg"; 
        fav_localStorage(user, titlegif, url);
    }
};

//Función para pintar corazón favorito en el almacén
function paintHeart (gif_name) {
    
    let localStorage_almacenFAV = JSON.parse(localStorage.getItem("almacenFAV"));

    if (localStorage_almacenFAV == undefined || localStorage_almacenFAV == null || localStorage_almacenFAV == "") {
        localStorage_almacenFAV = [];
    }

    let repetidoFav = false;
    localStorage_almacenFAV.forEach(value => {
        //Si son iguales nos regresa un 0
        if (value.titlegif.localeCompare(gif_name) == 0) {
            repetidoFav = true;
        }
    });

    
    if (repetidoFav == true) {
        return "img/icon-fav-active.svg";
    } else {
        return "img/icon-fav-hover.svg";
    }
};


//Función para expandir gif Diurno
function expanFGIFS(url, user, titleGif) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    section.id = "ctnGifMax";
    section.classList.add("ctnGifMax");
    main.insertBefore(section, main.childNodes[1]);

    let ctnArrowLeft = document.createElement("div");
    ctnArrowLeft.id = "IzqMax";
    ctnArrowLeft.classList.add("IzqMax");
    ctnArrowLeft.onclick = () => { flechaIzqMaxFav(url, user, titleGif) };
    section.appendChild(ctnArrowLeft);

    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.src = "img/button-left.svg";
    imgArrowLeft.id = "flechaIzqMax";
    imgArrowLeft.alt = "flechaIzqMax";
    ctnArrowLeft.appendChild(imgArrowLeft);

    let imgCloseMax = document.createElement("img");
    imgCloseMax.src = "img/close.svg";
    imgCloseMax.id = "closeMax";
    imgCloseMax.alt = "close";
    imgCloseMax.classList.add("closeMax");
    imgCloseMax.onclick = () => { removeGifoMax(); }
    section.appendChild(imgCloseMax);


    let gifMax = document.createElement("img");
    gifMax.classList.add("gifMax");
    gifMax.src = url; //URL DEL GIF SELECCIONADO
    gifMax.id = "gifMax";
    section.appendChild(gifMax);

    let pUser = document.createElement("p");
    pUser.id = "pUser";
    pUser.innerHTML = user; //EL USERNAME DEL GIF
    section.appendChild(pUser);

    let titleGIFO = document.createElement("h3");
    titleGIFO.id = "titleGIFO";
    titleGIFO.innerHTML = titleGif; //EL TÍTULO DEL GIF
    section.appendChild(titleGIFO);

    let imgFavMax = document.createElement("img");
    imgFavMax.src = paintHeart(titleGif);
    imgFavMax.alt = "iconFavMax";
    imgFavMax.id = "iconFavMax";
    imgFavMax.classList.add("iconFavMax");
    imgFavMax.onclick = () => { eraseFav (imgFavMax, user, titleGif, url)};
    section.appendChild(imgFavMax);

    let imgDownMax = document.createElement("img");
    imgDownMax.src = "img/icon-download.svg";
    imgDownMax.alt = "iconDownMax";
    imgDownMax.id = "iconDownMax";
    imgDownMax.classList.add("iconDownMax");
    let downloadMax = createDownloadLink(imgDownMax, url);
    downloadMax.id = "downloadMax";
    downloadMax.appendChild(imgDownMax);
    section.appendChild(downloadMax);

    let ctnArrowRight = document.createElement("div");
    ctnArrowRight.id = "DerMax";
    ctnArrowRight.classList.add("DerMax");
    ctnArrowRight.onclick = () => { flechaDerMaxFav(url, user, titleGif) };
    section.appendChild(ctnArrowRight);

    let imgArrowRight = document.createElement("img");
    imgArrowRight.src = "img/button-right.svg";
    imgArrowRight.id = "flechaDerMax";
    imgArrowRight.alt = "flechaDerMax";
    ctnArrowRight.appendChild(imgArrowRight);

    createCSS();

}

//Función para pasar al sig gif expandido de fav
function gifExpanFav(index) {

    let gifo = document.getElementById("gifMax");
    let pUser = document.getElementById("pUser");
    let titleGIFO = document.getElementById("titleGIFO");
    let imgFavMax = document.getElementById("iconFavMax");
    
    gifo.src = gifsFav[index].urlgif;
    pUser.innerHTML = gifsFav[index].usergif;
    titleGIFO.innerHTML = gifsFav[index].titlegif;

    imgFavMax.src = paintHeartGifos(gifsFav[index].titlegif);
    imgFavMax.onclick = () => { eraseFavGIFO (imgFavMax, gifsFav[index].usergif, gifsFav[index].titlegif, gifsFav[index].urlgif) };
    
    fetch(gifsFav[index].urlgif)
        .then(response => response.blob())
        .then(blob => {
            let linkdown = document.getElementById("downloadMax");
            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";

        }).catch(console.error);
}


//Declaración de funciones para flechas izquierda y derecha de gif expandido de fav
let sliderIndexExpF = 0;

function flechaIzqMaxFav(url, user, titleGifo) {

    let maxArray = gifsFav.length;


    sliderIndexExpF -= 1;
    
    if (sliderIndexExpF == - 1) {
        sliderIndexExpF = maxArray - 1;
    }

    gifExpanFav(sliderIndexExpF, url, user, titleGifo);
}

function flechaDerMaxFav(url, user, titleGifo) {

    let maxArray = gifsFav.length;

    sliderIndexExpF += 1;

    if (sliderIndexExpF == maxArray) {
        sliderIndexExpF = 0;
    }

    gifExpanFav(sliderIndexExpF, url, user, titleGifo);
}
