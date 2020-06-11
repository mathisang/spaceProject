import React, {useContext, useEffect, useState} from 'react';
import steps from '../../time.json'
import CardContext from "../Card/CardContext";


export default function () {
    const[step, setStep] = useState(0);
    const {selectedCardId, setSelectedCardId} = useContext(CardContext);

    useEffect(() => {
        selectedCardId > 0 && setStep(step +1);
    }, [selectedCardId]);

    return (
        <div className="">
            {
                steps[step].name
            }
        </div>
    );
}
