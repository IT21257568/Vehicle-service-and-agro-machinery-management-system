const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    faq_question: {
      type: String,
      required: true,
    },
    faq_category: {
      type: String,
      required: true,
    },
    faq_answer: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model("FAQ", faqSchema);