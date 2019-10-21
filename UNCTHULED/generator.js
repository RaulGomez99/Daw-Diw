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
var primerMovimiento;
var llave;
var urna;
var pergamino;
var columnasArray;
var locked = true;
var monstruos, intervals = [];
var vidas=5;
var momias = 0;
var coordenada=0;
var veces=0;
let columnas = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29];
let filas = [2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20];
let esquinasX = [];
var mapa;
var direccion=0;
var personaje = {
    "coordenadaX": 12,
    "coordenadaY": 0,
    "personaje":true
}
/*var cthulhu = {
    "coordenadaX": 30,
    "coordenadaY": 21,
    "personaje":false,
    "muere": function(){
        vidas--;

    }
}*/
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
    if(locked){
        locked=false;
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
            case 80:
                velocidad=10;
                break;
            
        }
        direccion=0;
        murosAlrededor();
        setTimeout( function(){ locked = true; },100); 
    }
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
    if(mapa.mapa[y][x]==10) return false;
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

function compruebaContenidoColumna(x,y){
    console.log(x+" "+y+" "+coordenadaColumna(x,y) )

    switch (columnasArray[coordenadaColumna(x,y)]) {
        case "llave":
            pintar(x,y,3,4);
            llave=true;
            if(urna) crearPuerta();
            break;
        case "urna":
            pintar(x,y,3,5);
            urna=true;
            if(llave) crearPuerta();
            break;
        case "pergamino":
            pintar(x,y,3,6);
            pergamino=true;
            break;
        case "momia":
            pintar(x,y,3,7);
            setTimeout(function(){
                var coords = coordenadaColumnaFin(coordenadaColumna(x,y));
                console.log(coords);
                coords.coordenadaX+=1;
                coords.coordenadaY+=1;
                monstruos[monstruos.length] = crearMomia(momias ,coords.coordenadaX, coords.coordenadaY);
                console.log(monstruos)
                intervals[monstruos.length-1] = window.setInterval(function(){movimientoMomia(monstruos[monstruos.length-1])},500);
                if(mapa.mapa[coords.coordenadaY][coords.coordenadaX]==0) mapa.mapa[coords.coordenadaY][coords.coordenadaX] = 10;
                else mapa.mapa[coords.coordenadaY][coords.coordenadaX] = 11;
                momias++;
                document.getElementById("momias").innerText=momias;
            },2000);
            break;
    
        default:
          //  alert("nada");
            break;
    }
}

function murosAlrededor(){
    if(personaje.coordenadaX!=0){
        if(mapa.mapa[personaje.coordenadaY][personaje.coordenadaX-1]==2){
            if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY)){
                compruebaContenidoColumna(personaje.coordenadaX-1,personaje.coordenadaY);
                reimprimir();
            }else{
                pintar(personaje.coordenadaX-1,personaje.coordenadaY,3,2);
            }
        }
        if(personaje.coordenadaY!=0){
            if(mapa.mapa[personaje.coordenadaY-1][personaje.coordenadaX-1]==2){
                if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY-1)){
                    compruebaContenidoColumna(personaje.coordenadaX-1,personaje.coordenadaY-1);
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX-1,personaje.coordenadaY-1,3,2);
                }
            }
        }
        if(personaje.coordenadaY!=21){
            if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX-1]==2){
                if(alrededor(personaje.coordenadaX-1,personaje.coordenadaY+1)){
                    compruebaContenidoColumna(personaje.coordenadaX-1,personaje.coordenadaY+1);
                    
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
                compruebaContenidoColumna(personaje.coordenadaX+1,personaje.coordenadaY);
                reimprimir();
            }else{
                pintar(personaje.coordenadaX+1,personaje.coordenadaY,3,2);
            }
        }
        if(personaje.coordenadaY!=0){
            if(mapa.mapa[personaje.coordenadaY-1][personaje.coordenadaX+1]==2){
                if(alrededor(personaje.coordenadaX+1,personaje.coordenadaY-1)){
                    compruebaContenidoColumna(personaje.coordenadaX+1,personaje.coordenadaY-1);
                    reimprimir();
                }else{
                    pintar(personaje.coordenadaX+1,personaje.coordenadaY-1,3,2);
                }
            }
        }
        if(personaje.coordenadaY!=21){
            if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX+1]==2){
                if(alrededor(personaje.coordenadaX+1,personaje.coordenadaY+1)){
                    compruebaContenidoColumna(personaje.coordenadaX+1,personaje.coordenadaY+1);
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
                compruebaContenidoColumna(personaje.coordenadaX,personaje.coordenadaY-1);
                reimprimir();
            }else{
                pintar(personaje.coordenadaX,personaje.coordenadaY-1,3,2);
            }
        }
    }
    if(personaje.coordenadaY!=21){
        if(mapa.mapa[personaje.coordenadaY+1][personaje.coordenadaX]==2){
            if(alrededor(personaje.coordenadaX,personaje.coordenadaY+1)){
                compruebaContenidoColumna(personaje.coordenadaX,personaje.coordenadaY+1);
                reimprimir();
            }else{
                pintar(personaje.coordenadaX,personaje.coordenadaY+1,3,2);
            }
        }
    }
}
function crearPuerta(){
    mapa.mapa[0][12] =0;
    reimprimir();
}

function mover(quien, direccionX, direccionY) {
    if(direccionY==-1 && !primerMovimiento && quien.coordenadaY==0){
        alert("Ganaste");
        crearMapa();
    }
    try {
        if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 0 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 1) {
            mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 1;
            mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 8;
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            divi.classList.remove("personaje");
            if(quien.coordenadaY==0 && primerMovimiento){
                primerMovimiento=false;
                divi.classList.remove("camino");
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] =-1;
            }
            if(!divi.classList.contains("huella") && quien.coordenadaY!=0){
                divi.classList.add("huella");
            }
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            divi=document.getElementById(div);
            divi.classList.add("personaje");
            comprueba(div);
            if(divi.classList.contains("huella")){
                comprueba();
            }
            return true;
        } else if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 10 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 11)  {
            console.log("a");
            mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 1;
            mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 8;
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            divi.classList.remove("personaje");
            if(quien.coordenadaY==0){
                divi.classList.remove("camino");
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] =-1;
            }
            if(!divi.classList.contains("huella") && quien.coordenadaY!=0){
                divi.classList.add("huella");
            }
            console.log("c");
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            divi=document.getElementById(div);
            divi.classList.add("personaje");
            divi.classList.remove("momia");
            /*for(let i=0; i<momias; i++){
                if(quien.coordenadaX==monstruos[i].coordenadaX && quien.coordenadaY==monstruos[i].coordenadaY){
                    clearInterval(intervals[i]);
                }
            }*/
            clearInterval(intervals[divi.momia]);
            momias--;
            document.getElementById("momias").innerText=momias;
            if(!pergamino){
                vidas--;
                if(vidas==0) gameOver();
            }
            else pergamino=false;
            document.getElementById("vidas").innerText=vidas;

        }else{
            return mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX];
        }
        
    } catch (e) {
        return false;
    }
}

function moverMomia(quien, direccionX, direccionY) {
    try {
        if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 0 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 1) {
            
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            divi.classList.remove("momia");
            divi.removeAttribute("momia");
            if(divi.classList.contains("huella") ){
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 1;
                mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 11;
            }else{
                mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] = 10;
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 0;
            } 
            quien.coordenadaX+=direccionX;
            quien.coordenadaY+=direccionY;
            div = quien.coordenadaY*31+quien.coordenadaX;
            divi=document.getElementById(div);
            divi.classList.add("momia");
            divi.momia=quien.numMomia;
            return true;
        } else if (mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 8 || mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX] == 9)  {
            let div = quien.coordenadaY*31+quien.coordenadaX;
            var divi = document.getElementById(div);
            divi.classList.remove("momia");
            divi.removeAttribute("momia");
            if(divi.classList.contains("huella") ){
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 1;
            }else{
                mapa.mapa[quien.coordenadaY][quien.coordenadaX] = 0;
            } 
            clearInterval(intervals[quien.numMomia]);
            if(!pergamino){
                vidas--;
                if(vidas==0) gameOver();
            }
            else pergamino=false;
            document.getElementById("vidas").innerText=vidas;
            momias--;
            document.getElementById("momias").innerText=momias;

        }else{
            return mapa.mapa[quien.coordenadaY + direccionY][quien.coordenadaX + direccionX];
        }
        
    } catch (e) {
        return false;
    }
}

function coordenadaColumna(x,y){
    return (Math.floor(x/6.01))+(5*Math.floor(y/5.01));
}

function coordenadaColumnaFin(num){
    var retornar = {
        "coordenadaX":(((num%5)+1)*6)-1,
        "coordenadaY":(Math.floor(num/5)+1)*5
    }
    return retornar;
}

function gameOver(){
    alert("Game Over");
    momias=0;
    vidas=5;
    personaje = {
        "coordenadaX": 12,
        "coordenadaY": 0,
        "personaje":true
    }
    crearMapa();
}

function crearMapa() {
    direccion=0;
    for(let i=0; i<intervals.length; i++){
        clearInterval(intervals[i]);
    }
    llave=false;
    urna=false;
    primerMovimiento=true;
    pergamino=false;
    momias++;
    monstruos=[];
    intervals=[];
    columnasArray = new Array(20);
    aleatorizarColumnas();
    document.getElementById("momias").innerText=momias;
    
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
        console.log(monstruos[i]);
        intervals[i]=window.setInterval(function(){iaMomia(monstruos[i])},500);
    }
    
}

function aleatorizarColumnas(){
    let num;
    do{
        num=Math.floor(Math.random() * 20);
        if(columnasArray[num]==undefined) columnasArray[num]="llave";
        else num=-1;
    }while(num==-1);
    do{
        num=Math.floor(Math.random() * 20);
        if(columnasArray[num]==undefined) columnasArray[num]="urna";
        else num=-1;
    }while(num==-1);
    do{
        num=Math.floor(Math.random() * 20);
        if(columnasArray[num]==undefined) columnasArray[num]="pergamino";
        else num=-1;
    }while(num==-1);
    do{
        num=Math.floor(Math.random() * 20);
        if(columnasArray[num]==undefined) columnasArray[num]="momia";
        else num=-1;
    }while(num==-1);
}

function reimprimir() {
    document.getElementById("mapa").innerHTML = "";
    coordenada=0;
    for (let y = 0; y < 22; y++) {

        for (let x = 0; x < 31; x++) {
            addElemento(mapa.mapa[y][x]);
        }
    }
    try{
        document.getElementsByClassName("pergamino")[6].classList.add("pergaminoContenedor");
    }catch{

    }
    try{
        document.getElementsByClassName("llave")[6].classList.add("llaveContenedor");
    }catch{

    }
    try{
        document.getElementsByClassName("urna")[6].classList.add("urnaContenedor");
    }catch{

    }
    
}

function movimientoMomia(momia){
    if(!momia) return;
    if(momia.coordenadaX>personaje.coordenadaX){
        moverMomia(momia, -1 ,0);
    }
    if(momia.coordenadaY>personaje.coordenadaY){
        moverMomia(momia, 0 ,-1);
    }
    if(momia.coordenadaX<personaje.coordenadaX){
        moverMomia(momia, 1 ,0);
    }
    if(momia.coordenadaY<personaje.coordenadaY){
        moverMomia(momia, 0 ,1);
    }



  //  reimprimir();
    
}

function iaMomia(momia){
    if(direccion==0){
        movimientoMomia(momia);
        if(personaje.coordenadaY==momia.coordenadaY){
            if((personaje.coordenadaY-1)%5<=2) {
                direccion=1;
                veces=(personaje.coordenadaY-1)%5
            }
            else{
                direccion=3;
                veces = 5 -(personaje.coordenadaY-1)%5;
            } 
        }
        if(personaje.coordenadaX==momia.coordenadaX){
            if((personaje.coordenadaX)%6<=2){
                direccion=2;
                veces = (personaje.coordenadaX)%6;
            } 
            else {
                direccion=4;
                veces = 6-(personaje.coordenadaX)%6;
            }
        }
    }
    else{
        switch (direccion) {
            case 1:
                moverMomia(momia, 0,-1);
                break;
            case 2:
                moverMomia(momia, -1 ,0);
                break;
            case 3:
                moverMomia(momia, 0 ,1);
                break;
            case 4:
                moverMomia(momia, 1 ,0);
                break;
        }
        veces--;
        console.log(veces);
        if(veces==0) {
            if(direccion==1 || direccion==3){
                if(momia.coordenadaX>personaje.coordenadaX){
                    moverMomia(momia, -1 ,0);
                }
                if(momia.coordenadaX<personaje.coordenadaX){
                    moverMomia(momia, 1 ,0);
                }
            }else{
                if(momia.coordenadaY>personaje.coordenadaY){
                    moverMomia(momia, 0 ,-1);
                }
                if(momia.coordenadaY<personaje.coordenadaY){
                    moverMomia(momia, 0 ,1);
                }
            }
            console.log(momia.coordenadaX<personaje.coordenadaX);
            direccion=0;
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
        case 1:

                div.classList.add("camino");
                div.classList.add("huella");
                break;
        case 2:
            div.classList.add("columna");
            break;
        case 3:
            div.classList.add("descubierta");
            break;
        case 4:
            div.classList.add("llave");
            break;
        case 5:
            div.classList.add("urna");
            break;
        case 6:
            div.classList.add("pergamino");
            break;
        case 7:
            div.classList.add("momiaM");
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