const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TherapistUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  liscense: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  OTP: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
  },
  boarded: {
    type: Boolean,
  },
  hobbies: {
    type: String,
  },
  stateOfOrigin: {
    type: String,
  },
  mariageStatus: {
    type: String,
  },
});

module.exports = mongoose.model("Therapist", TherapistUserSchema);
