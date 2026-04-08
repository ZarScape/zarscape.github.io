import { useEffect, useRef, useState } from 'react';

export default function BackgroundGradientAnimation({
  gradientBackgroundStart = 'rgb(2, 10, 18)',
  gradientBackgroundEnd = 'rgb(4, 24, 34)',
  firstColor = '34, 211, 238',
  secondColor = '14, 165, 233',
  thirdColor = '103, 232, 249',
  fourthColor = '8, 145, 178',
  fifthColor = '6, 182, 212',
  pointerColor = '125, 211, 252',
  size = '80%',
  blendingValue = 'screen',
  children,
  className = '',
  interactive = true,
  containerClassName = '',
  performanceProfile
}) {
  const interactiveRef = useRef(null);
  const frameRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const liteMode = Boolean(performanceProfile?.liteMode);
  const reducedMotion = Boolean(performanceProfile?.reducedMotion);
  const [isSafari, setIsSafari] = useState(false);
  const [interactiveEnabled, setInteractiveEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--gradient-background-start', gradientBackgroundStart);
    root.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
    root.style.setProperty('--first-color', firstColor);
    root.style.setProperty('--second-color', secondColor);
    root.style.setProperty('--third-color', thirdColor);
    root.style.setProperty('--fourth-color', fourthColor);
    root.style.setProperty('--fifth-color', fifthColor);
    root.style.setProperty('--pointer-color', pointerColor);
    root.style.setProperty('--size', size);
    root.style.setProperty('--blending-value', blendingValue);
  }, [
    blendingValue,
    fifthColor,
    firstColor,
    fourthColor,
    gradientBackgroundEnd,
    gradientBackgroundStart,
    pointerColor,
    secondColor,
    size,
    thirdColor
  ]);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setInteractiveEnabled(interactive && hasFinePointer && !reducedMotion && !liteMode);
  }, [interactive, liteMode, reducedMotion]);

  useEffect(() => {
    if (!interactiveEnabled) return undefined;

    const animate = () => {
      const node = interactiveRef.current;
      if (node) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) / 18;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) / 18;
        node.style.transform = `translate(${Math.round(currentRef.current.x)}px, ${Math.round(currentRef.current.y)}px)`;
      }
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [interactiveEnabled]);

  function handlePointerMove(event) {
    if (!interactiveEnabled || !interactiveRef.current) return;
    const rect = interactiveRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current.x = event.clientX - rect.width / 2;
    targetRef.current.y = event.clientY - rect.height / 2;
  }

  const staticAnimationStyle = reducedMotion ? { animation: 'none' } : undefined;

  return (
    <div
      onMouseMove={interactiveEnabled ? handlePointerMove : undefined}
      className={`fixed inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] ${containerClassName}`}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={className}>{children}</div>

      <div
        className={`gradients-container h-full w-full ${
          isSafari || liteMode || reducedMotion ? 'blur-xl' : 'gradient-goo'
        } pointer-events-none`}
      >
        <div
          style={staticAnimationStyle}
          className="gradient-first absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] opacity-100"
        />
        {!liteMode ? (
          <div
            style={staticAnimationStyle}
            className="gradient-second absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] opacity-100"
          />
        ) : null}
        <div
          style={staticAnimationStyle}
          className="gradient-third absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] opacity-100"
        />
        {!liteMode && !reducedMotion ? (
          <div className="gradient-fourth absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] opacity-70" />
        ) : null}
        {!liteMode ? (
          <div
            style={staticAnimationStyle}
            className="gradient-fifth absolute left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] h-[var(--size)] w-[var(--size)] opacity-100"
          />
        ) : null}

        {interactiveEnabled ? (
          <div ref={interactiveRef} className="gradient-pointer absolute -left-1/2 -top-1/2 h-full w-full opacity-70" />
        ) : null}
      </div>
    </div>
  );
}
