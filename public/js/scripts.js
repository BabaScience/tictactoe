let board = document.querySelector('#board');
let turn = true; // if true, it's X turn, if false, it's O turn
let Xclass = `x`;
let Oclass = 'o';
let c = 0;
let wText = document.querySelector('.winning-text');
let arrCellsBoard = Array.from(document.querySelectorAll('[data-cell]'));
let timerElement = document.getElementById('timer');
const timerMessageElement = document.getElementById('timer-message');
let timer = parseInt(timerElement.innerText);
let timerEventListener 


let xcells = []; // Array of cells with id "X"
let ocells = []; // Array of cells with id "O"

// Winning combinations
let arrWinner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8]
];

let result = '';


/**
 * Function saving the play
 * @param {*} cell  the cell clicked
 * @param {*} turn  boolean, if true, it's X turn, if false, it's O turn
 */
function addPlay(cell){
  // 1. Add the class to the cell
  const classToAdd = turn ? Xclass : Oclass;
  cell.classList.add(classToAdd); // add the class to the cell
  cell.innerHTML = classToAdd; // add the text content to the cell
  
  // 2. Add the cell id to the array
  if (turn)
    xcells.push(parseInt(cell.id))  // add the cell id to the array if it's X turn
  else
    ocells.push(parseInt(cell.id));  // add the cell id to the array if it's O turn

  // 3. Check if the player wins
  const isWin = checkWin(turn ? xcells : ocells);
  if (isWin) {
    showTimerToRestartGame()

    let index = arrWinner.findIndex(combination => combination.every(arrayNum => turn ? xcells.includes(arrayNum) : ocells.includes(arrayNum)));
    result = turn ? 'X wins!': 'O wins!';
    wText.textContent = result ;
    addColoredClassToWinningMatch(index);
    return;
  }
  
  // 4. Check if it's a draw
  if (checkDraw()){
    showTimerToRestartGame()
    result = 'Draw !'
    wText.textContent = result ;
  }

  // 5. Change the turn
  turn = !turn;
}

/**
 * Function for showing the timer to restart the game
 * @returns void
 */
function showTimerToRestartGame() {
  timerMessageElement.style.display = 'block';
  timerEventListener = setInterval(()=>{
    if(timer <= 0) {
      clearInterval(timerEventListener);
      restartEveryThing();
      return;
    }
    timer--;
    timerElement.innerText = timer;
  },1000)
}


/**
 * Function for coloring the winning cells
 * @param ind index of the winning combination
 * @returns void
 */
function addColoredClassToWinningMatch(ind){
  arrCellsBoard[arrWinner[ind][0]].classList.add('winner-cells');
  arrCellsBoard[arrWinner[ind][1]].classList.add('winner-cells');
  arrCellsBoard[arrWinner[ind][2]].classList.add('winner-cells');
}


/**
 * Check if the game is draw
 * @returns boolean
 */
function checkDraw(){
  return arrCellsBoard.every(cell => cell.classList.contains(Xclass) || cell.classList.contains(Oclass))
}




/**
 * Function for checking winning combinations
 * @param playerCells Array of player cells
 * @returns boolean
 */
function checkWin(playerCells) {
  return arrWinner.some(combination => combination.every(elem => playerCells.includes(elem)));
}

/**
 * Function for removing the event listeners from the cells
 * @returns void
 */
function removeCellsEventListeners(){
  arrCellsBoard.forEach(cell => {
    cell.removeEventListener('click', (e) => setCellsEventListeners, false);
  });
}

/**
 * Function for resetting everything
 * @returns void
 */
function restartEveryThing(){
  timerMessageElement.style.display = 'none';
  timer = 3
  timerElement.innerText = timer;
  // remove the added classes and text content
  arrCellsBoard.forEach(cell => {
    cell.classList.remove(Xclass, Oclass, 'winner-cells'); // remove the added classes
    cell.textContent = ''; // remove the text content
  });
  // reset the arrays
  xcells = [];
  ocells = [];
  // reset the winning text
  wText.textContent = '';
}


/**
 * Function for setting the event listeners to the cells
 * @returns void
 */
function setCellsEventListeners(cell){
  if(cell.textContent != '') return // if the cell is already filled, return
  else addPlay(cell); // if the cell is not filled, add the play
}


/**
  * Start a new game
  * @returns void
  */
function startNewGame() {
  arrCellsBoard.forEach(cell => {
    cell.addEventListener('click', (e) => setCellsEventListeners(cell));
  })
}



timerMessageElement.style.display = 'none';






startNewGame();