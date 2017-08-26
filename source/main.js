const {
  requestAnimationFrame: rAF,
  cancelAnimationFrame: cAF,
  addEventListener: on,
  removeEventListener: off,
} = window;

const { PI: π, sin } = Math;
const ππ = 2 * π;

const cvs = document.getElementById('c');
const ctx = cvs.getContext('2d');

const w = (cvs.width = 160);
const h = (cvs.height = 90);

const hw = w / 2;
const hh = h / 2;

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, w, h);

function rect(x, y, s, r = 0) {
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.fillRect(s * -1, s * -2, s * 2, s * 4);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function man(x, y) {
  ctx.fillStyle = 'darkred';
  // rect(x + 1, y - 6, 1);
  rect(x, y, 2);
  rect(x - 3, y + 6, 1);
  rect(x + 3, y + 6, 1);
  rect(x + 1, y + 18, 1);
  rect(x - 2, y + 17, 1, π / 2);
}

man(hw, hh);

function ex(x, y, w, h) {
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

function play(cb) {
  function tick(t) {
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

function getWaveFn(fn, p = 1000, min = -1, max = 1, o = 0) {
  // peak amplitude (not peak-to-peak amplitude)
  // @see https://en.wikipedia.org/wiki/Amplitude
  const amp = (max - min) / 2;

  // radians per period (angular frequency)
  // @see https://en.wikipedia.org/wiki/Angular_frequency
  const rpp = ππ / p;

  return ts => {
    // offset timestamp
    const ots = o + ts;
    return amp * (1 + fn(ots * rpp)) + min;
  };
}

function getSinFn(p = 1000, min = -1, max = 1, o = 0) {
  return getWaveFn(sin, p, min, max, o);
}

const head = getSinFn(2000);

function draw(t, d) {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, w, h);

  man(hw, hh);
  rect(hw + head(t), hh - 6, 1);
}

on('click', () => {
  frameId === 0 ? play(draw) : pause();
});
