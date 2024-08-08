'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const scoreTag = $('.score');
const highscoreTag = $('.highscore');
const messageTag = $('.message');
const hiddenTag = $('.number');
const againButton = $('.again');
const guessTag = $('.guess');
const checkButton = $('.check');

const defaultScore = 20;
const defaultMessage = `Start guessing...`;
const defaultHidden = `?`;
const defaultNumber = ``;

const checkNumber = () => {
  const number = Number(guessTag.value);
  const secretNumber = Number(hiddenTag.value);
  const highscore = Number(highscoreTag.textContent);
  let currentScore = Number(scoreTag.textContent);

  if (number < 1 || number > 20)
    messageTag.textContent = `Wrong number, fill again`;
  else {
    if (number === secretNumber) {
      messageTag.textContent = `Correct`;
      hiddenTag.textContent = String(secretNumber);
      if (currentScore > highscore) {
        highscoreTag.textContent = String(currentScore);
      }
    } else {
      if (number > secretNumber) messageTag.textContent = `Too high...`;
      else messageTag.textContent = `Too low...`;
      scoreTag.textContent = String(--currentScore);
    }
  }
};

const reset = () => {
  guessTag.value = defaultNumber;
  messageTag.textContent = defaultMessage;
  scoreTag.textContent = String(defaultScore);
  hiddenTag.textContent = defaultHidden;
  hiddenTag.value = Math.floor(Math.random() * 19 + 1);
};

function playAgain() {
  againButton.addEventListener('click', reset);
}

function check() {
  checkButton.addEventListener('click', checkNumber);
}

function loadGame() {
  window.onload = function () {
    hiddenTag.value = Math.floor(Math.random() * 19 + 1);
  };
}

function start() {
  loadGame();
  check();
  playAgain();
}

start();
