const tapes = document.querySelector(`.tapes`),
ctx = tapes.getContext(`2d`);

const btnStart = document.querySelector(`.start`);
const btnStop = document.querySelector(`.stop`);
const btnLine = document.querySelector(`.line`);

const INITIAL_PARAMS = {
  colors: [`#FF0000`, `#FF8D40`, `#FFF55E`, `#66FF42`, `#4DFCFF`, `#1B25FF`, `#AD66FF`, `#FF28B4`, `#FF828D`, `#000000`],
  x: 0,
  y: 0,
  w: 80,
  h: 50,
  counter: 0,
  rows: 4,
  cols: 5
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
      stateObj.y = -60 + 70 * r;
      stateObj.count = countArray[c];
      stateObj.visible = true;
      colParams.push(stateObj);
      countArray[c] += 1;
    }
    params.push(colParams);
  }
  return params;
}

function renderSlot () {
  stateMatrix.forEach((col, i) => {
    col.forEach((it) => {
      ctx.fillStyle = INITIAL_PARAMS.colors[it.count];
      ctx.fillRect((INITIAL_PARAMS.w + 10) * i, it.y, INITIAL_PARAMS.w, INITIAL_PARAMS.h);
      if (it.y >= tapes.height) {
        it.y = -70;
        countArray[i] = (countArray[i] < INITIAL_PARAMS.colors.length - 1) ? (countArray[i] + 1) : 0;
        it.count = countArray[i];
      } else {
        it.y += 1 + i;
      }
    });
  });
  clear = setTimeout(() => ctx.clearRect(0, 0, tapes.width, tapes.height), 1);
  render = setTimeout(() => renderSlot(), 1);
}

function startTape () {
  renderSlot();
  btnStart.classList.remove(`active`);
  btnLine.classList.remove(`active`);
  btnStart.disabled = true;
  btnLine.disabled = true;
  btnStop.disabled = false;
  btnStop.classList.add(`active`);
}

function stopTape () {
  clearTimeout(clear);
  clearTimeout(render);
  btnStart.classList.add(`active`);
  btnLine.classList.add(`active`);
  btnStart.disabled = false;
  btnLine.disabled = false;
  btnStop.disabled = true;
  btnStop.classList.remove(`active`);
}

btnStop.addEventListener(`click`, stopTape);
btnStart.addEventListener(`click`, startTape);
