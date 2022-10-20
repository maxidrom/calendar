//import {saveDateScript} from "./config.js"
class YearModel{
	year;
	daysInYear;
	yearBeginsFrom;
	days__ = [];//depricated, replaced by days Map
	//days = new Map();
	serverDates = [];
	views = [];

	constructor(year){
		this.year = year;
		this.daysInYear = this.leapYear(year)? 366:365;
		let jan1 = new Date("January 1, " + year + " 12:00:00");
		this.yearBeginsFrom = jan1.getDay()==0? 6:jan1.getDay()-1;
		
		this.refreshModel();

		//highlight current day
		let now = new Date();
		let curDayNumber = YearModel.convertToDayNumber(now);
		this.days__[curDayNumber] = true;
	}

	refreshModel(){
		//load dates from server and initialize days array by this dates
		this.serverDates = this.loadDates(this.year);
		console.dir(this.serverDates);
		this.initializeDays();
	}

	loadDates(year) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", loadDateScript + "?year=" + year, false);
		xhttp.send();
		if (xhttp.status === 200){
			return JSON.parse(xhttp.responseText);
		}
	}

	initializeDays(){
		let mongoDate;
		for(let i=0; i < this.daysInYear; i++){
			if(mongoDate = this.isDayInArray(i)){
				this.days__[i] = true;
			}
			else
				this.days__[i] = false;
		}
	}

	isDayInArray(dayNumber){//datesArray: [{date, mark}]
		return this.serverDates.find((day)=>{return YearModel.convertToDayNumber(new Date(day.date))==dayNumber});
	}

	static convertToDayNumber(date){
		const milisecondsInDay = 1000*60*60*24;
		let dayNumber = Math.floor((date - new Date(date.getFullYear(), 0, 1))/milisecondsInDay);
		return dayNumber;
	}

	toggleDay(day){ //day - day number from the begining of the year
		if (!this.days__[day]) {
			//adjust model with newly highlighted day
			this.days__[day] = !this.days__[day];
			let date = new Date(this.year, 0, day+1);
			let fillColor = document.getElementById("colorPicker").value.substring(1);
			this.serverDates.push({
				date: date,
				mark: "Some special day",
				fillColor: fillColor,
			});
			this.views.forEach((view)=>view.draw());
			this.setDayOnServer(day, fillColor);
		} else {
			this.deleteDayFromServer(day);
		}
		this.refreshModel();
		//this.views.forEach((view)=>view.draw());
	}

	setDayOnServer(day, fillColor){
		let date = new Date(this.year, 0, day+1);
		const xhttp = new XMLHttpRequest();
		let str = saveDateScript + '?date=' + date.getTime() + '&colorFill=' + fillColor;
		xhttp.open("GET", str);
		xhttp.send();
	}

	deleteDayFromServer(day){//TODO:

	}

	leapYear(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	dateHaveEvents(dayNumber){
		return this.days__[dayNumber];
	}
}