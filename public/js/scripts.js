let cell  = document.querySelectorAll('#cell') ;
let board = document.querySelector('.board');
let turn = true ;
let Xclass = 'x';
let Oclass = 'o';





cell.forEach(cell => {
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
