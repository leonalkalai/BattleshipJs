const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/preventClickHumanBoard-CJaxRypn.js","assets/GameState-COIyZKUR.js","assets/attack-DBNCwBaa.js","assets/helperFunctionsClass-BMCfCdaJ.js","assets/index-CUCayo57.js","assets/index-D_MdDroH.css","assets/checkShipDestroyed-D8bwORmq.js","assets/playSoundEffects-CI2Y_c4Q.js","assets/checkWin-DmtxHbr5.js","assets/updateTurnIndicator-68VcLiNg.js","assets/placeEnemyShips-D4P5B-Ur.js","assets/enemyTurn-B3apK81H.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./index-CUCayo57.js";import{helperFunctionsClass as _}from"./helperFunctionsClass-BMCfCdaJ.js";import{p}from"./playSoundEffects-CI2Y_c4Q.js";const{gameState:t}=await a(()=>import("./GameState-COIyZKUR.js"),[]),{preventClickHumanBoard:l}=await a(()=>import("./preventClickHumanBoard-CJaxRypn.js"),__vite__mapDeps([0,1])),{attack:h}=await a(()=>import("./attack-DBNCwBaa.js"),__vite__mapDeps([2,3,4,5,6,7])),{checkWin:u}=await a(()=>import("./checkWin-DmtxHbr5.js"),__vite__mapDeps([8,1])),{updateTurnIndicator:r}=await a(()=>import("./updateTurnIndicator-68VcLiNg.js"),__vite__mapDeps([9,4,5,3])),{placeEnemyShips:y}=await a(()=>import("./placeEnemyShips-D4P5B-Ur.js"),__vite__mapDeps([10,4,5,1])),{enemyTurn:E}=await a(()=>import("./enemyTurn-B3apK81H.js"),__vite__mapDeps([11,4,5,3])),{checkShipDestroyed:L}=await a(async()=>{const{checkShipDestroyed:e}=await import("./checkShipDestroyed-D8bwORmq.js");return{checkShipDestroyed:e}},__vite__mapDeps([6,4,5]));function f(){p("start");const{boards:e,shipSizes:m,shipNames:S}=t,s=_.initializeHtmlElements();e.humanBoard.classList.remove("pending"),e.humanBoard.classList.add("outline"),e.enemyBoard.classList.add("outline"),e.enemyBoard.classList.remove("pending"),e.enemyBoard.classList.add("aim"),l(e.humanBoard),t.currentShipIndex===m.length?(t.gameStarted=!0,t.playerTurn=!0,s.message.innerHTML=`
     Game started!
     `,s.turnIndicator.classList.add("ready"),r(),y(),e.enemyBoard.classList.remove("waiting"),s.startButton.classList.remove("ready"),s.interfaceContainer.classList.add("wrap"),e.enemyBoard.childNodes.forEach((i,c)=>{i.classList.add("aim"),i.addEventListener("click",()=>{if(t.playerTurn&&t.gameStarted&&!i.classList.contains("hit")&&!i.classList.contains("miss")){h(i,c,t.enemyShips,e.enemyBoard,"human",s),u(t.enemyShips,"human",s)||(t.playerTurn=!1,r(),setTimeout(E(s),1e3));const n=L(t.enemyShips);let d=n[0],o=n[1].enemy;console.log("checkEnemyShipsDestroyedStatus =>",d),console.log("checkEnemyShipsDestroyed =>",o),o&&console.log("human wins")}})})):s.message.textContent="Please place all ships before starting the game!"}export{f as startGame};
