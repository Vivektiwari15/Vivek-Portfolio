"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Float, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

function MetallicExplodingGrid({ scrollProgress, isDark }) {
  const groupRef = useRef();
  const gridSize = 3;
  const cubeSize = 1.0;
  const gap = 0.12;
  const totalSize = cubeSize + gap;
  const offset = ((gridSize - 1) * totalSize) / 2;

  const cubes = useMemo(() => {
    const temp = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const isCenter = x === 1 && y === 1 && z === 1;
          temp.push({
            initialPos: new THREE.Vector3(
              x * totalSize - offset,
              y * totalSize - offset,
              z * totalSize - offset
            ),
            isCenter,
            key: `${x}-${y}-${z}`,
          });
        }
      }
    }
    return temp;
  }, [offset, totalSize]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scrollProgress;
    const explode = 6.2;

    if (!groupRef.current) return;

    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.25;
    groupRef.current.rotation.z = Math.cos(t * 0.14) * 0.18;

    groupRef.current.children.forEach((child, i) => {
      if (!cubes[i]) return;
      const { initialPos, isCenter } = cubes[i];
      if (!isCenter) {
        child.position.x = initialPos.x * (1 + s * explode);
        child.position.y = initialPos.y * (1 + s * explode);
        child.position.z = initialPos.z * (1 + s * explode);
        child.rotation.x = s * 1.8;
        child.rotation.y = s * 1.8;
      } else {
        child.position.set(0, 0, 0);
        child.scale.setScalar(1 + s * 0.18);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((data) => (
        <RoundedBox
          key={data.key}
          args={[cubeSize, cubeSize, cubeSize]}
          radius={0.08}
          smoothness={6}
          position={data.initialPos}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={isDark ? 0.08 : 0.04}
            clearcoat={1}
            envMapIntensity={isDark ? 0.6 : 1.2}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export default function ExplodedCube({ isDark }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const winScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0) setScrollProgress(winScroll / height);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const bgColor = isDark ? "#000000" : "#ffffff";
  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        height: "100dvh",
        width: "100%",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [9, 9, 9], fov: 35 }}
          gl={{ alpha: false, antialias: true }}
        >
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={[bgColor, 12, 35]} />
          <ambientLight intensity={isDark ? 0.3 : 0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.35}>
            <MetallicExplodingGrid
              scrollProgress={scrollProgress}
              isDark={isDark}
            />
          </Float>
          <Environment preset="studio" />
          <EffectComposer>
            <Bloom
              intensity={isDark ? 0.4 : 0.1}
              luminanceThreshold={1}
              mipmapBlur
            />
            <Noise opacity={0.02} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
