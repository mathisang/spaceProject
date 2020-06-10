import React, {useContext, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import Gauge from "./components/Gauge"
import GaugeContext from "./components/Gauge/GaugeContext";

function App() {
    const [gauge, setGauge] = useState({argent: 50, opinion: 50, recherche: 50});
    const gaugeContextValue = {gauge, setGauge};
    return (
        <GaugeContext.Provider value={gaugeContextValue}>
            <div className="App">
                <Card/>
                <Gauge/>
            </div>
        </GaugeContext.Provider>
    );
}

export default App;
