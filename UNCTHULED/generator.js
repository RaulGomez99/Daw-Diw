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
//El 8=Es tu personaje
//El 9=Es una momia

//let columnas = " 0 6 12 18 24 30 ";
//let filas = "1 6 11 16 21"
let columnas = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29];
let filas = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19];
window.onload = function() {
    document.getElementById("mapa").style.height = (window.innerHeight - 20);
    var mapa = new Object();
    mapa.mapa = new Array();
    for (let y = 0; y < 21; y++) {
        mapa.mapa[y] = new Array();
        for (let x = 0; x < 31; x++) {
            if (filas.indexOf(y) != -1 && columnas.indexOf(x) != -1) {
                mapa.mapa[y][x] = 2;
            } else {
                mapa.mapa[y][x] = 0;

            }
        }

    }
    for (let x = 0; x < 31; x++) {
        if(x==12){
           this.addElemento(0);
        }else{
            addElemento(-1);
        }
        
    }

    for (let y = 0; y < 21; y++) {

        for (let x = 0; x < 31; x++) {
            addElemento(mapa.mapa[y][x]);
        }
    }
}


function addElemento(num) {
    let div = document.createElement("div");
    switch (num) {
        case 0:

            div.classList.add("camino");
            break;
        case 2:
            div.classList.add("columna");
            break;
        default:
            break;
    }
    document.getElementById("mapa").appendChild(div);
}