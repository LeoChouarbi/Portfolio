import React, { useRef, useState } from "react";
import "./ShinyCard.css";

// quelques paillettes placees aleatoirement (positions fixes -> pas de re-render)
const SPARKLES = [
  { top: "12%", left: "18%", delay: "0s", size: 3 },
  { top: "24%", left: "72%", delay: "0.6s", size: 2 },
  { top: "68%", left: "28%", delay: "1.1s", size: 2.5 },
  { top: "80%", left: "66%", delay: "0.3s", size: 3 },
  { top: "44%", left: "86%", delay: "1.6s", size: 2 },
  { top: "58%", left: "10%", delay: "0.9s", size: 2.5 },
];

const ShinyCard = ({ frontTitle, frontText, backTitle, backText, inProgress }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef();

  // Survol = retournement (affordance implicite, aucune consigne a ecrire)
  const handleMouseEnter = () => setIsFlipped(true);

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  // Clic = fige / libere le retournement (support tactile et volontaire)
  const handleClick = () => setIsFlipped((f) => !f);

  // La souris pilote seulement le reflet holographique, pas la rotation
  // de la carte : le retournement reste une animation propre et visible.
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const holo = card.querySelector(".holo-overlay");
    if (holo) {
      holo.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      holo.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    }
  };

  return (
    <div className="shiny-card-wrapper">
      <div
        ref={cardRef}
        className={`shiny-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="card-face card-front">
          <div className="holo-overlay" />
          <div className="card-shine" />
          <div className="sparkles">
            {SPARKLES.map((s, i) => (
              <span
                key={i}
                className="sparkle"
                style={{
                  top: s.top,
                  left: s.left,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animationDelay: s.delay,
                }}
              />
            ))}
          </div>

          <span className="flip-hint" aria-hidden="true">⤻</span>
          <h3>{frontTitle}</h3>
          <p>{frontText}</p>
          {inProgress && <div className="progress-badge">En cours</div>}
        </div>

        <div className="card-face card-back">
          <div className="card-shine" />
          <span className="back-check" aria-hidden="true">✓</span>
          <h3>{backTitle}</h3>
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default ShinyCard;
