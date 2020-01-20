function buildGrafico(){
    console.info(" * Construyendo grafico ");

    /*const dioses = [
        {nombre:"Cthulhu",poder:1000,color:"green"},
        {nombre:"Nyarlatothep",poder:600,color:"red"},
        {nombre:"Azazoth",poder:1400,color:"grey"},
        {nombre:"Pepe",poder:800,color:"purple"}
    ];*/
    let dioses = [];
    let colores =  ["","red","lightblue","green","yellow"]
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
    document.querySelector("input[name='jpg']").addEventListener("click",descargarCanvas,false);
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
    console.log(ctx.textAlign)

    ctx.font = "bold";
    ctx.textBaseline = "middle"; 
    dioses.forEach(dios=> {
        let acabar= ((2*Math.PI*dios.poder)/poderTotal)+empezar;
        ctx.fillStyle=dios.color;
        ctx.beginPath();
        ctx.arc(width/2, height/2, width/4,empezar,acabar);
        ctx.lineTo(width/2,height/2)
        ctx.fill();

        //Texto
        var midAngle = empezar + (acabar - empezar) / 2;
        var labelRadius = width/4 * .65;
        var x = width/2 + (labelRadius) * Math.cos(midAngle);
        var y = height/2 + (labelRadius) * Math.sin(midAngle);

        ctx.translate(x,y);
        if(midAngle>0.5*Math.PI) midAngle-=(Math.PI);
        ctx.rotate(midAngle);
        ctx.fillStyle = 'black';
        ctx.textAlign = "center"; 
        ctx.fillText(dios.nombre, -3, -3);
        ctx.rotate(-midAngle);
        ctx.translate(-x,-y);
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
    ctx.font = "bold";
    ctx.textBaseline = "middle"; 
    for (let i = 0; i < espacios; i++) {
        if(booleana){
            const dios = dioses[Math.floor(i/2)];
            ctx.fillStyle=dios.color;
            let altura = Math.round(width*dios.poder/(poderTotal+20))
            ctx.fillRect(espacio*i,height-altura,espacio,altura);
            //Texto
            ctx.translate(espacio*i+espacio/2,height);
            ctx.rotate(Math.PI*1.5);
            ctx.fillStyle = 'black';
            ctx.textAlign = "start"; 
            ctx.fillText(dios.nombre, 0, 0);
            ctx.rotate(-Math.PI*1.5);
            ctx.translate(-(espacio*i+espacio/2),-height);
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
    ctx.font = "bold";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "middle"; 
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
            
            //Texto
           // ctx.translate(espacio*i,height-altura);
          //  ctx.rotate(Math.PI*1.5);
            ctx.fillStyle = 'black';
            ctx.textAlign = "center"; 
            ctx.fillText(dios.nombre, espacio*i, height-altura);
        //    ctx.rotate(-Math.PI*1.5);
        //    ctx.translate(-(espacio*i),-(height-altura));

            yAnterior=height-altura;
        }
        booleana=!booleana;
        
    }
}

function descargarCanvas(){
    console.log("Descargar canvas")
    const canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    
    var fullQuality = canvas.toDataURL('image/png', 1.0);
    // window.win = open(fullQuality);
    // //response.redirect("~/testpage.html");
    // setTimeout('win.document.execCommand("SaveAs")', 100);
    // setTimeout('win.close()', 500);
    let a = document.createElement("a");
    a.href=fullQuality;
    // a.target="_blank";
    a.download="Grafico.png";
    a.click();
    
}

window.onload=init;