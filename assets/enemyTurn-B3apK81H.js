const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/checkWin-DmtxHbr5.js","assets/GameState-COIyZKUR.js","assets/checkShipDestroyed-D8bwORmq.js","assets/index-CUCayo57.js","assets/index-D_MdDroH.css","assets/updateTurnIndicator-68VcLiNg.js","assets/helperFunctionsClass-BMCfCdaJ.js"])))=>i.map(i=>d[i]);
import{_ as s}from"./index-CUCayo57.js";import{helperFunctionsClass as r}from"./helperFunctionsClass-BMCfCdaJ.js";const{gameState:h}=await s(()=>import("./GameState-COIyZKUR.js"),[]),{checkWin:m}=await s(async()=>{const{checkWin:e}=await import("./checkWin-DmtxHbr5.js");return{checkWin:e}},__vite__mapDeps([0,1])),{checkShipDestroyed:d}=await s(async()=>{const{checkShipDestroyed:e}=await import("./checkShipDestroyed-D8bwORmq.js");return{checkShipDestroyed:e}},__vite__mapDeps([2,3,4])),{updateTurnIndicator:u}=await s(()=>import("./updateTurnIndicator-68VcLiNg.js"),__vite__mapDeps([5,3,4,6]));function E(e){const{boards:c,boardSize:o,shipSizes:_,shipNames:l,humanShips:a,enemyGuesses:n}=h;let i;do i=Math.floor(Math.random()*o*o);while(n.includes(i));n.push(i);const t=c.humanBoard.childNodes[i];t.classList.contains("ship")?(t.classList.add("hit"),r.toggleClassWithTimeout(t,"highlight",1e3),e.message.innerHTML=`
   Enemy hit</br> 
   your ship!'
    `):(t.classList.add("miss"),r.toggleClassWithTimeout(t,"highlight",1e3),e.message.textContent="Enemy missed!"),m(a,"enemy",e)||(h.playerTurn=!0,u()),d(a)[1].human&&console.log("enemy wins")}export{E as enemyTurn};
