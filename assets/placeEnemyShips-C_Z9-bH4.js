const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/canPlaceShip-BhGCoMxH.js","assets/GameState-COIyZKUR.js","assets/placeShip-D5heY7Br.js"])))=>i.map(i=>d[i]);
import{_ as d}from"./index-BT-ou97J.js";import{gameState as p}from"./GameState-COIyZKUR.js";const{canPlaceShip:u}=await d(()=>import("./canPlaceShip-BhGCoMxH.js"),__vite__mapDeps([0,1])),{placeShip:S}=await d(()=>import("./placeShip-D5heY7Br.js"),__vite__mapDeps([2,1]));function g(){const{boards:o,boardSize:s,shipSizes:n,shipNames:i,playersList:f}=p;for(let e=0;e<n.length;e++){let c=!1;for(;!c;){const r=Math.floor(Math.random()*s*s),m=n[e],h=i[e],_=Math.random()<.5;if(p.isHorizontal=_,u(r,m,o.enemyBoard)){S(r,m,h,o.enemyBoard),c=!0;const a=document.querySelector(`#enemy-ship-${i[e]}-status`);a.textContent="";const t=document.createElement("img");t.src="../assets/images/checkmark-icon.svg",t.alt="checkmark",t.classList.add("checkmark");const l=document.createElement("span");l.textContent="Placed",a.appendChild(l),a.appendChild(t)}}}}export{g as placeEnemyShips};
