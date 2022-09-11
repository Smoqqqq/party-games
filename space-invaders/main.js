let debug = true;

function frameCycle() {
    let xSpeed = (invert) ? -1 : 1;

    if (enemies.length == 0) {
        nextLevel();
    }

    for(let i = 0; i < enemies.length; i++){
        let enemy = enemies[i];
        if (enemy.y > ENEMY_MAX_Y) {
            endGame();
            break;
        }

        if (enemy.x + enemy.width >= canvas.width) {
            invert = true;
        } else if (enemy.x <= 0) {
            invert = false;
        }
        enemy.x += xSpeed;
    }

    drawEnemies();
    drawPlayer();
    if(debug){
        document.getElementById("debug").innerHTML = `
            Alien goes down every ${enemyDelay / 1000}sec<br>
            ${enemies.length} aliens (started round with ${enemyConfig[0]} aliens)<br>
            Aliens shoot ratio: ${enemyShotRatio}
        `;
    }
}

function nextLevel() {
    shots = [];
    if(diff % 3 == 0 && enemyConfig[0] + 6 < 60) enemyConfig[0] += 6;
    enemies = determineEnemies(...enemyConfig);
    clearInterval(framesInterval);
    clearInterval(enemyInterval);
    enemyShotRatio = (enemyShotRatio > 5) ? enemyShotRatio - 5 : 5;
    enemyDelay *= 0.9;
    addIntervals();
    diff++;
    diffElem.innerHTML = "Niveau: " + diff;
}

let endGame;
let enemyDelay = 10000;
let enemyInterval, framesInterval;
let diff = 0;
let diffElem = document.getElementById("diff-elem");
let score = 0;
let scoreElem = document.getElementById("score-elem");

requestAnimationFrame(() => {
    addIntervals();
    createWalls();
})

endGame = () => {
    createWalls();
    clearInterval(enemyInterval);
    clearInterval(framesInterval);
    enemyInterval = null;
    framesInterval = null;
    enemyConfig[0] = 20;
    enemies = determineEnemies(...enemyConfig);
    enemyDelay = 10000;
    player.health = 100;
    if (confirm("restart game ?")) {
        addIntervals();
        score = 0;
        diff = 0;
    }
}

function addIntervals() {
    framesInterval = setInterval(() => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        handleShots();
        frameCycle();
        drawWalls();
        drawHealthBar();
    }, 25)

    enemyInterval = setInterval(() => {
        enemies.map(enemy => {
            enemy.y += enemy.height;
        })
    }, enemyDelay)
}

