require("dotenv").config();
const app = require("./server");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_SERVER;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect("tblog");
    console.log("Connected to MongoDB Atlas");
    return client;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  client,
  connectToMongoDB,
};
