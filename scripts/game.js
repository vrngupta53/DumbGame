var gameCanvas;
var ctx;
var x_mult;
var y_mult;
var x_unit;
var y_unit;
var cells;
var highScore;
var prob;
var reqid;
//console.log(gameState);


function gameOn(probability){
 test = false;   
 cancelAnimationFrame(reqid);
 prob = parseFloat(probability);
 highScore = false;   
 gameState = "running";
 gameCanvas = document.getElementById("gameCanvas");
 ctx = gameCanvas.getContext("2d");
 x_mult = 0;
 y_mult = 0;
 x_unit = gameCanvas.width / 10;
 y_unit = gameCanvas.height / 20;
 cells = new Array(10);
for (i = 0; i < 10; i++) {
    cells[i] = new Array(20);
    for (j = 0; j < 20; j++) {
        cells[i][j] = 0;
    }
}
setBG();
reqid = window.requestAnimationFrame(gameLoop);
}
var black = 0;
var red = 0;
var green = 0;

function setBG() {
    cellsInit();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fill();
    ctx.closePath();
}

function cellsInit() {
    iniTime = (new Date().getTime());
    // console.log(iniTime);
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            cells[i][j] = Math.floor(Math.random() * 3) % 3;
        }
    }
}

function unitSquare(x_mult, y_mult, color) {
    ctx.beginPath();
    ctx.rect(x_mult * x_unit, y_mult * y_unit, gameCanvas.width / 10, gameCanvas.height / 20);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}


function unitSquareBoundary(x_mult, y_mult) {
    ctx.beginPath();
    ctx.strokeRect(x_mult * x_unit, y_mult * y_unit, gameCanvas.width / 10, gameCanvas.height / 20);
    ctx.strokeStyle = "grey";
    ctx.fill();
    ctx.closePath();
}

function locateCell() {
    if(gameState === "running"){
        x = Math.floor(event.offsetX / x_unit);
        y = Math.floor(event.offsetY / y_unit);
        cells[x][y] = (1 + cells[x][y]) % 3;
    }
}

function gameLoop() {
    update();
    draw();
    if (red != 200) {
        reqid = requestAnimationFrame(gameLoop);
    } else {
        var time = (new Date().getTime() - iniTime)/1000;
        alert("you won in " + time + " seconds");
        updateHighScore(time);
        loadGame();
    }
}

function draw() {
    black = red = green = 0;
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            if (cells[i][j] === 0) {
                unitSquare(i, j, "black");
                black++;
            } else if (cells[i][j] === 1) {
                unitSquare(i, j, "red");
                red++;
            } else {
                unitSquare(i, j, "green");
                green++;
            }
        }
    }

    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            unitSquareBoundary(i, j);
        }
    }
}

function update() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 20; j++) {
            if(test){
                cells[i][j] = 1;
            }
            else if (Math.random() < prob) {
                cells[i][j] = (cells[i][j] + 1) % 3;
            }
        }
    }
}

function updateHighScore(time){
    var cnt = 1;
    for(;cnt <= 5; cnt++){
        str_score = localStorage.getItem(cnt);
        if(str_score == null || parseFloat(str_score) > time) break; 
    }

    var temp = localStorage.getItem(cnt);
    var temp2 = time;
    for(;cnt <= 5; cnt++){
        if(!(temp2 == null)){
            localStorage.setItem(cnt , temp2);
            temp2 = temp;
            temp = localStorage.getItem(cnt+1);
        }   
    }
}

function displayHighScores(){
    console.log(localStorage.getItem("blah blah") == null);
    if(!highScore){
        highScore = true;
        for(i = 1; i <= 5; i++){
            if(localStorage.getItem(i) == null){ 
                break;
            }
            document.getElementById("startContent").innerHTML += ("<br>" + "<p class='highScore'>" + i + " :" + localStorage.getItem(i) + "</p>");
        }
    }
}






