const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    client_name: {
        type: String,
        required:true,
    },
    service_type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date_time: {
        type: String,
        required: true,
    },
    special_note: {
        type: String,
        required: true,
    },

}, { timestamps: true})

module.exports = mongoose.model('Booking', bookingSchema);