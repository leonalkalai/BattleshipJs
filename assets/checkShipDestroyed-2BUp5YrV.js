import{_ as h}from"./index-BT-ou97J.js";const{gameState:u}=await h(()=>import("./GameState-COIyZKUR.js"),[]);function g(o){const{boards:y,boardSize:S,shipSizes:m,shipNames:n,playersList:b}=u,r=o[0].parentElement.getAttribute("id"),i=r.replace("-board","-ships-list");document.querySelector(`${i==="enemy-ships-list"?"#enemy-ships-list":"#human-ships-list"}`),r.replace("-Board","");const a={},s={},p=r.replace("-board","");n.forEach(e=>{if(a[e]=o.filter(t=>t.classList.contains(e)),s[`${e}`]=a[e].every(t=>t.classList.contains("hit")),s[e]){const t=`${i==="enemy-ships-list"?"enemy":"human"}`,l=document.querySelector(`#${t}-ship-${e}-name`);l.classList.add("flames");const d=document.querySelector(`#${t}-ship-${e}-status`);l.style.textDecoration="line-through",d.innerHTML="<img src='../../assets/images/hit.svg' alt='cruiser'><span>Destroyed</span>",console.log(t+"_"+e+" is destroyed")}});let c={};return c[p]=Object.values(s).every(e=>e===!0),[s,c]}export{g as checkShipDestroyed};
