//import { initializeHtmlElements } from "./htmlElements.js";
import { helperFunctionsClass } from '../../renderDOM/helperFunctions/helperFunctionsClass.js';

export function createShipsTableContainer() {
   // const htmlElements = initializeHtmlElements();
   const htmlElements = helperFunctionsClass.initializeHtmlElements();
    const shipsTableContainer = document.createElement("div");
    shipsTableContainer.id = "ships-table-container";
    htmlElements.body.appendChild(shipsTableContainer);
  }