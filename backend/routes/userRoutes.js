const router = require("express").Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const userControllers = require("../controllers/userControllers");
const scheduleControllers = require("../controllers/schedulecontrollers");

//#region admin
router.patch(
  "/approveDoctor/:id",
  userAuth,
  authorizeRoles("admin"),
  userControllers.approveDoctor
);
router.post(
  "/doctor",
  userAuth,
  authorizeRoles("admin"),
  userControllers.addDoctor
);
router.delete(
  "/deleteDoctor/:id",
  userAuth,
  authorizeRoles("admin"),
  userControllers.deleteDoctor
);

//#region doctor,admin
router.patch(
  "/doctor/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.updateDoctor
);
router.get(
  "/patients",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.getPatients
);
router.get(
  "/appointments",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.getAllAppointments
);
router.get(
  "/appointments/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.getAppointmentById
);
router.post(
  "/doctorSchedule",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.createSchedule
);
router.patch(
  "/doctorSchedule/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.updateSchedule
);
router.delete(
  "/doctorSchedul/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.deleteSchedule
);

//#region patient,admin
router.get("/patient", userAuth, authorizeRoles("patient"), (req, res) => {
  res.json({ message: "Welcome Patient!" });
});
router.get(
  "/doctors",
  userAuth,
  authorizeRoles("admin", "patient"),
  userControllers.getDoctors
);
router.patch(
  "/patient/:id",
  userAuth,
  authorizeRoles("admin", "patient"),
  userControllers.updatePatient
);
router.post(
  "/appointment",
  userAuth,
  authorizeRoles("patient"),
  userControllers.createAppointment
);
router.patch(
  "/appointment/:id",
  userAuth,
  authorizeRoles("patient"),
  userControllers.updateAppointment
);
router.delete(
  "/appointment/:id",
  userAuth,
  authorizeRoles("patient", "admin"),
  userControllers.deleteAppointment
);
router.get(
  "/doctorSchedules",
  userAuth,
  authorizeRoles("admin", "patient"),
  scheduleControllers.getSchedulesByDoctor
);

//#region medical record routes
router.get(
  "medicalRecord/:id",
  userAuth,
  userControllers.getMedicalRecordsByPatient
);
router.post(
  "/medicalRecord",
  userAuth,
  authorizeRoles("doctor", "admin"),
  userControllers.createMedicalRecord
);

module.exports = router;
