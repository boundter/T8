var c;
var ctx;
var fps = 30;
var particle;
var consolidate = 10;



function setup() {
  canvas = document.getElementById("simulation");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function draw(part, t, col) {


  var maxSteps = fps*t;
  var steps = 0;

  particle = [];
  for (var i = 0; i < part; i++){
    particle.push(new randomParticle(Math.random()*canvas.width*0.8,
                                     Math.random()*canvas.height*0.8));
    particle[i].display();
  }

  setup();
  var id = setInterval(sim, 1000 / fps);


  function sim() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fill();
    for (var i = 0; i < particle.length; i++) {
      particle[i].step(col);
      particle[i].display();
    }
    steps += 1;
    if (steps === maxSteps) {
      clearInterval(id);
      for (var i = 0; i < particle.length; i++) {
        particle[i].path();
        var delta = prepDelta();
        var mean = calcMean(delta[0]);
        var vari = calcVariance(delta[0]);
        var normal = normalDistribution(mean, vari);
        var histo = buildHistogram(delta[0]);
        console.log(delta);
        console.log(histo);
        plt(histo, normal);
      }
    }
  }


}


function startSimulation() {
  var part = document.getElementById("part").value;
  var t = document.getElementById("t").value;
  var col = document.getElementById("col").value;
  setup();
  draw(part, t, col);
}
