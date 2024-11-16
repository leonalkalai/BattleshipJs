import{gameState as $}from"../../renderDOM/gameLogic/GameState.js";function b(){const C=document.querySelector("#ships-table-container");for(let e=1;e<3;e++){const a=e===1?"human":"enemy",n=document.createElement("div");n.classList.add("row");const l=document.createElement("div"),h=document.createElement("h2");h.textContent=`Player ${e} Ships`,l.appendChild(h),n.appendChild(l);const i=document.createElement("div");i.classList.add("player-ships-list");const s=document.createElement("table");s.setAttribute("id",`${a}-ships-list`);const r=document.createElement("tr"),m=document.createElement("th"),u=document.createElement("th");m.textContent="Ship",u.textContent="Status",r.appendChild(m),r.appendChild(u),s.appendChild(r);const d={};$.shipNames.forEach(t=>{d[`tr-${t}`]=document.createElement("tr");const p=document.createElement("img");p.src=`./../assets/images/icons/${t}.svg`,p.alt=t;const c=document.createElement("td");c.setAttribute("id",`${a}-ship-${t}-name`);const E=t.charAt(0).toUpperCase()+t.slice(1);c.appendChild(p),c.insertAdjacentHTML("afterbegin",E);const o=document.createElement("td");o.setAttribute("id",`${a}-ship-${t}-status`),o.textContent="Not Placed",d[`tr-${t}`].appendChild(c),d[`tr-${t}`].appendChild(o),s.appendChild(d[`tr-${t}`])}),i.appendChild(s),n.appendChild(i),C.appendChild(n)}}export{b as createShipsTables};
