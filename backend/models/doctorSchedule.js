const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchedule = new mongoose.Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor", 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  availableSlots: [
    {
      startTime: {
        type: String, 
        required: true,
      },
      endTime: {
        type: String, 
        required: true,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
      patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient", 
      },
    },
  ],
});

module.exports = mongoose.model("DrSchedule", doctorSchedule);
