const router = require("express").Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const userControllers = require("../controllers/userControllers");
const scheduleControllers = require("../controllers/schedulecontrollers");

router.post("/contact", userControllers.handleContactForm);
//#region admin
router.get(
  "/overview",
  userAuth,
  authorizeRoles("admin"),
  userControllers.getOverview
);
router.patch(
  "/approveDoctor/:id",
  userAuth,
  authorizeRoles("admin"),
  userControllers.approveDoctor
);
router.get(
  "/patients",
  userAuth,
  authorizeRoles("admin"),
  userControllers.getPatients
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
router.get(
  "/allContacts",
  userAuth,
  authorizeRoles("admin"),
  userControllers.getAllContacts
);
router.delete(
  "/patient/:id",
  userAuth,
  authorizeRoles("admin"),
  userControllers.deletePatient
);

//#region doctor,admin
router.get(
  "/patient/:id",
  userAuth,
  authorizeRoles("admin", "doctor", "patient"),
  userControllers.getPatientById
);
router.get(
  "/doctor/:doctorId",
  userAuth,
  authorizeRoles("doctor", "admin"),
  userControllers.getDoctorsById
);
router.patch(
  "/doctor/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.updateDoctor
);
router.get(
  "/doctor/:doctorId/patients",
  userAuth,
  authorizeRoles("doctor", "admin"),
  userControllers.getPatientsByDoctor
);

router.get(
  "/appointments",
  userAuth,
  authorizeRoles("admin", "doctor"),
  userControllers.getAllAppointments
);
router.get(
  "/appointments/:patientId",
  userAuth,
  authorizeRoles("admin", "doctor", "patient"),
  userControllers.getAppointmentPatientById
);
router.patch(
  "/status/:appointmentId",
  userAuth,
  authorizeRoles("doctor", "admin"),
  userControllers.updateAppointmentStatus
);
router.post(
  "/doctorSchedule",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.createSchedule
);
router.patch(
  "/doctorSchedule/:scheduleId",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.updateSchedule
);
router.delete(
  "/doctorSchedul/:sheduleId",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.deleteSchedule
);

//#region patient,admin
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
router.get(
  "/appointment/:appointmentId",
  userAuth,
  authorizeRoles("patient", "doctor", "admin"),
  userControllers.getAppointmentById
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
  authorizeRoles("patient", "admin", "doctor"),
  userControllers.deleteAppointment
);
router.get(
  "/doctorSchedules",
  userAuth,
  authorizeRoles("admin", "patient", "doctor"),
  scheduleControllers.getAllSchedules
);
router.get(
  "/doctorSchedule/:scheduleId",
  userAuth,
  authorizeRoles("admin", "doctor"),
  scheduleControllers.getScheduleById
);

//#region medical record routes
router.get(
  "/medicalRecord/:id",
  userAuth,
  authorizeRoles("patient", "admin", "doctor"),
  userControllers.getMedicalRecordsByPatient
);
router.post(
  "/medicalRecord",
  userAuth,
  authorizeRoles("doctor", "admin"),
  userControllers.createMedicalRecord
);

module.exports = router;
