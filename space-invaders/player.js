let width = 30;
let height = 20;

let shots = [];

let player = {
    x: canvas.width / 2 - width / 2,
    y: canvas.height - 40 - width,
    color: "black",
    width: width,
    height: height,
    xSpeed: 0,
    health: 100,
    shootingPhase: 0
};

let shotInterval;

let shotSpeed = 10;
let shotHeight = 10;
let shotColors = "black";
let shotWidth = 2;

let playerImg = document.getElementById("player-img");

let playerShootingPhases = [
    document.getElementById("player-shooting-1"),
    document.getElementById("player-shooting-2"),
    document.getElementById("player-shooting-3")
]

function drawPlayer() {
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
        player.xSpeed = 0;
    } else if (player.x < 0) {
        player.x = 0;
        player.xSpeed = 0;
    } else {
        player.x += player.xSpeed;
    }
    c.fillStyle = player.color;

    let image = playerImg;

    switch (player.shootingPhase) {
        case 1:
            image = playerShootingPhases[0];
            break;
        case 2:
            image = playerShootingPhases[1];
            break;
        case 3:
            image = playerShootingPhases[2];
            break;
    }

    c.drawImage(image, player.x, player.y, player.width, player.height);
}

let timeToWait = false;

addEventListener("keydown", (e) => {
    if (e.key == " ") {
        if (!shotInterval) {
            shotInterval = setInterval(() => {
                if (!timeToWait) {
                    shots.push({
                        x: player.x + player.width / 2 - shotWidth / 2,
                        y: player.y
                    })
                    timeToWait = true;
                    if (score - 2 > 0) score -= 2;
                    scoreElem.innerHTML = "Score: " + score;
                    player.shootingPhase = 1;
                    setTimeout(() => {
                        player.shootingPhase = 2
                    }, 75)
                    setTimeout(() => {
                        player.shootingPhase = 3
                    }, 150)
                    setTimeout(() => {
                        timeToWait = false;
                        player.shootingPhase = 0
                    }, 200)
                }
            })
        }
    }
    if (e.key == "q") {
        player.xSpeed = -3;
    } else if (e.key == "d") {
        player.xSpeed = 3;
    }
})

addEventListener("keyup", (e) => {
    if (e.key == "q" || e.key == "d") {
        player.xSpeed = 0;
    } else if (e.key == " ") {
        clearInterval(shotInterval);
        shotInterval = false;
    }
})

function handleShots() {
    for (let i = 0; i < shots.length; i++) {
        let ctn = false;
        for (let j = 0; j < enemies.length; j++) {
            if (shots[i] && shots[i].x >= enemies[j].x && shots[i].x <= enemies[j].x + enemies[j].width) {
                if (shots[i].y >= enemies[j].y && shots[i].y <= enemies[j].y + enemies[j].height) {
                    enemies.splice(j, 1);
                    shots.splice(i, 1);
                    score += 10;
                    scoreElem.innerHTML = "Score: " + score
                    ctn = true;
                    break;
                } else if (shots[i].y < 0) {
                    shots.splice(i, 1);
                    ctn = true;
                    break;
                }
            }
        }
        if (ctn) continue;
        for (let j = 0; j < walls.length; j++) {
            if (shots[i] && shots[i].x >= walls[j].x && shots[i].x <= walls[j].x + walls[j].width) {
                if (shots[i].y <= walls[j].y + walls[j].height) {
                    walls[j].height -= 1;
                    if (walls[j].height <= 0) walls.splice(j, 1);
                    shots.splice(i, 1);
                    ctn = true;
                    break;
                }
            }
        }
        if (ctn) continue;
        c.fillStyle = shotColors;
        c.fillRect(shots[i].x, shots[i].y, shotWidth, shotHeight);
        shots[i].y -= shotSpeed;
    }

    for (let i = 0; i < enemyShots.length; i++) {
        let ctn = false;
        if (enemyShots[i].x >= player.x && enemyShots[i].x <= player.x + player.width) {
            if (enemyShots[i].y + enemyShotHeight >= player.y && enemyShots[i].y - enemyShotHeight <= player.y + player.width) {
                player.health -= 20;
                enemyShots.splice(i, 1);
                if (player.health <= 0) {
                    endGame();
                }
                ctn = true;
                break;
            }
        }
        for (let j = 0; j < walls.length; j++) {
            if (enemyShots[i].x >= walls[j].x && enemyShots[i].x <= walls[j].x + walls[j].width) {
                if (enemyShots[i].y > walls[j].y - enemyShotHeight) {
                    walls[j].height -= 1;
                    if (walls[j].height <= 0) {
                        walls.splice(j, 1);
                    }
                    enemyShots.splice(i, 1);
                    ctn = true;
                    break;
                }
            }
        }
        if (ctn) continue;
        enemyShots[i].y += enemyShotSpeed;
        c.fillStyle = enemyShots[i].color;
        c.fillRect(enemyShots[i].x, enemyShots[i].y, enemyShotWidth, enemyShotHeight);
    }
}

function drawHealthBar() {
    c.fillStyle = "red";
    c.fillRect(0, canvas.height - 5, canvas.width / 100 * player.health, 5);
}