import React, { useState } from "react";
import { swipeLeft, swipeRight } from "../../../../assets/images/index";

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
  const consequence =
    isChoose !== null && card.card.responses[0].consequence ? 0 : 1;

  // Si une carte à une conséquence, renvoi succès ou echec et met a jour les jauges
  function trySuccess(result) {
    result === "success" ? setSuccess(true) : setSuccess(false);
  }

  function chooseSuccess() {
    updateGauge(nextCard);
    setChoose(true);
  }

  const ChoicesButton = () => {
    const randomButtonId = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    const resultButton = randomButtonId === 1 ? "success" : "loose";

    return (
      <div>
        <button
          onClick={() => {
            trySuccess(resultButton);
          }}
        />
        <button
          onClick={() => {
            trySuccess(resultButton === "success" ? "loose" : "success");
          }}
        />
      </div>
    );
  };

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
          <ChoicesButton />
        </div>
      )}
      {isSuccess !== null && (
        <div className="modalAnswer">
          <div>
            <div
              className="pictureModal"
              style={{
                backgroundImage: `url('../../../assets/images/cards/consequence/${
                  isSuccess
                    ? card.card.responses[consequence].consequence.success.image
                    : card.card.responses[consequence].consequence.fail.image
                }')`,
              }}
            />
            <p className="description">
              {isSuccess
                ? card.card.responses[consequence].consequence.success.context
                : card.card.responses[consequence].consequence.fail.context}
            </p>
            <CardButtons card={card} value={3} />
          </div>
        </div>
      )}
    </div>
  );
}
