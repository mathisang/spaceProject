import React, { useContext } from "react";
import TimelineContext from "../../Timeline/TimelineContext";

// Objet contenant les textes de victoire/défaite
const endObject = [
  {
    usa: {
      title: "La mission est un succès !",
      message:
        "Vous avez triomphé ! Les États-Unis sont les premiers à envoyer un humain marcher sur la lune. Vous affirmez votre supériorité face à l’URSS.",
    },
    urss: {
      title: "La mission est un échec !",
      message:
        "Vous y étiez presque ! L'URSS sont les premiers à envoyer un humain marcher sur la lune.",
    },
  },
];

// Affichage de la victoire ou de la défaite
const EndText = ({ winner }) => {
  return (
    <div>
      <p>{winner} :flag:</p>
      <h2>{endObject[0][winner].title}</h2>
      <p>{endObject[0][winner].message}</p>
    </div>
  );
};

// Bouton "Rejouer"
const RestartButton = () => {
  function restartGame() {
    window.location.reload(false);
  }
  return <button onClick={restartGame}>Rejouer</button>;
};

// Affichage de l'écran de fin
export default () => {
  const { timeline, setTimeline } = useContext(TimelineContext);
  return (
    <div>
      {timeline.usa > timeline.urss ? (
        <EndText winner="usa" />
      ) : (
        <EndText winner="urss" />
      )}
      <RestartButton />
    </div>
  );
};
