import React, {useState} from 'react';
import Card from "../Card";
import Gauge from "../Gauge"
import GaugeContext from "../Gauge/GaugeContext";
import Timeline from "../Timeline"
import TimelineContext from "../Timeline/TimelineContext";
import SeasonTimeline from "../SeasonTimeline"
import CardContext from "../Card/CardContext";

export default function () {
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
                    <div className="head-container">
                        <SeasonTimeline/>
                        <Gauge/>
                    </div>
                    <Card/>
                    <Timeline/>
                </TimelineContext.Provider>
            </GaugeContext.Provider>
        </CardContext.Provider>
    );
}