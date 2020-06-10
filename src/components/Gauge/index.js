import React, {useState, useContext} from 'react';
import GaugeContext from './GaugeContext'


export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);
    return (
        <div className="">
            <div>
                Argent : {gauge.argent}
                <br/>
                Opinion: {gauge.opinion}
                <br/>
                Recherche: {gauge.recherche}
            </div>
        </div>
    );
}
