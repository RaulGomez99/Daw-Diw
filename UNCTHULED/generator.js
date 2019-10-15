//La matriz es de 31 * 22
//La fila 0 es donde empieza
//Los caminos son las columnas 0,6,12,18,24,30
//Los caminos son la fila 1,6,11,16,21
//El 0=Es camino sin pisada
//El 1=Es camino con pisada
//El 2=Es columna no descubierta
//El 3=Es columna sin nada
//El 4=Es columna con llave
//El 5=Es columna con urna
//El 6=Es columna con pergamino
//El 7=Es columna con movia
//El 8=Es tu personaje sin camino
//El 9=Es tu personaje con camino
//El 10=Es una momia sin camino
//El 11=Es una momia con camino

//let columnas = " 0 6 12 18 24 30 ";
//let filas = "1 6 11 16 21"
var coordenada=0;
let columnas = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29];
let filas = [2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20];
var mapa;
var personaje = {
    "coordenadaX": 12,
    "coordenadaY": 0
}
window.onload = function() {
    crearMapa();
    document.addEventListener("keydown", teclado, false);
}

function teclado(e) {
    //Arriba = 38 -> 1 -31
    //Derecha = 39 -> 2 +1
    //Abajo = 40 -> 3 +31
    //Izquierda = 37 -> 4 -1
    var keyCode = e.keyCode;
    console.log(e.keyCode);
    switch (keyCode) {
        case 37:
            console.log(mover(personaje, -1, 0));
            break;
        case 38:
            console.log(mover(personaje, 0, -1));
            break;
        case 39:
            console.log(mover(personaje, 1, 0));
            break;

        case 40:
            console.log(mover(personaje, 0, 1));
            break;
        
    }
}

function mover(quien, direccionX, direccionY) {
    try {
        if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 0 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 1) {
            mapa.mapa[quien.coordenadaY][quien.coordenadaX] -= 8;
            mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] += 8;
            let div = quien.coordenadaY*31+quien.coordenadaX;
            console.log(quien.coordenadaX+" "+quien.coordenadaY);
            document.getElementById(div).classList.remove("personaje");
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            console.log(div);
            document.getElementById(div).classList.add("personaje");
            return true;
        } else {

            return mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX];
        }
    } catch (e) {
        return "Hola";
    }

}

function crearMapa() {
    document.getElementById("mapa").style.height = (window.innerHeight - 20);
    mapa = new Object();
    mapa.mapa = new Array();
    mapa.mapa[0] = new Array();
    for (let i = 0; i < 31; i++) {
        mapa.mapa[0][i] = -1;
    }
    for (let y = 1; y < 22; y++) {
        mapa.mapa[y] = new Array();
        for (let x = 0; x < 31; x++) {
            if (filas.indexOf(y) != -1 && columnas.indexOf(x) != -1) {
                mapa.mapa[y][x] = 2;
            } else {
                mapa.mapa[y][x] = 0;

            }
        }

    }
    mapa.mapa[personaje.coordenadaY][personaje.coordenadaX] = 8;
    //Momia
    mapa.mapa[21][30] = 10;

    reimprimir();

}

function reimprimir() {
    document.getElementById("mapa").innerHTML = "";
    for (let y = 0; y < 22; y++) {

        for (let x = 0; x < 31; x++) {
            addElemento(mapa.mapa[y][x]);
        }
    }
}

function addElemento(num) {
    let div = document.createElement("div");
    div.id=coordenada;
    coordenada++;
    switch (num) {
        case 0:

            div.classList.add("camino");
            break;
        case 2:
            div.classList.add("columna");
            break;
        case 8:

            div.classList.add("camino");
            div.classList.add("personaje");
            break;
        case 10:

            div.classList.add("camino");
            div.classList.add("momia");
            break;
        default:
            break;
    }
    document.getElementById("mapa").appendChild(div);
}