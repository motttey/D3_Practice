function drawContour(values){
  var contourDensity = d3.contourDensity()
    .x(function(d) { return xScale(d["x"]); })
    .y(function(d) { return yScale(d["y"]); })
    .size([width, height])
    .cellSize(35)
    .bandwidth(15)

  var contourDensityValues = contourDensity(values);

  var color = d3.scaleSequential(function(t) { return d3.interpolate("cyan", "blue")(1-t); })
    .domain([d3.max(contourDensityValues, function(d) { return d.value }), 0.00]);

  var polygon_vertices = d3.select("#convex_hull").data()[0];
  console.log(polygon_vertices[0])

  // overlap contour on convex hull
  svg.insert("g")
    .attr("stroke", "none")
    .attr("stroke-width", "0.0")
    .selectAll("path")
    .data(contourDensityValues)
    .enter()
    .append("path")
    .attr("fill", function(d) { return color(d.value); })
    .attr("d", d3.geoPath())
    .attr("opacity", function(d){
      // polygon外のcontourを非表示にする
      let flag = true;
      d.coordinates.forEach(function(coordinate){
        coordinate[0].forEach(function(c){
          if(!d3.polygonContains(polygon_vertices, c)) flag = false;
        });
      });
      return (flag)? "0.5": "0.0";
    });
}

function drawConvexHull(values){
  var vertices = values.map(function(d) { return [xScale(d["x"]), yScale(d["y"])]; });
  var polygon = d3.polygonHull(vertices);
  console.log(polygon);

  // add convex hull
  svg.append("g")
    .append("path")
    .datum(polygon)
    .attr("id", "convex_hull")
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
    .attr("fill", "cyan")
    .attr("stroke", "steelblue")
    .attr("opacity", "0.5");
}
