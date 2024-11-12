import { initializeHtmlElements } from "./htmlElements.js";

export function createShipsTableContainer() {
    const htmlElements = initializeHtmlElements();
    const shipsTableContainer = document.createElement("div");
    shipsTableContainer.id = "ships-table-container";
    htmlElements.body.appendChild(shipsTableContainer);
  }