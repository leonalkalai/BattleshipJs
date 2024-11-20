//import { initializeHtmlElements } from "./htmlElements.js"; // Importing the function from htmlElements.js
import { helperFunctionsClass } from '../renderDOM/helperFunctions/helperFunctionsClass.js';


export async function createHeader() {
   // const htmlElements = initializeHtmlElements();
   await helperFunctionsClass.preloadFiles('images');

   const htmlElements = helperFunctionsClass.initializeHtmlElements();
    const headerElement = document.createElement("header");
    const h1Element = document.createElement("h1");
    const imageElement = document.createElement("img");
    imageElement.src = "./assets/images/logo.webp";
    imageElement.alt = "logo";
    h1Element.appendChild(imageElement);
    const interfaceContainerElement = document.createElement("div");
    interfaceContainerElement.id = "interface-container";
    interfaceContainerElement.classList.add("wrap");
    const turnIndicatorElement = document.createElement("div");
    turnIndicatorElement.id = "turn-indicator";
    const messageElement = document.createElement("div");
    messageElement.id = "message";
    messageElement.textContent = "Place your ships";
    interfaceContainerElement.appendChild(turnIndicatorElement);
    interfaceContainerElement.appendChild(messageElement);
    headerElement.appendChild(h1Element);
    headerElement.appendChild(interfaceContainerElement);
    htmlElements.body.appendChild(headerElement);
  }