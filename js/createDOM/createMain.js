const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/createDOM/createContainer.js","js/renderDOM/gameLogic/GameState.js","js/createDOM/createButtons.js","js/renderDOM/helperFunctions/helperFunctionsClass.js","fallback.js","js/renderDOM/gameLogic/handlePlacement/toggleShipRotation.js","js/renderDOM/gameLogic/playSoundEffects.js","js/renderDOM/gameLogic/restartGame.js","js/createDOM/createBoard/createBoard.js"])))=>i.map(i=>d[i]);
import{_ as t}from"../../fallback.js";import{gameState as e}from"../renderDOM/gameLogic/GameState.js";import{helperFunctionsClass as o}from"../renderDOM/helperFunctions/helperFunctionsClass.js";const{createContainer:n}=await t(()=>import("./createContainer.js"),__vite__mapDeps([0,1])),{createButtons:m}=await t(()=>import("./createButtons.js"),__vite__mapDeps([2,3,4,5,1,6,7])),{createBoard:r}=await t(()=>import("./createBoard/createBoard.js"),__vite__mapDeps([8,4,1]));async function s(i){const a=document.createElement("main");await m(a),await n(a),i.body.appendChild(a),await o.selectBoardSelector("human"),await o.selectBoardSelector("enemy"),await r(e.boards.humanBoard),await r(e.boards.enemyBoard)}export{s as createMain};