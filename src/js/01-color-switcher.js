const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let intervalId = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick);

function onStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
