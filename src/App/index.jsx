import { useState } from "react";
import { Game } from "../Components/Game";
import { GameOver } from "../Components/GameOver";
import { Preparation } from "../Components/Preparation";
import { Context } from "../Context";
import "./index.scss";

export const App = () => {
  const [ready, setReady] = useState(0);
  const [element, setElement] = useState({ array: [] });
  const [player, setPlayer] = useState(8);
  const [enemy, setEnemy] = useState(8);
  const [sound, setSound] = useState(0.0);

  return (
    <div className="app">
      <Context.Provider
        value={{
          ready,
          setReady,
          element,
          setElement,
          player,
          setPlayer,
          enemy,
          setEnemy,
          sound,
          setSound,
        }}>
        {ready === 0 ? <Preparation /> : <Game />}
        {player === 0 || enemy === 0 ? <GameOver /> : <></>}
      </Context.Provider>
    </div>
  );
};
