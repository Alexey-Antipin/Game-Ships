import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import { ArrayElement } from "../../ts";
import "./index.scss";

export const Preparation = () => {
  const [ship, setShip] = useState<number>(0);
  const context = useContext(Context);

  const createElements = () => {
    let massive = [];

    for (let i = 0; i < 48; i++) {
      massive.push({
        id: i,
        num: i,
        class: "element-sea",
      });
    }
    context.setElement({ array: massive });
  };

  const clickElement = (el: { id: number }) => {
    let id = el.id;

    if (context.element.array[id].class === "element-ally") {
      context.setElement((state:ArrayElement) => {
        return {
          array: state.array.map((elem) =>
            elem.id === id
              ? {
                  id: id,
                  num: id,
                  class: "element-sea",
                }
              : elem
          ),
        };
      });
      setShip(ship - 1);
      return;
    }

    if (ship < 8) {
      context.setElement((state:ArrayElement) => {
        return {
          array: state.array.map((elem) =>
            elem.id === id
              ? {
                  id: id,
                  num: id,
                  class: "element-ally",
                  disabled: 1,
                }
              : elem
          ),
        };
      });
      setShip(ship + 1);
    }
  };

  useEffect(() => {
    createElements();
  }, []);

  return (
    <div className="preparation">
      <div className="preparation__text">
        Кораблей расставлено: {ship} из 8.
      </div>

      <div className="preparation__container">
        {context.element.array.map((el) => {
          return (
            <button
              className={"preparation__" + el.class}
              key={el.id}
              onClick={() => clickElement(el)}>
              {el.num}
            </button>
          );
        })}
      </div>
      
      <button
        className="preparation__button"
        disabled={ship !== 8}
        onClick={() => context.setReady(1)}>
        Готов!
      </button>
    </div>
  );
};
