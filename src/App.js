import React, {useState} from 'react';
import './App.css';
import StartCard from "./components/Cards/StartCard";
import GameOn from "./components/GameOn";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Asteroid from '../src/components/Three/Asteroid'

function App() {

    const [isGameOn, setGameStatus] = useState(false);
    const handleChange = () => setGameStatus(true);

    return (
            <Switch>
                <Route path="/asteroid-test">
                    <Asteroid/>
                </Route>
                <Route path="/">
                    <div className="App">
                        {
                            isGameOn ? <GameOn/> : <StartCard onChangeStatus={handleChange}/>
                        }
                    </div>
                </Route>
            </Switch>
    );
}

export default () => (
    <Router>
        <App />
    </Router>
)

