import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { defineConfig } from "vite";
import path from "path";

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      "sortAttrs",
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 100,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
  cache: false,
  cacheLocation: undefined,
};

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
        createBoardPattern:
          "./src/js/createDOM/createBoard/createBoardPattern.js",
        createBoardTitles:
          "./src/js/createDOM/createBoard/createBoardTitles.js",
        createButtons: "./src/js/createDOM/createButtons.js",
        createContainer: "./src/js/createDOM/createContainer.js",
        createGame: "./src/js/createDOM/createGame.js",
        createHeader: "./src/js/createDOM/createHeader.js",
        createMain: "./src/js/createDOM/createMain.js",
        // renderDOM files (game logic, helper functions, init)
        canPlaceShip:
          "./src/js/renderDOM/gameLogic/handlePlacement/canPlaceShip.js",
        handleShipPlacement:
          "./src/js/renderDOM/gameLogic/handlePlacement/handleShipPlacement.js",
        placeEnemyShips:
          "./src/js/renderDOM/gameLogic/handlePlacement/placeEnemyShips.js",
        placeHumanShips:
          "./src/js/renderDOM/gameLogic/handlePlacement/placeHumanShips.js",
        placeShip: "./src/js/renderDOM/gameLogic/handlePlacement/placeShip.js",
        preventClickHumanBoard:
          "./src/js/renderDOM/gameLogic/handlePlacement/preventClickHumanBoard.js",
        toggleShipRotation:
          "./src/js/renderDOM/gameLogic/handlePlacement/toggleShipRotation.js",
        attack: "./src/js/renderDOM/gameLogic/attack.js",
        checkShipDestroyed:
          "./src/js/renderDOM/gameLogic/checkShipDestroyed.js",
        checkWin: "./src/js/renderDOM/gameLogic/checkWin.js",
        enemyTurn: "./src/js/renderDOM/gameLogic/enemyTurn.js",
        GameState: "./src/js/renderDOM/gameLogic/GameState.js",
        playSoundEffects: "./src/js/renderDOM/gameLogic/playSoundEffects.js",
        restartGame: "./src/js/renderDOM/gameLogic/restartGame.js",
        startGame: "./src/js/renderDOM/gameLogic/startGame.js",
        updateShipStatus: "./src/js/renderDOM/gameLogic/updateShipStatus.js",
        updateTurnIndicator:
          "./src/js/renderDOM/gameLogic/updateTurnIndicator.js",
        // helper functions
        helperFunctionsClass:
          "./src/js/renderDOM/helperFunctions/helperFunctionsClass.js",
        // initGame
        init: "./src/js/renderDOM/initGame/init.js",
        initGame: "./src/js/renderDOM/initGame/initGame.js",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo && chunkInfo.facadeModuleId) {
            const path = chunkInfo.facadeModuleId
              .split("/")
              .slice(1)
              .join("/")
              .replace("shared/battleship_game/src/", "");

            // Prevent .html from being processed as a JS chunk
            if (path.endsWith(".html")) {
              return path
                .replace("shared/battleship_game/", "")
                .replace(".html", ".js"); // Ensure HTML files are not processed here
            }

            return `${path}`;
          }
          return "fallback.js"; // Fallback if the path is not found
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo && chunkInfo.facadeModuleId) {
            const path = chunkInfo.facadeModuleId
              .split("/")
              .slice(1)
              .join("/")
              .replace("shared/battleship_game/src/", "");
            return `${path}`;
          }
          return "fallback.js"; // Fallback if the path is not found
        },
        // assetFileNames: ({ names = [] }) => {
        //   const [name = ''] = names;
        //   if (/\.(eot|ttf|woff|woff2)$/i.test(name)) {
        //     return 'assets/fonts/[name][extname]';
        //   } else if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
        //     return 'assets/images/[name][extname]';
        //   }else if (/\.(mp3)$/i.test(name)) {
        //     return 'assets/sounds/[name][extname]';
        //   }

        //   return '[name]-[hash][extname]';
        // },
        assetFileNames: (assetInfo) => {
          if (!assetInfo || !assetInfo.name) {
            return "assets/fallback"; // Fallback if the asset name is missing
          }

          const extType = assetInfo.name.split(".").pop(); // Get file extension

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/${assetInfo.name}`;
          }
          if (/mp3/i.test(extType)) {
            return `assets/sounds/${assetInfo.name}`;
          }
          if (/eot|ttf|woff|woff2/i.test(extType)) {
            return `assets/fonts/${assetInfo.name}`;
          }
          return `assets/${assetInfo.name}`;
        },
      },
    },
  },
  base: "/BattleshipJs/", // Base path for GitHub Pages deployment
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      svg: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "sortAttrs" },
        ],
      },
    }),
  ],
});
