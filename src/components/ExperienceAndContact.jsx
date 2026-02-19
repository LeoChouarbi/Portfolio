import React from "react";

const stages = [
  {
    title: "Stagiaire en sécurité des systèmes d'information",
    company: "CS Group (Sopra Steria Group)",
    duration: "Mars 2025 - Sept. 2025 · 7 mois",
    location: "Le Plessis-Robinson, Île-de-France, France · Sur site",
    description: [
      "Analyse de vulnérabilités sur différents environnements critiques",
      "Durcissement des systèmes et mise en œuvre de recommandations de sécurité",
      "Rédaction et exécution de plans de tests de sécurité",
      "Élaboration de rapports de tests et suivi des actions correctives",
      "Maintien en conditions de sécurité (MCS) des systèmes critiques",
      "Veille sécurité et application des référentiels ANSSI"
    ],
  },
  {
    title: "Responsable de la Supervision",
    company: "Thales SIX GTS",
    duration: "Avr. 2024 - Août 2024 · 5 mois",
    location: "Gennevilliers, Île-de-France, France · Sur site",
    description: [
      "Supervision des machines/équipements via Hawk puis Grafana",
      "Intégré à une équipe de 20 personnes sur projet télécoms d'envergure",
      "Gestion complète des infrastructures réseau de la plateforme",
      "Développement des compétences en organisation et management d'équipe",
      "Compréhension des méthodes de travail en environnement critique"
    ],
  },
];

const cdi = [
  {
    title: "Ingénieur SSI",
    company: "CS Group",
    duration: "Sept. 2025 - Aujourd'hui · 6 mois",
    location: "Le Plessis-Robinson, Île-de-France, France · Sur site",
    description: [
      "Conception d'architectures sécurisées (Security by Design - Phase Build)",
      "Définition d'exigences sécurité dès la genèse des projets",
      "Recherche et préconisation de solutions techniques innovantes",
      "Analyses de risques approfondies (méthodologie EBIOS RM)",
      "Modélisation de scénarios de menaces et plans de traitement",
      "Durcissement équipements (CIS benchmarks, référentiels internes)",
      "Audits sécurité et analyses de vulnérabilités (scanners)",
      "Maintien en Conditions de Sécurité (MCS) environnements critiques",
      "Développement d'outils internes d'automatisation et d'analyse",
      "Accompagnement stratégique et technique des clients",
      "Rédaction documentation sécurité (DAS, politiques)"
    ],
  },
];

const ExperienceAndContact = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-white">
      {/* Stages Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Stages Professionnels
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {stages.map((exp, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-cyan-500/50 transition-all duration-500 border border-gray-700 hover:border-cyan-500/50"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                  Stage
                </span>
              </div>
              <p className="text-lg text-cyan-400 mb-2 font-medium">
                {exp.company}
              </p>
              <p className="text-sm text-gray-400 mb-6">
                {exp.duration} | {exp.location}
              </p>
              <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                {exp.description.map((desc, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CDI Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Expérience CDI
        </h2>
        <div className="max-w-4xl mx-auto">
          {cdi.map((exp, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-emerald-900/30 to-gray-900/50 p-10 rounded-3xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 border-2 border-emerald-500/30 hover:border-emerald-500/60 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-3xl font-black text-white">{exp.title}</h3>
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl text-lg font-bold border border-emerald-500/30">
                  CDI Actuel
                </span>
              </div>
              <p className="text-xl text-emerald-400 mb-3 font-semibold">
                {exp.company}
              </p>
              <p className="text-base text-gray-300 mb-8">
                {exp.duration} | {exp.location}
              </p>
              
              {/* Missions organisées par domaine */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">🚀 Ingénierie & Security by Design</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conception architectures sécurisées avec architectes
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Exigences sécurité dès la phase Build
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Solutions techniques innovantes
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-emerald-400 mb-3">🛡️ Sécurité Opérationnelle & Hardening</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Hardening CIS benchmarks + référentiels internes
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Audits et scans de vulnérabilités réguliers
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      MCS environnements critiques
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-blue-400 mb-3">⚠️ Gouvernance & Analyse Risques</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Analyses EBIOS RM + modélisation menaces
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Veille ANSSI et normes internationales
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-purple-400 mb-3">💻 Outils & Innovation</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Développement outils internes sur mesure
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Automatisation analyses et défense
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center pt-16">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Contact & CV
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <a
            href="/portfolio/CV_Leo_Chouarbi.pdf"
            download="CV_Leo_Chouarbi.pdf"
            className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l-5.5 5.5m0 0L12 21l5.5-5.5m-5.5 5.5V7" />
            </svg>
            Télécharger mon CV
          </a>
          
          <a
            href="https://www.linkedin.com/in/leo-chouarbi"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774.0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.227 24 24 23.227 24 22.271V1.729C24 .774 23.227 0 22.225 0z"/>
            </svg>
            LinkedIn
          </a>
          
          <a
            href="mailto:chouarbi@et.esiea.fr"
            className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 4.84A2 2 0 0110.73 11H3v2h7.73a2 2 0 01.73.44l7.27 4.84zM20 8H6.73a2 2 0 00-.73.44L3 12.29V4a1 1 0 011-1h16a1 1 0 011 1v4z" />
            </svg>
            Me contacter
          </a>
        </div>
      </section>
    </div>
  );
};

export default ExperienceAndContact;
