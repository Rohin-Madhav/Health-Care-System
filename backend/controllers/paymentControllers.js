const stripe = require("../utils/stripe");
const Payment = require("../models/payment");


exports.createPayment = async (req, res) => {
  try {
    const { appointmentId, doctorId, amount, currency, paymentMethod } = req.body;

    // Always take patient from logged-in user
    const patientId = req.user._id;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency || "usd",
      metadata: { 
        appointmentId: appointmentId.toString(), 
        patientId: patientId.toString(), 
        doctorId: doctorId ? doctorId.toString() : "" 
      },
    });

    const payment = await Payment.create({
      appointmentId,
      patientId,
      doctorId,
      amount,
      currency: currency || "usd",
      paymentMethod: paymentMethod || "card",
      status: "pending", // lowercase matches your schema
      transactionId: paymentIntent.id,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.paymentSuccess = async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;

    const updated = await Payment.findByIdAndUpdate(
      paymentId,
      { status: "success", transactionId },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ patientId: req.user.id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("patientId doctorId");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
