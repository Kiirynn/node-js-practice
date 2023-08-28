const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const uri = "mongodb+srv://kieranporopat:YXOcIRo6u5QC3LiC@kiirynn1.cdxm92v.mongodb.net/Kiirynn1";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const app = express();
app.use(express.json());

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const dbUsers = client.db('Kiirynn1').collection('users');

    app.post('/mongodb/users', async (req, res) => {
      try {
        const newName = req.body.name;
        const newUser = { name: newName };
        const result = await dbUsers.insertOne(newUser);
        const insertedId = result.insertedId;
        res.status(201).json({ message: 'User has been generated', userId: insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    const port = process.env.PORT || 1000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.error);



// /Users/Kiirynn/Downloads/mongosh-1.10.5-darwin-x64/bin/mongo