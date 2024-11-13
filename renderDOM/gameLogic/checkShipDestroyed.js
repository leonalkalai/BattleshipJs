const { gameState } = await import ('./GameState.js');

// Function to check if each ship type is destroyed
export function checkShipDestroyed(shipsArray) {

    const {
        boards,
        boardSize,
        shipSizes,
        shipNames,
        playersList
      } = gameState;


  const playerBoardString = shipsArray[0].parentElement.getAttribute("id"); // find player
  const playerBoard = playerBoardString.replace("-board", "-ships-list");
  const chosenPlayerBoard = document.querySelector(
    `${
      playerBoard === "enemy-ships-list"
        ? "#enemy-ships-list"
        : "#human-ships-list"
    }`
  );

  const playerBoardObject = playerBoardString.replace("-Board", "");
  const destroyedShipStatusName = `${playerBoardObject}DestroyedShipStatus`;

  // Group ships by type inside the function
  const ships = {};

  // Create a parent object to hold the dynamic key
  const destroyedShipStatusObject = {};

  // Object to hold the destruction status of each ship
  const playerName = playerBoardString.replace("-board", "");

  shipNames.forEach((name) => {
    ships[name] = shipsArray.filter((element) =>
      element.classList.contains(name)
    );
    destroyedShipStatusObject[`${name}`] = ships[name].every((cell) =>
      cell.classList.contains("hit")
    );
    if (destroyedShipStatusObject[name]) {
      const boardSelector = `${
        playerBoard === "enemy-ships-list" ? "enemy" : "human"
      }`;
      const boardSelectorShipName = document.querySelector(
        `#${boardSelector}-ship-${name}-name`
      );
      //const boardSelectorShipImage = document.querySelector(`#${boardSelector}-ship-${name}-name > img`);
      boardSelectorShipName.classList.add("flames");
      const boardSelectorShipNameStatus = document.querySelector(
        `#${boardSelector}-ship-${name}-status`
      );
      boardSelectorShipName.style.textDecoration = "line-through";
      boardSelectorShipNameStatus.innerHTML =
        "<img src='./images/skull-and-crossbones.svg' alt='cruiser'><span>Destroyed</span>";
      console.log(boardSelector + "_" + name + " is destroyed");
    }
  });

  //check if all ships are destroyed
  let destroyedShipStatusResult = {};

  destroyedShipStatusResult[playerName] = Object.values(
    destroyedShipStatusObject
  ).every((value) => value === true);

  // console.log("destroyedShipStatusObject =>: ", destroyedShipStatusObject);
  // console.log("destroyedShipStatusResult =>: ", destroyedShipStatusResult);

  return [destroyedShipStatusObject, destroyedShipStatusResult];
}
