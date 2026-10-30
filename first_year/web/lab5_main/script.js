
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

const message = document.getElementById("message");

let timer;

function turnOff() {
    red.classList.remove("active");
    yellow.classList.remove("active");
    green.classList.remove("active");
}

function turnOn(color) {
    turnOff();

    color.classList.add("active");

    if (color === red) {
        message.textContent = "Стій!";
    }

    if (color === yellow) {
        message.textContent = "Увага!";
    }

    if (color === green) {
        message.textContent = "Можна йти!";
    }
}

document.getElementById("redButton").addEventListener("click", function() {
    clearInterval(timer);
    turnOn(red);
});

document.getElementById("yellowButton").addEventListener("click", function() {
    clearInterval(timer);
    turnOn(yellow);
});

document.getElementById("greenButton").addEventListener("click", function() {
    clearInterval(timer);
    turnOn(green);
});

document.getElementById("autoButton").addEventListener("click", function() {
    clearInterval(timer);

    let step = 0;

    const colors = [red, yellow, green];

    timer = setInterval(function() {
        turnOn(colors[step]);

        step++;

        if (step === 3) {
            step = 0;
        }
    }, 2000);
});

document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(timer);
    turnOff();
    message.textContent = "Світлофор вимкнений";
});
