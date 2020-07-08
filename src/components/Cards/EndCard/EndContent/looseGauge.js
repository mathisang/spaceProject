import React from "react";

export default function ({ money, opinion }) {
  const looseText = {
    moneyText:
      "Les caisses sont vides et vous êtes renvoyé de la direction du programme spatial.",
    opinionText:
      "Le peuple est déçu de votre travail et veut vous brûler vivant sur la place publique.",
    searchText:
      "Vos chercheurs sont en grève à cause de terribles choix de direction (vous en gros).",
  };

  const Text = () => (
    <p className="description">
      {money <= 0
        ? looseText.moneyText
        : opinion <= 0
        ? looseText.opinionText
        : looseText.searchText}
    </p>
  );

  return (
    <div className="textEnd">
      <h2>Défaite</h2>
      <Text />
    </div>
  );
}
