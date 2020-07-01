import React, { useContext, useEffect, useState } from "react";
import cards from "../../../datas/randomCards.json";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import CardContext from "../CardContext";
import "./randomCards.scss";
import {
  iconCommunication,
  iconEconomy,
  iconInternal,
  iconPolitic,
  iconResearch,
  iconSpying,
  iconWelcome,
  swipeLeft,
  swipeRight,
} from "../../../assets/images/index";

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

  // Si une carte à une conséquence, renvoi succès ou echec et met a jour les jauges
  function trySuccess() {
    updateGauge(nextCard);

    var numberResponse = cards[nextCard].card.responses[0].consequence ? 0 : 1;
    let r = Math.random();
    r >
    cards[nextCard].card.responses[numberResponse].consequence.percent_success
      ? setSuccess(true)
      : setSuccess(false);
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

  // Boutons cartes
  const CardButtons = ({ card, value }) => {
    return value !== 3 ? (
      <button
        className="choice"
        onClick={() => {
          setIdButton(value);
          card.card.responses[value - 1].consequence
            ? trySuccess()
            : setSelectedCardId(card.id);
        }}
      >
        <img src={value === 1 ? swipeRight : swipeLeft} alt="" />
        {card.card.responses[value - 1].label}
      </button>
    ) : (
      <button
        onClick={() => {
          setSelectedCardId(card.id);
          setIdButton(value);
        }}
      >
        Continuer
      </button>
    );
  };

  // Affichage de la carte + réponses
  return (
    <div className="randomCard">
      {cards.map(
        (card, index) =>
          nextCard === card.id && (
            <div className="card" key={index}>
              <div className="headerCard">
                <img src={iconWelcome} alt="Bienvenue" />
                <h2 className="titleBig">{card.category}</h2>
                <p className="description">{card.card.context}</p>
              </div>
              {isSuccess == null && (
                <div className="buttonsCard">
                  <CardButtons card={card} value={1} />
                  <CardButtons card={card} value={2} />
                </div>
              )}
              {isSuccess !== null && (
                <div>
                  Résultat :{" "}
                  {isSuccess ? <p>Mission réussie</p> : <p>Mission échouée</p>}
                  <CardButtons card={card} value={3} />
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}
