const mongoose = require('mongoose')

const Schema = mongoose.Schema

const emergencyIssueSchema = new Schema({
    customer_name: {
        type: String,
        required: [true, "Please add Name"],

    },
    customer_NIC: {
        type: String,
        required: [true, "Please add NIC"],

    },
    contact_number: {
        type: Number,
        required: [true, "Please add the contact number"],

    },
    c_location: {
        type: String,
        required: [true, "Please add the current location"],

    },
    EM_discription: {
        type: String,
        required: [true, "Please add the issue discription"],

    },
    issue_status: {
        type: String,
        required: [true, "Please add the issue status"],

    },
    available_emp: {
        type: String,
        required: [true, "Please select the available technician"],

    },
    maintenance_fee: {
        type: Number,
        required: [true, "Please add the maintenance fee"],

    },
    towing_fee: {
        type: Number,

    },
    total_fee: {
        type: Number,
        required: [true, "Please add the total fee"],

    },

}, { timestamps: true })


module.exports = mongoose.model('emergencyIssues', emergencyIssueSchema)