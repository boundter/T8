var particle;
var stepsFrame = 5;

function setup() {
  createCanvas(500, 500);
  background(0);
  var pos = createVector(width/2, height/2)
  particle = new randomParticle(pos);
  frameRate(30);
}


function draw() {
  background(0);
  particle.step(stepsFrame);
  particle.display();
}
