const { MongoClient } = require("mongodb");

const Db = 'mongodb://127.0.0.1:27017';
//const Db = process.env.ATLAS_URI
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
      console.log('connecting...')
      await client.connect();
      //establish and verify connection
      await client.db("products").command({ ping: 1 });
      console.log("Connected successfully to server");
  } catch (e) {
      console.error(e);
  }
}

main().catch(console.error);

module.exports = {
  client
}