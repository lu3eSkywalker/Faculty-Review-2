const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

//route import and mount
const user = require('./routes/route')
app.use('/api/v1', user);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})

const connectWithDb = require('./config/database');
connectWithDb();