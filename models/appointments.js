const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    therapistname: {
      type: String,
      required: true,
    },
    therapistId: {
      type: String,
      required: true,
    },
    meetingType: {
      type: String,
     
    },
    seeionLink: {
      type: String,
    },

    disorderType: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: new Date() }
);

module.exports = mongoose.model("appointment", appointmentSchema);