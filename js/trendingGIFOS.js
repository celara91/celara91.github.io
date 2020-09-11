
let carrugifs = document.getElementById("carrugifs");

let gifosCarrouselExpand;

let cont = 0;

//Hacer el request
function trendingGIFOS() {
    //Parámetros
    const limit = "9";
    const offset = "0";
    const rating = "g";

    fetch(`https://api.giphy.com/v1/gifs/trending?${APIKEY}&${limit}&${offset}&${rating}`).then(response => response.json())
        .then(json => {

            let gifosArray = json.data;
            
            let gifosCarrousel = [];

            gifosCarrousel = gifosArray.slice(0, 9);
            gifosCarrouselExpand = gifosArray.slice(0, 9);


            //api mock trending
            // array que emula la respuesta el api gifo trending.

            // usando el metodo forEach podemos iterar un arreglo de forma mas facil
            // el metodo for each recibe un callback el cual le pasa 3 parametros referentes a informacion del arreglo
            // value -> el valor el objeto en el interior del array, equivalente a array[i]
            // index -> el indice del array, equivalente a i.
            // array -> el valor del array completo.
            // usando este metodo creamos los tags de cada gif y luego se insertan en el tag carrugifs.
            gifosCarrousel.forEach((value, index, array) => {
                //se crean los tags
                let principalDiv = document.createElement("div");
                let imgGifo = document.createElement("img");
                //se agregan los atributos de los tags, el src viene de la respuesta del api gifs.
                principalDiv.classList.add("cardTrendingGIFOS");
                imgGifo.src = value.images.fixed_height.url;
                imgGifo.alt = "c_gif";
                imgGifo.classList.add("c_gifs");
                principalDiv.appendChild(imgGifo);

                let indice = index;
                if (cont > 0) {
                    indice += cont * 9;
                }

                //se agrega la funcionalidad del purlple tag a los tags de los gifs.
                principalDiv.onmouseenter = (event) => { principalDiv.appendChild(createPurpleTag(value.username, value.title, value.images.fixed_height.url, indice)) };
                principalDiv.onmouseleave = (event) => { principalDiv.removeChild(document.getElementById("principalPurple")) };
                //se agrega el tag que acabamos de crear al carrugifs
                carrugifs.appendChild(principalDiv);
            });
        }
        );
}

trendingGIFOS();


/**
* funcion para crear un tag purple para los gifs.
* Params User: la palabra user que sale en el tag purple
* Params titleGifo: el titulo del gifo que sale en el tag morado.
* return el purple tag.
**/
function createPurpleTag(user, titleGifo, url, index) {

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
    principalDiv.classList.add("cardTrendingHard");
    principalDiv.id = "principalPurple";

    imgHover.src = paintHeartGifos(titleGifo);
    imgHover.alt = "iconFavCTH";
    imgHover.id = "iconFAVCTH";
    imgHover.classList.add("favCTH");
    //se agrega el evento para el corazon.
    imgHover.onclick = () => { eraseFavGIFO (imgHover, user, titleGifo, url) };

    downDiv.classList.add("downCTH");
    downDiv.id = "downCTH";

    imgDown.src = "img/icon-download.svg";
    imgDown.alt = "iconDownCTH";
    imgDown.id = "iconDownCTH";
    imgDown.classList.add("iconDownCTH");
    let downloadLink = createDownloadLink(imgDown, url);


    maxDiv.classList.add("maxCTH");
    maxImg.src = "img/icon-max.svg";
    maxImg.alt = "iconMaxCTH";
    maxImg.classList.add("iconMaxCTH");
    
    maxImg.onclick = () => {
        expanGIFO(url, user, titleGifo);
        sliderIndexExp = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCTH");
    title.innerHTML = titleGifo;
    title.classList.add("titleCTH");

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

//Función de descarga de Trending GIFOS
function createDownloadLink(tagIcon, url) {
    let linkdown = document.createElement("a");
    linkdown.id = "linkdown";
    
    fetch(url)
        .then(response => response.blob())
        .then(blob => {

            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";
            linkdown.appendChild(tagIcon);

        }).catch(console.error);
    return linkdown;
}


//Función para expandir gif Diurno
function expanGIFO(url, user, titleGifo) {

    let main = document.getElementById("main");
    let section = document.createElement("section");
    section.id = "ctnGifMax";
    section.classList.add("ctnGifMax");
    main.insertBefore(section, main.childNodes[6]);

    let ctnArrowLeft = document.createElement("div");
    ctnArrowLeft.id = "IzqMax";
    ctnArrowLeft.classList.add("IzqMax");
    ctnArrowLeft.onclick = () => { flechaIzqMax(url, user, titleGifo) };
    section.appendChild(ctnArrowLeft);

    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.src = arrowColorLeft(imgArrowLeft);
    imgArrowLeft.id = "flechaIzqMax";
    imgArrowLeft.alt = "flechaIzqMax";
    ctnArrowLeft.appendChild(imgArrowLeft);

    let imgCloseMax = document.createElement("img");
    imgCloseMax.src = closeColor(imgCloseMax);
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
    titleGIFO.innerHTML = titleGifo; //EL TÍTULO DEL GIF
    section.appendChild(titleGIFO);

    let imgFavMax = document.createElement("img");
    imgFavMax.src = paintHeartGifos(titleGifo);
    imgFavMax.alt = "iconFavMax";
    imgFavMax.id = "iconFavMax";
    imgFavMax.classList.add("iconFavMax");
    imgFavMax.onclick = () => { eraseFavGIFO (imgFavMax, user, titleGifo, url) };
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
    ctnArrowRight.onclick = () => { flechaDerMax(url, user, titleGifo) };
    section.appendChild(ctnArrowRight);

    let imgArrowRight = document.createElement("img");
    imgArrowRight.src = arrowColorRight(imgArrowRight);
    imgArrowRight.id = "flechaDerMax";
    imgArrowRight.alt = "flechaDerMax";
    ctnArrowRight.appendChild(imgArrowRight);

    createCSS();
}

//Cambiar los colores del icon close dependiendo del estado nocturno o diurno
function closeColor(closeImg) {
    let darkModeLS = localStorage.getItem("darkModeLS");

    if (darkModeLS == "enabled") {
        closeImg.src = "img/close-w.svg";
        closeImg.style.width = "41px";
        closeImg.style.height = "40px";
    } else {
        closeImg.src = "img/close.svg";
    }    
    return closeImg.src;
}


//Cambiar los colores de la flecha izq dependiendo del estado nocturno o diurno
function arrowColorLeft(arrowImg) {
    let darkModeLS = localStorage.getItem("darkModeLS");

    if (darkModeLS == "enabled") {
        arrowImg.src = "img/button-left-w.svg";
    } else {
        arrowImg.src = "img/button-left.svg";
    }    
    return arrowImg.src;
}

//Cambiar los colores de la flecha der dependiendo del estado nocturno o diurno
function arrowColorRight(arrowImg) {
    let darkModeLS = localStorage.getItem("darkModeLS");

    if (darkModeLS == "enabled") {
        arrowImg.src = "img/button-right-w.svg";
    } else {
        arrowImg.src = "img/button-right.svg";
    }    
    return arrowImg.src;
}

//Remover el contenedor de gifo Max y link de CSS
function removeGifoMax() {
    let ctnGifMax = document.getElementById("ctnGifMax");
    let gifoMaxCSS = document.getElementById("gifoMaxCSS");
    ctnGifMax.remove();
    gifoMaxCSS.remove();
}

//Crear el link de CSS
function createCSS() {
    let head = document.getElementById("head");
    let linkCSS = document.createElement('link');
    linkCSS.id = "gifoMaxCSS";
    linkCSS.rel = "stylesheet";
    linkCSS.type = "text/css";

    let flechaDerMax = document.getElementById("flechaDerMax");
    let flechaIzqMax = document.getElementById("flechaIzqMax");
    let imgCloseMax = document.getElementById("closeMax");     
    
    let darkModeLS = localStorage.getItem("darkModeLS");

    if (darkModeLS == "enabled") {
        linkCSS.href = "css_gifos/sassgifoMax/gifoMaxNocturno/gifoMaxNocturno.css";
        flechaDerMax.src = "img/button-right-w.svg";
        flechaIzqMax.src = "img/button-left-w.svg";
        imgCloseMax.src = "img/close-w.svg";
    } else {
        linkCSS.href = "css_gifos/sassgifoMax/gifoMaxDiurno/gifoMaxDiurno.css";
        flechaDerMax.src = "img/button-right.svg";
        flechaIzqMax.src = "img/button-left.svg";
        imgCloseMax.src = "img/close.svg";
    }    

    linkCSS.media = "all";
    head.appendChild(linkCSS);
}

//Función para pasar al sig gif expandido
function carruGIFExpan(index, url, user, titleGifo) {

    let gifo = document.getElementById("gifMax");
    let pUser = document.getElementById("pUser");
    let titleGIFO = document.getElementById("titleGIFO");
    let imgFavMax = document.getElementById("iconFavMax");
    
    gifo.src = gifosCarrouselExpand[index].images.fixed_height.url;
    pUser.innerHTML = gifosCarrouselExpand[index].username;
    titleGIFO.innerHTML = gifosCarrouselExpand[index].title;
    
    
    imgFavMax.src = paintHeartGifos(gifosCarrouselExpand[index].title);
    imgFavMax.onclick = () => { eraseFavGIFO (imgFavMax, gifosCarrouselExpand[index].username, gifosCarrouselExpand[index].title, gifosCarrouselExpand[index].images.fixed_height.url) };
    
    fetch(gifosCarrouselExpand[index].images.fixed_height.url)
        .then(response => response.blob())
        .then(blob => {
            let linkdown = document.getElementById("downloadMax");
            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";

        }).catch(console.error);
}


//Declaración de funciones para flechas izquierda y derecha de gif expandido
let sliderIndexExp = 0;

function flechaIzqMax(url, user, titleGifo) {

    sliderIndexExp -= 1;
    if (sliderIndexExp == -1) {
        sliderIndexExp = 8;
    }
    
    carruGIFExpan(sliderIndexExp, url, user, titleGifo);
}

function flechaDerMax(url, user, titleGifo) {

    sliderIndexExp += 1;
    if (sliderIndexExp == 9) {
        sliderIndexExp = 0;
    }
    
    carruGIFExpan(sliderIndexExp, url, user, titleGifo);
}


//Función para guardar favoritos de Trending GIFOS
function fav_localStorage(user, titleGifo, url) {

    let gif = {
        usergif: user,
        urlgif: url,
        titlegif: titleGifo,
    };

    let localStorage_almacenFAV = JSON.parse(localStorage.getItem("almacenFAV"));

    if (localStorage_almacenFAV == undefined || localStorage_almacenFAV == null || localStorage_almacenFAV == "") {
        localStorage_almacenFAV = [];
    }

    let repetidoFav = false;
    localStorage_almacenFAV.forEach(value => {

        //Si son iguales nos regresa un 0
        if (value.titlegif.localeCompare(gif.titlegif) == 0) {
            repetidoFav = true;
        }
    });

    
    if (!repetidoFav) {
        localStorage_almacenFAV.push(gif);
    }

    localStorage.setItem("almacenFAV", JSON.stringify(localStorage_almacenFAV));
}

//Función para quitar de lista de favoritos
function eraseFavGIFO (heart, user, titlegif, url) {
    let gifsFav = JSON.parse(window.localStorage.getItem("almacenFAV"));  
   
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
function paintHeartGifos (gif_name) {
    
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
}