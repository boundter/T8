function randomParticle(pos) {

  this.pos = createVector(pos.x, pos.y);
  this.history = [];


  this.step = function(steps) {
    for (var i = 0; i < steps; i ++){
      var rand = Math.random();
      if (rand >= 0.5 ) {
        this.pos.x += 1;
      }
      else {
        this.pos.x -= 1;
      }
      rand = Math.random();
      if (rand >= 0.5 ) {
        this.pos.y += 1;
      }
      else {
        this.pos.y -= 1;
      }
    }
  }


  this.display = function() {
    stroke(255);
    fill(255);
    ellipse(this.pos.x, this.pos.y, 10, 10);
    for (var i = 0; i < this.history.length - 1; i++) {
      strokeWeight(0.25);
      line(this.history[i].x, this.history[i].y, this.history[i+1].x, this.history[i+1].y);
    };
    this.history.push(this.pos.copy());
  }

}
