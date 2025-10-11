const DrSchedule = require("../models/doctorSchedule");

exports.getSchedulesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const schedules = await DrSchedule.find({ doctorId: doctorId });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { doctorId, date, availableSlots } = req.body;
    const newSchedule = new DrSchedule({ doctorId, date, availableSlots });
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
