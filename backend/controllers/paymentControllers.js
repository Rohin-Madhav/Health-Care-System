const stripe = require("../utils/stripe");
const Payment = require("../models/payment");



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

// New: create a Stripe Checkout Session and a pending Payment record
exports.createCheckoutSession = async (req, res) => {
  try {
    const { appointmentId, doctorId, amount, currency } = req.body;
    const patientId = req.user._id;

    if (!appointmentId || !doctorId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a pending payment record first
    const payment = await Payment.create({
      appointmentId,
      patientId,
      doctorId,
      amount,
      currency: (currency || "usd").toLowerCase(),
      status: "pending",
      paymentMethod: "stripe_checkout",
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: (currency || "usd").toLowerCase(),
            product_data: {
              name: "Appointment Payment",
              metadata: { appointmentId, doctorId },
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        paymentId: payment._id.toString(),
        appointmentId: appointmentId.toString(),
        patientId: patientId.toString(),
        doctorId: doctorId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&paymentId=${payment._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/appointment`,
    });

    return res.status(200).json({ checkoutUrl: session.url, paymentId: payment._id });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// New: confirm payment after Stripe redirect (frontend posts session_id + paymentId)
exports.confirmPayment = async (req, res) => {
  try {
    const { sessionId, paymentId } = req.body;
    if (!sessionId || !paymentId) {
      return res.status(400).json({ message: "sessionId and paymentId are required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // session.payment_status can be 'paid' when completed
    if (session.payment_status === "paid") {
      // stripe stores payment_intent
      const transactionId = session.payment_intent || session.id;

      const updated = await Payment.findByIdAndUpdate(
        paymentId,
        { status: "success", transactionId },
        { new: true }
      );

      return res.status(200).json({ message: "Payment confirmed", payment: updated });
    }

    return res.status(400).json({ message: "Payment not completed", session });
  } catch (error) {
    console.error("confirmPayment error:", error);
    return res.status(500).json({ message: error.message });
  }
};

