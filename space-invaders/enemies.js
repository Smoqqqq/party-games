const canvas = document.getElementById("canvas");
c = canvas.getContext("2d");

canvas.style.width = 700 + "px";
canvas.style.height = 700 + "px";

canvas.width = 700;
canvas.height = 700;

const ENEMY_MAX_Y = canvas.height - 150;

const enemyConfig = [24, 50, 33, ["blue", "green", "purple"], 6];

let enemies = determineEnemies(...enemyConfig);

let invert = false;
let ySpeed = 0.05;

let enemyShotWidth = 2;
let enemyShotHeight = 20;
let enemyShotColors = "#04FF00";
let enemyShotSpeed = 3;
let enemyShotRatio = 100;

let enemyShootingImages = {
    "green": [
        document.getElementById("alien-shooting-green-1"),
        document.getElementById("alien-shooting-2"),
        document.getElementById("alien-shooting-3")
    ],
    "blue": [
        document.getElementById("alien-shooting-blue-1"),
        document.getElementById("alien-shooting-2"),
        document.getElementById("alien-shooting-3")
    ],
    "purple": [
        document.getElementById("alien-shooting-purple-1"),
        document.getElementById("alien-shooting-2"),
        document.getElementById("alien-shooting-3")
    ]
}

let enemyImage = false;

function determineEnemies(count, width, height = false, colors, enemyByLigne) {
    let enemies = [];
    if (!height) height = width;

    for (let i = 1; i < count + 1; i++) {
        let color = colors[Math.floor(Math.random() * colors.length)];

        let x = (i % enemyByLigne) * width * 2 + width * 2;
        let y = Math.ceil(i / enemyByLigne) * height * 1.5;
        let shotColor;

        switch (color) {
            case "blue":
                shotColor = "#01faff";
                break;
            case "purple":
                shotColor = "#b200ff";
                break;
            case "green":
                shotColor = "#05ff00";
                break;
        }

        enemies.push({
            x: x,
            y: y,
            color: color,
            shotColor: shotColor,
            width: width,
            height: height,
            shooting: false,
            shootPhase: 0,
            even: (i % 2 == 0) ? true : false
        })
    }

    return enemies;
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        let rand = Math.round(Math.random() * enemyConfig[0] * enemyShotRatio);
        if (rand == i && !enemy.shooting) {
            enemy.shooting = true;
            setTimeout(() => {
                enemy.shootPhase = 1;
            }, 200);
            setTimeout(() => {
                enemy.shootPhase = 2;
            }, 600);
            setTimeout(() => {
                fireEnemyShot(enemy);
                enemy.shootPhase = 0;
                enemy.shooting = false;
            }, 1000)
        }

        let image;

        if (enemy.even) image = (enemyImage) ? document.getElementById("alien-" + enemy.color + "-hands-down") : document.getElementById("alien-" + enemy.color + "-hands-up");
        else image = (enemyImage) ? document.getElementById("alien-" + enemy.color + "-hands-up") : document.getElementById("alien-" + enemy.color + "-hands-down");

        if (enemy.shooting) {
            image = enemyShootingImages[enemy.color][enemy.shootPhase];
        }

        c.drawImage(image, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

let enemyMovementInterval = setInterval(() => {
    enemyImage = !enemyImage;
}, 1000);

let enemyShots = [];

function fireEnemyShot(enemy) {
    let xSpeed = (invert) ? -1 : 1;
    let shot = {
        x: enemy.x + ((1000 / 25) * xSpeed) * xSpeed - enemy.height / 2,
        y: enemy.y + enemy.height,
        color: enemy.shotColor
    }

    enemyShots.push(shot);
}