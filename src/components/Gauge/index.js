import React, { useContext } from "react";
import GaugeContext from "./GaugeContext";
import "./gauge.scss";
import {
  dollarsBlue,
  dollarsWhite,
  opinionWhite,
  opinionBlue,
  searchWhite,
  searchBlue,
} from "../../assets/images/index";

// Affichage des jauges
export default function ({ stepTutorial }) {
  const { gauge, setGauge } = useContext(GaugeContext);

  function showAmount(type) {
    return gauge[type] > 100
      ? 100 + "%"
      : gauge[type] < 0
      ? 0 + "%"
      : gauge[type] + "%";
  }

  return (
    <div
      className="rowGauges"
      style={stepTutorial === 6 ? { opacity: ".35" } : { opacity: "1" }}
    >
      <div className="boxGauge">
        <img src={dollarsBlue} alt="" />
        <span className="stat">Argent</span>
        <div className="gaugeValue" style={{ height: showAmount("money") }}>
          <img src={dollarsWhite} alt="" />
          <span className="stat">Argent</span>
        </div>
      </div>
      <div className="boxGauge">
        <img src={opinionBlue} alt="" />
        <span className="stat">Opinion</span>
        <div className="gaugeValue" style={{ height: showAmount("opinion") }}>
          <img src={opinionWhite} alt="" />
          <span className="stat">Opinion</span>
        </div>
      </div>
      <div className="boxGauge">
        <img src={searchBlue} alt="" />
        <span className="stat">Recherche</span>
        <div className="gaugeValue" style={{ height: showAmount("search") }}>
          <img src={searchWhite} alt="" />
          <span className="stat">Recherche</span>
        </div>
      </div>
    </div>
  );
}
