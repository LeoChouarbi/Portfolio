import { useEffect, useMemo, useRef, useState } from "react";
import "./SkillCloud.css";

/**
 * Nuage de compétences interactif ("newgen" / awwwards-like).
 * - Les bulles flottent en continu (mouvement organique).
 * - Au passage de la souris, elles s'écartent de façon fluide ("effet eau")
 *   puis reviennent doucement à leur place (ressort).
 * - Filtres par catégorie : les compétences hors catégorie s'estompent.
 *
 * Perf : la boucle d'animation met à jour directement le `transform` via refs
 * (pas de re-render React par frame).
 */

// Catégories + couleur d'accent (glow)
const CATEGORIES = {
  Humain: { label: "Savoir-être & Humain", color: "#facc15" },
  Expertise: { label: "Expertise & Posture", color: "#2dd4bf" },
  SSI: { label: "SSI & Gouvernance", color: "#22d3ee" },
  Systemes: { label: "Systèmes", color: "#a78bfa" },
  Durcissement: { label: "Durcissement", color: "#f472b6" },
  Vulns: { label: "Vulnérabilités / MCS", color: "#f59e0b" },
  Reseau: { label: "Réseau & Crypto", color: "#34d399" },
  Radio: { label: "Radio / SDR", color: "#60a5fa" },
  Auto: { label: "Automatisation", color: "#fb7185" },
  Outils: { label: "Outils & Versions", color: "#c084fc" },
};

// Compétences issues du CV 2026. `w` = poids (taille de la bulle).
const SKILLS = [
  // Savoir-être & humain : le coeur du métier SSI (collectif, écoute, transmission)
  { name: "Esprit d'équipe", cat: "Humain", w: 1.6 },
  { name: "Sens du collectif", cat: "Humain", w: 1.3 },
  { name: "Communication claire", cat: "Humain", w: 1.4 },
  { name: "Pédagogie & vulgarisation", cat: "Humain", w: 1.45 },
  { name: "Écoute & conseil", cat: "Humain", w: 1.3 },
  { name: "Esprit d'analyse", cat: "Humain", w: 1.3 },
  { name: "Rigueur", cat: "Humain", w: 1.25 },
  { name: "Autonomie", cat: "Humain", w: 1.2 },
  { name: "Adaptabilité", cat: "Humain", w: 1.2 },
  { name: "Curiosité technique", cat: "Humain", w: 1.25 },
  { name: "Gestion du stress", cat: "Humain", w: 1.1 },
  { name: "Fiabilité & engagement", cat: "Humain", w: 1.2 },

  // Expertise & posture : compétences orientées valeur / rôle (recrutement & évolution)
  { name: "Pilotage MCS / MCO", cat: "Expertise", w: 1.6 },
  { name: "Analyse de risques (EBIOS RM)", cat: "Expertise", w: 1.5 },
  { name: "Gestion des vulnérabilités", cat: "Expertise", w: 1.45 },
  { name: "Durcissement & conformité", cat: "Expertise", w: 1.5 },
  { name: "Gouvernance & conseil SSI", cat: "Expertise", w: 1.35 },
  { name: "Rédaction de livrables SSI", cat: "Expertise", w: 1.3 },
  { name: "Audit & contrôle de conformité", cat: "Expertise", w: 1.3 },
  { name: "Coordination projet & comités", cat: "Expertise", w: 1.25 },
  { name: "Automatisation & industrialisation", cat: "Expertise", w: 1.3 },
  { name: "Anglais C1 (TOEIC 940)", cat: "Expertise", w: 1.15 },

  // SSI & gouvernance
  { name: "MCS / MCO", cat: "SSI", w: 1.4 },
  { name: "EBIOS RM", cat: "SSI", w: 1.2 },
  { name: "ISO 27001", cat: "SSI", w: 1.2 },
  { name: "ISO 27005", cat: "SSI", w: 1 },
  { name: "PAS / PTSSI / RTSSI", cat: "SSI", w: 1.1 },
  { name: "CIS Benchmarks", cat: "SSI", w: 1 },
  { name: "Guides ANSSI", cat: "SSI", w: 1.1 },
  { name: "Exigences OTAN", cat: "SSI", w: 0.9 },

  // Systèmes
  { name: "Oracle Linux 9", cat: "Systemes", w: 1.3 },
  { name: "RHEL", cat: "Systemes", w: 1 },
  { name: "Debian / Ubuntu", cat: "Systemes", w: 1 },
  { name: "Windows 11", cat: "Systemes", w: 1.1 },
  { name: "SELinux", cat: "Systemes", w: 1 },
  { name: "AppArmor", cat: "Systemes", w: 0.9 },

  // Durcissement / mécanismes
  { name: "auditd", cat: "Durcissement", w: 0.95 },
  { name: "PAM / authselect", cat: "Durcissement", w: 0.95 },
  { name: "nftables", cat: "Durcissement", w: 1 },
  { name: "USBGuard", cat: "Durcissement", w: 0.9 },
  { name: "BitLocker / TPM", cat: "Durcissement", w: 0.95 },
  { name: "Defender", cat: "Durcissement", w: 0.9 },

  // Vulnérabilités / MCS
  { name: "Cyberwatch", cat: "Vulns", w: 1.2 },
  { name: "Dependency-Track", cat: "Vulns", w: 1.1 },
  { name: "SBOM / CBOM", cat: "Vulns", w: 1 },
  { name: "CycloneDX", cat: "Vulns", w: 0.9 },
  { name: "Syft / cdxgen", cat: "Vulns", w: 0.85 },
  { name: "VEX", cat: "Vulns", w: 0.85 },
  { name: "CVSS v3.1 / v4", cat: "Vulns", w: 0.95 },

  // Réseau & crypto
  { name: "Stormshield", cat: "Reseau", w: 1 },
  { name: "Cisco", cat: "Reseau", w: 0.95 },
  { name: "VLAN", cat: "Reseau", w: 0.85 },
  { name: "TLS / OpenSSL", cat: "Reseau", w: 1 },
  { name: "Nmap", cat: "Reseau", w: 0.95 },
  { name: "testssl.sh", cat: "Reseau", w: 0.8 },
  { name: "Wireshark", cat: "Reseau", w: 0.9 },
  { name: "Apache (sec)", cat: "Reseau", w: 0.85 },

  // Radio / SDR
  { name: "BladeRF 2.0 xA9", cat: "Radio", w: 1.1 },
  { name: "RTL-SDR", cat: "Radio", w: 1 },
  { name: "GNU Radio", cat: "Radio", w: 1.1 },
  { name: "GQRX", cat: "Radio", w: 0.9 },
  { name: "Signaux I/Q", cat: "Radio", w: 0.95 },
  { name: "Analyse spectrale", cat: "Radio", w: 0.95 },
  { name: "Modulation / démod.", cat: "Radio", w: 0.9 },

  // Automatisation
  { name: "Bash", cat: "Auto", w: 1.3 },
  { name: "Python", cat: "Auto", w: 1.3 },
  { name: "Ansible", cat: "Auto", w: 1 },

  // Outils & versions
  { name: "Git / Gerrit", cat: "Outils", w: 1.1 },
  { name: "SVN", cat: "Outils", w: 0.8 },
  { name: "VirtualBox / WSL2", cat: "Outils", w: 0.9 },
  { name: "ISO / SquashFS", cat: "Outils", w: 0.8 },
];

// Placement en spirale de Fermat (angle d'or) -> dispersion homogène dans un disque
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function computeBasePositions(count) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const r = Math.sqrt(t); // 0..1
    const a = i * GOLDEN_ANGLE;
    pts.push({
      // fractions centrées (-1..1), aplaties horizontalement pour remplir large
      fx: Math.cos(a) * r * 1.15,
      fy: Math.sin(a) * r * 0.95,
      phase: i * 1.7, // déphasage du flottement
      speed: 0.4 + (i % 5) * 0.08,
    });
  }
  return pts;
}

const SkillCloud = () => {
  const containerRef = useRef(null);
  const bubbleRefs = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const sizeRef = useRef({ w: 0, h: 0 });
  const stateRef = useRef([]); // { x, y, ox, oy } offsets courants (px)
  const rafRef = useRef(0);

  const [active, setActive] = useState("Tous");

  const base = useMemo(() => computeBasePositions(SKILLS.length), []);

  // init état physique
  if (stateRef.current.length !== SKILLS.length) {
    stateRef.current = SKILLS.map(() => ({ ox: 0, oy: 0 }));
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const start = performance.now();

    const loop = (now) => {
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      // rayon d'influence de la souris relatif à la taille
      const influence = Math.min(w, h) * 0.32;
      const t = (now - start) / 1000;

      for (let i = 0; i < SKILLS.length; i++) {
        const node = bubbleRefs.current[i];
        if (!node) continue;
        const b = base[i];
        const st = stateRef.current[i];

        // position d'ancrage (sans offset)
        const anchorX = cx + b.fx * (w * 0.42);
        const anchorY = cy + b.fy * (h * 0.42);

        // flottement organique
        const floatX = Math.sin(t * b.speed + b.phase) * 10;
        const floatY = Math.cos(t * b.speed * 0.9 + b.phase) * 10;

        // répulsion fluide depuis la souris
        let targetOx = floatX;
        let targetOy = floatY;
        if (mouse.current.active) {
          const dx = anchorX + floatX - mouse.current.x;
          const dy = anchorY + floatY - mouse.current.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < influence) {
            // force douce (quadratique) -> sensation d'eau repoussée
            const force = (1 - dist / influence) ** 2 * influence * 0.9;
            targetOx += (dx / dist) * force;
            targetOy += (dy / dist) * force;
          }
        }

        // ressort / easing vers la cible (retour fluide)
        st.ox += (targetOx - st.ox) * 0.12;
        st.oy += (targetOy - st.oy) * 0.12;

        const x = anchorX + st.ox;
        const y = anchorY + st.oy;
        // léger rebond d'échelle quand repoussé
        const push = Math.hypot(st.ox - floatX, st.oy - floatY);
        const scale = 1 + Math.min(push / 260, 0.22);

        node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [base]);

  const onMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.active = true;
  };
  const onLeave = () => {
    mouse.current.active = false;
  };

  return (
    <div className="skillcloud">
      <h2 className="skillcloud__title">Compétences & savoir-être</h2>
      <p className="skillcloud__subtitle">
        Survolez le nuage, les compétences réagissent à votre curseur. Filtrez par domaine.
      </p>

      <div className="skillcloud__filters">
        <button
          className={`skillcloud__chip ${active === "Tous" ? "is-active" : ""}`}
          onClick={() => setActive("Tous")}
          style={active === "Tous" ? { "--chip": "#e5e7eb" } : undefined}
        >
          Tous
        </button>
        {Object.entries(CATEGORIES).map(([key, c]) => (
          <button
            key={key}
            className={`skillcloud__chip ${active === key ? "is-active" : ""}`}
            style={{ "--chip": c.color }}
            onClick={() => setActive(active === key ? "Tous" : key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="skillcloud__stage"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {SKILLS.map((s, i) => {
          const c = CATEGORIES[s.cat];
          const dimmed = active !== "Tous" && active !== s.cat;
          const fontSize = 0.72 + s.w * 0.34; // rem
          return (
            <div
              key={s.name}
              ref={(n) => (bubbleRefs.current[i] = n)}
              className={`skillcloud__bubble ${dimmed ? "is-dimmed" : ""}`}
              style={{
                "--accent": c.color,
                fontSize: `${fontSize}rem`,
              }}
              title={c.label}
            >
              {s.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillCloud;
