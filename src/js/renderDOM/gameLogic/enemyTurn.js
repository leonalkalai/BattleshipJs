const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["shared/battleship_game/src/js/renderDOM/gameLogic/checkWin.js","shared/battleship_game/src/js/renderDOM/gameLogic/GameState.js","shared/battleship_game/src/js/renderDOM/gameLogic/checkShipDestroyed.js","fallback.js","shared/battleship_game/src/js/renderDOM/gameLogic/updateTurnIndicator.js","shared/battleship_game/src/js/renderDOM/helperFunctions/helperFunctionsClass.js"])))=>i.map(i=>d[i]);
import{_ as s}from"../../../../../../fallback.js";import{helperFunctionsClass as r}from"../helperFunctions/helperFunctionsClass.js";const{gameState:h}=await s(()=>import("./GameState.js"),[]),{checkWin:m}=await s(async()=>{const{checkWin:e}=await import("./checkWin.js");return{checkWin:e}},__vite__mapDeps([0,1])),{checkShipDestroyed:d}=await s(async()=>{const{checkShipDestroyed:e}=await import("./checkShipDestroyed.js");return{checkShipDestroyed:e}},__vite__mapDeps([2,3])),{updateTurnIndicator:u}=await s(()=>import("./updateTurnIndicator.js"),__vite__mapDeps([4,3,5]));function E(e){const{boards:c,boardSize:o,shipSizes:_,shipNames:l,humanShips:a,enemyGuesses:n}=h;let i;do i=Math.floor(Math.random()*o*o);while(n.includes(i));n.push(i);const t=c.humanBoard.childNodes[i];t.classList.contains("ship")?(t.classList.add("hit"),r.toggleClassWithTimeout(t,"highlight",1e3),e.message.innerHTML=`
   Enemy hit</br> 
   your ship!'
    `):(t.classList.add("miss"),r.toggleClassWithTimeout(t,"highlight",1e3),e.message.textContent="Enemy missed!"),m(a,"enemy",e)||(h.playerTurn=!0,u()),d(a)[1].human&&console.log("enemy wins")}export{E as enemyTurn};
