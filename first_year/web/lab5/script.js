const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

let playerX = 180;
let score = 0;
let blocks = [];
let gameInterval;
let blockInterval;
let running = false;

document.addEventListener("keydown", function(event) {
    if (!running) return;

    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (event.key === "ArrowRight" && playerX < 360) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

startButton.addEventListener("click", function() {
    startGame();
});

function startGame() {
    clearInterval(gameInterval);
    clearInterval(blockInterval);

    blocks.forEach(function(block) {
        block.element.remove();
    });

    blocks = [];
    playerX = 180;
    score = 0;
    running = true;

    player.style.left = playerX + "px";
    scoreText.textContent = score;
    message.textContent = "Уникай червоних блоків!";
    startButton.textContent = "Почати заново";

    blockInterval = setInterval(createBlock, 800);
    gameInterval = setInterval(updateGame, 20);
}

function createBlock() {
    const element = document.createElement("div");

    element.classList.add("block");
    element.style.left = Math.floor(Math.random() * 360) + "px";

    game.appendChild(element);

    blocks.push({
        element: element,
        y: 0
    });
}

function updateGame() {
    blocks.forEach(function(block) {
        block.y += 4;
        block.element.style.top = block.y + "px";

        const blockX = parseInt(block.element.style.left);

        if (
            block.y > 420 &&
            block.y < 460 &&
            blockX < playerX + 40 &&
            blockX + 40 > playerX
        ) {
            endGame();
        }
    });

    blocks = blocks.filter(function(block) {
        if (block.y > 500) {
            block.element.remove();
            return false;
        }

        return true;
    });

    score++;
    scoreText.textContent = Math.floor(score / 10);
}

function endGame() {
    running = false;

    clearInterval(gameInterval);
    clearInterval(blockInterval);

    message.textContent = "Гру завершено! Твій рахунок: " + Math.floor(score / 10);
}
