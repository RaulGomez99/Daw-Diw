var poder = "nada";
function init() {
    document.querySelector("button").addEventListener("click", addCuadrado);
    document.querySelector("#garen").addEventListener("click", addPoder);
    document.querySelector("#dvd").addEventListener("click", addPoder);
    document.querySelector("#silenciar").addEventListener("click", addPoder);
}

function addCuadrado() {
    poder = "nada";
    let div = document.createElement("box");
    // div.classList.add("box");
    div.addEventListener("click", secondLevel);
    document.querySelector("container").append(div);
}

function secondLevel() {
    poder = "nada";
    this.removeEventListener("click", secondLevel, false);   
    this.classList.add("evoluciona");
    this.addEventListener("click", thirdLevel);
}

function thirdLevel() {
    poder = "nada";
    this.removeEventListener("click", thirdLevel, false);  
    this.classList.remove("evoluciona");
    this.addEventListener("click", ctulhea);
}

function ctulhea() {
    poder = "nada";
    this.removeEventListener("click", ctulhea, false);
    this.classList.add("ultimate");
    console.log("hola")
    this.addEventListener("click", poderF);
}

function poderF() {
    if (poder == "nada") return;
    console.log("adios");
    switch (poder) {
        case "garen":
            this.classList.add("garen");
            this.classList.remove("dvd");
            break;
        case "dvd":
            this.classList.add("dvd");
            this.classList.remove("garen");
            break;
        case "silenciar":
            this.classList.remove("garen");
            this.classList.remove("dvd");
            break;
    }
}

function addPoder(e) {
    poder = this.attributes.poder.value;
}




window.onload = init;