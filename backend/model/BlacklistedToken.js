const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    createAt: {
        type: Date,
        default: Date.now,
        expires: '24h'
    }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;