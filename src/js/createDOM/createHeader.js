import{helperFunctionsClass as l}from"../renderDOM/helperFunctions/helperFunctionsClass.js";import"../../../../../fallback.js";function s(){const c=l.initializeHtmlElements(),t=document.createElement("header"),d=document.createElement("h1"),n=document.createElement("img");n.src="./assets/images/logo.svg",n.alt="logo",d.appendChild(n);const e=document.createElement("div");e.id="interface-container",e.classList.add("wrap");const i=document.createElement("div");i.id="turn-indicator";const a=document.createElement("div");a.id="message",a.textContent="Place your ships",e.appendChild(i),e.appendChild(a),t.appendChild(d),t.appendChild(e),c.body.appendChild(t)}export{s as createHeader};
