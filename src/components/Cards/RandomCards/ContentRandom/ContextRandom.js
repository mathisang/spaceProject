import React, { useContext, useEffect, useState } from "react";
import {
  iconCommunication,
  iconEconomy,
  iconInternal,
  iconPolitic,
  iconResearch,
  iconSpying,
  iconWelcome,
} from "../../../../assets/images/index";

export default function ({ card, isChoose }) {
  const consequence =
    isChoose !== null && card.card.responses[0].consequence ? 0 : 1;

  return (
    <div className="headerCard">
      {isChoose !== null ? (
        <div>
          <img src={iconWelcome} alt="Bienvenue" />
          <h2 className="small">
            {card.card.responses[consequence].consequence.label}
          </h2>
          <p className="description">
            {card.card.responses[consequence].consequence.context}
          </p>
        </div>
      ) : (
        <div>
          <img src={iconWelcome} alt="Bienvenue" />
          <h2 className="titleBig">{card.category}</h2>
          <p className="description">{card.card.context}</p>
        </div>
      )}
    </div>
  );
}
