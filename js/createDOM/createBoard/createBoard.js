import{_ as l}from"../../../fallback.js";import{gameState as c}from"../../renderDOM/gameLogic/GameState.js";const{createBoardPattern:C}=await l(()=>import("./createBoardPattern.js"),[]),{createBoardGlassPattern:u}=await l(()=>import("./createBoardGlassPattern.js"),[]);async function L(t){for(let a=0;a<c.boardSize*c.boardSize;a++){const e=document.createElement("div");e.dataset.index=a,e.classList.add("square"),e.dataset.index[0],e.dataset.index<10?e.dataset.index[0]:e.dataset.index[1],t.appendChild(e)}await u(t);const d=document.createElement("div");d.classList.add("game-board-container"),d.classList.add("board-container"),t.parentElement.prepend(d);const s=document.createElement("div");s.classList.add("board-labels"),s.classList.add("board");for(let a=0;a<10;a++){const e=document.createElement("div");e.classList.add("board-label"),e.textContent=String.fromCharCode(65+a),s.appendChild(e)}const o=document.createElement("div");o.classList.add("row-labels");for(let a=0;a<11;a++){const e=document.createElement("div");e.classList.add("board-label"),e.textContent=a===0?"":a,o.appendChild(e)}const i=document.createElement("div");i.classList.add("column-container"),i.classList.add("container"),t.parentElement.prepend(s),d.appendChild(i),d.appendChild(t),i.appendChild(o);const n=document.createElement("div");n.classList.add("boardh2container");const p=document.createElement("p"),r=document.createElement("img");r.src=`./assets/images/${t.id}.avif`,r.classList.add("boardh2image");const m=document.createElement("h2");n.appendChild(p),n.appendChild(r),n.appendChild(m),t===c.boards.humanBoard?d.prepend(n):d.appendChild(n)}export{L as createBoard};
