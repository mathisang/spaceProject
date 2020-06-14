import React, {useEffect, useState} from "react";

const Text = () => (
<p>
 Texte apparition
</p>
)

 const StartButton = ({onChangeStatus}) => {
    return (
    <button onClick={onChangeStatus}>
        Commencer l'aventure
    </button>
    );
};

export default ({onChangeStatus}) => (
    <div>
        <Text/>
        <StartButton onChangeStatus={onChangeStatus}/>
    </div>
)
