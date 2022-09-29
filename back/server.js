var http = require('http');
var url = require('url');


const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
"mongodb+srv://prefixoid:socialK0@cluster0.pa4ukcb.mongodb.net/?retryWrites=true&w=majority";
async function run(year) {
    const client = new MongoClient(uri);
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
        client.close();
        //return "DAY";
    }
}

http.createServer(async function (req, res) {
    console.log(url.parse(req.url, true).query);
    var year = url.parse(req.url, true).query.year;
    var days = await run(year);
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
    res.write(JSON.stringify(days));
    res.end();
}).listen(8080);