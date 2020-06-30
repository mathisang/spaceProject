import React, { useContext, useEffect, useState } from "react";
import cards from "../../../datas/randomCards.json";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import CardContext from "../CardContext";

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
  // A OPTIMISER AVEC FOR ?
  function updateGauge(card, response, issue) {
    response === undefined
      ? setGauge({
          money:
            gauge.money +
            cards[card].card.responses[idButton - 1].impacts.money,
          opinion:
            gauge.opinion +
            cards[card].card.responses[idButton - 1].impacts.opinion,
          search:
            gauge.search +
            cards[card].card.responses[idButton - 1].impacts.search,
        })
      : setGauge({
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
        onClick={() => {
          setIdButton(value);
          card.card.responses[value - 1].consequence
            ? trySuccess(value)
            : setSelectedCardId(card.id);
        }}
      >
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
    <div className="">
      <ul>
        {cards.map(
          (card, index) =>
            nextCard === card.id && (
              <div className="card-container" key={index}>
                <h2>{card.category}</h2>
                <p>{card.card.context}</p>
                {isSuccess == null && (
                  <div>
                    <CardButtons card={card} value={1} />
                    <CardButtons card={card} value={2} />
                  </div>
                )}
                {isSuccess !== null && (
                  <div>
                    Résultat :{" "}
                    {isSuccess ? (
                      <p>Mission réussie</p>
                    ) : (
                      <p>Mission échouée</p>
                    )}
                    <CardButtons card={card} value={3} />
                  </div>
                )}
              </div>
            )
        )}
      </ul>
    </div>
  );
}
