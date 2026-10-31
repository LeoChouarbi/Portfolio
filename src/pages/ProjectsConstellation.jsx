import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Stars, Html, Float } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Modeles 3D (fichiers locaux, servis par le site)                   */
/* ------------------------------------------------------------------ */
const M = (f) => import.meta.env.BASE_URL + "models/" + f;

/* Une planete 3D par gros projet / domaine.
   size = taille cible normalisee (les modeles sont auto-redimensionnes). */
const PROJECTS = [
  {
    title: "Radio & SDR",
    tag: "Radiofréquences · ESIEA",
    desc: "Conception et animation d'un module de radiofréquences (Bac+4) : fondamentaux RF, échantillonnage, signaux I/Q, modulation et démodulation. Mise en œuvre d'une chaîne SDR complète (BladeRF 2.0 micro xA9, RTL-SDR, GNU Radio, GQRX) avec acquisition et analyse spectrale.",
    color: "#60a5fa",
    model: "radio.glb",
    position: [3.4, 1.7, 0],
    size: 2.0,
    link: "https://leochouarbi.github.io/radio/",
  },
  {
    title: "Flux Satellite",
    tag: "Traitement du signal",
    desc: "Réception et décodage de flux satellite via chaîne parabolique et LNB : captation des signaux, traitement et visualisation temps réel sur serveur web. Analyse spectrale, étude des décodeurs et des mécanismes de chiffrement et d'obfuscation.",
    color: "#34d399",
    model: "sat.glb",
    position: [-3.6, 1.2, -0.5],
    size: 1.9,
  },
  {
    title: "Midnight Engine",
    tag: "Moteur 3D · C++",
    desc: "Moteur 3D temps réel en C++ pour la génération de scènes dynamiques : rendu avancé, gestion des lumières et des caméras, architecture modulaire pensée pour l'extension.",
    color: "#a78bfa",
    model: "midnight.glb",
    position: [-2.7, -2.0, 0.4],
    size: 1.7,
  },
  {
    title: "Reconnaissance IA",
    tag: "Algo génétique · PyTorch",
    desc: "Reconnaissance de chiffres manuscrits via algorithme génétique en C, entraînement de modèles PyTorch et évaluation sur datasets annotés. Pipeline hybride C et Python pour la performance et la flexibilité.",
    color: "#f472b6",
    model: "manuscrit.glb",
    position: [2.7, -2.1, 0.2],
    size: 1.7,
  },
  {
    title: "MCS & Durcissement",
    tag: "CS Group · Mission MCS",
    desc: "Pilotage du Maintien en Condition de Sécurité d'un parc sensible : durcissement Oracle Linux et Windows 11 (CIS, ANSSI), scripts Bash et Python de conformité et de remédiation, gestion des vulnérabilités (Cyberwatch, Dependency-Track, SBOM, VEX), packages de sécurité et reporting.",
    color: "#22d3ee",
    model: "helmet.glb",
    position: [0, 3.0, -1.2],
    size: 1.6,
  },
  {
    title: "Lutte anti-drone",
    tag: "Défense · projets sensibles",
    desc: "Rédaction de Plans d'Assurance Sécurité et de dossiers techniques, analyses de risques EBIOS RM, revue d'architectures, de flux et de VLAN, vérification de conformité et d'empreintes cryptographiques. Prise en compte des exigences OTAN et du contrôle des exportations.",
    color: "#f59e0b",
    model: "robot.glb",
    position: [0.2, -0.3, 2.8],
    size: 1.7,
  },
  {
    title: "Contrôle aérien",
    tag: "SSI projet · PTSSI, RTSSI",
    desc: "Rédaction et analyse de documents de sécurité projet (PTSSI, RTSSI), pilotage et coordination des activités SSI, comités techniques tracés, analyse des architectures et des écarts de conformité, contribution à la gouvernance SSI et au MCS/MCO.",
    color: "#c084fc",
    model: "plane.glb",
    position: [-0.3, 0.4, -2.9],
    size: 2.0,
  },
];

/* ------------------------------------------------------------------ */
/*  Modele 3D : auto-normalise, emissif colore, anime si possible      */
/* ------------------------------------------------------------------ */
function Model3D({ project, hovered, focused, onOver, onOut, onClick }) {
  const group = useRef();
  const spin = useRef();
  const { scene, animations } = useGLTF(M(project.model));
  const { actions } = useAnimations(animations, group);

  // Normalisation (taille + recentrage) + teinte emissive -> une seule fois
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = project.size / maxDim;
    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -center.y * s, -center.z * s);

    const col = new THREE.Color(project.color);
    scene.traverse((o) => {
      if (o.isMesh && o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          if ("emissive" in m) {
            m.emissive = col.clone();
            m.emissiveIntensity = 0.35;
          }
          m.toneMapped = true;
        });
      }
    });
  }, [scene, project.color, project.size]);

  // Joue la premiere animation disponible (robot, oiseaux...)
  useEffect(() => {
    const first = Object.values(actions || {})[0];
    if (first) first.reset().fadeIn(0.3).play();
    return () => first?.fadeOut(0.2);
  }, [actions]);

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * 0.35;
      const target = hovered || focused ? 1.18 : 1;
      spin.current.scale.setScalar(
        THREE.MathUtils.lerp(spin.current.scale.x, target, 0.15)
      );
    }
    // emissif plus fort au survol
    const want = hovered || focused ? 0.9 : 0.35;
    scene.traverse((o) => {
      if (o.isMesh && o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          if ("emissiveIntensity" in m) {
            m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, want, 0.1);
          }
        });
      }
    });
  });

  const glow = project.size * 0.72;

  return (
    <group ref={group} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
      {/* halo lumineux additif -> le modele ressort sur le fond sombre */}
      <mesh>
        <sphereGeometry args={[glow, 32, 32]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered || focused ? 0.28 : 0.14}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {/* lumiere coloree de proximite */}
      <pointLight
        color={project.color}
        intensity={hovered || focused ? 3 : 1.4}
        distance={glow * 6}
      />
      <group ref={spin}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Enveloppe : flottement, label + interactions                       */
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
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
        <Model3D project={project} hovered={isHover} focused={isFocus} {...handlers} />

        {/* label toujours visible SOUS la planete */}
        <Html center distanceFactor={10} position={[0, -(project.size * 0.62 + 0.5), 0]}>
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
/*  Camera : focus progressif sur la planete selectionnee              */
/* ------------------------------------------------------------------ */
function CameraRig({ focusPos, controlsRef }) {
  const tmp = useRef(new THREE.Vector3());
  useFrame((state) => {
    const controls = controlsRef.current;
    if (!controls || !focusPos) return;
    const target = tmp.current.set(focusPos[0], focusPos[1], focusPos[2]);
    controls.target.lerp(target, 0.07);
    const camDesired = target.clone().add(new THREE.Vector3(0, 0.6, 3.6));
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
          <lineBasicMaterial attach="material" color="#38508f" transparent opacity={0.3} />
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

  const active =
    focused !== null ? PROJECTS[focused] : hovered !== null ? PROJECTS[hovered] : null;
  const focusPos = focused !== null ? PROJECTS[focused].position : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-[#05001a] via-[#0a0028] to-[#0d0133]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: true }}
        onPointerMissed={() => setFocused(null)}
      >
        <color attach="background" args={["#060616"]} />
        <fog attach="fog" args={["#060616", 14, 30]} />
        <ambientLight intensity={0.85} />
        <hemisphereLight args={["#bcd0ff", "#1a1030", 0.6]} />
        <directionalLight position={[6, 10, 8]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-8, -6, -4]} intensity={0.8} color="#5b3bff" />
        <Stars radius={120} depth={60} count={6000} factor={4} fade speed={0.6} />

        <OrbitControls
          ref={controlsRef}
          enableZoom
          enablePan={false}
          autoRotate={focused === null}
          autoRotateSpeed={0.5}
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
          Faites glisser pour tourner, molette pour zoomer, cliquez une planète pour l'explorer.
        </p>
      </div>

      {/* Panneau detail */}
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

// prechargement des modeles
PROJECTS.forEach((p) => useGLTF.preload(M(p.model)));

export default ProjectsConstellation;
