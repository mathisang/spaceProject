import React, { useMemo, useState, useEffect } from "react";
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
  stepTutorial,
  swipeState,
  setSwipe
}) {
  // Détermine quelle réponse possède une conséquence
  const consequence = isChoose !== null && card.choices[0].consequence ? 0 : 1;

  function chooseSuccess() {
    updateGauge(nextCard);
    setChoose(true);
  }

  const randomButtonId = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

  // Gestion de la réponse si c'est un swipe
  useEffect(() => {
    if (swipeState !== 0) {
      const cardSwipeId = document.getElementsByClassName("card")[0].id;
      const button1 = document.querySelectorAll(".randomButtons button")[0];
      const button2 = document.querySelectorAll(".randomButtons button")[1];
      swipeState === 1 ? button1.click() : swipeState === -1 && button2.click()
      setSwipe(0);
    }
  }, [swipeState]);

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
        <img src={orderButton === 1 ? swipeRight : swipeLeft} alt="" />
        {card.choices[value - 1].label}
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
    <div
      className="randomButtons"
      style={
        stepTutorial === 3
          ? { zIndex: "99999", background: "#F5F5EB" }
          : { zIndex: "unset" }
      }
    >
      {isSuccess == null && isChoose == null && (
        <div className="buttonsCard">
          <CardButtons card={card} value={1} orderButton={1} />
          <CardButtons
            card={card}
            value={2}
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
