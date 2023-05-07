import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  dayVal: document.querySelector('[data-days]'),
  hourVal: document.querySelector('[data-hours]'),
  minVal: document.querySelector('[data-minutes]'),
  secVal: document.querySelector('[data-seconds]'),
  dateInput: document.querySelector('#datetime-picker'),
};

refs.btnStart.disabled = true;

// set timer interval id variable
let timerIntervalId = null;

// add listener to start button
refs.btnStart.addEventListener('click', onStartBtnClick);

// notifying when start and sets interval
function onStartBtnClick() {
  refs.btnStart.disabled = true;
  refs.dateInput.disabled = true;
  Notify.success("It's showtime");
  timerIntervalId = setInterval(timerRender, 1000);
}

// create flatpickr
const flatpickrDate = flatpickr(refs.dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future!');
    }
    refs.btnStart.disabled = false;
  },
});

// rendering html content
function timerRender() {
  const remainingTime = flatpickrDate.selectedDates[0] - Date.now();

  if (remainingTime < 1000) {
    refs.btnStart.disabled = false;
    refs.dateInput.disabled = false;
    Notify.success('Boom!!!');
    clearInterval(timerIntervalId);
  }

  const convertedTime = convertMs(remainingTime);

  refs.dayVal.textContent = addLeadingZero(convertedTime.days);
  refs.hourVal.textContent = addLeadingZero(convertedTime.hours);
  refs.minVal.textContent = addLeadingZero(convertedTime.minutes);
  refs.secVal.textContent = addLeadingZero(convertedTime.seconds);
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
