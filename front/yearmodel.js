//import {saveDateScript} from "./config.js"
class YearModel{
	year;
	daysInYear;
	yearBeginsFrom;
	//days = new Map();
	serverDates = [];
	views = [];

	constructor(year){
		this.year = year;
		this.daysInYear = this.leapYear(year)? 366:365;
		let jan1 = new Date("January 1, " + year + " 12:00:00");
		this.yearBeginsFrom = jan1.getDay()==0? 6:jan1.getDay()-1;
		
		this.refreshModel();
	}

	refreshModel(){
		//load dates from server and initialize days array by this dates
		this.serverDates = this.loadDates(this.year);
		console.dir(this.serverDates);
	}

	loadDates(year) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", loadDateScript + "?year=" + year, false);
		xhttp.send();
		if (xhttp.status === 200){
			return JSON.parse(xhttp.responseText);
		}
	}

	isDaySpecial(dayNumber){//datesArray: [{date, mark}]
		return this.serverDates.find(
			(day)=>{return YearModel.convertToDayNumber(new Date(day.date))==dayNumber}
		);
	}

	static convertToDayNumber(date){
		const milisecondsInDay = 1000*60*60*24;
		let jan1 = new Date(date.getFullYear(), 0, 1, -12)
		let dayNumber = Math.floor((date - jan1)/milisecondsInDay);
		return dayNumber;
	}

	toggleDay(day){ //day - day number from the begining of the year
		if (!this.isDaySpecial(day)) {//if day wasn't highlighted
			//adjust model with newly highlighted day
			let date = new Date(this.year, 0, day+1, 8);
			let fillColor = document.getElementById("colorPicker").value.substring(1);
			this.serverDates.push({
				date: date,
				mark: "Some special day",
				fillColor: fillColor,
			});
			this.views.forEach((view)=>view.draw());
			this.setDayOnServer(day, fillColor);
			this.refreshModel();
		} else {
			this.deleteDayFromServer(day);
			this.refreshModel();
			this.views.forEach((view)=>view.draw());
		}
		//this.refreshModel();
		//this.views.forEach((view)=>view.draw());
	}

	setDayOnServer(day, fillColor){
		let date = new Date(this.year, 0, day+1, 8);
		const xhttp = new XMLHttpRequest();
		let str = saveDateScript + '?date=' + date.getTime() + '&colorFill=' + fillColor;
		xhttp.open("GET", str, false);
		xhttp.send();
	}

	deleteDayFromServer(day){
		let date = new Date(this.year, 0, day+1, 8);
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", deleteDateScript + '?date=' + date.getTime(), false);
		xhttp.send();
	}

	leapYear(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
}