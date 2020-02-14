function loadGame(){
    var xmlhttp = new XMLHttpRequest();
    if(gameState === "start"){
        xmlhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                document.getElementById("startContent").innerHTML = xmlhttp.responseText;
                document.getElementById("startContent").style.marginTop = "100px";
            }
        }
        xmlhttp.open("GET" , "game.html" , true);
        xmlhttp.send();
    }

    else if(gameState === "running"){
        gameState = "start";
        xmlhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                document.getElementById("startContent").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET" , "won.html" , true);
        xmlhttp.send();
    }
}