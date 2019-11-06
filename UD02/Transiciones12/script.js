function init(){
    document.querySelector("button").addEventListener("click", addCuadrado);
}
function addCuadrado(){
    console.log("hola");
    let div = document.createElement("box");
   // div.classList.add("box");
    div.addEventListener("click", secondLevel);
    document.querySelector("container").append(div);
}

function secondLevel(){
    this.removeEventListener("click", function(){},true);
    this.classList.add("evoluciona");
    this.addEventListener("click", thirdLevel);
}

function thirdLevel(){
    this.removeEventListener("click", function(){},true);
    this.classList.remove("evoluciona");
    this.addEventListener("click", ctulhea);
}

function ctulhea(){
    this.removeEventListener("click", function(){},true);
    this.classList.add("ultimate");
}

window.onload=init;
