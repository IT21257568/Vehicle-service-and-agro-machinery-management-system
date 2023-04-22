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
        required: [true, "Please add the contact number"],

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
        required: [true, "Please add the issue status"],

    },
    maintenance_fee: {
        type: Number,
        required: [true, "Please add the issue status"],

    },
    towing_fee: {
        type: Number,

    },
    total_fee: {
        type: Number,
        required: [true, "Please add the issue status"],

    },

}, { timestamps: true })


module.exports = mongoose.model('emergencyIssues', emergencyIssueSchema)