const User = require("../models/userSchema");
const Appointment = require("../models/appointmentSchema");

exports.approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res.status(400).json({ message: "Only doctors can be approved" });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: "Doctor approved successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }
    user = new User({
      username,
      email,
      password,
      role: "doctor",   
      isApproved: false, 
    });
    await user.save();
    res.status(201).json({
      message: "Docter registerd succesfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
      isApproved: true,
    }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const userRole = req.user.role;

    if (userRole === "doctor") {
      if (req.user._id.toString() !== id) {
        return res
          .status(403)
          .json({ message: "You can only update your own profile" });
      }
    }

    if (userRole === "admin" || userRole === "doctor") {
      const user = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    }

    return res.status(403).json({ message: "Unauthorized role" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const userRole = req.user.role;

    if (userRole === "patient") {
      if (req.user._id.toString() !== id) {
        return res
          .status(403)
          .json({ message: "You can only update your own profile" });
      }
    }

    if (userRole === "admin" || userRole === "patient") {
      const user = await User.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    }

    return res.status(403).json({ message: "Unauthorized role" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
