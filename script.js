const selection = document.querySelectorAll('.selection');
const playerText = document.getElementById('playerText');
const restartBtn = document.getElementById('restart');
const O_TEXT = 'O';
const X_TEXT = 'X';
const spaces = [];

let currentPlayer;

const boxClicked = (e) => {
  const id = e.target.id;
  console.log(id);
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playerText.innerText = `${currentPlayer} HAS WON!`;
      selection.forEach((block) => {
        block.removeEventListener('click', boxClicked);
      });
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
};

const playerHasWon = () => {
  //from top left, check across, down, and diagonal
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      return true;
    }
  }
  //from bottom right check up and across
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      return true;
    }
    if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
      return true;
    }
  }
  //from bottom left check up
  if (spaces[6] === currentPlayer) {
    if (spaces[4] === currentPlayer && spaces[2] === currentPlayer) {
      return true;
    }
  }
  //from middle check middle vertical and middle horizontal
  if (spaces[4] === currentPlayer) {
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      return true;
    }
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      return true;
    }
  }
};

const startGame = () => {
  selection.forEach((block, id) => {
    block.addEventListener('click', boxClicked);
  });
};

const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  selection.forEach((block) => {
    block.innerText = '';
  });
  playerText.innerText = 'READY?';
  currentPlayer = X_TEXT;

  selection.forEach((block, id) => {
    block.addEventListener('click', boxClicked);
  });
};

restartBtn.addEventListener('click', restart);

restart();
startGame();
