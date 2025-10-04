const User = require("../models/userSchema");
const Appointment = require("../models/appointment");
const MedicalRecord = require("../models/medicaleRecord");
const Payment = require("../models/payment");

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
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate("doctor", "username specialty")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
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

exports.getPatientDashboardData = async (req, res) => {
  try {
    const patientId = req.user._id;

    // 1. Get user info
    const user = await User.findById(patientId).select("username");

    // 2. Get upcoming appointment
    const upcomingAppointment = await Appointment.findOne({
      patientId: patientId,
      date: { $gte: new Date() },
      status: "scheduled",
    })
      .sort({ date: 1 })
      .populate("doctorId", "username specialty");

    // 3. Get pending payments
    const pendingPayments = await Payment.find({
      patientId: patientId,
      status: "pending",
    });

    const totalPendingAmount = pendingPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const dashboardData = {
      username: user.username,
      upcomingAppointment: upcomingAppointment
        ? {
            date: upcomingAppointment.date.toDateString(),
            time: upcomingAppointment.time,
            doctor: upcomingAppointment.doctorId.username,
            specialty: upcomingAppointment.doctorId.specialty || "General",
          }
        : null,
      pendingPayments: {
        amount: totalPendingAmount,
        count: pendingPayments.length,
      },
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // For now, we'll just log the submission to the console.
    // In a real application, you would send an email or save it to a database.
    console.log("New Contact Form Submission:");
    console.log({ name, email, subject, message });

    res.status(200).json({ message: "Message received successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
