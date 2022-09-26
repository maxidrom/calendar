var http = require('http');


const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
"mongodb+srv://prefixoid:socialK0@cluster0.pa4ukcb.mongodb.net/?retryWrites=true&w=majority";
async function run() {
    const client = new MongoClient(uri);
    try {
        const database = client.db('Calendar');
        const days = database.collection('Days');
        // Query for a movie that has the title 'Back to the Future'
        const query = { mark: 'Trip to Belarus' };
        const day = await days.findOne(query);
        return day;
    } finally {
        // Ensures that the client will close when you finish/error
        client.close();
        //return "DAY";
    }
}


http.createServer(async function (req, res) {
    var day = await run();
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
    res.write(JSON.stringify(day));
    res.end();
}).listen(8080);