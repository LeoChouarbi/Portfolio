/**
 * Titre de section réutilisable et soigné (kicker + titre dégradé + filet animé).
 * Remplace les <h2> bruts pour un rendu plus "premium".
 */
const SectionHeading = ({ kicker, title, subtitle, align = "center" }) => {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col ${alignCls} mb-10`}>
      {kicker && (
        <span className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <span className="section-divider mt-4" />
      {subtitle && (
        <p className="mt-4 max-w-2xl text-slate-300/90 text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
