var http = require('http');
var url = require('url');


const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://prefixoid:socialK0@cluster0.pa4ukcb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run(year) {
    try {
        const database = client.db('Calendar');
        const daysCollection = database.collection('Days');
        // Query for a movie that has the title 'Back to the Future'
        const query = { date: {$gte: new Date(year, 0, 1)} };
        const days = await daysCollection.find(query).toArray();
        console.log(days);
        return days;
    } finally {
        // Ensures that the client will close when you finish/error
        //client.close();
        //return "DAY";
    }
}

async function insertDate(date) {
    try{
        const database = client.db('Calendar');
        const daysCollection = database.collection('Days');
        console.log("typeof(date):" + typeof(Number(date)));
        let dateDate = new Date(Number(date));
        console.log("dateDate:" + dateDate);
        const dateDoc = {
            date: dateDate,
            mark:"Some special day"
        }
        const result = await daysCollection.insertOne(dateDoc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        //await client.close();
    }
}

http.createServer(async function (req, res) {
    //url.parse(req.url, true).query.
    console.log(url.parse(req.url, true).pathname);
    if(url.parse(req.url, true).pathname == '/loadyear'){
        var year = url.parse(req.url, true).query.year;
        var days = await run(year);
        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
        res.write(JSON.stringify(days));
        res.end();
    } else if (url.parse(req.url, true).pathname == '/savedate'){
        //extract date from url
        date = url.parse(req.url, true).query.date;
        console.log("date:" + date);
        //call for mongodriver to insert document        
        insertDate(date).catch(console.dir);
    }
}).listen(8080);