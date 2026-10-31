import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Bloc d'appel à l'action mis en avant pour la constellation de projets.
 * Objectif : que les visiteurs ne la ratent plus (portail animé + CTA fort).
 */
const ORBIT_DOTS = [
  { orbit: "70px", size: 10, color: "#22d3ee", dur: "7s" },
  { orbit: "70px", size: 7, color: "#f472b6", dur: "9s", delay: "-3s" },
  { orbit: "105px", size: 8, color: "#a78bfa", dur: "12s" },
  { orbit: "105px", size: 6, color: "#34d399", dur: "15s", delay: "-6s" },
];

const ConstellationPortal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mt-10 flex max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0a0b2e]/80 via-[#0d0a2b]/70 to-[#12072e]/80 p-8 md:flex-row md:p-12"
    >
      {/* halo de fond */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Portail animé */}
      <Link
        to="/constellation"
        aria-label="Explorer la constellation de projets"
        className="group relative grid h-56 w-56 shrink-0 place-items-center"
      >
        {/* anneaux */}
        <span
          className="absolute inset-0 rounded-full border border-cyan-400/30"
          style={{ animation: "portalSpin 18s linear infinite" }}
        />
        <span
          className="absolute inset-6 rounded-full border border-fuchsia-400/30"
          style={{ animation: "portalSpin 12s linear infinite reverse" }}
        />
        <span
          className="absolute inset-12 rounded-full border border-violet-400/40"
          style={{ animation: "portalSpin 8s linear infinite" }}
        />
        {/* coeur lumineux */}
        <span className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 blur-md transition-all duration-500 group-hover:blur-lg group-hover:brightness-125" />
        <span
          className="absolute inset-[4.75rem] rounded-full bg-gradient-to-br from-cyan-300 to-indigo-400"
          style={{ animation: "portalPulse 3s ease-in-out infinite" }}
        />
        {/* planètes en orbite */}
        {ORBIT_DOTS.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              "--orbit": d.orbit,
              width: `${d.size}px`,
              height: `${d.size}px`,
              background: d.color,
              boxShadow: `0 0 12px ${d.color}`,
              animation: `orbitDot ${d.dur} linear infinite`,
              animationDelay: d.delay || "0s",
            }}
          />
        ))}
        <span className="relative z-10 text-sm font-semibold text-white/90 drop-shadow">Entrer</span>
      </Link>

      {/* Texte + CTA */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Expérience 3D interactive
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
          Explorez ma <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">constellation de projets</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300 md:mx-0">
          Chaque planète est un projet : Radio/SDR, satellite, MCS et durcissement,
          lutte anti-drone, contrôle aérien, moteur 3D, IA. Naviguez, survolez et
          cliquez pour plonger dans chacun.
        </p>
        <Link
          to="/constellation"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-7 py-3 text-base font-semibold text-white shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)] transition hover:scale-[1.03] hover:shadow-[0_0_36px_-2px_rgba(217,70,239,0.7)]"
        >
          Explorer la constellation
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ConstellationPortal;
