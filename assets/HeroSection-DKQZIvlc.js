import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,n,o as r,r as i,t as a}from"./three-drei-9oHUk10R.js";import{m as o}from"./three-core-DtzPsf4G.js";var s=e(r(),1),c=t(),l=50,u=8,d=8;function f(){return new o({transparent:!0,uniforms:{map:{value:null},opacity:{value:1},blurAmount:{value:0},scrollForce:{value:0},time:{value:0},isHovered:{value:0}},vertexShader:`
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          flagWave += sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
        }
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `})}function p({texture:e,position:t,scale:n,material:r}){let[i,a]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{r.uniforms.map.value=e},[r,e]),(0,s.useEffect)(()=>{r.uniforms.isHovered.value=+!!i},[i,r]),(0,c.jsx)(`mesh`,{position:t,scale:n,material:r,onPointerEnter:()=>a(!0),onPointerLeave:()=>a(!1),children:(0,c.jsx)(`planeGeometry`,{args:[1,1,32,32]})})}function m({images:e,speed:t=1.2,visibleCount:n=12,isActive:r}){let[o,m]=(0,s.useState)(0),[h,g]=(0,s.useState)(!0),_=(0,s.useRef)(Date.now()),v=(0,s.useMemo)(()=>e.map(e=>typeof e==`string`?{src:e,alt:``}:e),[e]),y=a(v.map(e=>e.src)),b=(0,s.useMemo)(()=>Array.from({length:n},()=>f()),[n]),x=(0,s.useMemo)(()=>{let e=[];for(let t=0;t<n;t+=1){let n=t*2.618%(Math.PI*2),r=(t*1.618+Math.PI/3)%(Math.PI*2),i=t%3*1.2,a=(t+1)%4*.8;e.push({x:Math.sin(n)*i*u/3,y:Math.cos(r)*a*d/4})}return e},[n]),S=v.length,C=(0,s.useRef)(Array.from({length:n},(e,t)=>({index:t,z:n>0?l/n*t%l:0,imageIndex:S>0?t%S:0,x:x[t]?.x??0,y:x[t]?.y??0,worldZ:0})));(0,s.useEffect)(()=>{C.current=Array.from({length:n},(e,t)=>({index:t,z:n>0?l/n*t%l:0,imageIndex:S>0?t%S:0,x:x[t]?.x??0,y:x[t]?.y??0,worldZ:0}))},[x,S,n]);let w=(0,s.useCallback)(e=>{r&&(m(n=>n+e.deltaY*.01*t),g(!1),_.current=Date.now())},[r,t]),T=(0,s.useCallback)(e=>{if(r){if(e.key===`ArrowUp`||e.key===`ArrowLeft`)m(e=>e-2*t);else if(e.key===`ArrowDown`||e.key===`ArrowRight`)m(e=>e+2*t);else return;g(!1),_.current=Date.now()}},[r,t]);return(0,s.useEffect)(()=>{let e=document.getElementById(`top`);if(e)return e.addEventListener(`wheel`,w,{passive:!0}),document.addEventListener(`keydown`,T),()=>{e.removeEventListener(`wheel`,w),document.removeEventListener(`keydown`,T)}},[T,w]),(0,s.useEffect)(()=>{let e=window.setInterval(()=>{Date.now()-_.current>3e3&&g(!0)},1e3);return()=>window.clearInterval(e)},[]),i((e,t)=>{h&&r&&m(e=>e+.3*t),m(e=>e*.95);let i=e.clock.getElapsedTime();b.forEach(e=>{e.uniforms.time.value=i,e.uniforms.scrollForce.value=o});let a=S>0?n%S||S:0,s=l/2;C.current.forEach((e,n)=>{let r=e.z+o*t*10,i=0,c=0;r>=l?(i=Math.floor(r/l),r-=l*i):r<0&&(c=Math.ceil(-r/l),r+=l*c),i>0&&a>0&&S>0&&(e.imageIndex=(e.imageIndex+i*a)%S),c>0&&a>0&&S>0&&(e.imageIndex=((e.imageIndex-c*a)%S+S)%S),e.z=(r%l+l)%l,e.x=x[n]?.x??0,e.y=x[n]?.y??0,e.worldZ=e.z-s;let u=e.z/l,d=1,f=0;u<.05?d=0:u<=.25?d=(u-.05)/.2:u>=.4&&u<=.43?d=1-(u-.4)/.03:u>.43&&(d=0),u<.1?f=8*(1-u/.1):u>=.4&&u<=.43?f=8*((u-.4)/.03):u>.43&&(f=8),b[n].uniforms.opacity.value=Math.max(0,Math.min(1,d)),b[n].uniforms.blurAmount.value=Math.max(0,Math.min(8,f))})},0),v.length===0?null:(0,c.jsx)(c.Fragment,{children:C.current.map((e,t)=>{let n=y[e.imageIndex],r=b[t];if(!n||!r)return null;let i=n.image?n.image.width/n.image.height:1,a=i>1?[2*i,2,1]:[2,2/i,1];return(0,c.jsx)(p,{texture:n,position:[e.x,e.y,e.worldZ],scale:a,material:r},e.index)})})}function h({images:e,isActive:t}){let[r,i]=(0,s.useState)(!0);return(0,s.useEffect)(()=>{try{let e=document.createElement(`canvas`);e.getContext(`webgl`)||e.getContext(`experimental-webgl`)||i(!1)}catch{i(!1)}},[]),r?(0,c.jsx)(`div`,{className:`hero-gallery absolute inset-0 h-screen w-full`,children:(0,c.jsx)(n,{camera:{position:[0,0,0],fov:55},gl:{antialias:!0,alpha:!0},children:(0,c.jsx)(m,{images:e,isActive:t})})}):(0,c.jsx)(`div`,{className:`hero-gallery grid h-screen w-full grid-cols-2 gap-3 overflow-hidden p-4 md:grid-cols-4`,children:e.slice(0,8).map(e=>(0,c.jsx)(`div`,{className:`flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.05] p-8`,children:(0,c.jsx)(`img`,{src:e.src,alt:e.alt,className:`h-20 w-20 object-contain md:h-28 md:w-28`})},e.alt))})}function g({images:e}){let t=(0,s.useRef)(null),[n,r]=(0,s.useState)(!0);return(0,s.useEffect)(()=>{let e=t.current;if(!e)return;let n=new IntersectionObserver(([e])=>{r(e.isIntersecting&&e.intersectionRatio>.35)},{threshold:[.2,.35,.5]});return n.observe(e),()=>n.disconnect()},[]),(0,c.jsxs)(`section`,{id:`top`,ref:t,className:`relative min-h-screen overflow-hidden`,children:[(0,c.jsx)(h,{images:e,isActive:n}),(0,c.jsx)(`div`,{className:`hero-vignette z-[3]`}),(0,c.jsx)(`div`,{className:`pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_26%_36%,rgba(91,232,255,0.18),transparent_22%),radial-gradient(circle_at_76%_32%,rgba(32,185,214,0.14),transparent_22%),linear-gradient(90deg,rgba(2,6,10,0.28),rgba(2,6,10,0.08)_42%,rgba(2,6,10,0.18)_100%)]`}),(0,c.jsx)(`div`,{className:`relative z-10 flex min-h-screen items-center justify-center px-6 pb-10 pt-28`,children:(0,c.jsx)(`div`,{className:`mx-auto flex w-full max-w-7xl items-center justify-center`,children:(0,c.jsxs)(`div`,{className:`max-w-4xl text-center`,children:[(0,c.jsx)(`p`,{className:`mb-5 text-sm font-semibold tracking-[0.18em] text-cyan-200/82 md:text-base`,children:`Hello There!`}),(0,c.jsxs)(`h1`,{className:`text-4xl font-black leading-[0.92] text-white sm:text-5xl md:text-6xl lg:text-[5.15rem]`,children:[(0,c.jsx)(`span`,{className:`mb-1 block`,children:`I'm`}),(0,c.jsx)(`span`,{className:`block`,children:`Muhammad Abuzar`}),(0,c.jsx)(`span`,{className:`mt-3 block text-sm font-semibold tracking-[0.14em] text-white/78 md:text-base`,children:`aka`}),(0,c.jsx)(`span`,{className:`block text-gradient`,children:`ZarScape.`}),(0,c.jsx)(`span`,{className:`mt-3 block text-base font-semibold tracking-[0.14em] text-white/82 md:text-lg`,children:`NodeJS Expert`})]}),(0,c.jsxs)(`div`,{className:`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row`,children:[(0,c.jsx)(`a`,{href:`#projects`,className:`rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform hover:-translate-y-1`,children:`View Work`}),(0,c.jsx)(`a`,{href:`#contact`,className:`rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md transition-transform hover:-translate-y-1`,children:`Start a Project`})]})]})})})]})}export{g as default};