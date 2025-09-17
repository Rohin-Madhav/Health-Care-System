require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running in : ${PORT} `);
});
