const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["shared/battleship_game/src/js/createDOM/createHeader.js","shared/battleship_game/src/js/renderDOM/helperFunctions/helperFunctionsClass.js","fallback.js","shared/battleship_game/src/js/createDOM/createMain.js","shared/battleship_game/src/js/renderDOM/gameLogic/GameState.js","shared/battleship_game/src/js/createDOM/createTables/createShipsTableContainer.js","shared/battleship_game/src/js/createDOM/createTables/createShipsTables.js"])))=>i.map(i=>d[i]);
import{_ as e}from"../../../../../fallback.js";import{helperFunctionsClass as r}from"../renderDOM/helperFunctions/helperFunctionsClass.js";import{gameState as t}from"../renderDOM/gameLogic/GameState.js";const{createHeader:s}=await e(async()=>{const{createHeader:a}=await import("./createHeader.js");return{createHeader:a}},__vite__mapDeps([0,1,2])),{createMain:o}=await e(async()=>{const{createMain:a}=await import("./createMain.js");return{createMain:a}},__vite__mapDeps([3,2,4,1])),{createShipsTableContainer:n}=await e(async()=>{const{createShipsTableContainer:a}=await import("./createTables/createShipsTableContainer.js");return{createShipsTableContainer:a}},__vite__mapDeps([5,1,2])),{createBoardTitles:c}=await e(async()=>{const{createBoardTitles:a}=await import("./createBoard/createBoardTitles.js");return{createBoardTitles:a}},[]),{createShipsTables:d}=await e(async()=>{const{createShipsTables:a}=await import("./createTables/createShipsTables.js");return{createShipsTables:a}},__vite__mapDeps([6,4]));async function l(a){await s(),await o(a),await n(),await c(),await d();const i=await r.initializeHtmlElements();i.turnIndicator&&await i.turnIndicator.classList.remove("ready"),await t.boards.humanBoard.classList.add("pending"),await t.boards.enemyBoard.classList.add("pending"),await t.boards.humanBoard.classList.remove("outline"),await t.boards.enemyBoard.classList.remove("outline"),await t.boards.humanBoard.classList.add("waiting"),await t.boards.enemyBoard.classList.add("waiting")}export{l as createGame};