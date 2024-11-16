import{_ as r}from"./index-CUCayo57.js";const{gameState:t}=await r(async()=>{const{gameState:o}=await import("./GameState-COIyZKUR.js");return{gameState:o}},[]);class i{static toggleClassWithTimeout(e,n,a){e.classList.add(n),setTimeout(()=>{e.classList.remove(n)},a)}static clearBoard(e){e.innerHTML=""}static removeElements(e){document.querySelectorAll(e).forEach(n=>{n.remove()})}static selectBoardSelector(e){t.boards[`${e}Board`]=document.getElementById(`${e}-board`)}static initializeHtmlElements(){return{body:document.querySelector("body"),buttonsContainer:document.getElementById("buttons-container"),startButton:document.getElementById("start-button"),restartButton:document.getElementById("restart-button"),rotateButton:document.getElementById("rotate-button"),interfaceContainer:document.getElementById("interface-container"),message:document.getElementById("message"),turnIndicator:document.getElementById("turn-indicator")}}static async resetVariables(){t.humanShips=[],t.enemyShips=[],t.enemyMoves=[],t.gameStarted=!1,t.currentShipIndex=0,t.playerTurn=!0,t.isHorizontal=!0,t.enemyGuesses=[],t.humanGuesses=[]}}export{i as helperFunctionsClass};
