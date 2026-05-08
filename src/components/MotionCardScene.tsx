import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface MotionCardSceneProps {
  activeIndex: number;
  globalProgress: number;
  reducedMotion: boolean;
}

function DepthParticles({ activeIndex }: { activeIndex: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 520;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.8 + Math.random() * 3.9;
      const angle = Math.random() * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (Math.random() - 0.5) * 5.6;
      values[i * 3 + 2] = Math.sin(angle) * radius - Math.random() * 3.4;
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.025 + activeIndex * 0.06;
    points.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={activeIndex === 3 ? "#dce8f2" : "#b8c2cc"}
        size={activeIndex === 2 ? 0.032 : 0.022}
        transparent
        opacity={activeIndex >= 2 ? 0.46 : 0.24}
        depthWrite={false}
      />
    </points>
  );
}

function GhostPlanes({ activeIndex, globalProgress }: { activeIndex: number; globalProgress: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      activeIndex === 2 ? -0.28 + globalProgress * 0.32 : activeIndex === 3 ? 0 : -0.08,
      0.05,
    );
  });

  return (
    <group ref={group} position={[0.55, 0.05, -1.15]}>
      {Array.from({ length: 7 }).map((_, index) => {
        const spread = index - 3;
        const isCollection = activeIndex === 3;
        return (
          <Float
            key={index}
            speed={0.85 + index * 0.07}
            rotationIntensity={isCollection ? 0.12 : 0.03}
            floatIntensity={isCollection ? 0.25 : 0.12}
          >
            <mesh
              position={[
                isCollection ? spread * 0.24 : spread * 0.08,
                isCollection ? Math.abs(spread) * -0.03 : 0,
                -Math.abs(spread) * 0.12,
              ]}
              rotation={[0, isCollection ? spread * -0.16 : -0.34, isCollection ? spread * -0.11 : 0]}
              scale={[1.6, 2.34, 1]}
            >
              <planeGeometry args={[1, 1.46, 1, 1]} />
              <meshBasicMaterial
                color={isCollection ? "#2f86ff" : "#c6d0dc"}
                wireframe
                transparent
                opacity={isCollection ? 0.19 : activeIndex === 2 ? 0.08 : 0.02}
                depthWrite={false}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Halo({ activeIndex }: { activeIndex: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.08;
    const target = activeIndex === 3 ? 1 : 0.42;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, target, 0.04));
  });

  return (
    <mesh ref={ref} position={[0.2, 0, -1.8]} scale={0.42}>
      <ringGeometry args={[1.65, 1.68, 96]} />
      <meshBasicMaterial color="#2f86ff" transparent opacity={activeIndex === 2 ? 0.1 : 0} depthWrite={false} />
    </mesh>
  );
}

export function MotionCardScene({ activeIndex, globalProgress, reducedMotion }: MotionCardSceneProps) {
  if (reducedMotion) {
    return <div className="motion-scene-fallback" />;
  }

  return (
    <div className="motion-card-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 46 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[2.6, 2.8, 4]} intensity={activeIndex >= 2 ? 24 : 12} color="#63cfff" />
        <pointLight position={[-3, -1.4, 2]} intensity={2.5} color="#d9e4ef" />
        <DepthParticles activeIndex={activeIndex} />
        <GhostPlanes activeIndex={activeIndex} globalProgress={globalProgress} />
        <Halo activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
