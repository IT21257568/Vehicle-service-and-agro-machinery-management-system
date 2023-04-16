const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const promotionSchema = new Schema(
    {
      promo_title: {
        type: String,
        required: true,
      },
      promo_code: {
        type: String,
        required: true,
      },
      promo_discount: {
        type: Number,
        required: true
      },
      promo_description: {
        type: String,
        required: true,
      },
      promo_duration: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Promotion", promotionSchema);