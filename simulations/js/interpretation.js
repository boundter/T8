// Sum all the elements in an array
function sumArray(data) {

  var sum = 0;

  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }

  return sum;
}


// Returns the steplength between a given number (consolidate) of collisions.
// There seems to be a small bug, where we sometimes get steps for an edge-case.
function prepDelta() {

  var delta = [[], []];
  var data = [[], []];

  for (var i = 0; i < particle.length; i++) {
    for (var j = 0; j < particle[i].history.length / 2 - 1; j++) {
      var diffX = particle[i].history[2 * (j + 1)] - particle[i].history[2 * j];
      var diffY = particle[i].history[2 * (j + 1) + 1] -
                  particle[i].history[2 * j + 1];
      delta[0].push(diffX);
      delta[1].push(diffY);
    }
  }

  // delta is an array of single steps, but we want to sum over a given number
  // of steps.
  var len = delta[0].length;

  for (var i = 0; i < len / consolidate; i++){
    var dat = sumArray(delta[0].slice(0, consolidate));
    data[0].push(dat);
    var dat = sumArray(delta[1].slice(0, consolidate));
    data[1].push(dat);
    delta[0].splice(0, consolidate);
    delta[1].splice(0, consolidate);
  }

  return data;
}


// Builds a histogram of all the delta. We can build the x-range easily, since
// all deltas are integers.
function buildHistogram(delta) {

  var data = [[], []];

  for (var i = 0; i < 2*consolidate + 1; i++) {
    data[0].push(-consolidate + i);
    data[1].push(0);
  }

  for (var i = 0; i < delta.length; i++) {
    for (var j = 0; j < data[0].length; j++) {
      if (delta[i] == data[0][j]) {
        data[1][j] += 1;
      }
    }
  }

  return data;
}


// Calculates the mean.
function calcMean(data) {

  var mean = 0;

  for (var i = 0; i < data.length; i++) {
    mean += data[i];
  }

  return mean/data.length;
}


// Calculates the Variance.
function calcVariance(data) {

  var mean = calcMean(data);
  var vari = 0;

  for (var i = 0; i < data.length; i++) {
    vari += (data[i] - mean)*(data[i] - mean);
  }

  return vari/data.length;
}


// Calculates the standard deviation using the variance.
function calcStdev(data) {
  var vari = calcVariance(data);
  return Math.sqrt(vari);
}


// Returns the y-values for a normal distribution for every integer, since
// steps are always integers and the number of steps suffices for a smooth
// distribution.
// y = 1/sqrt(2*pi*var)*exp(- (x-mean)**2/(2*var))
function normalDistribution(mean, vari) {

  var data = [];

  for (var k = 0; k < 2*consolidate + 1; k++) {
    var i = -consolidate + k;
    var exp = 1 / (Math.sqrt(2 * Math.PI *vari)) *
          Math.exp((-1) * (i - mean) * (i - mean) / (2 * vari));
    data.push(exp);
  }

  return data;
}
