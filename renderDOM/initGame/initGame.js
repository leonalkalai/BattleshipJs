
//import { initializeHtmlElements } from "./htmlElements.js";
import { helperFunctionsClass } from '../helperFunctions/helperFunctionsClass.js';
import { gameState } from '../gameLogic/GameState.js';
const { placeHumanShips } = await import("../gameLogic/handlePlacement/placeHumanShips.js");
//const { gameState } = await import("./gameState.js");

// Initialize game
  export async function initGame() {
   // const htmlElements = initializeHtmlElements();
   const htmlElements = await helperFunctionsClass.initializeHtmlElements();
    await placeHumanShips(htmlElements);
  }