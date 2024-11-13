//const { gameState } = await import ('./gameState.js');
import { gameState } from '../renderDOM/gameLogic/GameState.js';
import { helperFunctionsClass } from '../renderDOM/helperFunctions/helperFunctionsClass.js';
const { createContainer } = await import ("./createContainer.js");
const { createButtons } = await import ("./createButtons.js");
//const { selectBoardSelector } = await import ("./helperFunctions/selectBoardSelector.js");
const { createBoard } = await import ("./createBoard/createBoard.js");


export async function createMain(elements) {
  const mainElement = document.createElement("main");
  await createButtons(mainElement, elements);
  await createContainer(mainElement);
  elements.body.appendChild(mainElement);

  // Initialize boards
  await helperFunctionsClass.selectBoardSelector("human");
  await helperFunctionsClass.selectBoardSelector("enemy");
  await createBoard(gameState.boards.humanBoard);
  await createBoard(gameState.boards.enemyBoard);
}
