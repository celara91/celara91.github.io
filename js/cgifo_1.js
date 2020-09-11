//SECCION PRINCIPAL
let sectionCreateGIFOS = document.getElementById("sectionCreateGIFOS");

//DIV DEL VIDEO
let section_video = document.getElementById("section_video");
let video = document.getElementById("videoGIFOS");
video.style.display = "none";
let constraints = { audio: false, video: { width: 480, height: 320 } };

//TITULOS Y PARRAFOS DINAMICOS
let titleVideo = document.getElementById("titleVideo");
let titleV_1 = document.getElementById("titleV_1");
let titleV_2 = document.getElementById("titleV_2");
let parrafoVideo = document.getElementById("parrafoVideo");
let parrafoV_1 = document.getElementById("parrafoV_1");
let parrafoV_2 = document.getElementById("parrafoV_2");

//NUMEROS
let number_1 = document.getElementById("nOne");
let number_2 = document.getElementById("nTwo");
let number_3 = document.getElementById("nThree");

//BOTONES
let btn_comenzar = document.getElementById("comenzar");
let btn_grabar = document.getElementById("grabar");
btn_grabar.style.display = "none";
let btn_finalizar = document.getElementById("finalizar");
btn_finalizar.style.display = "none";
let btn_subir = document.getElementById("subir");
btn_subir.style.display = "none";

let recorder;
let form;

//TIEMPO
let time = document.getElementById("time");
time.style.display = "none";

//REPETIR CAPTURA
let repeat = document.getElementById("repeat");
repeat.style.display = "none";

btn_comenzar.addEventListener("click", () => {
  titleV_1.innerHTML = "¿Nos das acceso";
  titleV_2.innerHTML = "a tu cámara?";
  parrafoV_1.innerHTML = "El acceso a tu camara será válido sólo";
  parrafoV_2.innerHTML = "por el tiempo en el que estés creando el GIFO.";
  number_1.style.backgroundColor = "#572EE5";
  number_1.style.color = "white";
  btn_comenzar.style.display = "none";

  cameraS();
});


btn_grabar.addEventListener("click", () => {
  time.style.display = "";
  btn_grabar.style.display = "none";
  btn_finalizar.style.display = "";
  getRecord(recorder);
});

btn_finalizar.addEventListener("click", () => {
  time.style.display = "none";
  btn_finalizar.style.display = "none";
  btn_subir.style.display = "";
  repeat.style.display = "";
  stopRecord(recorder);
});

repeat.addEventListener("click", () => {
  location.reload();
});

btn_subir.addEventListener("click", () => {
  btn_subir.style.display = "none";
  repeat.style.display = "none";
  //Desactivar numero 2
  number_2.style.backgroundColor = "";
  number_2.style.color = "";
  //Activar numero 3
  number_3.style.backgroundColor = "#572EE5";
  number_3.style.color = "white";
  cardUPGif();
  uploadGif(form);

});

function cameraS() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
      titleVideo.style.display = "none";
      parrafoVideo.style.display = "none";
      section_video.classList.add("video_p3");
      video.style.display = "";
      //Llamado del btn-grabar    
      btn_grabar.style.display = "";
      //Desactivar numero 1
      number_1.style.backgroundColor = "";
      number_1.style.color = "";

      //Activar numero 2
      number_2.style.backgroundColor = "#572EE5";
      number_2.style.color = "white";

      video.srcObject = mediaStream;

      video.onloadedmetadata = function (e) {
        video.play();
      };
      recorder = new RecordRTCPromisesHandler(mediaStream, {
        type: 'gif',
        frameRate: 60,
        quality: 50,
        width: 360
      });
    }).catch(function (err) {
      console.log(err.name + ": " + err.message);
    })
};

//FUNCION PARA PANTALLA MORADA 1
function cardUPGif () {

  let ctn_video = document.createElement("div");
  ctn_video.id = "ctn_video";
  ctn_video.style.gridArea = "grabVideo";
  ctn_video.style.margin = "auto";
  ctn_video.style.height = "320px";
  ctn_video.style.width = "480px";
  section_video.insertBefore(ctn_video, videoGIFOS);
  ctn_video.appendChild(videoGIFOS);

  let cardSubirGIFOS = document.createElement("div");
  cardSubirGIFOS.id = "cardSubirGIFOS";
  cardSubirGIFOS.classList.add("cardSubirGIFOS");
  ctn_video.appendChild(cardSubirGIFOS);

  let iconLoader = document.createElement("img");
  iconLoader.id = "iconLoader";
  iconLoader.alt = "iconLoader";
  iconLoader.src = "img/loader.svg";
  iconLoader.classList.add("iconLoader");
  cardSubirGIFOS.appendChild(iconLoader);

  let subiendoGIFO = document.createElement("p");
  subiendoGIFO.id = "subiendoGIFO";
  subiendoGIFO.classList.add("subiendoGIFO");
  subiendoGIFO.innerHTML = "Estamos subiendo tu GIFO";
  cardSubirGIFOS.appendChild(subiendoGIFO); 
  
}


//FUNCION PARA PANTALLA MORADA 2
function cardSuccessGif (id) {
  let cardSubirGIFOS = document.getElementById("cardSubirGIFOS");
  cardSubirGIFOS.remove();

  let cardExitGIFOS = document.createElement("div");
  cardExitGIFOS.id = "cardExitGIFOS";
  cardExitGIFOS.classList.add("cardExitGIFOS");
  ctn_video.appendChild(cardExitGIFOS);

  let iconCheck = document.createElement("img");
  iconCheck.id = "iconCheck";
  iconCheck.alt = "iconCheck";
  iconCheck.src = "img/check.svg";
  iconCheck.classList.add("iconCheck");
  cardExitGIFOS.appendChild(iconCheck);

  let leyendaExitoGIFO = document.createElement("p");
  leyendaExitoGIFO.id = "leyendaExitoGIFO";
  leyendaExitoGIFO.classList.add("leyendaExitoGIFO");
  leyendaExitoGIFO.innerHTML = "GIFO subido con éxito";
  cardExitGIFOS.appendChild(leyendaExitoGIFO);

  let downG = document.createElement("div");
  downG.id = "downG";
  downG.classList.add("downG");
  cardExitGIFOS.appendChild(downG);
  let iconDownG = document.createElement("img");
  iconDownG.src = "img/icon-download.svg";
  iconDownG.id = "iconDownG";
  iconDownG.alt = "iconDownG";
  iconDownG.classList.add("iconDownG");
  downG.appendChild(iconDownG);
  getUrlById(id).then(url => createDownloadL(iconDownG, url, downG));

  let linkG = document.createElement("div");
  linkG.id = "linkG";
  linkG.classList.add("linkG");
  cardExitGIFOS.appendChild(linkG);
  let iconLinkG = document.createElement("img");
  iconLinkG.src = "img/icon-link.svg";
  iconLinkG.id = "iconLinkG";
  iconLinkG.alt = "iconLinkG";
  iconLinkG.classList.add("iconLinkG");
  linkG.appendChild(iconLinkG);
  linkG.onclick = () => { alert("Comparte tu gif: " + "https://giphy.com/gifs/" + id)}

}

function getUrlById(id) {

return fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=Ods4EcKhWO60qYc7JGihzArT2MGDIqip`)
    .then(response => response.json())
    .then(json => json.data.images.fixed_height.url);
}

//FUNCION DE DESCARGA
//Función de descarga de Trending GIFOS
function createDownloadL(tagIcon, url, contenedor) {
  let linkdown = document.createElement("a");
  linkdown.id = "linkdown";
  console.log("URL FUNCION CREATEDOWN" + url);
  fetch(url)
      .then(response => response.blob())
      .then(blob => {

          const url = URL.createObjectURL(blob);
          linkdown.href = url;
          linkdown.download = "myGiphy.gif";
          linkdown.appendChild(tagIcon);
          contenedor.appendChild(linkdown);

      }).catch(console.error);
  return linkdown;
  
}


//FUNCION PARA SUBIR EL GIF A GIPHY
const api_key = "Ods4EcKhWO60qYc7JGihzArT2MGDIqip";


function uploadGif(gif) {
  fetch("https://upload.giphy.com/v1/gifs" + "?api_key=" + api_key, {
    method: "POST",
    body: gif    
  }).then(res => {
    if(res.ok) {
      res.json().then(res => { 
           cardSuccessGif(res.data.id);
         });
    } else {
      console.log("Hubo un error. Vuelve a intentarlo más tarde.");
    }
  });
}


//FUNCION DE LA GRABACION
async function getRecord(recorder) {
  recorder.startRecording();
};

async function stopRecord(recorder) {
  await recorder.stopRecording();
  let blob = await recorder.getBlob();
  //invokeSaveAsDialog(blob);
  form = new FormData();
  form.append("file", blob, "myGif.gif");
    
  console.log(form.get("file"));
 
}




//FUNCION DEL CRONOMETRO
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let hundredths = document.getElementById("hundredths");

class State {
  constructor(startTimestamp, difference, suspended) {
    this.startTimestamp = startTimestamp;
    this.difference = difference;
    this.suspended = suspended;
  }

  static ready() {
    return new State(null, 0, 0);
  }
}

class Stopwatch {
  constructor(state) {
    this.state = state;
    this.requestAnimationId = null;
    this.handleClickStart = this.handleClickStart.bind(this);
    document
      .getElementById("grabar")
      .addEventListener("click", this.handleClickStart);
    this.handleClickStop = this.handleClickStop.bind(this);
    document
      .getElementById("finalizar")
      .addEventListener("click", this.handleClickStop);

    this.tick = this.tick.bind(this);
    this.render();
  }

  static ready() {
    return new Stopwatch(State.ready());
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  tick() {
    this.setState({
      difference: new Date(new Date() - this.state.startTimestamp)
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }

  handleClickStart() {
    if (this.state.startTimestamp) {

      return;
    }
    this.setState({
      startTimestamp: new Date() - this.state.suspended,
      suspended: 0
    });
    this.requestAnimationId = requestAnimationFrame(this.tick);
  }

  handleClickStop() {
    cancelAnimationFrame(this.requestAnimationId);
    this.setState({
      startTimestamp: null,
      suspended: this.state.difference
    });
  }

  render() {
    const { difference } = this.state;
    const hundredths = (difference
      ? Math.floor(difference.getMilliseconds() / 10)
      : 0
    )
      .toString()
      .padStart(2, "0");
    const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
      .toString()
      .padStart(2, "0");
    const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
      .toString()
      .padStart(2, "0");

    // Render screen
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("hundredths").textContent = hundredths;
  }
}
const STOPWATCH = Stopwatch.ready();

