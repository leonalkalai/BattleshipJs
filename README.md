# 🛡️ Battlefield Game

**Battlefield <img src="screenshots/js.png" alt="JavaScript Logo" width="30" style="vertical-align: middle; border-radius: 5px; margin-bottom: -5px;">** is a classic game of strategy and fun, inspired by the timeless **Battleship** game. Play against an intelligent computer opponent and test your tactical skills in an exciting battle!

## 🎮 Features

- 🕹️ **Interactive Gameplay**: Place your ships and attack your opponent in an intuitive grid-based interface.
- 🤖 **Smart AI Opponent**: The computer switches strategies between random and focused attacks for a challenging experience.
- 🎨 **Responsive Design**: Optimized for various devices, ensuring a seamless experience on both desktop and mobile.
- ⚡ **Dynamic Effects**: War sounds and modern UI for enhanced gameplay.

## 🚀 Live Demo

Check out the live version of the game *[here](https://leonalkalai.github.io/BattleshipJs/)*.

## 📸 Screenshots

<dl>
  <dt>Game Start</dt>
</dl>

<img src="screenshots/BattleshipJs-startgame.png" alt="start game" width="650">

<dl>
  <dt>Gameplay</dt>
</dl>

<img src="screenshots/BattleshipJs-inprogressgame.png" alt="in progress game" width="650">

<dl>
  <dt>Game Over</dt>
</dl>

<img src="screenshots/BattleshipJs-endgame.png" alt="end game" width="650">

## 🛠️ Technologies Used

- **HTML5**: Markup structure.
- **CSS3**: Styling and responsive design.
- **JavaScript**: Game logic and interactivity.

## 📂 Project Structure

📁 battleship_game
    The root directory of the project, containing all files and folders necessary 
    to run and maintain the Battleship game application.

    ├── 📁 public
        Contains static resources served directly to the browser, 
        including images, fonts, and sound effects.

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
        │           Sound effects like explosions, hits, 
                    and victory or defeat notifications.

    ├── 📁 src
        The source folder, containing all core files, scripts, and styles
        needed for the development and functionality of the game.

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
        │       The main folder for JavaScript files, divided into modules for easier 
                management and scalability.
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
        │               Creates and manages all interactive buttons in the game 
                        (e.g., "Start Game").
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
        │           Focuses on updating and managing DOM elements 
                    dynamically during gameplay.
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
        │               Handles game initialization, resetting states
                        and preparing the game boards.

        │   ├── 📁 styles
        │       Contains CSS files for styling the game, 
                including layouts, themes, and responsive design.

        │   └── main.js
        │       The main JavaScript entry point, combining modules 
                and initializing the game.

    ├── index.html
        The main HTML file and entry point for the application, 
        defining the structure and linking resources.

    └── README.md
        The project's documentation file, 
        containing instructions and descriptions information.

    └── LICENSE
        The license linked to in the README    


## 📖 How to Play

 Check out the live version of the game *[here](https://leonalkalai.github.io/BattleshipJs/)*. 

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


## ⭐Credits and attributions

This project was made possible with the help of:

**Downloaded from Freepik**
[Js icon | designed by Smashicons](https://www.freepik.com/icon/js_541509)
[Flame pack in flat design | designed by Freepik](https://www.freepik.com/free-vector/flame-pack-flat-design_1083012.htm)
[Ghost text effect, editable horror and cartoon text style designed by NACreative](https://www.freepik.com/free-vector/ghost-text-effect-editable-horror-cartoon-text-style_19308092.htm)
**Downloaded from sweezy-cursors**
[wood cursor | designed by sweezy-cursors](https://sweezy-cursors.com/cursor/wood/)
**Downloaded from istockphoto**
[Set of underwater objects stock illustration istockphoto | designed by Nearbirds](https://www.istockphoto.com/vector/set-of-underwater-objects-gm518806602-90234929?clarity=false)
















## License 🛡️
This project is licensed under the [Leon Kountouras] Proprietary License.  
All rights reserved. For more details, see the [LICENSE](LICENSE) file. 

