import React, { useContext, useEffect, useState } from "react";
import "../../cards.scss";
import { swipeLeft, swipeRight } from "../../../../assets/images";
import cards from "../../../../datas/randomCards.json";

export default function ({
  nextCard,
  setSuccess,
  setIdButton,
  setSelectedCardId,
  isSuccess,
  card,
  updateGauge,
}) {
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

  return (
    <div className="randomButtons">
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
  );
}
