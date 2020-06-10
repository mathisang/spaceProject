import React, {useState, useContext, useEffect} from 'react';
import GaugeContext from './GaugeContext'


export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);

    return (
        <div className="">
            <div>
                Argent : {(gauge.argent > 100) ? (gauge.argent = 100) : (gauge.argent < 0 ? gauge.argent = 0 : gauge.argent) } %
                <br/>
                Opinion: {(gauge.opinion > 100) ? (gauge.opinion = 100) : (gauge.opinion < 0 ? gauge.opinion = 0 : gauge.opinion) } %
                <br/>
                Recherche: {(gauge.recherche > 100) ? (gauge.recherche = 100) : (gauge.recherche < 0 ? gauge.recherche = 0 : gauge.recherche) } %
            </div>
        </div>
    );
}
