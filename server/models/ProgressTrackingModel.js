const mongoose = require("mongoose");

// const Schema = mongoose.Schema

const ProgressTrackingSchema = mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
    },
    vehi_number: {
        type: String,
        required: true,
      },
    status:{
        type: String,
        required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", ProgressTrackingSchema);
