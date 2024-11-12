import { initializeHtmlElements } from "./htmlElements.js";
const { gameState } = await import ('./gameState.js');

  // Toggle ship rotation
  export function toggleShipRotation() {
    const htmlElements = initializeHtmlElements();
    const message = htmlElements.message;
    gameState.isHorizontal = !gameState.isHorizontal; // Toggle between horizontal and vertical
    const orientationMessage = gameState.isHorizontal ? "Horizontal" : "Vertical";
    message.textContent = `orientation: ${orientationMessage}`;
  }
