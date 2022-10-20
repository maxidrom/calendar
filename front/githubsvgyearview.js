class GithubSvgYearView{
	yearModel;
	constructor(yearModel){
		this.yearModel = yearModel;
		this.yearModel.views.push(this);

        document.getElementById("githubsvg").innerHTML = `
            <h1 id="hoverDate">srgfs</h1>
            Color: <input id="colorPicker" value="#3399FF80" data-jscolor="{}">
            <svg id="githubsvgCalendar"
                x="50" width="1850" hight="300" style="border:1px" viewBox="-60 0 1850 300">
            </svg>
        `;

	}

    draw(){
        /*let innerHTML = `
            <h1 id="hoverDate">srgfs</h1>
            Color: <input id="colorPicker" value="#3399FF80" data-jscolor="{}">
            <svg x="50" width="1850" hight="300" style="border:1px" viewBox="-60 0 1850 300">
        `;*/
        let innerHTML;
        for(let i=0; i < this.yearModel.daysInYear; i++){
            let column = Math.floor((this.yearModel.yearBeginsFrom + i)/7);
            let row = (this.yearModel.yearBeginsFrom + i)%7;
            let x = column*(cellSize + cellMarging);
            let y = row*(cellSize + cellMarging);
            let date = new Date(this.yearModel.year, 0, i+1);
            let cellStyle = cellStyleDefault;
            let mongoDate;
            if(mongoDate = this.yearModel.isDayInArray(i)){//date is in serverdates draw it with highlited style
                if(mongoDate.fillColor)
                    cellStyle = "fill:#" + mongoDate.fillColor + "; stroke:#DFE1E4";
                else
                    cellStyle = cellStyleDefaultHighlited;
            }
            innerHTML += `
                <rect
                    x=${x} y=${y}
                    width="${cellSize}" height="${cellSize}" rx="${cellRounding}" ry="${cellRounding}"
                    style="${cellStyle}" data-date="${date}"
                    onmouseover="svgCalendar.showTip('cell-${i}')" id="cell-${i}"
                />
            `;
        }
        //innerHTML += `</svg>`;
        document.getElementById("githubsvgCalendar").innerHTML = innerHTML;
    }

    showTip(id){
        document.getElementById("hoverDate").innerHTML =
            document.getElementById(id).getAttribute("data-date");
        console.log(document.getElementById("colorPicker").value);
    }
}