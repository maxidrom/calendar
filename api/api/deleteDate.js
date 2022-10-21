//db.Days.deleteMany( { date: ISODate("2022-06-18T22:00:00.000Z") } )

var config = require('./config.json');

export default function deleteDate(req, res) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const client = new MongoClient(
        config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(async err => {
        let dateDate = new Date(Number(req.query.date));
        const collection = client.db("Calendar").collection("Days");
        const query = { date: dateDate };
        const result = await collection.deleteMany(query);
        console.log("Deleted " + result.deletedCount + " documents");
        
        res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
        res.end();
        client.close();
    });
}