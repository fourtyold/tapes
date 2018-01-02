import Game from './game/game.js';
import {INITIAL_PARAMS, FIELD_PARAMS} from './data.js';

const gameData = {
  INITIAL_PARAMS,
  FIELD_PARAMS
};

const game = new Game(gameData);
game.init();
