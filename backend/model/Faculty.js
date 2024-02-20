// const mongoose = require('mongoose');

// const facultySchema = new mongoose.Schema({
//     image: {
//         type: String,
//         required: true,
//     },

//     title: {
//         type: String,
//         required: true,
//     },

//     text: {
//         type: String,
//         required: true,
//     },

//     url: {
//         type: String,
//         required: true,
//     },

//     review: [{
//         type: mongoose.Schema.Types.ObjectId,
//         type: String,
//         ref: "Review",
//     }]

// })

// module.exports = mongoose.model("Faculty", facultySchema);

const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    review: [{
        review: [{
            type: String,
        }]
        ,

        userId: [{
            type: String
        }],

        userName: [{
            type:String
        }]
    }]

})

module.exports = mongoose.model("Faculty", facultySchema);

