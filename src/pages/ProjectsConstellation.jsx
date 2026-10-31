import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Html, Float } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Données : une "planète" par gros projet / domaine                  */
/* ------------------------------------------------------------------ */
const MODELS = {
  radio: import.meta.env.BASE_URL + "models/radio.glb",
  midnight: import.meta.env.BASE_URL + "models/midnight.glb",
  manuscrit: import.meta.env.BASE_URL + "models/manuscrit.glb",
  sat: import.meta.env.BASE_URL + "models/sat.glb",
};

const PROJECTS = [
  {
    title: "Radio / SDR — ESIEA",
    tag: "Radiofréquences · Enseignement",
    desc: "Conception et animation d'un module de radiofréquences (Bac+4) : fondamentaux RF, échantillonnage, signaux I/Q, modulation/démodulation. Mise en œuvre d'une chaîne SDR complète (BladeRF 2.0 micro xA9, RTL-SDR, GNU Radio, GQRX) avec acquisition et analyse spectrale.",
    color: "#60a5fa",
    kind: "model",
    model: "radio",
    position: [3.2, 1.6, 0],
    scaleFactor: 0.06,
    link: "https://leochouarbi.github.io/radio/",
  },
  {
    title: "Flux Satellite",
    tag: "Traitement du signal",
    desc: "Réception et décodage de flux satellite via chaîne parabolique + LNB : captation des signaux, traitement du signal et visualisation temps réel sur serveur web. Analyse spectrale, étude des décodeurs et des mécanismes de chiffrement/obfuscation.",
    color: "#34d399",
    kind: "model",
    model: "sat",
    position: [-3.4, 1.1, -0.5],
    scaleFactor: 0.17,
  },
  {
    title: "Midnight Engine",
    tag: "Moteur 3D · C++",
    desc: "Moteur 3D temps réel en C++ pour la génération de scènes dynamiques : rendu avancé, gestion des lumières et caméras, architecture modulaire pensée pour l'extension.",
    color: "#a78bfa",
    kind: "model",
    model: "midnight",
    position: [-2.6, -1.9, 0.4],
    scaleFactor: 0.15,
  },
  {
    title: "Reconnaissance IA",
    tag: "Algo génétique · PyTorch",
    desc: "Reconnaissance de chiffres manuscrits via algorithme génétique en C, entraînement de modèles PyTorch et évaluation sur datasets annotés. Pipeline hybride C/Python pour performance et flexibilité.",
    color: "#f472b6",
    kind: "model",
    model: "manuscrit",
    position: [2.6, -2.0, 0.2],
    scaleFactor: 0.45,
  },
  {
    title: "MCS & Durcissement",
    tag: "CS Group · Mission MCS",
    desc: "Pilotage du Maintien en Condition de Sécurité d'un parc sensible : durcissement Oracle Linux / Windows 11 (CIS, ANSSI), scripts Bash/Python de conformité et remédiation, gestion des vulnérabilités (Cyberwatch, Dependency-Track, SBOM/VEX), packages de sécurité et reporting.",
    color: "#22d3ee",
    kind: "proc",
    position: [0, 2.9, -1.2],
    radius: 0.62,
  },
  {
    title: "Lutte anti-drone",
    tag: "Défense · 3 projets sensibles",
    desc: "Rédaction de Plans d'Assurance Sécurité et dossiers techniques, analyses de risques EBIOS RM, revue d'architectures / flux / VLAN, vérification de conformité et empreintes cryptographiques. Prise en compte des exigences OTAN et du contrôle des exportations.",
    color: "#f59e0b",
    kind: "proc",
    position: [0.2, -0.2, 2.6],
    radius: 0.5,
  },
  {
    title: "Contrôle aérien",
    tag: "SSI projet · PTSSI / RTSSI",
    desc: "Rédaction et analyse de documents de sécurité projet (PTSSI, RTSSI), pilotage et coordination des activités SSI, comités techniques tracés, analyse des architectures et des écarts de conformité, contribution à la gouvernance SSI et au MCS/MCO.",
    color: "#c084fc",
    kind: "proc",
    position: [-0.3, 0.3, -2.8],
    radius: 0.5,
  },
];

/* ------------------------------------------------------------------ */
/*  Planète GLB (modèle 3D local)                                      */
/* ------------------------------------------------------------------ */
function ModelPlanet({ project, scaleFactor, hovered, focused, onOver, onOut, onClick }) {
  const { scene } = useGLTF(project.model);
  // clone pour éviter le partage d'instance si le même modèle était réutilisé
  const cloned = useMemo(() => scene.clone(), [scene]);
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      const target = (hovered || focused) ? scaleFactor * 1.25 : scaleFactor;
      const cur = ref.current.scale.x;
      const next = THREE.MathUtils.lerp(cur, target, 0.15);
      ref.current.scale.setScalar(next);
    }
  });

  return (
    <primitive
      ref={ref}
      object={cloned}
      onPointerOver={onOver}
      onPointerOut={onOut}
      onClick={onClick}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Planète procédurale (sphère + anneau + halo)                       */
/* ------------------------------------------------------------------ */
function ProcPlanet({ project, hovered, focused, onOver, onOut, onClick }) {
  const ref = useRef();
  const ringRef = useRef();
  const r = project.radius || 0.55;

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      const target = (hovered || focused) ? 1.18 : 1;
      ref.current.scale.setScalar(
        THREE.MathUtils.lerp(ref.current.scale.x, target, 0.15)
      );
    }
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.6;
  });

  return (
    <group ref={ref} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[r, 48, 48]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered || focused ? 0.9 : 0.45}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
      {/* grille de surface */}
      <mesh scale={1.003}>
        <sphereGeometry args={[r, 20, 20]} />
        <meshBasicMaterial color={project.color} wireframe transparent opacity={0.18} />
      </mesh>
      {/* anneau orbital */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.1, 0, 0]}>
        <ringGeometry args={[r * 1.5, r * 1.62, 64]} />
        <meshBasicMaterial color={project.color} side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Wrapper commun : flottement, label HTML, interactions              */
/* ------------------------------------------------------------------ */
function Planet({ project, index, hovered, focused, setHover, setFocus }) {
  const isHover = hovered === index;
  const isFocus = focused === index;

  const handlers = {
    onOver: (e) => {
      e.stopPropagation();
      setHover(index);
      document.body.style.cursor = "pointer";
    },
    onOut: (e) => {
      e.stopPropagation();
      setHover((h) => (h === index ? null : h));
      document.body.style.cursor = "auto";
    },
    onClick: (e) => {
      e.stopPropagation();
      setFocus(index);
    },
  };

  return (
    <group position={project.position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {project.kind === "model" ? (
          <ModelPlanet
            project={{ ...project, model: MODELS[project.model] }}
            scaleFactor={project.scaleFactor}
            hovered={isHover}
            focused={isFocus}
            {...handlers}
          />
        ) : (
          <ProcPlanet project={project} hovered={isHover} focused={isFocus} {...handlers} />
        )}

        {/* label flottant toujours visible */}
        <Html center distanceFactor={9} position={[0, (project.radius || 0.7) + 0.9, 0]}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFocus(index);
            }}
            onPointerOver={() => setHover(index)}
            onPointerOut={() => setHover((h) => (h === index ? null : h))}
            className={`planet-label ${isHover || isFocus ? "planet-label--active" : ""}`}
            style={{ "--c": project.color }}
          >
            {project.title}
          </button>
        </Html>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Caméra : focus progressif sur la planète sélectionnée              */
/* ------------------------------------------------------------------ */
function CameraRig({ focusPos, controlsRef }) {
  const tmp = useRef(new THREE.Vector3());
  useFrame((state) => {
    const controls = controlsRef.current;
    if (!controls || !focusPos) return;
    const target = tmp.current.set(focusPos[0], focusPos[1], focusPos[2]);
    controls.target.lerp(target, 0.07);
    const camDesired = target.clone().add(new THREE.Vector3(0, 0.6, 3.4));
    state.camera.position.lerp(camDesired, 0.07);
    controls.update();
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Lignes de constellation                                            */
/* ------------------------------------------------------------------ */
function ConstellationLines() {
  return PROJECTS.map((p1, i1) =>
    PROJECTS.map((p2, i2) => {
      if (i1 >= i2) return null;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...p1.position),
        new THREE.Vector3(...p2.position),
      ]);
      return (
        <line key={`${i1}-${i2}`} geometry={geometry}>
          <lineBasicMaterial attach="material" color="#2b3a66" transparent opacity={0.35} />
        </line>
      );
    })
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const ProjectsConstellation = () => {
  const navigate = useNavigate();
  const controlsRef = useRef();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);

  const active = focused !== null ? PROJECTS[focused] : hovered !== null ? PROJECTS[hovered] : null;
  const focusPos = focused !== null ? PROJECTS[focused].position : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#05001a] via-[#0a0028] to-[#0d0133]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: true }}
        onPointerMissed={() => setFocused(null)}
      >
        <color attach="background" args={["#060616"]} />
        <fog attach="fog" args={["#060616", 12, 28]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 10, 10]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-8, -6, -4]} intensity={1} color="#5b3bff" />
        <Stars radius={120} depth={60} count={6000} factor={4} fade speed={0.6} />

        <OrbitControls
          ref={controlsRef}
          enableZoom
          enablePan={false}
          autoRotate={focused === null}
          autoRotateSpeed={0.6}
          minDistance={3}
          maxDistance={16}
        />
        <CameraRig focusPos={focusPos} controlsRef={controlsRef} />

        <ConstellationLines />

        <Suspense fallback={null}>
          {PROJECTS.map((p, i) => (
            <Planet
              key={p.title}
              project={p}
              index={i}
              hovered={hovered}
              focused={focused}
              setHover={setHovered}
              setFocus={setFocused}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Titre + aide navigation */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 max-w-sm">
        <h1 className="text-2xl font-bold text-white drop-shadow">Constellation de projets</h1>
        <p className="mt-1 text-sm text-cyan-200/80">
          Faites glisser pour tourner · molette pour zoomer · cliquez une planète pour l'explorer.
        </p>
      </div>

      {/* Panneau détail */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="absolute right-6 top-1/2 z-20 w-[360px] max-w-[88vw] -translate-y-1/2 rounded-2xl border p-6 text-white backdrop-blur-xl"
            style={{
              borderColor: active.color,
              background: "rgba(8,12,28,0.72)",
              boxShadow: `0 0 28px -6px ${active.color}`,
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: active.color }}
            >
              {active.tag}
            </span>
            <h3 className="mt-1 text-xl font-bold">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{active.desc}</p>
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110"
                style={{ background: active.color }}
              >
                Visiter le projet →
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boutons */}
      <div className="absolute right-6 top-6 z-20 flex gap-2">
        {focused !== null && (
          <button
            onClick={() => setFocused(null)}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            ⤢ Vue d'ensemble
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg hover:bg-gray-200"
        >
          ✕ Retour
        </button>
      </div>
    </div>
  );
};

// préchargement des modèles
Object.values(MODELS).forEach((m) => useGLTF.preload(m));

export default ProjectsConstellation;
