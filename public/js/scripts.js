let cell = document.querySelectorAll('#cell');
let board = document.querySelector('.board');
let turn = true;
let Xclass = `x`;
let Oclass = 'o';
let c = 1;
let wText = document.querySelector('.winning-text');
let cellsBoard = board.children;
let arrCellsBoard = [...cellsBoard]

let xcells = [];
let ocells = [];

// Winning chains
let arrWinner = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [7, 5, 3],
  [1, 5, 9]
];

let result = '';


cell.forEach(element => {
  element.id = c;
  c++;
});


function checkWin(playerCells) {

  return arrWinner.some(combination => combination.every(elem => playerCells.includes(elem)));
}

function checkDraw(){
  return arrCellsBoard.every(cell => cell.classList.contains(Xclass) || cell.classList.contains(Oclass))
}

function resetBoard() {
  cell.forEach(cell => {
    cell.classList.remove(Xclass, Oclass);
    cell.textContent = '';
  });
  xcells = [];
  ocells = [];
}

function colorCell(ind){
  arrCellsBoard[arrWinner[ind][0]].classList.add('winnerCells');
  arrCellsBoard[arrWinner[ind][1]].classList.add('winnerCells');
  arrCellsBoard[arrWinner[ind][2]].classList.add('winnerCells');
}


cell.forEach(cell => {
  cell.addEventListener('click', (e) => {

    if(cell.textContent != '') return

    if (turn && cell.textContent === '') {
      cell.classList.add(Xclass);
      cell.innerHTML = Xclass;
      xcells.push(parseInt(cell.id)); 

      
      if (checkWin(xcells)) {

        let index = arrWinner.findIndex(combination => combination.every(arrayNum => xcells.includes(arrayNum)));
        result = 'X wins!';
        wText.textContent = result ;
        colorCell(index)

      
      }

      if (checkDraw()){
        console.log('Draw !');
        resetBoard();
      }

      turn = false;

    } else if (!turn && cell.textContent === '') {
      
      cell.classList.add(Oclass);
      cell.innerHTML = Oclass;
      ocells.push(parseInt(cell.id)); 

     
      if (checkWin(ocells)) {
        result = 'O wins!';
        console.log(result); 
        resetBoard()
        
      }

      if (checkDraw()){
        console.log('Draw !');
        resetBoard();
      }

      turn = true;
    }
  });
});
