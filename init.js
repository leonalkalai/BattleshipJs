const { gameState } = await import("./gameState.js");
import { initializeHtmlElements } from "./htmlElements.js";
const { resetVariables } = await import("./resetVariables.js");
const { createGame } = await import("./createGame.js");
const { initGame } = await import("./initGame.js");

export async function init() {
  await resetVariables(
    gameState.humanShips,
    gameState.enemyShips,
    gameState.enemyMoves,
    gameState.gameStarted,
    gameState.currentShipIndex,
    gameState.playerTurn,
    gameState.isHorizontal,
    gameState.enemyGuesses,
    gameState.humanGuesses
  ); // Reset all variables at the beginning of a new game
  const htmlElements = await initializeHtmlElements();
  htmlElements.body.innerHTML = await "";
  await createGame(htmlElements); // Create the game elements and set up the game
  await initGame(); // Initialize the game (placing ships, event listeners)
}
