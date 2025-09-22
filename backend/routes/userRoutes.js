const express = require("express");
const router = express.Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const controllers = require("../controllers/userControllers");

//#region admin
router.patch(
  "/approveDoctor/:id",
  userAuth,
  authorizeRoles("admin"),
  controllers.approveDoctor
);
router.post(
  "/doctor",
  userAuth,
  authorizeRoles("admin"),
  controllers.addDoctor
);
router.delete(
  "/deleteDoctor/:id",
  userAuth,
  authorizeRoles("admin"),
  controllers.deleteDoctor
);

//#region doctor,admin
router.patch(
  "/doctor/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  controllers.updateDoctor
);
router.get(
  "/patients",
  userAuth,
  authorizeRoles("admin", "doctor"),
  controllers.getPatients
);
router.get(
  "/appointments",
  userAuth,
  authorizeRoles("admin", "doctor"),
  controllers.getAllAppointments 
);
router.get(
  "/appointments/:id",
  userAuth,
  authorizeRoles("admin", "doctor"),
  controllers.getAppointmentById
);

//#region patient,admin
router.get("/patient", userAuth, authorizeRoles("patient"), (req, res) => {
  res.json({ message: "Welcome Patient!" });
});
router.get(
  "/doctors",
  userAuth,
  authorizeRoles("admin", "patient"),
  controllers.getDoctors
);
router.patch(
  "/patient/:id",
  userAuth,
  authorizeRoles("admin", "patient"),
  controllers.updatePatient
);
router.post(
  "/appointment",
  userAuth,
  authorizeRoles("patient"),
  controllers.createAppointment
);
router.patch(
  "/appointment/:id",
  userAuth,
  authorizeRoles("patient" ),
  controllers.updateAppointment
);
router.delete(
  "/appointment/:id",
  userAuth,
  authorizeRoles("patient", "admin"),
  controllers.deleteAppointment
);

module.exports = router;
