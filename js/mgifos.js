//Crear la sección de partMyGifos
let partMyGifos = document.getElementById("partMyGifos");

let gridMyGifos = document.getElementById("gridMyGifos");

let misGIFOS;

let gifos12 = [];

let clickCon = 0;

//Declaración de variable global para segmentar los gifs fav en 12
let clickG;

//Declaración del contador
let con = 0;

function showGIFOS(array) {
    if (array == null || array.length == 0 || array == undefined) {
        resultNoGIFOS();
    } else if (array.length > 0) {
        resultGIFOS(array);
    }
}


//PARAMETROS
const ids = "fvMyDds5Bc6ufJHdLs,H4oG7Zhb9WJh0szyq1,Mb4jbeLkKRaGSRlKAl,dAnnTtiP8J83KbDpdN";

fetch(`https://api.giphy.com/v1/gifs?${APIKEY}&ids=${ids}`).then(response => response.json())
    .then(json => {

        let arrayMyG = json.data;
        

        arrayMyG.forEach((value, index, array) => {            
            mygifos_localStorage(value.username, value.title, value.images.fixed_height.url, value.slug);
        });

        
        misGIFOS = JSON.parse(window.localStorage.getItem("mygifos"));
        

        if (misGIFOS == null || misGIFOS == undefined || misGIFOS.length == 0) {
            clickG = 0;
        } else {
            clickG = Math.round(misGIFOS.length / 12);
        }

        showGIFOS(misGIFOS);
    });




function resultNoGIFOS() {
    //GIFOS sin Resultados
    let gridGifsNOResults = document.createElement("div");
    gridGifsNOResults.id = "gridGifsNOResults";
    gridGifsNOResults.classList.add("gridGifsNOResults");
    partMyGifos.appendChild(gridGifsNOResults);

    let sinContenidoGifos = document.createElement("img");
    sinContenidoGifos.alt = "sinContenidoGifos";
    sinContenidoGifos.src = "img/icon-mis-gifos-sin-contenido.svg";
    sinContenidoGifos.classList.add("sinContenidoGifos");
    gridGifsNOResults.appendChild(sinContenidoGifos);

    let pGIFOS = document.createElement("p");
    pGIFOS.id = "pGIFOS";
    pGIFOS.innerHTML = "¡Anímate a crear tu primer GIFO!";
    gridGifsNOResults.appendChild(pGIFOS);
}

function resultGIFOS(array) {
    let gridMyGifos = document.getElementById("gridMyGifos");

    if (gridMyGifos == undefined) {
        //Se crea el div de resultados favoritos
        gridMyGifos = document.createElement("div");
        gridMyGifos.classList.add("gridMyGifos");
        gridMyGifos.id = "gridMyGifos";
        //Se adjudica la ubicación a su padre partfav
        partMyGifos.appendChild(gridMyGifos);
    }

    let cota1 = clickCon * 12;
    
    let cota2 = () => {
        if (clickCon == 0) {
            return 12;
        } else {
            return (clickCon + 1) * 12;
        }
    };

    gifos12 = misGIFOS.slice(cota1, cota2());
 


    gifos12.forEach((value, index, array) => {
        //se crean los tags
        let principalDiv = document.createElement("div");
        principalDiv.id = "gridMyGifos_R";
        principalDiv.style.position = "relative";
        let imgGifo = document.createElement("img");

        //OJO: Probablemente los atributos de value cambien con el nuevo array
        imgGifo.src = value.urlgif;
        imgGifo.alt = "mygifo";
        imgGifo.id = "gifos";

        principalDiv.appendChild(imgGifo);
        //se agrega la funcionalidad del purlple tag a los tags de los gifs.

        let indice = index;
        if (con > 0) {
            indice += con * 12;
        }

        //OJO: Probablemente los atributos de value cambien con el nuevo array        
        principalDiv.onmouseenter = (event) => { principalDiv.appendChild(createPurpleGIFOS(value.usergif, value.titlegif, value.urlgif, indice, value.slug)) };
        principalDiv.onmouseleave = (event) => { principalDiv.removeChild(document.getElementById("cardGIFOS")) };
        //se agrega el tag que acabamos de crear al gridFav
        gridMyGifos.appendChild(principalDiv);
    });

    //Creación del btn dinámico
    let btnMyGifos = document.getElementById("btnMyGifos");
    if (misGIFOS.length > 12 && btnMyGifos == undefined) {
        btnMyGifos = document.createElement("button");
        btnMyGifos.id = "btnMyGifos";
        btnMyGifos.innerHTML = "VER MÁS";
        btnMyGifos.classList.add("btnVM");
        partMyGifos.appendChild(btnMyGifos);

        btnMyGifos.onclick = () => {
            clickCon += 1;
            resultGIFOS(array);

            if (clickG == clickCon) {
                btnMyGifos.remove();
            }
        }
    }

}

function createPurpleGIFOS(user, titleGif, url, index, slug) {
   
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
    principalDiv.classList.add("cardGIFOS");
    principalDiv.id = "cardGIFOS";

    imgHover.src = "img/icon_trash.svg";
    imgHover.alt = "iconTrashCG";
    imgHover.id = "trashCG";
    imgHover.classList.add("trashCG");
    //se agrega el evento para el corazon. Pero debe mantenerse activo e inactivo
    imgHover.onclick = () => { eraseGifo(user, titleGif, url, slug) };

    downDiv.classList.add("downCG");
    downDiv.id = "downCG";

    imgDown.src = "img/icon-download.svg";
    imgDown.alt = "iconDownCG";
    imgDown.id = "iconDownCG";
    imgDown.classList.add("iconDownCG");
    let downloadLink = createDownloadLink(imgDown, url);

    maxDiv.classList.add("maxCG");
    maxImg.src = "img/icon-max.svg";
    maxImg.alt = "iconMaxCG";
    maxImg.classList.add("iconMaxCG");
    maxImg.onclick = () => {
        expanMyG(url, user, titleGif, slug);
        sliderIndexExpGIFO = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCG");
    title.innerHTML = titleGif;
    title.classList.add("titleCG");

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



//Función para borrar gifo del localstorage
function eraseGifo(user, titleGif, url, slug) {
    let misGIFOS = JSON.parse(window.localStorage.getItem("mygifos"));

    let gifIndex;
    misGIFOS.forEach((value, index) => {

        console.log("if de erase= ");
        console.log(value.slug == slug);
        console.log("VALUE SLUG");
        console.log(value.slug);
        console.log("SLUG");
        console.log(slug);
        if (value.slug == slug) {
            gifIndex = index;
        }
    });

    misGIFOS.splice(gifIndex, 1);
    localStorage.setItem("mygifos", JSON.stringify(misGIFOS));


}

//Función para expandir MYGIFO
function expanMyG(url, user, titleGif, slug) {
    let main = document.getElementById("main");
    let section = document.createElement("section");
    section.id = "ctnGifMax";
    section.classList.add("ctnGifMax");
    main.insertBefore(section, main.childNodes[1]);

    let ctnArrowLeft = document.createElement("div");
    ctnArrowLeft.id = "IzqMax";
    ctnArrowLeft.classList.add("IzqMax");
    ctnArrowLeft.onclick = () => { flechaIzqMaxGIFO(url, user, titleGif, slug) };
    section.appendChild(ctnArrowLeft);

    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.src = "img/button-left.svg";
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
    titleGIFO.innerHTML = titleGif; //EL TÍTULO DEL GIF
    section.appendChild(titleGIFO);

    let imgFavMax = document.createElement("img");
    imgFavMax.src = "img/icon_trash.svg";
    imgFavMax.alt = "iconTrashCG";
    imgFavMax.id = "trashCG";
    imgFavMax.classList.add("iconFavMax");
    imgFavMax.onclick = () => { eraseGifo(user, titleGif, url, slug) };
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
    ctnArrowRight.onclick = () => { flechaDerMaxGIFO(url, user, titleGif, slug) };
    section.appendChild(ctnArrowRight);

    let imgArrowRight = document.createElement("img");
    imgArrowRight.src = "img/button-right.svg";
    imgArrowRight.id = "flechaDerMax";
    imgArrowRight.alt = "flechaDerMax";
    ctnArrowRight.appendChild(imgArrowRight);

    createCSS();

}

//Declaración de funciones para flechas izquierda y derecha de gif expandido de misgifos
let sliderIndexExpGIFO = 0;

function flechaIzqMaxGIFO(url, user, titleGifo, slug) {
    let maxArray = misGIFOS.length;

    sliderIndexExpGIFO -= 1;
    
    if (sliderIndexExpGIFO == - 1) {
        sliderIndexExpGIFO = maxArray - 1;
    }

    gifCarruGIFOS(sliderIndexExpGIFO, url, user, titleGifo, slug)
}

function flechaDerMaxGIFO(url, user, titleGifo, slug) {
    let maxArray = misGIFOS.length;

    sliderIndexExpGIFO += 1;

    if (sliderIndexExpGIFO == maxArray) {
        sliderIndexExpGIFO = 0;
    }

    gifCarruGIFOS(sliderIndexExpGIFO, url, user, titleGifo, slug);
}

function gifCarruGIFOS(index, url, user, titleGif, slug) {
    let gifo = document.getElementById("gifMax");
    let pUser = document.getElementById("pUser");
    let titleGIFO = document.getElementById("titleGIFO");
    let imgFavMax = document.getElementById("trashCG");

    gifo.src = misGIFOS[index].urlgif;
    pUser.innerHTML = misGIFOS[index].usergif;
    titleGIFO.innerHTML = misGIFOS[index].titlegif;
        
    imgFavMax.onclick = () => { eraseGifo(user, titleGif, url, slug) };
    
    fetch(misGIFOS[index].urlgif)
        .then(response => response.blob())
        .then(blob => {
            let linkdown = document.getElementById("downloadMax");
            const url = URL.createObjectURL(blob);
            linkdown.href = url;
            linkdown.download = "myGiphy.gif";

        }).catch(console.error);
}



//LOCALSTORAGE DE MYGIFOS
function mygifos_localStorage(user, titleGifo, url, slug) {

    let gif = {
        usergif: user,
        urlgif: url,
        titlegif: titleGifo,
        slug: slug
    };

    let localStorage_mygifos = JSON.parse(localStorage.getItem("mygifos"));

    if (localStorage_mygifos == undefined || localStorage_mygifos == null || localStorage_mygifos == "") {
        localStorage_mygifos = [];
    }

    let repetidoMyG = false;
    localStorage_mygifos.forEach(value => {

        //Si son iguales nos regresa un 0
        if (value.slug.localeCompare(gif.slug) == 0) {
            repetidoMyG = true;
        }
    });

    if (!repetidoMyG) {
        localStorage_mygifos.push(gif);
    }   

    localStorage.setItem("mygifos", JSON.stringify(localStorage_mygifos));
}
