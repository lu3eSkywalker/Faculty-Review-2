const mongoose = require("mongoose");

require("dotenv").config()

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connect Successfully"))
    .catch((error) => {
        console.log("DB Facing Issues")
        console.log(error.message)
        process.exit(1);
    })
};

module.exports = connectWithDb;