function buildGrafico(){
    console.info(" * Construyendo grafico ");

    /*const dioses = [
        {nombre:"Cthulhu",poder:1000,color:"green"},
        {nombre:"Nyarlatothep",poder:600,color:"red"},
        {nombre:"Azazoth",poder:1400,color:"grey"},
        {nombre:"Pepe",poder:800,color:"purple"}
    ];*/
    let dioses = [];
    let colores =  ["","red","blue","green","yellow"]
    for (let i = 1; i <= 4; i++) {
        dioses.push({
            nombre:document.querySelectorAll(".left")[i].value,
            poder:parseInt(document.querySelectorAll(".right")[i].value),
            color:colores[i]
        })
        
    }
    console.log(dioses);
    let numGrafico = document.getElementById("grafico").value;
    if(numGrafico==1){
        graficoQuesito(dioses);
    }else if(numGrafico==2){
        graficoRayas(dioses);
    }else{
        graficoLineas(dioses);
    }

}

function loadListeners(){
    document.querySelector("input[name='grafiqueame']").addEventListener("click",buildGrafico);
}


function init(){
    console.log(" * Init ");
    loadListeners();
    
    
}

function graficoQuesito(dioses){
    console.log("Creando grafico quesitos")
    const canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    ctx.clearRect(0,0,width,height);

    let empezar = -0.5*Math.PI;
    const poderTotal = dioses.reduce( (suma ,{poder})=> suma+=poder,0);
    dioses.forEach(dios=> {
        let acabar= ((2*Math.PI*dios.poder)/poderTotal)+empezar;
        ctx.fillStyle=dios.color;
        ctx.beginPath();
        ctx.arc(width/2, height/2, width/4,empezar,acabar);
        ctx.lineTo(width/2,height/2)
        ctx.fill();
        empezar = acabar;
    });
    


}

function graficoRayas(dioses){
    console.log("Creando grafico rayas")
    const canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    ctx.clearRect(0,0,width,height);
    const poderTotal = dioses.reduce( (suma ,{poder})=> suma+=poder,0);
    console.log(poderTotal);
    const espacios = (dioses.length*2)+1; //Ya que es los rectangulos mas espacios
    const espacio = canvas.width/espacios;
    let booleana = false;
    for (let i = 0; i < espacios; i++) {
        if(booleana){
            const dios = dioses[Math.floor(i/2)];
            ctx.fillStyle=dios.color;
            let altura = Math.round(width*dios.poder/(poderTotal+20))
            ctx.fillRect(espacio*i,height-altura,espacio,altura);
        }
        booleana=!booleana;
        
    }
}

function graficoLineas(dioses){
    console.log("Creando grafico lineas")
    const canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    ctx.clearRect(0,0,width,height);
    const poderTotal = dioses.reduce( (suma ,{poder})=> suma+=poder,0);
    const espacios = (dioses.length*2)+1; //Ya que es los rectangulos mas espacios
    const espacio = canvas.width/espacios;
    let booleana = false;
    let yAnterior=width;
    for (let i = 0; i < espacios; i++) {
        if(booleana){
            const dios = dioses[Math.floor(i/2)];
            ctx.strokeStyle="black";
            let altura = Math.round(width*dios.poder/(poderTotal+20))
            ctx.beginPath();
            ctx.moveTo(espacio*i-2*espacio,yAnterior);
            ctx.lineTo(espacio*i,height-altura);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(espacio*i,height-altura,7,0,2*Math.PI)
            ctx.fillStyle=dios.color;
            ctx.fill();
            
            yAnterior=height-altura;
        }
        booleana=!booleana;
        
    }
}

window.onload=init;