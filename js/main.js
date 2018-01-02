const tapes = document.querySelector(`.tapes`),
ctx = tapes.getContext(`2d`);

const btnStart = document.querySelector(`.start`);
const btnStop = document.querySelector(`.stop`);
const btnLine = document.querySelector(`.line`);

const INITIAL_PARAMS = {
  colors: [`#FF0000`, `#FF8D40`, `#FFF55E`, `#66FF42`, `#4DFCFF`, `#1B25FF`, `#AD66FF`, `#FF28B4`, `#FF828D`, `#000000`],
  w: 80,
  h: 50,
  counter: 0,
  rows: 4,
  cols: 5,
};

const FIELD_PARAMS = {
  dX: 10,
  dY: 20,
  initY: -70,
  alignCoords: [-60, 10, 80, 150]
};

let render;
let clear;
let countArray = [0, 0, 0, 0, 0];
let stateMatrix = getStateMatrix();

function getStateMatrix () {
  let params = [];
  for (let c = 0; c < INITIAL_PARAMS.cols; c++) {
    let colParams = [];
    for (let r = 0; r < INITIAL_PARAMS.rows; r++) {
      let stateObj = {};
      stateObj.y = -60 + (INITIAL_PARAMS.h + FIELD_PARAMS.dY) * r;
      stateObj.count = countArray[c];
      stateObj.visible = true;
      colParams.push(stateObj);
      countArray[c] += 1;
    }
    params.push(colParams);
  }
  return params;
}

function initRender () {
  stateMatrix.forEach((col, i) => {
    col.forEach((it) => {
      ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
      ctx.fillRect((INITIAL_PARAMS.w + FIELD_PARAMS.dX) * i, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
    });
  });
}

function renderSlot () {
  stateMatrix.forEach((col, i) => {
    col.forEach((it) => {
      if (it.y >= tapes.height) {
        const minY = col.map((slot) => slot.y).sort((a, b) => a - b);
        it.y = minY[0] - FIELD_PARAMS.dY - INITIAL_PARAMS.h;
        countArray[i] = (countArray[i] < INITIAL_PARAMS.colors.length - 1) ? (countArray[i] + 1) : 0;
        it.count = countArray[i];
      } else {
        it.y += 2 + i;
      }
      ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
      ctx.fillRect((INITIAL_PARAMS.w + FIELD_PARAMS.dX) * i, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
    });
    col.sort((a, b) => a.y - b.y);
  });
  clear = setTimeout(() => ctx.clearRect(0, 0, tapes.width, tapes.height), 1);
  render = setTimeout(() => renderSlot(), 1);
}

function alignSlot () {
  let colCounter =0;
  let i = 0;
  for (i; i < stateMatrix.length; i++) {
    if (stateMatrix[i].every((it) => FIELD_PARAMS.alignCoords.indexOf(it.y) !== -1)) {
      colCounter += 1;
      stateMatrix[i].forEach((it) => {
        ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
        ctx.fillRect((INITIAL_PARAMS.w + FIELD_PARAMS.dX) * i, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
      });
    } else {
      let slotCounter = 0;
      stateMatrix[i].forEach((it) => {
        if (FIELD_PARAMS.alignCoords.indexOf(it.y) === -1) {
          if (it.y >= tapes.height) {
            const minY = stateMatrix[i].map((slot) => slot.y).sort((a, b) => a - b);
            it.y = minY[0] - FIELD_PARAMS.dY - INITIAL_PARAMS.h;
            countArray[i] = (countArray[i] < INITIAL_PARAMS.colors.length - 1) ? (countArray[i] + 1) : 0;
            it.count = countArray[i];
          } else {
            it.y += 1;
          }
        } else {
          slotCounter += 1;
        }
        ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
        ctx.fillRect((INITIAL_PARAMS.w + FIELD_PARAMS.dX) * i, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
      });
      if (slotCounter >= INITIAL_PARAMS.rows) {
        colCounter += 1;
      }
      break;
    }
  }
  for (let j = i + 1; j < stateMatrix.length; j++) {
      stateMatrix[j].forEach((it) => {
        if (it.y >= tapes.height) {
          const minY = stateMatrix[j].map((slot) => slot.y).sort((a, b) => a - b);
          it.y = minY[0] - FIELD_PARAMS.dY - INITIAL_PARAMS.h;
          countArray[j] = (countArray[j] < INITIAL_PARAMS.colors.length - 1) ? (countArray[j] + 1) : 0;
          it.count = countArray[j];
        } else {
          it.y += 2 + j;
        }
        ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
        ctx.fillRect((INITIAL_PARAMS.w + FIELD_PARAMS.dX) * j, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
      });
      stateMatrix[j].sort((a, b) => a.y - b.y);
  }
  if (colCounter < INITIAL_PARAMS.cols) {
    clear = setTimeout(() => ctx.clearRect(0, 0, tapes.width, tapes.height), 1);
    render = setTimeout(() => alignSlot(), 1);
  }
}

function startPlay () {
  renderSlot();
  btnStart.classList.remove(`active`);
  btnLine.classList.remove(`active`);
  btnStart.disabled = true;
  btnLine.disabled = true;
  btnStop.disabled = false;
  btnStop.classList.add(`active`);
}

function stopPlay () {
  clearTimeout(clear);
  clearTimeout(render);
  alignSlot();
  btnStart.classList.add(`active`);
  btnLine.classList.add(`active`);
  btnStart.disabled = false;
  btnLine.disabled = false;
  btnStop.disabled = true;
  btnStop.classList.remove(`active`);
}

initRender();
btnStop.addEventListener(`click`, stopPlay);
btnStart.addEventListener(`click`, startPlay);
