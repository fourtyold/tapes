import GameView from './game-view.js';

export default class Game {
  constructor() {
    this.view = new GameView();
  }

  init() {
    this.view.showGame();
  }
}
