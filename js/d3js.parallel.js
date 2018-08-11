var pcp_margin = {top: 30, right: 10, bottom: 10, left: 30},
    pcp_width = 400 - pcp_margin.left - pcp_margin.right,
    pcp_height = 200 - pcp_margin.top - pcp_margin.bottom;

var pcp_x = d3.scalePoint().range([0, pcp_width], 1),
    pcp_y = {},
    dragging = {};

var line = d3.line(),
    pcp_axis = d3.axisLeft(),
    background,
    foreground;

var svg = d3.select("body").append("svg")
    .attr("width", pcp_width + pcp_margin.left + pcp_margin.right)
    .attr("height", pcp_height + pcp_margin.top + pcp_margin.bottom)
  .append("g")
    .attr("transform", "translate(" + pcp_margin.left + "," + pcp_margin.top + ")");

var DATA_FILE_PATH = "./json/out_pca.json";
d3.json(DATA_FILE_PATH, function(error, root) {
  var target_object = root.time_array[1][Object.getOwnPropertyNames(root.time_array[1])[0]];
  // Extract the list of dimensions and create a scale for each.
  pcp_x.domain(dimensions = d3.keys(target_object[0].vec2).filter(function(d) {
    return d != "name" && (pcp_y[d] = d3.scaleLinear()
        .domain(d3.extent(target_object, function(p) {
          return +p.vec2[d];
        }))
        .range([pcp_height, 0]));
  }));

  // Add grey background lines for context.
  background = svg.append("g")
      .attr("class", "pcp-background")
    .selectAll("path")
      .data(target_object)
    .enter().append("path")
      .attr("d", pcp_path);

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "pcp-foreground")
    .selectAll("path")
      .data(target_object)
    .enter().append("path")
      .attr("d", pcp_path);

  path_to_visible(1);

  // Add a group element for each dimension.
  var pcp_g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + pcp_x(d) + ")"; });

  // Add an axis and title.
  pcp_g.append("g")
      .attr("class", "pcp-axis")
      .each(function(d) { d3.select(this).call(pcp_axis.scale(pcp_y[d])); });

  pcp_g.selectAll(".pcp-axis")
      .each(function(d){
        d3.select(this)
          .append("text")
          .style("visibility", "visible")
          .style("text-anchor", "middle")
          .attr("y", 10)
          .text(function(d) { return d; });
      });
  var target_object2 = root.time_array[6][Object.getOwnPropertyNames(root.time_array[6])[0]];
  update_PCP_path(target_object2);
});

function pcp_position(d) {
  var v = dragging[d];
  return v == null ? pcp_x(d) : v;
}

// Returns the path for a given data point.
function pcp_path(d) {
  return line(dimensions.map(function(p) {
    return [pcp_position(p), pcp_y[p](d.vec2[p])];
  }));
}

function path_to_visible(index) {
  d3.select(".pcp-foreground").selectAll("path")
    .each(function(d,i){
      if (i == index) d3.select(this).style("visibility", "visible");
    })
}

function update_PCP_path(data){
  d3.select(".pcp-background")
    .transition()
    .duration(1000)
    .selectAll("path")
    .each(function(d,i){
        console.log(d);
        d3.select(this)
          .attr('d', pcp_path(data[i]));
    })
  d3.select(".pcp-foreground")
    .transition()
    .duration(1000)
    .selectAll("path")
    .each(function(d,i){
        console.log(d);
        d3.select(this)
          .attr('d', pcp_path(data[i]));
    })
}
