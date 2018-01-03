const INITIAL_PARAMS = {
  colors: [`#FF0000`, `#FF8D40`, `#FFF55E`, `#66FF42`, `#4DFCFF`, `#1B25FF`, `#AD66FF`, `#FF28B4`, `#FF828D`, `#000000`],
  lineColor: `violet`,
  lineWidth: 5,
  slotWidth: 80,
  slotHeight: 50,
  rows: 4,
  cols: 5,
};

const FIELD_PARAMS = {
  fieldHeight: 210,
  fieldWidth: 450,
  dX: 10,
  dY: 20,
  alignCoords: [-60, 10, 80, 150]
};

const WIN_LINES = [
  {x: [0, 130, 260], y: [35, 35, 35]},
  {x: [90, 220, 350], y: [105, 105, 105]},
  {x: [0, 130, 260], y: [175, 175, 80]},
  {x: [0, 130, 220, 310, 440], y: [175, 175, 175, 175, 175]},
  {x: [0, 130, 220, 310, 440], y: [35, 35, 105, 175, 175]},
  {x: [0, 130, 220, 310, 440], y: [200, 35, 175, 35, 200]}
];

export {INITIAL_PARAMS, FIELD_PARAMS, WIN_LINES};
