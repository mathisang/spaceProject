import React, { useEffect, useState } from "react";
import "./tutorial.scss";
import { tapTutorial } from "../../assets/images/index";

export default function ({
  setTutorialStatus,
  tutorialStep,
  stepTutorial,
  setStepTutorial,
}) {
  const [numberStep, setNumberStep] = useState(0);
  const [heigtSteps, setHeigtSteps] = useState("20px");

  function nextStep() {
    setStepTutorial(stepTutorial + 1);
  }

  function resetStep() {
    setStepTutorial(1);
  }

  function playGame() {
    setTutorialStatus(false);
  }
  if (stepTutorial >= 0 && stepTutorial <= tutorialStep.length) {
    document.body.onclick = function () {
      nextStep();
    };
  }

  useEffect(() => {
    if (stepTutorial > 0 && stepTutorial <= tutorialStep.length) {
      const filterStep = tutorialStep.filter(
        (item) => item.label === tutorialStep[stepTutorial - 1].label
      );
      setNumberStep(filterStep.length);
      const label = tutorialStep[stepTutorial - 1].label;
      // eslint-disable-next-line no-unused-expressions
      label === "Cartes"
        ? setHeigtSteps("20px")
        : label === "Jauges" || label === "Calendrier"
        ? setHeigtSteps("17%")
        : label === "Timeline" && setHeigtSteps("25%");
    } else {
      setHeigtSteps("40%");
    }
  }, [stepTutorial]);

  return (
    <div className="tutorialStyle">
      {stepTutorial === 0 ? (
        <div className="statutStep tapNext">
          <img src={tapTutorial} alt="" />
          <p className="choice">Cliquez ici pour passer à la suite</p>
        </div>
      ) : (
        <div
          className="steps"
          style={{
            top: heigtSteps,
          }}
        >
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
            <div className="statutStep">
              <h4 className="titleBig">Vous êtes fin prêt !</h4>
              <p className="description">
                Vous connaissez maintenant les bases, bonne chance.
              </p>
              <button className="small" onClick={playGame}>
                Jouer
              </button>
              <a className="choice" onClick={resetStep}>
                Refaire le tutoriel
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
