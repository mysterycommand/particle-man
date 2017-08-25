const { PI: π } = Math;

const cvs = document.getElementById('c');
const ctx = cvs.getContext('2d');

const w = (cvs.width = 160);
const h = (cvs.height = 90);

const hw = w / 2;
const hh = h / 2;

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, w, h);

ctx.fillStyle = 'darkred';

function rect(x, y, s, r = 0) {
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.fillRect(s * -1, s * -2, s * 2, s * 4);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function man(x, y) {
  rect(x + 1, y - 6, 1);
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
