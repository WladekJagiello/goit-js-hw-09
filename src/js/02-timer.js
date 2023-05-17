import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const inputEl = document.querySelector('input');
inputEl.style.cssText = `border-width: 2px; border-radius: 2px`;
const titleEl = document.createElement('h1');
inputEl.before(titleEl);
titleEl.textContent = 'SET TIMER';
const startEl = document.querySelector('[data-start]');
startEl.style.cssText = `border-width: 2px; border-radius: 2px; background-color: #00FF00`;
startEl.setAttribute('disabled', '');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedDate;
let timerStyle;
let timerColor;
let resetEl;
let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    startEl.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
    titleEl.textContent = '¯|_(ツ)_/¯';
  },
};

startEl.addEventListener('click', () => {
  Notiflix.Notify.success('Timer started');
  inputEl.setAttribute('disabled', '');
  startEl.setAttribute('disabled', '');

  if (resetEl) {
    resetEl.remove();
  }

  const stopEl = document.createElement('button');
  stopEl.style.cssText = `margin-left: 4px; border-width: 2px; border-radius: 2px; background-color: #FFD700`;
  stopEl.textContent = 'Stop';
  startEl.after(stopEl);

  timer = setInterval(() => {
    const difference = selectedDate - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(difference);

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, 0);
    minutesEl.textContent = String(minutes).padStart(2, 0);
    secondsEl.textContent = String(seconds).padStart(2, 0);

    if (difference === 0) {
      Notiflix.Notify.success('Happy birthday!!!');
      clearInterval(timer);
      clearInterval(timerStyle);
      clearInterval(timerColor);
      timerEl.style.cssText = ``;
      inputEl.removeAttribute('disabled');
      titleEl.textContent = 'SET TIMER';
      stopEl.remove();
    }
  }, 1000);

  timerStyle = setInterval(() => {
    const titleContent = [
      '(* ^ ω ^)',
      'U^ｪ^U',
      '(o･ω･o)',
      '(´• ω •`)',
      '(▽◕ ᴥ ◕▽)',
      '٩(｡•́‿•̀｡)۶',
      'V●ᴥ●V',
      '(◕‿◕)',
      '(´･ᴗ･ `)',
      'ʕ ᵔᴥᵔ ʔ',
    ];
    titleEl.textContent = `${titleContent[Math.floor(Math.random() * 10)]}`;
    const flexDirection = ['row', 'row-reverse', 'column', 'column-reverse'];
    timerEl.style.cssText = `width: 273px; padding: 5px; margin-top: 4px; border-radius: 2px; background-color: ${getRandomHexColor()}; display: flex; flex-wrap: wrap; justify-content: space-between; flex-direction: ${
      flexDirection[Math.floor(Math.random() * 4)]
    }`;
  }, 1500);

  timerColor = setInterval(() => {
    timerEl.style.color = `${getRandomHexColor()}`;
  }, 250);

  stopEl.addEventListener('click', () => {
    Notiflix.Notify.warning('You don`t want to continue?');
    clearInterval(timer);
    clearInterval(timerStyle);
    clearInterval(timerColor);
    timerEl.style.cssText = ``;
    titleEl.textContent = '¯|_(ツ)_/¯';
    startEl.removeAttribute('disabled');
    stopEl.remove();
    resetEl = document.createElement('button');
    resetEl.style.cssText = `margin-left: 4px; border-width: 2px; border-radius: 2px; background-color: #F08080`;
    resetEl.textContent = 'Reset';
    startEl.after(resetEl);

    resetEl.addEventListener('click', () => {
      startEl.setAttribute('disabled', '');
      inputEl.removeAttribute('disabled');
      resetEl.remove();
      titleEl.textContent = 'SET TIMER';
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    });
  });
});

flatpickr('#datetime-picker', { ...options });
