/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/
var todos;
var num;

function init(){
    //document.querySelectorAll("steps *").forEach(key => key.classList.add("estabaEscondido"));
   // document.querySelectorAll("steps *").forEach(key => key.getElementsByClassName.transition="1s");
    document.querySelector("button").addEventListener("click",startMigration);
    todos = document.querySelectorAll("steps *");
    num=0;

    
}

function startMigration(){
    todos[0].addEventListener("transitionend",migration);
    todos[0].style.opacity="1";
   //todos[0].classList.remove("estabaEscondido");

}

function migration(){
    num++;
    if(num >= todos.length) return;
    if(todos[num].nodeName=="SPAN") migration();
    var numE = todos[num].attributes["data-step"].value;
    if((numE+1)%3==0){
        console.log("Tonto quien lo lea");
        todos[num].style.opacity="1";
     //   todos[num].style.transition="width 3s";
        todos[num].value=100;
        todos[num].style.width="100%";
        todos[num].addEventListener("transitionend",migration);
    }else if(numE%3==0){
        todos[num].style.opacity="1";
        todos[num].addEventListener("transitionend",migration);
    }else{
        todos[num].style.opacity="1";
        todos[num].addEventListener("transitionend",migration);
    }
    
    //todos[num].classList.remove("estabaEscondido");

}

// Init the environment when all is ready
window.onload=init;
