function randomParticle(x, y) {


  this.x = x;
  this.y = y;
  this.r = 5;
  this.history = [];
  this.xOrig = x;
  this.yOrig = y;


  this.step = function(steps) {
    for (var i = 0; i < steps; i++){
      var rand = Math.random();
      if (rand >= 0.5) {
        this.x += 1;
      }
      else {
        this.x -= 1;
      }
      rand = Math.random();
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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }


  this.path = function() {
    ctx.moveTo(this.xOrig, this.yOrig);
    ctx.strokeStyle="white";
    for (var i = 0; i < this.history.length/2; i++) {
      ctx.lineTo(this.history[2*i], this.history[2*i+1]);
    }
    ctx.stroke();
  }
}
