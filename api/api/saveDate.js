const { MongoClient } = require("mongodb");

export default function handler(request, response) {
  console.log("date:" + request.query.date);
  //call for mongodriver to insert document        
  //insertDate(request.query.date).catch(console.dir);
  insertDate(request.query.date).catch((error)=> {
    console.log('Inside catch!');
    console.log(error);
  });

  //response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*').
  status(200).json({
    body: request.body,
    query: request.query,
    cookies: 'hujnia',
  });
}

async function insertDate(date) {
  try{
      //const uri = "mongodb+srv://prefixoid:socialK0@cluster0.pa4ukcb.mongodb.net/?retryWrites=true&w=majority";
      const uri =  "mongodb+srv://vercel-admin-user:mOtM0NSCtYpEj0MA@cluster0.pa4ukcb.mongodb.net/admin";
      const client = new MongoClient(uri);
      console.log('client:' + client);
      const database = client.db('Calendar');
      console.log('database:' + database);
      const daysCollection = database.collection('Days');
      console.log("typeof(date):" + typeof(Number(date)));
      let dateDate = new Date(Number(date));
      console.log("dateDate:" + dateDate);
      
      const query = { date: {$gte: new Date(2022, 0, 1)} };
      const days = await daysCollection.find(query).toArray();
      console.log("days:" + days);
      
      
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