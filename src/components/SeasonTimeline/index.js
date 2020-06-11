import React, {useState} from 'react';
import steps from '../../time.json'


export default function () {
    const[step, setStep] = useState(0);

    return (
        <div className="">
            {
                steps[step].name
            }
        </div>
    );
}
