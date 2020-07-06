import React, { useContext, useEffect, useState } from "react";
import cards from "../../../datas/randomCards.json";
import "../cards.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import CardContext from "../CardContext";
import "./randomCards.scss";
import ButtonsRandom from "./ContentRandom/ButtonsRandom";
import ContextRandom from "./ContentRandom/ContextRandom";

export default function ({ cardUnused, setCardUnused }) {
  const { gauge, setGauge } = useContext(GaugeContext);
  const [isSuccess, setSuccess] = useState(null);
  const [isChoose, setChoose] = useState(null);
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);
  const [nextCard, setNextCard] = useState(null);
  const [idButton, setIdButton] = useState(0);

  function randomNumber() {
    return Math.floor(Math.random() * cardUnused.length);
  }

  // GESTION DE LA COLLECTION DE CARTES
  // Génère une nouvelle carte qui n'a pas encore été jouée
  // SI DERNIERE CARTE DU JSON CA GENERE UNE ERREUR & PROBLEME SUPPRESSION
  function nextIdCard() {
    let oldCategory = null;
    for (var i = 0; i < cardUnused.length; i++) {
      if (cardUnused[i] === selectedCardId) {
        oldCategory = cards[selectedCardId].category;
        cardUnused.splice(i, 1);
      }
    }
    console.log(cardUnused);
    console.log("ID CARTE CLIQUÉ : " + selectedCardId);

    let number = randomNumber();
    let newItem = cardUnused[number];

    console.log("ANCIENNE CATEGORIE : " + oldCategory);
    console.log("NOUVELLE ID CARTE : " + newItem);
    console.log("NOUVELLE CATEGORY : " + cards[newItem].category);

    if (cards[newItem].category === oldCategory) {
      do {
        number = Math.floor(Math.random() * cardUnused.length);
        newItem = cardUnused[number];
        console.log("---------------");
        console.log("ANCIENNE CATEGORIE : " + oldCategory);
        console.log("REMPLACEMENT ID CARTE : " + newItem);
        console.log("REMPLACEMENT CATEGORY : " + cards[newItem].category);
      } while (cards[newItem].category === oldCategory);
    }

    switch (cardUnused[0]) {
      case 0:
      case 1:
        return cardUnused[0];
        break;
      default:
        return cardUnused[number];
        break;
    }
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

  // AVANCEMENT DU JEU
  // Avancement des jauges et du jeu : calcul les jauges, attribue une prochaine carte à afficher
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (idButton) {
      case 1:
      case 2:
        updateGauge(selectedCardId);
        break;
    }
    setSuccess(null);
    setNextCard(nextIdCard());
  }, [selectedCardId]);

  // Affichage de la carte + réponses
  return (
    <div className="randomCard">
      {cards.map(
        (card, index) =>
          nextCard === card.id && (
            <div className="card" key={index}>
              <span>{card.id}</span>
              <ContextRandom card={card} isChoose={isChoose} />
              <ButtonsRandom
                nextCard={nextCard}
                setIdButton={setIdButton}
                setSelectedCardId={setSelectedCardId}
                selectedCardId={selectedCardId}
                isSuccess={isSuccess}
                setSuccess={setSuccess}
                isChoose={isChoose}
                setChoose={setChoose}
                card={card}
                cards={cards}
                updateGauge={updateGauge}
              />
            </div>
          )
      )}
    </div>
  );
}
