"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DARK_BLUE = new THREE.Color("#5B6EF3");
const DARK_LIME = new THREE.Color("#D6EE3C");
const DARK_ASH = new THREE.Color("#7C8494");
const LIGHT_LIME = new THREE.Color("#B8CE1E");
const LIGHT_ASH = new THREE.Color("#8A93A3");

function ParticleField({
  progressRef,
  reducedMotion,
  isMobile,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const count = isMobile ? 1000 : 2500;
  const includeCheckmark = !isMobile;
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const [basePositions, targetPositions] = useMemo(() => {
    const base = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const ringCount = includeCheckmark ? Math.floor(count * 0.85) : count;

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      base[i * 3 + 2] = r * Math.cos(phi);

      if (i < ringCount) {
        const a = (i / ringCount) * Math.PI * 2;
        const ringR = 3.1 + (Math.random() - 0.5) * 0.15;
        target[i * 3] = Math.cos(a) * ringR;
        target[i * 3 + 1] = Math.sin(a) * ringR;
        target[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      } else {
        const t = Math.random();
        const short = t < 0.4;
        target[i * 3] = short ? -1.2 + t * 1.5 : -0.3 + (t - 0.4) * 2.8;
        target[i * 3 + 1] = short ? -0.3 - t * 1.2 : -0.9 + (t - 0.4) * 3.2;
        target[i * 3 + 2] = 0;
      }
    }
    return [base, target];
  }, [count, includeCheckmark]);

  const ashColor = useRef(DARK_ASH.clone());
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const updateThemeColors = () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      ashColor.current = isLight ? LIGHT_ASH.clone() : DARK_ASH.clone();
    };
    updateThemeColors();
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    const p = reducedMotion ? 1 : progressRef.current;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const eased = THREE.MathUtils.smoothstep(p, 0, 1);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = THREE.MathUtils.lerp(
        basePositions[i * 3],
        targetPositions[i * 3],
        eased
      );
      pos[i * 3 + 1] = THREE.MathUtils.lerp(
        basePositions[i * 3 + 1],
        targetPositions[i * 3 + 1],
        eased
      );
      pos[i * 3 + 2] = THREE.MathUtils.lerp(
        basePositions[i * 3 + 2],
        targetPositions[i * 3 + 2],
        eased
      );
    }
    geo.attributes.position.needsUpdate = true;

    if (!reducedMotion) {
      const parallaxX = mouse.current.x * 0.15;
      const parallaxY = mouse.current.y * 0.1;
      pointsRef.current.rotation.y =
        state.clock.elapsedTime * 0.05 + parallaxX;
      pointsRef.current.rotation.x = parallaxY;
    }

    if (materialRef.current) {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      const endColor = isLight ? LIGHT_LIME : DARK_LIME;
      const colorProgress = THREE.MathUtils.smoothstep(p, 0.7, 1);
      materialRef.current.color.lerpColors(
        ashColor.current,
        endColor,
        colorProgress
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={isMobile ? 0.055 : 0.045}
        color={DARK_BLUE}
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

export function ControlRingCanvas({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDpr(mobile ? 1 : Math.min(window.devicePixelRatio, 2));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={dpr}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ParticleField
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
    </Canvas>
  );
}
