const User = require("../models/userSchema");
const Appointment = require("../models/appointment");
const MedicalRecord = require("../models/medicaleRecord");
const Contact = require("../models/contact");

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

exports.getDoctorsById = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const user = await User.findById(doctorId).select("-password");
    if (!user || user.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(user);
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
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user || user.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPatientsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "username email")
      .select("patientId");

    if (appointments.length === 0) {
      return res.status(200).json([]);
    }

    const patients = appointments.map((a) => a.patientId);

    const uniquePatients = [
      ...new Map(patients.map((p) => [p._id.toString(), p])).values(),
    ];

    res.status(200).json(uniquePatients);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
    const patientId = req.user._id;
    const { doctorId, date, time, clientName, reason } = req.body;

    try {
      const newAppointment = new Appointment({
        doctorId: doctorId,
        patientId: patientId,
        date,
        time,
        clientName,
        reason,
      });
      await newAppointment.save();
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "username email")
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAppointmentPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "username specialty")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

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

    res.status(200).json(updatedAppointment.save());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { appointmentId } = req.params;

    if (!["approved", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

exports.createMedicalRecord = async (req, res) => {
  const { patient, diagnosis, treatment, doctor, notes } = req.body;

  if (!patient || !diagnosis || !treatment || !doctor) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const medicalRecord = await MedicalRecord.create({
    patient,
    diagnosis,
    treatment,
    doctor,
    notes,
  });

  res.status(201).json(medicalRecord);
};

exports.getMedicalRecordsByPatient = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id.toString();
    const { patientId } = req.params;

    let filter = {};

    if (patientId) {
      if (role === "patient" && userId !== patientId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (role === "doctor") {
        filter = { patient: patientId, doctor: userId };
      } else if (role === "admin") {
        filter = { patient: patientId };
      } else if (role === "patient") {
        filter = { patient: patientId };
      } else {
        return res.status(403).json({ message: "Unauthorized role" });
      }
    } else {
      if (role === "admin") {
        filter = {};
      } else if (role === "doctor") {
        filter = { doctor: userId };
      } else if (role === "patient") {
        filter = { patient: userId };
      } else {
        return res.status(403).json({ message: "Unauthorized role" });
      }
    }

    const records = await MedicalRecord.find(filter)
      .populate("patient", "username email")
      .populate("doctor", "username email");

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};
