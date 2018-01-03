
export default class GameModel {

  constructor(gameData) {
    this.data = gameData;
    this.countArray = [0, 0, 0, 0, 0];
    this.lineCounter = 0;
    this.stateMatrix = GameModel.getStateMatrix(this.data.INITIAL_PARAMS, this.data.FIELD_PARAMS, this.countArray);
  }

  calcState() {
    this.stateMatrix.forEach((col, i) => {
      col.forEach((it) => {
        if (it.y >= this.data.FIELD_PARAMS.fieldHeight) {
          const minY = col.map((slot) => slot.y).sort((a, b) => a - b);
          it.y = minY[0] - this.data.FIELD_PARAMS.dY - this.data.INITIAL_PARAMS.slotHeight;
          this.countArray[i] = (this.countArray[i] < this.data.INITIAL_PARAMS.colors.length - 1) ? (this.countArray[i] + 1) : 0;
          it.count = this.countArray[i];
        } else {
          it.y += 2 + i;
        }
      });
      col.sort((a, b) => a.y - b.y);
    });
  }

  calcSlotState(it, i, rotationSpeed) {
    if (it.y >= this.data.FIELD_PARAMS.fieldHeight) {
      const minY = this.stateMatrix[i].map((slot) => slot.y).sort((a, b) => a - b);
      it.y = minY[0] - this.data.FIELD_PARAMS.dY - this.data.INITIAL_PARAMS.slotHeight;
      this.countArray[i] = (this.countArray[i] < this.data.INITIAL_PARAMS.colors.length - 1) ? (this.countArray[i] + 1) : 0;
      it.count = this.countArray[i];
    } else {
      it.y += rotationSpeed;
    }
  }

  static getStateMatrix(initParams, fieldParams, countArray) {
    let params = [];
    for (let c = 0; c < initParams.cols; c++) {
      let colParams = [];
      for (let r = 0; r < initParams.rows; r++) {
        let stateObj = {};
        stateObj.y = -60 + (initParams.slotHeight + fieldParams.dY) * r;
        stateObj.count = countArray[c];
        colParams.push(stateObj);
        countArray[c] += 1;
      }
      params.push(colParams);
    }
    return params;
  }
}
