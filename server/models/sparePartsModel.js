const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sparePartsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },

}, {timestamps: true })

module.exports = mongoose.model('SparePart', sparePartsSchema)