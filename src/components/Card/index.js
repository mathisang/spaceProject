import React, {useContext, useEffect, useState} from 'react';
import cards from '../../cards.json'
import './card.scss'
import GaugeContext from "../Gauge/GaugeContext";



export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);
    const [isSuccess, setSuccess] = useState(null);
    /*const card = cards.sort(() => Math.random() - Math.random())
        .find(() => true);*/

    useEffect(() => {
        console.log(gauge.argent)
    }, [gauge.argent]);

    function trySuccess() {
        let r = Math.random();
        (r < 0.5) ? setSuccess(true) : setSuccess(false);
    }

    /*useEffect(() => {
        console.log(card)
    }, [card]);*/


    return (
        <div className="">
            <ul>
                {cards.map((card, index) =>
                    <div className="card-container" key={index} >
                        {card.text.intitule}
                        <div>
                            <button onClick={() => {setGauge({argent: gauge.argent + card.value.reponse_un.argent, opinion: gauge.opinion + card.value.reponse_un.opinion, recherche: gauge.recherche + card.value.reponse_un.recherche}); card.consequence.exist && trySuccess();}}>{card.text.reponse_un}</button>
                            <button onClick={() => setGauge({argent: gauge.argent + card.value.reponse_deux.argent, opinion: gauge.opinion + card.value.reponse_deux.opinion, recherche: gauge.recherche + card.value.reponse_deux.recherche})}>{card.text.reponse_deux}</button>
                        </div>
                        {
                            card.consequence.exist && <div>consequence : {(isSuccess !== null) && ( isSuccess ? (<p>succès</p> /*&& (() => setGauge({argent: gauge.argent + card.consequence.success.argent, opinion: gauge.opinion + card.consequence.success.opinion, recherche: gauge.recherche + card.consequence.success.recherche}))*/ ) : <p>échec</p>)}</div>
                        }
                    </div>
                )
                }
                {/*{
                    <div className="card-container" >
                        {card.text.intitule}
                        <div>
                            <button onClick={() => setGauge({argent: gauge.argent + card.value.reponse_un.argent, opinion: gauge.opinion + card.value.reponse_un.opinion, recherche: gauge.recherche + card.value.reponse_un.recherche})}>{card.text.reponse_un}</button>
                            <button onClick={() => setGauge({argent: gauge.argent + card.value.reponse_deux.argent, opinion: gauge.opinion + card.value.reponse_deux.opinion, recherche: gauge.recherche + card.value.reponse_deux.recherche})}>{card.text.reponse_deux}</button>
                        </div>
                    </div>
                }*/}
            </ul>
        </div>
    );
}
