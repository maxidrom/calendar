 exports.retriveDate = function() {
    const { MongoClient } = require("mongodb");

    // Replace the uri string with your connection string.
    const uri =
    "mongodb+srv://prefixoid:socialK0@cluster0.pa4ukcb.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    async function run() {
        try {
            const database = client.db('Calendar');
            const days = database.collection('Days');

            // Query for a movie that has the title 'Back to the Future'
            const query = { mark: 'Trip to Belarus' };
            const day = await days.findOne(query);
            console.log(day);
            return "DAY";
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
}