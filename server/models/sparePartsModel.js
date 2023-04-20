const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sparePartsSchema = new Schema({
    sp_name:{
        type: String,
        required: true,
    },
    sp_image:{
        type: String,
        required: true,
    },
    sp_price:{
        type: Number,
        required: true,
    },
    sp_discount:{
        type: Number,
        required: true,
    },
    sp_description:{
        type: String,
        required: true,
    },
    sp_status:{
        type: String,
        required: true,
    },

}, 
{timestamps: true }
);

module.exports = mongoose.model('SparePart', sparePartsSchema);