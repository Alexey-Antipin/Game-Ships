import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context";
import "./index.scss";

export const GameOver = () => {
  const context = useContext(Context);
  const [win, setWin] = useState<string>("");

  useEffect(() => {
    checkWin();
  }, []);

  const checkWin = () => {
    if (context.enemy === 0 && context.player === 0) {
      setWin("Ничья.");
      return;
    }
    if (context.enemy === 0) {
      setWin("Ты победил.");
    } else {
      setWin("Ты проиграл.");
    }
  };

  const newGame = () => {
    context.setReady(0);
    context.setPlayer(8);
    context.setEnemy(8);
  };

  return (
    <div className="gameover">
      <div className="gameover__block">
        <div className="gameover__text">{win}</div>
        <label className="gameover__sound" htmlFor="volume">
          Звук
        </label>
        <input
          className="gameover__range"
          onChange={(e) =>
            context.setSound(e.target.value as unknown as number)
          }
          value={context.sound}
          type="range"
          id="volume"
          step="0.1"
          max="1.0"
          min="0.0"
        />
        <button className="gameover__button" onClick={() => newGame()}>
          Играть ещё раз.
        </button>
      </div>
    </div>
  );
};
