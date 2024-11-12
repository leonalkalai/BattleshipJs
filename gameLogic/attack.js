  // Attack function
  export function attack(cell, index, ships, board, attacker, elements) {
    toggleClassWithTimeout(cell, "highlight", 1000);
    if (cell.classList.contains("ship")) {
      cell.classList.add("hit");
      elements.message.textContent = "Its a Hit!";
    } else {
      cell.classList.add("miss");
      elements.message.textContent = "You missed!";
    }
    checkShipDestroyed(ships);
  }