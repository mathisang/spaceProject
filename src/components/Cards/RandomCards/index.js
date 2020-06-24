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

  function trySuccess(e) {
    console.log(e);

    e === 1 &&
      setGauge({
        money: gauge.money + cards[nextCard].value.first_answer.money,
        opinion: gauge.opinion + cards[nextCard].value.first_answer.opinion,
        search: gauge.search + cards[nextCard].value.first_answer.search,
      });
    e === 2 &&
      setGauge({
        money: gauge.money + cards[nextCard].value.second_answer.money,
        opinion: gauge.opinion + cards[nextCard].value.second_answer.opinion,
        search: gauge.search + cards[nextCard].value.second_answer.search,
      });

    let r = Math.random();
    r < cards[nextCard].consequence.success.percent
      ? setSuccess(true)
      : setSuccess(false);
  }

  function nextIdCard() {
    return cardUnused[Math.floor(Math.random() * cardUnused.length)];
  }

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

  useEffect(() => {
    idButton === 1 &&
      setGauge({
        money: gauge.money + cards[selectedCardId].value.first_answer.money,
        opinion:
          gauge.opinion + cards[selectedCardId].value.first_answer.opinion,
        search: gauge.search + cards[selectedCardId].value.first_answer.search,
      });
    idButton === 2 &&
      setGauge({
        money: gauge.money + cards[selectedCardId].value.second_answer.money,
        opinion:
          gauge.opinion + cards[selectedCardId].value.second_answer.opinion,
        search: gauge.search + cards[selectedCardId].value.second_answer.search,
      });

    idButton === 3 &&
      (isSuccess
        ? setGauge({
            money: gauge.money + cards[nextCard].consequence.success.money,
            opinion:
              gauge.opinion + cards[nextCard].consequence.success.opinion,
            search: gauge.search + cards[nextCard].consequence.success.search,
          })
        : setGauge({
            money: gauge.money + cards[nextCard].consequence.fail.money,
            opinion: gauge.opinion + cards[nextCard].consequence.fail.opinion,
            search: gauge.search + cards[nextCard].consequence.fail.search,
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
                {card.text.intitule}
                {isSuccess == null && (
                  <div>
                    <button
                      onClick={() => {
                        setIdButton(1);
                        card.consequence.exist &&
                        card.consequence.button === "first_answer"
                          ? trySuccess(1)
                          : setSelectedCardId(card.id);
                      }}
                    >
                      {card.text.first_answer}
                    </button>
                    <button
                      onClick={() => {
                        setIdButton(2);
                        card.consequence.exist &&
                        card.consequence.button === "second_answer"
                          ? trySuccess(2)
                          : setSelectedCardId(card.id);
                      }}
                    >
                      {card.text.second_answer}
                    </button>
                  </div>
                )}
                {isSuccess !== null && card.consequence.exist && (
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
