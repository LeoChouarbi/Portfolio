import React from "react";
import ShinyCard from "../components/ShinyCard";
import SkillCloud from "../components/SkillCloud";
import ConstellationPortal from "../components/ConstellationPortal";
import ExperienceAndContact from "../components/ExperienceAndContact";
import SectionHeading from "../components/SectionHeading";

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
    frontText: "Méthode d'analyse de risques (ISO 27005).",
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
      <section id="hero" className="text-center text-white mb-6 w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Ingénieur SSI / Cybersécurité
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
          Léo Chouarbi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Cybersécurité, SSI, radiofréquences et SDR. Maintien en condition de
          sécurité, durcissement, analyse de risques et projets techniques,
          présentés ici comme une constellation à explorer.
        </p>
      </section>

      {/* Appel à l'action mis en avant vers la constellation */}
      <section id="projects">
        <ConstellationPortal />
      </section>

      <section id="certifications" className="my-16">
        <SectionHeading
          kicker="Reconnaissances"
          title="Certifications"
          subtitle="Survolez une carte pour en découvrir le détail."
        />
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
        <SkillCloud />
      </section>

      <section id="experience-contact" className="my-10 max-w-7xl mx-auto">
        <ExperienceAndContact />
      </section>
    </div>
  );
};

export default Home;
