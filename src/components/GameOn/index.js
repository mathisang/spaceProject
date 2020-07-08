import React, { useEffect, useState } from "react";
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import "./gameOn.scss";
import GaugeContext from "../Gauge/GaugeContext";
import SeasonTimeline from "../SeasonTimeline";
import CardContext from "../Cards/CardContext";
import StepCard from "../Cards/StepCard";
import EndCard from "../Cards/EndCard";
import Tutorial from "../Tutorial";
import StepTimeline from "../StepTimeline/index";
import MiniGame from "../MiniGame";

export default function ({
  tutorialStatus,
  setTutorialStatus,
  cardsData,
  gameData,
  stepData,
  tutorialData,
}) {
  const [gauge, setGauge] = useState({
    money: 80,
    opinion: 80,
    search: 80,
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
  const [gameOn, setGameOn] = useState(false);
  const [gameBadge, setGameBadge] = useState({
    flightGame: false,
    secondGame: false,
    moonGame: false,
  });
  const [rocketPosition, setRocketPosition] = useState(0);
  const arrayFull = [];
  for (let i = 1; i <= cardsData.length; i++) {
    arrayFull.push(i);
  }
  const [cardUnused, setCardUnused] = useState(arrayFull);

  // Si une jauge atteins 0 afficher l'écran Loose
  useEffect(() => {
    (gauge.money <= 0 || gauge.opinion <= 0 || gauge.search <= 0) &&
      setLoose(true);
  }, [gauge]);

  useEffect(() => {
    gameBadge.moonGame !== false && setEnd(true);
  }, [gameBadge.moonGame]);

  // Déclenchement de l'événement
  useEffect(() => {
    let currentDate = ListSeasons[season] + " " + year;
    currentDate === stepData[step.id].stepSeason &&
      setStep((prevState) => {
        return { ...prevState, isActive: true };
      });
  }, [season]);

  return (
    <CardContext.Provider value={cardContextValue}>
      <GaugeContext.Provider value={gaugeContextValue}>
        {tutorialStatus && (
          <Tutorial
            setTutorialStatus={setTutorialStatus}
            tutorialStep={tutorialData}
          />
        )}
        {isLoose || isEnd ? (
          <EndCard
            money={gauge.money}
            opinion={gauge.opinion}
            search={gauge.search}
            gameBadge={gameBadge}
          />
        ) : gameOn === true ? (
          <MiniGame
            setGameBadge={setGameBadge}
            step={step}
            setStep={setStep}
            setEnd={setEnd}
            setGameOn={setGameOn}
            year={year}
            gameBadge={gameBadge}
            gameData={gameData}
            stepCards={stepData}
          />
        ) : (
          <div className="playScreen">
            <div
              className={`headerScreen ${
                step.isActive !== false && "hideHeader"
              }`}
            >
              <SeasonTimeline
                season={season}
                setSeason={setSeason}
                year={year}
                setYear={setYear}
                ListSeasons={ListSeasons}
              />
              <Gauge />
            </div>
            <div
              className="contentScreen"
              style={{ height: step.isActive !== false && "100%" }}
            >
              <StepTimeline
                year={year}
                season={season}
                step={step}
                rocketPosition={rocketPosition}
                setRocketPosition={setRocketPosition}
                gameBadge={gameBadge}
              />
              {step.isActive ? (
                <StepCard
                  step={step}
                  setStep={setStep}
                  setEnd={setEnd}
                  year={year}
                  season={season}
                  ListSeasons={ListSeasons}
                  gameOn={gameOn}
                  setGameOn={setGameOn}
                  steps={stepData}
                />
              ) : (
                <RandomCard cardsData={cardsData} cardUnused={cardUnused} />
              )}
            </div>
          </div>
        )}
      </GaugeContext.Provider>
    </CardContext.Provider>
  );
}
