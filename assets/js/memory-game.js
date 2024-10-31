// Emojiler dizisi oluştur.
// Emojiler dizisini karıştır.
// Emojiler dizisini ekrana bastır.
// Emojiler başlangıçta görünmez yap.
// Her bir emojiye click eventi ata.
// Tıklanan emojiye active class'ı ata ve görünür yap.
// Tıklanan emojinin tıklanabilirliğini kapat.
// Tıklanan iki emojiyi birbiriyle karşılaştır. (Bir diziye push'la ve oradan kontrol et.)
// Eşleşmişler ise score'u arttır ve matched class'a ekleyip tıklanabilirliğini ve görünürlüğünü kaldır. Eğer eşleşmezlerse active class'ı geri kaldır. (Burada eğer iki eleman eşleşmemişse direkt kapanacağı için bir setTimeout fonksiyonu ile kapanma süresini geciktir.)
// Score durumu 0 olduğunda oyunu bitir.
// Eklenmesi gereken diğer içerikler:

// Her bir emojiye tıklandığında hareket sayısını arttır (Moves).

const icons = ['<i class="fa-regular fa-futbol"></i>', '<i class="fa-solid fa-anchor"></i>', '<i class="fa-solid fa-flask"></i>', '<i class="fa-solid fa-sun"></i>', '<i class="fa-solid fa-bug"></i>', '<i class="fa-regular fa-moon"></i>', '<i class="fa-solid fa-snowflake"></i>', '<i class="fa-regular fa-star"></i>', '<i class="fa-regular fa-futbol"></i>', '<i class="fa-solid fa-anchor"></i>', '<i class="fa-solid fa-flask"></i>', '<i class="fa-solid fa-sun"></i>', '<i class="fa-solid fa-bug"></i>', '<i class="fa-regular fa-moon"></i>', '<i class="fa-solid fa-snowflake"></i>', '<i class="fa-regular fa-star"></i>'];

let clickedBoxes = [];

let movesCounter = 0;

let scoreCounter = 0;

let timer = 0;


function shuffleArray(){
  return icons.sort(() => Math.random() - 0.5);
}

let shuffledArray = shuffleArray();

function startGame(){
  let shuffledArray = shuffleArray();
  const memoryGameContainer = document.querySelector('.boxes');

  for (let i = 0; i < shuffledArray.length; i++) {
    memoryGameContainer.innerHTML += `<div class="box">${shuffledArray[i]}</div>`;
  }

  const boxes = document.querySelectorAll('.box');
  for (const box of boxes) {
    box.addEventListener('click', clickedBtn);
  }
}

function clickedBtn(){
  this.classList.add('active');
  clickedBoxes.push(this);
  if(clickedBoxes.length === 2){
    if(clickedBoxes[0].innerHTML === clickedBoxes[1].innerHTML){
      const activeBoxes = document.querySelectorAll('.box.active');
      for (const activeBox of activeBoxes) {
        activeBox.classList.add('matched');
      }
      scoreCounter++;
      console.log(scoreCounter);
    }

    const activeBoxes = document.querySelectorAll('.box.active');
    setTimeout(() => {
      for (const activeBox of activeBoxes) {
        activeBox.classList.remove('active');
      }
    }, 1000);

    const boxes = document.querySelectorAll('.box');

    for (const box of boxes) {
      if(!(box.classList.contains('active'))){
        box.classList.add('notclicked');
      }
    }

    setTimeout(() => {
      for(const box of boxes) {
        if(box.classList.contains('notclicked')){
          box.classList.remove('notclicked');
        }
      }
    }, 1000);
    
    clickedBoxes = [];
  }
  movesCounter++;
  movesCounterTxt.innerText = movesCounter;

  function endGame(){
    if(scoreCounter === 8){
      stopTimer();
      dialog.showModal();
      const scoreBoardCounters = document.querySelectorAll('.score-board-counter');
      scoreBoardCounters[0].innerText = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
      scoreBoardCounters[1].innerText = `${movesCounter} Moves`;
    }
  }
  endGame();
}

let timerCounter;

function startTimer(){
  stopTimer();

  timerCounter = setInterval(() => {
    timer++;
    timeCounterTxt.innerText = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`
  }, 1000);
}

function stopTimer(){
  if (timerCounter) {
    clearInterval(timerCounter);
    timerCounter = null;
  }
}

function restartGame(){
  scoreCounter = 0;
  timer = 0;
  movesCounter = 0;
  const boxes = document.querySelectorAll('.box');
  for (const box of boxes) {
    box.classList.remove('active');
    box.classList.remove('matched');
  }
  timeCounterTxt.innerText = '0:00';
  startTimer();
  movesCounterTxt.innerText = movesCounter;
}

function newGame(){
  scoreCounter = 0;
  timer = 0;
  movesCounter = 0;
  const memoryGameContainer = document.querySelector('.boxes');
  memoryGameContainer.innerHTML = '';
  shuffledArray = shuffleArray();

  for (let i = 0; i < shuffledArray.length; i++) {
    memoryGameContainer.innerHTML += `<div class="box">${shuffledArray[i]}</div>`;
  }

  const boxes = document.querySelectorAll('.box');
  for (const box of boxes) {
    box.addEventListener('click', clickedBtn);
  }
  timeCounterTxt.innerText = '0:00';
  movesCounterTxt.innerText = movesCounter;
  startTimer();
}

function restartGameDialog(){
  restartGame();
  dialog.close();
  hamburgerMenu.close();
}

function newGameDialog(){
  newGame();
  dialog.close();
  hamburgerMenu.close();
}

function openMenu(){
  stopTimer();
  hamburgerMenu.showModal();
}

function resumeGame(){
  startTimer();
  hamburgerMenu.close();
}


startGame();
startTimer();
restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', newGame);
dialogRestartBtn.addEventListener('click', restartGameDialog);
dialogNewGameBtn.addEventListener('click', newGameDialog);
menuBtn.addEventListener('click', openMenu);
hamburgerMenuRestartBtn.addEventListener('click', restartGameDialog);
hamburgerMenuNewGameBtn.addEventListener('click', newGameDialog);
hamburgerMenuResumeBtn.addEventListener('click', resumeGame);

