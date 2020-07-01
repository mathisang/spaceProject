import React, { useContext } from "react";
import GaugeContext from "./GaugeContext";
import "./gauge.scss";
import DollarsWhite from "../../assets/images/gauges/dollars_white.png";
import DollarsBlue from "../../assets/images/gauges/dollars_blue.png";
import OpinionWhite from "../../assets/images/gauges/opinion_white.png";
import OpinionBlue from "../../assets/images/gauges/opinion_blue.png";
import SearchWhite from "../../assets/images/gauges/search_white.png";
import SearchBlue from "../../assets/images/gauges/search_blue.png";

// Affichage des jauges
export default function () {
  const { gauge, setGauge } = useContext(GaugeContext);

  function showAmount(type) {
    return gauge[type] > 100
      ? (gauge[type] = 100 + "%")
      : gauge[type] < 0
      ? (gauge[type] = 0)
      : gauge[type] + "%";
  }

  return (
    <div className="rowGauges">
      <div className="boxGauge">
        <img src={DollarsBlue} alt="" />
        <span className="stat">Argent</span>
        <div className="gaugeValue" style={{ height: showAmount("money") }}>
          <img src={DollarsWhite} alt="" />
          <span className="stat">Argent</span>
        </div>
      </div>
      <div className="boxGauge">
        <img src={OpinionBlue} alt="" />
        <span className="stat">Opinion</span>
        <div className="gaugeValue" style={{ height: showAmount("opinion") }}>
          <img src={OpinionWhite} alt="" />
          <span className="stat">Opinion</span>
        </div>
      </div>
      <div className="boxGauge">
        <img src={SearchBlue} alt="" />
        <span className="stat">Recherche</span>
        <div className="gaugeValue" style={{ height: showAmount("search") }}>
          <img src={SearchWhite} alt="" />
          <span className="stat">Recherche</span>
        </div>
      </div>
    </div>
  );
}
