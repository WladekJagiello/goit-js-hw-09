function t(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}function e(){return 9*Math.random()+1}const r=document.querySelector("body"),n=document.querySelector("[data-start]");n.style.cssText="cursor: pointer;";const o=document.querySelector("[data-stop]");o.style.cssText="cursor: pointer;";const a=document.createElement("div");let d,i;o.after(a),n.addEventListener("click",(()=>{r.style.backgroundColor=t(),d=setInterval((()=>{r.style.backgroundColor=t()}),1e3),i=setInterval((()=>{!function(){a.innerHTML="";let r="";for(let n=0;n<25*e();n+=1)r+=`<div style="width: ${10*e()}px; height: ${10*e()}px; border-radius: 50%; margin-left: ${10*e()}px; margin-top: ${5*e()}px; display: inline-block; background-color: ${t()};"></div>`;a.insertAdjacentHTML("afterbegin",r)}()}),100),n.setAttribute("disabled",""),o.removeAttribute("disabled")})),o.addEventListener("click",(()=>{clearInterval(d),clearInterval(i),o.setAttribute("disabled",""),n.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.bc07fdae.js.map