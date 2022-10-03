//https://calendarapi.vercel.app/api/loadDates.js?year=2022
//return [{"_id":"633ac595f9166acb45a0d33b","date":"2022-01-01T23:00:00.000Z","mark":"Some special day"}]
var config = require('./config.json');

export default function loadDates(req, res) {
    let year = req.query.year;
    console.log('year:' + year);
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(async err => {
        const collection = client.db("Calendar").collection("Days");
        
        // perform actions on the collection object
        const query = { date: {$gte: new Date(year, 0, 1)} };
        const days = await collection.find(query).toArray();
        console.log('days:' + days);    

        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
        res.write(JSON.stringify(days));
        res.end();

        client.close();
    });
}