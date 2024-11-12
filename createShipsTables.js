  
  const { gameState } = await import ('./gameState.js');

  export function createShipsTables() {
    const shipsTableContainer = document.querySelector(
      "#ships-table-container"
    );
    for (let i = 1; i < 3; i++) {
      const playerChecker = i === 1 ? "human" : "enemy";
      // Create a row container
      const row = document.createElement("div");
      row.classList.add("row");

      // Create header for human ships
      const playerShipsHeader = document.createElement("div");
      const playerShipsHeaderText = document.createElement("h2");
      playerShipsHeaderText.textContent = `Player ${i} Ships`;
      playerShipsHeader.appendChild(playerShipsHeaderText);
      row.appendChild(playerShipsHeader);

      // Create player ships list container
      const playerShipsList = document.createElement("div");
      playerShipsList.classList.add("player-ships-list");

      // Create the table and set a unique ID for each player
      const playerShipsTable = document.createElement("table");
      playerShipsTable.setAttribute("id", `${playerChecker}-ships-list`);

      // Create table header row
      const trh = document.createElement("tr");
      const th1 = document.createElement("th");
      const th2 = document.createElement("th");
      th1.textContent = "Ship";
      th2.textContent = "Status";
      trh.appendChild(th1);
      trh.appendChild(th2);
      playerShipsTable.appendChild(trh);

      // Populate ship rows
      const trs = {};
      gameState.shipNames.forEach((name) => {
        trs[`tr-${name}`] = document.createElement("tr");

        // Add the icon to the status cell
        const img = document.createElement("img");
        img.src = `./images/icons/${name}.svg`;
        img.alt = name;

        const td1 = document.createElement("td");
        td1.setAttribute("id", `${playerChecker}-ship-${name}-name`);
        const td1text = name.charAt(0).toUpperCase() + name.slice(1); // capitalize
        td1.appendChild(img);
        td1.insertAdjacentHTML("afterbegin", td1text);

        const td2 = document.createElement("td");
        td2.setAttribute("id", `${playerChecker}-ship-${name}-status`);
        td2.textContent = "Not Placed";

        // Append cells to the row
        trs[`tr-${name}`].appendChild(td1);
        trs[`tr-${name}`].appendChild(td2);
        playerShipsTable.appendChild(trs[`tr-${name}`]);
      });

      // Append the player ships table to the list container
      playerShipsList.appendChild(playerShipsTable);
      row.appendChild(playerShipsList);

      // Append the row to the main ships table container
      shipsTableContainer.appendChild(row);
    }
  }