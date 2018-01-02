const body = document.querySelector(`.body`);

export default class GameView {

  get template() {
    return `<canvas height='210' width='450' class="tapes"></canvas>
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
    return this.getElementFromTemplate(this.template.trim());
  }

  showGame() {
    body.appendChild(this.element);
  }

  bind() {

  }

  static getElementFromTemplate(str) {
    let div = document.createElement(`div`);
    div.appendChild(document.createRange().createContextualFragment(str));
    return div;
  }
}
