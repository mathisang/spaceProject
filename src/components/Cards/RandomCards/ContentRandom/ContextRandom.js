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
  const consequence = isChoose !== null && card.choices[0].consequence ? 0 : 1;

  const arrayIcon = {
    Bienvenue: iconWelcome,
    Communication: iconCommunication,
    Économie: iconEconomy,
    Interne: iconInternal,
    Politique: iconPolitic,
    Recherche: iconResearch,
    Espionnage: iconSpying,
  };

  return (
    <div className="headerCard">
      {isChoose !== null ? (
        <div>
          <div className="iconCategory">
            <img src={arrayIcon[card.category.name]} alt="Bienvenue" />
          </div>
          <h2 className="small">
            {card.choices[consequence].consequence.label}
          </h2>
          <p className="description">
            {card.choices[consequence].consequence.context}
          </p>
        </div>
      ) : (
        <div>
          <div className="iconCategory">
            <img src={arrayIcon[card.category.name]} alt="Bienvenue" />
          </div>
          <h2 className="titleBig">{card.category.name}</h2>
          <p className="description">{card.context}</p>
        </div>
      )}
    </div>
  );
}
