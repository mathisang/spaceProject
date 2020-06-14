import React, {useContext} from "react";
import cards from '../../../datas/stepCards.json'
import TimelineContext from '../../Timeline/TimelineContext'
import "./step-card.scss"

const Text = ({step}) => {
    const {timeline, setTimeline} = useContext(TimelineContext);
    return(
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

const ContinueButton = ({ setStep, step}) => {
    const handleClick = () => {
        setStep({isActive: false, id: step.id+1});
    }
    return (
        <button onClick={handleClick}>
            Continuer
        </button>
    );
};

export default ({step, setStep}) => (
    <div className="card-container step-card">
        <Text step={step} />
        <ContinueButton step={step} setStep={setStep}/>
    </div>
)
