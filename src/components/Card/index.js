import React, {useContext, useEffect, useState} from 'react';
import cards from '../../cards.json'
import './card.scss'
import GaugeContext from "../Gauge/GaugeContext";



export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);
    const [isSuccess, setSuccess] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [idButton, setIdButton] = useState(null);
    const arrayFull = [];
    for (let i = 0; i < cards.length; i++) {
        arrayFull.push(i);
    }
    const [cardUnused, setCardUnused] = useState(arrayFull);

    function trySuccess() {
        let r = Math.random();
        (r < 0.5) ? setSuccess(true) : setSuccess(false);
    }

    function nextIdCard() {

        return Math.floor(Math.random() * cards.length+1);

    }

    function randomCard() {

        console.log(cardUnused);

        for( var i = 0; i < cardUnused.length; i++){
             if ( cardUnused[i] === selectedCardId) {
                    cardUnused.splice(i, 1); 
                }
            }
        
        console.log(cardUnused);

        //const newCardId = nextIdCard();

        
        /*while (n < 3) {
            n++;
        }

        if(cardUnused.includes(newCardId)){
            nextIdCard();
        } else {
            return newCardId;
        } */

    }

    useEffect(() => {

        idButton == 1 && setGauge({argent: gauge.argent + cards[selectedCardId].value.reponse_un.argent, opinion: gauge.opinion + cards[selectedCardId].value.reponse_un.opinion, recherche: gauge.recherche + cards[selectedCardId].value.reponse_un.recherche});
        idButton == 2 && setGauge({argent: gauge.argent + cards[selectedCardId].value.reponse_deux.argent, opinion: gauge.opinion + cards[selectedCardId].value.reponse_deux.opinion, recherche: gauge.recherche + cards[selectedCardId].value.reponse_deux.recherche});

        randomCard();
        
        

    }, [selectedCardId]);


    return (
        <div className="">
            <ul>
                {cards.map((card, index) =>
                    <div className="card-container" key={index} >
                        {card.text.intitule}
                        <div>
                            <button onClick={() => { card.consequence.exist && trySuccess(); setSelectedCardId(card.id); setIdButton(1);}}>{card.text.reponse_un}</button>
                            <button onClick={() => { setSelectedCardId(card.id); setIdButton(2);}}>{card.text.reponse_deux}</button>
                        </div>
                        {
                            card.consequence.exist && <div>consequence : {(isSuccess !== null) && ( isSuccess ? (<p>succès</p> /*&& (() => setGauge({argent: gauge.argent + card.consequence.success.argent, opinion: gauge.opinion + card.consequence.success.opinion, recherche: gauge.recherche + card.consequence.success.recherche}))*/ ) : <p>échec</p>)}</div>
                        }
                    </div>
                )
                }
            </ul>
        </div>
    );
}
