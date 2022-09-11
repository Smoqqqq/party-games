let x = innerWidth / 2;
let y = innerHeight / 2 - 16;

let flappy = {
    x: x,
    y: y,
    width: 48,
    height: 32,
    phase: 0,
    img: document.getElementById("bird")
}

function flappyJump() {
    let targetY = flappy.y - innerHeight / 4;
    if (targetY < 0) return flappy.y = 0;
    for (let i = 0; i < Math.round(flappy.y - targetY); i++) {
        setTimeout(() => {
            if (gameStarted) flappy.y -= 1;
        }, i)
    }
}

function drawFlappy() {
    c.drawImage(flappy.img, flappy.x, flappy.y, flappy.width, flappy.height);

    for (let i = 0; i < walls.length; i++) {
        if (walls[i].top.x <= flappy.x + flappy.width && flappy.x <= walls[i].top.x + walls[i].width) {
            if (flappy.y >= walls[i].top.y && flappy.y <= walls[i].top.y + walls[i].top.height ||
                flappy.y + flappy.height >= walls[i].bottom.y && flappy.y + flappy.height <= walls[i].bottom.y + walls[i].bottom.height) {
                endGame();
            }
        }
    }
}

let inJump = false;
let pressing = false;


addEventListener("keydown", (e) => {
    jumpTrigger(e);
})

document.addEventListener("mousedown", (e) => {
    jumpTrigger(e);
})

function jumpTrigger(e) {
    if (!inJump) {
        if (e.type == "keydown") {
            if (e.code == "Space" && !pressing) {
                pressing = true;
                inJump = true;
                flappyJump();
                setTimeout(() => {
                    inJump = false;
                }, Math.round(flappy.y - (flappy.y - innerHeight / 5)))
            }
        }
        if (e.type == "mousedown") {
            inJump = true;
            flappyJump();
            setTimeout(() => {
                inJump = false;
            }, Math.round(flappy.y - (flappy.y - innerHeight / 5)))
        }
    }
}

addEventListener("keyup", (e) => {
    switch (e.code) {
        case "Space":
            pressing = false;
            break;
    }
})

function addFlappyGravity() {
    if (flappy.y + flappy.height + 7 < innerHeight) flappy.y += 5;
    else {
        endGame();
    }
}