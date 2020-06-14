import React, {useEffect, useState} from 'react';
import RandomCard from "../Cards/RandomCards";
import Gauge from "../Gauge";
import GaugeContext from "../Gauge/GaugeContext";
import Timeline from "../Timeline"
import TimelineContext from "../Timeline/TimelineContext";
import SeasonTimeline from "../SeasonTimeline"
import CardContext from "../Cards/CardContext";
import LooseCard from "../Cards/LooseCard";
import StepCard from "../Cards/StepCard";

export default function () {
    const [gauge, setGauge] = useState({argent: 50, opinion: 50, recherche: 50});
    const gaugeContextValue = {gauge, setGauge};
    const [timeline, setTimeline] = useState({urss: 5, usa: 0});
    const timelineContextValue = {timeline, setTimeline};
    const [selectedCardId, setSelectedCardId] = useState(null);
    const cardContextValue = {selectedCardId, setSelectedCardId};
    const [isLoose, setLoose] = useState(false);
    const [isStep, setStep] = useState(false);


    useEffect(() => {
        (gauge.argent === 0 || gauge.opinion === 0 || gauge.recherche === 0) && setLoose(true);
    }, [gauge])

    useEffect(() => {
        (timeline.usa >= 25 || timeline.urss >= 25) && setStep(true);
    }, [timeline])

    return (
        <CardContext.Provider value={cardContextValue}>
            <GaugeContext.Provider value={gaugeContextValue}>
                <TimelineContext.Provider value={timelineContextValue}>
                    {
                        isLoose ? <LooseCard/> :
                            <div className="playing-container">
                                <div className="head-container">
                                    <SeasonTimeline/>
                                    <Gauge/>
                                </div>
                                {
                                    isStep && <StepCard setStep={setStep}/>
                                }
                                <RandomCard/>
                                <Timeline/>
                            </div>
                    }
                </TimelineContext.Provider>
            </GaugeContext.Provider>
        </CardContext.Provider>
    );
}