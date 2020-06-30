import React, { useEffect, useState } from "react";
import tutorialStep from "../../datas/tutorialStep.json";

export default function ({ setTutorialStatus }) {
  const [stepTutorial, setStepTutorial] = useState(1);

  function nextStep() {
    setStepTutorial(stepTutorial + 1);
  }

  function resetStep() {
    setStepTutorial(1);
  }

  function playGame() {
    setTutorialStatus(false);
  }

  return (
    <div className="tutorialStyle">
      <div className="steps">
        {tutorialStep.map(
          (step, index) =>
            stepTutorial === step.id && (
              <div key={index}>
                <h4>{step.label}</h4>
                <p>{step.text}</p>
                <button onClick={nextStep}>Suivant</button>
              </div>
            )
        )}
        {stepTutorial > tutorialStep.length && (
          <div>
            <h4>Vous êtes fin prêt !</h4>
            <p>Vous connaisez maintenant les bases, bonne chance.</p>
            <button onClick={playGame}>Jouer</button>
            <button onClick={resetStep}>Refaire le tutoriel</button>
          </div>
        )}
      </div>
    </div>
  );
}
