const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalRecord = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    diagnosis: {
      type: String,
      required: [true, "Please add a diagnosis"],
    },
    treatment: {
      type: String,
      required: [true, "Please add a treatment plan"],
    },
    doctor: {
     type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MedicalRecord", medicalRecord);
