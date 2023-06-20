const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    empCode: {
      type: String,
      required: [true, "Please add employee code"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone number"],
    },
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
