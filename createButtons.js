import { initializeHtmlElements } from "./htmlElements.js";
import { toggleShipRotation } from "./toggleShipRotation.js";

export function createButtons(mainElement, elements) {
    const htmlElements = initializeHtmlElements();
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
        button.addEventListener("click", () => restartGame(elements));
      }
      if (buttonName === "Rotate") {
        button.classList.add("ready");
        button.addEventListener("click", toggleShipRotation);
      }
      button.id = `${buttonName.toLowerCase()}${buttonPrefix}`;
      button.textContent = buttonName;
      buttonsContainer.appendChild(button);
    }
    mainElement.appendChild(buttonsContainer);
  }