import{gameState as m}from"./GameState-COIyZKUR.js";function u(h,a,c,s){const{boards:l,boardSize:n,humanShips:p,enemyShips:d,isHorizontal:t}=m,e=[];for(let i=0;i<a;i++){const o=t?h+i:h+i*n;s.childNodes[o].classList.add("ship",c),s.childNodes[o].classList.add(`${t?"horizontal":"vertical"}`),e.push(s.childNodes[o])}s===l.humanBoard?p.push(...e):s===l.enemyBoard&&d.push(...e)}export{u as placeShip};
