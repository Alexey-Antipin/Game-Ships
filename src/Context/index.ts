import { createContext } from "react";
import { ArrayElement } from "../ts";

type TodoContext = {
  ready: number;
  setReady: (value: number) => void;
  element: ArrayElement;
  setElement: (value: any) => void;
  player: number;
  setPlayer: (value: number) => void;
  enemy: number;
  setEnemy: (value: number) => void;
  sound: number;
  setSound: (value: number) => void;
};

export const Context = createContext<TodoContext>({} as TodoContext);
