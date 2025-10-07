const router = require("express").Router();
const userAuth = require("../middileware/authMiddilware");
const authorizeRoles = require("../middileware/roleMiddilware");
const paymentControllers = require("../controllers/paymentControllers");


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
// Payment routes (patient creates session and confirms)
router.post(
  "/create-session",
  userAuth,
  authorizeRoles("patient"),
  paymentControllers.createCheckoutSession
);

router.post(
  "/confirm",
  userAuth,
  paymentControllers.confirmPayment
);

module.exports = router;
