function sumArray(data) {
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;
}


function prepDelta() {
  var delta = [[], []];
  var data = [[], []]
  for (var i = 0; i < particle.length; i++) {
    for (var j = 0; j < particle[i].history.length / 2 - 1; j++) {
      var diffX = particle[i].history[2 * (j + 1)] - particle[i].history[2 * j];
      var diffY = particle[i].history[2 * (j + 1) + 1] -
                  particle[i].history[2 * j + 1];
      delta[0].push(diffX);
      delta[1].push(diffY);
    }
  }
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


function buildHistogram(delta) {
  var data = [[], []]
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


function calcMean(data) {
  var mean = 0;
  for (var i = 0; i < data.length; i++) {
    mean += data[i];
  }
  return mean/data.length;
}


function calcVariance(data) {
  var mean = calcMean(data);
  var vari = 0;
  for (var i = 0; i < data.length; i++) {
    vari += (data[i] - mean)*(data[i] - mean);
  }
  return vari/data.length;
}


function calcStdev(data) {
  var vari = calcVariance(data);
  return Math.sqrt(vari);
}


function normalDistribution(mean, vari) {
  var data = [];


  for (var k = 0; k < 2*consolidate + 1; k++) {
    var i = -consolidate + k
    var exp = 1 / (Math.sqrt(2 * Math.PI *vari)) *
          Math.exp((-1) * (i - mean) * (i - mean) / (2 * vari));
    data.push(exp);
  }
  return data;
}
