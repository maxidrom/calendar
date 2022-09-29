class GithubYearView{
	static xTopLeft = 60;
	static yTopLeft = 20;
	static cellSize = 27;
	static squareMargin = 6;
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
			let column 	= Math.floor((x - GithubYearView.xTopLeft)/(GithubYearView.cellSize + GithubYearView.squareMargin));
			//innerX - x releated to nearest daysquare from the left side
			let innerX 	= (x - GithubYearView.xTopLeft)%(GithubYearView.cellSize + GithubYearView.squareMargin)*(GithubYearView.cellSize + GithubYearView.squareMargin);
			let row 	= Math.floor((y - GithubYearView.yTopLeft)/(GithubYearView.cellSize + GithubYearView.squareMargin));
			let innerY 	= (y - GithubYearView.yTopLeft)%(GithubYearView.cellSize + GithubYearView.squareMargin)*(GithubYearView.cellSize + GithubYearView.squareMargin);
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
	
	constructor(dayNumber, yearBeginsFrom, yearView){	//dayNumber in currect view starting from 0.
		this.#dayNumber = dayNumber;
        this.#yearView = yearView;
        let column = Math.floor((yearBeginsFrom + dayNumber)/7);
		let row = (yearBeginsFrom + dayNumber)%7;
		this.#x = GithubYearView.xTopLeft + column*(GithubYearView.cellSize + GithubYearView.squareMargin);
		this.#y = GithubYearView.yTopLeft + row*(GithubYearView.cellSize + GithubYearView.squareMargin);
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
        ctx.clearRect(this.#x, this.#y, GithubYearView.cellSize, GithubYearView.cellSize);
        ctx.rect(this.#x, this.#y, GithubYearView.cellSize, GithubYearView.cellSize);
		ctx.stroke();
		ctx.mouseup
	}
}