import React from "react";

const Text = () => <p>Contexte du jeu</p>;

const StartButton = ({ onChangeStatus }) => {
  return <button onClick={onChangeStatus}>Commencer l'aventure</button>;
};

  export default ({ onChangeStatus }) => (
  <div>
    <Text />
    <StartButton onChangeStatus={onChangeStatus} />
  </div>
);
