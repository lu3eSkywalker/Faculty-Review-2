const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Review",
    }]
})

module.exports = mongoose.model("user", userSchema);