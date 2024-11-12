const { gameState } = await import ('../gameState.js');
import { initializeHtmlElements } from "../htmlElements.js";

// Update the turn indicator
  export function updateTurnIndicator() {
    const htmlElements = initializeHtmlElements();
    htmlElements.turnIndicator.textContent = gameState.playerTurn
      ? "Your turn"
      : "AI's turn";
  }