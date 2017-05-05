//d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");


var dataset = [ 0, 5, 10, 15, 20, 25 ];

d3.select("body")
   .data(dataset)   //データ数分繰り返す
   .enter()         //このメソッドは最初に DOM を調べ、次に受け渡されたデータを調べる, データ数のほうが少ない場合にはプレースホルダをつくる
   .append("p")
   .text(function(d) { return d; }); //data()メソッドを呼ぶことで以降のチェインメソッドからdを引数として受け取れる無名関数が使える
 //.text("新しいパラグラフ！");

 /*
 無名関数
 function(input_value) {
   // なんらかの計算
   return output_value;
}
 */