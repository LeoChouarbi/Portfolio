import React from "react";
import ShinyCard from "../components/ShinyCard";
import { Link } from "react-router-dom";
import SkillGrid from "../components/SkillGrid";
import ExperienceAndContact from "../components/ExperienceAndContact";

const certifications = [
  {
    frontTitle: "AWS CCP",
    frontText: "Cloud Amazon Web Services.",
    backTitle: "Obtenue",
    backText: "Avril 2025",
  },
  {
    frontTitle: "CSNA Stormshield",
    frontText: "Sécurité des réseaux et pare-feux.",
    backTitle: "Exp. : Janv. 2028",
    backText: "Janvier 2025",
  },
  {
    frontTitle: "Ebios RM (ANSSI)",
    frontText: "Méthodologie d’analyse de risques.ISO 27005",
    backTitle: "Obtenue",
    backText: "Janvier 2025",
  },
  {
    frontTitle: "WCA PAM",
    frontText: "Privileged Access Management - WALLIX.",
    backTitle: "Obtenue",
    backText: "Novembre 2024",
  },
  {
    frontTitle: "TOEIC 940/990",
    frontText: "Anglais professionnel (C1).",
    backTitle: "Obtenue",
    backText: "Janvier 2024",
  },
  {
    frontTitle: "TryHackMe Jr PenTester",
    frontText: "Formation en test d'intrusion.\nTryHackme TOP 2% : 16500 points",
    backTitle: "Obtenue",
    backText: "Octobre 2023",
  },
  {
    frontTitle: "CCNAv7",
    frontText: "Cisco Networking Academy.",
    backTitle: "Obtenue",
    backText: "Avril 2023",
  },
  {
    frontTitle: "Handimanagement",
    frontText: "Label éthique & inclusion.",
    backTitle: "Obtenue",
    backText: "Décembre 2024",
  },
  {
    frontTitle: "ISO 27001 Lead Implementer",
    frontText: "Mise en œuvre ISO 27001.",
    backTitle: "Obtenue",
    backText: "Février 2026",
    inProgress: false,
  },
  {
    frontTitle: "CompTIA Security+",
    frontText: "Cybersécurité - certification internationale.",
    backTitle: "Préparation",
    backText: "Prévu 2026",
    inProgress: true,
  },
];


const Home = () => {
  return (
    <div className="px-6 py-10 w-full max-w-screen-2xl mx-auto">
      <section id="hero" className="text-center text-white mb-10 w-full">
        <h1 className="text-3xl font-bold">Bienvenue sur mon Portfolio, bonne découverte </h1>
        <h3>Léo Chouarbi</h3>
        <Link
          to="/constellation"
          className="mt-4 inline-block rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
        >
          Explorer la constellation de projets
        </Link>
      </section>

      <section id="certifications" className="my-10">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Certifications 🏆</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <ShinyCard
              key={index}
              frontTitle={cert.frontTitle}
              frontText={cert.frontText}
              backTitle={cert.backTitle}
              backText={cert.backText}
              inProgress={cert.inProgress}
            />

          ))}
        </div>
      </section>

      <section id="skills" className="my-10 max-w-7xl mx-auto">
        <SkillGrid />
      </section>

      <section id="experience-contact" className="my-10 max-w-7xl mx-auto">
        <ExperienceAndContact />
      </section>
    </div>
  );
};

export default Home;
