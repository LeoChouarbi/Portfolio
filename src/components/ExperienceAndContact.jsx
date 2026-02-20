import React from "react";

const experiences = [
  {
    title: "Ingénieur en Sécurité des Systèmes d'Information",
    company: "CS Group",
    duration: "Mars 2025 - Aujourd'hui",
    location: "Île-de-France",
    type: "CDI",
    description: [
      "Maintien en conditions de sécurité (MCS) de systèmes critiques",
      "Durcissement de systèmes, validation et déploiement sécurisé",
      "Réalisation de scripts de conformité et de remédiation",
      "Analyse de risques et rédaction de documentation de sécurité",
      "Tests de sécurité internes, gestion des vulnérabilités et suivi des corrections"
    ],
  },
  {
    title: "Stagiaire en Sécurité des Systèmes d'Information",
    company: "CS Group",
    duration: "Mars 2025 - Sept. 2025",
    location: "Île-de-France",
    type: "Stage",
    description: [
      "Analyse de vulnérabilités sur différents environnements",
      "Durcissement des systèmes et mise en œuvre de recommandations de sécurité",
      "Rédaction et exécution de plans de tests de sécurité",
      "Élaboration de rapports de tests et suivi des actions correctives"
    ],
  },
  {
    title: "Responsable de la Supervision",
    company: "Thales",
    duration: "Avr. 2024 - Août 2024",
    location: "Gennevilliers, Île-de-France",
    type: "Stage",
    description: [
      "Supervision de l'ensemble des machines et équipements de la plateforme à travers Hawk et Grafana",
      "Mission au sein d’un projet de grande envergure dans le domaine des télécommunications",
      "Gestion des infrastructures réseau",
      "Découverte des méthodes d’organisation et de management pour des projets de grande envergure"
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
