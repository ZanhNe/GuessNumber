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
//-------------------------------------------------------------------------------------------------------------------------//
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
let flag = false;
//-------------------------------------------------------------------------------------------------------------------------//
//define ra function trong quá trình build logic (tái sử dụng, tránh lặp code)
function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
//Hiển thị ra view
function display(element, message) {
  element.textContent = message;
}

//-------------------------------------------------------------------------------------------------------------------------//

//Hàm check input number người dùng so với số bí mật
const checkNumber = () => {
  const number = Number(guessTag.value); //Lấy ra số người dùng nhập vào

  if (number < minNumber || number > maxNumber)
    //Nếu số nằm ngoài khoảng đã cho -> ném lỗi
    display(messageTag, `Wrong number, try again 😒`);
  else {
    if ((number === randomNumber && !flag) || flag) {
      //Nếu (số của người chơi === số bí mật và chưa thắng lần nào) || (đã thắng)
      display(messageTag, `🎉🎉 CORRECT NUMBER!. You're so amazing 😎`);
      if (number === randomNumber && !flag) {
        //Chỉ khi mới thắng thì mới xử lý dưới đây
        flag = true;
        display(hiddenTag, String(randomNumber));
        if (score > highscore) {
          //Nếu điểm hiện tại của người chơi > điểm cao nhất trước đó, set điểm hiện tại ghi vào mốc
          highscore = score;
          display(highscoreTag, String(highscore));
        }
        body.style.backgroundColor = winnerColor; //Set màu nền của body khi người chơi chiến thắng
        hiddenTag.style.width = winnerHiddenTagWidth; //Set độ rộng của ô bí mật
      }
    } else if (number !== randomNumber && !flag) {
      if (score !== 0) {
        display(
          messageTag,
          number > randomNumber ? `Too high...👆` : `Too low...👇` //Toán tử 3 ngôi cho ngắn gọn
        );
        display(scoreTag, String(--score));
        if (score === 0) display(messageTag, `YOU LOST THE GAME 🥲`);
      } else {
        display(messageTag, `Please play again... 😭`);
      }
    }
  }
};

const reset = () => {
  guessTag.value = defaultNumber; //Chỉnh lại giá trị mặc định khi người chơi play again
  display(messageTag, defaultMessage); //Hiển thị lại message mặc định
  display(scoreTag, String(maxScore)); //Hiển thị lại score mặc định
  display(hiddenTag, defaultHidden); //Hiển thị lại ô bí mật mặc định
  randomNumber = generateRandomNumber(); //Quay ra số bí mật mới khi play again
  score = Number(scoreTag.textContent); //Lấy điểm từ DOM scoreTag ra để xử lý trong code
  flag = false; //Set lại cờ
  body.style.removeProperty(`background-color`); //css property được đặt trong chuỗi thì format như bth : background-color
  hiddenTag.style.removeProperty(`width`);
};

//-------------------------------------------------------------------------------------------------------------------------//

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

//-------------------------------------------------------------------------------------------------------------------------//

function start() {
  loadGame();
  check();
  playAgain();
}

start();
