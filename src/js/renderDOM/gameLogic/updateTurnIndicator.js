import{_ as n}from"../../../../../../fallback.js";import{helperFunctionsClass as r}from"../helperFunctions/helperFunctionsClass.js";const{gameState:e}=await n(()=>import("./GameState.js"),[]);function a(){const t=r.initializeHtmlElements();t.turnIndicator.textContent=e.playerTurn?"Your turn":"AI's turn"}export{a as updateTurnIndicator};
