const { gameState } = await import ('./gameState.js');
const { createContainer } = await import ("./createContainer.js");
const { createButtons } = await import ("./createButtons.js");
const { selectBoardSelector } = await import ("./helperFunctions/selectBoardSelector.js");
const { createBoard } = await import ("./createBoard.js");

export async function createMain(elements) {
  const mainElement = document.createElement("main");
  await createButtons(mainElement, elements);
  await createContainer(mainElement);
  elements.body.appendChild(mainElement);

  // Initialize boards
  await selectBoardSelector("human");
  await selectBoardSelector("enemy");
  await createBoard(gameState.boards.humanBoard);
  await createBoard(gameState.boards.enemyBoard);
}
