import { gameState } from './GameState.js';


// Check if all ships are destroyed
  export function checkWin(ships, player, elements) {
    const allShipsHit = ships.every((cell) => cell.classList.contains("hit"));
    if (allShipsHit) {
      elements.message.classList.add("win");
      elements.message.textContent = `${player} wins!`;
      // Remove the background image
      elements.interfaceContainer.style.backgroundImage = "none";
      elements.turnIndicator.classList.remove("ready");
      elements.restartButton.classList.add("ready");
      elements.interfaceContainer.classList.remove("wrap");
      gameState.gameStarted = false;
      return true;
    }
    return false;
  }