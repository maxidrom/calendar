function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

class Day{
	#x;
	#y;
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
		ctx.beginPath();
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;
		ctx.rect(this.#x, this.#y, Day.size, Day.size);
		ctx.stroke();
	}
}

class Year{
	#year;
	#daysInYear;
	yearBeginsFrom;
	#days = [];
	constructor(year){
		this.#year = year;
		this.#daysInYear = leapYear(year)? 366:365;
		let jan1 = new Date("January 1, " + year + " 12:00:00");
		this.yearBeginsFrom = jan1.getDay()==0? 6:jan1.getDay()-1;

		for(let i=0; i < this.#daysInYear; i++){
			this.#days[i] = new Day(i, this);
		}
	}

	draw(){
		this.#days.forEach(myFunction);
		function myFunction(item){
			item.draw();
		}
	}

	highliteDay(day){ //day - day number from the begining of the year
		this.#days[day].highlite();
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