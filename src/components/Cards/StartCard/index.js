import React from "react";
import "./startCard.scss";

// Texte d'intro
const HeadTitle = () => (
  <h1>
    SPACE
    <span>PROJECT</span>
  </h1>
);

// Bouton Tutoriel
const TutoButton = ({ startTutoriel }) => {
  return (
    <a onClick={startTutoriel} className="small">
      Comment jouer ?
    </a>
  );
};

// Bouton Démarrer
const StartButton = ({ onChangeStatus }) => {
  return <button onClick={onChangeStatus}>Jouer</button>;
};

// Affichage de l'écran d'accueil
export default ({ onChangeStatus, startTutoriel }) => (
  <div className="startGame">
    <HeadTitle />
    <div className="listButtons">
      <StartButton onChangeStatus={onChangeStatus} />
      <TutoButton startTutoriel={startTutoriel} />
    </div>
  </div>
);
