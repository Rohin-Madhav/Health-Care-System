require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const healthCareRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const stripe = require("./utils/stripe");
const Payment = require("./models/payment");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("hello");
});
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    console.log("✅ Stripe webhook triggered");

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed:", err.message);
      return res.sendStatus(400);
    }

    try {
      switch (event.type) {
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          console.log(`💰 PaymentIntent ${paymentIntent.id} succeeded.`);
          break;
        }

        case "checkout.session.completed": {
          const session = event.data.object;
          console.log(`🧾 Checkout session completed: ${session.id}`);

        
          const paymentId = session.metadata?.paymentId;
          if (!paymentId) {
            console.error("❌ No paymentId in session metadata");
            break;
          }

          const payment = await Payment.findById(paymentId);
          if (!payment) {
            console.error("❌ Payment record not found in DB:", paymentId);
            break;
          }

          payment.status = "success";
          payment.transactionId = session.payment_intent;
          await payment.save();

          console.log(`✅ Payment ${paymentId} marked as SUCCESS`);
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error("🔥 Webhook handler error:", error);
      res.status(500).json({ error: "Webhook handler failed" });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://health-care-system-1-yzp8.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api/auth", healthCareRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in : ${PORT} `);
});
