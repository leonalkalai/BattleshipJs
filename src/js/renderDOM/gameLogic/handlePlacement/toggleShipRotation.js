//import { initializeHtmlElements } from "./htmlElements.js";
//const { gameState } = await import ('./gameState.js');
import { gameState } from '../../gameLogic/GameState.js';
import { helperFunctionsClass } from '../../helperFunctions/helperFunctionsClass.js';
import { playSoundEffects } from "../playSoundEffects.js";
  // Toggle ship rotation
  export function toggleShipRotation() {
    playSoundEffects("rotate");
    //const htmlElements = initializeHtmlElements();
    const htmlElements = helperFunctionsClass.initializeHtmlElements();
    const message = htmlElements.message;
    gameState.isHorizontal = !gameState.isHorizontal; // Toggle between horizontal and vertical
    const orientationMessage = gameState.isHorizontal ? "Horizontal" : "Vertical";
    message.textContent = `orientation: ${orientationMessage}`;
  }
