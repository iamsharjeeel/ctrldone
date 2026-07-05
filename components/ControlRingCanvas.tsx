"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// CTRLDONE brand palette — blue ring + lime checkmark, matching the logo.
const DARK_BLUE = new THREE.Color("#5B6EF3");
const DARK_LIME = new THREE.Color("#D6EE3C");
const LIGHT_BLUE = new THREE.Color("#4459E0");
const LIGHT_LIME = new THREE.Color("#B8CE1E");

function themeColors(isLight: boolean) {
  return {
    blue: isLight ? LIGHT_BLUE : DARK_BLUE,
    lime: isLight ? LIGHT_LIME : DARK_LIME,
  };
}

function isLightTheme() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light"
  );
}

/**
 * Canvas texture of the CTRLDONE mark (blue ring + lime check) used for the
 * favicon sprites that float around the control ring.
 */
function makeMarkTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;

  ctx.lineWidth = 8;
  ctx.strokeStyle = "#5B6EF3";
  ctx.beginPath();
  ctx.arc(c, c, 44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#D6EE3C";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(42, 66);
  ctx.lineTo(58, 82);
  ctx.lineTo(88, 46);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 2;
  return texture;
}

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
  const pointsRef = useRef<THREE.Points>(null!);

  const ringCount = Math.floor(count * 0.82);

  const [basePositions, targetPositions, baseColors] = useMemo(() => {
    const base = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const { blue, lime } = themeColors(isLightTheme());

    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      base[i * 3 + 2] = r * Math.cos(phi);

      const isRing = i < ringCount;
      if (isRing) {
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

      const col = isRing ? blue : lime;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return [base, target, colors];
  }, [count, ringCount]);

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
    const applyThemeColors = () => {
      const geo = pointsRef.current?.geometry;
      if (!geo) return;
      const attr = geo.attributes.color as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const { blue, lime } = themeColors(isLightTheme());
      for (let i = 0; i < count; i++) {
        const col = i < ringCount ? blue : lime;
        arr[i * 3] = col.r;
        arr[i * 3 + 1] = col.g;
        arr[i * 3 + 2] = col.b;
      }
      attr.needsUpdate = true;
    };
    applyThemeColors();
    const observer = new MutationObserver(applyThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [count, ringCount]);

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
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[baseColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.06 : 0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingMarks({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useMemo(() => makeMarkTexture(), []);

  useEffect(() => () => texture.dispose(), [texture]);

  const marks = useMemo(() => {
    const total = isMobile ? 3 : 6;
    return Array.from({ length: total }, (_, i) => {
      const angle = (i / total) * Math.PI * 2 + Math.random() * 0.6;
      const radius = 3.7 + Math.random() * 1.1;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.7,
        z: -1 + Math.random() * 2,
        scale: 0.55 + Math.random() * 0.45,
        speed: 0.35 + Math.random() * 0.4,
        amp: 0.25 + Math.random() * 0.35,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const m = marks[i];
      child.position.y = m.y + (reducedMotion ? 0 : Math.sin(t * m.speed + m.offset) * m.amp);
      const sprite = child as THREE.Sprite;
      if (sprite.material) {
        (sprite.material as THREE.SpriteMaterial).rotation = reducedMotion
          ? 0
          : Math.sin(t * 0.3 + m.offset) * 0.25;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {marks.map((m, i) => (
        <sprite key={i} position={[m.x, m.y, m.z]} scale={[m.scale, m.scale, m.scale]}>
          <spriteMaterial
            map={texture}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
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
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      dpr={dpr}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ParticleField
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
      <FloatingMarks reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}
