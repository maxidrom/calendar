//import {saveDateScript} from "./config.js"
class YearModel{
	year;
	daysInYear;
	yearBeginsFrom;
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

	getDate(day){
		if (typeof day == "string") {
			day = YearModel.convertToDayNumber(day);
		}
		return this.serverDates.find(
			(mongoDoc)=>{
				let mongoDayNumber = YearModel.convertToDayNumber(mongoDoc.date);
				if ( mongoDayNumber == day )
					return true;
				else 
					return false;
			}
		);
	}

	static convertToDayNumber(date){
		if (typeof date == 'string') {
			date = new Date(date);
		}
		const milisecondsInDay = 1000*60*60*24;
		let jan1 = new Date(date.getFullYear(), 0, 1, -12)
		let dayNumber = Math.floor((date - jan1)/milisecondsInDay);
		return dayNumber;
	}

	static convertToDate(year, dayNumber) {
		let date = new Date(year, 0, dayNumber + 1, 8);
		return date;
	}

	toggleDay(day){ //day - day number from the begining of the year
		let date = YearModel.convertToDate(this.year, day);
		if (!this.getDate(day)) {//if day wasn't highlighted
			//adjust model with newly highlighted day
			let fillColor = document.getElementById("colorPicker").value.substring(1);
			let eventText = document.getElementById("eventText").value;
			this.serverDates.push({
				date: date,
				mark: eventText,
				fillColor: fillColor,
			});
			this.views.forEach((view)=>view.draw());
			this.setDayOnServer(date, fillColor, eventText);
			this.refreshModel();
		} else {
			this.deleteDayFromServer(date);
			this.refreshModel();
			this.views.forEach((view)=>view.draw());
		}
	}

	setDayOnServer(date, fillColor, eventText){
		const xhttp = new XMLHttpRequest();
		let str = saveDateScript + 
			'?date=' + date.getTime() +
			'&colorFill=' + fillColor +
			'&eventText=' + eventText;
		xhttp.open("GET", str, false);
		xhttp.send();
	}

	deleteDayFromServer(date){
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", deleteDateScript + '?date=' + date.getTime(), false);
		xhttp.send();
	}

	leapYear(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
}