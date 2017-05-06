var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
   var newNumber1 = Math.round(Math.random() * xRange);
   var newNumber2 = Math.round(Math.random() * yRange);
   dataset.push([newNumber1, newNumber2]);
}
var w = 1000;
var h = 500;

// SVG 要素の生成
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// 入力ドメイン: 入力データの値の取りうる範囲
// 出力値の取りうる範囲
var padding = 100;

var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })]) //データセットの最大値を出力ドメインとする
    .range([padding, w - padding]); //横幅
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([padding, h - padding ]);
var rScale = d3.scaleLinear()
    .domain([0, Math.sqrt( d3.max(dataset, function(d) { return d[1]; }))])
    .range([10, 50]);

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
       return xScale(d[0]);
   })
   .attr("cy", function(d) {
       return yScale(d[1]);
   })
   .attr("r", 5)
   .attr("fill", function(d) {
       return "rgb(0, " + Math.round(d[0] / 2)  + ", " +  Math.round( d[1] / 2 ) + ")";
   })
   .attr("r", function(d) {
       return rScale(Math.sqrt(d[0]) / 5);
   });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");
// 軸
//var xAxis = axis()
//	.scale(xScale)
//    .orient("bottom");

//要素の構成を関連づけるためにグループ全体にクラスを適用
//g: group
  // Add the y Axis
  svg.append("g")
      .call(d3.axisBottom(xScale));
  svg.append("g")
      .call(d3.axisRight(yScale));
 // text label for the y axis
  svg.append("text")
      .attr("y", 0 - 10)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");