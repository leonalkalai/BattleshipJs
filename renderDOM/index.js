import { helperFunctionsClass } from './helperFunctions/helperFunctionsClass.js';
import { gameState } from '../renderDOM/gameLogic/GameState.js';
const { init } = await import("./initGame/init.js");
document.addEventListener("DOMContentLoaded", async () => {
  const htmlElements = await helperFunctionsClass.initializeHtmlElements();

  
  // Start the game
  


  //const { initializeHtmlElements } = await import("./htmlElements.js"); // Importing the function from htmlElements.js
 
  // start variables
  //const { gameState } = await import("./gameState.js");
  // const htmlElements = await initializeHtmlElements();

  // const {
  //   boards,
  //   playersList,
  //   boardSize,
  //   shipSizes,
  //   shipNames,
  //   humanShips,
  //   enemyShips,
  //   enemyMoves,
  //   gameStarted,
  //   currentShipIndex,
  //   playerTurn,
  //   isHorizontal,
  //   enemyGuesses,
  //   humanGuesses,
  // } = gameState;

  // end variables


  // const { createContainer } = await import("./createContainer.js");

  // const { createButtons } = await import("./createButtons.js");
  // const { toggleShipRotation } = await import("./toggleShipRotation.js");
  // const { resetVariables } = await import("./resetVariables.js");

});
init();