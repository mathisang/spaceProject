import React, { useState } from "react";
import { swipeLeft, swipeRight } from "../../../../assets/images/index";
import ModalRandom from "./ModalRandom";
import ChoicesButtons from "./ChoicesButtons";

export default function ({
  nextCard,
  setSuccess,
  setIdButton,
  setSelectedCardId,
  isSuccess,
  card,
  updateGauge,
  isChoose,
  setChoose,
}) {
  // Détermine quelle réponse possède une conséquence
  const consequence =
    isChoose !== null && card.card.responses[0].consequence ? 0 : 1;

  function chooseSuccess() {
    updateGauge(nextCard);
    setChoose(true);
  }

  // Boutons cartes
  const CardButtons = ({ card, value }) => {
    return value !== 3 ? (
      <button
        className="choice"
        onClick={() => {
          setIdButton(value);
          card.card.responses[value - 1].consequence
            ? chooseSuccess()
            : setSelectedCardId(card.id);
        }}
      >
        <img src={value === 1 ? swipeRight : swipeLeft} alt="" />
        {card.card.responses[value - 1].label}
      </button>
    ) : (
      <button
        className="skipConsequence"
        onClick={() => {
          setSelectedCardId(card.id);
          setIdButton(value);
          updateGauge(nextCard, consequence, isSuccess ? "success" : "fail");
          setChoose(null);
          setSuccess(null);
        }}
      >
        {isSuccess
          ? card.card.responses[consequence].consequence.success.buttonText
          : card.card.responses[consequence].consequence.fail.buttonText}
      </button>
    );
  };

  return (
    <div className="randomButtons">
      {isSuccess == null && isChoose == null && (
        <div className="buttonsCard">
          <CardButtons card={card} value={1} />
          <CardButtons card={card} value={2} />
        </div>
      )}
      {isChoose !== null && (
        <div className="randomChoice">
          <ChoicesButtons setSuccess={setSuccess} />
        </div>
      )}
      {isSuccess !== null && (
        <ModalRandom
          isSuccess={isSuccess}
          card={card}
          consequence={consequence}
          CardButtons={CardButtons}
        />
      )}
    </div>
  );
}
