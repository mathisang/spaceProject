import React, { useEffect, useState } from "react";
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import "./gameOn.scss";
import GaugeContext from "../Gauge/GaugeContext";
import SeasonTimeline from "../SeasonTimeline";
import CardContext from "../Cards/CardContext";
import LooseCard from "../Cards/LooseCard";
import StepCard from "../Cards/StepCard";
import stepCards from "../../datas/stepCards.json";
import EndCard from "../Cards/EndCard";
import Tutorial from "../Tutorial";
import StepTimeline from "../StepTimeline/index";

export default function ({ tutorialStatus, setTutorialStatus }) {
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
  const [year, setYear] = useState(1958);
  const [season, setSeason] = useState(2);
  const ListSeasons = ["Hiver", "Printemps", "Été", "Automne"];

  // Si une jauge atteins 0 afficher l'écran Loose
  useEffect(() => {
    (gauge.money === 0 || gauge.opinion === 0 || gauge.search === 0) &&
      setLoose(true);
  }, [gauge]);

  // Déclenchement de l'événement
  useEffect(() => {
    let currentDate = ListSeasons[season] + " " + year;
    currentDate === stepCards[step.id].stepSeason &&
      setStep((prevState) => {
        return { ...prevState, isActive: true };
      });
  }, [season]);

  return (
    <CardContext.Provider value={cardContextValue}>
      <GaugeContext.Provider value={gaugeContextValue}>
        {tutorialStatus && <Tutorial setTutorialStatus={setTutorialStatus} />}
        {isLoose ? (
          <LooseCard />
        ) : isEnd ? (
          <EndCard />
        ) : (
          <div className="playScreen">
            <div className="headerScreen">
              <SeasonTimeline
                season={season}
                setSeason={setSeason}
                year={year}
                setYear={setYear}
                ListSeasons={ListSeasons}
              />
              <Gauge />
            </div>
            <div className="contentScreen">
              <StepTimeline
                stepCards={stepCards}
                year={year}
                season={season}
                ListSeasons={ListSeasons}
                step={step}
              />
              {step.isActive && (
                <StepCard step={step} setStep={setStep} setEnd={setEnd} />
              )}
              <RandomCard />
            </div>
          </div>
        )}
      </GaugeContext.Provider>
    </CardContext.Provider>
  );
}
