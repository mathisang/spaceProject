import React, {useContext} from "react";
import cards from '../../../datas/stepCards.json'
import TimelineContext from '../../Timeline/TimelineContext'
import "./step-card.scss"

const Text = () => {
    const {timeline, setTimeline} = useContext(TimelineContext);
    return(
    <div className="text-container">
        <p>
            {
                cards[0].name
            }
        </p>
        <p>
            {
                timeline.usa > timeline.urss ? cards[0].win.message : cards[0].loose.message
            }
        </p>
    </div>
    )
}

const ContinueButton = ({setStep}) => {
    return (
        <button onClick={() => setStep(false)}>
            Continuer
        </button>
    );
};

export default ({setStep}) => (
    <div className="card-container step-card">
        <Text/>
        <ContinueButton setStep={setStep}/>
    </div>
)
