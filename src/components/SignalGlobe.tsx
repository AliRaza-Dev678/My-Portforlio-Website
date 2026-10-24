"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  A network globe: nodes on a sphere, wired to their nearest neighbours, with
  pulses travelling between nodes like calls moving through a pipeline.
  Drawn in white on the petrol hero, with signal-orange pulses. Pointer tilts it; it rotates slowly.
*/

const NODE_COUNT = 380;
const RADIUS = 1.55;
const PULSES = 9;

function fibonacciSphere(n: number, r: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * radius * r, y * r, Math.sin(theta) * radius * r));
  }
  return pts;
}

const pointVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.6 + aSeed * 6.2831);
    // Nodes on the far side of the globe fade back.
    float facing = smoothstep(-7.7, -4.6, mv.z);
    vAlpha = twinkle * mix(0.25, 1.0, facing);
    gl_PointSize = (2.6 + aSeed * 2.8) * uPixelRatio * (6.1 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(1.0, 1.0, 1.0, a * vAlpha);
  }
`;

type Pulse = { a: number; b: number; t: number; speed: number };

function Network({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulseMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const satellite = useRef<THREE.Mesh>(null);

  const { nodes, pointGeo, lineGeo, neighbours } = useMemo(() => {
    const nodes = fibonacciSphere(NODE_COUNT, RADIUS);
    // Small jitter so the lattice reads as organic, not machined.
    nodes.forEach((p, i) => p.multiplyScalar(1 + Math.sin(i * 12.9898) * 0.02));

    const positions = new Float32Array(NODE_COUNT * 3);
    const seeds = new Float32Array(NODE_COUNT);
    nodes.forEach((p, i) => {
      positions.set([p.x, p.y, p.z], i * 3);
      seeds[i] = (Math.sin(i * 78.233) * 43758.5453) % 1 || 0.5;
      seeds[i] = Math.abs(seeds[i]);
    });
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const neighbours: number[][] = [];
    const segs: number[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < NODE_COUNT; i++) {
      const dists = nodes
        .map((p, j) => ({ j, d: p.distanceToSquared(nodes[i]) }))
        .filter((x) => x.j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 3);
      neighbours.push(dists.map((x) => x.j));
      for (const { j } of dists) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        segs.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
    return { nodes, pointGeo, lineGeo, neighbours };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio, 1.75) },
    }),
    []
  );

  const pulses = useRef<Pulse[]>(
    Array.from({ length: PULSES }, (_, k) => ({
      a: (k * 41) % NODE_COUNT,
      b: (k * 97 + 13) % NODE_COUNT,
      t: k / PULSES,
      speed: 0.28 + (k % 4) * 0.07,
    }))
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += animate ? dt : 0;

    // Ease toward the pointer for a gentle parallax tilt.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;
    if (animate) g.rotation.y += dt * 0.12;
    g.rotation.x = 0.35 - pointer.current.y * 0.25;
    g.rotation.z = pointer.current.x * 0.12;

    if (ringA.current && animate) ringA.current.rotation.z += dt * 0.08;
    if (ringB.current && animate) ringB.current.rotation.z -= dt * 0.05;
    if (satellite.current) {
      const s = uniforms.uTime.value * 0.5;
      satellite.current.position.set(Math.cos(s) * 2.15, Math.sin(s) * 2.15 * 0.32, Math.sin(s) * 2.15 * 0.95);
    }

    // Pulses hop along arcs between nodes, then pick a neighbour and continue.
    pulses.current.forEach((p, k) => {
      const mesh = pulseMeshes.current[k];
      if (!mesh) return;
      if (animate) p.t += dt * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.a = p.b;
        const choices = neighbours[p.a];
        // Mostly hop to a neighbour; sometimes leap across the globe.
        p.b = Math.random() < 0.7 ? choices[Math.floor(Math.random() * choices.length)] : Math.floor(Math.random() * NODE_COUNT);
      }
      const a = nodes[p.a];
      const b = nodes[p.b];
      tmp.copy(a).lerp(b, p.t);
      const lift = 1 + Math.sin(p.t * Math.PI) * (a.distanceTo(b) * 0.18);
      tmp.setLength(RADIUS * lift);
      mesh.position.copy(tmp);
      const s = 0.6 + Math.sin(p.t * Math.PI) * 0.8;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      {/* Faint core gives the globe body and hides some of the back lines. */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.97, 48, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} depthWrite={false} />
      </mesh>

      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>

      <points geometry={pointGeo}>
        <shaderMaterial
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {Array.from({ length: PULSES }).map((_, k) => (
        <mesh key={k} ref={(m) => { pulseMeshes.current[k] = m; }}>
          <sphereGeometry args={[0.036, 12, 12]} />
          <meshBasicMaterial color="#ff7a1a" />
        </mesh>
      ))}

      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.15, 0.004, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, 0.5, 0]}>
        <torusGeometry args={[2.4, 0.003, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <mesh ref={satellite}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ff7a1a" />
      </mesh>
    </group>
  );
}

export default function SignalGlobe({ running, animate }: { running: boolean; animate: boolean }) {
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.1], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <Network animate={animate} />
    </Canvas>
  );
}
