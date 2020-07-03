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
                ? card.card.responses[consequence].consequence.success.image
                : card.card.responses[consequence].consequence.fail.image
            }')`,
          }}
        />
        <p className="description">
          {isSuccess
            ? card.card.responses[consequence].consequence.success.context
            : card.card.responses[consequence].consequence.fail.context}
        </p>
        <CardButtons card={card} value={3} />
      </div>
    </div>
  );
}
