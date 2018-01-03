
export default class GameModel {

  //countArray - ВЕКТОР СОСТОЯНИЯ ЦВЕТА КВАДРАТА
  //lineCounter - СЧЕТЧИК СОСТОЯНИЯ ВЫИГРЫШНОЙ ЛИНИИ
  //stateMatrix - МАТРИЦА СОСТОЯНИЯ ПОЛЯ
  constructor(gameData) {
    this.data = gameData;
    this.countArray = [0, 0, 0, 0, 0];
    this.lineCounter = 0;
    this.stateMatrix = GameModel.getStateMatrix(this.data.INITIAL_PARAMS, this.data.FIELD_PARAMS, this.countArray);
  }

  //ПЕРЕСЧЕТ МАТРИЦЫ СОСТОЯНИЯ ПРИ ВРАЩЕНИИ ЛЕНТ
  //2 + i - СКОРОСТЬ ВРАЩЕНИЯ ЛЕНТЫ
  //count - ОПРЕДЕЛЯЕТ ЦВЕТ КВАДРАТА
  //minY - РАСЧИТЫВАЕТСЯ ДЛЯ ОПРЕДЕЛЕНИЯ КООРДИНАТЫ, НА КОТОРУЮ ПЕРЕНОСИТСЯ КВАДРАТ, ВЫШЕДШИЙ ЗА ПРЕДЕЛЫ ПОЛЯ
  //y - КООРДИНАТА ОТРИСОВКИ КВАДРАТА
  //ВЕКТОР МАТРИЦЫ СОСТОЯНИЯ СОРТИРУЕТСЯ, ЧТОБЫ НИЖНИЙ КВАДРАТ ПЕРЕСЧИТЫВАЛСЯ ПОСЛЕДНИМ. ИНАЧЕ РАССТОЯНИЯ МЕЖДУ КВАДРАТАМИ СБИВАЮТСЯ
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

  //ПЕРЕСЧЕТ ПАРАМЕТРОВ ОДНОГО КВАДРАТА
  //ИСПОЛЬЗУЕТСЯ ПРИ ОСТАНОВКЕ ВРАЩЕНИЯ
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

  //СОЗДАНИЕ НАЧАЛЬНОЙ МАТРИЦЫ СОСТОЯНИЯ ПОЛЯ
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
