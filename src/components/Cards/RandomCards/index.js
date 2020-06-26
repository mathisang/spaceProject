import React, { useContext, useEffect, useState } from "react";
import cards from "../../../datas/randomCards.json";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import TimelineContext from "../../Timeline/TimelineContext";
import CardContext from "../CardContext";

export default function () {
  const { gauge, setGauge } = useContext(GaugeContext);
  const { timeline, setTimeline } = useContext(TimelineContext);
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
    return cardUnused[0] === 0
      ? cardUnused[0]
      : cardUnused[0] === 1
      ? cardUnused[0]
      : cardUnused[Math.floor(Math.random() * cardUnused.length)];
  }
  // Supprime la carte qui à été jouée précédemment et en genère une nouvelle
  function randomCard() {
    for (var i = 0; i < cardUnused.length; i++) {
      cardUnused[i] === selectedCardId && cardUnused.splice(i, 1);
    }
    return nextIdCard();
  }

  // GESTION DES JAUGES
  // Mise à jour des jauges (Carte basique)
  function updateGauge(card) {
    setGauge({
      money:
        gauge.money + cards[card].card.responses[idButton - 1].impacts.money,
      opinion:
        gauge.opinion +
        cards[card].card.responses[idButton - 1].impacts.opinion,
      search:
        gauge.search + cards[card].card.responses[idButton - 1].impacts.search,
    });
  }
  // Mise à jour des jauges cartes conséquences
  function updateGaugeConsequence(card, response, issue) {
    setGauge({
      money:
        gauge.money +
        cards[card].card.responses[response].consequence[issue].money,
      opinion:
        gauge.opinion +
        cards[card].card.responses[response].consequence[issue].opinion,
      search:
        gauge.search +
        cards[card].card.responses[response].consequence[issue].search,
    });
  }
  // Si une carte à une conséquence, renvoi succès ou echec et met a jour les jauges
  function trySuccess(e) {
    e === (1 || 2) && updateGauge(nextCard);

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
    idButton === (1 || 2) && updateGauge(selectedCardId);

    if (idButton === 3) {
      var numberResponse = cards[nextCard].card.responses[0].consequence
        ? 0
        : 1;
    }
    idButton === 3 &&
      (isSuccess
        ? updateGaugeConsequence(nextCard, numberResponse, "success")
        : updateGaugeConsequence(nextCard, numberResponse, "fail"));

    let totalJauge = gauge.money + gauge.opinion + gauge.search;
    let avanceUsa = 4;
    totalJauge <= 120
      ? (avanceUsa = 2)
      : totalJauge >= 155
      ? (avanceUsa = 7)
      : (avanceUsa = 4);
    setTimeline({ urss: timeline.urss + 4, usa: timeline.usa + avanceUsa });

    setSuccess(null);
    setNextCard(randomCard());
  }, [selectedCardId]);

  // Affichage de la carte + réponses
  return (
    <div className="">
      <ul>
        {cards.map(
          (card, index) =>
            nextCard === card.id && (
              <div className="card-container" key={index}>
                {card.card.category}
                {card.card.context}
                {isSuccess == null && (
                  <div>
                    <button
                      onClick={() => {
                        setIdButton(1);
                        card.card.responses[0].consequence
                          ? trySuccess(1)
                          : setSelectedCardId(card.id);
                      }}
                    >
                      {card.card.responses[0].label}
                    </button>
                    <button
                      onClick={() => {
                        setIdButton(2);
                        card.card.responses[1].consequence
                          ? trySuccess(2)
                          : setSelectedCardId(card.id);
                      }}
                    >
                      {card.card.responses[1].label}
                    </button>
                  </div>
                )}
                {isSuccess !== null && (
                  <div>
                    consequence : {isSuccess ? <p>succès</p> : <p>échec</p>}
                    <button
                      onClick={() => {
                        setSelectedCardId(card.id);
                        setIdButton(3);
                      }}
                    >
                      SUIVANT
                    </button>
                  </div>
                )}
              </div>
            )
        )}
      </ul>
    </div>
  );
}
