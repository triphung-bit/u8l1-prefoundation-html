/* PreFoundation live component runtime. Source of truth: component-library/runtime. */
(function(global){
  'use strict';
  const config={assetBase:'./'};
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const base=value=>{const v=value??config.assetBase;return v.endsWith('/')?v:v+'/'};
  const attr=value=>esc(value).replace(/`/g,'&#96;');
  function attrs(values={}){return Object.entries(values).filter(([,v])=>v!==undefined&&v!==null&&v!==false).map(([k,v])=>` ${k}="${attr(v===true?'':v)}"`).join('')}
  function iconHTML(icon){const paths={reading:'<path d="M10 14c12-4 21-1 22 4v32c-4-5-12-7-22-4zM54 14c-12-4-21-1-22 4v32c4-5 12-7 22-4z"/>',writing:'<path d="M14 46l4-13L43 8l11 11-25 25zM18 33l11 11M39 12l11 11"/>',summary:'<path d="M32 8l7 15 17 2-12 12 3 17-15-8-15 8 3-17L8 25l17-2z"/>'};if(!paths[icon])return '';return `<span class="pf-activity-pill__icon" aria-hidden="true"><svg viewBox="0 0 64 64">${paths[icon]}</svg></span>`;}
  function activityPillHTML({label='Activity',icon='activity',assetBase}={}){
    const long=String(label).length>8?' is-long':'';
    return `<span class="pf-activity-pill" data-pf-component="activity-pill" data-pf-source="canva-page-06"><img class="pf-activity-pill__art" src="${attr(base(assetBase)+'assemblies/activity-pill.svg')}" alt="">${iconHTML(icon)}<span class="pf-activity-pill__label${long}">${esc(label)}</span></span>`;
  }
  function activityBarHTML({label='Activity',title='',icon='activity',assetBase}={}){
    return `<div class="pf-activity-bar" data-pf-component="activity-bar">${activityPillHTML({label,icon,assetBase})}<div class="pf-activity-bar__title">${esc(title)}</div></div>`;
  }
  function pillHTML({text='',tone='red',className=''}={}){return `<span class="pf-section-pill ${attr(className)}" data-pf-component="section-pill" data-tone="${attr(tone)}">${esc(text)}</span>`}
  function badgeHTML({number='',className=''}={}){return `<span class="pf-number-badge ${attr(className)}" data-pf-component="number-badge">${esc(number)}</span>`}
  function instructionCardHTML({number='',text='',className=''}={}){return `<li class="pf-instruction-card ${attr(className)}" data-pf-component="instruction-card">${badgeHTML({number})}<span>${esc(text)}</span></li>`}
  function optionHTML({letter='',text='',state='idle',className='',attributes={}}={}){return `<button class="pf-option-card ${attr(className)}" data-pf-component="option-card" data-state="${attr(state)}"${attrs(attributes)}>${badgeHTML({number:letter})}<span>${esc(text)}</span></button>`}
  function evidenceHTML({label='Evidence:',text='',className=''}={}){return `<p class="pf-evidence-box ${attr(className)}" data-pf-component="evidence-box"><strong>${esc(label)}</strong> ${esc(text)}</p>`}
  function categoryHTML({text='',tone='red',state='idle',className='',attributes={}}={}){return `<button class="pf-category-card ${attr(className)}" data-pf-component="category-card" data-tone="${attr(tone)}" data-state="${attr(state)}"${attrs(attributes)}>${esc(text)}</button>`}
  const factories={
    'activity-pill':activityPillHTML,'activity-bar':activityBarHTML,'section-pill':pillHTML,
    'number-badge':badgeHTML,'instruction-card':instructionCardHTML,'option-card':optionHTML,
    'evidence-box':evidenceHTML,'category-card':categoryHTML
  };
  function mount(host,id,props={}){if(typeof host==='string')host=document.querySelector(host);if(!host)throw new Error('PFUI.mount: host not found');const factory=factories[id];if(!factory)throw new Error('PFUI.mount: unknown component '+id);host.innerHTML=factory(props);return host.firstElementChild}
  function configure(next={}){Object.assign(config,next);return api}
  const api=Object.freeze({version:'1.0.0',configure,mount,activityPillHTML,activityBarHTML,pillHTML,badgeHTML,instructionCardHTML,optionHTML,evidenceHTML,categoryHTML,ids:Object.freeze(Object.keys(factories))});
  global.PFUI=api;
})(window);
