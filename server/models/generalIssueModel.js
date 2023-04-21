const mongoose = require('mongoose')

const Schema = mongoose.Schema

const generalIssueSchema = new Schema({
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
    GN_discription: {
        type: String,
        required: [true, "Please add the issue discription"],

    },
    issue_status: {
        type: String,
        required: [true, "Please add the issue status"],

    },

}, { timestamps: true })


module.exports = mongoose.model('generalIssues', generalIssueSchema)