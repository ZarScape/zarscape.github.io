import { useEffect, useState } from 'react';

function readMediaQuery(query, fallback = false) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback;
  }

  return window.matchMedia(query).matches;
}

function getConnection() {
  if (typeof navigator === 'undefined') return undefined;
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
}

function computeProfile() {
  if (typeof window === 'undefined') {
    return {
      liteMode: false,
      reducedMotion: false,
      coarsePointer: false,
      saveData: false,
      lowMemory: false,
      lowThreads: false
    };
  }

  const reducedMotion = readMediaQuery('(prefers-reduced-motion: reduce)');
  const coarsePointer = readMediaQuery('(pointer: coarse)');
  const connection = getConnection();
  const saveData = Boolean(connection?.saveData);
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
  const lowThreads = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  return {
    liteMode: reducedMotion || coarsePointer || saveData || lowMemory || lowThreads,
    reducedMotion,
    coarsePointer,
    saveData,
    lowMemory,
    lowThreads
  };
}

function subscribeToMediaQuery(query, onChange) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

export function usePerformanceProfile() {
  const [profile, setProfile] = useState(() => computeProfile());

  useEffect(() => {
    const refreshProfile = () => setProfile(computeProfile());
    const connection = getConnection();
    const unsubReducedMotion = subscribeToMediaQuery('(prefers-reduced-motion: reduce)', refreshProfile);
    const unsubPointer = subscribeToMediaQuery('(pointer: coarse)', refreshProfile);

    if (connection?.addEventListener) {
      connection.addEventListener('change', refreshProfile);
    }

    return () => {
      unsubReducedMotion();
      unsubPointer();

      if (connection?.removeEventListener) {
        connection.removeEventListener('change', refreshProfile);
      }
    };
  }, []);

  return profile;
}
