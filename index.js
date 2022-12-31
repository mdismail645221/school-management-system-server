const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');


// middleware
app.use(cors());
// app.use(express.static("public"));
app.use(express.json());



app.get('/', (req, res)=>{
    res.send("school system management server is runing")
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://school-management-system01:ki0RofN7Mtl3Zqk5@cluster0.cn0mdvb.mongodb.net/?retryWrites=true&w=majority";
console.log("uri", uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const allUsersCollection = client.db("school-management01").collection("allUsers");
        const studentCollection = client.db("school-management01").collection("students");

        app.get('/allUsers', async(req, res)=>{
            const query = {};
            const result = await allUsersCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/students', async(req, res)=>{
            const query = {};
            const result = await studentCollection.find(query).toArray();
            res.send(result)
        })

        app.post("/students", async(req, res)=>{
            const body = req.body;
            // console.log(body)
            const result = await studentCollection.insertOne(body);
            console.log(result)
            res.send(result);
        })


    }
    catch{(e)=>{
        console.log(e)
    }}
}

run().catch((e)=>{
    console.log(e)
})





app.listen(port, ()=> {
    console.log("server is running", port)
})