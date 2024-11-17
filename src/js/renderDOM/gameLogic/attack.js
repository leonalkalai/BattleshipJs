import { helperFunctionsClass } from "../helperFunctions/helperFunctionsClass.js";
import { checkShipDestroyed } from "./checkShipDestroyed.js";
import { playSoundEffects } from "./playSoundEffects.js";

// Attack function
export function attack(cell, index, ships, board, attacker, elements) {
  helperFunctionsClass.toggleClassWithTimeout(cell, "highlight", 1000);
  if (cell.classList.contains("ship")) {
    cell.classList.add("hit");
    elements.message.textContent = "Its a Hit!";
    setTimeout(() => {
      playSoundEffects("hit");
    }, 500);
  } else {
    cell.classList.add("miss");
    elements.message.textContent = "You missed!";
    setTimeout(() => {
      playSoundEffects("miss");
    }, 500);
  }
  playSoundEffects("shot");
  checkShipDestroyed(ships);
}
