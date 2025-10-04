const router = require("express").Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const paymentControllers = require("../controllers/paymentControllers");

router.post(
  "/create",
  userAuth,
  authorizeRoles("patient"),
  paymentControllers.createPayment
);
router.post("/success", paymentControllers.paymentSuccess);
router.get(
  "/my/:id",
  userAuth,
  authorizeRoles("patient"),
  paymentControllers.getMyPayments
);
router.get(
  "/all",
  userAuth,
  authorizeRoles("admin"),
  paymentControllers.getAllPayments
);

module.exports = router;
