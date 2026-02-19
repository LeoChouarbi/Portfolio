import React from "react";

const experiences = [
  {
    title: "Ingénieur SSI - Communications Aériennes",
    company: "CS Group (Client Très Sensible)",
    duration: "Mars 2025 - Aujourd'hui",
    location: "Le Plessis-Robinson, Île-de-France",
    type: "CDI",
    description: [
      "Durcissement de machines et validation",
      "Réalisation de scripts de conformité et de remédiation",
      "Gestion des licences et déploiement Trellix",
      "Pentest interne sur le périmètre projet",
      "Gestion des Faits Techniques (FT) et push GERRIT",
      "Maintien en Condition de Sécurité (MCS)"
    ],
  },
  {
    title: "Ingénieur SSI - Lutte Anti-Drone",
    company: "CS Group (Client Sensible)",
    duration: "Mai 2025 - Aujourd'hui",
    location: "Le Plessis-Robinson, Île-de-France",
    type: "Projet",
    description: [
      "Rédaction et mise à jour de fiches de lot et documents client",
      "Analyse de schémas d’infrastructure technique",
      "Rédaction de dossier de définition technique orienté sécurité",
      "Revue d’analyse de risque EBIOS RM et ajout de scénarios",
      "Critique SSI des équipements selon exigences client"
    ],
  },
  {
    title: "Ingénieur SSI - Contrôle Aérien",
    company: "CS Group (Client Sensible)",
    duration: "Oct. 2025 - Aujourd'hui",
    location: "Le Plessis-Robinson, Île-de-France",
    type: "Projet",
    description: [
      "Rédaction, relecture et analyse du PTSSI",
      "Rédaction et réalisation du RTSSI",
      "Leading projet côté SSI",
      "Animation de Cotech avec le projet"
    ],
  },
  {
    title: "Ingénieur SSI - Mission Ponctuelle",
    company: "CS Group",
    duration: "Juin 2025 - Juil. 2025",
    location: "Toulon / Le Plessis-Robinson",
    type: "Mission",
    description: [
      "Durcissement de machines et validation (Oracle Linux)",
      "Scripts de dérogation et de conformité",
      "Clone de disque bit à bit",
      "Validation configuration BIOS et hardware (Deep Clear CMOS)",
      "Déploiement OS sécurisé sur site"
    ],
  },
];

const ExperienceAndContact = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Expériences professionnelles</h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-cyan-500/40 transition duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.type === "CDI"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  }`}>
                  {exp.type}
                </span>
              </div>
              <p className="text-sm text-cyan-400 mb-2">
                {exp.company} – {exp.duration}
              </p>
              <p className="text-xs text-gray-400 mb-4">{exp.location}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 list-disc list-inside text-sm">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Contact & CV</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/portfolio/CV_Leo_Chouarbi.pdf"
            download="CV_Leo_Chouarbi.pdf"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full shadow-md"
          >
            Télécharger mon CV
          </a>
          <a
            href="https://www.linkedin.com/in/leo-chouarbi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md"
          >
            LinkedIn
          </a>
          <a
            order="mailto:chouarbi@et.esiea.fr"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full shadow-md"
          >
            Me contacter
          </a>
        </div>
      </section>
    </div>
  );
};

export default ExperienceAndContact;
