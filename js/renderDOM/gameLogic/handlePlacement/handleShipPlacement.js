const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/renderDOM/gameLogic/handlePlacement/canPlaceShip.js","js/renderDOM/gameLogic/GameState.js","js/renderDOM/gameLogic/handlePlacement/placeShip.js","js/renderDOM/gameLogic/updateShipStatus.js","js/renderDOM/gameLogic/startGame.js","fallback.js","js/renderDOM/helperFunctions/helperFunctionsClass.js","js/renderDOM/gameLogic/playSoundEffects.js"])))=>i.map(i=>d[i]);
import{_ as s}from"../../../../fallback.js";import"../../helperFunctions/helperFunctionsClass.js";import{gameState as r}from"../GameState.js";import{p as u}from"../playSoundEffects.js";const{canPlaceShip:h}=await s(async()=>{const{canPlaceShip:a}=await import("./canPlaceShip.js");return{canPlaceShip:a}},__vite__mapDeps([0,1])),{placeShip:m}=await s(async()=>{const{placeShip:a}=await import("./placeShip.js");return{placeShip:a}},__vite__mapDeps([2,1])),{updateShipStatus:_}=await s(async()=>{const{updateShipStatus:a}=await import("../updateShipStatus.js");return{updateShipStatus:a}},__vite__mapDeps([3,1])),{startGame:l}=await s(async()=>{const{startGame:a}=await import("../startGame.js");return{startGame:a}},__vite__mapDeps([4,5,6,7]));function I(a,t){a.preventDefault();const{boards:i,shipSizes:e,shipNames:d}=r;if(t){a.preventDefault();const p=a.target;if(r.currentShipIndex<e.length){const n=parseInt(p.dataset.index),o=e[r.currentShipIndex],c=d[r.currentShipIndex];h(n,o,i.humanBoard)?(i.humanBoard.classList.remove("pending"),i.humanBoard.classList.add("outline"),i.humanBoard.classList.remove("waiting"),m(n,o,c,i.humanBoard),u("placeship"),t.message.classList.remove("alarm"),t.message.innerHTML=`${c} added`,_(r.currentShipIndex),r.currentShipIndex++):(t.message.classList.add("alarm"),t.message.innerHTML=`
      Try another location.
      `)}r.currentShipIndex===e.length&&setTimeout(()=>{t.message.innerHTML=`
      'Ready'</br> 
       "START" battle!
      `,t.startButton.classList.add("ready"),t.startButton.disabled=!1,t.startButton.addEventListener("click",l),t.interfaceContainer.classList.add("wrap"),t.rotateButton.classList.remove("ready")},1500)}}export{I as handleShipPlacement};