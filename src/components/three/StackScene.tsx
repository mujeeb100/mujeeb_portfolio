"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, RoundedBox, Sparkles, Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { LayerId } from "@/data/site";

const LAYERS: { id: LayerId; label: string; color: string }[] = [
  { id: "cloud", label: "L4 /cloud", color: "#3ddc97" },
  { id: "ai", label: "L3 /ai", color: "#c58cff" },
  { id: "api", label: "L2 /api", color: "#7c9cff" },
  { id: "ui", label: "L1 /ui", color: "#ff4d1c" },
];

const SIZE = 3.2;

/* ── per-layer details drawn on top of each plate ── */
function UiDetail({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh position={[-1.15, 0, -1.2]}>
        <boxGeometry args={[0.6, 0.02, 0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {[-0.75, 0.05, 0.85].map((x) => (
        <mesh key={x} position={[x, 0, -0.55]}>
          <boxGeometry args={[0.65, 0.04, 0.45]} />
          <meshStandardMaterial color="#26262b" />
        </mesh>
      ))}
      {[0.3, 0.55, 0.4, 0.8, 0.6, 1].map((h, i) => (
        <mesh key={i} position={[-1.0 + i * 0.4, h * 0.14, 0.65]}>
          <boxGeometry args={[0.22, h * 0.28, 0.22]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function ApiDetail({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      {[-0.9, -0.3, 0.3, 0.9].map((z, i) => (
        <group key={z} position={[0, 0, z]}>
          <mesh>
            <boxGeometry args={[2.4, 0.03, 0.32]} />
            <meshStandardMaterial color="#1f2030" />
          </mesh>
          <mesh position={[1.0, 0.03, 0]}>
            <boxGeometry args={[0.22, 0.03, 0.14]} />
            <meshBasicMaterial color={i === 2 ? "#ffcc66" : color} toneMapped={false} />
          </mesh>
          <mesh position={[-0.75, 0.03, 0]}>
            <boxGeometry args={[0.6 + i * 0.1, 0.02, 0.06]} />
            <meshBasicMaterial color="#5a5f80" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AiDetail({ color }: { color: string }) {
  /* a tiny 3-4-2 neural net */
  const cols = [3, 4, 2];
  const nodes = useMemo(() => {
    const out: THREE.Vector3[][] = [];
    cols.forEach((n, ci) => {
      const col: THREE.Vector3[] = [];
      for (let r = 0; r < n; r++) col.push(new THREE.Vector3(-1 + ci, 0.12, (r - (n - 1) / 2) * 0.55));
      out.push(col);
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <group position={[0, 0.03, 0]}>
      {nodes.slice(0, -1).flatMap((col, ci) =>
        col.flatMap((a, ai) =>
          nodes[ci + 1].map((b, bi) => (
            <Line key={`${ci}-${ai}-${bi}`} points={[a, b]} color={color} lineWidth={1} transparent opacity={0.35} />
          ))
        )
      )}
      {nodes.flat().map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function CloudDetail({ color }: { color: string }) {
  const pts = [-1, 0, 1].map((x) => new THREE.Vector3(x, 0.12, 0));
  return (
    <group position={[0, 0.03, 0]}>
      <Line points={pts} color={color} lineWidth={1.5} transparent opacity={0.6} />
      {pts.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.06, 32]} />
            <meshStandardMaterial color="#14251e" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {[-0.9, 0.9].map((z) => (
        <mesh key={z} position={[0, 0.05, z]}>
          <boxGeometry args={[2.2, 0.06, 0.25]} />
          <meshStandardMaterial color="#17201c" />
        </mesh>
      ))}
    </group>
  );
}

const DETAIL: Record<LayerId, (p: { color: string }) => React.JSX.Element> = {
  ui: UiDetail,
  api: ApiDetail,
  ai: AiDetail,
  cloud: CloudDetail,
};

/* ── crisp text label drawn to a canvas texture (no DOM roots, no font fetch) ── */
function Label({ text, color, opacity }: { text: string; color: string; opacity: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    const ctx = c.getContext("2d")!;
    ctx.font = "600 56px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 8, 48);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [text, color]);
  return (
    <mesh position={[-SIZE / 2 + 0.75, 0.051, SIZE / 2 + 0.22]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.5, 0.28]} />
      <meshBasicMaterial map={tex} transparent opacity={opacity} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

/* ── packets travelling between layers ── */
function Packets({ gap }: { gap: number }) {
  const COUNT = 26;
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * (SIZE - 0.6),
        z: (Math.random() - 0.5) * (SIZE - 0.6),
        t: Math.random(),
        speed: 0.12 + Math.random() * 0.22,
        up: Math.random() > 0.5,
      })),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const palette = useMemo(() => LAYERS.map((l) => new THREE.Color(l.color)), []);

  useFrame((_, dt) => {
    const mesh = ref.current;
    if (!mesh) return;
    const span = gap * (LAYERS.length - 1);
    data.forEach((d, i) => {
      d.t = (d.t + dt * d.speed) % 1;
      const y = (d.up ? d.t : 1 - d.t) * span - span / 2;
      dummy.position.set(d.x, y, d.z);
      const s = Math.sin(d.t * Math.PI) * 0.06 + 0.015;
      dummy.scale.setScalar(s / 0.05);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const li = Math.min(LAYERS.length - 1, Math.max(0, Math.round((y + span / 2) / gap)));
      color.copy(palette[li]);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Stack({ active, onHover }: { active: LayerId | null; onHover: (id: LayerId | null) => void }) {
  const group = useRef<THREE.Group>(null);
  const plates = useRef<(THREE.Group | null)[]>([]);
  const spread = useRef(0.25);
  const { pointer } = useThree();
  const [gap] = useState(1.55);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    spread.current = THREE.MathUtils.damp(spread.current, 1, 1.6, dt);
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.4 + Math.sin(t * 0.25) * 0.1, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * -0.12, 3, dt);
    g.position.y = Math.sin(t * 0.8) * 0.06;

    plates.current.forEach((p, i) => {
      if (!p) return;
      const id = LAYERS[i].id;
      const base = (i - (LAYERS.length - 1) / 2) * gap * spread.current;
      const lift = active === id ? 0.22 : 0;
      p.position.y = THREE.MathUtils.damp(p.position.y, base + lift, 5, dt);
    });
  });

  return (
    <group ref={group} scale={0.98}>
      {LAYERS.map((l, i) => {
        const isActive = active === l.id;
        const dim = active !== null && !isActive;
        const Detail = DETAIL[l.id];
        return (
          <group
            key={l.id}
            ref={(el) => {
              plates.current[i] = el;
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(l.id);
            }}
            onPointerOut={() => onHover(null)}
          >
            <RoundedBox args={[SIZE, 0.08, SIZE]} radius={0.04} smoothness={3}>
              <meshPhysicalMaterial
                color="#1e1e23"
                roughness={0.35}
                metalness={0.2}
                transparent
                opacity={dim ? 0.28 : 0.62}
                clearcoat={1}
                clearcoatRoughness={0.3}
              />
              <Edges color={l.color} threshold={20} lineWidth={isActive ? 2 : 1} transparent opacity={dim ? 0.3 : isActive ? 1 : 0.75} />
            </RoundedBox>
            <Detail color={l.color} />
            <Label text={l.label} color={l.color} opacity={dim ? 0.35 : 1} />
          </group>
        );
      })}
      <Packets gap={gap} />
    </group>
  );
}

export default function StackScene({
  active,
  onHover,
}: {
  active: LayerId | null;
  onHover: (id: LayerId | null) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [8.2, 6.4, 8.2], fov: 31 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ecebe4", "#0a0a0b", 0.4]} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />
      <pointLight position={[-5, 3, -4]} intensity={8} color="#ff4d1c" distance={14} />
      <pointLight position={[5, -3, 4]} intensity={8} color="#7c9cff" distance={14} />
      <Stack active={active} onHover={onHover} />
      <Sparkles count={70} scale={[9, 6, 9]} size={1.6} speed={0.25} opacity={0.5} color="#ecebe4" />
    </Canvas>
  );
}
