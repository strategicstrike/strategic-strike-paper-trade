const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
let chartData = [];
let maxPoints = 50;

function addPrice(price) {
  chartData.push(price);
  if(chartData.length > maxPoints) chartData.shift();
  drawChart();
}

function drawChart() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 2;
  ctx.beginPath();
  chartData.forEach((p,i) => {
    let x = (i/maxPoints)*canvas.width;
    let y = canvas.height - ((p - Math.min(...chartData)) / (Math.max(...chartData)-Math.min(...chartData)+1)) * canvas.height;
    if(i==0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });
  ctx.stroke();
}
