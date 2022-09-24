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
		for(let i=0; i < this.daysInYear; i++){
			this.days[i] = false;
		}

		//highlight current day
		let now = new Date();
		let curDayNumber = Math.floor((now - new Date(now.getFullYear(), 0, 1))/(1000*60*60*24));
		this.days[curDayNumber] = !this.days[curDayNumber];
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