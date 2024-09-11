let cells  = document.querySelectorAll('.cells') ;
let board = document.querySelector('.board');
let Xturn = true ;
let Oturn = false ;
let Xclass = 'x';
let Oclass = 'o';




cells.forEach(cell => {
  cell.addEventListener('click',(e)=>{
    if(Xturn && cell.textContent === ''){
        cell.innerHTML = Xclass;
        changeTurn(Xturn)

    }
  })
})

function changeTurn(bool){
   return !bool;

}
