require('dotenv').config();

const express = require('express');
const app = express();


// database
const connectDB = require("./db/connect");


const port = process.env.PORT || 3000;

const start = async (req, res) => {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(`Server is listening on port ${port}...`);
    });
};

start();

app.get('/', (req, res) => {
    res.send("WORKS???")
})