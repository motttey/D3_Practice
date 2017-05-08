// 読み込みデータファイル
var DATA_FILE_PATH = './json/example.json';
// 一覧描画先
var TARGET_ELEMENT_ID = '#data';
// 項目名：漢字表記
var COL_NAME = 'name';
// 項目名：かな表記
var COL_KANA = 'yomigana';
// 項目名：色ID
var COL_COLOR_ID = 'color';

var SCORE = 'score';

r_scale =  d3.scaleLinear()
  .domain([0, 1500])
  .range([0, 50])

drawTable();
drawCircle();

/**
 * データ一覧の描画
 */
function drawTable() {
	d3.json(DATA_FILE_PATH, function(error, root) {
		// 第2引数のrootが読み込んだJSONの最上位になる
		// ここでは色関連情報の配列を取得した形になる

		d3.select(TARGET_ELEMENT_ID)
			.append('div')
			.selectAll()
			.data(root)
			.enter()
			.append('div')
			.text(function (dataRow) {
				// 読み込んだデータを参照する場合はコールバック関数を通す
				return dataRow[COL_NAME]
				+ '（' + dataRow[COL_KANA] + '）'
				+ '：' + dataRow[COL_COLOR_ID];
			});
	});
}


function drawCircle() {
	d3.json(DATA_FILE_PATH, function(error, root) {

		var div = d3.select(TARGET_ELEMENT_ID)
			.append('div')
			.selectAll()
			.data(root)
			.enter()
			.append('div')
			.text(function (dataRow) {
				// 読み込んだデータを参照する場合はコールバック関数を通す
				return dataRow[SCORE];
			});
		var svg = div.append('svg')
			.attr("width", 100)
			.attr("height", 100);
		svg.append('circle')
            .attr("cx",50)
            .attr("cy",50)
            .attr("r",function(dataRow){
            	return r_scale(dataRow[SCORE]);	
            })
            .attr("fill","red");
	});
}
