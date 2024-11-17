import { defineConfig } from "vite";
import path from "path";


export default defineConfig({
  root: "./", // Set the root to the current directory (project root)
  build: {
    outDir: "./dist", // Output directory for production build
    target: "esnext",
    assetsDir: "assets", // Keep the assets directory structure
    rollupOptions: {
      input: {
        index: "./index.html", // Entry HTML file (relative to the root directory)
        main: "./src/main.js",
        // createDOM files
        createBoard: "./src/js/createDOM/createBoard/createBoard.js",
        createBoardPattern: "./src/js/createDOM/createBoard/createBoardPattern.js",
        createBoardTitles: "./src/js/createDOM/createBoard/createBoardTitles.js",
        createButtons: "./src/js/createDOM/createButtons.js",
        createContainer: "./src/js/createDOM/createContainer.js",
        createGame: "./src/js/createDOM/createGame.js",
        createHeader: "./src/js/createDOM/createHeader.js",
        createMain: "./src/js/createDOM/createMain.js",
        // renderDOM files (game logic, helper functions, init)
        canPlaceShip: "./src/js/renderDOM/gameLogic/handlePlacement/canPlaceShip.js",
        handleShipPlacement: "./src/js/renderDOM/gameLogic/handlePlacement/handleShipPlacement.js",
        placeEnemyShips: "./src/js/renderDOM/gameLogic/handlePlacement/placeEnemyShips.js",
        placeHumanShips: "./src/js/renderDOM/gameLogic/handlePlacement/placeHumanShips.js",
        placeShip: "./src/js/renderDOM/gameLogic/handlePlacement/placeShip.js",
        preventClickHumanBoard: "./src/js/renderDOM/gameLogic/handlePlacement/preventClickHumanBoard.js",
        toggleShipRotation: "./src/js/renderDOM/gameLogic/handlePlacement/toggleShipRotation.js",
        attack: "./src/js/renderDOM/gameLogic/attack.js",
        checkShipDestroyed: "./src/js/renderDOM/gameLogic/checkShipDestroyed.js",
        checkWin: "./src/js/renderDOM/gameLogic/checkWin.js",
        enemyTurn: "./src/js/renderDOM/gameLogic/enemyTurn.js",
        GameState: "./src/js/renderDOM/gameLogic/GameState.js",
        playSoundEffects: "./src/js/renderDOM/gameLogic/playSoundEffects.js",
        restartGame: "./src/js/renderDOM/gameLogic/restartGame.js",
        startGame: "./src/js/renderDOM/gameLogic/startGame.js",
        updateShipStatus: "./src/js/renderDOM/gameLogic/updateShipStatus.js",
        updateTurnIndicator: "./src/js/renderDOM/gameLogic/updateTurnIndicator.js",
        // helper functions
        helperFunctionsClass: "./src/js/renderDOM/helperFunctions/helperFunctionsClass.js",
        selectBoardSelector: "./src/js/renderDOM/helperFunctions/selectBoardSelector.js",
        // initGame
        init: "./src/js/renderDOM/initGame/init.js",
        initGame: "./src/js/renderDOM/initGame/initGame.js",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo && chunkInfo.facadeModuleId) {
            const path = chunkInfo.facadeModuleId.split('/').slice(1).join('/').replace("shared/battleship_game/src/", "");
            
          //  console.log(path.replace("shared/battleship_game/src/", ""));

             // Prevent .html from being processed as a JS chunk
             if (path.endsWith('.html')) {

              return path.replace("shared/battleship_game/", "").replace(".html", ".js"); // Ensure HTML files are not processed here
            }

            return `${path}`;
          }
          return 'fallback.js'; // Fallback if the path is not found
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo && chunkInfo.facadeModuleId) {
            const path = chunkInfo.facadeModuleId.split('/').slice(1).join('/').replace("shared/battleship_game/src/", "");
            return `${path}`;
          }
          return 'fallback.js'; // Fallback if the path is not found
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo || !assetInfo.name) {
            return 'assets/fallback'; // Fallback if the asset name is missing
          }

          const extType = assetInfo.name.split('.').pop(); // Get file extension

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
           
            return `assets/images/${assetInfo.name}`;
          }
          if (/mp3/i.test(extType)) {
            return `assets/sounds/${assetInfo.name}`;
          }
          if (/eot|ttf|woff|woff2/i.test(extType)) {
            console.log(`${assetInfo.name}`);
            return `assets/fonts/${assetInfo.name}`;
          }
          return `assets/${assetInfo.name}`;
        },
      },
    },
  },
  base: "/BattleshipJs/", // Base path for GitHub Pages deployment
});
