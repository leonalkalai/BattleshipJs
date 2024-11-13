// Ensure the selectors are defined after the DOM has loaded
// htmlElements.js
export function initializeHtmlElements() {
    return {
      body: document.querySelector("body"),
      buttonsContainer: document.getElementById("buttons-container"),
      startButton: document.getElementById("start-button"),
      restartButton: document.getElementById("restart-button"),
      rotateButton: document.getElementById("rotate-button"),
      interfaceContainer: document.getElementById("interface-container"),
      message: document.getElementById("message"),
      turnIndicator: document.getElementById("turn-indicator"),
    };
  }
  