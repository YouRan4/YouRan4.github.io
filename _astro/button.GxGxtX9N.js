import{r as c}from"./index.DP23ewiS.js";import{d as C,j as w,S as j,c as A}from"./index.DVUDLxjD.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,e,n)=>n?n.toUpperCase():e.toLowerCase()),f=r=>{const t=N(r);return t.charAt(0).toUpperCase()+t.slice(1)},p=(...r)=>r.filter((t,e,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===e).join(" ").trim(),_=r=>{for(const t in r)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=c.forwardRef(({color:r="currentColor",size:t=24,strokeWidth:e=2,absoluteStrokeWidth:n,className:s="",children:a,iconNode:v,...u},m)=>c.createElement("svg",{ref:m,...E,width:t,height:t,stroke:r,strokeWidth:n?Number(e)*24/Number(t):e,className:p("lucide",s),...!a&&!_(u)&&{"aria-hidden":"true"},...u},[...v.map(([i,o])=>c.createElement(i,o)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=(r,t)=>{const e=c.forwardRef(({className:n,...s},a)=>c.createElement(L,{ref:a,iconNode:t,className:p(`lucide-${V(f(r))}`,`lucide-${r}`,n),...s}));return e.displayName=f(r),e},h=r=>typeof r=="boolean"?`${r}`:r===0?"0":r,x=C,O=(r,t)=>e=>{var n;if(t?.variants==null)return x(r,e?.class,e?.className);const{variants:s,defaultVariants:a}=t,v=Object.keys(s).map(i=>{const o=e?.[i],l=a?.[i];if(o===null)return null;const d=h(o)||h(l);return s[i][d]}),u=e&&Object.entries(e).reduce((i,o)=>{let[l,d]=o;return d===void 0||(i[l]=d),i},{}),m=t==null||(n=t.compoundVariants)===null||n===void 0?void 0:n.reduce((i,o)=>{let{class:l,className:d,...y}=o;return Object.entries(y).every(k=>{let[b,g]=k;return Array.isArray(g)?g.includes({...a,...u}[b]):{...a,...u}[b]===g})?[...i,l,d]:i},[]);return x(r,v,m,e?.class,e?.className)},$=O("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",muted:"bg-muted text-foreground hover:bg-muted/80",ghost:"hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function R({className:r,variant:t,size:e,asChild:n=!1,...s}){const a=n?j:"button";return w.jsx(a,{"data-slot":"button",className:A($({variant:t,size:e,className:r})),...s})}export{R as B,$ as b,P as c};
