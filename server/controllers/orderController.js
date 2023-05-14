const asyncHandler = require("express-async-handler");

const Order = require("../model/orderModel");

// get order
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find();
  res.status(200).json(order);
});

const setOrder = asyncHandler(async (req, res) => {
  if (!req.body.user) {
    res.status(400);
    throw new Error("Please add a user");
  } else if (!req.body.orderItems) {
    res.status(400);
    throw new Error("Please add a order items");
  }

  const order = await Order.create({
    user: req.body.user,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    orderTotal: req.body.orderTotal,
  });

  res.status(200).json(tx);
});

const updateTx = asyncHandler(async (req, res) => {
  const tx = await Tx.findById(req.params.id);

  if (!tx) {
    res.status(400);
    throw new Error("No tx found");
  }
  const updatedTx = await Tx.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTx);
});

const deleteTx = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete tx ${req.params.id}` });
});

module.exports = {
  getTx,
  setTx,
  updateTx,
  deleteTx,
  getTxByWallet,
};
