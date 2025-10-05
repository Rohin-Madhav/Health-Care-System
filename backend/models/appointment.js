const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  clientName: { type: String, required: true },
  reason: { type: String, required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);  