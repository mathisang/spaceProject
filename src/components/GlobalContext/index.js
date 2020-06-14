import React from "react";

// set the defaults
const GlobalContext = React.createContext({
    selectedCardId: null,
    setSelectedCardId: () => {}
});

export default GlobalContext;