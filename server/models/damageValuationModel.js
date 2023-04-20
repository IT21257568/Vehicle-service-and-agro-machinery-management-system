const mongoose = require('mongoose')

const Schema = mongoose.Schema

const damageValuationSchema = new Schema({
    customer_id: {
        type: String,
        required: [true, "Please add NIC"],

    },
    customer_name: {
        type: String,
        required: [true, "Please add Name"],

    },
    vehicle_Number: {
        type: String,
        required: [true, "Please add vehicle Number"],
    },
    vehicle_Model: {
        type: String,
        required: [true, "Please add vehicle Model"],

    },
    customer_email: {
        type: String,
        required: [true, "Please add email"],
    },
    estimated_cost: {
        type: Number,
        required: [true, "Please add estimated cost"],

    },
    required_parts: {
        type: String,

    },
    damage_picture_url: {
        type: String,
        required: [true, "Please add damage picture"],
    },

}, { timestamps: true })


module.exports = mongoose.model('damageValuation', damageValuationSchema)