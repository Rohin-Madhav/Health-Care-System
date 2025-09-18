require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const healthCareRoutes = require("./routes/healthCareRoutes")

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user",healthCareRoutes)

app.listen(PORT, () => {
  console.log(`Server is running in : ${PORT} `);
});
