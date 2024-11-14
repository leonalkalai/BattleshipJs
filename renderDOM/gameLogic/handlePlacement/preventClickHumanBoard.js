//const { gameState } = await import ('../gameState.js');
import { gameState } from '../../gameLogic/GameState.js';
  // prevent click human board when game starts
  export function preventClickHumanBoard(elements) {
    const boards = gameState.boards;
    boards.humanBoard.childNodes.forEach((cell) => {
      // Remove the event listeners using the stored handler functions
      if (cell.clickHandler) {
        cell.removeEventListener("click", cell.clickHandler, false);
        delete cell.clickHandler; // Clean up reference
      }
      if (cell.touchHandler) {
        cell.removeEventListener("touchstart", cell.touchHandler, false);
        delete cell.touchHandler; // Clean up reference
      }

      cell.classList.add("nocursor");
    });
    boards.humanBoard.classList.add("nocursor");
  }