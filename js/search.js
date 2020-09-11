//CÓDIGO PARA PARTONE CUANDO SE MUESTRAN LOS RESULTADOS DE BÚSQUEDA

//Código para la pantalla de búsqueda activa  en versión Mobile
let widthScreen;

let ilustraHeader = document.getElementById("ilustraHeader");

let title = document.getElementById("titleP");

let inputContainer = document.getElementById("inputContainer");

let btnSearch = document.getElementById("btnSearch");

let suggestion = document.getElementById("suggestion");

let inputSearch = document.getElementById("inputSearch");
inputSearch.style.backgroundImage = "none";

let lineSearch = document.getElementById("lineSearch");
lineSearch.remove();


inputSearch.addEventListener("keydown", () => {
    inputSearch.style.backgroundImage = "url(img/icon-search-grey-s.svg)"; //Modo Diurno
    inputSearch.style.borderBottom = "none";
    inputSearch.style.borderRadius = "25px 25px 0 0";
    inputContainer.insertBefore(lineSearch, inputContainer.childNodes[2]);
    btnSearch.style.backgroundImage = "url(img/close.svg)";
    btnSearch.style.backgroundRepeat = "no-repeat";
    btnSearch.style.bottom = "139px";
    suggestion.style.border = "#572EE5 solid 1px";
    suggestion.style.borderTop = "none";
    suggestion.style.borderRadius = "0 0 25px 25px";

    widthScreen = (window.innerWidth > 375) ? window.innerWidth : screen.width;

    if (widthScreen <= 375 && (ilustraHeader.style.display == "none")) {
        btnSearch.style.top = "141px";
        suggestion.style.top = "174px";
    } else if (widthScreen <= 1440) {
        inputSearch.style.marginTop = "";
        partOne.style.height = "";
        btnSearch.style.top = "";
        suggestion.style.top = "";
        title.style.display = "";
        ilustraHeader.style.display = "";
    }
});

btnSearch.addEventListener("click", () => {
    inputSearch.value = "";
    inputSearch.style.backgroundImage = "none";
    inputSearch.style.border = "#572EE5 solid 1px";
    inputSearch.style.borderRadius = "27px";
    suggestion.innerHTML = "";
    suggestion.style.border = "none";
    lineSearch.remove();
    btnSearch.style.backgroundImage = "";
});


//Función para iniciar la búsqueda
inputSearch.addEventListener("keypress", (e) => {
    let keyword = inputSearch.value;
    if (e.keyCode == 13) {

        let suggest = document.getElementById("suggestion");
        suggest.innerHTML = "";

        lineSearch.remove();
        inputSearch.style.backgroundImage = "none";
        btnSearch.style.backgroundImage = "";
        inputSearch.style.border = "#572EE5 solid 1px";
        inputSearch.style.borderRadius = "27px";
        suggestion.style.border = "initial";
        gifsResultArr = [];
        requestGif(keyword, 0);


    }
});

//Función para el autocompletado

inputSearch.addEventListener("input", () => {
    let term = inputSearch.value;

    fetch(`https://api.giphy.com/v1/tags/related/${term}?${APIKEY}`).then(response => response.json())
        .then(json => {

            //Crear una variable con la data de sugerencias
            let suggestArray = json.data;

            let suggest = document.getElementById("suggestion");
            suggest.innerHTML = "";

            for (let index = 0; index < suggestArray.length; index += 1) {
                let optionTag = document.createElement("li");
                optionTag.innerHTML = suggestArray[index].name;

                optionTag.onclick = (optionTag) => {
                    autocomplete(optionTag, suggest);
                    requestGif(optionTag.target.innerHTML, 0)
                };
                suggest.appendChild(optionTag);
            }

        });
});

function autocomplete(optionLI, suggestUL) {

    inputSearch.value = optionLI.target.innerHTML;
    suggestUL.innerHTML = "";
    lineSearch.remove();
    inputSearch.style.backgroundImage = "none";
    btnSearch.style.backgroundImage = "";
    inputSearch.style.border = "#572EE5 solid 1px";
    inputSearch.style.borderRadius = "27px";
    suggestion.style.border = "initial";

};



function requestGif(term, offset, btn) {
    mobileSearch();
    
    //Parámetros para el request de resultados GIPHY
    const limit = 12;
    const rating = "g";
    const lang = "es";

    if (offset != 0) {
        offset = 12 * offset;
    }
    

    fetch(`https://api.giphy.com/v1/gifs/search?${APIKEY}&q=${term}&limit=${limit}&rating=${rating}&lang=${lang}&offset=${offset}`).then(response => response.json())
        .then(json => {
            
            

            if (json.data.length <= 0) {
                resultNoGiphy(json.data);

            } else if (json.data.length == 12) {
                resultGiphy(json.data, btn);

            }

        });
}

//Declaración variable para carrousel de resultados de gifs
let gifsResultArr = [];

//Variable contador para el offset
let contador = 0;

//Función para mostrar los resultados con datos
function resultGiphy(array, btn) {
    let term = inputSearch.value;
    let partResults = document.getElementById("partResults");

    if (btn != true) {

        if (partResults != undefined) {
            partResults.remove();
        }
        let main = document.getElementById("main");
        partResults = document.createElement("section");
        partResults.classList.add("partResults");
        partResults.id = "partResults";
        main.insertBefore(partResults, main.childNodes[5]);

        let borderH1 = document.createElement("div");
        borderH1.classList.add("borderH1");
        partResults.appendChild(borderH1);

        let nameResults = document.createElement("h1");
        nameResults.id = "nameResults";
        nameResults.innerHTML = term;
        partResults.appendChild(nameResults);

        let gridGifsResults = document.createElement("div");
        gridGifsResults.id = "gridGifsResults";
        gridGifsResults.classList.add("gridGifsResults");
        partResults.appendChild(gridGifsResults);

    }


    let arrayResult = array;

    gifsResultArr = gifsResultArr.concat(array);
    


    arrayResult.forEach((value, index, array) => {

        let prinDiv = document.createElement("div");
        prinDiv.id = "gridGifs";
        prinDiv.style.position = "relative";

        let imgGif = document.createElement("img");


        //se agregan los atributos de los tags, el src viene de la respuesta del api gifs.
        imgGif.src = value.images.fixed_height.url;
        imgGif.alt = "r_gif";
        imgGif.id = "gifres";
        prinDiv.appendChild(imgGif);

        let indice = index;
        if (contador > 0) {
            indice += contador * 12;
        }


        //se agrega la funcionalidad del purlple tag a los tags de los gifs.
        prinDiv.onmouseenter = (event) => { prinDiv.appendChild(createPurpleGif(value.username, value.title, value.images.fixed_height.url, indice)) };
        prinDiv.onmouseleave = (event) => { prinDiv.removeChild(document.getElementById("cardResults")) };
        //se agrega el tag que acabamos de crear al gridGifs

        gridGifsResults.appendChild(prinDiv);


    });

    //Creación de btn dinámico
    if (!(document.getElementById("btnResults"))) {
        let btnResults = document.createElement("button");
        btnResults.id = "btnResults";
        btnResults.innerHTML = "VER MÁS";
        btnResults.classList.add("btnVM");
        partResults.appendChild(btnResults);

        btnResults.onclick = () => {
            contador += 1;
            
            requestGif(term, contador, true);
            if (arrayResult != 12) {
                btnResults.remove();
            }
        };
    };

};

function resultNoGiphy(array) {
    let existResultNo = document.getElementById("partResults");
    if (existResultNo != undefined) {
        existResultNo.remove();
    };
    let term = inputSearch.value;

    let main = document.getElementById("main");

    let partResults = document.createElement("section");
    partResults.classList.add("partResults");
    partResults.id = "partResults";
    main.insertBefore(partResults, main.childNodes[5]);


    let borderH1 = document.createElement("div");
    borderH1.classList.add("borderH1");
    partResults.appendChild(borderH1);

    let nameResults = document.createElement("h1");
    nameResults.id = "nameResults";
    nameResults.innerHTML = term;
    partResults.appendChild(nameResults);

    let arrayResult = array;
    

    let gridGifsNOResults = document.createElement("div");
    gridGifsNOResults.id = "gridGifsNOResults";
    gridGifsNOResults.classList.add("gridGifsNOResults");

    partResults.insertBefore(gridGifsNOResults, partResults.childNodes[2]);

    let sinResultados = document.createElement("img");
    sinResultados.alt = "sinResultados";
    sinResultados.classList.add("sinResultados");
    sinResultados.src = "img/icon-busqueda-sin-resultado.svg";
    gridGifsNOResults.appendChild(sinResultados);

    let parrafNR = document.createElement("p");
    parrafNR.id = "parrafNR";
    parrafNR.innerHTML = "Intenta con otra búsqueda.";
    gridGifsNOResults.appendChild(parrafNR);

}

function createPurpleGif(user, titleGifo, url, index) {

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

    imgHover.src = paintHeartSearch (titleGifo);
    imgHover.alt = "iconFavCR";
    imgHover.id = "favCR";
    imgHover.classList.add("favCR");
    //se agrega el evento para el corazon.
    imgHover.onclick = () => { eraseHeartS (imgHover, user, titleGifo, url) };

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
        expanRGIFS(url, user, titleGifo);
        sliderIndexExpR = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCR");
    title.innerHTML = titleGifo;
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



//Función para expandir gif Diurno
function expanRGIFS(url, user, titleGifo) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    section.id = "ctnGifMax";
    section.classList.add("ctnGifMax");
    main.insertBefore(section, main.childNodes[5]);

    let ctnArrowLeft = document.createElement("div");
    ctnArrowLeft.id = "IzqMax";
    ctnArrowLeft.classList.add("IzqMax");
    ctnArrowLeft.onclick = () => { flechaIzqMaxResult(url, user, titleGifo) };
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
    titleGIFO.innerHTML = titleGifo; //EL TÍTULO DEL GIF
    section.appendChild(titleGIFO);

    let imgFavMax = document.createElement("img");
    imgFavMax.src = paintHeartSearch (titleGifo);
    imgFavMax.alt = "iconFavMax";
    imgFavMax.id = "iconFavMax";
    imgFavMax.classList.add("iconFavMax");
    imgFavMax.onclick = () => { eraseHeartS (imgFavMax, user, titleGifo, url) };
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
    ctnArrowRight.onclick = () => { flechaDerMaxResult(url, user, titleGifo) };
    section.appendChild(ctnArrowRight);

    let imgArrowRight = document.createElement("img");
    imgArrowRight.src = "img/button-right.svg";
    imgArrowRight.id = "flechaDerMax";
    imgArrowRight.alt = "flechaDerMax";
    ctnArrowRight.appendChild(imgArrowRight);

    createCSS();

}

//Función para borrar gif de favoritos
function eraseHeartS (heart, user, titlegif, url) {
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
}

//Función para pintar image de favoritos

function paintHeartSearch (gif_name) {
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

//Función para pasar al sig gif expandido de resultados
function gifExpanResult(index) {
    
    let gifo = document.getElementById("gifMax");
    let pUser = document.getElementById("pUser");
    let titleGIFO = document.getElementById("titleGIFO");
    let imgFavMax = document.getElementById("iconFavMax");
    gifo.src = gifsResultArr[index].images.fixed_height.url;
    pUser.innerHTML = gifsResultArr[index].username;
    titleGIFO.innerHTML = gifsResultArr[index].title;    
    
    imgFavMax.src = paintHeartSearch(gifsResultArr[index].title);
    imgFavMax.onclick = () => { eraseHeartS (imgFavMax, gifsResultArr[index].username, gifsResultArr[index].title, gifsResultArr[index].images.fixed_height.url) };
    
    fetch(gifsResultArr[index].images.fixed_height.url)
        .then(response => response.blob())
        .then(blob => {
            let linkdown = document.getElementById("downloadMax");
            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";

        }).catch(console.error);

}


//Declaración de funciones para flechas izquierda y derecha de gif expandido de resultados
let sliderIndexExpR = 0;

function flechaIzqMaxResult() {

    let maxArray = gifsResultArr.length;

    sliderIndexExpR -= 1;
    if (sliderIndexExpR == - 1) {
        sliderIndexExpR = maxArray - 1;
    }

    gifExpanResult(sliderIndexExpR);
}

function flechaDerMaxResult() {

    let maxArray = gifsResultArr.length;

    sliderIndexExpR += 1;
    if (sliderIndexExpR == maxArray) {
        sliderIndexExpR = 0;
    }

    gifExpanResult(sliderIndexExpR);
}



