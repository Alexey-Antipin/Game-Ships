export type ArrayElement = {
  array: Fields[];
};

type Fields = {
  id: number;
  disabled?: boolean;
  class: string;
  num: number;
};
