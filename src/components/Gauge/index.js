import React, { useContext } from "react";
import GaugeContext from "./GaugeContext";

// Affichage des jauges
export default function () {
  const { gauge, setGauge } = useContext(GaugeContext);

  function showAmount(type) {
    return gauge[type] > 100
      ? (gauge[type] = 100)
      : gauge[type] < 0
      ? (gauge[type] = 0)
      : gauge[type];
  }

  return (
    <div>
      <div>
        Argent : {showAmount("money")}%
        <br />
        Opinion : {showAmount("opinion")}%
        <br />
        Recherche : {showAmount("search")}%
      </div>
    </div>
  );
}
