import GameView from './game-view.js';
import GameModel from './game-model.js';

export default class Game {
  constructor(gameData) {
    this.model = new GameModel(gameData);
    this.view = new GameView(this.model);
  }

  bind() {
    this.view.startPlay = (btnStart, btnStop, btnLine) => this.startPlay(btnStart, btnStop, btnLine);
    this.view.stopPlay = (btnStart, btnStop, btnLine) => this.stopPlay(btnStart, btnStop, btnLine);
    this.view.delTimeout = () => this.delTimeout();
  }

  init() {
    this.bind();
    this.view.showGame();
  }

  rotateTapes() {
    this.model.calcState();
    this.view.renderSlots();
    this.clearScr = setTimeout(() => this.view.ctx.clearRect(0, 0, this.model.data.FIELD_PARAMS.fieldWidth, this.model.data.FIELD_PARAMS.fieldHeight), 1);
    this.render = setTimeout(() => this.rotateTapes(), 1);
  }

  startPlay(btnStart, btnStop, btnLine) {
    this.rotateTapes();
    this.stopTimer = setTimeout(() => this.stopPlay(btnStart, btnStop, btnLine), 4000);
    GameView.setActive(btnStart);
    GameView.setActive(btnStop);
    GameView.setActive(btnLine);
  }

  stopPlay(btnStart, btnStop, btnLine) {
    clearTimeout(this.clearScr);
    clearTimeout(this.render);
    this.alignSlot(btnStart, btnLine);
    GameView.setActive(btnStop);
  }

  delTimeout() {
    clearTimeout(this.stopTimer);
  }

  //ВЫРАВНИВАНИЕ КВАДРАТОВ ПРИ ОСТАНОВКЕ
  //colCounter - СЧЕТЧИК ОСТАНОВЛЕННЫХ ЛЕНТ
  //slotCounter - СЧЕТЧИК ВЫРОВНЕННЫХ КВАДРАТОВ В ОДНОЙ ЛЕНТЕ
  alignSlot(btnStart, btnLine) {
    let colCounter = 0;
    let i = 0;

    for (i; i < this.model.stateMatrix.length; i++) {
      if (this.model.stateMatrix[i].every((it) => this.model.data.FIELD_PARAMS.alignCoords.indexOf(it.y) !== -1)) {
        colCounter += 1;
        this.model.stateMatrix[i].forEach((it) => {
          this.view.renderOneSlot(it, i)
        });
      } else {
        let slotCounter = 0;
        this.model.stateMatrix[i].forEach((it) => {
          if (this.model.data.FIELD_PARAMS.alignCoords.indexOf(it.y) === -1) {
            this.model.calcSlotState(it, i, 1);
          } else {
            slotCounter += 1;
          }
          this.view.renderOneSlot(it, i);
        });
        if (slotCounter >= this.model.data.INITIAL_PARAMS.rows) {
          colCounter += 1;
        }
        break;
      }
    }

    for (let j = i + 1; j < this.model.stateMatrix.length; j++) {
      this.model.stateMatrix[j].forEach((it) => {
        this.model.calcSlotState(it, j, 2 + j);
        this.view.renderOneSlot(it, j);
      });
      this.model.stateMatrix[j].sort((a, b) => a.y - b.y);
    }
    if (colCounter < this.model.data.INITIAL_PARAMS.cols) {
      this.clearScr = setTimeout(() => this.view.ctx.clearRect(0, 0, this.model.data.FIELD_PARAMS.fieldWidth, this.model.data.FIELD_PARAMS.fieldHeight), 1);
      this.render = setTimeout(() => this.alignSlot(btnStart, btnLine), 1);
    } else {
      GameView.setActive(btnStart);
      GameView.setActive(btnLine);
    }
  }

}
