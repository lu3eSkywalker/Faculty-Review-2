const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    userName: {
        type: String,
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
    review: [{
        type: String,
        required: true,
    }]
})

module.exports = mongoose.model('Review', reviewSchema)