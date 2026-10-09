const mongoose = require('mongoose')

const spaceStationLocSchema = new mongoose.Schema({
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    timestamp: {
        type: Date,
        unique: true
    },
})

module.exports = mongoose.model('splocs', spaceStationLocSchema)
