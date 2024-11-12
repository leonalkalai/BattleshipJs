
import { initializeHtmlElements } from "./htmlElements.js";
const { placeHumanShips } = await import("./placeHumanShips.js");
const { gameState } = await import("./gameState.js");

// Initialize game
  export async function initGame() {
    const htmlElements = initializeHtmlElements();
    await placeHumanShips(htmlElements);
  }