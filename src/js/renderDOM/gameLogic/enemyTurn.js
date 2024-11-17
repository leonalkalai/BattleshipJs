const { gameState } = await import ('./GameState.js');
import { helperFunctionsClass } from "../helperFunctions/helperFunctionsClass.js";
const { checkWin } = await import("./checkWin.js");
const { checkShipDestroyed } = await import("./checkShipDestroyed.js");
const { updateTurnIndicator } = await import ('./updateTurnIndicator.js');

// enemy's turn to attack
export function enemyTurn(elements) {
  const { boards, boardSize, shipSizes, shipNames, humanShips, enemyGuesses } =
    gameState;

  let move;
  do {
    move = Math.floor(Math.random() * boardSize * boardSize);
  } while (enemyGuesses.includes(move));

  enemyGuesses.push(move);
  const targetCell = boards.humanBoard.childNodes[move];

  if (targetCell.classList.contains("ship")) {
    targetCell.classList.add("hit");
    helperFunctionsClass.toggleClassWithTimeout(targetCell, "highlight", 1000);
    elements.message.innerHTML = `
   Enemy hit</br> 
   your ship!'
    `;
  } else {
    targetCell.classList.add("miss");
    helperFunctionsClass.toggleClassWithTimeout(targetCell, "highlight", 1000);
    elements.message.textContent = "Enemy missed!";
  }

  // check if enemy wins
  if (!checkWin(humanShips, "enemy", elements)) {
    gameState.playerTurn = true; // Pass the turn back to the player
    updateTurnIndicator();
  }

  let checkHumanShipsDestroyed = checkShipDestroyed(humanShips)[1].human;
  //console.log("checkHumanShipsDestroyed =>", checkHumanShipsDestroyed);
  if (checkHumanShipsDestroyed) {
    console.log("enemy wins");
  }
}
