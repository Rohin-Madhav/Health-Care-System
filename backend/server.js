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
    console.log("webhook trogerd");

    try {
      // req.body is already a Buffer when using express.raw()
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed.", err.message);
      return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `✅ PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        break;
      case "checkout.session.completed":
        const session = event.data.object;

        const payment = await Payment.findById(session.metadata.paymentId);
        payment.status = "success";
        payment.save();
        const amount = paymentIntent.amount / 100;
        console.log(`✅ PaymentIntent for $${amount} was successful!`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://health-care-system-1-yzp8.onrender.com",
];


app.use((req, res, next) => {
 
  if (req.originalUrl === "/api/payment/webhook") {
    next();
  } else {
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })(req, res, next);
  }
});

app.use("/api/auth", healthCareRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in : ${PORT} `);
});
