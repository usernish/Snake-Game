//variable declaration
var cvs = document.getElementById("canvas").getContext("2d");
var sPosx = 180;
var sPosy = 180;
var nPosx = 0;
var nPosy = 0;
var fPosx = 140;
var fPosy = 140;
var snakeTail = [];
var snakeSize = 1;
var score = 0;
var highestScore = 0;
var gamestatus = "ready";
var gameInterval;

//onload function
window.onload = function() {
    document.addEventListener("keydown", inputcontrol);
    gameInterval = setInterval(mainGame, 200);
}

// main game function
function mainGame() {
    document.getElementById("game-status").innerHTML = gamestatus;
    document.getElementById("score").innerHTML = score;
    document.getElementById("highest-score").innerHTML = highestScore;

    //move snake
    sPosx += nPosx;
    sPosy += nPosy;

    //control snake movement
    if (sPosx > 400) {
        sPosx = 0;
    }
    if (sPosy > 400) {
        sPosy = 0;
    }
    if (sPosx < 0) {
        sPosx = 400;
    }
    if (sPosy < 0) {
        sPosy = 400;
    }

    //background color
    cvs.fillStyle = "black";
    cvs.fillRect(0, 0, 400, 400);

    //gridline
    for (var cl = 0; cl < 400; cl += 20) {
        cvs.moveTo(cl, 0);
        cvs.lineTo(cl, 400);
    }
    for (var rl = 0; rl < 400; rl += 20) {
        cvs.moveTo(0, rl);
        cvs.lineTo(400, rl);
    }
    cvs.strokeStyle = "white";
    cvs.stroke();

    // Draw snake
    for (var i = 0; i < snakeTail.length; i++) {
        if (i === snakeTail.length - 1) {
            // Draw the snake head
            cvs.fillStyle = "yellow";
            cvs.beginPath();
            cvs.arc(snakeTail[i].x + 10, snakeTail[i].y + 10, 10, 0, 2 * Math.PI);
            cvs.fill();
        } else {
            // Draw the snake body
            cvs.fillStyle = "yellow";
            cvs.fillRect(snakeTail[i].x, snakeTail[i].y, 20, 20);
        }
        //if snake hits tail
        if (sPosx == snakeTail[i].x && sPosy == snakeTail[i].y && snakeSize > 1) {
            clearInterval(gameInterval);
            gamestatus = "Game Over";
            if (score > highestScore) {
                highestScore = score;
            }
            document.getElementById("game-status").innerHTML = gamestatus;
            return;
        }
    }

    //fruit
    cvs.fillStyle = "red";
    cvs.fillRect(fPosx, fPosy, 20, 20);

    //if snake eats fruit
    if (sPosx == fPosx && sPosy == fPosy) {
        snakeSize++;
        score += 10;
        fPosx = Math.floor(Math.random() * 20) * 20;
        fPosy = Math.floor(Math.random() * 20) * 20;
    }

    snakeTail.push({ x: sPosx, y: sPosy });
    while (snakeTail.length > snakeSize) {
        snakeTail.shift();
    }
}

//input control
function inputcontrol(e) {
    switch (e.keyCode) {
        case 38:
            if (nPosy === 0) {
                nPosy = -20;
                nPosx = 0;
            }
            //up
            break;
        case 40:
            if (nPosy === 0) {
                nPosy = 20;
                nPosx = 0;
            }
            //down
            break;
        case 39:
            if (nPosx === 0) {
                nPosx = 20;
                nPosy = 0;
            }
            //right
            break;
        case 37:
            if (nPosx === 0) {
                nPosx = -20;
                nPosy = 0;
            }
            //left
            break;
    }

    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
        gamestatus = "game started";
        document.getElementById("game-status").innerHTML = gamestatus;
    }
}

// Restart game function
function restartGame() {
    clearInterval(gameInterval);
    sPosx = 180;
    sPosy = 180;
    nPosx = 0;
    nPosy = 0;
    fPosx = 140;
    fPosy = 140;
    snakeTail = [];
    snakeSize = 1;
    score = 0;
    gamestatus = "ready";
    document.getElementById("game-status").innerHTML = gamestatus;
    gameInterval = setInterval(mainGame, 200);
}
