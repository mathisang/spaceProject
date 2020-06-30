import React from "react";

// Texte d'intro
const Text = () => <p>Contexte du jeu</p>;

// Bouton Tutoriel
const TutoButton = ({ startTutoriel }) => {
  return <button onClick={startTutoriel}>Lancer le tutoriel</button>;
};

// Bouton Démarrer
const StartButton = ({ onChangeStatus }) => {
  return <button onClick={onChangeStatus}>Commencer l'aventure</button>;
};

// Affichage de l'écran d'accueil
export default ({ onChangeStatus, startTutoriel }) => (
  <div>
    <Text />
    <TutoButton startTutoriel={startTutoriel} />
    <StartButton onChangeStatus={onChangeStatus} />
  </div>
);
