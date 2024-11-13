//import { initializeHtmlElements } from "./htmlElements.js";
import { helperFunctionsClass } from '../renderDOM/helperFunctions/helperFunctionsClass.js';
//const { gameState } = await import ('./gameState.js');
import { gameState } from '../renderDOM/gameLogic/GameState.js';
const { createHeader } = await import("./createHeader.js");
const { createMain } = await import("./createMain.js");
const { createShipsTableContainer } = await import(
  "./createTables/createShipsTableContainer.js"
);
const { createBoardTitles } = await import("./createBoard/createBoardTitles.js");
const { createShipsTables } = await import("./createTables/createShipsTables.js");

export async function createGame(elements) {
  await createHeader();
  await createMain(elements);
  await createShipsTableContainer();
  await createBoardTitles();
  await createShipsTables();

  //const htmlElements = initializeHtmlElements();
  const htmlElements = await helperFunctionsClass.initializeHtmlElements();

  if (htmlElements.turnIndicator) {
    await htmlElements.turnIndicator.classList.remove("ready");
  }
  await gameState.boards.humanBoard.classList.add("pending");
  await gameState.boards.enemyBoard.classList.add("pending");
  await gameState.boards.humanBoard.classList.remove("outline");
  await gameState.boards.enemyBoard.classList.remove("outline");
  await gameState.boards.humanBoard.classList.add("waiting");
  await gameState.boards.enemyBoard.classList.add("waiting");
}
