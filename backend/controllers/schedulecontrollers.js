const DrSchedule = require("../models/doctorSchedule");
const User = require("../models/userSchema")

exports.getSchedulesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const schedules = await DrSchedule.find({ doctorId })
      .populate("doctor", "username email");

    res.status(200).json(schedules);
  } catch (err) {
    console.error("Error fetching schedules:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { doctor, date, availableSlots } = req.body;

  
    const doctorUser = await User.findOne({ username: doctor });
    if (!doctorUser) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newSchedule = new DrSchedule({
      doctor: doctorUser._id,
      doctorId: doctorUser._id,
      date,
      availableSlots,
    });

    const savedSchedule = await newSchedule.save();

    // populate doctor details before sending back
    const populated = await savedSchedule.populate("doctor", "username email");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(400).json({ message: error.message });
  }
};


exports.updateSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const updatedSchedule = await DrSchedule.findByIdAndUpdate(
      scheduleId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { sheduleId } = req.params;
    const deletedSchedule = await DrSchedule.findByIdAndDelete(sheduleId);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
