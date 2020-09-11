
function mobileSearch() {
    widthScreen = (window.innerWidth > 375) ? window.innerWidth : screen.width;    

    let inputSearch = document.getElementById("inputSearch");
    let title = document.getElementById("titleP");
    let ilustraHeader = document.getElementById("ilustraHeader");
    let partOne = document.getElementById("partOne");
    let btnSearch = document.getElementById("btnSearch");
    let suggestion = document.getElementById("suggestion");

    if (widthScreen <= 375) {
        
        inputSearch.style.marginTop = "24px";        
        
        title.style.display = "none";        
        
        ilustraHeader.style.display = "none";        
        
        partOne.style.height = "74px";

        btnSearch.style.top = "141px";
        suggestion.style.top = "174px";

    } else {
        title.style.display = "initial";
        ilustraHeader.style.display = "initial";

    }
};