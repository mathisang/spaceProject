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
  const consequence = isChoose !== null && card.choices[0].consequence ? 0 : 1;

  function chooseSuccess() {
    updateGauge(nextCard);
    setChoose(true);
  }

  console.log(card);

  const randomButtonId = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

  // Boutons cartes
  const CardButtons = ({ card, value, orderButton }) => {
    return value !== 3 ? (
      <button
        className="choice"
        onClick={() => {
          setIdButton(value);
          card.choices[value - 1].consequence
            ? chooseSuccess()
            : setSelectedCardId(card.id);
        }}
      >
        {/*Corriger pour swipe gauche et droite tjrs au meme endroit*/}
        <img src={orderButton === 1 ? swipeRight : swipeLeft} alt="" />
        {card.choices[value - 1].label}
        {value}
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
          ? card.choices[consequence].consequence.buttonTextSuccess
          : card.choices[consequence].consequence.buttonTextFail}
      </button>
    );
  };

  return (
    <div className="randomButtons">
      {isSuccess == null && isChoose == null && (
        <div className="buttonsCard">
          <CardButtons card={card} value={randomButtonId} orderButton={1} />
          <CardButtons
            card={card}
            value={randomButtonId === 1 ? 2 : 1}
            orderButton={2}
          />
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
