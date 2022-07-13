import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import fire from "../../Audio/fire.mp3";
import "./index.scss";

export const Game = () => {
  const context = useContext(Context);

  useEffect(() => {
    createWarShips();
  }, []);

  const createWarShips = () => {
    let i = 0;
    let massive = { ...context.element };

    while (i < 8) {
      let randNumber = Math.floor(Math.random() * 47);
      if (
        massive.array[randNumber].class !== "element-enemy" &&
        massive.array[randNumber].class !== "element-ally"
      ) {
        massive.array.splice(randNumber, 1, {
          id: randNumber,
          num: randNumber,
          class: "element-enemy",
        });
        i++;
      }
      continue;
    }
    context.setElement(massive);
  };

  const clickField = (el) => {
    let id = el.id;

    let audio = new Audio(fire);
    audio.volume = context.sound
    audio.play();

    if (context.element.array[id].class === "element-enemy") {
      context.setElement((state) => {
        return {
          array: state.array.map((elem) =>
            elem.id === id
              ? {
                  id: id,
                  num: id,
                  class: "element-hit-enemy",
                  disabled: 1,
                }
              : elem
          ),
        };
      });
      context.setEnemy(context.enemy - 1);
    } else {
      context.setElement((state) => {
        return {
          array: state.array.map((elem) =>
            elem.id === id
              ? {
                  id: id,
                  num: id,
                  class: "element-past",
                  disabled: 1,
                }
              : elem
          ),
        };
      });
    }
    logicEnemy(id);
  };

  const logicEnemy = (id) => {
    let randNumber;
    while (true) {
      let num = Math.round(Math.random() * 47);
      if (
        (id !== num &&
          context.element.array[num].class === "element-ally") ||
        (id !== num &&
          context.element.array[num].class === "element-sea")
      ) {
        randNumber = num;
        break;
      }
      continue;
    }

    if (context.element.array[randNumber].class === "element-ally") {
      context.setElement((state) => {
        return {
          array: state.array.map((elem) =>
            elem.id === randNumber
              ? {
                  id: randNumber,
                  num: randNumber,
                  class: "element-hit-ally",
                  disabled: 1,
                }
              : elem
          ),
        };
      });
      context.setPlayer(context.player - 1);
      return;
    } else {
      context.setElement((state) => {
        return {
          array: state.array.map((elem) =>
            elem.id === randNumber
              ? {
                  id: randNumber,
                  num: randNumber,
                  class: "element-past",
                  disabled: 1,
                }
              : elem
          ),
        };
      });
    }
  };

  return (
    <div className="game">
      <div className="game__block">
        <div className="game__block-player">
          Player:{context.player}
        </div>
        <div className="game__block-enemy">Enemy:{context.enemy}</div>
      </div>
      <div className="game__container">
        {context.element.array.map((el) => {
          return (
            <button
              className={"game__" + el.class}
              key={el.id}
              onClick={() => clickField(el)}
              disabled={el.disabled}>
              {el.num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
