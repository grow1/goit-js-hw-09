import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delayCounter = Number(refs.delayInput.value);

  for (let i = 1; i <= Number(refs.amountInput.value); i += 1) {
    createPromise(i, delayCounter)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayCounter += Number(refs.stepInput.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
