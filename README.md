# 🛡️ Battlefield Game

**Battlefield**[![javascript](https://cdn3.emoji.gg/emojis/8621-javascript.png)](https://emoji.gg/emoji/8621-javascript) is a classic game of strategy and fun, inspired by the timeless **Battleship** game. Play against an intelligent computer opponent and test your tactical skills in an exciting battle!

## 🎮 Features

- 🕹️ **Interactive Gameplay**: Place your ships and attack your opponent in an intuitive grid-based interface.
- 🤖 **Smart AI Opponent**: The computer switches strategies between random and focused attacks for a challenging experience.
- 🎨 **Responsive Design**: Optimized for various devices, ensuring a seamless experience on both desktop and mobile.
- ⚡ **Dynamic Effects**: War sounds and modern UI for enhanced gameplay.

## 🚀 Live Demo

Check out the live version of the game [here](#). *![game URL](https://leonalkalai.github.io/BattleshipJs/)*

## 📸 Screenshots

![Game Start] 
(screenshots/BattleshipJs-startgame.png)

![Gameplay] 
(screenshots/BattleshipJs-inprogressgame.png)

![Game Over]
(screenshots/BattleshipJs-endgame.png)

## 🛠️ Technologies Used

- **HTML5**: Markup structure.
- **CSS3**: Styling and responsive design.
- **JavaScript**: Game logic and interactivity.

## 📂 Project Structure

📁 battleship_game
    The root directory of the project, containing all files and folders necessary to run and maintain the Battleship game application.

    ├── 📁 public
        Contains static resources served directly to the browser, including images, fonts, and sound effects.

        │   └── 📁 assets
        │       All public assets required for the game's visuals and sound.
        │       
        │       ├── 📁 fonts
        │           Custom font files used for typography in the game.
        │       
        │       ├── 📁 images
        │           Static images such as icons, backgrounds, and visual assets.
        │       
        │       └── 📁 sounds
        │           Sound effects like explosions, hits, and victory or defeat notifications.

    ├── 📁 src
        The source folder, containing all core files, scripts, and styles needed for the development and functionality of the game.

        │   ├── 📁 assets
        │       Development-specific assets, including raw images, fonts, and sounds.
        │       
        │       ├── 📁 fonts
        │           Development font files used in the application.
        │       
        │       ├── 📁 images
        │           Images or sprites used during the development phase.
        │       
        │       └── 📁 sounds
        │           Development sound files for testing or processing.

        │   ├── 📁 js
        │       The main folder for JavaScript files, divided into modules for easier management and scalability.
        │       
        │       ├── 📁 createDOM
        │           Handles dynamic creation of DOM elements for the game.
        │           
        │           ├── 📁 createBoard
        │               Manages the game board's creation and layout.
        │               
        │               ├── createBoard.js
        │                   Generates the main game board dynamically.
        │               
        │               ├── createBoardPattern.js
        │                   Applies custom visual patterns (e.g., colors) to the board.
        │               
        │               └── createBoardTitles.js
        │                   Adds titles or labels to identify human and enemy boards.
        │           
        │           ├── 📁 createTables
        │               Handles the creation of tables to display human and enemy ship lists.
        │               
        │               ├── createShipsTableContainer.js
        │                   Creates the container to hold ship tables.
        │               
        │               └── createShipsTables.js
        │                   Dynamically generates the ship tables for both players.
        │           
        │           ├── createButtons.js
        │               Creates and manages all interactive buttons in the game (e.g., "Start Game").
        │           
        │           ├── createContainer.js
        │               Dynamically generates generic containers for layout and grouping.
        │           
        │           ├── createGame.js
        │               Contains the setup logic for initializing the game.
        │           
        │           ├── createHeader.js
        │               Creates the main header for the web application.
        │           
        │           └── createMain.js
        │               Builds the primary layout and sections of the game interface.

        │       ├── 📁 renderDOM
        │           Focuses on updating and managing DOM elements dynamically during gameplay.
        │           
        │           ├── 📁 gameLogic
        │               Contains logic and mechanics for gameplay.
        │               
        │               ├── 📁 handlePlacement
        │                   Manages ship placement logic on the game grid.
        │           
        │           ├── 📁 helperFunctions
        │               Utility functions to simplify and reuse common operations.
        │           
        │           └── 📁 initGame
        │               Handles game initialization, resetting states, and preparing the game boards.

        │   ├── 📁 styles
        │       Contains CSS files for styling the game, including layouts, themes, and responsive design.

        │   └── main.js
        │       The main JavaScript entry point, combining modules and initializing the game.

    ├── index.html
        The main HTML file and entry point for the application, defining the structure and linking resources.

    └── README.md
        The project's documentation file, containing instructions, descriptions, and contributor information.


## 📖 How to Play

 Check out the live version of the game [here](#). *![game URL](https://leonalkalai.github.io/BattleshipJs/)*

**Instructions**
├── Place your ships on the board by clicking on the human board.
├── Use the rotate button to rotate ships horizontally or vertically.
├── When you place all of your ships press start game (enemy will automatically place ships on enemy board).
├── Attack the enemy board and sink all their ships to win.

💡 Game Rules

Each player (you and the computer) has a fleet of ships to place on the board.
Take turns attacking cells on the enemy's board.
The first player to sink all enemy's ships wins.

🖋️ Future Enhancements
🌟 AI strategy enhancement.
🌍 Keep game score and points.
💥 Advanced animations for attacks and explosions.


## License 🛡️
This project is licensed under the [Leon Kountouras] Proprietary License.  
All rights reserved. For more details, see the [LICENSE](LICENSE) file. 

