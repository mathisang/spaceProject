import React from "react";

export default function ({ winner }) {
  const endObject = {
    usa: {
      title: "Victoire !",
      label:
        "Vous avez triomphé ! Les États-Unis sont les premiers à envoyer un humain marcher sur la lune. Vous affirmez votre supériorité face à l’URSS.",
    },
    urss: {
      title: "Défaite",
      label:
        "Vous y étiez presque ! L'URSS sont les premiers à envoyer un humain marcher sur la lune.",
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
