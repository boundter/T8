// file: main.js
// date: 25.01.2017
// author: Erik Teichmann eteichma@uni-potsdam.de
// Purpose: Simulate the Brownian motion

var canvas; // Canvas for the simulation.
var ctx; // Context of the canvas for the simulation
var fps = 30; // Frames per second = smallest number of collisons
var particle; // List of particles, to loop over.
var consolidate = 10; // Number of steps to average over for distirbution.
var myChart; // the chart in the plot


// Make a black canvas the size of the whole screen.
function setup() {
  canvas = document.getElementById("simulation");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function draw(part, t, col) {

  // remove old chart before starting a new simulation
  if(myChart) {
    console.log("Destroying old chart");
    myChart.destroy();
  }

  // we want to make one step for every picture.
  var maxSteps = fps*t;
  var steps = 0;

  particle = [];
  for (var i = 0; i < part; i++){
    // Start every particle in a box of length width/2 around the middle.
    particle.push(new randomParticle(canvas.width*0.25 + Math.random()*canvas.width*0.5,
                                     canvas.height*0.25 + Math.random()*canvas.height*0.5));
    particle[i].display();
  }

  setup(); // Clean the canvas.
  var id = setInterval(sim, 1000 / fps); // Repeat the plot.

  // Draws the particle and, if the max time is reached also it's path and the
  // distribution.
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
    // Check, if we have drawn enough pictures.
    if (steps === maxSteps + 1) {
      clearInterval(id);
      var data = [];
      // Plot path and distribution.
      for (var i = 0; i < particle.length; i++) {
        particle[i].path();
      }
     var delta = prepDelta();
     data = data.concat(delta[0]);
      var mean = calcMean(data);
      var vari = calcVariance(data);
      var normal = normalDistribution(mean, vari);
      var histo = buildHistogram(data);
      myChart = plt(histo, normal);
    }
  }


}

// Start the simulation.
function startSimulation() {
  var part = document.getElementById("part").value;
  var t = document.getElementById("t").value;
  var col = document.getElementById("col").value;
  setup();
  draw(part, t, col);
}
