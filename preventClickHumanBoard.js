import{gameState as a}from"./GameState.js";function n(o){const r=a.boards;r.humanBoard.childNodes.forEach(e=>{e.clickHandler&&(e.removeEventListener("click",e.clickHandler,!1),delete e.clickHandler),e.touchHandler&&(e.removeEventListener("touchstart",e.touchHandler,!1),delete e.touchHandler),e.classList.add("nocursor")}),r.humanBoard.classList.add("nocursor")}export{n as preventClickHumanBoard};
