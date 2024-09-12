let cells  = document.querySelectorAll('.cells') ;
let board = document.querySelector('.board');
let turn = true ;
let Xclass = 'x';
let Oclass = 'o';

debugger



cells.forEach(cell => {
  cell.addEventListener('click',(e)=>{
    if(turn && cell.textContent === ''){
        cell.innerHTML = Xclass;
        turn = false;
    
    }
    else if (!turn && cell.textContent === ''){
      cell.innerHTML = Oclass;
      turn = true;
  
    }

  })
})
