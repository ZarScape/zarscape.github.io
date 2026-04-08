import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const DEFAULT_DEPTH_RANGE = 50;
const DEFAULT_VISIBLE_COUNT = 9;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
const HERO_QUALITY = {
  full: {
    visibleCount: DEFAULT_VISIBLE_COUNT,
    segmentCount: 16,
    blurStrength: 4.5,
    autoPlaySpeed: 0.16,
    deltaMultiplier: 10,
    wheelStrength: 0.006,
    hoverEnabled: true,
    textureLimit: 14,
    dpr: [1, 1.25],
    performanceMin: 0.6,
    powerPreference: 'high-performance'
  },
  lite: {
    visibleCount: 6,
    segmentCount: 8,
    blurStrength: 1.6,
    autoPlaySpeed: 0.08,
    deltaMultiplier: 7.5,
    wheelStrength: 0.004,
    hoverEnabled: false,
    textureLimit: 10,
    dpr: [0.85, 1],
    performanceMin: 0.45,
    powerPreference: 'default'
  }
};

function createClothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1 },
      blurAmount: { value: 0 },
      scrollForce: { value: 0 },
      time: { value: 0 },
      isHovered: { value: 0 }
    },
    vertexShader: `
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
    `,
    fragmentShader: `
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
    `
  });
}

function GalleryScene({ images, speed = 1, quality, isActive }) {
  const lastInteraction = useRef(Date.now());
  const scrollVelocityRef = useRef(0);
  const autoPlayRef = useRef(true);
  const pageVisibleRef = useRef(true);
  const meshRefs = useRef([]);
  const visibleCount = quality?.visibleCount ?? DEFAULT_VISIBLE_COUNT;
  const segmentCount = quality?.segmentCount ?? 16;
  const blurStrength = quality?.blurStrength ?? 4.5;
  const autoPlaySpeed = quality?.autoPlaySpeed ?? 0.16;
  const deltaMultiplier = quality?.deltaMultiplier ?? 10;
  const wheelStrength = quality?.wheelStrength ?? 0.006;
  const hoverEnabled = quality?.hoverEnabled ?? true;
  const textureLimit = quality?.textureLimit ?? images.length;
  const galleryImages = useMemo(() => images.slice(0, textureLimit), [images, textureLimit]);
  const normalizedImages = useMemo(
    () => galleryImages.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [galleryImages]
  );
  const textureSources = useMemo(() => normalizedImages.map((img) => img.src), [normalizedImages]);
  const textures = useLoader(THREE.TextureLoader, textureSources);
  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < visibleCount; i += 1) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const horizontalRadius = (i % 3) * 1.2;
      const verticalRadius = ((i + 1) % 4) * 0.8;
      positions.push({
        x: (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3,
        y: (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4
      });
    }
    return positions;
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const planesData = useRef(
    Array.from({ length: visibleCount }, (_, index) => ({
      index,
      z: visibleCount > 0 ? ((DEFAULT_DEPTH_RANGE / visibleCount) * index) % DEFAULT_DEPTH_RANGE : 0,
      imageIndex: totalImages > 0 ? index % totalImages : 0,
      x: spatialPositions[index]?.x ?? 0,
      y: spatialPositions[index]?.y ?? 0,
      worldZ: 0
    }))
  );

  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, index) => ({
      index,
      z: visibleCount > 0 ? ((DEFAULT_DEPTH_RANGE / visibleCount) * index) % DEFAULT_DEPTH_RANGE : 0,
      imageIndex: totalImages > 0 ? index % totalImages : 0,
      x: spatialPositions[index]?.x ?? 0,
      y: spatialPositions[index]?.y ?? 0,
      worldZ: 0
    }));
  }, [spatialPositions, totalImages, visibleCount]);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    return () => {
      materials.forEach((material) => material.dispose());
    };
  }, [materials]);

  const handleWheel = useCallback(
    (event) => {
      if (!isActive) return;
      scrollVelocityRef.current += event.deltaY * wheelStrength * speed;
      autoPlayRef.current = false;
      lastInteraction.current = Date.now();
    },
    [isActive, speed, wheelStrength]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (!isActive) return;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        scrollVelocityRef.current -= 1.4 * speed;
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        scrollVelocityRef.current += 1.4 * speed;
      } else {
        return;
      }
      autoPlayRef.current = false;
      lastInteraction.current = Date.now();
    },
    [isActive, speed]
  );

  useEffect(() => {
    const heroSection = document.getElementById('top');
    if (!heroSection) return undefined;
    heroSection.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      heroSection.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWheel]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) autoPlayRef.current = true;
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      pageVisibleRef.current = document.visibilityState === 'visible';

      if (!pageVisibleRef.current) {
        autoPlayRef.current = false;
        scrollVelocityRef.current = 0;
        return;
      }

      if (Date.now() - lastInteraction.current > 3000) {
        autoPlayRef.current = true;
      }
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useFrame((state, delta) => {
    if (!pageVisibleRef.current) return;
    if (autoPlayRef.current && isActive) scrollVelocityRef.current += autoPlaySpeed * delta;

    scrollVelocityRef.current *= isActive ? 0.94 : 0.88;
    const scrollVelocity = scrollVelocityRef.current;

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      material.uniforms.time.value = time;
      material.uniforms.scrollForce.value = scrollVelocity;
    });

    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const halfRange = DEFAULT_DEPTH_RANGE / 2;

    planesData.current.forEach((plane, index) => {
      let newZ = plane.z + scrollVelocity * delta * deltaMultiplier;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= DEFAULT_DEPTH_RANGE) {
        wrapsForward = Math.floor(newZ / DEFAULT_DEPTH_RANGE);
        newZ -= DEFAULT_DEPTH_RANGE * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / DEFAULT_DEPTH_RANGE);
        newZ += DEFAULT_DEPTH_RANGE * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }
      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % DEFAULT_DEPTH_RANGE) + DEFAULT_DEPTH_RANGE) % DEFAULT_DEPTH_RANGE;
      plane.x = spatialPositions[index]?.x ?? 0;
      plane.y = spatialPositions[index]?.y ?? 0;
      plane.worldZ = plane.z - halfRange;

      const normalizedPosition = plane.z / DEFAULT_DEPTH_RANGE;
      let opacity = 1;
      let blur = 0;

      if (normalizedPosition < 0.05) opacity = 0;
      else if (normalizedPosition <= 0.25) opacity = (normalizedPosition - 0.05) / 0.2;
      else if (normalizedPosition >= 0.4 && normalizedPosition <= 0.43) opacity = 1 - (normalizedPosition - 0.4) / 0.03;
      else if (normalizedPosition > 0.43) opacity = 0;

      if (normalizedPosition < 0.1) blur = 8 * (1 - normalizedPosition / 0.1);
      else if (normalizedPosition >= 0.4 && normalizedPosition <= 0.43) blur = 8 * ((normalizedPosition - 0.4) / 0.03);
      else if (normalizedPosition > 0.43) blur = 8;

      const texture = textures[plane.imageIndex];
      const material = materials[index];
      const mesh = meshRefs.current[index];

      material.uniforms.opacity.value = Math.max(0, Math.min(1, opacity));
      material.uniforms.blurAmount.value = Math.max(0, Math.min(blurStrength, blur * 0.56));

      if (texture) {
        material.uniforms.map.value = texture;

        if (mesh) {
          const aspect = texture.image ? texture.image.width / texture.image.height : 1;
          const scaleX = aspect > 1 ? 2 * aspect : 2;
          const scaleY = aspect > 1 ? 2 : 2 / aspect;

          mesh.position.set(plane.x, plane.y, plane.worldZ);
          mesh.scale.set(scaleX, scaleY, 1);
        }
      }
    });
  }, 0);

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planesData.current.map((plane, index) => {
        const material = materials[index];

        return (
          <mesh
            key={plane.index}
            material={material}
            ref={(node) => {
              meshRefs.current[index] = node;
            }}
            frustumCulled={false}
            raycast={hoverEnabled ? undefined : () => null}
            onPointerEnter={
              hoverEnabled
                ? () => {
                    material.uniforms.isHovered.value = 1;
                    autoPlayRef.current = false;
                    lastInteraction.current = Date.now();
                  }
                : undefined
            }
            onPointerLeave={
              hoverEnabled
                ? () => {
                    material.uniforms.isHovered.value = 0;
                  }
                : undefined
            }
          >
            <planeGeometry args={[1, 1, segmentCount, segmentCount]} />
          </mesh>
        );
      })}
    </>
  );
}

function TechGalleryHero({ images, isActive, performanceProfile }) {
  const [webglSupported, setWebglSupported] = useState(true);
  const quality = useMemo(
    () => (performanceProfile?.liteMode ? HERO_QUALITY.lite : HERO_QUALITY.full),
    [performanceProfile?.liteMode]
  );

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported || performanceProfile?.reducedMotion) {
    return (
      <div className="hero-gallery grid h-screen w-full grid-cols-2 gap-3 overflow-hidden p-4 md:grid-cols-4">
        {images.slice(0, 8).map((img) => (
          <div
            key={img.alt}
            className="flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.05] p-8"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-20 w-20 object-contain md:h-28 md:w-28"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hero-gallery absolute inset-0 h-screen w-full">
      <Canvas
        dpr={quality.dpr}
        frameloop={isActive ? 'always' : 'demand'}
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: quality.powerPreference }}
        performance={{ min: quality.performanceMin, debounce: 240 }}
      >
        <GalleryScene images={images} isActive={isActive} quality={quality} />
      </Canvas>
    </div>
  );
}

export default function HeroSection({ images, performanceProfile }) {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0.2, 0.35, 0.5] }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <TechGalleryHero images={images} isActive={isActive} performanceProfile={performanceProfile} />
      <div className="hero-vignette z-[3]" />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(circle_at_26%_36%,rgba(91,232,255,0.18),transparent_22%),radial-gradient(circle_at_76%_32%,rgba(32,185,214,0.14),transparent_22%),linear-gradient(90deg,rgba(2,6,10,0.28),rgba(2,6,10,0.08)_42%,rgba(2,6,10,0.18)_100%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-10 pt-28">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center">
          <div className="max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-cyan-200/82 md:text-base">
              Hello There!
            </p>
            <h1 className="text-4xl font-black leading-[0.92] text-white sm:text-5xl md:text-6xl lg:text-[5.15rem]">
              <span className="mb-1 block">I&apos;m</span>
              <span className="block">Muhammad Abuzar</span>
              <span className="mt-3 block text-sm font-semibold tracking-[0.14em] text-white/78 md:text-base">
                aka
              </span>
              <span className="block text-gradient">ZarScape.</span>
              <span className="mt-3 block text-base font-semibold tracking-[0.14em] text-white/82 md:text-lg">
                NodeJS Expert
              </span>
            </h1>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#projects"
                className="hero-cta-primary rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-black"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="hero-cta-secondary rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
