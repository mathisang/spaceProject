import React, { useContext, useEffect, useState } from "react";
import GaugeContext from "./GaugeContext";
import { useSpring, animated } from "react-spring";
import "./gauge.scss";
import {
  dollarsBlue,
  dollarsWhite,
  opinionWhite,
  opinionBlue,
  searchWhite,
  searchBlue,
  upEffect,
  downEffect,
} from "../../assets/images/index";

// Affichage des jauges
export default function ({ stepTutorial }) {
  const { gauge, setGauge } = useContext(GaugeContext);
  const animHeightMoney = useSpring({
    height: showAmount("money"),
  });
  const animHeightOpinion = useSpring({
    height: showAmount("opinion"),
  });
  const animHeightSearch = useSpring({
    height: showAmount("search"),
  });
  const animOpacityEffect = useSpring({
    reset: true,
    reverse: true,
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });
  const [oldMoney, setOldMoney] = useState(30);
  const [oldOpinion, setOldOpinion] = useState(50);
  const [oldSearch, setOldSearch] = useState(50);
  const [iconMoney, setIconMoney] = useState(null);
  const [iconOpinion, setIconOpinion] = useState(null);
  const [iconSearch, setIconSearch] = useState(null);

  useEffect(() => {
    setIconMoney(
      gauge.money > oldMoney
        ? upEffect
        : gauge.money < oldMoney
        ? downEffect
        : ""
    );
    setIconOpinion(
      gauge.opinion > oldOpinion
        ? upEffect
        : gauge.opinion < oldOpinion
        ? downEffect
        : ""
    );
    setIconSearch(
      gauge.search > oldSearch
        ? upEffect
        : gauge.search < oldSearch
        ? downEffect
        : ""
    );
    setOldMoney(gauge.money);
    setOldOpinion(gauge.opinion);
    setOldSearch(gauge.search);
  }, [gauge]);

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
        <animated.img
          className="effect"
          src={iconMoney}
          style={animOpacityEffect}
          alt=""
        />
        <img className="icon" src={dollarsBlue} alt="" />
        <span className="stat">Argent</span>
        <animated.div className="gaugeValue" style={animHeightMoney}>
          <img className="icon" src={dollarsWhite} alt="" />
          <span className="stat">Argent</span>
        </animated.div>
      </div>
      <div className="boxGauge">
        <animated.img
          className="effect"
          src={iconOpinion}
          style={animOpacityEffect}
          alt=""
        />
        <img className="icon" src={opinionBlue} alt="" />
        <span className="stat">Opinion</span>
        <animated.div className="gaugeValue" style={animHeightOpinion}>
          <img className="icon" src={opinionWhite} alt="" />
          <span className="stat">Opinion</span>
        </animated.div>
      </div>
      <div className="boxGauge">
        <animated.img
          className="effect"
          src={iconSearch}
          style={animOpacityEffect}
          alt=""
        />
        <img className="icon" src={searchBlue} alt="" />
        <span className="stat">Recherche</span>
        <animated.div className="gaugeValue" style={animHeightSearch}>
          <img className="icon" src={searchWhite} alt="" />
          <span className="stat">Recherche</span>
        </animated.div>
      </div>
    </div>
  );
}
