//import { initializeHtmlElements } from "./htmlElements.js";
//const { gameState } = await import ('./gameState.js');
import { gameState } from '../../gameLogic/GameState.js';
import { helperFunctionsClass } from '../../helperFunctions/helperFunctionsClass.js';

  // Toggle ship rotation
  export function toggleShipRotation() {
    //const htmlElements = initializeHtmlElements();
    const htmlElements = helperFunctionsClass.initializeHtmlElements();
    const message = htmlElements.message;
    gameState.isHorizontal = !gameState.isHorizontal; // Toggle between horizontal and vertical
    const orientationMessage = gameState.isHorizontal ? "Horizontal" : "Vertical";
    message.textContent = `orientation: ${orientationMessage}`;
  }
