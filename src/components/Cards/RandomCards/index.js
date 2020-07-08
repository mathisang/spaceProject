import React, { useContext, useEffect, useState } from "react";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import CardContext from "../CardContext";
import "./randomCards.scss";
import ButtonsRandom from "./ContentRandom/ButtonsRandom";
import ContextRandom from "./ContentRandom/ContextRandom";

export default function ({ cardUnused, cardsData }) {
  const { gauge, setGauge } = useContext(GaugeContext);
  const [isSuccess, setSuccess] = useState(null);
  const [isChoose, setChoose] = useState(null);
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);
  const [nextCard, setNextCard] = useState(null);
  const [idButton, setIdButton] = useState(0);

  function randomNumber() {
    return Math.floor(Math.random() * cardUnused.length);
  }

  // GESTION DE LA COLLECTION DE CARTES
  // Génère une nouvelle carte qui n'a pas encore été jouée
  function nextIdCard() {
    let oldCategory = null;
    for (var i = 0; i < cardUnused.length; i++) {
      if (cardUnused[i] === selectedCardId) {
        oldCategory = cardsData[selectedCardId - 1].type;
        cardUnused.splice(i, 1);
      }
    }

    let number = randomNumber();
    let newItem = cardUnused[number];

    if (cardsData[newItem - 1].type === oldCategory) {
      do {
        number = Math.floor(Math.random() * cardUnused.length);
        newItem = cardUnused[number];
      } while (cardsData[newItem - 1].type === oldCategory);
    }

    switch (cardUnused[0]) {
      case 1:
      case 2:
        return cardUnused[0];
        break;
      default:
        switch (cardUnused[2]) {
          case 5:
            return cardUnused[2];
            break;
          default:
            return cardUnused[number];
            break;
        }
    }
  }

  // GESTION DES JAUGES
  // Mise à jour des jauges
  function updateGauge(card, response, issue) {
    const typeList = ["money", "opinion", "search"];
    const updatedGauge = {};
    const propertiesResult = issue === "win" ? "Success" : "Fail";
    for (const type of typeList) {
      response === undefined
        ? (updatedGauge[type] =
            gauge[type] + cardsData[card - 1].choices[idButton - 1][type] > 100
              ? 100
              : gauge[type] + cardsData[card - 1].choices[idButton - 1][type])
        : (updatedGauge[type] =
            gauge[type] +
              cardsData[card - 1].choices[response].consequence[
                type + propertiesResult
              ] >
            100
              ? 100
              : gauge[type] +
                cardsData[card - 1].choices[response].consequence[
                  type + propertiesResult
                ]);
    }
    setGauge(updatedGauge);
  }

  // AVANCEMENT DU JEU
  // Avancement des jauges et du jeu : calcul les jauges, attribue une prochaine carte à afficher
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (idButton) {
      case 1:
      case 2:
        updateGauge(selectedCardId);
        break;
    }
    setSuccess(null);
    setNextCard(nextIdCard());
  }, [selectedCardId]);

  // Affichage de la carte + réponses
  return (
    <div className="randomCard" id="randomCard">
      {cardsData.map(
        (card, index) =>
          nextCard === card.id && (
            <div className="card" key={index}>
              <ContextRandom card={card} isChoose={isChoose} />
              <ButtonsRandom
                nextCard={nextCard}
                setIdButton={setIdButton}
                setSelectedCardId={setSelectedCardId}
                selectedCardId={selectedCardId}
                isSuccess={isSuccess}
                setSuccess={setSuccess}
                isChoose={isChoose}
                setChoose={setChoose}
                card={card}
                cards={cardsData}
                updateGauge={updateGauge}
              />
            </div>
          )
      )}
    </div>
  );
}
