require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`user-management server running`)
})

const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.2umnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const database = client.db("managementDB");
        const usersCollection = database.collection("users");

        app.get('/users', async (req, res) => {
            const data = await usersCollection.find().toArray()
            res.send(data)
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const user = await usersCollection.findOne({ _id: new ObjectId(id) })
            res.send(user)
        })
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id
            const user = req.body
            const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: user })
            res.send(result)
        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const result = await usersCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log(`listening on port : ${port}`)
})