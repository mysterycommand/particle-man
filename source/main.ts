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

const cvs: HTMLCanvasElement = document.getElementById('c') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = cvs.getContext('2d');

const w: number = (cvs.width = 160);
const h: number = (cvs.height = 90);

const hw: number = w / 2;
const hh: number = h / 2;

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, w, h);

let firstTime: number = 0;
let deltaTime: number = 0;

let currTime: number = 0;
let prevTime: number = 0;

let frameId: number = 0;

function play(cb: (ts: number, dt: number) => void): void {
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

function pause(): void {
  cAF(frameId);
  frameId = 0;
}

function draw(ts: number, dt: number): void {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, w, h);
}

on('click', () => {
  frameId === 0 ? play(draw) : pause();
});
