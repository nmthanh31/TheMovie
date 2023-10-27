export interface typeArrayStat {
  x: string;
  y: number;
}

const initArrayStat = (): typeArrayStat[] => {
  return [
    {x: 'Jan', y: 0},
    {x: 'Feb', y: 0},
    {x: 'Mar', y: 0},
    {x: 'Apr', y: 0},
    {x: 'May', y: 0},
    {x: 'Jun', y: 0},
    {x: 'Jul', y: 0},
    {x: 'Aug', y: 0},
    {x: 'Sep', y: 0},
    {x: 'Oct', y: 0},
    {x: 'Nov', y: 0},
    {x: 'Dev', y: 0},
  ];
};

export interface typeArrayGenres {
  id: string;
  color: string;
  name: string;
  count: number;
}

export {initArrayStat};
