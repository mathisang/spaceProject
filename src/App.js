import React, { useEffect, useState } from "react";
import "./App.scss";
import StartCard from "./components/Cards/StartCard";
import GameOn from "./components/GameOn";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Asteroid from "./components/Three/Asteroid";
import MiniGame from "./components/Three/MiniGame";
import MoonGame from "./components/Three/MoonGame";

function App() {
  const [isGameOn, setGameStatus] = useState(false);
  const [isTutorialOn, setTutorialStatus] = useState(false);
  const handleChange = () => setGameStatus(true);
  const tutorialChange = () => (setTutorialStatus(true), setGameStatus(true));
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://51.91.109.26/api/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCardsData(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Switch>
      <Route path="/asteroid-test">
        <Asteroid />
      </Route>
      <Route path="/minigame">
        <MiniGame />
      </Route>
      <Route path="/moongame">
        <MoonGame />
      </Route>
      <Route path="/">
        <div className="App">
          {isGameOn ? (
            <GameOn
              tutorialStatus={isTutorialOn}
              setTutorialStatus={setTutorialStatus}
              cardsData={cardsData}
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
