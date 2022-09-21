function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

class Day{
	#x;
	#y;
	highlighted = false;
	static size = 15;

	constructor(dayNumber, year){	//dayNumber in currect view starting from 0.
		let column = Math.floor((year.yearBeginsFrom + dayNumber)/7);
		let row = (year.yearBeginsFrom + dayNumber)%7;
		this.#x = xTopLeft + column*(Day.size + squareMargin);
		this.#y = yTopLeft + row*(Day.size + squareMargin);
	}
	
	draw(){
		ctx.beginPath();
		ctx.getBounding
		ctx.rect(this.#x, this.#y, Day.size, Day.size);
		ctx.stroke();
		ctx.mouseup
	}

	highlite(){
		this.highlighted = !this.highlighted;
		ctx.beginPath();
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;
		ctx.rect(this.#x, this.#y, Day.size, Day.size);
		ctx.stroke();
	}
}

class YearModel{
	#year;
	#daysInYear;
	yearBeginsFrom;
	days = [];
	constructor(year){
		this.#year = year;
		//this.#daysInYear = leapYear(year)? 366:365;
		this.#daysInYear = 365*2;
		let jan1 = new Date("January 1, " + year + " 12:00:00");
		this.yearBeginsFrom = jan1.getDay()==0? 6:jan1.getDay()-1;

		for(let i=0; i < this.#daysInYear; i++){
			this.days[i] = new Day(i, this);
		}
	}

	draw(){
		this.days.forEach(item => item.draw());
	}

	highliteDay(day){ //day - day number from the begining of the year
		this.days[day].highlite();
	}

	calcDay(x, y){// x, y - related to the window
		//return dayNumber from the begining of year based on pixel coordinates.
		x -= c.getBoundingClientRect().left;
		y -= c.getBoundingClientRect().top;
		//if point is not inside of any day then return -1
			let column 	= Math.floor((x - xTopLeft)/(Day.size + squareMargin));
			let innerX 	= (x - xTopLeft)%(Day.size + squareMargin)*(Day.size + squareMargin); //xInner - x releated to nearest daysquare from the left side
			let row 	= Math.floor((y - yTopLeft)/(Day.size + squareMargin));
			let innerY 	= (y - yTopLeft)%(Day.size + squareMargin)*(Day.size + squareMargin);
			//if(inside any day){
				return (column*7 + row - this.yearBeginsFrom);
			//} else return -1;
	}
}

class SinYearView{
	#yearModel;
	constructor(yearModel){
		this.#yearModel = yearModel;
	}
	draw(){
		document.getElementById("demo").innerHTML = this.#yearModel.days[262].highlighted;
		//document.getElementById("demo").innerHTML = "Hello JavaScript!";
		//var exp = "Math.sin(x) + Math.sin(365*x)/36";
		var n = 60;
		var m = 365/n;
		var exp = "Math.sin((x-77)/"+n+") + Math.sin("+m+"*x)/200";
	
		// Generate values for trace1
		var xValues = [];
		var yValues = [];
		for (var x = 0; x <= 365+365; x += 0.01) {
		  xValues.push(x);
		  yValues.push(eval(exp));
		}	
		// Display using Plotly
		var trace1 = {x:xValues, y:yValues, mode:"lines", line: {color: '#17BECF'}};
	
		// Generate values for trace2
		var xValues2 = [];
		var yValues2 = [];
		this.#yearModel.days.forEach(myFunction);
		function myFunction(item, index){
			if(item.highlighted){
				for (var x = index; x <= index+1; x += 0.01) {
					xValues2.push(x);
					yValues2.push(eval(exp));
				}
			}
		}
		// Display using Plotly
		var trace2 = {x:xValues2, y:yValues2, mode:"markers", line: {color: '#FF2222'}};
	
		
		var data = [trace1, trace2];
		var layout = {title: "y = " + exp};
		Plotly.newPlot("myPlot", data, layout);
	}
}
