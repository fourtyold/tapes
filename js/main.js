import Game from './game/game.js';
import {INITIAL_PARAMS, FIELD_PARAMS, WIN_LINES} from './data.js';

const gameData = {
  INITIAL_PARAMS,
  FIELD_PARAMS,
  WIN_LINES
};

const game = new Game(gameData);
game.init();
