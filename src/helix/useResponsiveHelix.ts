import { useEffect, useState } from 'react';
import type { HelixConfig } from './helixMath';

interface ResponsiveConfig {
  imageConfig: HelixConfig;
  cameraConfig: HelixConfig;
  fov: number;
  planeWidth: number;
  planeHeight: number;
  lightIntensity: number;
  lightDistance: number;
}

// Just a plain function: width in, config out -> Should add aspect ratio conditions
function getConfig(width: number): ResponsiveConfig {
  if (width < 580) {
    // mobile
    return {
      imageConfig: { radius: 2.25, pitch: 4 },
      cameraConfig: { radius: 6, pitch: 4 },
      fov: 70,
      planeWidth: 3,
      planeHeight: 1.5,
      lightIntensity: 35,
      lightDistance: 20,
    };
  }
  
  if (width < 780) {
    // mobile
    return {
      imageConfig: { radius: 3.75, pitch: 6 },
      cameraConfig: { radius: 9, pitch: 6 },
      fov: 70,
      planeWidth: 5,
      planeHeight: 2.5,
      lightIntensity: 60,
      lightDistance: 20,
    };
  }

  if (width < 1100) {
    // tablet
    return {
      imageConfig: { radius: 5, pitch: 8 },
      cameraConfig: { radius: 10, pitch: 8 },
      fov: 70,
      planeWidth: 6.5,
      planeHeight: 3.25,
      lightIntensity: 60,
      lightDistance: 30,
    };
  }

  // desktop
  return {
    imageConfig: { radius: 6, pitch: 10 },
    cameraConfig: { radius: 11, pitch: 10 },
    fov: 70,
    planeWidth: 8,
    planeHeight: 4,
    lightIntensity: 60,
    lightDistance: 30,
  };
}

export function useResponsiveHelix(): ResponsiveConfig {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return getConfig(width);
}
