import{gameState as o}from"./GameState.js";function c(n){const e=document.createElement("div");e.classList.add("container");for(const d of o.playersList){const t=document.createElement("div");t.classList.add("board-container");const a=document.createElement("div");a.id=`${d}-board`,a.classList.add("board"),t.appendChild(a),e.appendChild(t)}n.appendChild(e)}export{c as createContainer};
