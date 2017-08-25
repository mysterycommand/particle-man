const cvs = document.getElementById('c');
const ctx = cvs.getContext('2d');

const w = (cvs.width = 160);
const h = (cvs.height = 90);

ctx.imageSmoothingEnabled = false;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, w, h);

ctx.fillStyle = 'darkred';
ctx.fillRect(w / 2 - 0, h / 2 - 8, 2, 4);
ctx.fillRect(w / 2 - 2, h / 2 - 4, 4, 8);
ctx.fillRect(w / 2 - 4, h / 2 + 4, 2, 4);
ctx.fillRect(w / 2 + 2, h / 2 + 4, 2, 4);
ctx.fillRect(w / 2 - 0, h / 2 + 16, 2, 4);
ctx.fillRect(w / 2 - 4, h / 2 + 16, 4, 2);

// ctx.lineWidth = 1;
// ctx.strokeStyle = 'white';
// ctx.moveTo(0, 0);
// ctx.lineTo(w, h);
// ctx.moveTo(w, 0);
// ctx.lineTo(0, h);
// ctx.stroke();
