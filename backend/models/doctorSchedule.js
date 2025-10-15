const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchedule = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
   doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    },
  ],
});

module.exports = mongoose.model("DrSchedule", doctorSchedule);
