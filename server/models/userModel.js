const mongoose = require("mongoose");

// const Schema = mongoose.Schema

const userSchema = mongoose.Schema(
  {
    nic: {
      type: String,
      required: [true, "Please add NIC"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone number"],
    },
    name: {
      first_name: {
        type: String,
        required: [true, "Please add first name"],
      },
      last_name: {
        type: String,
        required: [true, "Please add last name"],
      },
    },
    pfp_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
