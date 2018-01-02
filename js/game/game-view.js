const body = document.querySelector(`.body`);

export default class GameView {

  constructor(model) {
    this.model = model;
    this.ctx = null;
  }

  get template() {
    return `<canvas height='${this.model.data.FIELD_PARAMS.fieldHeight}' width='${this.model.data.FIELD_PARAMS.fieldWidth}' class="tapes"></canvas>
  <div class="container">
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
    body.appendChild(this.element);
    this.initRender();
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
  }

  initRender () {
    this.model.stateMatrix.forEach((col, i) => {
      col.forEach((it) => {
        this.ctx.fillStyle = this.model.data.INITIAL_PARAMS.colors[it.count];
        this.ctx.fillRect((this.model.data.INITIAL_PARAMS.slotWidth + this.model.data.FIELD_PARAMS.dX) * i, it.y, this.model.data.INITIAL_PARAMS.slotWidth, this.model.data.INITIAL_PARAMS.slotHeight);
      });
    });
  }

  renderSlots() {
    this.model.stateMatrix.forEach((col, i) => {
      col.forEach((it) => {
        this.ctx.fillStyle = this.model.data.INITIAL_PARAMS.colors[it.count];
        this.ctx.fillRect((this.model.data.INITIAL_PARAMS.slotWidth + this.model.data.FIELD_PARAMS.dX) * i, it.y, this.model.data.INITIAL_PARAMS.slotWidth, this.model.data.INITIAL_PARAMS.slotHeight);
      });
    });
  }

  renderOneSlot(it, i) {
    this.ctx.fillStyle = this.model.data.INITIAL_PARAMS.colors[it.count];
    this.ctx.fillRect((this.model.data.INITIAL_PARAMS.slotWidth + this.model.data.FIELD_PARAMS.dX) * i, it.y, this.model.data.INITIAL_PARAMS.slotWidth, this.model.data.INITIAL_PARAMS.slotHeight);
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
    div.appendChild(document.createRange().createContextualFragment(str));
    return div;
  }
}
