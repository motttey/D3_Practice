var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
   14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
   24, 18, 25, 9, 3 ];

for (var i = 0; i < 25; i++) {          // ループを25回繰り返す
	var newNumber = Math.random() * 30;  // 0～30のランダムな数を生成
	dataset.push(newNumber);             // 生成した数を配列に追加
}

d3.select("body").selectAll("div")
   .data(dataset)
   .enter()
   .append("div")
   .attr("class", "bar").style("height", function(d) {
   	return d * 5  + "px";
});