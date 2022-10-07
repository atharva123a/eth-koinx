const mongoose = require('mongoose');

const ConvertSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Please provide from']
    },
    to: {
        type: String,
        required: [true, 'Please provide to']
    },
    convert: {
        type: Number,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model("Convert", ConvertSchema);