import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,n,o as r,r as i,t as a}from"./three-drei-BOIIpd1a.js";import{h as o,s}from"./three-core-C0Ap7gUK.js";var c=e(r(),1),l=t(),u=50,d=9,f=8,p=8;function m(){return new o({transparent:!0,uniforms:{map:{value:null},opacity:{value:1},blurAmount:{value:0},scrollForce:{value:0},time:{value:0},isHovered:{value:0}},vertexShader:`
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
          vec2 texelSize = (1.0 / vec2(textureSize(map, 0))) * blurAmount;
          vec4 blurred = texture2D(map, vUv) * 0.36;
          blurred += texture2D(map, vUv + vec2(texelSize.x, 0.0)) * 0.16;
          blurred += texture2D(map, vUv - vec2(texelSize.x, 0.0)) * 0.16;
          blurred += texture2D(map, vUv + vec2(0.0, texelSize.y)) * 0.16;
          blurred += texture2D(map, vUv - vec2(0.0, texelSize.y)) * 0.16;
          color = blurred;
        }
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `})}function h({images:e,speed:t=1,visibleCount:n=d,isActive:r}){let o=(0,c.useRef)(Date.now()),h=(0,c.useRef)(0),g=(0,c.useRef)(!0),_=(0,c.useRef)([]),v=(0,c.useMemo)(()=>e.map(e=>typeof e==`string`?{src:e,alt:``}:e),[e]),y=a(v.map(e=>e.src)),b=(0,c.useMemo)(()=>Array.from({length:n},()=>m()),[n]),x=(0,c.useMemo)(()=>{let e=[];for(let t=0;t<n;t+=1){let n=t*2.618%(Math.PI*2),r=(t*1.618+Math.PI/3)%(Math.PI*2),i=t%3*1.2,a=(t+1)%4*.8;e.push({x:Math.sin(n)*i*f/3,y:Math.cos(r)*a*p/4})}return e},[n]),S=v.length,C=(0,c.useRef)(Array.from({length:n},(e,t)=>({index:t,z:n>0?u/n*t%u:0,imageIndex:S>0?t%S:0,x:x[t]?.x??0,y:x[t]?.y??0,worldZ:0})));(0,c.useEffect)(()=>{C.current=Array.from({length:n},(e,t)=>({index:t,z:n>0?u/n*t%u:0,imageIndex:S>0?t%S:0,x:x[t]?.x??0,y:x[t]?.y??0,worldZ:0}))},[x,S,n]),(0,c.useEffect)(()=>{y.forEach(e=>{e.minFilter=s,e.magFilter=s,e.generateMipmaps=!1,e.needsUpdate=!0})},[y]),(0,c.useEffect)(()=>()=>{b.forEach(e=>e.dispose())},[b]);let w=(0,c.useCallback)(e=>{r&&(h.current+=e.deltaY*.006*t,g.current=!1,o.current=Date.now())},[r,t]),T=(0,c.useCallback)(e=>{if(r){if(e.key===`ArrowUp`||e.key===`ArrowLeft`)h.current-=1.4*t;else if(e.key===`ArrowDown`||e.key===`ArrowRight`)h.current+=1.4*t;else return;g.current=!1,o.current=Date.now()}},[r,t]);return(0,c.useEffect)(()=>{let e=document.getElementById(`top`);if(e)return e.addEventListener(`wheel`,w,{passive:!0}),document.addEventListener(`keydown`,T),()=>{e.removeEventListener(`wheel`,w),document.removeEventListener(`keydown`,T)}},[T,w]),(0,c.useEffect)(()=>{let e=window.setInterval(()=>{Date.now()-o.current>3e3&&(g.current=!0)},1e3);return()=>window.clearInterval(e)},[]),i((e,t)=>{g.current&&r&&(h.current+=.16*t),h.current*=r?.94:.88;let i=h.current,a=e.clock.getElapsedTime();b.forEach(e=>{e.uniforms.time.value=a,e.uniforms.scrollForce.value=i});let o=S>0?n%S||S:0,s=u/2;C.current.forEach((e,n)=>{let r=e.z+i*t*10,a=0,c=0;r>=u?(a=Math.floor(r/u),r-=u*a):r<0&&(c=Math.ceil(-r/u),r+=u*c),a>0&&o>0&&S>0&&(e.imageIndex=(e.imageIndex+a*o)%S),c>0&&o>0&&S>0&&(e.imageIndex=((e.imageIndex-c*o)%S+S)%S),e.z=(r%u+u)%u,e.x=x[n]?.x??0,e.y=x[n]?.y??0,e.worldZ=e.z-s;let l=e.z/u,d=1,f=0;l<.05?d=0:l<=.25?d=(l-.05)/.2:l>=.4&&l<=.43?d=1-(l-.4)/.03:l>.43&&(d=0),l<.1?f=8*(1-l/.1):l>=.4&&l<=.43?f=8*((l-.4)/.03):l>.43&&(f=8);let p=y[e.imageIndex],m=b[n],h=_.current[n];if(m.uniforms.opacity.value=Math.max(0,Math.min(1,d)),m.uniforms.blurAmount.value=Math.max(0,Math.min(4.5,f*.56)),p&&(m.uniforms.map.value=p,h)){let t=p.image?p.image.width/p.image.height:1,n=t>1?2*t:2,r=t>1?2:2/t;h.position.set(e.x,e.y,e.worldZ),h.scale.set(n,r,1)}})},0),v.length===0?null:(0,l.jsx)(l.Fragment,{children:C.current.map((e,t)=>{let n=b[t];return(0,l.jsx)(`mesh`,{material:n,ref:e=>{_.current[t]=e},frustumCulled:!1,onPointerEnter:()=>{n.uniforms.isHovered.value=1,g.current=!1,o.current=Date.now()},onPointerLeave:()=>{n.uniforms.isHovered.value=0},children:(0,l.jsx)(`planeGeometry`,{args:[1,1,16,16]})},e.index)})})}function g({images:e,isActive:t}){let[r,i]=(0,c.useState)(!0);return(0,c.useEffect)(()=>{try{let e=document.createElement(`canvas`);e.getContext(`webgl`)||e.getContext(`experimental-webgl`)||i(!1)}catch{i(!1)}},[]),r?(0,l.jsx)(`div`,{className:`hero-gallery absolute inset-0 h-screen w-full`,children:(0,l.jsx)(n,{dpr:[1,1.25],frameloop:t?`always`:`demand`,camera:{position:[0,0,0],fov:55},gl:{antialias:!1,alpha:!0,powerPreference:`high-performance`},performance:{min:.6},children:(0,l.jsx)(h,{images:e,isActive:t})})}):(0,l.jsx)(`div`,{className:`hero-gallery grid h-screen w-full grid-cols-2 gap-3 overflow-hidden p-4 md:grid-cols-4`,children:e.slice(0,8).map(e=>(0,l.jsx)(`div`,{className:`flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.05] p-8`,children:(0,l.jsx)(`img`,{src:e.src,alt:e.alt,className:`h-20 w-20 object-contain md:h-28 md:w-28`})},e.alt))})}function _({images:e}){let t=(0,c.useRef)(null),[n,r]=(0,c.useState)(!0);return(0,c.useEffect)(()=>{let e=t.current;if(!e)return;let n=new IntersectionObserver(([e])=>{r(e.isIntersecting&&e.intersectionRatio>.35)},{threshold:[.2,.35,.5]});return n.observe(e),()=>n.disconnect()},[]),(0,l.jsxs)(`section`,{id:`top`,ref:t,className:`relative min-h-screen overflow-hidden`,children:[(0,l.jsx)(g,{images:e,isActive:n}),(0,l.jsx)(`div`,{className:`hero-vignette z-[3]`}),(0,l.jsx)(`div`,{className:`pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_26%_36%,rgba(91,232,255,0.18),transparent_22%),radial-gradient(circle_at_76%_32%,rgba(32,185,214,0.14),transparent_22%),linear-gradient(90deg,rgba(2,6,10,0.28),rgba(2,6,10,0.08)_42%,rgba(2,6,10,0.18)_100%)]`}),(0,l.jsx)(`div`,{className:`relative z-10 flex min-h-screen items-center justify-center px-6 pb-10 pt-28`,children:(0,l.jsx)(`div`,{className:`mx-auto flex w-full max-w-7xl items-center justify-center`,children:(0,l.jsxs)(`div`,{className:`max-w-4xl text-center`,children:[(0,l.jsx)(`p`,{className:`mb-5 text-sm font-semibold tracking-[0.18em] text-cyan-200/82 md:text-base`,children:`Hello There!`}),(0,l.jsxs)(`h1`,{className:`text-4xl font-black leading-[0.92] text-white sm:text-5xl md:text-6xl lg:text-[5.15rem]`,children:[(0,l.jsx)(`span`,{className:`mb-1 block`,children:`I'm`}),(0,l.jsx)(`span`,{className:`block`,children:`Muhammad Abuzar`}),(0,l.jsx)(`span`,{className:`mt-3 block text-sm font-semibold tracking-[0.14em] text-white/78 md:text-base`,children:`aka`}),(0,l.jsx)(`span`,{className:`block text-gradient`,children:`ZarScape.`}),(0,l.jsx)(`span`,{className:`mt-3 block text-base font-semibold tracking-[0.14em] text-white/82 md:text-lg`,children:`NodeJS Expert`})]}),(0,l.jsxs)(`div`,{className:`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row`,children:[(0,l.jsx)(`a`,{href:`#projects`,className:`hero-cta-primary rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-black`,children:`View Work`}),(0,l.jsx)(`a`,{href:`#contact`,className:`hero-cta-secondary rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md`,children:`Start a Project`})]})]})})})]})}export{_ as default};