import{i as c}from"./assets/vendor-4d6948b9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",a={formEl:document.querySelector('.js-search-form[data-id="1"]'),listEl:document.querySelector(".gallery")};a.formEl.addEventListener("submit",u);function u(r){r.preventDefault();const o=r.target.elements.query.value;y(),f(o).then(d).catch(h)}function f(r){const o={q:r,image_type:"photo",key:"42190247-000e45a6447d3626b5dd5a4c9",orientation:"horizontal",safesearch:!0},i=m+"?"+new URLSearchParams(o);return o.q===""?Promise.reject("Empty search query"):fetch(i).then(n=>n.json())}function d(r){const o=p(r.hits);a.listEl.innerHTML=o}function p(r){return r.map(g).join("")}function g(r){const{largeImageURL:o,likes:i,views:n,webformatURL:e,tags:t,comments:s,downloads:l}=r;return`<li class="gallery-item">
      <a class="gallery-link" href="${o}">
        <img class="gallery-image" src="${e}" alt="${t}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b><br>${i}</p>
        <p class="info-item"><b>Views</b><br>${n}</p>
        <p class="info-item"><b>Comments</b><br>${s}</p>
        <p class="info-item"><b>Downloads</b><br>${l}</p>
      </div>
    </li>`}function y(){a.listEl.innerHTML=""}function h(r){console.error("Error:",r),c.error({message:"An error occurred. Please try again later."})}
//# sourceMappingURL=commonHelpers.js.map
