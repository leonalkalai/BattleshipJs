import{gameState as t}from"../GameState.js";import{helperFunctionsClass as i}from"../../helperFunctions/helperFunctionsClass.js";import{p as n}from"../playSoundEffects.js";import"../../../../../../../fallback.js";function p(){n("rotate");const o=i.initializeHtmlElements().message;t.isHorizontal=!t.isHorizontal;const e=t.isHorizontal?"Horizontal":"Vertical";o.textContent=`orientation: ${e}`}export{p as t};
