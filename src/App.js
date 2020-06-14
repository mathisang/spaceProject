import React, {useEffect, useState} from 'react';
import './App.css';
import StartCard from "./components/StartCard";
import GameOn from "./components/GameOn";
import cards from "./cards.json";

function App() {
    const[isGameOn, setGameStatus] = useState(false);

    const handleChange = () => setGameStatus(true);
    
    return (
        <div className="App">
                {
                    isGameOn ? <GameOn/> : <StartCard onChangeStatus={handleChange}/>
                }

        </div>
    );
}

export default App;
