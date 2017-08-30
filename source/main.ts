import Vector, { IVector } from './lib/vector';
import Particle, { IParticle } from './lib/particle';
import Field, { IField } from './lib/field';

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
const ctx: CanvasRenderingContext2D = cvs.getContext('2d') as CanvasRenderingContext2D;

const w: number = (cvs.width = 160);
const h: number = (cvs.height = 90);

const hw: number = w / 2;
const hh: number = h / 2;

const field: IField = new Field();

ctx.imageSmoothingEnabled = false;

let firstTime: number = 0;
let deltaTime: number = 0;

let currTime: number = 0;
let prevTime: number = 0;

let frameId: number = 0;

const cellSize: number = 10;
const halfCellSize: number = cellSize / 2;

function init(): void {
  let col: number = 0;
  let row: number = 0;

  while (row < h / cellSize - 1) {
    field.particles.push(
      new Particle({
        pos: new Vector({
          x: halfCellSize + col * cellSize,
          y: halfCellSize + row * cellSize,
        }),
      }),
    );

    col += 1;
    if (col > w / cellSize - 1) {
      col = 0;
      row += 1;
    }
  }

  draw();
}

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

function draw(ts: number = 0, dt: number = 0): void {
  ctx.clearRect(0, 0, w, h);

  field.particles.forEach(({ pos: { x, y } }) => {
    ctx.fillStyle = `hsl(${x / w * 360},${(1 - y / h) * 100}%,50%)`;
    ctx.fillRect(x - 4.5, y - 4.5, 9, 9);
  });
}

// play(draw);
init();

on('click', () => {
  // frameId === 0 ? play(draw) : pause();
  // console.log(JSON.stringify(field, null, 2));
});
