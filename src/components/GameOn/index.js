import React, { useEffect, useState } from "react";
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import "./gameOn.scss";
import GaugeContext from "../Gauge/GaugeContext";
import SeasonTimeline from "../SeasonTimeline";
import CardContext from "../Cards/CardContext";
import StepCard from "../Cards/StepCard";
import stepCards from "../../datas/stepCards.json";
import EndCard from "../Cards/EndCard";
import Tutorial from "../Tutorial";
import StepTimeline from "../StepTimeline/index";
import MiniGame from "../MiniGame";
import cards from "../../datas/randomCards.json";

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
  const [gameOn, setGameOn] = useState(false);
  const [gameBadge, setGameBadge] = useState([false, false, false]);
  const arrayFull = [];
  for (let i = 0; i < cards.length; i++) {
    arrayFull.push(i);
  }
  const [cardUnused, setCardUnused] = useState(arrayFull);
  const [rocketPosition, setRocketPosition] = useState(0);

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

  const headerOpacity = step.isActive === false ? "1" : "0";

  return (
    <CardContext.Provider value={cardContextValue}>
      <GaugeContext.Provider value={gaugeContextValue}>
        {tutorialStatus && <Tutorial setTutorialStatus={setTutorialStatus} />}
        {isLoose || isEnd ? (
          <EndCard
            money={gauge.money}
            opinion={gauge.opinion}
            search={gauge.search}
            gameBadge={gameBadge}
          />
        ) : gameOn === true ? (
          <MiniGame
            step={step}
            setStep={setStep}
            setEnd={setEnd}
            setGameOn={setGameOn}
            year={year}
            gameBadge={gameBadge}
          />
        ) : (
          <div className="playScreen">
            <div className="headerScreen" style={{ opacity: headerOpacity }}>
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
              {/*prendre le temps maximum, compter le nb de jours et apres placé les steps*/}
              {/*avancer vw au lieu de % ? */}
              <StepTimeline
                stepCards={stepCards}
                year={year}
                season={season}
                ListSeasons={ListSeasons}
                step={step}
                rocketPosition={rocketPosition}
                setRocketPosition={setRocketPosition}
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
                />
              ) : (
                <RandomCard
                  cardUnused={cardUnused}
                  setCardUnused={setCardUnused}
                />
              )}
            </div>
          </div>
        )}
      </GaugeContext.Provider>
    </CardContext.Provider>
  );
}
