import { useState } from "react";
import {
  FaPython, FaJsSquare, FaReact, FaGitAlt, FaNodeJs,
  FaDocker, FaTerminal, FaGithub, FaGitlab, FaBitbucket,
  FaAws
} from "react-icons/fa";
import {
  SiTailwindcss, SiPostgresql, SiMongodb, SiGrafana, SiAnsible,
  SiGooglecloud, SiWireshark
} from "react-icons/si";


const skillsData = [
  // Compétences Métier
  { name: "MCS (Maintien en Condition de Sécurité)", type: "Métier", icon: <FaTerminal size={28} /> },
  { name: "Durcissement (CIS, ANSSI)", type: "Métier", icon: <FaTerminal size={28} /> },
  { name: "Analyse de vulnérabilités", type: "Métier", icon: <FaTerminal size={28} /> },
  { name: "Gestion de crise / Incidents", type: "Métier" },
  { name: "EBIOS RM 27005", type: "Métier" },
  { name: "ISO 27001", type: "Métier" },

  // Systèmes & Sécurité
  { name: "Linux (Ubuntu, Debian, RHEL)", type: "Systèmes", icon: <FaTerminal size={28} /> },
  { name: "Apache 2.4.x (Sec)", type: "Systèmes", icon: <SiAnsible size={28} /> },
  { name: "PHP 7.x (Sec)", type: "Systèmes" },
  { name: "PostgreSQL 13 (Sec)", type: "Systèmes", icon: <SiPostgresql size={28} /> },
  { name: "SELinux / AppArmor", type: "Systèmes" },

  // Outils de Sécurité
  { name: "Cyberwatch", type: "Sécurité", icon: <FaTerminal size={28} /> },
  { name: "Dependency Track", type: "Sécurité" },
  { name: "Nmap", type: "Sécurité", icon: <FaTerminal size={28} /> },
  { name: "LinPEAS", type: "Sécurité" },
  { name: "OpenSSL", type: "Sécurité" },
  { name: "Wireshark", type: "Sécurité", icon: <SiWireshark size={28} /> },

  // Automatisation & IA
  { name: "Bash Scripting", type: "Automatisation", icon: <FaTerminal size={28} /> },
  { name: "Python Scripting", type: "Automatisation", icon: <FaPython size={28} /> },
  { name: "Ansible", type: "Automatisation", icon: <SiAnsible size={28} /> },

  // Virtualisation & Autres
  { name: "VirtualBox", type: "Virtualisation" },
  { name: "WSL2", type: "Virtualisation" },
  { name: "Images (ISO, SquashFS)", type: "Virtualisation" },
  { name: "Git / GERRIT", type: "Outils Dev", icon: <FaGitAlt size={28} /> },
];

const filters = [
  "Tous",
  "Métier",
  "Systèmes",
  "Sécurité",
  "Automatisation",
  "Virtualisation",
  "Outils Dev"
];

const SkillGrid = () => {
  const [selected, setSelected] = useState("Tous");
  const [expanded, setExpanded] = useState(false);

  const filteredSkills =
    selected === "Tous"
      ? skillsData
      : skillsData.filter((s) => s.type === selected);

  const skillsToShow = expanded ? filteredSkills : filteredSkills.slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Mes Compétences</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filters.map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelected(type);
              setExpanded(false); // reset scroll when filter changes
            }}
            className={`px-4 py-2 rounded-full border ${selected === type
                ? "bg-white text-black font-semibold"
                : "bg-transparent border-white text-white"
              } transition duration-300`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skillsToShow.map((skill, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-900 text-center rounded-xl py-6 px-4 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-2 flex justify-center">{skill.icon}</div>
            <div className="text-sm font-medium">{skill.name}</div>
          </div>
        ))}
      </div>

      {filteredSkills.length > 12 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-cyan-400 hover:underline font-medium"
          >
            {expanded ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillGrid;