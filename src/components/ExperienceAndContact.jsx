import React from "react";
import SectionHeading from "./SectionHeading";

// Parcours SSI (missions en CDI + stage).
const ssiExperiences = [
  {
    title: "Ingénieur SSI - Contrôle aérien",
    company: "CS Group",
    duration: "Depuis oct. 2025",
    location: "Client sensible",
    type: "CDI",
    description: [
      "Rédaction, relecture et analyse de documents de sécurité projet (PTSSI, RTSSI)",
      "Pilotage et coordination des activités SSI avec les chefs de projet et les équipes techniques",
      "Préparation et suivi des comités techniques, traçabilité des décisions et actions",
      "Analyse des besoins de sécurité, des architectures et des écarts de conformité",
      "Contribution à la gouvernance SSI et au MCS/MCO",
    ],
  },
  {
    title: "Ingénieur SSI - Lutte anti-drone",
    company: "CS Group",
    duration: "Depuis mai 2025",
    location: "Trois projets sensibles",
    type: "CDI",
    description: [
      "Rédaction de Plans d'Assurance Sécurité, fiches de lot et dossiers techniques",
      "Analyses de risques EBIOS RM, revue d'architectures, réseaux et VLAN",
      "Vérification de conformité, certificats et empreintes cryptographiques",
      "Prise en compte des exigences OTAN et du contrôle des exportations",
    ],
  },
  {
    title: "Ingénieur SSI - Mission MCS",
    company: "CS Group",
    duration: "Depuis mars 2025",
    location: "Client très sensible",
    type: "CDI",
    description: [
      "Pilotage du Maintien en Condition de Sécurité d'un parc de machines sensibles (Linux, Windows 11)",
      "Scripts Bash et Python de durcissement (CIS, ANSSI) et de contrôle de conformité",
      "Gestion des vulnérabilités : Cyberwatch, Dependency-Track, SBOM/CBOM, VEX, CVSS",
      "Packages de sécurité, gestion de versions via Git/Gerrit, rapports et indicateurs MCS",
    ],
  },
  {
    title: "Ingénieur SSI - Durcissement Oracle Linux",
    company: "CS Group",
    duration: "Juin à juillet 2025",
    location: "Client sensible",
    type: "Mission",
    description: [
      "Durcissement de systèmes Oracle Linux selon les référentiels CIS et les guides ANSSI",
      "Développement de scripts d'application et de validation du durcissement",
      "Dérogations temporaires contrôlées, contrôle BIOS, préparation d'images et clones disque",
      "Maîtrise des périphériques USB (USBGuard), appui au déploiement distant sécurisé",
    ],
  },
  {
    title: "Responsable de la supervision (stage)",
    company: "Thales",
    duration: "Avril à août 2024 (5 mois)",
    location: "Gennevilliers",
    type: "Stage",
    description: [
      "Supervision de l'ensemble des machines et équipements de la plateforme via Hawk et Grafana",
      "Projet de télécommunications de grande envergure, gestion des infrastructures réseau",
      "Découverte des méthodes d'organisation et de management de projets d'ampleur",
    ],
  },
];

// Enseignement et projets radio (distinct du parcours SSI).
const radioExperiences = [
  {
    title: "Intervenant - Radiofréquences & SDR",
    company: "ESIEA",
    duration: "Depuis 2025",
    location: "Niveau Bac+4",
    type: "Enseignement",
    description: [
      "Module de 15 h : cours magistraux et travaux pratiques (fondamentaux RF, traitement du signal)",
      "Chaîne SDR complète : BladeRF 2.0 micro xA9, RTL-SDR, GNU Radio, GQRX",
      "Acquisition I/Q, analyse spectrale, modulation et démodulation",
      "Support de cours publié et maintenu en ligne (leochouarbi.github.io/radio)",
    ],
  },
];

const typeBadge = (type) => {
  switch (type) {
    case "CDI":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    case "Enseignement":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    case "Stage":
      return "bg-violet-500/20 text-violet-300 border border-violet-500/30";
    default:
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
  }
};

const ExperienceCard = ({ exp }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-md transition duration-300 hover:border-cyan-400/40 hover:shadow-cyan-500/20">
    <span className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-fuchsia-500 opacity-60" />
    <div className="mb-3 flex items-start justify-between gap-3">
      <h3 className="text-xl font-semibold">{exp.title}</h3>
      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${typeBadge(exp.type)}`}>
        {exp.type}
      </span>
    </div>
    <p className="mb-1 text-sm font-medium text-cyan-300">
      {exp.company} · {exp.duration}
    </p>
    <p className="mb-4 text-xs text-gray-400">{exp.location}</p>
    <ul className="mt-4 grid list-inside list-disc grid-cols-1 gap-3 text-sm text-slate-200 md:grid-cols-2">
      {exp.description.map((desc, i) => (
        <li key={i}>{desc}</li>
      ))}
    </ul>
  </div>
);

const ExperienceAndContact = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-white">
      <section className="mb-16">
        <SectionHeading
          kicker="Parcours"
          title="Expériences professionnelles"
          subtitle="Missions de sécurité des systèmes d'information, en CDI et en mission."
        />
        <div className="space-y-6">
          {ssiExperiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading
          kicker="Transmettre"
          title="Enseignement & Radio"
          subtitle="Cours de radiofréquences et radio logicielle (SDR) à l'ESIEA."
        />
        <div className="space-y-6">
          {radioExperiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading kicker="Échanger" title="Contact & CV" />
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`${import.meta.env.BASE_URL}CV_Leo_Chouarbi.pdf`}
            download="CV_Leo_Chouarbi.pdf"
            className="rounded-full bg-cyan-500 px-6 py-2 text-white shadow-md transition hover:bg-cyan-600"
          >
            Télécharger mon CV
          </a>
          <a
            href="https://www.linkedin.com/in/leo-chouarbi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
          >
            LinkedIn
          </a>
          <a
            href="mailto:leochouarbi@gmail.com"
            className="rounded-full bg-gray-700 px-6 py-2 text-white shadow-md transition hover:bg-gray-800"
          >
            Me contacter
          </a>
        </div>
      </section>
    </div>
  );
};

export default ExperienceAndContact;
