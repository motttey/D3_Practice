var svg = d3.select("body").append("svg");
var dataset = [ 5, 10, 15, 20, 25 ];

svg.attr("width", 500)
   .attr("height", 100);

var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

circles.attr("cx", function(d, i) {
             return (i * 50) + 25;
         })
        .attr("cy", i)
        .attr("r", function(d) {
             return d;
        })
        .attr("fill", "yellow")
		.attr("stroke", "orange")
		.attr("stroke-width", function(d) {
    		return d/2;
		});