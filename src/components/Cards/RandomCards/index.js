import React, { useContext, useEffect, useState } from "react";
import cards from "../../../datas/randomCards.json";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import CardContext from "../CardContext";
import "./randomCards.scss";
import ButtonsRandom from "./ContentRandom/ButtonsRandom";
import ContextRandom from "./ContentRandom/ContextRandom";

export default function () {
  const { gauge, setGauge } = useContext(GaugeContext);
  const [isSuccess, setSuccess] = useState(null);
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);
  const [nextCard, setNextCard] = useState(null);
  const [idButton, setIdButton] = useState(0);
  const arrayFull = [];
  for (let i = 0; i < cards.length; i++) {
    arrayFull.push(i);
  }
  const [cardUnused, setCardUnused] = useState(arrayFull);

  // GESTION DE LA COLLECTION DE CARTES
  // Génère une nouvelle carte qui n'a pas encore été jouée
  function nextIdCard() {
    switch (cardUnused[0]) {
      case 0:
      case 1:
        return cardUnused[0];
        break;
      default:
        return cardUnused[Math.floor(Math.random() * cardUnused.length)];
        break;
    }
  }
  // Supprime la carte qui à été jouée précédemment et en genère une nouvelle
  function randomCard() {
    for (var i = 0; i < cardUnused.length; i++) {
      cardUnused[i] === selectedCardId && cardUnused.splice(i, 1);
    }
    return nextIdCard();
  }

  // GESTION DES JAUGES
  // Mise à jour des jauges
  function updateGauge(card, response, issue) {
    const typeList = ["money", "opinion", "search"];
    const updatedGauge = {};
    for (const type of typeList) {
      response === undefined
        ? (updatedGauge[type] =
            gauge[type] +
            cards[card].card.responses[idButton - 1].impacts[type])
        : (updatedGauge[type] =
            gauge[type] +
            cards[card].card.responses[response].consequence[issue][type]);
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
      case 3:
        let numberResponse = cards[nextCard].card.responses[0].consequence
          ? 0
          : 1;
        updateGauge(nextCard, numberResponse, isSuccess ? "success" : "fail");
        break;
    }
    setSuccess(null);
    setNextCard(randomCard());
  }, [selectedCardId]);

  // Affichage de la carte + réponses
  return (
    <div className="randomCard">
      {cards.map(
        (card, index) =>
          nextCard === card.id && (
            <div className="card" key={index}>
              <ContextRandom card={card} />
              <ButtonsRandom
                nextCard={nextCard}
                setSuccess={setSuccess}
                setIdButton={setIdButton}
                setSelectedCardId={setSelectedCardId}
                isSuccess={isSuccess}
                card={card}
                updateGauge={updateGauge}
              />
            </div>
          )
      )}
    </div>
  );
}
