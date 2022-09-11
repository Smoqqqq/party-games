const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

let gameStarted = true;

let terrain = {
    image: document.getElementById("terrain"),
    x: 0,
    y: 0,
    height: innerHeight,
    width: (innerHeight / 700) * 10000
}

function endGame() {
    gameStarted = false;
    canvas.classList.add("game-end");
    canvas.style.transform = `translateY(${Math.abs(flappy.y - innerHeight) - innerHeight / 2}px) scale(2)`;
    clearInterval(gameTick);
    gameTick = setGameTick(750);
    setTimeout(() => {
        if (!gameStarted) {
            clearInterval(gameTick);
        }
    }, 5000);
    document.getElementById("end-game").style.display = "block";
}

function restartGame() {
    canvas.classList.remove("game-end");
    canvas.style.transform = "";
    initWalls();
    clearInterval(gameTick);
    document.getElementById("end-game").style.display = "none"
    gameTick = setGameTick(15);
    flappy.y = y;
    gameStarted = true;
}

initWalls();

function setGameTick(tick) {
    let gameTick = setInterval(() => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        addFlappyGravity();
        drawTerrain();
        animateWalls();
        drawWalls();
        drawFlappy();
    }, tick)
    return gameTick;
}

let gameTick = setGameTick(15);

function drawTerrain() {
    c.drawImage(terrain.image, terrain.x, terrain.y, terrain.width, terrain.height);
    terrain.x -= 1;
}