// file: randomParticle.js
// date: 25.01.2017
// author: Erik Teichmann eteichma@uni-potsdam.de
// Purpose: Functions to simulate the Brownian motion

// Object of a particle under the browian motion with the following members:
// x,y Current position.
// r Size of the particle in pixels.
// history List of all previous positions of the particle. history[2*i] = x
//         and history[2*i + 1] = y.
// xOrig,yOrig The start of the particle.
// step(steps) Takes a random step in x- and y-direction for (steps) times.
// display() Plots the current position on the canvas.
// path() Plots all the positions of a particle on the canvas.
function randomParticle(x, y) {


  this.x = x;
  this.y = y;
  this.r = 5;
  this.history = [];
  this.xOrig = x;
  this.yOrig = y;


  this.step = function(steps) {
    // Step with probability of 50% to the right.
    for (var i = 0; i < steps; i++){
      var rand = Math.random();
      if (rand >= 0.5) {
        this.x += 1;
      }
      // Step with probability of 50% to the left.
      else {
        this.x -= 1;
      }
      rand = Math.random();
      // like before, but up and down.
      if (rand >= 0.5) {
        this.y += 1;
      }
      else {
        this.y -= 1;
      }
      this.history.push(this.x, this.y);
    }
  }


  this.display = function() {
    // Plot the particle as a small circle.
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }


  this.path = function() {
    // Plot the path with white lines.
    // Since we want to be able to call it any time we need to move to the
    // original starting position.
    ctx.moveTo(this.xOrig, this.yOrig);
    ctx.strokeStyle="white";
    for (var i = 0; i < this.history.length/2; i++) {
      ctx.lineTo(this.history[2*i], this.history[2*i+1]);
    }
    ctx.stroke();
  }
}
