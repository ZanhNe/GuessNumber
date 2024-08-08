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
const body = $('body');

const defaultScore = 20;
const defaultMessage = `Start guessing...`;
const defaultHidden = `?`;
const defaultNumber = ``;
const defaultColor = `#222`;
let score = defaultScore;

const checkNumber = () => {
  const number = Number(guessTag.value);
  const secretNumber = Number(hiddenTag.value);
  const highscore = Number(highscoreTag.textContent);

  if (number < 1 || number > 20)
    messageTag.textContent = `Wrong number, fill again`;
  else {
    if (number === secretNumber) {
      messageTag.textContent = `🎉🎉 Correct!!!`;
      hiddenTag.textContent = String(secretNumber);
      if (score > highscore) {
        highscoreTag.textContent = String(score);
      }
      body.style.backgroundColor = 'green';
    } else {
      if (score !== 0) {
        if (number > secretNumber) messageTag.textContent = `Too high...👆`;
        else messageTag.textContent = `Too low...👇`;
        scoreTag.textContent = String(--score);
        if (score === 0) messageTag.textContent = `YOU LOSE 🥲`;
      } else {
        messageTag.textContent = `Please try again... 😭`;
      }
    }
  }
};

const reset = () => {
  guessTag.value = defaultNumber;
  messageTag.textContent = defaultMessage;
  scoreTag.textContent = String(defaultScore);
  hiddenTag.textContent = defaultHidden;
  hiddenTag.value = Math.floor(Math.random() * 19 + 1);
  body.style.backgroundColor = defaultColor;
  score = Number(messageTag.value);
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
