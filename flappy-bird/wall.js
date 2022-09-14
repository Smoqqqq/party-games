let walls = [];
let wallsNb = 6;
let wallHeight = (innerHeight / 2);
let wallSpeed = innerHeight / 250;

function initWalls() {
    walls = [];
    for (let i = 4; i < wallsNb + 4; i++) {
        let randHeight = Math.floor(Math.random() * wallHeight) + innerHeight / 4;
        let wall = {
            top: {
                x: i * (innerWidth / 5),
                y: 0,
                height: randHeight,
                image: document.getElementById("pipe-down")
            },
            bottom: {
                x: i * (innerWidth / 5),
                y: randHeight + innerHeight / 4,
                height: innerHeight - randHeight,
                image: document.getElementById("pipe-up")
            },
            width: 50
        }

        walls.push(wall);
    }
}

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        c.drawImage(wall.top.image, wall.top.x, wall.top.y, wall.width, wall.top.height);
        c.drawImage(wall.bottom.image, wall.bottom.x, wall.bottom.y, wall.width, wall.bottom.height);
    }
}

function animateWalls() {
    for (let i = 0; i < walls.length; i++) {
        walls[i].top.x -= wallSpeed;
        walls[i].bottom.x -= wallSpeed;
    }
    if (walls[walls.length - 1].top.x < innerWidth) {
        let randHeight = Math.floor(Math.random() * wallHeight);
        walls.push({
            top: {
                x: innerWidth + innerWidth / 5,
                y: 0,
                height: randHeight,
                image: document.getElementById("pipe-down")
            },
            bottom: {
                x: innerWidth + innerWidth / 5,
                y: randHeight + innerHeight / 5,
                height: innerHeight - randHeight,
                image: document.getElementById("pipe-up")
            },
            width: 50
        });
    }
    if (walls[0].top.x < - walls[0].width) {
        walls.splice(0, 1);
        score ++;
    }
}