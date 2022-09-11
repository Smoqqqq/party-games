let birds = [
    [document.getElementById("bird"), 210, 172],
    [document.getElementById("bird-fancy"), 207, 217],
    [document.getElementById("bird-fancy-stoned"), 207, 217],
    [document.getElementById("bird-pilot"), 210, 172],
    [document.getElementById("bird-ninja"), 210, 172],
    [document.getElementById("bird-basic-ninja"), 210, 172],
    [document.getElementById("bird-ninja-tm"), 210, 172],
    [document.getElementById("bird-trump-red"), 210, 250],
    [document.getElementById("bird-trump-blue"), 210, 250],
]

for(let i = 0; i < birds.length; i++){
    birds[i][0].addEventListener("click", () => {
        flappy.img = birds[i][0];
        flappy.height = birds[i][0].getBoundingClientRect().height / 2;
        flappy.width = birds[i][0].getBoundingClientRect().width / 2;
        document.getElementsByClassName("selected")[0].classList.remove("selected");
        birds[i][0].parentNode.classList.add("selected");
        restartGame()
    })
}