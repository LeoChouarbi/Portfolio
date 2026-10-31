import React from "react";

// Expériences alignées sur le CV 2026 (missions SSI chez CS Group + enseignement ESIEA).
const experiences = [
  {
    title: "Ingénieur SSI — Contrôle aérien",
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
    title: "Ingénieur SSI — Lutte anti-drone",
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
    title: "Ingénieur SSI — Mission MCS",
    company: "CS Group",
    duration: "Depuis mars 2025",
    location: "Client très sensible",
    type: "CDI",
    description: [
      "Pilotage du Maintien en Condition de Sécurité d'un parc de machines sensibles (Linux, Windows 11)",
      "Scripts Bash/Python de durcissement (CIS, ANSSI) et de contrôle de conformité",
      "Gestion des vulnérabilités : Cyberwatch, Dependency-Track, SBOM/CBOM, VEX, CVSS",
      "Packages de sécurité, gestion de versions via Git/Gerrit, rapports et indicateurs MCS",
    ],
  },
  {
    title: "Ingénieur SSI — Durcissement Oracle Linux",
    company: "CS Group",
    duration: "Juin – juillet 2025",
    location: "Client sensible",
    type: "Mission",
    description: [
      "Durcissement de systèmes Oracle Linux selon les référentiels CIS et guides ANSSI",
      "Développement de scripts d'application et de validation du durcissement",
      "Dérogations temporaires contrôlées, contrôle BIOS, préparation d'images / clones disque",
      "Maîtrise des périphériques USB (USBGuard), appui au déploiement distant sécurisé",
    ],
  },
  {
    title: "Intervenant — Radiofréquences & SDR",
    company: "ESIEA",
    duration: "Depuis 2025",
    location: "Laval · niveau Bac+4",
    type: "Enseignement",
    description: [
      "Module de 15 h : cours magistraux et travaux pratiques (fondamentaux RF, DSP)",
      "Chaîne SDR complète : BladeRF 2.0 micro xA9, RTL-SDR, GNU Radio, GQRX",
      "Acquisition I/Q, analyse spectrale, modulation / démodulation",
      "Support de cours publié et maintenu en ligne (leochouarbi.github.io/radio)",
    ],
  },
  {
    title: "Responsable de la supervision",
    company: "Thales",
    duration: "Avr. – août 2024",
    location: "Gennevilliers",
    type: "Stage",
    description: [
      "Supervision des machines et équipements de la plateforme via Hawk et Grafana",
      "Projet télécom de grande envergure, gestion des infrastructures réseau",
      "Découverte des méthodes d'organisation et de management de grands projets",
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

const ExperienceAndContact = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Expériences professionnelles</h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-gray-800/80 p-6 rounded-xl shadow-md hover:shadow-cyan-500/40 transition duration-300"
            >
              <div className="flex justify-between items-start mb-3 gap-3">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${typeBadge(exp.type)}`}>
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
        <h2 className="text-3xl font-bold mb-4">Contact &amp; CV</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${import.meta.env.BASE_URL}CV_Leo_Chouarbi.pdf`}
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
            href="mailto:chouarbi@et.esiea.fr"
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
