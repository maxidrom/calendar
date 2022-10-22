class GithubSvgYearView{
	yearModel;
	constructor(yearModel){
		this.yearModel = yearModel;
		this.yearModel.views.push(this);

        document.getElementById("githubsvg").innerHTML = `
            <input id="colorPicker" value="#3399FF80" data-jscolor="{}"><br>
            <textarea id="eventText" rows="4" cols="50">Some special day.</textarea>
            <svg id="githubsvgCalendar"
                x="50" width="1850" hight="300" style="border:1px" viewBox="0 0 1850 240">
            </svg>
            <h3 id="hoverDate" style="text-align:center"></h3>
        `;

	}

    draw(){
        let innerHTML;
        let today = new Date();
        today = YearModel.convertToDayNumber(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                8
            )
        );
        for(let i=0; i < this.yearModel.daysInYear; i++){
            let column = Math.floor((this.yearModel.yearBeginsFrom + i)/7);
            let row = (this.yearModel.yearBeginsFrom + i)%7;
            let x = column*(cellSize + cellMarging);
            let y = row*(cellSize + cellMarging);
            let date = YearModel.convertToDate(this.yearModel.year, i);
            let cellStyle = cellStyleDefault;
            let mongoDate;
            if(mongoDate = this.yearModel.getDate(i)){//if date is in serverdates draw it with highlited style
                if(mongoDate.fillColor)
                    cellStyle = "fill:#" + mongoDate.fillColor + "; ";
                else
                    cellStyle = cellStyleDefaultHighlited;
            }
            //highlight current date
            if( i == today )
                cellStyle += "stroke:#DF0000"
            else
                cellStyle += "stroke:#DFE1E4";
            innerHTML += `
                <rect
                    id="cell-${i}"
                    x=${x} y=${y}
                    width="${cellSize}" height="${cellSize}"
                    rx="${cellRounding}" ry="${cellRounding}"
                    style="${cellStyle}" data-date="${date}"
                    onmouseover="svgCalendar.showTip('cell-${i}')"
                    onclick="svgCalendar.onClick('${date}')"
                />
            `;
        }
        document.getElementById("githubsvgCalendar").innerHTML = innerHTML;
    }

    showTip(id){
        let hint;
        let date = document.getElementById(id).getAttribute("data-date");
        hint = date;
        let mongoDoc = this.yearModel.getDate(date);
        if (mongoDoc)
            hint += `<br>${mongoDoc.mark}`;
        document.getElementById("hoverDate").innerHTML = hint;
    }

    onClick(date) {
        let dayNumber = YearModel.convertToDayNumber(date);
        this.yearModel.toggleDay(dayNumber);
    }
}