import React, {useContext, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import Gauge from "./components/Gauge"
import GaugeContext from "./components/Gauge/GaugeContext";
import Timeline from "./components/Timeline"
import TimelineContext from "./components/Timeline/TimelineContext";
import SeasonTimeline from "./components/SeasonTimeline"
import CardContext from "./components/Card/CardContext";

function App() {
    const [gauge, setGauge] = useState({argent: 50, opinion: 50, recherche: 50});
    const gaugeContextValue = {gauge, setGauge};
    const [timeline, setTimeline] = useState({urss: 5, usa: 0});
    const timelineContextValue = {timeline, setTimeline};
    const [selectedCardId, setSelectedCardId] = useState(null);
    const cardContextValue = {selectedCardId, setSelectedCardId};
    return (
        <CardContext.Provider value={cardContextValue}>
        <GaugeContext.Provider value={gaugeContextValue}>
            <TimelineContext.Provider value={timelineContextValue}>
                <div className="App">
                    <div className="head-container">
                        <SeasonTimeline/>
                        <Gauge/>
                    </div>
                    <Card/>
                    <Timeline/>
                </div>
            </TimelineContext.Provider>
        </GaugeContext.Provider>
        </CardContext.Provider>
    );
}

export default App;
