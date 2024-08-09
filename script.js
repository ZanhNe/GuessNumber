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

const maxScore = 20;
const maxNumber = 20; //Set giá trị cuối cho khoảng
const minNumber = 1; //Set giá trị đầu cho khoảng, thay vì hardcode
const defaultMessage = `Start guessing...`;
const defaultHidden = `?`;
const defaultNumber = ``;
const winnerColor = `#60b347`;
const winnerHiddenTagWidth = `30rem`;
let randomNumber = generateRandomNumber();
let score = maxScore;

function generateRandomNumber() {
  return Math.floor(Math.random() * 19 + 1);
}
const checkNumber = () => {
  const number = Number(guessTag.value);
  const secretNumber = randomNumber;
  const highscore = Number(highscoreTag.textContent);

  if (number < 1 || number > 20)
    messageTag.textContent = `Wrong number, fill again`;
  else {
    if (number === secretNumber) {
      messageTag.textContent = `🎉🎉 Correct Number. You're so amazing 😎`;
      hiddenTag.textContent = String(secretNumber);
      if (score > highscore) {
        highscoreTag.textContent = String(score);
      }
      body.style.backgroundColor = winnerColor;
      hiddenTag.style.width = winnerHiddenTagWidth;
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
  scoreTag.textContent = String(maxScore);
  hiddenTag.textContent = defaultHidden;
  randomNumber = generateRandomNumber();
  score = Number(scoreTag.textContent);
  body.style.removeProperty(`background-color`); //css property được đặt trong chuỗi thì format như bth : background-color
  hiddenTag.style.removeProperty(`width`);
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
