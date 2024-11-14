//import { initializeHtmlElements } from "./htmlElements.js";
import { helperFunctionsClass } from '../renderDOM/helperFunctions/helperFunctionsClass.js';
import { toggleShipRotation } from "../renderDOM/gameLogic/handlePlacement/toggleShipRotation.js";
import { restartGame } from "../renderDOM/gameLogic/restartGame.js";

export function createButtons(mainElement) {
    //const htmlElements = initializeHtmlElements();
    const htmlElements = helperFunctionsClass.initializeHtmlElements();
    const buttonNames = ["Start", "Restart", "Rotate"];
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";
    for (const buttonName of buttonNames) {
      const buttonPrefix = "-button";
      const button = document.createElement("button");
      if (buttonName === "Start") {
        button.disabled = true;
      }
      if (buttonName === "Restart") {
        button.addEventListener("click", () => restartGame());
      }
      if (buttonName === "Rotate") {
        button.classList.add("ready");
        button.addEventListener("click", );
        button.addEventListener("touchstart", () => toggleShipRotation());
      }
      button.id = `${buttonName.toLowerCase()}${buttonPrefix}`;
      button.textContent = buttonName;
      buttonsContainer.appendChild(button);
    }
    mainElement.appendChild(buttonsContainer);
  }