const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      // required: true,
      // ref: "User",
    },
    orderItems: [],
    shippingAddress: {},
    paymentMethod: {},
    orderTotal: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
