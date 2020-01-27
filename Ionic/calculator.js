function onLoad() {
    document.addEventListener("ionChange", setStyle);
    document.querySelectorAll("ion-col ion-button").forEach(el=>el.addEventListener("click",add));
    setStyle();
}
function setStyle() {
    document.querySelectorAll("ion-content ion-button").forEach(function(b) {
        b.expand = "block";
        b.strong = "true";
        b.fill = document.getElementById("type").value;
        b.size = document.getElementById("size").value;
    });
}
function setResult(value) {
    document.getElementById("result").innerHTML = value;
}
function getResult() {
    return(document.getElementById("result").innerHTML);
}
function add(ev){
    console.log(ev);
    let key = ev.target.innerText;
    var result = getResult();
    if(key=="AC"){
        del();
        return;
    }
    if(key=="="){
        calc();
        return;
    }
    if (result!="0" || isNaN(key)){
        setResult(result + key);
    } else setResult(key);
}
function calc() {
    var result = eval(getResult());
    setResult(result);
}
function del() {
    setResult(0);
}