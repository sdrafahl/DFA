window.onload = function() {
  drawArrow(0, 10, 50, 10);
}

function displayDFA() {

}

function printCircle(x, y) {
  c = document.getElementById("canvas");
  console.log(c)
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(x,y,40,0,2*Math.PI);
  ctx.stroke();
}

function drawArrow(x1, y1, x2, y2, size) {
  var angle = Math.atan2((y2 - y1) , (x2 - x1));
  var hyp = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.save();
  ctx.translate(x1, y1);
  ctx.rotate(angle);

  // line
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(hyp - size, 0);
  ctx.stroke();

  // triangle
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.lineTo(hyp - size, size);
  ctx.lineTo(hyp, 0);
  ctx.lineTo(hyp - size, -size);
  ctx.fill();

  ctx.restore();
}
