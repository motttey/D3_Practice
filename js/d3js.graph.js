var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                          11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = d * d * 1;
        return barHeight + "px";
    });


// SVG で描画

var w = 500;
var h = 300;

var barPadding = 1; //var同士の間隔

// SVG 要素の生成
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect") //body->svg内のrectを全てselect
   .data(dataset)
   .enter()
   .append("rect")
   .attr("y", function(d) {
    return h - d * 4;  // SVG の高さからデータの値を引く
	})
   .attr("height", function(d) {
    return d * 4;
	})
   .attr("width", w / dataset.length - barPadding)
   .attr("x", function(d, i) {
     return i * (w / dataset.length);  // 幅 20、間隔が 1 の棒
	})
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
	});

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
       return d;
   })
   .attr("x", function(d, i) { return i * (w / dataset.length) + 12;
   })
   .attr("y", function(d) {
    return h - d * 4;  // SVG の高さからデータの値を引く
	})
   .attr("text-anchor", "middle") //svg上のcentering
	;