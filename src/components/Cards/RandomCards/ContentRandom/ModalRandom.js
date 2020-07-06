import React from "react";

export default function ({ isSuccess, card, consequence, CardButtons }) {
  return (
    <div className="modalAnswer">
      <div>
        <div
          className="pictureModal"
          style={{
            backgroundImage: `url('../../../assets/images/cards/consequence/${
              isSuccess
                ? card.choices[consequence].consequence.imageSuccess
                : card.choices[consequence].consequence.imageFail
            }')`,
          }}
        />
        <p className="description">
          {isSuccess
            ? card.choices[consequence].consequence.contextSuccess
            : card.choices[consequence].consequence.contextFail}
        </p>
        <CardButtons card={card} value={3} />
      </div>
    </div>
  );
}
