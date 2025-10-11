const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

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

router.post(
  "/create-session",
  userAuth,
  authorizeRoles("patient"),
  paymentControllers.createCheckoutSession
);

module.exports = router;
