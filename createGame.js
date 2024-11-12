import { initializeHtmlElements } from "./htmlElements.js";
const { gameState } = await import ('./gameState.js');
const { createHeader } = await import("./createHeader.js");
const { createMain } = await import("./createMain.js");
const { createShipsTableContainer } = await import(
  "./createShipsTableContainer.js"
);
const { createBoardTitles } = await import("./createBoardTitles.js");
const { createShipsTables } = await import("./createShipsTables.js");

export async function createGame(elements) {
  await createHeader();
  await createMain(elements);
  await createShipsTableContainer();
  await createBoardTitles();
  await createShipsTables();

  const htmlElements = initializeHtmlElements();

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
