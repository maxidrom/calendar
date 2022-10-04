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
		
		//load dates from server and initialize days array by this dates
		let serverDates = this.loadDates(this.#year);
		this.initializeDays(serverDates);

		//highlight current day
		let now = new Date();
		let curDayNumber = YearModel.convertToDayNumber(now);
		this.days[curDayNumber] = true;
	}

	loadDates(year) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", loadDateScript + "?year=" + year, false);//TODO:extract loadDateScript into config.json
		xhttp.send();
		if (xhttp.status === 200){
			return JSON.parse(xhttp.responseText);
		}
	}

	initializeDays(datesArray){
		for(let i=0; i < this.daysInYear; i++){
			if(this.isDayInArray(i, datesArray))
				this.days[i] = true;
			else
				this.days[i] = false;
		}
	}

	isDayInArray(dayNumber, datesArray){//datesArray: [{date, mark}]
		datesArray.find((day)=>{return YearModel.convertToDayNumber(new Date(day.date))==dayNumber})
	}

	static convertToDayNumber(date){
		const milisecondsInDay = 1000*60*60*24;
		return Math.floor((date - new Date(date.getFullYear(), 0, 1))/milisecondsInDay);
	}

	toggleDay(day){ //day - day number from the begining of the year
		this.days[day] = !this.days[day];
		this.views.forEach((view)=>view.draw());
		if (this.days[day]) {
			this.setDayOnServer(day);
		} else {
			this.deleteDayFromServer(day);
		}
	}

	setDayOnServer(day){
		//create Date based on this.#year and day
		let date = new Date(this.#year, 0, day+1);		
		const xhttp = new XMLHttpRequest();
		//xhttp.onload
		xhttp.open("GET", saveDateScript + '?date=' + date.getTime());
		xhttp.send();
	}

	deleteDayFromServer(day){

	}

	leapYear(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
}