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

function rect(x: number, y: number, s: number = 1, r: number = 0) {
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.fillRect(s * -1, s * -2, s * 2, s * 4);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function man(x: number, y: number) {
  ctx.fillStyle = 'darkred';
  // rect(x + 1, y - 6, 1);
  rect(x, y, 2);
  rect(x - 3, y + 6, 1);
  rect(x + 3, y + 6, 1);
  rect(x + 1, y + 18, 1);
  rect(x - 2, y + 17, 1, π / 2);
}

man(hw, hh);

function ex(x: number, y: number, w: number, h: number) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.moveTo(x, y);
  ctx.lineTo(w, h);
  ctx.moveTo(w, y);
  ctx.lineTo(x, h);
  ctx.stroke();
}

// ex(0, 0, w, h);

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

function getWaveFn(fn: Function, p = 1000, min = -1, max = 1, o = 0) {
  // peak amplitude (not peak-to-peak amplitude)
  // @see https://en.wikipedia.org/wiki/Amplitude
  const amp = (max - min) / 2;

  // radians per period (angular frequency)
  // @see https://en.wikipedia.org/wiki/Angular_frequency
  const rpp = ππ / p;

  return (ts: number) => {
    // offset timestamp
    const ots = o + ts;
    return amp * (1 + fn(ots * rpp)) + min;
  };
}

function getSinFn(p: number = 1000, min: number = -1, max: number = 1, o: number = 0) {
  return getWaveFn(sin, p, min, max, o);
}

const head = getSinFn(2000);

function draw(ts: number, dt: number) {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, w, h);

  man(hw, hh);
  rect(hw + head(ts), hh - 6, 1);
}

// function ik() {
//   let angle, theta1, theta2, targetSqrDist;

//   // target position
//   const ix = pointer.x - origin.x;
//   const iy = pointer.y - origin.y;

//   // target square distance
//   targetSqrDist = ix * ix + iy * iy;

//   // first segment
//   angle = Math.max(
//     -1,
//     Math.min(
//       1,
//       (targetSqrDist + segment1.len2 - segment2.len2) /
//         (2 * segment1.len * Math.sqrt(targetSqrDist)),
//     ),
//   );

//   theta1 = Math.atan2(iy, ix) - Math.acos(angle);

//   segment1.x = origin.x + segment1.len * Math.cos(theta1);
//   segment1.y = origin.y + segment1.len * Math.sin(theta1);

//   // second segment
//   angle = Math.max(
//     -1,
//     Math.min(
//       1,
//       (targetSqrDist - segment1.len2 - segment2.len2) / (2 * segment1.len * segment2.len),
//     ),
//   );

//   theta2 = Math.acos(angle);

//   segment2.x = segment1.x + segment2.len * Math.cos(theta2 + theta1);
//   segment2.y = segment1.y + segment2.len * Math.sin(theta2 + theta1);

//   // draw
//   line(origin.x, origin.y, segment1.x, segment1.y, 'navy', 8, 1, 0);
//   line(segment1.x, segment1.y, segment2.x, segment2.y, 'gray', 8, 1, 0);
//   line(origin.x, origin.y, pointer.x, pointer.y, 'red', 4, 2, 2);
// }

on('click', () => {
  frameId === 0 ? play(draw) : pause();
});
