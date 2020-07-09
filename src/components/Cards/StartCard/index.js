import React from "react";
import "./startCard.scss";
import { logo } from "../../../assets/images/index";

// Texte d'intro
const HeadTitle = () => (
  <div className="logo">
    <img src={logo} alt="" />
  </div>
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
      <span
        className="copyright"
        style={{
          position: "absolute",
          bottom: "6px",
          fontSize: "8px",
          width: "95%",
          textAlign: "center",
        }}
      >
        Ce site a été réalisé à des fins pédagogiques dans le cadre du cursus
        Bachelor de l’école HETIC. Les contenus présentés n'ont pas fait l'objet
        d'une demande de droit d'utilisation. Ce site ne sera en aucun cas
        exploité à des fins commerciales et ne sera pas publié
      </span>
    </div>
  </div>
);
