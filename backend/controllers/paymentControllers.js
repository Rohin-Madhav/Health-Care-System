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
    const payments = await Payment.find({ patientId: req.user.id })
      .populate("doctorId", "username email") 
      .populate("appointmentId", "date time") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("doctorId", "username email") 
      .populate("patientId", "username email") ;
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
              metadata: {
                appointmentId,
                doctorId,
                paymentId: payment._id.toString(), 
              },
            },
            // Stripe uses smallest currency unit (e.g., cents)
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

    // ✅ 4. Save session ID to the payment record
    payment.sessionId = session.id;
    await payment.save();

    // ✅ 5. Respond with the checkout URL and paymentId
    return res.status(200).json({
      checkoutUrl: session.url,
      paymentId: payment._id,
    });

  } catch (error) {
    console.error("❌ createCheckoutSession error:", error);
    return res.status(500).json({ message: error.message });
  }
};
