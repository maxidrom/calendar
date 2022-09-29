class YearModel{
	#year;
	daysInYear;
	yearBeginsFrom;
	days = [];
	views = [];

	constructor(year){
		this.#year = year;
		this.daysInYear = this.leapYear(year)? 366:365;
		let jan1 = new Date("January 1, " + year + " 12:00:00");
		this.yearBeginsFrom = jan1.getDay()==0? 6:jan1.getDay()-1;
		
		//load dates from server
		const xhttp = new XMLHttpRequest();
		xhttp.onload = ()=> {
			let serverDates = JSON.parse(xhttp.responseText);
			console.log(serverDates);
			for(let i=0; i < this.daysInYear; i++){
				if(serverDates.find((day)=>{return YearModel.convertToDayNumber(new Date(day.date))==i}))					
					this.days[i] = true;
				else
					this.days[i] = false;
			}

			//highlight current day
			let now = new Date();
			let curDayNumber = YearModel.convertToDayNumber(now);
			this.days[curDayNumber] = true;

			//redraw views
			this.views.forEach((view)=>view.draw());
		}
		xhttp.open("GET", "http://localhost:8080/index.js?year=" + year);
		xhttp.send();
	}

	static convertToDayNumber(date){
		const milisecondsInDay = 1000*60*60*24;
		return Math.floor((date - new Date(date.getFullYear(), 0, 1))/milisecondsInDay);
	}

	toggleDay(day){ //day - day number from the begining of the year
		this.days[day] = !this.days[day];
		this.views.forEach((view)=>view.draw());
	}

	leapYear(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
}