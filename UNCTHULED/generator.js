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
var monstruos, intervals;
var vidas=5;
var momias = 2;
var coordenada=0;
let columnas = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29];
let filas = [2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20];
let esquinasX = [];
var mapa;
var personaje = {
    "coordenadaX": 12,
    "coordenadaY": 0,
    "personaje":true
}
var cthulhu = {
    "coordenadaX": 30,
    "coordenadaY": 21,
    "personaje":false,
    "muere": function(){
        vidas--;

    }
}

window.onload = function() {
    crearMapa();
    document.addEventListener("keydown", teclado, false);
}

function crearMomia(numMomia, x,y){
    return {"coordenadaX":x,
        "coordenadaY":y,
        "personaje":false,
        "numMomia":numMomia
    };
}
function teclado(e) {
    //Arriba = 38 -> 1 -31
    //Derecha = 39 -> 2 +1
    //Abajo = 40 -> 3 +31
    //Izquierda = 37 -> 4 -1
    var keyCode = e.keyCode;
    switch (keyCode) {
        case 37: case 65:
            mover(personaje, -1, 0);
            break;
        case 38: case 87:
            mover(personaje, 0, -1);
            break;
        case 39: case 68:
            mover(personaje, 1, 0);
            break;

        case 40: case 83:
            mover(personaje, 0, 1);
            break;
        
    }
    murosAlrededor();
}

function pintar(x, y, numPrim, numSust){
    if(mapa.mapa[y][x]==numPrim){
        mapa.mapa[y][x]=numSust;
        pintar(x+1, y+1, numPrim, numSust);
        pintar(x+1, y, numPrim, numSust);
        pintar(x+1, y-1, numPrim, numSust);
        pintar(x-1, y+1, numPrim, numSust);
        pintar(x-1, y, numPrim, numSust);
        pintar(x-1, y-1, numPrim, numSust);
        pintar(x, y+1, numPrim, numSust);
        pintar(x, y-1, numPrim, numSust);
    }
}

function alrededor(x, y){
    if(mapa.mapa[y][x]==0){
        return false;
    }
    if(mapa.mapa[y][x]==1) return true;
    if(mapa.mapa[y][x]==3) return true;
    if(mapa.mapa[y][x]==8) return true;
    if(mapa.mapa[y][x]==9) return true;
    if(mapa.mapa[y][x]==11) return true;
    mapa.mapa[y][x]=3;
    if(!alrededor(x+1, y+1)) return false;
    if(!alrededor(x+1, y)) return false;
    if(!alrededor(x+1, y-1)) return false;
    if(!alrededor(x-1, y+1)) return false;
    if(!alrededor(x-1, y)) return false;
    if(!alrededor(x-1, y-1)) return false;
    if(!alrededor(x, y+1)) return false;
    if(!alrededor(x, y-1)) return false;
    return true;
}

function murosAlrededor(){
    if(personaje.coordenadaX!=0){
        if(mapa.mapa[personaje.coordenadaY][personaje.coordenadaX-1]==2){
            if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY)){
                reimprimir();
            }else{
                pintar(personaje.coordenadaX-1,personaje.coordenadaY,3,2);
            }
        }
        if(personaje.coordenadaY!=0){
            if(mapa.mapa[personaje.coordenadaY-1][personaje.coordenadaX-1]==2){
                if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY-1)){
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX-1,personaje.coordenadaY-1,3,2);
                }
            }
        }
        if(personaje.coordenadaY!=21){
            if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX-1]==2){
                if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY+1)){
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX-1,personaje.coordenadaY+1,3,2);
                }
            }
        }
    }
    if(personaje.coordenadaX!=30){
        if(mapa.mapa[personaje.coordenadaY][personaje.coordenadaX+1]==2){
            if(alrededor(personaje.coordenadaX+1,personaje.coordenadaY)){
                reimprimir();
            }else{
                pintar(personaje.coordenadaX+1,personaje.coordenadaY,3,2);
            }
        }
        if(personaje.coordenadaY!=0){
            if(mapa.mapa[personaje.coordenadaY-1][personaje.coordenadaX+1]==2){
                if(alrededor(personaje.coordenadaX+1,personaje.coordenadaY-1)){
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX+1,personaje.coordenadaY-1,3,2);
                }
            }
        }
        if(personaje.coordenadaY!=21){
            if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX+1]==2){
                if(alrededor(personaje.coordenadaX+1,personaje.coordenadaY+1)){
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX+1,personaje.coordenadaY+1,3,2);
                }
            }
        }
    }
    if(personaje.coordenadaY!=0){
        if(mapa.mapa[personaje.coordenadaY-1][personaje.coordenadaX]==2){
            if(alrededor(personaje.coordenadaX,personaje.coordenadaY-1)){
                reimprimir();
            }else{
                pintar(personaje.coordenadaX,personaje.coordenadaY-1,3,2);
            }
        }
    }
    if(personaje.coordenadaY!=21){
        if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX]==2){
            if(alrededor(personaje.coordenadaX,personaje.coordenadaY+1)){
                reimprimir();
            }else{
                pintar(personaje.coordenadaX,personaje.coordenadaY+1,3,2);
            }
        }
    }
}

function mover(quien, direccionX, direccionY) {
    try {
        if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 0 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 1) {
            if(quien.personaje)mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 1;
            if(quien.personaje)mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 8;
            else mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 10;
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            if(quien.personaje)divi.classList.remove("personaje");
            else divi.classList.remove("momia");
            if(quien.coordenadaY==0){
                divi.classList.remove("camino");
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] =-1;
            }
            if(!divi.classList.contains("huella") && quien.coordenadaY!=0 && quien.personaje){
                divi.classList.add("huella");
            }
            if(!quien.personaje){
                if(divi.classList.contains("huella")) mapa.mapa[quien.coordenadaY][quien.coordenadaX]=1;
                else mapa.mapa[quien.coordenadaY][quien.coordenadaX]=0;
            }
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            divi=document.getElementById(div);
            if(quien.personaje)divi.classList.add("personaje");
            else divi.classList.add("momia"); 
            return true;
      /*  }else if(mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 8 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 9){ 
            //mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX]+=2;
            mapa.mapa[quien.coordenadaY][quien.coordenadaX]=0;
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            divi.classList.remove("momia");
            if(divi.classList.contains("huella")){
                mapa.mapa[quien.coordenadaY][quien.coordenadaX]=1;
            }
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            divi=document.getElementById(div);
            clearInterval(intervals[quien.numMomia]);
            vidas--;
            document.getElementById("vidas").innerText=vidas;
            
        }else if(mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 11 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 10){
            if(quien.personaje){
                
                mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX]=9;
                mapa.mapa[quien.coordenadaY][quien.coordenadaX]=1;
                let div = quien.coordenadaY*31+quien.coordenadaX;
                var divi = document.getElementById(div);
                divi.classList.remove("personaje");
                if(!divi.classList.contains("huella") && quien.coordenadaY!=0 && quien.personaje){
                    divi.classList.add("huella");
                }
                quien.coordenadaX+=direccionX;
                quien.coordenadaY+=direccionY;
                div = quien.coordenadaY*31+quien.coordenadaX;
                divi=document.getElementById(div);
                divi.classList.add("personaje");
                divi.classList.remove("momia");
                var numMomia;
                //Buscar momia
                monstruos.forEach(function(momia)  {
                    if(momia.coordenadaX==quien.coordenadaX && momia.coordenadaY==quien.coordenadaY){
                        numMomia=momia.numMomia;
                    }
                });
                clearInterval(intervals[numMomia]);
                vidas--;
                
                document.getElementById("vidas").innerText=vidas;
            }*/
        }else{
            console.log("a");
           // console.log(mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX]);
            return mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX];
        }
    } catch (e) {
        return false;
    }

}



function crearMapa() {
    momias++;
    monstruos=[];
    
    document.getElementById("mapa").style.height = (window.innerHeight -window.innerHeight*0.1);
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
    for(let i=0; i<momias; i++){
        do{
            x= Math.floor(Math.random() * 31); 
            y= Math.floor(Math.random() * (22 - 10)) + 10;
            num=mapa.mapa[y][x]; 
        }while(num!=0);
        monstruos[i]=crearMomia(i,x,y);
        mapa.mapa[monstruos[i].coordenadaY][monstruos[i].coordenadaX] = 10;
    }
    

    reimprimir();
    intervals=[];
    for(let i=0; i<momias; i++){
        intervals[i]=window.setInterval(function(){movimientoMomia(monstruos[i])},500);
    }
    
}

function reimprimir() {
    document.getElementById("mapa").innerHTML = "";
    coordenada=0;
    for (let y = 0; y < 22; y++) {

        for (let x = 0; x < 31; x++) {
            addElemento(mapa.mapa[y][x]);
        }
    }
}

function movimientoMomia(momia){
    if(momia.coordenadaX>personaje.coordenadaX){
        mover(momia, -1 ,0);
    }
    if(momia.coordenadaY>personaje.coordenadaY){
        mover(momia, 0 ,-1);
    }
    if(momia.coordenadaX<personaje.coordenadaX){
        mover(momia, 1 ,0);
    }
    if(momia.coordenadaY<personaje.coordenadaY){
        mover(momia, 0 ,1);
    }
  //  reimprimir();
    
}

function addElemento(num) {
    let div = document.createElement("div");
    div.id=coordenada;
    coordenada++;
    switch (num) {
        case 0:

            div.classList.add("camino");
            break;
        case 1:

                div.classList.add("camino");
                div.classList.add("huella");
                break;
        case 2:
            div.classList.add("columna");
            break;
        case 3:
            div.style.background="red";
            break;
        case 8:

            div.classList.add("camino");
            div.classList.add("personaje");
            break;
        case 9:

            div.classList.add("camino");
            div.classList.add("huella");
            div.classList.add("personaje");
            break;
        case 10:

            div.classList.add("camino");
            div.classList.add("momia");
            break;
        case 11:

            div.classList.add("camino");
            div.classList.add("huella");
            div.classList.add("momia");
            break;
        default:
            break;
    }
    document.getElementById("mapa").appendChild(div);
}