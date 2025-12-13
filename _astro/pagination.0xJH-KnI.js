import{j as n,c as t}from"./index.DVUDLxjD.js";import"./index.DP23ewiS.js";import{c as l,b as p}from"./button.GxGxtX9N.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],m=l("chevron-left",h);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],j=l("chevron-right",f);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],g=l("ellipsis",u);function N({className:i,...s}){return n.jsx("nav",{role:"navigation","aria-label":"pagination","data-slot":"pagination",className:t("mx-auto flex w-full justify-center",i),...s})}function v({className:i,...s}){return n.jsx("ul",{"data-slot":"pagination-content",className:t("flex flex-row items-center gap-1",i),...s})}function r({...i}){return n.jsx("li",{"data-slot":"pagination-item",...i})}function d({className:i,isActive:s,isDisabled:a,size:c="icon",...o}){return n.jsx("a",{"aria-current":s?"page":void 0,"data-slot":"pagination-link","data-active":s,"data-disabled":a,className:t(p({variant:s?"outline":"ghost",size:c}),a&&"pointer-events-none opacity-50",i),...o})}function y({className:i,isDisabled:s,...a}){return n.jsxs(d,{"aria-label":"Go to previous page",size:"default",className:t("gap-1 px-2.5 sm:pl-2.5",i),isDisabled:s,...a,children:[n.jsx(m,{}),n.jsx("span",{className:"hidden sm:block",children:"Previous"})]})}function k({className:i,isDisabled:s,...a}){return n.jsxs(d,{"aria-label":"Go to next page",size:"default",className:t("gap-1 px-2.5 sm:pr-2.5",i),isDisabled:s,...a,children:[n.jsx("span",{className:"hidden sm:block",children:"Next"}),n.jsx(j,{})]})}function b({className:i,...s}){return n.jsxs("span",{"aria-hidden":!0,"data-slot":"pagination-ellipsis",className:t("flex size-9 items-center justify-center",i),...s,children:[n.jsx(g,{className:"size-4"}),n.jsx("span",{className:"sr-only",children:"More pages"})]})}const C=({currentPage:i,totalPages:s,baseUrl:a})=>{const c=Array.from({length:s},(e,x)=>x+1),o=e=>e===1?a:`${a}${e}`;return n.jsx(N,{children:n.jsxs(v,{className:"flex-wrap",children:[n.jsx(r,{children:n.jsx(y,{href:i>1?o(i-1):void 0,isDisabled:i===1})}),c.map(e=>n.jsx(r,{children:n.jsx(d,{href:o(e),isActive:e===i,children:e})},e)),s>5&&n.jsx(r,{children:n.jsx(b,{})}),n.jsx(r,{children:n.jsx(k,{href:i<s?o(i+1):void 0,isDisabled:i===s})})]})})};export{C as default};
