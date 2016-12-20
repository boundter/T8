// Plot using Chart.js. This is all just mashed up from different examples, so
// there is probably a lot of unnecessary stuff in there.
function plt(dat, lin) {

  Chart.defaults.global.defaultFontColor = "white";
  var ctx2 = document.getElementById("plot").getContext("2d");
  ctx2.canvas.width = 500;
  ctx2.canvas.height = 500;

  var barChartData = {
        labels: dat[0],
        datasets: [{
            type: 'bar',
              label: "Simulation",
                data: dat[1],
                fill: false,
                backgroundColor: '#71B37C',
                borderColor: '#71B37C',
                hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',
                yAxisID: 'y-axis-1'
        }, {
            label: "Gauß",
                type:'line',
                data: lin,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
        } ]
    };


  var myChart = new Chart(ctx2, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true,
          }
        }],
        yAxes: [{
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines:{
            display: false
          },
          labels: {
            show:true,

          }
        }, {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines:{
            display: false
          },
          labels: {
            show:true,

          }
        }]
      }
    }
  });
}
