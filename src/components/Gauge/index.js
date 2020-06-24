import React, { useContext } from "react";
import GaugeContext from "./GaugeContext";

export default function () {
  const { gauge, setGauge } = useContext(GaugeContext);

  return (
    <div className="">
      <div>
        Argent :{" "}
        {gauge.money > 100
          ? (gauge.money = 100)
          : gauge.money < 0
          ? (gauge.money = 0)
          : gauge.money}{" "}
        %
        <br />
        Opinion:{" "}
        {gauge.opinion > 100
          ? (gauge.opinion = 100)
          : gauge.opinion < 0
          ? (gauge.opinion = 0)
          : gauge.opinion}{" "}
        %
        <br />
        Recherche:{" "}
        {gauge.search > 100
          ? (gauge.search = 100)
          : gauge.search < 0
          ? (gauge.search = 0)
          : gauge.search}{" "}
        %
      </div>
    </div>
  );
}
