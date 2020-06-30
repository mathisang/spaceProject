import React, { useState } from "react";
import "./App.scss";
import StartCard from "./components/Cards/StartCard";
import GameOn from "./components/GameOn";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Asteroid from "./components/Three/Asteroid";
import MiniGame from "./components/Three/MiniGame";

function App() {
  const [isGameOn, setGameStatus] = useState(false);
  const [isTutorialOn, setTutorialStatus] = useState(false);
  const handleChange = () => setGameStatus(true);
  const tutorialChange = () => (setTutorialStatus(true), setGameStatus(true));

  return (
    <Switch>
      <Route path="/asteroid-test">
        <Asteroid />
      </Route>
      <Route path="/minigame">
        <MiniGame />
      </Route>
      <Route path="/">
        <div className="App">
          {isGameOn ? (
            <GameOn
              tutorialStatus={isTutorialOn}
              setTutorialStatus={setTutorialStatus}
            />
          ) : (
            <StartCard
              onChangeStatus={handleChange}
              startTutoriel={tutorialChange}
            />
          )}
        </div>
      </Route>
    </Switch>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
