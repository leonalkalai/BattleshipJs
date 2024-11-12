import { initializeHtmlElements } from "./htmlElements.js"; // Importing the function from htmlElements.js

export function createHeader() {
    const htmlElements = initializeHtmlElements();
    const headerElement = document.createElement("header");
    const h1Element = document.createElement("h1");
    const imageElement = document.createElement("img");
    imageElement.src = "./images/logo.svg";
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