function drawContour(values){
  let contourDensity = d3.contourDensity()
    .x(function(d) { return xScale(d["x"]); })
    .y(function(d) { return yScale(d["y"]); })
    .size([width, height])
    .cellSize(50)
    .bandwidth(15)

  let contourDensityValues = contourDensity(values);

  const color = d3.scaleSequential(function(t) { return d3.interpolate("cyan", "blue")(1-t); })
    .domain([d3.max(contourDensityValues, function(d) { return d.value }), 0.00]);

  let polygon_vertices = d3.select("#convex_hull").data()[0];

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
      // hide coutours outside of polygon
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
  let vertices = values.map(function(d) { return [xScale(d["x"]), yScale(d["y"])]; });
  let polygon = d3.polygonHull(vertices);

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
