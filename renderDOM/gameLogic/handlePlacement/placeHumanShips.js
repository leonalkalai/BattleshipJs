const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["shared/battleship_game/renderDOM/gameLogic/handlePlacement/handleShipPlacement.js","fallback.js","shared/battleship_game/renderDOM/helperFunctions/helperFunctionsClass.js","shared/battleship_game/renderDOM/gameLogic/GameState.js","shared/battleship_game/renderDOM/gameLogic/playSoundEffects.js"])))=>i.map(i=>d[i]);
import{_ as d}from"../../../../../fallback.js";import{gameState as e}from"../GameState.js";const{handleShipPlacement:o}=await d(()=>import("./handleShipPlacement.js"),__vite__mapDeps([0,1,2,3,4]));function c(r){e.boards.humanBoard.childNodes.forEach(a=>{a.clickHandler=t=>o(t,r),a.touchHandler=t=>o(t,r),a.addEventListener("click",a.clickHandler,!1),a.addEventListener("touchstart",a.touchHandler,!1)})}export{c as placeHumanShips};
