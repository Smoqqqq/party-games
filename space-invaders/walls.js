let walls = [];
let wallColor = "black";

function createWalls(){
    let count = enemyConfig[4];
    let width = enemyConfig[1];

    walls = [];

    for(let i = 0; i < count; i++){        
        let x = (i % count) * width * 2 + width * 1.5;
        let y = player.y - width / 2;
        let wall = {
            x: x,
            y: y,
            width: width,
            height: width / 5
        }
        walls.push(wall);
    }
}

function drawWalls(){
    walls.forEach(wall => {
        c.fillStyle = wallColor;
        c.fillRect(wall.x, wall.y, wall.width, wall.height);
    })
}