function c(){document.querySelectorAll(".boardh2container").forEach((e,t)=>{const r=e.querySelector("p"),o=e.querySelector("h2");r.textContent=`${t===1?"AI":"human"}`,o.textContent=`Player ${t+1}`,o.classList.add(`${t===1?"ai":"human"}`)})}export{c as createBoardTitles};