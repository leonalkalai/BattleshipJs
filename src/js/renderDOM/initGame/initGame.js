const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["shared/battleship_game/src/js/renderDOM/gameLogic/handlePlacement/placeHumanShips.js","fallback.js","shared/battleship_game/src/js/renderDOM/gameLogic/GameState.js"])))=>i.map(i=>d[i]);
import{_ as a}from"../../../../../../fallback.js";import{helperFunctionsClass as i}from"../helperFunctions/helperFunctionsClass.js";const{placeHumanShips:n}=await a(async()=>{const{placeHumanShips:t}=await import("../gameLogic/handlePlacement/placeHumanShips.js");return{placeHumanShips:t}},__vite__mapDeps([0,1,2]));async function s(){const t=await i.initializeHtmlElements();await n(t)}export{s as initGame};
