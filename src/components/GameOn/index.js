import React, { useEffect, useState } from "react";
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import GaugeContext from "../Gauge/GaugeContext";
import Timeline from "../Timeline";
import TimelineContext from "../Timeline/TimelineContext";
import SeasonTimeline from "../SeasonTimeline";
import CardContext from "../Cards/CardContext";
import LooseCard from "../Cards/LooseCard";
import StepCard from "../Cards/StepCard";
import stepCards from "../../datas/stepCards.json";
import EndCard from "../Cards/EndCard";

export default function ({tutorialStatus, setTutorialStatus}) {
  const [gauge, setGauge] = useState({
    money: 50,
    opinion: 50,
    search: 50,
  });

  const gaugeContextValue = { gauge, setGauge };
  const [timeline, setTimeline] = useState({ urss: 5, usa: 0 });
  const timelineContextValue = { timeline, setTimeline };
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


  // Affichage de l'événement
  useEffect(() => {
    (timeline.usa >= stepCards[step.id].stepPercent ||
      timeline.urss >= stepCards[step.id].stepPercent) &&
      setStep((prevState) => {
        return { ...prevState, isActive: true };
      });
  }, [timeline]);

  return (
    <CardContext.Provider value={cardContextValue}>
      <GaugeContext.Provider value={gaugeContextValue}>
        <TimelineContext.Provider value={timelineContextValue}>
          {tutorialStatus &&
          <p>Coucou</p>}
          {isLoose ? (
            <LooseCard />
          ) : isEnd ? (
            <EndCard timeStep={timeStep} />
          ) : (
            <div className="playing-container">
              <div className="head-container">
                <SeasonTimeline setTimeStep={setTimeStep} timeStep={timeStep} />
                <Gauge />
              </div>
              {step.isActive && (
                <StepCard step={step} setStep={setStep} setEnd={setEnd} />
              )}
              <p>Prochain événement à : {stepCards[step.id].stepPercent}%</p>

              <RandomCard />
              <Timeline />
            </div>
          )}
        </TimelineContext.Provider>
      </GaugeContext.Provider>
    </CardContext.Provider>
  );
}
