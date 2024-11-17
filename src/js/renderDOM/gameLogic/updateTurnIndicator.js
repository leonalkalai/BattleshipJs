const { gameState } = await import ('./GameState.js');
//import { initializeHtmlElements } from "../htmlElements.js";
import { helperFunctionsClass } from '../helperFunctions/helperFunctionsClass.js';

// Update the turn indicator
  export function updateTurnIndicator() {
    const htmlElements = helperFunctionsClass.initializeHtmlElements();
    htmlElements.turnIndicator.textContent = gameState.playerTurn
      ? "Your turn"
      : "AI's turn";
  }