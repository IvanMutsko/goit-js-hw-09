import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerWrap: document.querySelector('.timer'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeDifference = 0;
refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateTimePicker, options);

function startTimer() {
  refs.startBtn.disabled = true;
  refs.dateTimePicker.disabled = true;

  timerId = setInterval(() => {
    timeDifference = new Date(refs.dateTimePicker.value) - new Date();

    changeTimerValues();

    if (timeDifference < 999) {
      clearInterval(timerId);
      Notiflix.Notify.success("Time is up! LET'S START!!!");
      refs.timerWrap.insertAdjacentHTML(
        'afterbegin',
        `<div class="message">Time is up! LET'S START!!!</div>`
      );
    }
  }, 1000);
}

function changeTimerValues() {
  const { timerDays, timerHours, timerMinutes, timerSeconds } = refs;

  timerDays.textContent = addLeadingZero(convertMs(timeDifference).days);
  timerHours.textContent = addLeadingZero(convertMs(timeDifference).hours);
  timerMinutes.textContent = addLeadingZero(convertMs(timeDifference).minutes);
  timerSeconds.textContent = addLeadingZero(convertMs(timeDifference).seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
