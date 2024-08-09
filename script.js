'use strict';
//Define custom syntax
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Get ra các element từ DOM để sau sử dụng, thay vì mỗi chỗ phải gọi lại document...
const scoreTag = $('.score');
const highscoreTag = $('.highscore');
const messageTag = $('.message');
const hiddenTag = $('.number');
const againButton = $('.again');
const guessTag = $('.guess');
const checkButton = $('.check');
const body = $('body');

//Set attribute để tái sử dụng
const maxNumber = 20; //Set giá trị cuối cho khoảng
const minNumber = 1; //Set giá trị đầu cho khoảng, thay vì hardcode
const maxScore = maxNumber;
const defaultMessage = `Start guessing...`;
const defaultHidden = `?`;
const defaultNumber = ``;
const winnerColor = `#60b347`;
const winnerHiddenTagWidth = `30rem`;
let randomNumber = generateRandomNumber();
let score = maxScore;
let highscore = 0;

//define ra function trong quá trình build logic (tái sử dụng, tránh lặp code)
function generateRandomNumber() {
  return Math.floor(Math.random() * 19 + 1);
}

const checkNumber = () => {
  const number = Number(guessTag.value);

  if (number < minNumber || number > maxNumber)
    messageTag.textContent = `Wrong number, try again 😒`;
  else {
    if (number === randomNumber) {
      messageTag.textContent = `🎉🎉 Correct Number. You're so amazing 😎`;
      hiddenTag.textContent = String(randomNumber);
      if (score > highscore) {
        highscore = score;
        highscoreTag.textContent = String(highscore);
      }
      body.style.backgroundColor = winnerColor;
      hiddenTag.style.width = winnerHiddenTagWidth;
    } else {
      if (score !== 0) {
        if (number > randomNumber) messageTag.textContent = `Too high...👆`;
        else messageTag.textContent = `Too low...👇`;
        scoreTag.textContent = String(--score);
        if (score === 0) messageTag.textContent = `YOU LOOSE 🥲`;
      } else {
        messageTag.textContent = `Please play again... 😭`;
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
