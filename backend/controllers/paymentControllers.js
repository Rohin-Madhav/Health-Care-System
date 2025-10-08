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

exports.createCheckoutSession = async (req, res) => {
  try {
    const { appointmentId, doctorId, amount, currency } = req.body;
    const patientId = req.user._id;

    if (!appointmentId || !doctorId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payment = await Payment.create({
      appointmentId,
      patientId,
      doctorId,
      amount,
      currency: (currency || "usd").toLowerCase(),
      status: "pending",
      paymentMethod: "stripe_checkout",
    });

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
      success_url: `${process.env.FRONTEND_URL}/patient/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/patient/payment-cancel`,
    });
    payment.sessionId = session.id;
    await payment.save();

    return res.status(200).json({
      checkoutUrl: session.url,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("confirmPayment error:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await Payment.findOneAndUpdate(
      { sessionId: session.id },
      { status: "success", transactionId: session.payment_intent }
    );
  }

  res.sendStatus(200);
};
