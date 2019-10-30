var c;
window.onload = function(){
    window.addEventListener("keydown", tecla);
    document.querySelectorAll("div").forEach(element => {
        element.addEventListener("transitionend", destransicionar);
    });
}
function destransicionar(e){
    e.target.classList.remove("transformado");
}

function tecla(e){
    const audio = document.querySelector(`audio[alt-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    const div = document.querySelector(`div[alt-key="${e.keyCode}"]`);
    div.classList.add("transformado");
}