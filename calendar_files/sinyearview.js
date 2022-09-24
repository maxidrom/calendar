class SinYearView{
	yearModel;
	constructor(yearModel){
		this.yearModel = yearModel;
		this.yearModel.views.push(this);

	}
	draw(){
		//var exp = "Math.sin(x) + Math.sin(365*x)/36";
		var n = 60;
		var m = 365/n;
		var exp = "Math.sin((x-77)/"+n+") + Math.sin("+m+"*x)/200";
	
		// Generate values for trace1
		var xValues = [];
		var yValues = [];
		for (var x = 0; x <= 365+365; x += 0.1) {
		  xValues.push(x);
		  yValues.push(eval(exp));
		}	
		// Display using Plotly
		var trace1 = {x:xValues, y:yValues, mode:"lines", line: {color: '#17BECF'}};
	
		// Generate values for trace2
		var xValues2 = [];
		var yValues2 = [];
		this.yearModel.days.forEach((item, index)=>{
			if(item){
				for (var x = index; x <= index+1; x += 0.01) {
					xValues2.push(x);
					yValues2.push(eval(exp));
				}
			}
		});
		// Display using Plotly
		var trace2 = {x:xValues2, y:yValues2, mode:"markers", line: {color: '#FF2222'}};
	
		
		var data = [trace1, trace2];
		var layout = {title: "y = " + exp};
		Plotly.newPlot("myPlot", data, layout);

		let mySin = document.getElementById('myPlot');
		mySin.on('plotly_click', function(data){
			var pts = '';
			let day;
			for(var i=0; i < data.points.length; i++){
				day = Math.floor(data.points[i].x);
				//alert(day);
				pts = 'x = '+data.points[i].x +'\ny = '+
					data.points[i].y.toPrecision(4) + '\n\n';
			}
			curSinYearView.yearModel.toggleDay(day);
		});
	}
}