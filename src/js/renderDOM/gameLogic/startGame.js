
const { gameState } = await import ('./GameState.js');
//import { initializeHtmlElements } from "../htmlElements.js";
import { helperFunctionsClass } from '../helperFunctions/helperFunctionsClass.js';
const { preventClickHumanBoard } = await import ('./handlePlacement/preventClickHumanBoard.js');
const { attack } = await import ('./attack.js');
const { checkWin } = await import ('./checkWin.js');
const { updateTurnIndicator } = await import ('./updateTurnIndicator.js');
const { placeEnemyShips } = await import ('./handlePlacement/placeEnemyShips.js');
const { enemyTurn } = await import ('./enemyTurn.js');
const { checkShipDestroyed } = await import("./checkShipDestroyed.js");
import { playSoundEffects } from "./playSoundEffects.js";

  // Start the game
  export function startGame() {

    playSoundEffects("start");

    const {
      boards,
      shipSizes,
      shipNames,
    } = gameState;

    const htmlElements = helperFunctionsClass.initializeHtmlElements();
    boards.humanBoard.classList.remove("pending");
    boards.humanBoard.classList.add("outline");
    boards.enemyBoard.classList.add("outline");
    boards.enemyBoard.classList.remove("pending");
    boards.enemyBoard.classList.add("aim");
    preventClickHumanBoard(boards.humanBoard);
    if (gameState.currentShipIndex === shipSizes.length) {
  
      // Check if all ships are placed
      gameState.gameStarted = true;
      gameState.playerTurn = true; // Player starts
      htmlElements.message.innerHTML = `
     Game started!
     `;
      htmlElements.turnIndicator.classList.add("ready");
      updateTurnIndicator();

      placeEnemyShips(); // Place AI ships on the enemy's Board
      boards.enemyBoard.classList.remove("waiting");
      // Disable start button after game starts
      htmlElements.startButton.classList.remove("ready");
      //startButton.style.display = "none";
      htmlElements.interfaceContainer.classList.add("wrap");
      // Enable player to attack enemy's Board
      boards.enemyBoard.childNodes.forEach((cell, index) => {
        cell.classList.add("aim");
        cell.addEventListener("click", () => {
          if (
            gameState.playerTurn &&
            gameState.gameStarted &&
            !cell.classList.contains("hit") &&
            !cell.classList.contains("miss")
          ) {
            attack(
              cell,
              index,
              gameState.enemyShips,
              boards.enemyBoard,
              "human",
              htmlElements
            );
            if (!checkWin(gameState.enemyShips, "human", htmlElements)) {
              gameState.playerTurn = false;
              updateTurnIndicator();
              setTimeout(enemyTurn(htmlElements), 1000); // enemy moves after a delay
            }
            const checkEnemyShipsDestroyed = checkShipDestroyed(gameState.enemyShips);
            let checkEnemyShipsDestroyedStatus = checkEnemyShipsDestroyed[0];
            let checkEnemyShipsDestroyedResult =
              checkEnemyShipsDestroyed[1].enemy;
            //console.clear();
            console.log(
              "checkEnemyShipsDestroyedStatus =>",
              checkEnemyShipsDestroyedStatus
            );
            console.log(
              "checkEnemyShipsDestroyed =>",
              checkEnemyShipsDestroyedResult
            );
            if (checkEnemyShipsDestroyedResult) {
              console.log("human wins");
            }
          }
        });
      });
    } else {
      htmlElements.message.textContent =
        "Please place all ships before starting the game!";
    }
  }