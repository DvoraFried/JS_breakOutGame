var canvas = document.getElementById("myCanvas");
var massage = document.getElementById("massage");
var ctx = canvas.getContext("2d");
var ballRadius = 12;
var x = canvas.width / 2;
var y = canvas.height - 15; // above footer
var dx = 3; // defult speed
var dy = -3; // defult speed
var paddleHeight = 15;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var showProp = 1;
var my_user = JSON.parse(localStorage.getItem('my_user'));
var colors = ["rgb(237,28,36)", "rgb(255,221,0)", "rgb(145,39,143)", "rgb(140,198,63)", "rgb(0,91,171)"];
var bricks = [];

for (var col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (var row = 0; row < brickRowCount; row++) {
        bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


var userName = document.getElementById("user");
userName.innerText = "Welcome " + my_user.name + " !";


//=============================================================
//                    **Display options**
//=============================================================
function properties() {
    showProp++;
    const proper = document.getElementById("prop");
    if (!(showProp % 2)) {
        proper.style.display = "block";
    }
    else {
        proper.style.display = "none";
    }
}
//=============================================================

//=============================================================
function speed(choise) {
    switch (choise) {
        case 'slow':
            dx = dx > 0 ? 2 : -2;
            dy = dy > 0 ? 2 : -2;
            break;
        case 'normal':
            dx = dx > 0 ? 3 : -3;
            dy = dy > 0 ? 3 : -3;
            break;
        case 'fast':
            dx = dx > 0 ? 4 : -4;
            dy = dy > 0 ? 4 : -4;
            break;
    }
}
//=============================================================

//=============================================================
function color(choise) {
    if (choise == "defulte") {
        colors = ["rgb(237,28,36)", "rgb(255,221,0)", "rgb(145,39,143)", "rgb(140,198,63)", "rgb(0,91,171)"];
    }
    else {
        for (let i = 0; i < colors.length; i++) {
            colors[i] = choise;
        }
    }
}
//=============================================================
//                   **Moving Elements**
//=============================================================
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
//=============================================================
// 
//=============================================================
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
//=============================================================
//                      **game control**
//=============================================================
function startPlay() {
    textNone();
    draw();
}
//=============================================================
//
//=============================================================
function textNone() {
    massage.style.display = 'none';
}
//=============================================================

//=============================================================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    dirBall();
}
//=============================================================

//=============================================================
function drawBricks() {
    for (var col = 0; col < brickColumnCount; col++) {
        for (var row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status == 1) {
                var brickX = (row * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (col * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colors[col];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//=============================================================

//=============================================================
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.closePath();
}
//=============================================================

//=============================================================
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgb(145,39,143)";
    ctx.fill();
    ctx.closePath();
}
//=============================================================

//=============================================================
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Score: " + score, 8, 20);
}
//=============================================================

//=============================================================
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
//=============================================================
//                  **ball crashes control**
//=============================================================
function dirBall() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx; // reverse direction
    }
    if (y + dy < ballRadius) {
        dy = -dy; // reverse direction
    }
    else {
        isCrash();
    }
    paddleControl();
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
//=============================================================

//=============================================================
function isCrash() {
    if (y + dy > canvas.height - ballRadius) {
        crashFooter();
    }
    else {
        crashBrick();
    }
}
//=============================================================

//=============================================================
function crashFooter() {
    if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy; // reverse direction
    }
    else {
        updateLive();
    }
}
//=============================================================

//=============================================================
function crashBrick() {
    for (var col = 0; col < brickColumnCount; col++) {
        for (var row = 0; row < brickRowCount; row++) {
            var currentBrick = bricks[col][row];
            if (x > currentBrick.x && x < currentBrick.x + brickWidth &&
                y > currentBrick.y && y < currentBrick.y + brickHeight &&
                currentBrick.status) {
                dy = -dy;
                currentBrick.status = 0;
                updateScore();
            }
        }
    }
}
//=============================================================

//=============================================================
function paddleControl() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }

    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}
//=============================================================

//=============================================================
function updateScore() {
    score++;
    if (score == brickRowCount * brickColumnCount) {
        getText("win");
        setTimeout(() => document.location.reload(), 2000);
    }
}
//=============================================================

//=============================================================
function updateLive() {
    lives--;
    if (!lives) {
        getText("gameOver");
        setTimeout(() => document.location.reload(), 2000);
    }

    else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;
    }
}
//=============================================================

//=============================================================
function getText(text)
{
    let getText = document.getElementById(text);
    getText.style.display = 'block';
    canvas.style.display = 'none';
}
//=============================================================