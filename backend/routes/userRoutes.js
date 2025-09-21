const express = require("express");
const router = express.Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const controllers = require("../controllers/userControllers");

//#region admin

router.get("/admin",userAuth,authorizeRoles("admin",controllers.aproveDocter))

//#region doctor,admin
router.post(
  "/doctor",
  userAuth,
  authorizeRoles("admin"),
  controllers.addDocter
);
router.patch("/docter/:id",userAuth,authorizeRoles("admin","doctor"),controllers.updateDocter)
router.get("/patients", userAuth, authorizeRoles("admin","doctor"), controllers.getPateints);


//#region patient,admin
router.get("/patient", userAuth, authorizeRoles("patient"), (req, res) => {
  res.json({ message: "Welcome Patient!" });
});
router.get("/doctors", userAuth,authorizeRoles("admin","patient"), controllers.getDocters);
router.patch("/patient/:id",userAuth,authorizeRoles("admin","patient"),controllers.updatePateint)

module.exports = router;
