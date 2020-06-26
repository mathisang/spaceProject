import React from "react";

// Carte en cours d'affichage
const CardContext = React.createContext({
  selectedCardId: null,
  setSelectedCardId: () => {},
});

export default CardContext;
