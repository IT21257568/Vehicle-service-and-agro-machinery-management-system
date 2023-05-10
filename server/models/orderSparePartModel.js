const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSparePartSchema = new Schema(
    {
        customer_name: {
        type: String,
        required: true,
        },
        customer_contact: {
        type: String,
        required: true,
        },
        customer_email: {
        type: String,
        required: true,
        },
        customer_address: {
        type: String,
        required: true,
        },
        customer_note: {
        type: String,
        },
        customer_buying_option: {
            type: String,
            required: true,
        },
        p_name: {
        type: String,
        required: true,
        },
        p_price: {
            type: String,
            required: true,
        },
    },
  { timestamps: true }
);

module.exports = mongoose.model("OrderedSpareParts", orderSparePartSchema);
