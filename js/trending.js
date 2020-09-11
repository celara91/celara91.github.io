
let trendingSearch = document.getElementById("partTwoTrending");
let partTwo = document.getElementById("partTwo");
let principalTT = document.createElement("div");
principalTT.id  = "principalTT";
partTwo.appendChild(principalTT);

//Variable contador para el offset
let count = 0;


function trendingSearchTerms() {
    //Hacer el request
    fetch(`https://api.giphy.com/v1/trending/searches?&${APIKEY}`).then(response => response.json())
        .then(json => {
            //Se muestra el json.data para ver los terms
            console.log(json.data);
            //Crear una variable con la data
            let arrayTrendingTerms = json.data;
            
            //Crear un array vacío, que será el que se mostrará
            let arrayRandomTT = [];

            for (let index = 0; index < arrayTrendingTerms.length; index += 1) {
                //Hasta que se tenga un array de 5 elementos se repetirá...
                while (arrayRandomTT.length < 5) {
                    let randomTT = Math.floor(Math.random() * arrayTrendingTerms.length);
                    
                    //Si no existe un elemento igual agregar a...con el método includes()
                    if (!(arrayRandomTT.includes(arrayTrendingTerms[randomTT]))) {
                        
                        arrayRandomTT.push(arrayTrendingTerms[randomTT]);
                        let divtt = document.createElement("div");
                        divtt.id = "partTwoTrending";
                        divtt.innerHTML = arrayTrendingTerms[randomTT];
                        
                        principalTT.appendChild(divtt);
                        
                        divtt.onclick = () => { inputSearch.value = divtt.innerHTML;
                            requestGif(divtt.innerHTML, 0)};
                        
                    }
                                      
                }                
            }
        });
    };

trendingSearchTerms();
