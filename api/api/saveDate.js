/*******************
* https://calendarapi.vercel.app/api/saveDate.js?date=1641682800000
********************/

var config = require('./config.json');

export default function saveDate(req, res) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const client = new MongoClient(
        config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(async err => {
        const collection = client.db("Calendar").collection("Days");

        // perform actions on the collection object
        let dateDate = new Date(Number(req.query.date));
        const dateDoc = {
            date: dateDate,
            mark: "Some special day"
        }
        const result = await collection.insertOne(dateDoc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        
        res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
        res.end();

        client.close();
    });
}