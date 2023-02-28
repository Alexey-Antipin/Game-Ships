import { Preparation, GameOver, Game } from "../Components";
import { ArrayElement } from "../ts";
import { Context } from "../Context";
import { useState } from "react";
import "./index.scss";

export const App = () => {
  const [element, setElement] = useState<ArrayElement>({ array: [] });
  const [sound, setSound] = useState<number>(0.5);
  const [player, setPlayer] = useState<number>(8);
  const [enemy, setEnemy] = useState<number>(8);
  const [ready, setReady] = useState<number>(0);

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
