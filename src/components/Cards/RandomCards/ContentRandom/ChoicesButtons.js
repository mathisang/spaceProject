import React from "react";

export default function ({ setSuccess }) {
  // Si une carte à une conséquence, renvoi succès ou echec et met a jour les jauges
  function trySuccess(result) {
    result === "success" ? setSuccess(true) : setSuccess(false);
  }

  const ChoicesButton = () => {
    const randomButtonId = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    const resultButton = randomButtonId === 1 ? "success" : "loose";

    return (
      <div>
        <button
          onClick={() => {
            trySuccess(resultButton);
          }}
        />
        <button
          onClick={() => {
            trySuccess(resultButton === "success" ? "loose" : "success");
          }}
        />
      </div>
    );
  };

  return <ChoicesButton />;
}
