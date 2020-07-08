import React, { useEffect, useState } from "react";
import "./tutorial.scss";

export default function ({
  setTutorialStatus,
  tutorialStep,
  stepTutorial,
  setStepTutorial,
}) {
  const [numberStep, setNumberStep] = useState(0);

  function nextStep() {
    setStepTutorial(stepTutorial + 1);
  }

  function resetStep() {
    setStepTutorial(1);
  }

  function playGame() {
    setTutorialStatus(false);
  }

  document.body.onclick = function () {
    nextStep();
  };

  useEffect(() => {
    for (let i = 0; i < tutorialStep.length; i++) {
      console.log("i : " + tutorialStep[i].label);
      console.log(tutorialStep[stepTutorial].label);
      i === 0 && setNumberStep(0);
      if (tutorialStep[i].label === tutorialStep[stepTutorial].label) {
        setNumberStep(numberStep + 1);
      }
    }
  }, [stepTutorial]);

  return (
    <div className="tutorialStyle">
      <div className="steps" style={{ top: "20px" }}>
        {tutorialStep.map(
          (step, index) =>
            stepTutorial === step.id && (
              <div key={index}>
                <div className="headTuto">
                  <h4 className="small">{step.label}</h4>
                  <span className="stat">
                    {step.step} / {numberStep}
                  </span>
                </div>
                <p className="description">{step.text}</p>
              </div>
            )
        )}
        {stepTutorial > tutorialStep.length && (
          <div>
            <h4 className="titleBig">Vous êtes fin prêt !</h4>
            <p className="description">
              Vous connaisez maintenant les bases, bonne chance.
            </p>
            <button className="small" onClick={playGame}>
              Jouer
            </button>
            <button className="choice" onClick={resetStep}>
              Refaire le tutoriel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
