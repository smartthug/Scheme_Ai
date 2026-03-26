"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Scene({ title, subtitle }: { title: string; subtitle: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.25, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.35, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.22, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 2, 4]} intensity={1.2} color="#3AAFA9" />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color="#17252A" />
      <group ref={group}>
        <Float speed={1.2} floatIntensity={0.6}>
          <Text fontSize={0.48} color="#17252A" anchorX="center" anchorY="middle" position={[0, 0.2, 0]}>
            {title}
          </Text>
          <Text fontSize={0.14} color="#DEF2F1" anchorX="center" anchorY="middle" position={[0, -0.35, 0]}>
            {subtitle}
          </Text>
        </Float>
      </group>
    </>
  );
}

interface Props {
  title: string;
  subtitle: string;
  hint: string;
}

export default function HeroThree({ title, subtitle, hint }: Props) {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-card sm:h-[260px] md:h-[300px] lg:h-[320px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.6]}>
        <color attach="background" args={["#3AAFA9"]} />
        <Scene title={title} subtitle={subtitle} />
      </Canvas>
      <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-ink/80">{hint}</p>
    </div>
  );
}
