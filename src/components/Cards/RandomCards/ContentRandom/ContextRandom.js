import React, { useContext, useEffect, useState } from "react";
import {
  iconCommunication,
  iconEconomy,
  iconInternal,
  iconPolitic,
  iconResearch,
  iconSpying,
  iconWelcome,
  swipeLeft,
  swipeRight,
} from "../../../../assets/images/index";

export default function ({ card }) {
  return (
    <div className="headerCard">
      <img src={iconWelcome} alt="Bienvenue" />
      <h2 className="titleBig">{card.category}</h2>
      <p className="description">{card.card.context}</p>
    </div>
  );
}
