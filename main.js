const lights = document.querySelectorAll('.light');
const yourBest = document.querySelector('.best span');
const yourResult = document.querySelector('.time');

const delay = 1000;
let interval;
let functionActive = false;
let lightsOff = false;
let result = "00.000";
let bestResult = "3600";

const lightsOn = () => {
    const timeofDelay = Math.floor(((Math.random() * 4) + 0.5) * 1000);
    functionActive = !functionActive;
    lights.forEach((light, index) => {
        setTimeout(() => {
            light.classList.add('active');
            if (index === lights.length - 1) {
                setTimeout(() => {
                    lightsOut(lights);
                    lightsOff = !lightsOff;
                    completeResult();
                }, timeofDelay);
            }
        }, index * delay);
    });
}

const lightsOut = (lights) => {
    lights.forEach((light) => {
        light.classList.remove('active');
    });
}

const completeResult = () => {
    const startTime = Date.now();
    interval = setInterval(() => {
        const playerTime = Date.now() - startTime;
        result = (playerTime / 1000).toFixed(3);
    }, 1);
}

const showResult = () => {
    clearInterval(interval);
    lightsOff = !lightsOff;
    functionActive = !functionActive;
    const resultFloat = parseFloat(result);
    const bestFloat = parseFloat(bestResult);
    bestResult = (resultFloat < bestFloat) ? result : bestResult;
    if (result.length < 6) {
        yourResult.textContent = `0${result}`;
        yourBest.textContent = `0${bestResult}`;
    } else {
        yourResult.textContent = result;
        yourBest.textContent = bestResult;
    }
}

window.addEventListener('mousedown', () => {
    if (lightsOff) {
        showResult();
    } else if (!lightsOff && !functionActive) {
        lightsOn();
    }
});