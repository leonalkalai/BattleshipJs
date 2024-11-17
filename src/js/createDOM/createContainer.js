//const { gameState } = await import ('./gameState.js');
import { gameState } from '../renderDOM/gameLogic/GameState.js';

export function createContainer(mainElement) {
    const container = document.createElement("div");
    container.classList.add("container");
    for (const player of gameState.playersList) {
      const boardContainer = document.createElement("div");
      boardContainer.classList.add("board-container");
      const board = document.createElement("div");
      board.id = `${player}-board`;
      board.classList.add("board");
      boardContainer.appendChild(board);
      container.appendChild(boardContainer);
    }
    mainElement.appendChild(container);
  }