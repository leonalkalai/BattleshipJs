const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["shared/battleship_game/createDOM/createGame.js","fallback.js","shared/battleship_game/renderDOM/helperFunctions/helperFunctionsClass.js","shared/battleship_game/renderDOM/gameLogic/GameState.js","shared/battleship_game/renderDOM/initGame/initGame.js"])))=>i.map(i=>d[i]);
import{_ as i}from"../../../../fallback.js";import{helperFunctionsClass as a}from"../helperFunctions/helperFunctionsClass.js";const{createGame:e}=await i(async()=>{const{createGame:t}=await import("../../createDOM/createGame.js");return{createGame:t}},__vite__mapDeps([0,1,2,3])),{initGame:n}=await i(async()=>{const{initGame:t}=await import("./initGame.js");return{initGame:t}},__vite__mapDeps([4,1,2]));async function s(){await a.resetVariables();const t=await a.initializeHtmlElements();t.body.innerHTML=await"",await e(t),await n()}export{s as init};
