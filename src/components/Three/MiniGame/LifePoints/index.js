import React from "react";
import "./lifepoints.scss";
import { heart } from "../../../../assets/images";

export default ({ lifePoints }) => {
  return (
    <div className="health-container">
      <p>{lifePoints} x </p>
      <img src={heart} />
    </div>
  );
};
