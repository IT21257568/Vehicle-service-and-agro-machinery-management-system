const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cvSubSchema = new Schema(
  {
    applicant_name: {
      type: String,
      required: true,
    },
    applicant_age: {
      type: Number,
      required: true,
    },
    applicant_gender: {
      type: String,
      required: true,
    },
    applicant_contact: {
      type: String,
      required: true,
    },
    applicant_email: {
      type: String,
      required: true,
    },
    applicant_CVFile_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CvForm", cvSubSchema);
