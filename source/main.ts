import './main.scss';

const { NODE_ENV } = process.env;

const {
  requestAnimationFrame: rAF,
  cancelAnimationFrame: cAF,
  addEventListener: on,
  removeEventListener: off,
} = window;

const { PI: π, sin } = Math;
const ππ = 2 * π;

const cvs = document.getElementById('c') as HTMLCanvasElement;
const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;

const w = (cvs.width = 160);
const h = (cvs.height = 90);

const hw = w / 2;
const hh = h / 2;

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, w, h);

let firstTime = 0,
  deltaTime = 0,
  currTime = 0,
  prevTime = 0,
  frameId = 0;

function play(cb: Function) {
  function tick(t: number) {
    if (!firstTime) {
      firstTime = t;
      prevTime = t - firstTime;
    }

    currTime = t - firstTime;
    deltaTime = currTime - prevTime;

    cb(currTime, deltaTime);

    prevTime = currTime;
    frameId = rAF(tick);
  }

  frameId = rAF(tick);
}

function pause() {
  cAF(frameId);
  frameId = 0;
}

function draw(ts: number, dt: number) {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, w, h);
}

on('click', () => {
  frameId === 0 ? play(draw) : pause();
});
