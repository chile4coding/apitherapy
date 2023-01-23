const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const faqSchema = new Schema(
  {
    questionType: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: new Date() }
);

module.exports = mongoose.model("faq", faqSchema);
