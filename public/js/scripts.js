let cell = document.querySelectorAll('#cell');
let board = document.querySelector('.board');
let turn = true;
let Xclass = `x`;
let Oclass = 'o';
let c = 1;

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


/// Bug to fix
function checkDraw(board){
  return board.every(cell => cell.classList.contains(Xclass) || cell.classList.contains(Oclass))
}


function resetBoard() {
  cell.forEach(cell => {
    cell.classList.remove(Xclass, Oclass);
    cell.textContent = '';
  });
  xcells = [];
  ocells = [];
}

cell.forEach(cell => {
  cell.addEventListener('click', (e) => {

    if(cell.textContent != '') return

    if (turn && cell.textContent === '') {
      cell.classList.add(Xclass);
      cell.innerHTML = Xclass;
      xcells.push(parseInt(cell.id)); 

      
      if (checkWin(xcells)) {
        result = 'X wins!';
        console.log(result);
        resetBoard()
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

      turn = true;
    }
  });
});
