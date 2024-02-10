const { MongoClient } = require("mongodb");
//require("dotenv").config({ path: "./config.env" });

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db;

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
  try {
      console.log('connecting...')
      await client.connect();
      //db = db.db('sample_guides');
      console.log('Conectado a MongoDb!')
      //return db.db('sample_guides');

/*
      let planets = await client.db('sample_guides').collection('planets')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      })
      console.log(planets)*/

  } catch (e) {
      console.error(e);
  }
}

main().catch(console.error);



module.exports = {
  client
}