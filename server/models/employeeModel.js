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
    username: {
      type: String,
      // required: [true, "Please add username"],
    },
    empType: {
      type: String,
      required: [true, "Please add employee type"],
    },
    empDept: {
      type: String,
      required: [true, "Please add employee department"],
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
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
