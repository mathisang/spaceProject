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

  // Si une carte à une conséquence, renvoi succès ou echec
  function trySuccess(e) {
    console.log(e);

    e === 1 &&
      setGauge({
        money: gauge.money + cards[nextCard].card.responses[0].impacts.money,
        opinion:
          gauge.opinion + cards[nextCard].card.responses[0].impacts.opinion,
        search: gauge.search + cards[nextCard].card.responses[0].impacts.search,
      });
    e === 2 &&
      setGauge({
        money: gauge.money + cards[nextCard].card.responses[1].impacts.money,
        opinion:
          gauge.opinion + cards[nextCard].card.responses[1].impacts.opinion,
        search: gauge.search + cards[nextCard].card.responses[1].impacts.search,
      });

    var numberResponse = cards[nextCard].card.responses[0].consequence ? 0 : 1;

    let r = Math.random();
    r >
    cards[nextCard].card.responses[numberResponse].consequence.percent_success
      ? setSuccess(true)
      : setSuccess(false);
  }

  // Génère une nouvelle carte qui n'a pas encore été jouée
  function nextIdCard() {
    return cardUnused[Math.floor(Math.random() * cardUnused.length)];
  }

  // Supprime la carte qui à été jouée
  function randomCard() {
    for (var i = 0; i < cardUnused.length; i++) {
      if (cardUnused[i] === selectedCardId) {
        cardUnused.splice(i, 1);
      }
    }
    console.log("card pas utilisées", cardUnused);

    const newCardId = nextIdCard();
    console.log("card", newCardId);

    return newCardId;
  }

  // Avancement des jauges et du jeu : calcul les jauges, attribue une prochaine carte à afficher
  useEffect(() => {
    idButton === 1 &&
      setGauge({
        money:
          gauge.money + cards[selectedCardId].card.responses[0].impacts.money,
        opinion:
          gauge.opinion +
          cards[selectedCardId].card.responses[0].impacts.opinion,
        search:
          gauge.search + cards[selectedCardId].card.responses[0].impacts.search,
      });
    idButton === 2 &&
      setGauge({
        money:
          gauge.money + cards[selectedCardId].card.responses[1].impacts.money,
        opinion:
          gauge.opinion +
          cards[selectedCardId].card.responses[1].impacts.opinion,
        search:
          gauge.search + cards[selectedCardId].card.responses[1].impacts.search,
      });

    if (idButton === 3) {
      var numberResponse = cards[nextCard].card.responses[0].consequence
        ? 0
        : 1;
    }
    idButton === 3 &&
      (isSuccess
        ? setGauge({
            money:
              gauge.money +
              cards[nextCard].card.responses[numberResponse].consequence.success
                .money,
            opinion:
              gauge.opinion +
              cards[nextCard].card.responses[numberResponse].consequence.success
                .opinion,
            search:
              gauge.search +
              cards[nextCard].card.responses[numberResponse].consequence.success
                .search,
          })
        : setGauge({
            money:
              gauge.money +
              cards[nextCard].card.responses[numberResponse].consequence.fail
                .money,
            opinion:
              gauge.opinion +
              cards[nextCard].card.responses[numberResponse].consequence.fail
                .opinion,
            search:
              gauge.search +
              cards[nextCard].card.responses[numberResponse].consequence.fail
                .search,
          }));

    let totalJauge = gauge.money + gauge.opinion + gauge.search;
    console.log(totalJauge);
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
