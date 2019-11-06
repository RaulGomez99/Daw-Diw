function init(){
    document.querySelector("button").addEventListener("click", addCuadrado);
}
function addCuadrado() {
    let div = document.createElement("box");
    // div.classList.add("box");
    div.addEventListener("click", secondLevel);
    document.querySelector("container").append(div);
}

function secondLevel() {
    this.removeEventListener("click", secondLevel, false);   
    this.classList.add("evoluciona");
    this.addEventListener("click", thirdLevel);
}

function thirdLevel() {
    this.removeEventListener("click", thirdLevel, false);  
    this.classList.remove("evoluciona");
    this.addEventListener("click", ctulhea);
}

function ctulhea() {
    this.removeEventListener("click", ctulhea, false);
    this.classList.add("ultimate");
}

window.onload=init;
