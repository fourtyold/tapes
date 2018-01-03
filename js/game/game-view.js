const main = document.querySelector(`.main`);

export default class GameView {

  constructor(model) {
    this.model = model;
    this.ctx = null;
  }

  get template() {
    return `<canvas height='${this.model.data.FIELD_PARAMS.fieldHeight}' width='${this.model.data.FIELD_PARAMS.fieldWidth}' class="tapes"></canvas>
  <div class="btn-container">
    <button type="button" class="btn active line">Line</button>
    <button type="button" class="btn active start">Start</button>
    <button type="button" class="btn stop" disabled>Stop</button>
  </div>
    `;
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return GameView.getElementFromTemplate(this.template.trim());
  }

  showGame() {
    main.appendChild(this.element);
    this.renderSlots();
  }

  bind() {
    const btnStart = this.element.querySelector(`.start`);
    const btnStop = this.element.querySelector(`.stop`);
    const btnLine = this.element.querySelector(`.line`);
    const tapes = this.element.querySelector(`.tapes`);
    this.ctx = tapes.getContext(`2d`);
    btnStart.addEventListener(`click`, () => this.startPlay(btnStart, btnStop, btnLine));
    btnStop.addEventListener(`click`, () => {
      this.delTimeout();
      this.stopPlay(btnStart, btnStop, btnLine);
    });
    btnLine.addEventListener(`click`, () => this.renderLine());
  }

  //ОТРИСОВКА ВСЕГО ПОЛЯ
  renderSlots() {
    this.model.stateMatrix.forEach((col, i) => {
      col.forEach((it) => {
        this.ctx.fillStyle = this.model.data.INITIAL_PARAMS.colors[it.count];
        this.ctx.fillRect((this.model.data.INITIAL_PARAMS.slotWidth + this.model.data.FIELD_PARAMS.dX) * i, it.y, this.model.data.INITIAL_PARAMS.slotWidth, this.model.data.INITIAL_PARAMS.slotHeight);
      });
    });
  }

  //ОТРИСОВКА ОДНОГО КВАДРАТА
  //ИСПОЛЬЗУЕТСЯ ПРИ ОСТАНОВКЕ ВРАЩЕНИЯ
  renderOneSlot(it, i) {
    this.ctx.fillStyle = this.model.data.INITIAL_PARAMS.colors[it.count];
    this.ctx.fillRect((this.model.data.INITIAL_PARAMS.slotWidth + this.model.data.FIELD_PARAMS.dX) * i, it.y, this.model.data.INITIAL_PARAMS.slotWidth, this.model.data.INITIAL_PARAMS.slotHeight);
  }

  //ОТРИСОВКА ВЫИГРЫШНОЙ ЛИНИИ
  renderLine() {
    this.ctx.clearRect(0, 0, this.model.data.FIELD_PARAMS.fieldWidth, this.model.data.FIELD_PARAMS.fieldHeight);
    this.renderSlots();
    this.ctx.beginPath();
    this.ctx.lineWidth = this.model.data.INITIAL_PARAMS.lineWidth;
    this.ctx.strokeStyle = this.model.data.INITIAL_PARAMS.lineColor;
    this.ctx.moveTo(this.model.data.WIN_LINES[this.model.lineCounter].x[0], this.model.data.WIN_LINES[this.model.lineCounter].y[0]);
    for (let i = 1; i < this.model.data.WIN_LINES[this.model.lineCounter].x.length; i++) {
      this.ctx.lineTo(this.model.data.WIN_LINES[this.model.lineCounter].x[i], this.model.data.WIN_LINES[this.model.lineCounter].y[i]);
    }
    this.ctx.stroke();
    this.model.lineCounter = (this.model.lineCounter < this.model.data.WIN_LINES.length - 1) ? this.model.lineCounter + 1 : 0;
  }

  startPlay() {}
  stopPlay() {}
  delTimeout() {}

  static setActive(elem) {
    elem.classList.toggle(`active`);
    elem.disabled = !elem.classList.contains(`active`);
  }

  static getElementFromTemplate(str) {
    let div = document.createElement(`div`);
    div.classList.add(`container`);
    div.appendChild(document.createRange().createContextualFragment(str));
    return div;
  }
}
