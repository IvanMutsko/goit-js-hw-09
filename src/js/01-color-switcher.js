const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const CHANGE_COLOR_INTERVAL = 1000;
let timerId = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_INTERVAL);

  toggleButtonsState(true);
}

function onStopClick() {
  clearInterval(timerId);

  toggleButtonsState(false);
}

function toggleButtonsState(started) {
  refs.startBtn.disabled = started;
  refs.stopBtn.disabled = !started;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
