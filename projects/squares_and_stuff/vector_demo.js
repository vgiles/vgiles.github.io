function setup() {
  createCanvas(300, 300);
  background(255);
}
function mousePressed() {
var v1 = createVector(40, 50);
var v2 = createVector(40, 50);

ellipse(v1.x, v1.y, 50, 50);
ellipse(v2.x, v2.y, 50, 50);
v1.add(v2);
ellipse(v1.x, v1.y, 50, 50);
}
