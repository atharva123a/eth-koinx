require('dotenv').config();

// for handling async errors:
require("express-async-errors");
const express = require('express');
const app = express();
const morgan = require("morgan");


// database
const connectDB = require("./db/connect");

// routers:
const accountController = require('./routes/accountRoutes');

// middleware:
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());
app.use(morgan("tiny"));

// using router:
app.use('/account', accountController);

// using middlewares:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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

