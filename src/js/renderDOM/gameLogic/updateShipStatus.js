//const { gameState } = await import ('../gameState.js');
import { gameState } from './GameState.js';

// Update the ship status and strike-through ship name
  export function updateShipStatus(shipIndex) {

    const {shipNames} = gameState;

    const shipId = `human-ship-${shipNames[shipIndex]}-status`;

    const shipStatusCell = document.getElementById(shipId);

    shipStatusCell.textContent = ""; // Set status to "Placed" without strikethrough

    // Add the checkmark icon to the placed ship
    const img = document.createElement("img");
    img.src = `./assets/images/checkmark-icon.avif`;
    img.alt = "checkmark";
    img.classList.add("checkmark");

    const shipStatusCellText = document.createElement("span");
    shipStatusCellText.textContent = "Placed";
    shipStatusCell.appendChild(shipStatusCellText);
    shipStatusCell.appendChild(img);

    shipStatusCell.classList.remove("placed"); // Ensure there's no strikethrough on the status
  }