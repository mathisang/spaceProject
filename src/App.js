import React, {useState} from 'react';
import './App.css';
import StartCard from "./components/Cards/StartCard";
import GameOn from "./components/GameOn";

function App() {
    const [isGameOn, setGameStatus] = useState(false);
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
