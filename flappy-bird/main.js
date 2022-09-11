const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

function endGame() {
    clearInterval(gameTick);

    flappy.y = y;
    let prompt = document.createElement("div");
    prompt.id = "prompt";
    prompt.innerHTML = `
        <p>You died !</p>
        <div class="btn" onclick="restartGame()">Retry</div>
    `;

    document.body.appendChild(prompt);
}

function restartGame() {
    initWalls();
    document.getElementById("prompt").remove();
    gameTick = setInterval(() => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        addFlappyGravity();
        drawFlappy();
        animateWalls();
        drawWalls();
    }, 15)
}

initWalls();

let gameTick = setInterval(() => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    addFlappyGravity();
    drawFlappy();
    animateWalls();
    drawWalls();
}, 15)