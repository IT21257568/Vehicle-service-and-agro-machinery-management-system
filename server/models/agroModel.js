const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const agroSchema = new Schema(
  {
    p_name: {
      type: String,
      required: true,
    },
    p_image: {
      type: String,
      required: true,
    },
    p_price: {
      type: Number,
      required: true,
    },
    p_discount: {
      type: Number,
      required: true,
    },
    p_description: {
      type: String,
      required: true,
    },
    p_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgroProduct", agroSchema);
