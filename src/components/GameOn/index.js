import React, { useEffect, useState } from "react";
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import "./gameOn.scss";
import GaugeContext from "../Gauge/GaugeContext";
import timesSteps from "../../datas/time.json";
import SeasonTimeline from "../SeasonTimeline";
import CardContext from "../Cards/CardContext";
import LooseCard from "../Cards/LooseCard";
import StepCard from "../Cards/StepCard";
import stepCards from "../../datas/stepCards.json";
import EndCard from "../Cards/EndCard";
import Tutorial from "../Tutorial";

export default function ({ tutorialStatus, setTutorialStatus, timeSteps }) {
  const [gauge, setGauge] = useState({
    money: 30,
    opinion: 50,
    search: 50,
  });

  const gaugeContextValue = { gauge, setGauge };
  const [selectedCardId, setSelectedCardId] = useState(null);
  const cardContextValue = { selectedCardId, setSelectedCardId };
  const [isLoose, setLoose] = useState(false);
  const [step, setStep] = useState({ isActive: false, id: 0 });
  const [isEnd, setEnd] = useState(false);
  const [timeStep, setTimeStep] = useState(0);

  // Si une jauge atteins 0 afficher l'écran Loose
  useEffect(() => {
    (gauge.money === 0 || gauge.opinion === 0 || gauge.search === 0) &&
      setLoose(true);
  }, [gauge]);

  // Déclenchement de l'événement
  useEffect(() => {
    let season = timesSteps[timeStep].season + " " + timesSteps[timeStep].year;
    console.log(season);
    season === stepCards[step.id].stepSeason &&
      setStep((prevState) => {
        return { ...prevState, isActive: true };
      });
  }, [timeStep]);

  return (
    <CardContext.Provider value={cardContextValue}>
      <GaugeContext.Provider value={gaugeContextValue}>
        {tutorialStatus && <Tutorial setTutorialStatus={setTutorialStatus} />}
        {isLoose ? (
          <LooseCard />
        ) : isEnd ? (
          <EndCard timeStep={timeStep} />
        ) : (
          <div className="playScreen">
            <div className="headerScreen">
              <SeasonTimeline setTimeStep={setTimeStep} timeStep={timeStep} />
              <Gauge />
            </div>
            {step.isActive && (
              <StepCard step={step} setStep={setStep} setEnd={setEnd} />
            )}
            <RandomCard />
          </div>
        )}
      </GaugeContext.Provider>
    </CardContext.Provider>
  );
}
