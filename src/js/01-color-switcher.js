function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRandomSize() {
  return Math.random() * (10 - 1) + 1;
}

function createBoxes() {
  divBox.innerHTML = '';
  let stringDiv = '';
  for (let i = 0; i < getRandomSize() * 25; i += 1) {
    stringDiv += `<div style="width: ${getRandomSize() * 10}px; height: ${
      getRandomSize() * 10
    }px; border-radius: 50%; margin-left: ${
      getRandomSize() * 10
    }px; margin-top: ${
      getRandomSize() * 5
    }px; display: inline-block; background-color: ${getRandomHexColor()};"></div>`;
  }
  divBox.insertAdjacentHTML('afterbegin', stringDiv);
}

const bodyEl = document.querySelector('body');
const startEl = document.querySelector('[data-start]');
startEl.style.cssText = `cursor: pointer;`;
const stopEl = document.querySelector('[data-stop]');
stopEl.style.cssText = `cursor: pointer;`;
const divBox = document.createElement('div');
stopEl.after(divBox);
let interval;
let intervalBox;

startEl.addEventListener('click', () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
  interval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  intervalBox = setInterval(() => {
    createBoxes();
  }, 100);
  startEl.setAttribute('disabled', '');
  stopEl.removeAttribute('disabled');
});

stopEl.addEventListener('click', () => {
  clearInterval(interval);
  clearInterval(intervalBox);
  stopEl.setAttribute('disabled', '');
  startEl.removeAttribute('disabled');
});
