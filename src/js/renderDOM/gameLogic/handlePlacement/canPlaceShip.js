//const { gameState } = await import ('../gameState.js');
import { gameState } from '../../gameLogic/GameState.js';

  // Check if a ship can be placed at the given index
  export function canPlaceShip(startIndex, size, board) {
    const {
      boardSize,
      isHorizontal,
    } = gameState;

    for (let i = 0; i < size; i++) {
      const index = isHorizontal ? startIndex + i : startIndex + i * boardSize;
      // Check if the index is out of bounds or already occupied
      if (
        index >= boardSize * boardSize ||
        board.childNodes[index].classList.contains("ship")
      ) {
        return false; // Ship cannot be placed
      }
      // Check if the ship is being placed in the last row when horizontal
      if (isHorizontal && (startIndex % boardSize) + size > boardSize) {
        return false; // Ship goes out of bounds horizontally
      }
    }
    return true; // Ship can be placed
  }