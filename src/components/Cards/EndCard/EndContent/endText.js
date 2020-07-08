import React from "react";

export default function ({ winner }) {
  const endObject = {
    usa: {
      title: "Victoire !",
      label:
        "C'est un petit pas pour l'homme, un bond de géant pour l'humanité.",
    },
    urss: {
      title: "Défaite",
      label:
        "L’URSS a réussi à vous devancer et envoyer un homme dans l’espace avant vous.",
    },
  };

  const EndText = () => {
    return <p className="description">{endObject[winner].label}</p>;
  };

  return (
    <div className="textEnd">
      <h2>{endObject[winner].title}</h2>
      <EndText />
    </div>
  );
}
