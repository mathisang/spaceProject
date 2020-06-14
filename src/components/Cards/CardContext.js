import React from "react";

// set the defaults
const CardContext = React.createContext({
    selectedCardId: null,
    setSelectedCardId: () => {}
});

export default CardContext;