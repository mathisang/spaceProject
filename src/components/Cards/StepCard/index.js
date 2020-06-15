import React, {useContext} from "react";
import cards from '../../../datas/stepCards.json'
import TimelineContext from '../../Timeline/TimelineContext'
import "./step-card.scss"
import GaugeContext from "../../Gauge/GaugeContext";

const Text = ({step}) => {
    const {timeline, setTimeline} = useContext(TimelineContext);
    return (
        <div className="text-container">
            <p>
                {
                    cards[step.id].name
                }
            </p>
            <p>
                {
                    timeline.usa > timeline.urss ? cards[step.id].win.message : cards[step.id].loose.message
                }
            </p>
        </div>
    )
}

const ContinueButton = ({setStep, step, setEnd}) => {
    const {timeline, setTimeline} = useContext(TimelineContext);
    const {gauge, setGauge} = useContext(GaugeContext);
    const handleClick = () => {
        step.id === cards.length - 1 ?
            setEnd(true) :
        timeline.usa > timeline.urss ?
            setGauge({
                argent: gauge.argent + cards[step.id].win.argent,
                opinion: gauge.opinion + cards[step.id].win.opinion,
                recherche: gauge.recherche + cards[step.id].win.recherche
            }) :
            setGauge({
                argent: gauge.argent + cards[step.id].loose.argent,
                opinion: gauge.opinion + cards[step.id].loose.opinion,
                recherche: gauge.recherche + cards[step.id].loose.recherche
            });
            setStep({isActive: false, id: step.id + 1});
    }
    return (
        <button onClick={handleClick}>
            Continuer
        </button>
    );
};

export default ({step, setStep, setEnd}) => (
    <div className="card-container step-card">
        <Text step={step}/>
        <ContinueButton step={step} setStep={setStep} setEnd={setEnd}/>
    </div>
)
