const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

// user : kanizfatima528
// pass : C1JRbjcI9NOHFTRG



const uri = "mongodb+srv://kanizfatima528:C1JRbjcI9NOHFTRG@cluster0.mao2e0n.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const videosCollection = client.db("lws").collection("videos")
    const tagsCollection = client.db("lws").collection("tags")

    // http://localhost:5000/videos
    app.get('/videos', async (req, res) => {
      const query = {};
      const cursor = videosCollection.find(query);
      const videos = await cursor.toArray();
      res.send(videos);
    })

    // http://localhost:5000/tags
    app.get('/tags', async (req, res) => {
      const query = {};
      const cursor = tagsCollection.find(query);
      const tags = await cursor.toArray();
      res.send(tags);
    })
  }

  finally {

    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello to LWS server')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})