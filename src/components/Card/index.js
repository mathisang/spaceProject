import React, {useContext, useEffect, useState} from 'react';
import cards from '../../cards.json'
import './card.scss'
import GaugeContext from "../Gauge/GaugeContext";
import TimelineContext from "../Timeline/TimelineContext";



export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);
    const {timeline, setTimeline} = useContext(TimelineContext);
    const [isSuccess, setSuccess] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [nextCard, setNextCard] = useState(null);
    const [idButton, setIdButton] = useState(0);
    const arrayFull = [];
    for (let i = 0; i < cards.length; i++) {
        arrayFull.push(i);
    }
    const [cardUnused, setCardUnused] = useState(arrayFull);

    function trySuccess(e) {

        console.log(e);

        e == 1 && setGauge({argent: gauge.argent + cards[nextCard].value.reponse_un.argent, opinion: gauge.opinion + cards[nextCard].value.reponse_un.opinion, recherche: gauge.recherche + cards[nextCard].value.reponse_un.recherche});
        e == 2 && setGauge({argent: gauge.argent + cards[nextCard].value.reponse_deux.argent, opinion: gauge.opinion + cards[nextCard].value.reponse_deux.opinion, recherche: gauge.recherche + cards[nextCard].value.reponse_deux.recherche})
        
        let r = Math.random();
        (r < cards[nextCard].consequence.success.percent) ? setSuccess(true) : setSuccess(false);

    }

    function nextIdCard() {

        return cardUnused[Math.floor(Math.random()*cardUnused.length)];

    }

    function randomCard() {

        for( var i = 0; i < cardUnused.length; i++){
             if ( cardUnused[i] === selectedCardId) {
                    cardUnused.splice(i, 1); 
                }
            }
        console.log(cardUnused);

        const newCardId = nextIdCard();
        console.log(newCardId);

        return newCardId;

    }
    

    useEffect(() => {

        idButton == 1 && setGauge({argent: gauge.argent + cards[selectedCardId].value.reponse_un.argent, opinion: gauge.opinion + cards[selectedCardId].value.reponse_un.opinion, recherche: gauge.recherche + cards[selectedCardId].value.reponse_un.recherche});
        idButton == 2 && setGauge({argent: gauge.argent + cards[selectedCardId].value.reponse_deux.argent, opinion: gauge.opinion + cards[selectedCardId].value.reponse_deux.opinion, recherche: gauge.recherche + cards[selectedCardId].value.reponse_deux.recherche});
        
        idButton == 3 && (isSuccess ? setGauge({argent: gauge.argent + cards[nextCard].consequence.success.argent, opinion: gauge.opinion + cards[nextCard].consequence.success.opinion, recherche: gauge.recherche + cards[nextCard].consequence.success.recherche}) :
        setGauge({argent: gauge.argent + cards[nextCard].consequence.fail.argent, opinion: gauge.opinion + cards[nextCard].consequence.fail.opinion, recherche: gauge.recherche + cards[nextCard].consequence.fail.recherche}))

        let totalJauge = gauge.argent + gauge.opinion + gauge.recherche;
        console.log(totalJauge);

        let avanceUsa = 4;

        totalJauge < 140 ? avanceUsa = 2 : totalJauge >= 155 ? avanceUsa = 7 : avanceUsa = 4;

        setTimeline({urss: timeline.urss + 4, usa: timeline.usa + avanceUsa});

        setSuccess(null);

        setNextCard(randomCard());

        // Avancement USA / URSS
        // Afficher la date

    }, [selectedCardId]);


    return (
        <div className="">
            <ul>
                {cards.map((card, index) =>
                nextCard === card.id &&
                    <div className="card-container" key={index} >
                        {card.text.intitule}
                        <div>
                            <button onClick={() => { setIdButton(1); (card.consequence.exist && card.consequence.button == "reponse_un") ? trySuccess(1) : setSelectedCardId(card.id);}}>{card.text.reponse_un}</button>
                            <button onClick={() => { setIdButton(2); (card.consequence.exist && card.consequence.button == "reponse_deux") ? trySuccess(2) : setSelectedCardId(card.id);}}>{card.text.reponse_deux}</button>
                        </div>
                        {
                            card.consequence.exist && 
                                <div>consequence : {(isSuccess !== null) && ( isSuccess ? (<p>succès</p> ) : <p>échec</p>)}
                                <button onClick={() => { setSelectedCardId(card.id); setIdButton(3);}}>SUIVANT</button>  
                                </div>
                        }
                    </div>
                )
                }
            </ul>
        </div>
    );
}
