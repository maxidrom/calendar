class GithubYearView{
    yearModel;
    #days = [];
	constructor(yearModel){
		this.yearModel = yearModel;
        this.yearModel.views.push(this);
        for(let i=0; i < this.yearModel.daysInYear; i++){
			this.#days[i] = new Day(i, this.yearModel.yearBeginsFrom, this);
		}
	}

	draw(){
		this.#days.forEach(item => item.draw());
	}

    onClick(event){
        let day = this.calcDay(event.clientX, event.clientY);
        this.yearModel.toggleDay(day);
    }

	//return dayNumber from the begining of year based on pixel coordinates.
    calcDay(x, y){// x, y - related to the window
		x -= c.getBoundingClientRect().left;
		y -= c.getBoundingClientRect().top;
		//if point is not inside of any day then return -1
			let column 	= Math.floor((x - xTopLeft)/(Day.size + squareMargin));
			let innerX 	= (x - xTopLeft)%(Day.size + squareMargin)*(Day.size + squareMargin); //xInner - x releated to nearest daysquare from the left side
			let row 	= Math.floor((y - yTopLeft)/(Day.size + squareMargin));
			let innerY 	= (y - yTopLeft)%(Day.size + squareMargin)*(Day.size + squareMargin);
			//if(inside any day){
				return (column*7 + row - this.yearModel.yearBeginsFrom);
			//} else return -1;
	}
}

class Day{
	#x;
	#y;
    #dayNumber;
    #yearView;
	static size = 15;

	constructor(dayNumber, yearBeginsFrom, yearView){	//dayNumber in currect view starting from 0.
		this.#dayNumber = dayNumber;
        this.#yearView = yearView;
        let column = Math.floor((yearBeginsFrom + dayNumber)/7);
		let row = (yearBeginsFrom + dayNumber)%7;
		this.#x = xTopLeft + column*(Day.size + squareMargin);
		this.#y = yTopLeft + row*(Day.size + squareMargin);
	}
	
	draw(){
		ctx.beginPath();
        if(this.#yearView.yearModel.days[this.#dayNumber]){
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 1;
        }
		ctx.lineWidth = 2;
        ctx.clearRect(this.#x, this.#y, Day.size, Day.size);
        ctx.rect(this.#x, this.#y, Day.size, Day.size);
		ctx.stroke();
		ctx.mouseup
	}
}