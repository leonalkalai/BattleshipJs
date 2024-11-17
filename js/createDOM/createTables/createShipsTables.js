import{gameState as b}from"../../renderDOM/gameLogic/GameState.js";import{helperFunctionsClass as y}from"../../renderDOM/helperFunctions/helperFunctionsClass.js";import"../../../fallback.js";async function x(){await y.preloadFiles("images");const C=document.querySelector("#ships-table-container");for(let e=1;e<3;e++){const c=e===1?"human":"enemy",n=document.createElement("div");n.classList.add("row");const l=document.createElement("div"),h=document.createElement("h2");h.textContent=`Player ${e} Ships`,l.appendChild(h),n.appendChild(l);const r=document.createElement("div");r.classList.add("player-ships-list");const s=document.createElement("table");s.setAttribute("id",`${c}-ships-list`);const d=document.createElement("tr"),m=document.createElement("th"),u=document.createElement("th");m.textContent="Ship",u.textContent="Status",d.appendChild(m),d.appendChild(u),s.appendChild(d);const a={};b.shipNames.forEach(t=>{a[`tr-${t}`]=document.createElement("tr");const o=document.createElement("img"),E=new URL(Object.assign({})[`./assets/images/${t}-icon.svg`],import.meta.url).href;o.src=E,o.alt=t;const i=document.createElement("td");i.setAttribute("id",`${c}-ship-${t}-name`);const $=t.charAt(0).toUpperCase()+t.slice(1);i.appendChild(o),i.insertAdjacentHTML("afterbegin",$);const p=document.createElement("td");p.setAttribute("id",`${c}-ship-${t}-status`),p.textContent="Not Placed",a[`tr-${t}`].appendChild(i),a[`tr-${t}`].appendChild(p),s.appendChild(a[`tr-${t}`])}),r.appendChild(s),n.appendChild(r),C.appendChild(n)}}export{x as createShipsTables};
